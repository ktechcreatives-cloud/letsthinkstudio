import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react';
import { getServiceBySlug, getServices, getProjects } from '@/lib/db/storage';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 0;

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return { title: 'Service Not Found' };

  return {
    title: service.seoTitle || `${service.title} | Services`,
    description: service.seoDescription || service.shortDescription,
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const [allServices, allProjects] = await Promise.all([
    getServices('published'),
    getProjects('published')
  ]);

  // Related services (exclude current)
  const relatedServices = allServices.filter(s => s.slug !== service.slug).slice(0, 3);

  // Relevant portfolio examples (match category or services provided)
  const relevantProjects = allProjects.filter(p => 
    p.category.toLowerCase().includes(service.slug.replace('-', ' ')) ||
    p.servicesProvided.some(sp => sp.toLowerCase().includes(service.title.toLowerCase()))
  ).slice(0, 2);

  // Fallback to top featured if none match directly
  const displayProjects = relevantProjects.length > 0 ? relevantProjects : allProjects.slice(0, 2);

  return (
    <div className="pt-32 pb-24 sm:pb-32 bg-[#F5F5F3] min-h-screen">
      
      {/* Breadcrumb Navigation */}
      <div className="px-6 sm:px-8 max-w-7xl mx-auto mb-8">
        <nav className="flex items-center gap-2 text-xs font-mono text-[#737373]">
          <Link href="/" className="hover:text-[#171819] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#A0A09C]" />
          <Link href="/services" className="hover:text-[#171819] transition-colors">Services</Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#A0A09C]" />
          <span className="text-[#FF572D] font-semibold">{service.title}</span>
        </nav>
      </div>

      {/* Hero Header */}
      <section className="px-6 sm:px-8 max-w-7xl mx-auto pb-16 border-b border-[#E5E5E0]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-8 space-y-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-[#E5E5E0] text-xs font-mono font-semibold text-[#FF572D] uppercase tracking-widest rounded-full shadow-xs">
              // Studio Discipline
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#171819] font-heading leading-[1.05]">
              {service.headline}
            </h1>

            <p className="text-lg sm:text-xl text-[#737373] leading-relaxed max-w-3xl font-normal">
              {service.introduction}
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Button href="/contact" size="lg" withArrow variant="primary">
                Inquire About {service.title}
              </Button>
              <Button href="#deliverables" variant="outline">
                View Deliverables & Scope
              </Button>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="relative aspect-square w-full overflow-hidden border border-[#E5E5E0] bg-white shadow-sm rounded-sm">
              <Image
                src={service.imageUrl}
                alt={service.title}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
          </div>

        </div>
      </section>

      {/* Problems Solved vs Deliverables */}
      <section id="deliverables" className="px-6 sm:px-8 max-w-7xl mx-auto py-16 sm:py-24 border-b border-[#E5E5E0]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Problems Solved */}
          <div className="p-8 sm:p-10 bg-white border border-[#E5E5E0] shadow-sm space-y-6">
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#FF572D]">
              // Strategic Intent
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#171819] font-heading">
              Commercial Challenges This Solves
            </h2>
            <ul className="space-y-4 pt-2">
              {service.problemsSolved.map((prob, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-[#737373] leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF572D] mt-2.5 flex-shrink-0" />
                  <span>{prob}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Scope & Deliverables */}
          <div className="p-8 sm:p-10 bg-white border border-[#E5E5E0] shadow-sm space-y-6">
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#171819]">
              // Tangible Output
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#171819] font-heading">
              Deliverables & Core Scope
            </h2>
            <ul className="space-y-4 pt-2">
              {service.deliverables.map((del, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-[#171819] leading-relaxed">
                  <CheckCircle2 className="w-5 h-5 text-[#FF572D] flex-shrink-0 mt-0.5" />
                  <span>{del}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>

      {/* Our Process for this Service */}
      {service.processSteps && service.processSteps.length > 0 && (
        <section className="px-6 sm:px-8 max-w-7xl mx-auto py-16 sm:py-24 border-b border-[#E5E5E0]">
          <SectionHeader
            number="02"
            tag="Execution Framework"
            title={`Our Process for ${service.title}`}
            description="How we move from problem interrogation to approved, high-fidelity deliverables."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.processSteps.map((step) => (
              <div key={step.stepNumber} className="p-6 bg-white border border-[#E5E5E0] shadow-sm space-y-3">
                <span className="font-mono text-xl font-bold text-[#FF572D] block">
                  {step.stepNumber}
                </span>
                <h3 className="text-lg font-bold text-[#171819] font-heading">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#737373] leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Relevant Portfolio Examples */}
      <section className="px-6 sm:px-8 max-w-7xl mx-auto py-16 sm:py-24 border-b border-[#E5E5E0]">
        <SectionHeader
          number="03"
          tag="Case Studies"
          title="Relevant Studio Work"
          description="A selection of completed projects demonstrating this discipline in live commercial environments."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayProjects.map((project) => (
            <Link
              key={project.id}
              href={`/work/${project.slug}`}
              className="group block bg-white border border-[#E5E5E0] hover:border-[#FF572D] transition-colors overflow-hidden shadow-sm hover:shadow-md"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#ECECE8]">
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="default" className="backdrop-blur-md bg-white/90 text-[#171819] border border-[#E5E5E0]">
                    {project.category}
                  </Badge>
                </div>
              </div>
              <div className="p-6 space-y-2">
                <h3 className="text-xl font-bold text-[#171819] group-hover:text-[#FF572D] transition-colors font-heading">
                  {project.title}
                </h3>
                <p className="text-sm text-[#737373] line-clamp-2">
                  {project.shortDescription}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQs */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="px-6 sm:px-8 max-w-7xl mx-auto py-16 sm:py-24 border-b border-[#E5E5E0]">
          <SectionHeader
            number="04"
            tag="Inquiries"
            title="Frequently Asked Questions"
            description="Clear answers regarding turnaround times, intellectual property, and engagement models."
          />

          <div className="max-w-4xl space-y-4">
            {service.faqs.map((faq) => (
              <div
                key={faq.id}
                className="p-6 sm:p-8 bg-white border border-[#E5E5E0] shadow-sm space-y-3"
              >
                <h3 className="text-lg font-bold text-[#171819] flex items-start gap-3 font-heading">
                  <HelpCircle className="w-5 h-5 text-[#FF572D] flex-shrink-0 mt-0.5" />
                  <span>{faq.question}</span>
                </h3>
                <p className="text-sm sm:text-base text-[#737373] leading-relaxed pl-8">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related Services */}
      <section className="px-6 sm:px-8 max-w-7xl mx-auto py-16 sm:py-24 border-b border-[#E5E5E0]">
        <h2 className="text-xs font-mono font-semibold uppercase tracking-widest text-[#737373] mb-8">
          // Complementary Disciplines
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedServices.map((rel) => (
            <Link
              key={rel.id}
              href={`/services/${rel.slug}`}
              className="p-6 bg-white border border-[#E5E5E0] hover:border-[#FF572D] transition-colors space-y-2 block group shadow-sm hover:shadow-md"
            >
              <h3 className="text-lg font-bold text-[#171819] group-hover:text-[#FF572D] transition-colors flex items-center justify-between font-heading">
                <span>{rel.title}</span>
                <ArrowUpRight className="w-4 h-4 text-[#FF572D]" />
              </h3>
              <p className="text-xs text-[#737373] line-clamp-2 leading-relaxed">
                {rel.shortDescription}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Direct Service CTA */}
      <section className="px-6 sm:px-8 max-w-7xl mx-auto pt-16">
        <div className="p-10 sm:p-14 bg-white border border-[#E5E5E0] text-center space-y-6 max-w-4xl mx-auto shadow-sm">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#FF572D]">
            // Commission Inquiry
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#171819] font-heading">
            Ready to commission {service.title}?
          </h2>
          <p className="text-base text-[#737373] max-w-2xl mx-auto leading-relaxed">
            Tell us about your brand challenge, timeline, and goals. We will review your brief within 24 business hours.
          </p>
          <div className="pt-2">
            <Button href="/contact" size="lg" withArrow variant="primary">
              Start A Project Inquiry
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}
