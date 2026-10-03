import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Clock, Sparkles } from 'lucide-react';
import { getBlogPosts } from '@/lib/db/storage';
import { Badge } from '@/components/ui/Badge';

export const metadata: Metadata = {
  title: "Insights & Perspectives",
  description: "Perspectives on brand strategy, visual culture, digital experiences, and the business leverage of craft.",
};

export const revalidate = 0;

export default async function InsightsPage() {
  const posts = await getBlogPosts('published');

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="pt-32 pb-24 sm:pb-32 bg-[#F5F5F3] min-h-screen">
      
      {/* Header */}
      <section className="px-6 sm:px-8 max-w-7xl mx-auto pb-16 border-b border-[#E5E5E0]">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-[#E5E5E0] text-xs font-mono font-medium text-[#FF572D] uppercase tracking-widest rounded-full shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            Studio Journal
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#171819] font-heading leading-[1.02]">
            Insights & Perspectives.
          </h1>

          <p className="text-xl sm:text-2xl text-[#737373] leading-relaxed font-normal">
            Essays on design leadership, branding psychology, high-stakes digital experiences, and the commercial value of craft.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="px-6 sm:px-8 max-w-7xl mx-auto pt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/insights/${post.slug}`}
              className="group block bg-white border border-[#E5E5E0] hover:border-[#FF572D] transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-md rounded-sm overflow-hidden"
            >
              <div>
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#ECECE8]">
                  <Image
                    src={post.featuredImage}
                    alt={post.featuredImageAlt || post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 z-10">
                    <Badge variant="default" className="backdrop-blur-md bg-white/90 text-[#171819] border border-[#E5E5E0]">
                      {post.category}
                    </Badge>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-3">
                  <div className="flex items-center gap-3 text-xs font-mono text-[#737373]">
                    <span>{formatDate(post.publishedAt)}</span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readingTimeMinutes} min read
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-[#171819] group-hover:text-[#FF572D] transition-colors leading-snug font-heading">
                    {post.title}
                  </h2>

                  <p className="text-sm text-[#737373] line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-8 pt-0 flex items-center justify-between text-xs font-mono font-semibold text-[#FF572D]">
                <span>Read Full Essay</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
