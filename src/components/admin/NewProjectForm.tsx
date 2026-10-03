'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Sparkles, Loader2, Plus, Trash2 } from 'lucide-react';
import { Project } from '@/types';
import { Button } from '@/components/ui/Button';

export function NewProjectForm() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    slug: '',
    clientName: '',
    industry: '',
    projectYear: new Date().getFullYear().toString(),
    category: 'Branding',
    servicesProvided: ['Brand Strategy & Identity'],
    shortDescription: '',
    projectBrief: '',
    businessChallenge: '',
    creativeStrategy: '',
    designProcess: '',
    finalSolution: '',
    verifiedResults: '',
    coverImage: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=1200&auto=format&fit=crop',
    coverImageAlt: '',
    galleryImages: [],
    featured: false,
    status: 'published',
    seoTitle: '',
    seoDescription: '',
  });

  const [newDeliverable, setNewDeliverable] = useState('');
  const [newGalleryUrl, setNewGalleryUrl] = useState('');

  const handleAddDeliverable = () => {
    if (!newDeliverable.trim()) return;
    setFormData(prev => ({
      ...prev,
      servicesProvided: [...(prev.servicesProvided || []), newDeliverable.trim()]
    }));
    setNewDeliverable('');
  };

  const handleRemoveDeliverable = (index: number) => {
    setFormData(prev => ({
      ...prev,
      servicesProvided: (prev.servicesProvided || []).filter((_, i) => i !== index)
    }));
  };

  const handleAddGalleryImage = () => {
    if (!newGalleryUrl.trim()) return;
    setFormData(prev => ({
      ...prev,
      galleryImages: [...(prev.galleryImages || []), newGalleryUrl.trim()]
    }));
    setNewGalleryUrl('');
  };

  const handleRemoveGalleryImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      galleryImages: (prev.galleryImages || []).filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title?.trim() || !formData.category?.trim()) {
      setErrorMsg('Project title and category are required.');
      return;
    }

    setIsSaving(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const err = await res.json();
        setErrorMsg(err.error || 'Failed to create project');
        setIsSaving(false);
        return;
      }

      router.push('/admin/projects');
      router.refresh();
    } catch {
      setErrorMsg('A network error occurred while saving the project.');
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#262630]">
        <div>
          <Link
            href="/admin/projects"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#9494A8] hover:text-white transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Projects List
          </Link>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Create New Portfolio Case Study
          </h1>
          <p className="text-xs text-[#9494A8] font-mono mt-1">
            Author a new project with challenge, strategy, deliverables, and gallery assets.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button href="/admin/projects" variant="outline" size="sm">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="primary" size="sm" isLoading={isSaving} withArrow={!isSaving}>
            Publish Case Study
          </Button>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 bg-red-950/40 border border-red-800 text-red-300 text-xs font-mono">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Core Metadata Card */}
        <div className="p-6 sm:p-8 bg-[#111114] border border-[#262630] space-y-6">
          <span className="font-mono text-xs uppercase tracking-widest text-[#FF4D12] block">
            // Core Project Details
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase text-white font-bold block">
                Project Title <span className="text-[#FF4D12]">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Luminary Brand Architecture"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#181820] border border-[#262630] text-white text-sm focus:outline-none focus:border-[#FF4D12]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase text-white font-bold block">
                URL Slug (leave blank for auto-generation)
              </label>
              <input
                type="text"
                placeholder="e.g. luminary-brand-architecture"
                value={formData.slug || ''}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#181820] border border-[#262630] text-white text-sm focus:outline-none focus:border-[#FF4D12]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase text-white block">
                Client / Brand Name
              </label>
              <input
                type="text"
                placeholder="e.g. Luminary Global"
                value={formData.clientName || ''}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#181820] border border-[#262630] text-white text-sm focus:outline-none focus:border-[#FF4D12]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase text-white block">
                Industry
              </label>
              <input
                type="text"
                placeholder="e.g. Real Estate & Hospitality"
                value={formData.industry || ''}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#181820] border border-[#262630] text-white text-sm focus:outline-none focus:border-[#FF4D12]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase text-white block">
                Project Year
              </label>
              <input
                type="text"
                value={formData.projectYear || ''}
                onChange={(e) => setFormData({ ...formData, projectYear: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#181820] border border-[#262630] text-white text-sm focus:outline-none focus:border-[#FF4D12]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase text-white font-bold block">
                Category <span className="text-[#FF4D12]">*</span>
              </label>
              <select
                value={formData.category || 'Branding'}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#181820] border border-[#262630] text-white text-sm focus:outline-none focus:border-[#FF4D12]"
              >
                <option value="Branding">Branding</option>
                <option value="Graphic Design">Graphic Design</option>
                <option value="Advertising Campaigns">Advertising Campaigns</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Websites and UI/UX">Websites and UI/UX</option>
                <option value="Packaging">Packaging</option>
                <option value="Creative Strategy">Creative Strategy</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase text-white font-bold block">
                Publication Status
              </label>
              <select
                value={formData.status || 'published'}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as 'published' | 'draft' })}
                className="w-full px-4 py-2.5 bg-[#181820] border border-[#262630] text-white text-sm focus:outline-none focus:border-[#FF4D12]"
              >
                <option value="published">Published</option>
                <option value="draft">Draft (Unpublished)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase text-white font-bold block">
                Featured on Homepage?
              </label>
              <div className="pt-2 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featuredCheck"
                  checked={formData.featured || false}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 accent-[#FF4D12]"
                />
                <label htmlFor="featuredCheck" className="text-sm text-[#9494A8]">
                  Feature in Selected Work
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono uppercase text-white font-bold block">
              Short Summary <span className="text-[#FF4D12]">*</span>
            </label>
            <textarea
              rows={2}
              placeholder="A concise 1-2 sentence overview shown on portfolio cards..."
              value={formData.shortDescription || ''}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#181820] border border-[#262630] text-white text-sm focus:outline-none focus:border-[#FF4D12]"
            />
          </div>
        </div>

        {/* Narrative & Case Study Sections */}
        <div className="p-6 sm:p-8 bg-[#111114] border border-[#262630] space-y-6">
          <span className="font-mono text-xs uppercase tracking-widest text-[#FF4D12] block">
            // Editorial Case Study Narrative
          </span>

          <div className="space-y-2">
            <label className="text-xs font-mono uppercase text-white block">
              Project Brief & Background
            </label>
            <textarea
              rows={3}
              placeholder="What initial brief and objectives did the client present?"
              value={formData.projectBrief || ''}
              onChange={(e) => setFormData({ ...formData, projectBrief: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#181820] border border-[#262630] text-white text-sm focus:outline-none focus:border-[#FF4D12]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono uppercase text-white block">
              The Commercial Challenge
            </label>
            <textarea
              rows={3}
              placeholder="What specific friction points, category saturation, or positioning hurdles needed resolution?"
              value={formData.businessChallenge || ''}
              onChange={(e) => setFormData({ ...formData, businessChallenge: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#181820] border border-[#262630] text-white text-sm focus:outline-none focus:border-[#FF4D12]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono uppercase text-white block">
              Creative Solution & Strategy
            </label>
            <textarea
              rows={3}
              placeholder="How did the studio conceptualize and craft the design response?"
              value={formData.creativeStrategy || ''}
              onChange={(e) => setFormData({ ...formData, creativeStrategy: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#181820] border border-[#262630] text-white text-sm focus:outline-none focus:border-[#FF4D12]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono uppercase text-white block">
              Deliverables & Scope Provided
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. Bespoke Logomark, Design System, Next.js Web Flagship"
                value={newDeliverable}
                onChange={(e) => setNewDeliverable(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddDeliverable(); } }}
                className="flex-1 px-4 py-2 bg-[#181820] border border-[#262630] text-white text-sm focus:outline-none focus:border-[#FF4D12]"
              />
              <Button type="button" onClick={handleAddDeliverable} variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-1" /> Add
              </Button>
            </div>
            {formData.servicesProvided && formData.servicesProvided.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {formData.servicesProvided.map((sp, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#181820] border border-[#262630] text-xs text-white">
                    {sp}
                    <button type="button" onClick={() => handleRemoveDeliverable(idx)} className="text-[#9494A8] hover:text-red-400">
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Media & Imagery Card */}
        <div className="p-6 sm:p-8 bg-[#111114] border border-[#262630] space-y-6">
          <span className="font-mono text-xs uppercase tracking-widest text-[#FF4D12] block">
            // Visual Imagery & Gallery
          </span>

          <div className="space-y-2">
            <label className="text-xs font-mono uppercase text-white font-bold block">
              Cover Image URL <span className="text-[#FF4D12]">*</span>
            </label>
            <input
              type="url"
              required
              placeholder="https://..."
              value={formData.coverImage || ''}
              onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#181820] border border-[#262630] text-white text-sm focus:outline-none focus:border-[#FF4D12]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono uppercase text-white block">
              Cover Image Alt Text
            </label>
            <input
              type="text"
              placeholder="Descriptive alt text for SEO and accessibility"
              value={formData.coverImageAlt || ''}
              onChange={(e) => setFormData({ ...formData, coverImageAlt: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#181820] border border-[#262630] text-white text-sm focus:outline-none focus:border-[#FF4D12]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono uppercase text-white block">
              Additional Gallery Images
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={newGalleryUrl}
                onChange={(e) => setNewGalleryUrl(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddGalleryImage(); } }}
                className="flex-1 px-4 py-2 bg-[#181820] border border-[#262630] text-white text-sm focus:outline-none focus:border-[#FF4D12]"
              />
              <Button type="button" onClick={handleAddGalleryImage} variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-1" /> Add Image
              </Button>
            </div>
            {formData.galleryImages && formData.galleryImages.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
                {formData.galleryImages.map((img, idx) => (
                  <div key={idx} className="relative aspect-video border border-[#262630] bg-[#181820] group overflow-hidden">
                    <img src={img} alt={`Gallery image ${idx + 1}`} className="object-cover w-full h-full" />
                    <button
                      type="button"
                      onClick={() => handleRemoveGalleryImage(idx)}
                      className="absolute top-1.5 right-1.5 p-1 bg-red-950/80 text-red-200 border border-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* SEO Metadata Card */}
        <div className="p-6 sm:p-8 bg-[#111114] border border-[#262630] space-y-6">
          <span className="font-mono text-xs uppercase tracking-widest text-[#FF4D12] block">
            // Search Engine Optimization (SEO)
          </span>

          <div className="space-y-2">
            <label className="text-xs font-mono uppercase text-white block">
              Custom Page Title Tag
            </label>
            <input
              type="text"
              placeholder="e.g. Project Name | Let's Think Studio"
              value={formData.seoTitle || ''}
              onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#181820] border border-[#262630] text-white text-sm focus:outline-none focus:border-[#FF4D12]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono uppercase text-white block">
              Meta Description
            </label>
            <textarea
              rows={2}
              placeholder="Meta description for search engine result snippets..."
              value={formData.seoDescription || ''}
              onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#181820] border border-[#262630] text-white text-sm focus:outline-none focus:border-[#FF4D12]"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4 pt-4">
          <Button href="/admin/projects" variant="outline">
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="lg" isLoading={isSaving} withArrow={!isSaving}>
            Publish Case Study
          </Button>
        </div>

      </form>

    </div>
  );
}
