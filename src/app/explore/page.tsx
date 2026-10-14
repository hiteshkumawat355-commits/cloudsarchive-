'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { CATEGORIES, DEMO_PHOTOGRAPHS } from '@/lib/demo-data';

export default function ExplorePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [locationFilter, setLocationFilter] = useState<string>('');
  const [sortBy, setSortBy] = useState<'recent' | 'featured'>('recent');

  const filteredPhotos = useMemo(() => {
    return DEMO_PHOTOGRAPHS.filter((photo) => {
      const matchesCategory =
        selectedCategory === 'all' || photo.category_slug === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !q ||
        photo.title.toLowerCase().includes(q) ||
        photo.photographer_display_name.toLowerCase().includes(q) ||
        photo.category_name.toLowerCase().includes(q);
      const loc = locationFilter.trim().toLowerCase();
      const matchesLocation =
        !loc || (photo.location && photo.location.toLowerCase().includes(loc));

      return matchesCategory && matchesQuery && matchesLocation;
    }).sort((a, b) => {
      if (sortBy === 'featured') {
        return Number(b.is_featured) - Number(a.is_featured);
      }
      return new Date(b.published_at).getTime() - new Date(a.published_at).getTime();
    });
  }, [selectedCategory, searchQuery, locationFilter, sortBy]);

  return (
    <main className="min-h-screen bg-[#0B0D10] text-[#F4F5F6] pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <header className="max-w-2xl mb-12">
          <span className="text-xs uppercase tracking-[0.2em] text-[#86BDE8]">
            Public Archive
          </span>
          <h1 className="mt-2 font-serif text-4xl sm:text-5xl text-[#F4F5F6]">
            Explore the Sky
          </h1>
          <p className="mt-3 text-[#A4ABB4] text-base sm:text-lg">
            A collection of moments captured above us.
          </p>
        </header>

        {/* Filter & Search Bar */}
        <section
          id="search"
          aria-label="Gallery Filters"
          className="bg-[#12161B] border border-[#F4F5F6]/10 rounded p-5 mb-10 space-y-5"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="search-input" className="block text-xs uppercase tracking-wider text-[#A4ABB4] mb-1.5">
                Search Title, Photographer, or Category
              </label>
              <input
                id="search-input"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g., Alpine, Cumulus..."
                className="w-full px-4 py-2.5 bg-[#0B0D10] border border-[#F4F5F6]/15 rounded text-sm text-[#F4F5F6] focus:outline-none focus:border-[#86BDE8]"
              />
            </div>

            <div>
              <label htmlFor="location-input" className="block text-xs uppercase tracking-wider text-[#A4ABB4] mb-1.5">
                Filter by Location
              </label>
              <input
                id="location-input"
                type="text"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                placeholder="e.g., Western Ghats..."
                className="w-full px-4 py-2.5 bg-[#0B0D10] border border-[#F4F5F6]/15 rounded text-sm text-[#F4F5F6] focus:outline-none focus:border-[#86BDE8]"
              />
            </div>

            <div>
              <label htmlFor="sort-select" className="block text-xs uppercase tracking-wider text-[#A4ABB4] mb-1.5">
                Sort By
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'recent' | 'featured')}
                className="w-full px-4 py-2.5 bg-[#0B0D10] border border-[#F4F5F6]/15 rounded text-sm text-[#F4F5F6] focus:outline-none focus:border-[#86BDE8]"
              >
                <option value="recent">Recently Added</option>
                <option value="featured">Featured</option>
              </select>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 rounded text-xs tracking-wide transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-[#86BDE8] text-[#0B0D10] font-medium'
                  : 'bg-[#0B0D10] text-[#A4ABB4] border border-[#F4F5F6]/10 hover:text-[#F4F5F6]'
              }`}
            >
              All Skies
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-3.5 py-1.5 rounded text-xs tracking-wide transition-colors ${
                  selectedCategory === cat.slug
                    ? 'bg-[#86BDE8] text-[#0B0D10] font-medium'
                    : 'bg-[#0B0D10] text-[#A4ABB4] border border-[#F4F5F6]/10 hover:text-[#F4F5F6]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </section>

        {/* Results or Empty State */}
        {filteredPhotos.length === 0 ? (
          <div className="text-center py-20 bg-[#12161B] border border-[#F4F5F6]/10 rounded p-8">
            <h2 className="font-serif text-2xl text-[#F4F5F6]">
              No matching skies found
            </h2>
            <p className="mt-2 text-sm text-[#A4ABB4] max-w-md mx-auto">
              No approved photographs match your current filter selection. Try clearing your search filters or explore all categories.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setLocationFilter('');
              }}
              className="mt-6 px-6 py-2.5 bg-[#86BDE8] text-[#0B0D10] text-xs font-medium uppercase tracking-wider rounded"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredPhotos.map((photo) => (
              <article
                key={photo.id}
                className="break-inside-avoid bg-[#12161B] border border-[#F4F5F6]/10 rounded overflow-hidden group"
              >
                <Link href={`/photo/${photo.slug}`} className="block overflow-hidden">
                  <img
                    src={photo.storage_path}
                    alt={photo.accessibility_text}
                    loading="lazy"
                    className="w-full h-auto object-cover group-hover:scale-[1.03] transition-transform duration-500 protected-image"
                  />
                </Link>
                <div className="p-5">
                  <span className="text-xs uppercase tracking-wider text-[#86BDE8]">
                    {photo.category_name}
                  </span>
                  <h2 className="mt-1 text-lg font-medium text-[#F4F5F6]">
                    <Link href={`/photo/${photo.slug}`} className="hover:text-[#86BDE8]">
                      {photo.title}
                    </Link>
                  </h2>
                  <p className="mt-1 text-xs text-[#A4ABB4]">
                    By {photo.photographer_display_name}
                    {photo.location ? ` · ${photo.location}` : ''}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
