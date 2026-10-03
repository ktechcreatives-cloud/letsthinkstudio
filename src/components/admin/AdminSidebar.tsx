'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  FolderKanban, 
  Layers, 
  Inbox, 
  BookOpen, 
  MessageSquareQuote, 
  Settings, 
  LogOut, 
  ExternalLink,
  ShieldCheck 
} from 'lucide-react';

const ADMIN_LINKS = [
  { name: 'Dashboard Overview', href: '/admin', icon: LayoutDashboard },
  { name: 'Enquiry Pipeline', href: '/admin/enquiries', icon: Inbox },
  { name: 'Project Portfolio', href: '/admin/projects', icon: FolderKanban },
  { name: 'Service Management', href: '/admin/services', icon: Layers },
  { name: 'Insights & Blog', href: '/admin/insights', icon: BookOpen },
  { name: 'Testimonials', href: '/admin/testimonials', icon: MessageSquareQuote },
  { name: 'Website Settings', href: '/admin/settings', icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch {
      router.push('/admin/login');
    }
  };

  return (
    <aside className="w-full lg:w-64 bg-[#0D0D11] border-b lg:border-b-0 lg:border-r border-[#262630] flex flex-col justify-between shrink-0">
      
      {/* Top Brand & Header */}
      <div>
        <div className="p-6 border-b border-[#262630] flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF4D12]" />
            <div className="flex flex-col">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                STUDIO ADMIN
              </span>
              <span className="text-[10px] font-mono text-[#9494A8]">
                LET&apos;S THINK &bull; V1.0
              </span>
            </div>
          </Link>
          <span className="px-2 py-0.5 bg-[#181820] border border-[#262630] text-[10px] font-mono text-[#D4E948]">
            ACTIVE
          </span>
        </div>

        {/* Navigation links */}
        <nav className="p-4 space-y-1">
          {ADMIN_LINKS.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 text-xs font-mono tracking-wide rounded-none transition-all ${
                  isActive
                    ? 'bg-[#FF4D12] text-white font-bold shadow-sm'
                    : 'text-[#9494A8] hover:text-white hover:bg-[#181820]'
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Info & Actions */}
      <div className="p-4 border-t border-[#262630] space-y-3">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 text-xs font-mono text-[#9494A8] hover:text-white hover:bg-[#181820] transition-colors"
        >
          <span>View Public Site</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        <div className="px-3 py-2 bg-[#14141A] border border-[#262630] text-[11px] font-mono text-[#9494A8] flex items-center justify-between">
          <div className="truncate">
            <span className="text-white block font-bold truncate">admin@letsthinkstudio.com</span>
            <span className="text-[10px] text-[#FF4D12]">Studio Administrator</span>
          </div>
          <ShieldCheck className="w-4 h-4 text-[#D4E948] flex-shrink-0 ml-2" />
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 w-full py-2.5 px-3 text-xs font-mono uppercase tracking-wider text-red-400 hover:text-red-300 hover:bg-red-950/20 border border-transparent hover:border-red-900/40 transition-all"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Terminate Session</span>
        </button>
      </div>

    </aside>
  );
}
