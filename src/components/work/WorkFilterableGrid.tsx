'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '@/types';
import { Badge } from '@/components/ui/Badge';

interface WorkFilterableGridProps {
  projects: Project[];
}

const CATEGORIES = [
  'All',
  'Branding',
  'Graphic Design',
  'Advertising Campaigns',
  'Digital Marketing',
  'Websites and UI/UX',
  'Packaging',
  'Creative Strategy'
];

export function WorkFilterableGrid({ projects }: WorkFilterableGridProps) {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div className="space-y-12">
      
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 pb-6 border-b border-[#E5E5E0]">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-full transition-all ${
                isActive
                  ? 'bg-[#FF572D] text-white font-bold shadow-xs'
                  : 'bg-white text-[#737373] border border-[#E5E5E0] hover:text-[#171819] hover:border-[#171819]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      {filteredProjects.length === 0 ? (
        <div className="py-20 text-center p-12 bg-white border border-[#E5E5E0] rounded-xl">
          <p className="font-mono text-sm text-[#737373]">
            // No published projects in this category currently.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {filteredProjects.map((project) => (
            <Link
              key={project.id}
              href={`/work/${project.slug}`}
              className="group block bg-white border border-[#E5E5E0] rounded-xl hover:border-[#171819] hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              {/* Image Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
                <Image
                  src={project.coverImage}
                  alt={project.coverImageAlt || project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                  <span className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider font-semibold bg-white/95 text-[#171819] shadow-xs rounded border border-[#E5E5E0]">
                    {project.category}
                  </span>
                  <span className="px-2 py-0.5 bg-black/70 backdrop-blur-xs text-[9px] font-mono uppercase text-gray-200 rounded">
                    Sample Case Study
                  </span>
                </div>

                <div className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center text-[#171819] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowUpRight className="w-4 h-4 text-[#FF572D]" />
                </div>
              </div>

              {/* Text Meta */}
              <div className="p-6 sm:p-8 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-[#737373]">
                  <span>// {project.projectYear}</span>
                  {project.clientName && <span className="font-semibold text-[#171819]">{project.clientName}</span>}
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-[#171819] group-hover:text-[#FF572D] transition-colors editorial-sub">
                  {project.title}
                </h2>

                <p className="text-sm sm:text-base text-[#737373] line-clamp-2 leading-relaxed">
                  {project.shortDescription}
                </p>

                <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono text-[#737373]">
                  {project.servicesProvided.map((srv, idx) => (
                    <span key={idx}>&bull; {srv}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

    </div>
  );
}
