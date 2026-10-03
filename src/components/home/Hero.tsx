'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Logo } from '@/components/layout/Logo';

export function Hero() {
  return (
    <section className="relative bg-[#FAFAFC] pt-32 pb-16 md:pt-40 md:pb-24 border-b border-gray-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines, Description, Buttons, Stats */}
          <div className="lg:col-span-6 space-y-8">
            
            {/* Tagline category */}
            <div className="text-[11px] font-mono tracking-[0.24em] text-[#737373] uppercase font-semibold">
              BRANDING &nbsp;&bull;&nbsp; DIGITAL &nbsp;&bull;&nbsp; PACKAGING
            </div>

            {/* Main Headline */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-6xl md:text-[4.25rem] font-extrabold tracking-tight text-[#171819] leading-[1.05]">
                Good ideas <br />
                deserve <br />
                <span className="text-[#FF572D]">great design.</span>
              </h1>
            </div>

            {/* Supporting description */}
            <p className="text-base sm:text-lg text-[#737373] max-w-lg leading-relaxed font-normal">
              We build brands, design digital experiences, and create meaningful communication for ambitious businesses.
            </p>

            {/* Dual Pill Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#FF572D] hover:bg-[#E6451B] text-white rounded-full text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 group"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/work"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white hover:bg-gray-50 text-[#171819] border border-[#E5E5E0] rounded-full text-sm font-semibold transition-all duration-200 hover:border-[#171819] active:scale-95"
              >
                <span>Explore Our Work</span>
              </Link>
            </div>

            {/* 3 Core Discipline Pillars */}
            <div className="pt-8 flex flex-wrap sm:flex-nowrap items-center gap-6 sm:gap-8 border-t border-[#E5E5E0] text-[#171819]">
              <div>
                <span className="text-sm font-bold tracking-tight block text-[#171819]">
                  Brand Strategy
                </span>
                <span className="text-xs text-[#737373] font-medium">
                  Identity & Architecture
                </span>
              </div>

              <div className="hidden sm:block h-8 w-[1px] bg-[#E5E5E0]" />

              <div>
                <span className="text-sm font-bold tracking-tight block text-[#171819]">
                  Digital Platforms
                </span>
                <span className="text-xs text-[#737373] font-medium">
                  UI/UX & Web Flagships
                </span>
              </div>

              <div className="hidden sm:block h-8 w-[1px] bg-[#E5E5E0]" />

              <div>
                <span className="text-sm font-bold tracking-tight block text-[#171819]">
                  Tactile Packaging
                </span>
                <span className="text-xs text-[#737373] font-medium">
                  Print & Environmental
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Arched Brand Mockup Composition */}
          <div className="lg:col-span-6 relative flex items-center justify-center lg:justify-end">
            
            <div className="relative w-full max-w-[540px] flex items-center gap-6">
              
              {/* Central Arched Visual Composition */}
              <div className="relative flex-1">
                
                {/* Vibrant Orange Arch Background */}
                <div className="relative w-full aspect-[4/4.2] rounded-tl-[120px] rounded-br-[60px] bg-[#FF572D] overflow-hidden p-6 sm:p-8 flex flex-col justify-between shadow-xl">
                  
                  {/* Concrete block texture at the top */}
                  <div className="absolute top-0 right-0 w-[55%] h-[40%] bg-stone-300/40 rounded-bl-[40px] overflow-hidden opacity-90">
                    <div 
                      className="w-full h-full bg-cover bg-center"
                      style={{ 
                        backgroundImage: `url('https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600&auto=format&fit=crop')`,
                        filter: 'contrast(120%) brightness(90%)'
                      }}
                    />
                  </div>

                  {/* Black textured card */}
                  <div className="relative z-10 w-[78%] ml-auto aspect-[16/10] bg-[#141416] rounded-xl p-5 shadow-2xl border border-white/10 flex flex-col justify-between transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                    <div className="flex items-center justify-between">
                      <div className="w-2 h-2 rounded-full bg-[#FF572D]" />
                      <span className="text-[9px] font-mono tracking-widest text-gray-500 uppercase">STUDIO</span>
                    </div>
                    <div>
                      <Logo variant="light" size="sm" />
                    </div>
                  </div>

                  {/* Overlapping White textured business card */}
                  <div className="relative z-20 w-[68%] -mt-10 mr-auto aspect-[16/10] bg-white rounded-xl p-5 shadow-2xl border border-gray-200 flex flex-col justify-between transform rotate-3 hover:rotate-0 transition-transform duration-300">
                    <div className="flex items-center justify-between">
                      <Logo variant="dark" size="sm" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF572D]" />
                    </div>
                    <div className="text-[9px] font-mono text-gray-500">
                      Good ideas deserve <br />
                      great design.
                    </div>
                  </div>

                </div>

              </div>

              {/* Far Right: Stacked Slogan Typography & Rotating Stamp Badge */}
              <div className="hidden sm:flex flex-col justify-between items-start h-full py-4 space-y-12">
                
                {/* Vertical Stacked Slogan */}
                <div className="space-y-1 text-[#171819] font-heading text-2xl md:text-3xl leading-[1.15]">
                  <p className="font-extrabold">Good</p>
                  <p className="font-bold">Ideas</p>
                  <p className="font-medium text-[#737373]">Deserve</p>
                  <p className="font-extrabold text-[#FF572D]">Great</p>
                  <p className="font-extrabold">Design.</p>
                  <div className="w-6 h-[2px] bg-[#FF572D] mt-3" />
                </div>

                {/* Circular Stamp Badge */}
                <div className="relative w-20 h-20 rounded-full border border-[#E5E5E0] flex items-center justify-center group hover:border-[#FF572D] transition-colors">
                  <div className="absolute inset-0 animate-spin" style={{ animationDuration: '18s' }}>
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <path
                        id="circlePath"
                        d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                        fill="none"
                      />
                      <text className="text-[9.5px] font-mono uppercase tracking-[0.25em] fill-[#737373]">
                        <textPath href="#circlePath">
                          LET&apos;S THINK STUDIO &bull;
                        </textPath>
                      </text>
                    </svg>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center text-[#171819] group-hover:text-[#FF572D] transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
