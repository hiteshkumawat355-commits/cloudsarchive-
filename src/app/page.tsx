import React from 'react';
import Link from 'next/link';
import { CATEGORIES, DEMO_PHOTOGRAPHS } from '@/lib/demo-data';

export default function HomePage() {
  const featuredPhotos = DEMO_PHOTOGRAPHS.filter((p) => p.is_featured);
  const photoOfTheWeek = DEMO_PHOTOGRAPHS.find((p) => p.is_photo_of_the_week) || DEMO_PHOTOGRAPHS[0];
  const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://instagram.com/cloudsarchive.in';

  return (
    <main className="min-h-screen bg-[#0B0D10] text-[#F4F5F6]">
      {/* SECTION A: HERO */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=2000&q=85"
          alt="Dramatic twilight storm clouds illuminated by warm horizon light"
          className="absolute inset-0 w-full h-full object-cover object-center scale-105 transition-transform duration-1000"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0D10]/70 via-[#0B0D10]/45 to-[#0B0D10]" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center pt-20">
          <p className="text-xs uppercase tracking-[0.25em] text-[#86BDE8] mb-5">
            CloudsArchive.in — Global Sky Photography Archive
          </p>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[#F4F5F6] leading-[1.1]">
            Every Cloud Has a Story.
          </h1>
          <p className="mt-6 text-base sm:text-lg text-[#F4F5F6]/85 max-w-2xl mx-auto leading-relaxed font-light">
            A growing archive of beautiful skies, extraordinary clouds, and the people who capture them.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/explore"
              className="w-full sm:w-auto px-8 py-3.5 bg-[#86BDE8] text-[#0B0D10] font-medium text-sm tracking-wide rounded hover:bg-[#9ccbf0] transition-colors"
            >
              Explore the Gallery
            </Link>
            <Link
              href="/submit"
              className="w-full sm:w-auto px-8 py-3.5 bg-[#12161B]/80 text-[#F4F5F6] border border-[#F4F5F6]/20 font-medium text-sm tracking-wide rounded hover:border-[#86BDE8] transition-colors"
            >
              Share Your Sky
            </Link>
          </div>
        </div>

        {/* Subtle Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#A4ABB4] text-xs tracking-widest uppercase">
          <span>Scroll</span>
          <span className="w-px h-8 bg-gradient-to-b from-[#86BDE8] to-transparent" />
        </div>
      </section>

      {/* SECTION B: EDITORIAL INTRODUCTION */}
      <section className="py-24 px-4 sm:px-6 max-w-3xl mx-auto text-center">
        <span className="text-xs uppercase tracking-[0.2em] text-[#86BDE8]">
          The Archive
        </span>
        <h2 className="mt-3 font-serif text-3xl sm:text-4xl text-[#F4F5F6]">
          Look Up. Discover More.
        </h2>
        <p className="mt-5 text-[#A4ABB4] text-base sm:text-lg leading-relaxed">
          From quiet morning skies to dramatic storm formations, CloudsArchive celebrates the beauty that exists above us every day.
        </p>
      </section>

      {/* SECTION C: FEATURED PHOTOGRAPHS ("Selected Skies") */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-[#86BDE8]">
              Curated Exhibition
            </span>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl text-[#F4F5F6]">
              Selected Skies
            </h2>
          </div>
          <Link
            href="/explore"
            className="text-sm text-[#86BDE8] hover:underline inline-flex items-center gap-1.5"
          >
            View full archive <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {featuredPhotos.map((photo) => (
            <article
              key={photo.id}
              className="break-inside-avoid group relative overflow-hidden rounded bg-[#12161B] border border-[#F4F5F6]/10"
            >
              <Link href={`/photo/${photo.slug}`} className="block overflow-hidden">
                <img
                  src={photo.storage_path}
                  alt={photo.accessibility_text}
                  loading="lazy"
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.03] protected-image"
                />
              </Link>
              <div className="p-5">
                <div className="flex items-center justify-between gap-2 text-xs uppercase tracking-wider text-[#86BDE8] mb-1.5">
                  <span>{photo.category_name}</span>
                  {photo.is_demo && (
                    <span className="px-2 py-0.5 bg-[#0B0D10] text-[#A4ABB4] rounded border border-[#F4F5F6]/10 text-[10px]">
                      Demo Item
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-medium text-[#F4F5F6]">
                  <Link href={`/photo/${photo.slug}`} className="hover:text-[#86BDE8] transition-colors">
                    {photo.title}
                  </Link>
                </h3>
                <p className="mt-1 text-xs text-[#A4ABB4]">
                  By {photo.photographer_display_name}
                  {photo.location ? ` · ${photo.location}` : ''}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* SECTION D: EXPLORE BY CATEGORY */}
      <section className="py-20 bg-[#12161B]/60 border-y border-[#F4F5F6]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs uppercase tracking-[0.2em] text-[#86BDE8]">
              Atmospheric Taxonomy
            </span>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl text-[#F4F5F6]">
              Explore by Category
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="group relative h-64 rounded overflow-hidden border border-[#F4F5F6]/10 flex flex-col justify-end p-6 bg-[#0B0D10]"
              >
                <img
                  src={cat.cover_image_path}
                  alt={cat.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover opacity-65 group-hover:scale-105 group-hover:opacity-80 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D10] via-[#0B0D10]/40 to-transparent" />
                <div className="relative z-10">
                  <h3 className="text-lg font-medium text-[#F4F5F6] group-hover:text-[#86BDE8] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="mt-1 text-xs text-[#A4ABB4] line-clamp-2">
                    {cat.description}
                  </p>
                  <span className="mt-3 inline-block text-xs uppercase tracking-wider text-[#86BDE8]">
                    Explore Category →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION E: COMMUNITY HIGHLIGHTS */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-[#86BDE8]">
              Global Perspectives
            </span>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl text-[#F4F5F6]">
              Captured by the Community
            </h2>
          </div>
          <Link
            href="/community"
            className="text-sm text-[#86BDE8] hover:underline inline-flex items-center gap-1.5"
          >
            Meet the Community <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DEMO_PHOTOGRAPHS.slice(0, 3).map((item) => (
            <Link
              key={item.id}
              href={`/photo/${item.slug}`}
              className="group block bg-[#12161B] border border-[#F4F5F6]/10 rounded overflow-hidden"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.storage_path}
                  alt={item.accessibility_text}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <p className="text-xs text-[#86BDE8] uppercase tracking-wider">
                  {item.category_name}
                </p>
                <h3 className="mt-1 text-base font-medium text-[#F4F5F6]">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs text-[#A4ABB4]">
                  {item.photographer_display_name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION F: PHOTO OF THE WEEK (Clearly Labeled Editorial Demonstration Feature) */}
      <section className="py-20 bg-[#12161B] border-y border-[#F4F5F6]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 overflow-hidden rounded border border-[#F4F5F6]/10">
              <img
                src={photoOfTheWeek.storage_path}
                alt={photoOfTheWeek.accessibility_text}
                loading="lazy"
                className="w-full h-auto object-cover protected-image"
              />
            </div>
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#0B0D10] border border-[#86BDE8]/30 text-xs uppercase tracking-widest text-[#86BDE8]">
                <span>Editorial Feature · Demo Selection</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#F4F5F6]">
                {photoOfTheWeek.title}
              </h2>
              <p className="text-sm text-[#A4ABB4] leading-relaxed">
                {photoOfTheWeek.description}
              </p>
              <div className="pt-2 border-t border-[#F4F5F6]/10 text-xs text-[#A4ABB4] space-y-1">
                <p><strong className="text-[#F4F5F6]">Featured Credit:</strong> {photoOfTheWeek.photographer_display_name}</p>
                <p><strong className="text-[#F4F5F6]">Category:</strong> {photoOfTheWeek.category_name}</p>
              </div>
              <div className="pt-3">
                <Link
                  href={`/photo/${photoOfTheWeek.slug}`}
                  className="inline-block px-6 py-3 bg-[#86BDE8] text-[#0B0D10] font-medium text-sm rounded hover:bg-[#9ccbf0] transition-colors"
                >
                  View Photograph Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION G: COMMUNITY CALL TO ACTION */}
      <section className="py-24 px-4 sm:px-6 text-center max-w-3xl mx-auto">
        <h2 className="font-serif text-3xl sm:text-5xl text-[#F4F5F6]">
          Your Sky Deserves to Be Seen.
        </h2>
        <p className="mt-5 text-base sm:text-lg text-[#A4ABB4] leading-relaxed">
          Have you captured a sky worth sharing? Submit your photograph and become part of the CloudsArchive community.
        </p>
        <div className="mt-8">
          <Link
            href="/submit"
            className="inline-block px-8 py-4 bg-[#86BDE8] text-[#0B0D10] font-medium text-sm tracking-wide rounded hover:bg-[#9ccbf0] transition-colors"
          >
            Submit Your Photograph
          </Link>
        </div>
      </section>

      {/* SECTION H: INSTAGRAM CONNECTION */}
      <section className="py-16 bg-[#12161B]/50 border-t border-[#F4F5F6]/10 text-center px-4">
        <div className="max-w-xl mx-auto">
          <span className="text-xs uppercase tracking-[0.2em] text-[#86BDE8]">
            Daily Sky Dispatches
          </span>
          <h2 className="mt-2 font-serif text-2xl sm:text-3xl text-[#F4F5F6]">
            Follow the Sky With Us
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#A4ABB4]">
            Discover more beautiful skies and join our growing community on Instagram.
          </p>
          <div className="mt-6">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#86BDE8] text-[#86BDE8] text-sm font-medium rounded hover:bg-[#86BDE8] hover:text-[#0B0D10] transition-colors"
            >
              Follow @CloudsArchive.in
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
