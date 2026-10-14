'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/explore', label: 'Explore' },
    { href: '/community', label: 'Community' },
    { href: '/submit', label: 'Submit a Photo' },
    { href: '/about', label: 'About' },
  ];

  const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://instagram.com/cloudsarchive';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled || mobileMenuOpen
          ? 'bg-[#0B0D10]/95 backdrop-blur-md border-b border-[#F4F5F6]/10'
          : 'bg-gradient-to-b from-[#0B0D10]/80 to-transparent'
      }`}
    >
      <nav
        aria-label="Global Navigation"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between"
      >
        {/* Left: Brand Wordmark */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#86BDE8] rounded"
        >
          <span className="w-8 h-8 rounded-full border border-[#86BDE8]/40 flex items-center justify-center bg-[#12161B]">
            <svg className="w-4 h-4 text-[#86BDE8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.5 19h11a4.5 4.5 0 00.64-8.955A5.5 5.5 0 007.07 8.61 4 4 0 006.5 19z" />
            </svg>
          </span>
          <span className="text-lg tracking-wider font-medium text-[#F4F5F6]">
            Clouds<span className="font-light text-[#86BDE8]">Archive</span>
          </span>
        </Link>

        {/* Center: Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'page' : undefined}
                className={`text-sm tracking-wide transition-colors py-1 border-b-2 ${
                  isActive
                    ? 'text-[#F4F5F6] border-[#86BDE8] font-medium'
                    : 'text-[#A4ABB4] border-transparent hover:text-[#F4F5F6]'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right: Search & Instagram & Mobile CTA */}
        <div className="flex items-center gap-4">
          <Link
            href="/explore#search"
            aria-label="Search Photographs"
            className="p-2 text-[#A4ABB4] hover:text-[#F4F5F6] transition-colors rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[#86BDE8]"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
            </svg>
          </Link>

          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="CloudsArchive on Instagram"
            className="p-2 text-[#A4ABB4] hover:text-[#86BDE8] transition-colors rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[#86BDE8]"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
          </a>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            className="md:hidden p-2 text-[#F4F5F6] hover:text-[#86BDE8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#86BDE8] rounded"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Accessible Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-[#12161B] border-b border-[#F4F5F6]/10 px-6 py-6 space-y-4"
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2 text-base ${
                  isActive ? 'text-[#86BDE8] font-medium' : 'text-[#F4F5F6]'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="pt-2 border-t border-[#F4F5F6]/10">
            <Link
              href="/submit"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center py-3 bg-[#86BDE8] text-[#0B0D10] font-medium text-sm rounded"
            >
              Share Your Sky
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
