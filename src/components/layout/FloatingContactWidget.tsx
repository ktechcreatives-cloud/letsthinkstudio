'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, MessageCircle } from 'lucide-react';

export function FloatingContactWidget() {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 animate-fade-in">
      {/* "Chat with us" pill button */}
      <a
        href="https://wa.me/14158904421"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-2.5 bg-white text-gray-900 border border-gray-200/80 rounded-full shadow-lg hover:shadow-xl hover:border-gray-300 transition-all text-xs font-medium tracking-wide group"
      >
        <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600/10 group-hover:scale-110 transition-transform" />
        <span>Chat with us</span>
      </a>

      {/* Circular orange quick action button */}
      <Link
        href="/contact"
        aria-label="Start a project"
        className="w-11 h-11 rounded-full bg-[#FF4612] hover:bg-[#E03A0A] text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all"
      >
        <ArrowUpRight className="w-5 h-5" />
      </Link>
    </div>
  );
}
