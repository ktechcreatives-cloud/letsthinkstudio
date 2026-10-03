'use client';

import React, { useState } from 'react';
import { 
  Save, 
  Check, 
  Settings as SettingsIcon, 
  Palette, 
  Mail, 
  Phone, 
  Share2, 
  Search,
  CheckCircle2,
  AlertCircle 
} from 'lucide-react';
import { SiteSettings } from '@/types';
import { Button } from '@/components/ui/Button';

interface SettingsManagementViewProps {
  initialSettings: SiteSettings;
}

export function SettingsManagementView({ initialSettings }: SettingsManagementViewProps) {
  const [settings, setSettings] = useState<SiteSettings>(initialSettings);
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSavedSuccess(false);
    setErrorMsg('');

    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (!res.ok) {
        const err = await res.json();
        setErrorMsg(err.error || 'Failed to update settings');
        setIsSaving(false);
        return;
      }

      const { settings: updated } = await res.json();
      setSettings(updated);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 4000);
    } catch {
      setErrorMsg('A network error occurred while updating settings.');
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
            // Global Studio Parameters
          </span>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Website & Brand Settings
          </h1>
          <p className="text-xs text-[#9494A8] font-mono mt-1">
            Persistently manage studio branding, contact endpoints, social links, and SEO defaults.
          </p>
        </div>

        <Button onClick={handleSave} variant="primary" size="sm" isLoading={isSaving}>
          <Save className="w-3.5 h-3.5 mr-1" />
          {isSaving ? 'Persisting...' : 'Save Settings'}
        </Button>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-950/40 border border-emerald-800 text-emerald-300 text-xs font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Website settings successfully saved to persistent database.</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 bg-red-950/40 border border-red-800 text-red-300 text-xs font-mono flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-400" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8 text-xs font-mono">
        
        {/* Section 1: Brand & Identity */}
        <div className="p-6 sm:p-8 bg-[#111114] border border-[#262630] space-y-6">
          <div className="flex items-center gap-2 text-white pb-3 border-b border-[#262630]">
            <Palette className="w-4 h-4 text-[#FF4D12]" />
            <h2 className="text-sm font-bold uppercase tracking-wider">
              1. Brand Identity & Colors
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-white uppercase font-bold">Studio Name</label>
              <input
                type="text"
                value={settings.studioName}
                onChange={(e) => setSettings({ ...settings, studioName: e.target.value })}
                className="w-full px-3 py-2 bg-[#181820] border border-[#262630] text-white focus:outline-none focus:border-[#FF4D12]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-white uppercase font-bold">Official Tagline</label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full px-3 py-2 bg-[#181820] border border-[#262630] text-white focus:outline-none focus:border-[#FF4D12]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-white uppercase font-bold">Accent Color Code (Hex)</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={settings.accentColor}
                  onChange={(e) => setSettings({ ...settings, accentColor: e.target.value })}
                  className="w-10 h-10 p-0 bg-transparent border border-[#262630] cursor-pointer"
                />
                <input
                  type="text"
                  value={settings.accentColor}
                  onChange={(e) => setSettings({ ...settings, accentColor: e.target.value })}
                  className="flex-1 px-3 py-2 bg-[#181820] border border-[#262630] text-white focus:outline-none focus:border-[#FF4D12]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-white uppercase font-bold">Footer Text / Disclaimer</label>
              <input
                type="text"
                value={settings.footerText}
                onChange={(e) => setSettings({ ...settings, footerText: e.target.value })}
                className="w-full px-3 py-2 bg-[#181820] border border-[#262630] text-white focus:outline-none focus:border-[#FF4D12]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-white uppercase font-bold">Studio Bio & Manifesto</label>
            <textarea
              rows={3}
              value={settings.shortBio}
              onChange={(e) => setSettings({ ...settings, shortBio: e.target.value })}
              className="w-full px-3 py-2 bg-[#181820] border border-[#262630] text-white focus:outline-none focus:border-[#FF4D12]"
            />
          </div>
        </div>

        {/* Section 2: Contact & Leads */}
        <div className="p-6 sm:p-8 bg-[#111114] border border-[#262630] space-y-6">
          <div className="flex items-center gap-2 text-white pb-3 border-b border-[#262630]">
            <Phone className="w-4 h-4 text-[#D4E948]" />
            <h2 className="text-sm font-bold uppercase tracking-wider">
              2. Contact Information & WhatsApp Desk
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-1.5">
              <label className="text-white uppercase font-bold">Inquiry Email</label>
              <input
                type="email"
                value={settings.contactEmail}
                onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                className="w-full px-3 py-2 bg-[#181820] border border-[#262630] text-white focus:outline-none focus:border-[#FF4D12]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-white uppercase font-bold">Studio Phone</label>
              <input
                type="text"
                value={settings.contactPhone}
                onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                className="w-full px-3 py-2 bg-[#181820] border border-[#262630] text-white focus:outline-none focus:border-[#FF4D12]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-white uppercase font-bold">WhatsApp Business Number</label>
              <input
                type="text"
                value={settings.whatsappNumber}
                onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                className="w-full px-3 py-2 bg-[#181820] border border-[#262630] text-white focus:outline-none focus:border-[#FF4D12]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-white uppercase font-bold">Physical Studio Address</label>
            <input
              type="text"
              value={settings.physicalAddress}
              onChange={(e) => setSettings({ ...settings, physicalAddress: e.target.value })}
              className="w-full px-3 py-2 bg-[#181820] border border-[#262630] text-white focus:outline-none focus:border-[#FF4D12]"
            />
          </div>
        </div>

        {/* Section 3: Social Media Links */}
        <div className="p-6 sm:p-8 bg-[#111114] border border-[#262630] space-y-6">
          <div className="flex items-center gap-2 text-white pb-3 border-b border-[#262630]">
            <Share2 className="w-4 h-4 text-[#FF4D12]" />
            <h2 className="text-sm font-bold uppercase tracking-wider">
              3. Social Media Links
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-1.5">
              <label className="text-white uppercase font-bold">Instagram URL</label>
              <input
                type="url"
                value={settings.socialLinks?.instagram || ''}
                onChange={(e) => setSettings({
                  ...settings,
                  socialLinks: { ...settings.socialLinks, instagram: e.target.value }
                })}
                className="w-full px-3 py-2 bg-[#181820] border border-[#262630] text-white focus:outline-none focus:border-[#FF4D12]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-white uppercase font-bold">LinkedIn URL</label>
              <input
                type="url"
                value={settings.socialLinks?.linkedin || ''}
                onChange={(e) => setSettings({
                  ...settings,
                  socialLinks: { ...settings.socialLinks, linkedin: e.target.value }
                })}
                className="w-full px-3 py-2 bg-[#181820] border border-[#262630] text-white focus:outline-none focus:border-[#FF4D12]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-white uppercase font-bold">Twitter / X URL</label>
              <input
                type="url"
                value={settings.socialLinks?.twitter || ''}
                onChange={(e) => setSettings({
                  ...settings,
                  socialLinks: { ...settings.socialLinks, twitter: e.target.value }
                })}
                className="w-full px-3 py-2 bg-[#181820] border border-[#262630] text-white focus:outline-none focus:border-[#FF4D12]"
              />
            </div>
          </div>
        </div>

        {/* Section 4: SEO Defaults */}
        <div className="p-6 sm:p-8 bg-[#111114] border border-[#262630] space-y-6">
          <div className="flex items-center gap-2 text-white pb-3 border-b border-[#262630]">
            <Search className="w-4 h-4 text-[#D4E948]" />
            <h2 className="text-sm font-bold uppercase tracking-wider">
              4. Search Engine Optimization (SEO) Defaults
            </h2>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-white uppercase font-bold">Default Meta Title</label>
              <input
                type="text"
                value={settings.seoDefaultTitle}
                onChange={(e) => setSettings({ ...settings, seoDefaultTitle: e.target.value })}
                className="w-full px-3 py-2 bg-[#181820] border border-[#262630] text-white focus:outline-none focus:border-[#FF4D12]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-white uppercase font-bold">Default Meta Description</label>
              <textarea
                rows={2}
                value={settings.seoDefaultDescription}
                onChange={(e) => setSettings({ ...settings, seoDefaultDescription: e.target.value })}
                className="w-full px-3 py-2 bg-[#181820] border border-[#262630] text-white focus:outline-none focus:border-[#FF4D12]"
              />
            </div>
          </div>
        </div>

        {/* Submit Bar */}
        <div className="pt-4 flex items-center justify-end">
          <Button type="submit" variant="primary" size="lg" isLoading={isSaving}>
            <Save className="w-4 h-4 mr-1.5" />
            Persist Global Settings
          </Button>
        </div>

      </form>

    </div>
  );
}
