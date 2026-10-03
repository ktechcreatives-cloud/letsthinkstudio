import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, ChevronRight, User } from 'lucide-react';
import { getBlogPostBySlug, getBlogPosts } from '@/lib/db/storage';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 0;

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: 'Article Not Found' };

  return {
    title: post.seoTitle || `${post.title} | Insights`,
    description: post.seoDescription || post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.featuredImage }],
    },
  };
}

export default async function BlogArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getBlogPosts('published');
  const otherPosts = allPosts.filter(p => p.id !== post.id).slice(0, 2);

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="pt-32 pb-24 sm:pb-32 bg-[#F5F5F3] min-h-screen">
      
      {/* Breadcrumb Navigation */}
      <div className="px-6 sm:px-8 max-w-4xl mx-auto mb-8">
        <nav className="flex items-center gap-2 text-xs font-mono text-[#737373]">
          <Link href="/" className="hover:text-[#171819] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#A0A09C]" />
          <Link href="/insights" className="hover:text-[#171819] transition-colors">Insights</Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#A0A09C]" />
          <span className="text-[#FF572D] font-semibold truncate max-w-xs">{post.title}</span>
        </nav>
      </div>

      {/* Article Header */}
      <article className="px-6 sm:px-8 max-w-4xl mx-auto">
        <header className="space-y-6 pb-10 border-b border-[#E5E5E0]">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="accent" className="bg-[#FF572D] text-white border-transparent">{post.category}</Badge>
            <span className="text-xs font-mono text-[#737373] flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(post.publishedAt)}
            </span>
            <span className="text-xs font-mono text-[#737373] flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {post.readingTimeMinutes} min read
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#171819] font-heading leading-[1.05]">
            {post.title}
          </h1>

          <p className="text-lg sm:text-xl text-[#737373] leading-relaxed font-normal">
            {post.excerpt}
          </p>

          <div className="pt-2 flex items-center gap-3 text-xs font-mono text-[#171819]">
            <div className="w-8 h-8 rounded-full bg-white border border-[#E5E5E0] shadow-xs flex items-center justify-center text-[#FF572D]">
              <User className="w-4 h-4" />
            </div>
            <div>
              <span className="block font-bold">{post.authorName}</span>
              <span className="text-[#737373]">Editorial & Creative Strategy</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="my-10 relative aspect-[16/9] w-full overflow-hidden border border-[#E5E5E0] bg-white shadow-sm rounded-sm">
          <Image
            src={post.featuredImage}
            alt={post.featuredImageAlt || post.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* Article Body Content */}
        <div className="max-w-none space-y-6 text-[#171819] text-base sm:text-lg leading-relaxed">
          {post.content.split('\n\n').map((paragraph, idx) => {
            const trimmed = paragraph.trim();
            if (!trimmed) return null;

            if (trimmed.startsWith('### ')) {
              return (
                <h3 key={idx} className="text-2xl sm:text-3xl font-bold text-[#171819] font-heading pt-8 pb-2 tracking-tight">
                  {trimmed.replace('### ', '')}
                </h3>
              );
            }

            if (trimmed.startsWith('#### ')) {
              return (
                <h4 key={idx} className="text-xl sm:text-2xl font-bold text-[#171819] font-heading pt-6 pb-1 tracking-tight">
                  {trimmed.replace('#### ', '')}
                </h4>
              );
            }

            if (trimmed === '---') {
              return <hr key={idx} className="my-10 border-[#E5E5E0]" />;
            }

            if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
              const items = trimmed.split('\n');
              return (
                <ul key={idx} className="space-y-2.5 my-4 pl-4 list-disc list-inside text-[#737373]">
                  {items.map((it, i) => (
                    <li key={i}>{it.replace(/^[\*\-]\s+/, '')}</li>
                  ))}
                </ul>
              );
            }

            return (
              <p key={idx} className="text-[#171819] leading-relaxed">
                {trimmed}
              </p>
            );
          })}
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-14 pt-8 border-t border-[#E5E5E0] flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs text-[#737373] mr-2">// Tags:</span>
            {post.tags.map((tag, idx) => (
              <span key={idx} className="text-xs font-mono px-3 py-1 bg-white border border-[#E5E5E0] text-[#737373] shadow-xs rounded-sm">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Other Recommended Articles */}
        {otherPosts.length > 0 && (
          <div className="mt-16 pt-12 border-t border-[#E5E5E0] space-y-8">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-[#FF572D]">
              // Related Perspectives
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherPosts.map((op) => (
                <Link
                  key={op.id}
                  href={`/insights/${op.slug}`}
                  className="p-6 bg-white border border-[#E5E5E0] hover:border-[#FF572D] transition-colors space-y-3 block group shadow-sm hover:shadow-md rounded-sm"
                >
                  <span className="text-xs font-mono text-[#737373]">{op.category}</span>
                  <h3 className="text-lg font-bold text-[#171819] group-hover:text-[#FF572D] transition-colors font-heading">
                    {op.title}
                  </h3>
                  <p className="text-xs text-[#737373] line-clamp-2 leading-relaxed">
                    {op.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back Link & Direct CTA */}
        <div className="mt-14 pt-8 border-t border-[#E5E5E0] flex flex-wrap items-center justify-between gap-4">
          <Button href="/insights" variant="outline">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to All Insights
          </Button>

          <Button href="/contact" withArrow variant="primary">
            Discuss Your Brand Strategy
          </Button>
        </div>

      </article>

    </div>
  );
}
