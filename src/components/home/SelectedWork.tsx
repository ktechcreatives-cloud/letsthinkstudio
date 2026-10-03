import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Project } from '@/types';

interface SelectedWorkProps {
  projects: Project[];
}

export function SelectedWork({ projects }: SelectedWorkProps) {
  // Use the 4 featured projects matching the design
  const featured = projects.slice(0, 4);

  return (
    <section className="bg-[#0A0A0C] text-white py-20 sm:py-28 border-b border-[#262630]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14">
          
          <div className="lg:col-span-8 space-y-4">
            <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-gray-400 font-semibold block">
              FEATURED WORK
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Selected <br />
              Work<span className="text-[#FF572D]">.</span>
            </h2>

            <p className="text-sm sm:text-base text-gray-400 max-w-xl font-normal leading-relaxed">
              A curated selection of our work across brand architecture, digital platforms, packaging, and creative campaigns.
            </p>
          </div>

          <div className="lg:col-span-4 lg:text-right">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-xs font-semibold text-white hover:text-[#FF572D] transition-colors group"
            >
              <span>View All Projects</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

        </div>

        {/* 4 Project Cards in a Responsive Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((project) => (
            <Link
              key={project.id}
              href={`/work/${project.slug}`}
              className="group block bg-[#141418] border border-[#26262B] rounded-xl overflow-hidden hover:border-[#FF572D]/60 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image Frame */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#1E1E24]">
                <Image
                  src={project.coverImage}
                  alt={project.coverImageAlt || project.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-0.5 bg-black/75 backdrop-blur-xs text-[9px] font-mono uppercase text-gray-300 rounded border border-white/10">
                    Sample Project
                  </span>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-5 flex items-end justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block font-semibold">
                    {project.category.toUpperCase()}
                  </span>
                  <h3 className="text-base font-bold text-white group-hover:text-[#FF572D] transition-colors leading-snug">
                    {project.title}
                  </h3>
                </div>

                {/* Circular Arrow Button */}
                <div className="w-8 h-8 rounded-full border border-gray-600/60 flex items-center justify-center flex-shrink-0 group-hover:border-[#FF572D] group-hover:text-[#FF572D] transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
