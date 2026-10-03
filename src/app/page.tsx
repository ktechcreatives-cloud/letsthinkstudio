import { getProjects, getServices, getBlogPosts, getTestimonials } from '@/lib/db/storage';
import { Hero } from '@/components/home/Hero';
import { ServicesSection } from '@/components/home/ServicesSection';
import { SelectedWork } from '@/components/home/SelectedWork';
import { ClientLogosBanner } from '@/components/home/ClientLogosBanner';
import { StudioIntro } from '@/components/home/StudioIntro';
import { ProcessSection } from '@/components/home/ProcessSection';
import { WhyUsSection } from '@/components/home/WhyUsSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { LatestInsights } from '@/components/home/LatestInsights';
import { FinalCTA } from '@/components/home/FinalCTA';

export const revalidate = 0;

export default async function HomePage() {
  const [projects, services, blogPosts, testimonials] = await Promise.all([
    getProjects('published'),
    getServices('published'),
    getBlogPosts('published'),
    getTestimonials('published')
  ]);

  return (
    <div className="flex flex-col">
      {/* 4.B Hero Section */}
      <Hero />

      {/* 4.C Selected Work */}
      <SelectedWork projects={projects} />

      {/* 4.D Services Overview */}
      <ServicesSection services={services} />

      {/* 4.E Studio Introduction */}
      <StudioIntro />

      {/* 4.F Process (01 Discover, 02 Design, 03 Develop, 04 Deliver) */}
      <ProcessSection />

      {/* Studio Principles */}
      <WhyUsSection />

      {/* 4.G Trust and Testimonials (Clean CMS-managed, auto-hides when empty) */}
      <TestimonialsSection testimonials={testimonials} />

      {/* 4.H Latest Insights */}
      <LatestInsights posts={blogPosts} />

      {/* 4.I Final CTA */}
      <FinalCTA />
    </div>
  );
}
