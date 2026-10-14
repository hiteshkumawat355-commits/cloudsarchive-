import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { DEMO_PHOTOGRAPHS } from '@/lib/demo-data';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const photo = DEMO_PHOTOGRAPHS.find((p) => p.slug === params.slug);
  if (!photo) return { title: 'Photograph Not Found — CloudsArchive' };

  return {
    title: `${photo.title} by ${photo.photographer_display_name} — CloudsArchive`,
    description: photo.description || `Sky photograph in ${photo.category_name} on CloudsArchive.`,
    openGraph: {
      title: `${photo.title} — CloudsArchive`,
      description: photo.description,
      images: [{ url: photo.storage_path, alt: photo.accessibility_text }]
    }
  };
}

export default function PhotographDetailPage({ params }: Props) {
  const photo = DEMO_PHOTOGRAPHS.find((p) => p.slug === params.slug);
  if (!photo) notFound();

  const relatedPhotos = DEMO_PHOTOGRAPHS.filter(
    (p) => p.category_slug === photo.category_slug && p.id !== photo.id
  ).slice(0, 3);

  return (
    <main className="min-h-screen bg-[#0B0D10] text-[#F4F5F6] pt-28 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-xs text-[#A4ABB4] mb-6 flex items-center gap-2">
          <Link href="/explore" className="hover:text-[#F4F5F6]">Explore</Link>
          <span>/</span>
          <Link href={`/category/${photo.category_slug}`} className="hover:text-[#F4F5F6]">
            {photo.category_name}
          </Link>
          <span>/</span>
          <span className="text-[#86BDE8]">{photo.title}</span>
        </nav>

        {/* Main Image Frame (Protected from right-click full-res download by default) */}
        <div className="bg-[#12161B] border border-[#F4F5F6]/10 rounded p-2 sm:p-4">
          <img
            src={photo.storage_path}
            alt={photo.accessibility_text}
            className="w-full max-h-[80vh] object-contain mx-auto protected-image"
          />
          <div className="mt-3 px-2 flex flex-wrap items-center justify-between text-xs text-[#A4ABB4]">
            <span>
              Photograph © {photo.photographer_display_name}. Displayed with permission on CloudsArchive.
            </span>
            <span>All rights reserved · Full-resolution downloads disabled</span>
          </div>
        </div>

        {/* Metadata & Story */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#86BDE8]">
              {photo.category_name}
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-[#F4F5F6]">
              {photo.title}
            </h1>
            {photo.description && (
              <p className="text-base text-[#A4ABB4] leading-relaxed pt-2">
                {photo.description}
              </p>
            )}
          </div>

          <aside className="lg:col-span-4 bg-[#12161B] border border-[#F4F5F6]/10 rounded p-6 space-y-4">
            <h2 className="text-xs uppercase tracking-widest text-[#86BDE8]">
              Archive Metadata
            </h2>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-xs text-[#A4ABB4]">Photographer</dt>
                <dd className="text-[#F4F5F6] font-medium">{photo.photographer_display_name}</dd>
              </div>
              {photo.instagram_username && (
                <div>
                  <dt className="text-xs text-[#A4ABB4]">Instagram</dt>
                  <dd className="text-[#F4F5F6]">@{photo.instagram_username}</dd>
                </div>
              )}
              {photo.location && (
                <div>
                  <dt className="text-xs text-[#A4ABB4]">Location</dt>
                  <dd className="text-[#F4F5F6]">{photo.location}</dd>
                </div>
              )}
              {photo.capture_date && (
                <div>
                  <dt className="text-xs text-[#A4ABB4]">Capture Date</dt>
                  <dd className="text-[#F4F5F6]">{photo.capture_date}</dd>
                </div>
              )}
              <div>
                <dt className="text-xs text-[#A4ABB4]">Published Date</dt>
                <dd className="text-[#F4F5F6]">{photo.published_at}</dd>
              </div>
            </dl>

            {photo.instagram_profile_url && (
              <div className="pt-4 border-t border-[#F4F5F6]/10">
                <a
                  href={photo.instagram_profile_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-3 bg-[#86BDE8] text-[#0B0D10] text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#9ccbf0] transition-colors"
                >
                  View Photographer on Instagram
                </a>
              </div>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}
