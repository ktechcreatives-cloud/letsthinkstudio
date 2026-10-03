import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, CheckCircle2, Sparkles } from 'lucide-react';
import { getServices } from '@/lib/db/storage';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: "Services & Disciplines",
  description: "Brand identity, graphic design, digital marketing, website development, and packaging design crafted for ambitious businesses.",
};

export const revalidate = 0;

export default async function ServicesPage() {
  const services = await getServices('published');

  return (
    <div className="pt-32 pb-24 sm:pb-32 bg-[#F5F5F3] min-h-screen">
      
      {/* Header */}
      <section className="px-6 sm:px-8 max-w-7xl mx-auto pb-16 border-b border-[#E5E5E0]">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-[#E5E5E0] text-xs font-mono font-medium text-[#FF572D] uppercase tracking-widest rounded-full shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            Studio Disciplines
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#171819] font-heading leading-[1.02]">
            Disciplined craft for ambitious brands.
          </h1>

          <p className="text-xl sm:text-2xl text-[#737373] leading-relaxed font-normal">
            We partner with businesses to deliver thoughtful brand strategy, performance-minded digital systems, and tangible design work built for commercial distinction.
          </p>
        </div>
      </section>

      {/* Services Detailed List */}
      <section className="px-6 sm:px-8 max-w-7xl mx-auto py-16 sm:py-20">
        <div className="space-y-12">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="p-8 sm:p-12 bg-white border border-[#E5E5E0] hover:border-[#FF572D]/50 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                
                {/* Left Meta & Title */}
                <div className="lg:col-span-4 space-y-4">
                  <span className="font-mono text-xs font-semibold text-[#FF572D] uppercase tracking-widest block">
                    // 0{index + 1} Discipline
                  </span>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#171819] font-heading">
                    {service.title}
                  </h2>
                  <p className="text-sm sm:text-base text-[#737373] leading-relaxed">
                    {service.shortDescription}
                  </p>

                  <div className="pt-3">
                    <Button href={`/services/${service.slug}`} variant="outline" withArrow>
                      Explore Service & Scope
                    </Button>
                  </div>
                </div>

                {/* Problems Solved */}
                <div className="lg:col-span-4 space-y-3 p-6 bg-[#FAFAF8] border border-[#EBEBE6] rounded-sm">
                  <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-[#171819]">
                    // Challenges Solved
                  </h3>
                  <ul className="space-y-2.5">
                    {service.problemsSolved.slice(0, 3).map((problem, pIdx) => (
                      <li key={pIdx} className="text-xs sm:text-sm text-[#737373] flex items-start gap-2.5 leading-relaxed">
                        <span className="text-[#FF572D] font-bold mt-0.5">•</span>
                        <span>{problem}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Deliverables Scope */}
                <div className="lg:col-span-4 space-y-3 p-6 bg-[#FAFAF8] border border-[#EBEBE6] rounded-sm">
                  <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-[#171819]">
                    // Scope of Deliverables
                  </h3>
                  <ul className="space-y-2.5">
                    {service.deliverables.slice(0, 4).map((del, dIdx) => (
                      <li key={dIdx} className="text-xs sm:text-sm text-[#171819] flex items-start gap-2.5 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-[#FF572D] flex-shrink-0 mt-0.5" />
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Direct CTA */}
      <section className="px-6 sm:px-8 max-w-7xl mx-auto pt-6">
        <div className="p-10 sm:p-14 bg-white border border-[#E5E5E0] text-center space-y-6 max-w-4xl mx-auto shadow-sm">
          <span className="font-mono text-xs font-semibold text-[#FF572D] uppercase tracking-widest">
            // Cross-Disciplinary Scopes
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#171819] font-heading">
            Need a combined scope tailored to your milestone?
          </h2>
          <p className="text-sm sm:text-base text-[#737373] max-w-2xl mx-auto leading-relaxed">
            Most studio engagements combine multiple disciplines—such as simultaneous Brand Identity, Packaging, and Custom Website Development. We tailor the scope directly around your team's timeline and launch roadmap.
          </p>
          <div className="pt-2">
            <Button href="/contact" size="lg" withArrow variant="primary">
              Start A Project Discussion
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}
