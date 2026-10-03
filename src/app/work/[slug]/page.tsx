import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, ChevronRight } from 'lucide-react';
import { getProjectBySlug, getProjects } from '@/lib/db/storage';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 0;

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: 'Project Not Found' };

  return {
    title: project.seoTitle || `${project.title} | Case Study`,
    description: project.seoDescription || project.shortDescription,
    openGraph: {
      title: project.title,
      description: project.shortDescription,
      images: [{ url: project.coverImage }],
    },
  };
}

export default async function ProjectCaseStudyPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const allProjects = await getProjects('published');
  const currentIndex = allProjects.findIndex(p => p.id === project.id);
  
  // Next project calculation
  const nextProject = currentIndex >= 0 && currentIndex < allProjects.length - 1
    ? allProjects[currentIndex + 1]
    : allProjects[0];

  // Related projects
  const relatedProjects = allProjects
    .filter(p => p.id !== project.id && (p.category === project.category || p.industry === project.industry))
    .slice(0, 2);

  return (
    <div className="pt-32 pb-24 sm:pb-32 bg-[#F5F5F3]">
      
      {/* Breadcrumb Navigation */}
      <div className="px-6 sm:px-8 max-w-7xl mx-auto mb-8">
        <nav className="flex items-center gap-2 text-xs font-mono text-[#737373]">
          <Link href="/" className="hover:text-[#171819] transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/work" className="hover:text-[#171819] transition-colors">Work</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#FF572D] font-bold">{project.title}</span>
        </nav>
      </div>

      {/* Hero Title & Metadata Matrix */}
      <section className="px-6 sm:px-8 max-w-7xl mx-auto pb-16 border-b border-[#E5E5E0]">
        <div className="space-y-6 max-w-5xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 bg-white border border-[#E5E5E0] text-xs font-mono text-[#FF572D] uppercase tracking-wider rounded-full font-bold">
              {project.category}
            </span>
            {project.industry && (
              <span className="text-xs font-mono text-[#737373]">
                // {project.industry}
              </span>
            )}
            <span className="px-2 py-0.5 bg-[#171819]/5 text-[10px] font-mono text-[#737373] rounded border border-[#E5E5E0]">
              Sample Case Study
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#171819] leading-[1.02]">
            {project.title}
          </h1>

          <p className="text-xl sm:text-2xl text-[#737373] leading-relaxed max-w-3xl font-normal">
            {project.shortDescription}
          </p>
        </div>

        {/* Project Meta Bar */}
        <div className="mt-12 pt-8 border-t border-[#E5E5E0] grid grid-cols-2 md:grid-cols-4 gap-8 text-xs font-mono">
          <div>
            <span className="text-[#737373] block uppercase tracking-wider mb-1">// Client / Brand</span>
            <span className="text-[#171819] text-sm font-bold">{project.clientName || 'Private Partner'}</span>
          </div>
          <div>
            <span className="text-[#737373] block uppercase tracking-wider mb-1">// Project Year</span>
            <span className="text-[#171819] text-sm font-bold">{project.projectYear}</span>
          </div>
          <div>
            <span className="text-[#737373] block uppercase tracking-wider mb-1">// Primary Category</span>
            <span className="text-[#171819] text-sm font-bold">{project.category}</span>
          </div>
          <div>
            <span className="text-[#737373] block uppercase tracking-wider mb-1">// Disciplines Provided</span>
            <div className="text-[#171819] text-sm font-bold space-y-0.5">
              {project.servicesProvided.map((s, i) => (
                <div key={i}>{s}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Massive Editorial Cover Image */}
      <section className="px-6 sm:px-8 max-w-7xl mx-auto py-12">
        <div className="relative aspect-[16/9] w-full overflow-hidden border border-[#E5E5E0] rounded-xl bg-white shadow-sm">
          <Image
            src={project.coverImage}
            alt={project.coverImageAlt || project.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* Case Study Narrative */}
      <section className="px-6 sm:px-8 max-w-5xl mx-auto py-16 space-y-16 border-b border-[#E5E5E0]">
        
        {/* Project Brief */}
        {project.projectBrief && (
          <div className="space-y-4">
            <span className="font-mono text-xs text-[#FF572D] uppercase tracking-widest block font-bold">
              // 01 The Assignment
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#171819]">
              Project Brief & Objective
            </h2>
            <p className="text-base sm:text-lg text-[#737373] leading-relaxed">
              {project.projectBrief}
            </p>
          </div>
        )}

        {/* Business Challenge vs Creative Strategy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {project.businessChallenge && (
            <div className="p-8 bg-white border border-[#E5E5E0] rounded-xl space-y-3 shadow-xs">
              <span className="font-mono text-xs text-[#FF572D] uppercase tracking-widest block font-bold">
                // 02 The Challenge
              </span>
              <h3 className="text-xl font-bold text-[#171819]">
                Commercial Challenge
              </h3>
              <p className="text-sm sm:text-base text-[#737373] leading-relaxed">
                {project.businessChallenge}
              </p>
            </div>
          )}

          {project.creativeStrategy && (
            <div className="p-8 bg-white border border-[#E5E5E0] rounded-xl space-y-3 shadow-xs">
              <span className="font-mono text-xs text-[#171819] uppercase tracking-widest block font-bold">
                // 03 The Strategic Thesis
              </span>
              <h3 className="text-xl font-bold text-[#171819]">
                Creative Strategy
              </h3>
              <p className="text-sm sm:text-base text-[#737373] leading-relaxed">
                {project.creativeStrategy}
              </p>
            </div>
          )}
        </div>

        {/* Design Process & Execution */}
        {project.designProcess && (
          <div className="space-y-4">
            <span className="font-mono text-xs text-[#FF572D] uppercase tracking-widest block font-bold">
              // 04 Process & Craft
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#171819]">
              Design & Production Process
            </h2>
            <p className="text-base sm:text-lg text-[#737373] leading-relaxed">
              {project.designProcess}
            </p>
          </div>
        )}

        {/* Final Solution */}
        {project.finalSolution && (
          <div className="p-8 sm:p-10 bg-white border border-[#E5E5E0] rounded-xl space-y-4 shadow-xs">
            <span className="font-mono text-xs text-[#FF572D] uppercase tracking-widest block font-bold">
              // 05 Final Solution
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#171819]">
              The Implemented Solution
            </h2>
            <p className="text-base sm:text-lg text-[#171819] leading-relaxed">
              {project.finalSolution}
            </p>
          </div>
        )}

        {/* Verified Results */}
        {project.verifiedResults && (
          <div className="p-8 bg-white border-l-4 border-[#FF572D] border border-r-[#E5E5E0] border-t-[#E5E5E0] border-b-[#E5E5E0] rounded-r-xl space-y-2 shadow-xs">
            <span className="font-mono text-xs text-[#FF572D] uppercase tracking-widest block font-bold">
              // Verified Results
            </span>
            <p className="text-lg font-bold text-[#171819]">
              {project.verifiedResults}
            </p>
          </div>
        )}

      </section>

      {/* Project Gallery */}
      {project.galleryImages && project.galleryImages.length > 0 && (
        <section className="px-6 sm:px-8 max-w-7xl mx-auto py-20 border-b border-[#E5E5E0]">
          <h2 className="font-mono text-xs uppercase tracking-widest text-[#FF572D] mb-8 font-bold">
            // VISUAL ARTIFACTS & GALLERY
          </h2>
          <div className="space-y-12">
            {project.galleryImages.map((img, idx) => (
              <div key={idx} className="relative aspect-[16/10] w-full overflow-hidden border border-[#E5E5E0] rounded-xl bg-white shadow-sm">
                <Image
                  src={img}
                  alt={`${project.title} gallery asset ${idx + 1}`}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Next Project Navigation */}
      {nextProject && (
        <section className="px-6 sm:px-8 max-w-7xl mx-auto py-20 border-b border-[#E5E5E0]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 bg-white border border-[#E5E5E0] rounded-xl shadow-xs">
            <div className="space-y-1 text-center sm:text-left">
              <span className="font-mono text-xs text-[#FF572D] uppercase tracking-widest font-bold">
                // UP NEXT
              </span>
              <h3 className="text-2xl font-bold text-[#171819]">
                {nextProject.title}
              </h3>
              <p className="text-xs font-mono text-[#737373]">
                {nextProject.category} &bull; {nextProject.projectYear}
              </p>
            </div>
            <Link
              href={`/work/${nextProject.slug}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#171819] hover:bg-[#FF572D] text-white rounded-full text-xs font-semibold transition-all group"
            >
              <span>View Next Case Study</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </section>
      )}

      {/* Final Project CTA */}
      <section className="px-6 sm:px-8 max-w-7xl mx-auto pt-16">
        <div className="p-8 sm:p-12 bg-white border border-[#E5E5E0] rounded-2xl text-center space-y-6 max-w-4xl mx-auto shadow-sm">
          <h2 className="text-3xl font-extrabold text-[#171819]">
            Have an idea for your brand?
          </h2>
          <p className="text-base text-[#737373] max-w-xl mx-auto">
            Let&apos;s build a distinct brand identity, high-converting digital platform, or packaging system that commands authority.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#FF572D] hover:bg-[#E6451B] text-white rounded-full text-sm font-semibold transition-all duration-200 shadow-md active:scale-95 group"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

    </div>
  );
}
