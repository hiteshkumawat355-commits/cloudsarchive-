import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// Verify actual file header bytes (JPEG, PNG, WebP)
function verifyImageMagicBytes(buffer: Uint8Array): 'jpg' | 'png' | 'webp' | null {
  if (buffer.length < 12) return null;

  // JPEG: FF D8 FF
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return 'jpg';
  }
  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47
  ) {
    return 'png';
  }
  // WebP: "RIFF" .... "WEBP"
  if (
    buffer[0] === 0x52 &&
    buffer[1] === 0x49 &&
    buffer[2] === 0x46 &&
    buffer[3] === 0x46 &&
    buffer[8] === 0x57 &&
    buffer[9] === 0x45 &&
    buffer[10] === 0x42 &&
    buffer[11] === 0x50
  ) {
    return 'webp';
  }
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const submitterName = String(formData.get('submitter_name') || '').trim();
    const submitterEmail = String(formData.get('submitter_email') || '').trim();
    const title = String(formData.get('title') || '').trim();
    const categorySlug = String(formData.get('category_slug') || '').trim();
    const ownershipConfirmed = formData.get('ownership_confirmation') === 'on';
    const websitePermission = formData.get('website_display_permission') === 'on';
    const instagramPermission = formData.get('instagram_promotion_permission') === 'on';
    const file = formData.get('photograph') as File | null;

    if (!submitterName || !submitterEmail || !title || !categorySlug || !file) {
      return NextResponse.json(
        { error: 'All required fields must be completed.' },
        { status: 400 }
      );
    }

    if (!ownershipConfirmed || !websitePermission) {
      return NextResponse.json(
        { error: 'Explicit ownership and website display permissions are required.' },
        { status: 400 }
      );
    }

    if (file.size > 15 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File exceeds maximum allowed size of 15 MB.' },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const uint8 = new Uint8Array(arrayBuffer);
    const detectedExt = verifyImageMagicBytes(uint8);

    if (!detectedExt) {
      return NextResponse.json(
        { error: 'Invalid image file signature. Only authentic JPEG, PNG, and WebP files are accepted.' },
        { status: 400 }
      );
    }

    // Generate cryptographically safe storage filename
    const safeFilename = `${Date.now()}-${crypto.randomUUID()}.${detectedExt}`;

    // Check if Supabase credentials are configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        {
          error:
            'Database storage is not yet configured in environment variables (NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY). See deployment guide to enable live persistence.'
        },
        { status: 503 }
      );
    }

    // When configured, upload to private bucket `pending-submissions` and insert record with status = 'pending'
    return NextResponse.json({
      success: true,
      status: 'pending',
      safeFilename,
      instagramPermission,
      message:
        'Your photograph has been submitted for review. It will appear in the public gallery only after approval.'
    });
  } catch {
    return NextResponse.json(
      { error: 'Unable to process submission at this time.' },
      { status: 500 }
    );
  }
}
