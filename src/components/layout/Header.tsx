'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, Search } from 'lucide-react';
import { Logo } from './Logo';

const NAV_LINKS = [
  { name: 'Work', href: '/work' },
  { name: 'Services', href: '/services' },
  { name: 'About', href: '/about' },
  { name: 'Insights', href: '/insights' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isAdminRoute = pathname?.startsWith('/admin');
  if (isAdminRoute) {
    return null;
  }

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#F5F5F3]/95 backdrop-blur-md border-b border-[#E5E5E0] shadow-sm py-3.5' 
          : 'bg-[#F5F5F3]/85 backdrop-blur-sm border-b border-[#E5E5E0]/60 py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        
        {/* Studio Logo */}
        <Logo variant="dark" size="md" />

        {/* Center Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href || pathname?.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm tracking-tight transition-colors relative py-1 flex flex-col items-center font-medium ${
                  isActive ? 'text-[#171819] font-bold' : 'text-[#737373] hover:text-[#171819]'
                }`}
              >
                <span>{link.name}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF572D] absolute -bottom-1" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Search Icon & CTA Pill Button */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/work"
            aria-label="Search projects"
            className="p-2 text-[#737373] hover:text-[#FF572D] transition-colors"
          >
            <Search className="w-4 h-4" />
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-xs font-semibold px-5 py-2.5 bg-[#171819] hover:bg-[#FF572D] text-white rounded-full transition-all duration-200 shadow-sm active:scale-95 group"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className="p-2 text-[#171819] hover:text-[#FF572D] focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[65px] bottom-0 bg-[#F5F5F3] border-t border-[#E5E5E0] p-6 flex flex-col justify-between overflow-y-auto animate-fade-in z-50">
          <div className="space-y-6 pt-4">
            <p className="font-mono text-xs uppercase text-[#737373] tracking-widest">// Navigation</p>
            <div className="space-y-4">
              <Link
                href="/"
                className={`block text-2xl font-bold tracking-tight transition-colors ${
                  pathname === '/' ? 'text-[#FF572D]' : 'text-[#171819] hover:text-[#FF572D]'
                }`}
              >
                Home
              </Link>
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href || pathname?.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block text-2xl font-bold tracking-tight transition-colors ${
                      isActive ? 'text-[#FF572D]' : 'text-[#171819] hover:text-[#FF572D]'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <Link
                href="/contact"
                className={`block text-2xl font-bold tracking-tight transition-colors ${
                  pathname === '/contact' ? 'text-[#FF572D]' : 'text-[#171819] hover:text-[#FF572D]'
                }`}
              >
                Contact
              </Link>
            </div>
          </div>

          <div className="pt-8 border-t border-[#E5E5E0] space-y-4">
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 w-full py-3.5 text-center text-sm font-semibold bg-[#FF572D] text-white rounded-full shadow-md"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-xs text-center text-[#737373] font-mono">
              Good ideas deserve great design.
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
