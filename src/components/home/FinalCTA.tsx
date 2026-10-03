import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function FinalCTA() {
  return (
    <section className="relative py-24 sm:py-32 px-6 sm:px-8 bg-white border-b border-gray-200/80 overflow-hidden">
      
      {/* Subtle ambient background glow */}
      <div 
        className="pointer-events-none absolute bottom-[-40%] left-1/2 -translate-x-1/2 w-[600px] h-[350px] rounded-full opacity-10 blur-[100px]"
        style={{ background: 'radial-gradient(circle, #FF4612 0%, transparent 70%)' }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
        
        <span className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#F5F5F3] border border-[#E5E5E0] text-xs font-mono text-[#FF572D] uppercase tracking-widest rounded-full font-semibold">
          // START A CONVERSATION
        </span>

        <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#171819] leading-[1.02]">
          Have a project in mind?
        </h2>

        <p className="text-xl sm:text-2xl text-[#737373] font-normal max-w-xl mx-auto leading-relaxed">
          Let&apos;s turn your next idea into something meaningful.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#FF572D] hover:bg-[#E6451B] text-white rounded-full text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 group"
          >
            <span>Let&apos;s Talk</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href="/work"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white hover:bg-gray-50 text-[#171819] border border-[#E5E5E0] rounded-full text-sm font-semibold transition-all duration-200 hover:border-[#171819] active:scale-95"
          >
            <span>Explore Portfolio</span>
          </Link>
        </div>

        <p className="text-xs font-mono text-[#737373] pt-6">
          Direct senior creative review &bull; Non-disclosure agreement guaranteed &bull; 24-hour response window
        </p>

      </div>
    </section>
  );
}
