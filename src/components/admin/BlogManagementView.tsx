'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  ExternalLink, 
  BookOpen, 
  Calendar, 
  Clock, 
  X,
  Loader2 
} from 'lucide-react';
import { BlogPost } from '@/types';
import { Button } from '@/components/ui/Button';

interface BlogManagementViewProps {
  initialPosts: BlogPost[];
}

export function BlogManagementView({ initialPosts }: BlogManagementViewProps) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [editingPost, setEditingPost] = useState<Partial<BlogPost> | null>(null);
  const [tagsInput, setTagsInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleCreateNew = () => {
    setEditingPost({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      featuredImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop',
      featuredImageAlt: '',
      category: 'Strategy',
      tags: ['Design', 'Brand'],
      authorName: "Let's Think Studio",
      readingTimeMinutes: 5,
      status: 'published',
      publishedAt: new Date().toISOString(),
      seoTitle: '',
      seoDescription: '',
    });
    setTagsInput('Design, Brand');
    setErrorMsg('');
  };

  const handleOpenEdit = (post: BlogPost) => {
    setEditingPost(post);
    setTagsInput(post.tags?.join(', ') || '');
    setErrorMsg('');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;

    if (!editingPost.title) {
      setErrorMsg('Title is required.');
      return;
    }

    setIsSaving(true);
    setErrorMsg('');

    const formattedTags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    try {
      const res = await fetch('/api/insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...editingPost,
          tags: formattedTags,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        setErrorMsg(err.error || 'Failed to save article');
        setIsSaving(false);
        return;
      }

      const { post: saved } = await res.json();
      setPosts(prev => {
        const exists = prev.some(p => p.id === saved.id);
        if (exists) return prev.map(p => p.id === saved.id ? saved : p);
        return [saved, ...prev];
      });

      setEditingPost(null);
    } catch {
      setErrorMsg('A network error occurred while saving article.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete article "${title}"?`)) return;

    try {
      const res = await fetch(`/api/insights?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setPosts(prev => prev.filter(p => p.id !== id));
      }
    } catch (err) {
      console.error('Failed to delete post:', err);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#262630]">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-[#FF4D12]">
            // Editorial Engine
          </span>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Insights & Journal Management
          </h1>
          <p className="text-xs text-[#9494A8] font-mono mt-1">
            Author and publish agency essays, strategic frameworks, and design leadership notes.
          </p>
        </div>

        <Button onClick={handleCreateNew} variant="primary" size="sm" withArrow>
          <Plus className="w-3.5 h-3.5 mr-1" />
          Write New Article
        </Button>
      </div>

      {/* Posts Table */}
      <div className="bg-[#111114] border border-[#262630] overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="border-b border-[#262630] text-[#9494A8] bg-[#16161C]">
              <th className="py-3 px-4 uppercase">Cover</th>
              <th className="py-3 px-4 uppercase">Title & Excerpt</th>
              <th className="py-3 px-4 uppercase">Category</th>
              <th className="py-3 px-4 uppercase">Published</th>
              <th className="py-3 px-4 uppercase">Status</th>
              <th className="py-3 px-4 uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#262630]">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-[#181820]/60 transition-colors">
                <td className="py-3 px-4 w-20">
                  <div className="relative aspect-[16/9] w-16 overflow-hidden bg-[#181820] border border-[#262630]">
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </td>

                <td className="py-3 px-4">
                  <span className="text-white font-bold block text-sm">{post.title}</span>
                  <span className="text-[#9494A8] block text-[11px] line-clamp-1">{post.excerpt}</span>
                </td>

                <td className="py-3 px-4 text-[#F5F5F8]">
                  {post.category}
                </td>

                <td className="py-3 px-4 text-[#9494A8]">
                  {new Date(post.publishedAt).toLocaleDateString()}
                </td>

                <td className="py-3 px-4">
                  <span className={`px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider border ${
                    post.status === 'published'
                      ? 'bg-emerald-950/60 border-emerald-500 text-emerald-400'
                      : 'bg-amber-950/60 border-amber-500 text-amber-300'
                  }`}>
                    {post.status}
                  </span>
                </td>

                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/insights/${post.slug}`}
                      target="_blank"
                      className="p-1.5 bg-[#181820] hover:bg-[#252532] text-[#9494A8] hover:text-white border border-[#262630]"
                      title="View Article Live"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>

                    <button
                      onClick={() => handleOpenEdit(post)}
                      className="p-1.5 bg-[#181820] hover:bg-[#252532] text-white border border-[#262630]"
                      title="Edit Article"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => handleDelete(post.id, post.title)}
                      className="p-1.5 bg-[#181820] hover:bg-red-950 text-red-400 border border-[#262630]"
                      title="Delete Article"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Article Editor Modal */}
      {editingPost && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
          <div className="bg-[#111114] border border-[#262630] w-full max-w-4xl max-h-[92vh] flex flex-col justify-between overflow-hidden shadow-2xl">
            
            <div className="p-6 border-b border-[#262630] flex items-center justify-between">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#FF4D12]">
                  // Markdown Journal Editor
                </span>
                <h2 className="text-xl font-bold text-white">
                  {editingPost.id ? `Edit: ${editingPost.title}` : 'Compose New Insight Article'}
                </h2>
              </div>
              <button
                onClick={() => setEditingPost(null)}
                className="p-2 text-[#9494A8] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-6 text-xs font-mono">
              {errorMsg && (
                <div className="p-3 bg-red-950/40 border border-red-800 text-red-300">
                  {errorMsg}
                </div>
              )}

              {/* Title & Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-white uppercase font-bold">Article Headline *</label>
                  <input
                    type="text"
                    required
                    value={editingPost.title || ''}
                    onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                    className="w-full px-3 py-2 bg-[#181820] border border-[#262630] text-white focus:outline-none focus:border-[#FF4D12]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-white uppercase font-bold">Custom Slug (optional)</label>
                  <input
                    type="text"
                    placeholder="auto-generated-if-empty"
                    value={editingPost.slug || ''}
                    onChange={(e) => setEditingPost({ ...editingPost, slug: e.target.value })}
                    className="w-full px-3 py-2 bg-[#181820] border border-[#262630] text-white focus:outline-none focus:border-[#FF4D12]"
                  />
                </div>
              </div>

              {/* Category, Status, Reading Time */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-white uppercase font-bold">Category</label>
                  <input
                    type="text"
                    value={editingPost.category || 'Strategy'}
                    onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                    className="w-full px-3 py-2 bg-[#181820] border border-[#262630] text-white focus:outline-none focus:border-[#FF4D12]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-white uppercase font-bold">Reading Time (Minutes)</label>
                  <input
                    type="number"
                    min={1}
                    value={editingPost.readingTimeMinutes || 5}
                    onChange={(e) => setEditingPost({ ...editingPost, readingTimeMinutes: parseInt(e.target.value) || 5 })}
                    className="w-full px-3 py-2 bg-[#181820] border border-[#262630] text-white focus:outline-none focus:border-[#FF4D12]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-white uppercase font-bold">Publication Status</label>
                  <select
                    value={editingPost.status || 'published'}
                    onChange={(e) => setEditingPost({ ...editingPost, status: e.target.value as any })}
                    className="w-full px-3 py-2 bg-[#181820] border border-[#262630] text-white focus:outline-none focus:border-[#FF4D12]"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft (Private)</option>
                  </select>
                </div>
              </div>

              {/* Featured Image URL & Tags */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-white uppercase font-bold">Featured Image URL</label>
                  <input
                    type="url"
                    value={editingPost.featuredImage || ''}
                    onChange={(e) => setEditingPost({ ...editingPost, featuredImage: e.target.value })}
                    className="w-full px-3 py-2 bg-[#181820] border border-[#262630] text-white focus:outline-none focus:border-[#FF4D12]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-white uppercase font-bold">Tags (comma separated)</label>
                  <input
                    type="text"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    className="w-full px-3 py-2 bg-[#181820] border border-[#262630] text-white focus:outline-none focus:border-[#FF4D12]"
                  />
                </div>
              </div>

              {/* Excerpt */}
              <div className="space-y-1.5">
                <label className="text-white uppercase font-bold">Excerpt / Executive Summary</label>
                <textarea
                  rows={2}
                  value={editingPost.excerpt || ''}
                  onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                  className="w-full px-3 py-2 bg-[#181820] border border-[#262630] text-white focus:outline-none focus:border-[#FF4D12]"
                />
              </div>

              {/* Content / Markdown */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[#FF4D12] uppercase font-bold">
                    Article Longform Content (Markdown Supported)
                  </label>
                  <span className="text-[#9494A8]">Supports ### H3, #### H4, list bullets, quotes</span>
                </div>
                <textarea
                  rows={10}
                  value={editingPost.content || ''}
                  onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                  className="w-full p-3 bg-[#181820] border border-[#262630] text-white font-mono text-xs focus:outline-none focus:border-[#FF4D12]"
                />
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-[#262630] flex items-center justify-between">
                <Button onClick={() => setEditingPost(null)} variant="outline" size="sm">
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm" isLoading={isSaving}>
                  {editingPost.id ? 'Save Article' : 'Publish Article'}
                </Button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
