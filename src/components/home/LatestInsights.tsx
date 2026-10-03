import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight, Clock } from 'lucide-react';
import { BlogPost } from '@/types';

interface LatestInsightsProps {
  posts: BlogPost[];
}

export function LatestInsights({ posts }: LatestInsightsProps) {
  const displayPosts = posts.slice(0, 3);

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
    <section className="bg-white py-20 sm:py-28 px-6 sm:px-8 border-b border-gray-200/80">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-[#737373] font-semibold block">
              // STUDIO INSIGHTS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#171819]">
              Perspectives On Strategy, Craft & Brand Equity<span className="text-[#FF572D]">.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#737373]">
              Essays and critical examinations of design value, brand architecture, and technology.
            </p>
          </div>

          <Link
            href="/insights"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#171819] hover:text-[#FF572D] transition-colors group"
          >
            <span>Read All Articles</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayPosts.map((post) => (
            <Link
              key={post.id}
              href={`/insights/${post.slug}`}
              className="group block bg-white border border-[#E5E5E0] rounded-xl hover:border-[#171819] hover:shadow-sm transition-all duration-200 flex flex-col justify-between overflow-hidden"
            >
              <div>
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100">
                  <Image
                    src={post.featuredImage}
                    alt={post.featuredImageAlt || post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider font-semibold bg-white/95 text-[#171819] shadow-xs rounded border border-[#E5E5E0]">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-xs font-mono text-[#737373]">
                    <span>{formatDate(post.publishedAt)}</span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readingTimeMinutes} min read
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#171819] group-hover:text-[#FF572D] transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs text-[#737373] line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between text-xs font-mono text-[#FF572D]">
                <span className="font-semibold">Read Full Essay</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
