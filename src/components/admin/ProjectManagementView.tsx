'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  ExternalLink, 
  Eye, 
  Check, 
  X, 
  FolderKanban,
  ArrowUpRight,
  Sparkles,
  Loader2
} from 'lucide-react';
import { Project } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface ProjectManagementViewProps {
  initialProjects: Project[];
}

export function ProjectManagementView({ initialProjects }: ProjectManagementViewProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleCreateNew = () => {
    setEditingProject({
      title: '',
      slug: '',
      clientName: '',
      industry: '',
      projectYear: new Date().getFullYear().toString(),
      category: 'Branding',
      servicesProvided: ['Branding and Identity'],
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
    setErrorMsg('');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    if (!editingProject.title || !editingProject.category) {
      setErrorMsg('Title and category are required.');
      return;
    }

    setIsSaving(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProject),
      });

      if (!res.ok) {
        const err = await res.json();
        setErrorMsg(err.error || 'Failed to save project');
        setIsSaving(false);
        return;
      }

      const { project: saved } = await res.json();
      setProjects((prev) => {
        const exists = prev.some(p => p.id === saved.id);
        if (exists) {
          return prev.map(p => p.id === saved.id ? saved : p);
        }
        return [saved, ...prev];
      });

      setEditingProject(null);
    } catch {
      setErrorMsg('A network error occurred while saving.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete case study "${title}"?`)) return;

    try {
      const res = await fetch(`/api/projects?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProjects(prev => prev.filter(p => p.id !== id));
      }
    } catch (err) {
      console.error('Failed to delete project:', err);
    }
  };

  const handleToggleStatus = async (project: Project) => {
    const newStatus = project.status === 'published' ? 'draft' : 'published';
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...project, status: newStatus }),
      });
      if (res.ok) {
        const { project: saved } = await res.json();
        setProjects(prev => prev.map(p => p.id === saved.id ? saved : p));
      }
    } catch (err) {
      console.error('Failed to toggle project status:', err);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#262630]">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-[#FF4D12]">
            // Portfolio System
          </span>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Project & Case Study Management
          </h1>
          <p className="text-xs text-[#9494A8] font-mono mt-1">
            Manage public portfolio works, editorial case study narratives, and visual galleries.
          </p>
        </div>

        <Button href="/admin/projects/new" variant="primary" size="sm" withArrow>
          <Plus className="w-3.5 h-3.5 mr-1" />
          Create New Project
        </Button>
      </div>

      {/* Projects Table */}
      <div className="bg-[#111114] border border-[#262630] overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="border-b border-[#262630] text-[#9494A8] bg-[#16161C]">
              <th className="py-3 px-4 uppercase">Cover</th>
              <th className="py-3 px-4 uppercase">Title & Client</th>
              <th className="py-3 px-4 uppercase">Category</th>
              <th className="py-3 px-4 uppercase">Year</th>
              <th className="py-3 px-4 uppercase">Status</th>
              <th className="py-3 px-4 uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#262630]">
            {projects.map((proj) => (
              <tr key={proj.id} className="hover:bg-[#181820]/60 transition-colors">
                <td className="py-3 px-4 w-20">
                  <div className="relative aspect-[16/10] w-16 overflow-hidden bg-[#181820] border border-[#262630]">
                    <Image
                      src={proj.coverImage}
                      alt={proj.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </td>

                <td className="py-3 px-4">
                  <span className="text-white font-bold block text-sm">{proj.title}</span>
                  <span className="text-[#9494A8] block text-[11px]">{proj.clientName || 'Independent'}</span>
                </td>

                <td className="py-3 px-4 text-[#F5F5F8]">
                  {proj.category}
                </td>

                <td className="py-3 px-4 text-[#9494A8]">
                  {proj.projectYear}
                </td>

                <td className="py-3 px-4">
                  <button
                    onClick={() => handleToggleStatus(proj)}
                    className={`px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider border transition-colors ${
                      proj.status === 'published'
                        ? 'bg-emerald-950/60 border-emerald-500 text-emerald-400'
                        : 'bg-amber-950/60 border-amber-500 text-amber-300'
                    }`}
                  >
                    {proj.status}
                  </button>
                </td>

                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/work/${proj.slug}`}
                      target="_blank"
                      className="p-1.5 bg-[#181820] hover:bg-[#252532] text-[#9494A8] hover:text-white border border-[#262630]"
                      title="View Live Case Study"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>

                    <button
                      onClick={() => setEditingProject(proj)}
                      className="p-1.5 bg-[#181820] hover:bg-[#252532] text-white border border-[#262630]"
                      title="Edit Case Study"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => handleDelete(proj.id, proj.title)}
                      className="p-1.5 bg-[#181820] hover:bg-red-950 text-red-400 border border-[#262630]"
                      title="Delete Project"
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

      {/* Project Editor Modal */}
      {editingProject && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
          <div className="bg-[#111114] border border-[#262630] w-full max-w-4xl max-h-[92vh] flex flex-col justify-between overflow-hidden shadow-2xl">
            
            <div className="p-6 border-b border-[#262630] flex items-center justify-between">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#FF4D12]">
                  // Case Study Editor
                </span>
                <h2 className="text-xl font-bold text-white">
                  {editingProject.id ? `Edit: ${editingProject.title}` : 'Create New Portfolio Project'}
                </h2>
              </div>
              <button
                onClick={() => setEditingProject(null)}
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
                  <label className="text-white uppercase font-bold">Project Title *</label>
                  <input
                    type="text"
                    required
                    value={editingProject.title || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    className="w-full px-3 py-2 bg-[#181820] border border-[#262630] text-white focus:outline-none focus:border-[#FF4D12]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-white uppercase font-bold">Custom Slug (optional)</label>
                  <input
                    type="text"
                    placeholder="auto-generated-if-empty"
                    value={editingProject.slug || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })}
                    className="w-full px-3 py-2 bg-[#181820] border border-[#262630] text-white focus:outline-none focus:border-[#FF4D12]"
                  />
                </div>
              </div>

              {/* Client & Industry & Year */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-white uppercase">Client Name</label>
                  <input
                    type="text"
                    value={editingProject.clientName || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, clientName: e.target.value })}
                    className="w-full px-3 py-2 bg-[#181820] border border-[#262630] text-white focus:outline-none focus:border-[#FF4D12]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-white uppercase">Industry</label>
                  <input
                    type="text"
                    value={editingProject.industry || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, industry: e.target.value })}
                    className="w-full px-3 py-2 bg-[#181820] border border-[#262630] text-white focus:outline-none focus:border-[#FF4D12]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-white uppercase">Project Year</label>
                  <input
                    type="text"
                    value={editingProject.projectYear || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, projectYear: e.target.value })}
                    className="w-full px-3 py-2 bg-[#181820] border border-[#262630] text-white focus:outline-none focus:border-[#FF4D12]"
                  />
                </div>
              </div>

              {/* Category & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-white uppercase font-bold">Category *</label>
                  <select
                    value={editingProject.category || 'Branding'}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                    className="w-full px-3 py-2 bg-[#181820] border border-[#262630] text-white focus:outline-none focus:border-[#FF4D12]"
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

                <div className="space-y-1.5">
                  <label className="text-white uppercase font-bold">Publication Status</label>
                  <select
                    value={editingProject.status || 'published'}
                    onChange={(e) => setEditingProject({ ...editingProject, status: e.target.value as any })}
                    className="w-full px-3 py-2 bg-[#181820] border border-[#262630] text-white focus:outline-none focus:border-[#FF4D12]"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft (Private)</option>
                  </select>
                </div>
              </div>

              {/* Short Description */}
              <div className="space-y-1.5">
                <label className="text-white uppercase font-bold">Short Description / Subtitle *</label>
                <textarea
                  rows={2}
                  value={editingProject.shortDescription || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, shortDescription: e.target.value })}
                  className="w-full px-3 py-2 bg-[#181820] border border-[#262630] text-white focus:outline-none focus:border-[#FF4D12]"
                />
              </div>

              {/* Cover Image URL */}
              <div className="space-y-1.5">
                <label className="text-white uppercase font-bold">Cover Image URL *</label>
                <input
                  type="url"
                  required
                  value={editingProject.coverImage || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, coverImage: e.target.value })}
                  className="w-full px-3 py-2 bg-[#181820] border border-[#262630] text-white focus:outline-none focus:border-[#FF4D12]"
                />
              </div>

              {/* Brief, Challenge, Strategy, Solution, Results */}
              <div className="space-y-4 pt-2">
                <div className="space-y-1.5">
                  <label className="text-[#FF4D12] uppercase font-bold">Project Brief</label>
                  <textarea
                    rows={3}
                    value={editingProject.projectBrief || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, projectBrief: e.target.value })}
                    className="w-full px-3 py-2 bg-[#181820] border border-[#262630] text-white focus:outline-none focus:border-[#FF4D12]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[#FF4D12] uppercase font-bold">Business Challenge</label>
                  <textarea
                    rows={3}
                    value={editingProject.businessChallenge || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, businessChallenge: e.target.value })}
                    className="w-full px-3 py-2 bg-[#181820] border border-[#262630] text-white focus:outline-none focus:border-[#FF4D12]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[#D4E948] uppercase font-bold">Creative Strategy</label>
                  <textarea
                    rows={3}
                    value={editingProject.creativeStrategy || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, creativeStrategy: e.target.value })}
                    className="w-full px-3 py-2 bg-[#181820] border border-[#262630] text-white focus:outline-none focus:border-[#FF4D12]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-white uppercase font-bold">Final Solution & Execution</label>
                  <textarea
                    rows={3}
                    value={editingProject.finalSolution || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, finalSolution: e.target.value })}
                    className="w-full px-3 py-2 bg-[#181820] border border-[#262630] text-white focus:outline-none focus:border-[#FF4D12]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-white uppercase font-bold">Verified Commercial Results</label>
                  <input
                    type="text"
                    value={editingProject.verifiedResults || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, verifiedResults: e.target.value })}
                    className="w-full px-3 py-2 bg-[#181820] border border-[#262630] text-white focus:outline-none focus:border-[#FF4D12]"
                  />
                </div>
              </div>

              {/* Form Buttons */}
              <div className="pt-4 border-t border-[#262630] flex items-center justify-between">
                <Button onClick={() => setEditingProject(null)} variant="outline" size="sm">
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm" isLoading={isSaving}>
                  {editingProject.id ? 'Save Changes' : 'Create Case Study'}
                </Button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
