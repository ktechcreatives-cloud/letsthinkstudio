'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Plus, 
  Edit3, 
  ExternalLink, 
  Check, 
  X, 
  Layers, 
  HelpCircle,
  Trash2
} from 'lucide-react';
import { Service, ServiceFAQ } from '@/types';
import { Button } from '@/components/ui/Button';

interface ServiceManagementViewProps {
  initialServices: Service[];
}

export function ServiceManagementView({ initialServices }: ServiceManagementViewProps) {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Local helper for deliverables string
  const [deliverablesText, setDeliverablesText] = useState('');
  const [problemsText, setProblemsText] = useState('');
  const [faqsList, setFaqsList] = useState<ServiceFAQ[]>([]);

  const handleOpenEdit = (svc: Service) => {
    setEditingService(svc);
    setDeliverablesText(svc.deliverables.join('\n'));
    setProblemsText(svc.problemsSolved.join('\n'));
    setFaqsList(svc.faqs || []);
    setErrorMsg('');
  };

  const handleAddFaq = () => {
    setFaqsList([
      ...faqsList,
      { id: `faq-${Date.now()}`, question: 'New Question?', answer: 'Answer here.' }
    ]);
  };

  const handleRemoveFaq = (id: string) => {
    setFaqsList(faqsList.filter(f => f.id !== id));
  };

  const handleFaqChange = (id: string, field: 'question' | 'answer', value: string) => {
    setFaqsList(faqsList.map(f => f.id === id ? { ...f, [field]: value } : f));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    setIsSaving(true);
    setErrorMsg('');

    const updatedDeliverables = deliverablesText.split('\n').map(s => s.trim()).filter(Boolean);
    const updatedProblems = problemsText.split('\n').map(s => s.trim()).filter(Boolean);

    try {
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...editingService,
          deliverables: updatedDeliverables,
          problemsSolved: updatedProblems,
          faqs: faqsList,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        setErrorMsg(err.error || 'Failed to update service');
        setIsSaving(false);
        return;
      }

      const { service: saved } = await res.json();
      setServices(prev => prev.map(s => s.id === saved.id ? saved : s));
      setEditingService(null);
    } catch {
      setErrorMsg('A network error occurred while updating service.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#262630]">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-[#FF4D12]">
            // Studio Disciplines
          </span>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Service & Capability Management
          </h1>
          <p className="text-xs text-[#9494A8] font-mono mt-1">
            Configure deliverables scope, business problem messaging, and discipline FAQs.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((svc) => (
          <div
            key={svc.id}
            className="p-6 bg-[#111114] border border-[#262630] flex flex-col justify-between space-y-6 hover:border-[#383846] transition-colors"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-[#FF4D12]">
                  // {svc.slug}
                </span>
                <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider bg-emerald-950/60 border border-emerald-500 text-emerald-400">
                  {svc.status}
                </span>
              </div>

              <h2 className="text-xl font-bold text-white">
                {svc.title}
              </h2>

              <p className="text-xs text-[#9494A8] line-clamp-3">
                {svc.shortDescription}
              </p>

              <div className="space-y-1 text-xs font-mono text-[#9494A8] pt-2 border-t border-[#262630]">
                <div>&bull; {svc.deliverables.length} Deliverables Configured</div>
                <div>&bull; {svc.problemsSolved.length} Problems Solved</div>
                <div>&bull; {svc.faqs.length} FAQs Active</div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#262630] flex items-center justify-between">
              <Link
                href={`/services/${svc.slug}`}
                target="_blank"
                className="text-xs font-mono text-[#9494A8] hover:text-white flex items-center gap-1"
              >
                <span>Live View</span>
                <ExternalLink className="w-3 h-3" />
              </Link>

              <Button onClick={() => handleOpenEdit(svc)} variant="outline" size="sm">
                <Edit3 className="w-3.5 h-3.5 mr-1" />
                Edit Discipline
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Service Editor Modal */}
      {editingService && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
          <div className="bg-[#111114] border border-[#262630] w-full max-w-4xl max-h-[92vh] flex flex-col justify-between overflow-hidden shadow-2xl">
            
            <div className="p-6 border-b border-[#262630] flex items-center justify-between">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#FF4D12]">
                  // Discipline Configuration
                </span>
                <h2 className="text-xl font-bold text-white">
                  Edit Service: {editingService.title}
                </h2>
              </div>
              <button
                onClick={() => setEditingService(null)}
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

              {/* Title & Headline */}
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-white uppercase font-bold">Service Title *</label>
                  <input
                    type="text"
                    required
                    value={editingService.title}
                    onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                    className="w-full px-3 py-2 bg-[#181820] border border-[#262630] text-white focus:outline-none focus:border-[#FF4D12]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-white uppercase font-bold">Service Main Headline</label>
                  <input
                    type="text"
                    value={editingService.headline}
                    onChange={(e) => setEditingService({ ...editingService, headline: e.target.value })}
                    className="w-full px-3 py-2 bg-[#181820] border border-[#262630] text-white focus:outline-none focus:border-[#FF4D12]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-white uppercase font-bold">Introduction & Value Narrative</label>
                  <textarea
                    rows={3}
                    value={editingService.introduction}
                    onChange={(e) => setEditingService({ ...editingService, introduction: e.target.value })}
                    className="w-full px-3 py-2 bg-[#181820] border border-[#262630] text-white focus:outline-none focus:border-[#FF4D12]"
                  />
                </div>
              </div>

              {/* Image URL & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-white uppercase font-bold">Image URL</label>
                  <input
                    type="url"
                    value={editingService.imageUrl}
                    onChange={(e) => setEditingService({ ...editingService, imageUrl: e.target.value })}
                    className="w-full px-3 py-2 bg-[#181820] border border-[#262630] text-white focus:outline-none focus:border-[#FF4D12]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-white uppercase font-bold">Status</label>
                  <select
                    value={editingService.status}
                    onChange={(e) => setEditingService({ ...editingService, status: e.target.value as any })}
                    className="w-full px-3 py-2 bg-[#181820] border border-[#262630] text-white focus:outline-none focus:border-[#FF4D12]"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft (Hidden)</option>
                  </select>
                </div>
              </div>

              {/* Deliverables Scope (Line by line) */}
              <div className="space-y-1.5">
                <label className="text-[#D4E948] uppercase font-bold">
                  Deliverables Scope (One per line)
                </label>
                <textarea
                  rows={4}
                  value={deliverablesText}
                  onChange={(e) => setDeliverablesText(e.target.value)}
                  className="w-full px-3 py-2 bg-[#181820] border border-[#262630] text-white focus:outline-none focus:border-[#FF4D12]"
                />
              </div>

              {/* Problems Solved (Line by line) */}
              <div className="space-y-1.5">
                <label className="text-[#FF4D12] uppercase font-bold">
                  Problems Solved (One per line)
                </label>
                <textarea
                  rows={4}
                  value={problemsText}
                  onChange={(e) => setProblemsText(e.target.value)}
                  className="w-full px-3 py-2 bg-[#181820] border border-[#262630] text-white focus:outline-none focus:border-[#FF4D12]"
                />
              </div>

              {/* FAQs Manager */}
              <div className="space-y-4 pt-2 border-t border-[#262630]">
                <div className="flex items-center justify-between">
                  <span className="text-white uppercase font-bold">
                    // Service FAQs ({faqsList.length})
                  </span>
                  <button
                    type="button"
                    onClick={handleAddFaq}
                    className="px-2.5 py-1 bg-[#181820] border border-[#262630] text-[#D4E948] hover:text-white"
                  >
                    + Add FAQ
                  </button>
                </div>

                <div className="space-y-3">
                  {faqsList.map((faq, idx) => (
                    <div key={faq.id} className="p-3 bg-[#181820] border border-[#262630] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[#9494A8]">FAQ 0{idx + 1}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveFaq(faq.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <input
                        type="text"
                        placeholder="Question"
                        value={faq.question}
                        onChange={(e) => handleFaqChange(faq.id, 'question', e.target.value)}
                        className="w-full px-2 py-1.5 bg-[#111114] border border-[#262630] text-white text-xs"
                      />
                      <textarea
                        rows={2}
                        placeholder="Answer"
                        value={faq.answer}
                        onChange={(e) => handleFaqChange(faq.id, 'answer', e.target.value)}
                        className="w-full px-2 py-1.5 bg-[#111114] border border-[#262630] text-white text-xs"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#262630] flex items-center justify-between">
                <Button onClick={() => setEditingService(null)} variant="outline" size="sm">
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm" isLoading={isSaving}>
                  Save Discipline Scope
                </Button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
