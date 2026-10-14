import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

export const runtime = "nodejs";

function detectImageType(buffer: Uint8Array): {
  ext: string;
  mime: string;
} | null {
  if (
    buffer.length >= 3 &&
    buffer[0] === 0xff &&
    buffer[1] === 0xd8 &&
    buffer[2] === 0xff
  ) {
    return { ext: "jpg", mime: "image/jpeg" };
  }

  if (
    buffer.length >= 8 &&
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a
  ) {
    return { ext: "png", mime: "image/png" };
  }

  if (
    buffer.length >= 12 &&
    buffer[0] === 0x52 &&
    buffer[1] === 0x49 &&
    buffer[2] === 0x46 &&
    buffer[3] === 0x46 &&
    buffer[8] === 0x57 &&
    buffer[9] === 0x45 &&
    buffer[10] === 0x42 &&
    buffer[11] === 0x50
  ) {
    return { ext: "webp", mime: "image/webp" };
  }

  return null;
}

export async function POST(req: NextRequest) {
  let uploadedPath: string | null = null;
  let supabase: ReturnType<typeof createClient> | null = null;

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceKey) {
      return NextResponse.json(
        { error: "Supabase server configuration is missing." },
        { status: 503 }
      );
    }

    supabase = createClient(supabaseUrl, serviceKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    const form = await req.formData();

    const name = String(form.get("submitter_name") || "").trim();
    const email = String(form.get("submitter_email") || "").trim();
    const title = String(form.get("title") || "").trim();
    const category = String(form.get("category_slug") || "").trim();
    const ownershipConfirmed =
      form.get("ownership_confirmation") === "on";
    const websitePermission =
      form.get("website_display_permission") === "on";
    const file = form.get("photograph");

    if (
      !name ||
      !email ||
      !title ||
      !category ||
      !(file instanceof File)
    ) {
      return NextResponse.json(
        { error: "Please complete all required fields." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!ownershipConfirmed || !websitePermission) {
      return NextResponse.json(
        { error: "Please confirm ownership and website display permission." },
        { status: 400 }
      );
    }

    if (file.size === 0 || file.size > 15 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Choose an image smaller than 15 MB." },
        { status: 400 }
      );
    }

    const bytes = new Uint8Array(await file.arrayBuffer());
    const imageType = detectImageType(bytes);

    if (!imageType) {
      return NextResponse.json(
        { error: "Only valid JPEG, PNG, and WebP images are accepted." },
        { status: 400 }
      );
    }

    const filePath = `${crypto.randomUUID()}.${imageType.ext}`;

    const { error: uploadError } = await supabase.storage
      .from("cloud-photos")
      .upload(filePath, bytes, {
        contentType: imageType.mime,
        upsert: false,
      });

    if (uploadError) {
  console.error("Photo storage upload failed:", uploadError.message);
  return NextResponse.json(
    { error: `Storage error: ${uploadError.message}` },
    { status: 500 }
  );
}

    uploadedPath = filePath;

    const { error: insertError } = await supabase
      .from("submissions")
      .insert({
        name,
        instagram_handle: null,
        image_url: filePath,
        caption: title,
        status: "pending",
      });

    if (insertError) {
      console.error("Submission database insert failed:", insertError.message);

      // Remove the uploaded file if its database record could not be saved.
      await supabase.storage.from("cloud-photos").remove([filePath]);
      uploadedPath = null;

      return NextResponse.json(
        { error: "Your submission could not be saved. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      status: "pending",
      message: "Thanks for sharing your sky! Your photo is awaiting review.",
    });
  } catch (error) {
    console.error("Submission processing failed:", error);

    if (uploadedPath && supabase) {
      await supabase.storage.from("cloud-photos").remove([uploadedPath]);
    }

    return NextResponse.json(
      { error: "Unable to process your submission right now." },
      { status: 500 }
    );
  }
}