'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Quote, 
  Check, 
  X,
  Loader2 
} from 'lucide-react';
import { Testimonial } from '@/types';
import { Button } from '@/components/ui/Button';

interface TestimonialsManagementViewProps {
  initialTestimonials: Testimonial[];
}

export function TestimonialsManagementView({ initialTestimonials }: TestimonialsManagementViewProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [editingTestimonial, setEditingTestimonial] = useState<Partial<Testimonial> | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleCreateNew = () => {
    setEditingTestimonial({
      clientName: '',
      clientRole: '',
      companyName: '',
      quote: '',
      clientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
      companyLogo: '',
      projectSlug: '',
      displayOrder: testimonials.length + 1,
      status: 'published',
    });
    setErrorMsg('');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTestimonial) return;

    if (!editingTestimonial.clientName || !editingTestimonial.quote) {
      setErrorMsg('Client name and quote are required.');
      return;
    }

    setIsSaving(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingTestimonial),
      });

      if (!res.ok) {
        const err = await res.json();
        setErrorMsg(err.error || 'Failed to save testimonial');
        setIsSaving(false);
        return;
      }

      const { testimonial: saved } = await res.json();
      setTestimonials(prev => {
        const exists = prev.some(t => t.id === saved.id);
        if (exists) return prev.map(t => t.id === saved.id ? saved : t);
        return [...prev, saved];
      });

      setEditingTestimonial(null);
    } catch {
      setErrorMsg('A network error occurred.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete testimonial from "${name}"?`)) return;

    try {
      const res = await fetch(`/api/testimonials?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setTestimonials(prev => prev.filter(t => t.id !== id));
      }
    } catch (err) {
      console.error('Failed to delete testimonial:', err);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#262630]">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-[#FF4D12]">
            // Client Endorsements
          </span>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Testimonials & Quotes Management
          </h1>
          <p className="text-xs text-[#9494A8] font-mono mt-1">
            Display genuine verified feedback from client partners with permission.
          </p>
        </div>

        <Button onClick={handleCreateNew} variant="primary" size="sm" withArrow>
          <Plus className="w-3.5 h-3.5 mr-1" />
          Add Testimonial
        </Button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="p-6 bg-[#111114] border border-[#262630] flex flex-col justify-between space-y-6 hover:border-[#383846] transition-colors"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Quote className="w-6 h-6 text-[#FF4D12]" />
                <span className={`px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider border ${
                  t.status === 'published'
                    ? 'bg-emerald-950/60 border-emerald-500 text-emerald-400'
                    : 'bg-amber-950/60 border-amber-500 text-amber-300'
                }`}>
                  {t.status}
                </span>
              </div>

              <p className="text-sm text-white italic leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>

            <div className="pt-4 border-t border-[#262630] flex items-center justify-between">
              <div className="flex items-center gap-3">
                {t.clientAvatar && (
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#262630]">
                    <Image src={t.clientAvatar} alt={t.clientName} fill className="object-cover" />
                  </div>
                )}
                <div>
                  <h4 className="text-xs font-bold text-white">{t.clientName}</h4>
                  <p className="text-[10px] text-[#9494A8]">{t.clientRole}, {t.companyName}</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setEditingTestimonial(t)}
                  className="p-1.5 bg-[#181820] hover:bg-[#252532] text-white border border-[#262630]"
                  title="Edit"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(t.id, t.clientName)}
                  className="p-1.5 bg-[#181820] hover:bg-red-950 text-red-400 border border-[#262630]"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Editor Modal */}
      {editingTestimonial && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
          <div className="bg-[#111114] border border-[#262630] w-full max-w-2xl max-h-[92vh] flex flex-col justify-between overflow-hidden shadow-2xl">
            
            <div className="p-6 border-b border-[#262630] flex items-center justify-between">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#FF4D12]">
                  // Testimonial Editor
                </span>
                <h2 className="text-xl font-bold text-white">
                  {editingTestimonial.id ? `Edit: ${editingTestimonial.clientName}` : 'Add New Client Testimonial'}
                </h2>
              </div>
              <button
                onClick={() => setEditingTestimonial(null)}
                className="p-2 text-[#9494A8] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4 text-xs font-mono">
              {errorMsg && (
                <div className="p-3 bg-red-950/40 border border-red-800 text-red-300">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-white uppercase font-bold">Client Name *</label>
                  <input
                    type="text"
                    required
                    value={editingTestimonial.clientName || ''}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, clientName: e.target.value })}
                    className="w-full px-3 py-2 bg-[#181820] border border-[#262630] text-white focus:outline-none focus:border-[#FF4D12]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-white uppercase font-bold">Client Role / Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Managing Director"
                    value={editingTestimonial.clientRole || ''}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, clientRole: e.target.value })}
                    className="w-full px-3 py-2 bg-[#181820] border border-[#262630] text-white focus:outline-none focus:border-[#FF4D12]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-white uppercase font-bold">Company Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Aethelgard Group"
                    value={editingTestimonial.companyName || ''}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, companyName: e.target.value })}
                    className="w-full px-3 py-2 bg-[#181820] border border-[#262630] text-white focus:outline-none focus:border-[#FF4D12]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-white uppercase font-bold">Status</label>
                  <select
                    value={editingTestimonial.status || 'published'}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, status: e.target.value as any })}
                    className="w-full px-3 py-2 bg-[#181820] border border-[#262630] text-white focus:outline-none focus:border-[#FF4D12]"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft (Hidden)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-white uppercase font-bold">Client Avatar URL (optional)</label>
                <input
                  type="url"
                  value={editingTestimonial.clientAvatar || ''}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, clientAvatar: e.target.value })}
                  className="w-full px-3 py-2 bg-[#181820] border border-[#262630] text-white focus:outline-none focus:border-[#FF4D12]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-white uppercase font-bold">Verified Client Quote *</label>
                <textarea
                  rows={4}
                  required
                  value={editingTestimonial.quote || ''}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, quote: e.target.value })}
                  className="w-full px-3 py-2 bg-[#181820] border border-[#262630] text-white focus:outline-none focus:border-[#FF4D12]"
                />
              </div>

              <div className="pt-4 border-t border-[#262630] flex items-center justify-between">
                <Button onClick={() => setEditingTestimonial(null)} variant="outline" size="sm">
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm" isLoading={isSaving}>
                  Save Testimonial
                </Button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
