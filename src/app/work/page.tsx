import React from 'react';
import type { Metadata } from 'next';
import { getProjects } from '@/lib/db/storage';
import { WorkFilterableGrid } from '@/components/work/WorkFilterableGrid';

export const metadata: Metadata = {
  title: "Portfolio & Selected Case Studies",
  description: "Explore selected brand systems, high-performance web applications, and structural packaging designed by Let's Think Studio.",
};

export const revalidate = 0;

export default async function WorkPage() {
  const projects = await getProjects('published');

  return (
    <div className="pt-32 pb-24 sm:pb-32 bg-[#F5F5F3]">
      
      {/* Header */}
      <section className="px-6 sm:px-8 max-w-7xl mx-auto pb-16 border-b border-[#E5E5E0]">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#E5E5E0] text-xs font-mono text-[#FF572D] uppercase tracking-widest rounded-full font-semibold">
            // SELECTED CASE STUDIES
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#171819] leading-[1.02]">
            Portfolio & Selected Work<span className="text-[#FF572D]">.</span>
          </h1>

          <p className="text-xl sm:text-2xl text-[#737373] leading-relaxed font-normal">
            Bespoke brand identities, digital flagships, and tactile packaging engineered for ambitious enterprises.
          </p>
        </div>
      </section>

      {/* Main Interactive Grid */}
      <section className="px-6 sm:px-8 max-w-7xl mx-auto pt-16">
        <WorkFilterableGrid projects={projects} />
      </section>

    </div>
  );
}
