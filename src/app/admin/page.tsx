import React from 'react';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { 
  Inbox, 
  Clock, 
  CheckCircle2, 
  FolderKanban, 
  BookOpen, 
  Layers, 
  ArrowUpRight, 
  Sparkles,
  TrendingUp,
  Activity
} from 'lucide-react';
import { getAdminSession } from '@/lib/auth';
import { getDashboardMetrics } from '@/lib/db/storage';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: "Admin Dashboard Overview",
};

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect('/admin/login');
  }

  const metrics = await getDashboardMetrics();

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

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'New': return 'accent';
      case 'Won': return 'citron';
      default: return 'default';
    }
  };

  return (
    <div className="space-y-10 animate-fade-in">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-[#262630]">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-[#FF4D12]">
            // Executive Telemetry
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-xs sm:text-sm text-[#9494A8] font-mono mt-1">
            Real-time pipeline metrics and content management for Let&apos;s Think Studio.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button href="/admin/enquiries" variant="primary" size="sm" withArrow>
            View All Enquiries
          </Button>
          <Button href="/admin/projects" variant="outline" size="sm">
            Manage Projects
          </Button>
        </div>
      </div>

      {/* 6 Real Database KPI Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        
        <div className="p-5 bg-[#111114] border border-[#262630] space-y-2">
          <div className="flex items-center justify-between text-[#9494A8]">
            <span className="text-[11px] font-mono uppercase tracking-wider">Total Leads</span>
            <Inbox className="w-4 h-4 text-[#FF4D12]" />
          </div>
          <p className="text-3xl font-bold text-white font-mono">{metrics.totalEnquiries}</p>
          <span className="text-[10px] font-mono text-[#9494A8]">Database enquiries</span>
        </div>

        <div className="p-5 bg-[#111114] border border-[#262630] space-y-2">
          <div className="flex items-center justify-between text-[#9494A8]">
            <span className="text-[11px] font-mono uppercase tracking-wider">New Actionable</span>
            <span className="w-2 h-2 rounded-full bg-[#FF4D12] animate-pulse" />
          </div>
          <p className="text-3xl font-bold text-[#FF4D12] font-mono">{metrics.newEnquiries}</p>
          <span className="text-[10px] font-mono text-[#9494A8]">Awaiting response</span>
        </div>

        <div className="p-5 bg-[#111114] border border-[#262630] space-y-2">
          <div className="flex items-center justify-between text-[#9494A8]">
            <span className="text-[11px] font-mono uppercase tracking-wider">In Progress</span>
            <Clock className="w-4 h-4 text-[#D4E948]" />
          </div>
          <p className="text-3xl font-bold text-white font-mono">{metrics.enquiriesInProgress}</p>
          <span className="text-[10px] font-mono text-[#9494A8]">Pitch / Meetings</span>
        </div>

        <div className="p-5 bg-[#111114] border border-[#262630] space-y-2">
          <div className="flex items-center justify-between text-[#9494A8]">
            <span className="text-[11px] font-mono uppercase tracking-wider">Won Accounts</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-3xl font-bold text-emerald-400 font-mono">{metrics.wonProjects}</p>
          <span className="text-[10px] font-mono text-[#9494A8]">Signed contracts</span>
        </div>

        <div className="p-5 bg-[#111114] border border-[#262630] space-y-2">
          <div className="flex items-center justify-between text-[#9494A8]">
            <span className="text-[11px] font-mono uppercase tracking-wider">Live Projects</span>
            <FolderKanban className="w-4 h-4 text-sky-400" />
          </div>
          <p className="text-3xl font-bold text-white font-mono">{metrics.publishedProjects}</p>
          <span className="text-[10px] font-mono text-[#9494A8]">Published portfolio</span>
        </div>

        <div className="p-5 bg-[#111114] border border-[#262630] space-y-2">
          <div className="flex items-center justify-between text-[#9494A8]">
            <span className="text-[11px] font-mono uppercase tracking-wider">Live Articles</span>
            <BookOpen className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-3xl font-bold text-white font-mono">{metrics.publishedArticles}</p>
          <span className="text-[10px] font-mono text-[#9494A8]">Published insights</span>
        </div>

      </div>

      {/* Main Grid: Recent Enquiries + Activity Log */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recent Enquiries Table (8 Cols) */}
        <div className="lg:col-span-8 p-6 sm:p-8 bg-[#111114] border border-[#262630] space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#FF4D12]">
                // Lead Pipeline
              </span>
              <h2 className="text-xl font-bold text-white">
                Recent Inbound Enquiries
              </h2>
            </div>
            <Link
              href="/admin/enquiries"
              className="text-xs font-mono text-[#FF4D12] hover:underline flex items-center gap-1"
            >
              <span>Manage Pipeline</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-[#262630] text-[#9494A8]">
                  <th className="pb-3 uppercase">Client / Brand</th>
                  <th className="pb-3 uppercase">Discipline</th>
                  <th className="pb-3 uppercase">Budget</th>
                  <th className="pb-3 uppercase">Status</th>
                  <th className="pb-3 uppercase text-right">Received</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#262630]/60">
                {metrics.recentEnquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-[#181820]/40 transition-colors">
                    <td className="py-3.5 pr-3">
                      <span className="text-white font-bold block">{enq.fullName}</span>
                      <span className="text-[#9494A8] text-[11px] block">{enq.companyName || enq.businessEmail}</span>
                    </td>
                    <td className="py-3.5 pr-3 text-[#9494A8]">
                      {enq.serviceRequired}
                    </td>
                    <td className="py-3.5 pr-3 text-white">
                      {enq.budgetRange}
                    </td>
                    <td className="py-3.5 pr-3">
                      <Badge variant={getStatusBadgeVariant(enq.status)}>
                        {enq.status}
                      </Badge>
                    </td>
                    <td className="py-3.5 text-right text-[#9494A8]">
                      {formatDate(enq.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity Feed (4 Cols) */}
        <div className="lg:col-span-4 p-6 sm:p-8 bg-[#111114] border border-[#262630] space-y-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#D4E948]">
              // Audit Stream
            </span>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#D4E948]" />
              <span>Studio Activity</span>
            </h2>
          </div>

          <div className="space-y-4">
            {metrics.recentActivity.map((act) => (
              <div key={act.id} className="p-3 bg-[#16161C] border border-[#262630] space-y-1">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-white font-bold">{act.action}</span>
                  <span className="text-[#9494A8]">{formatDate(act.createdAt)}</span>
                </div>
                <div className="text-[11px] text-[#9494A8] font-mono">
                  {act.entityType.toUpperCase()} &bull; {act.actorEmail || 'Admin'}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Quick Access Grid to Admin Modules */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
        
        <Link 
          href="/admin/projects"
          className="p-6 bg-[#111114] border border-[#262630] hover:border-[#FF4D12] transition-colors space-y-2 group block"
        >
          <div className="flex items-center justify-between text-white">
            <span className="font-bold text-base">Projects & Case Studies</span>
            <ArrowUpRight className="w-4 h-4 text-[#FF4D12]" />
          </div>
          <p className="text-xs text-[#9494A8]">
            Create, edit, publish or reorder portfolio case studies.
          </p>
        </Link>

        <Link 
          href="/admin/services"
          className="p-6 bg-[#111114] border border-[#262630] hover:border-[#FF4D12] transition-colors space-y-2 group block"
        >
          <div className="flex items-center justify-between text-white">
            <span className="font-bold text-base">Services & Scope</span>
            <ArrowUpRight className="w-4 h-4 text-[#FF4D12]" />
          </div>
          <p className="text-xs text-[#9494A8]">
            Configure deliverables, problem-solving, and service FAQs.
          </p>
        </Link>

        <Link 
          href="/admin/insights"
          className="p-6 bg-[#111114] border border-[#262630] hover:border-[#FF4D12] transition-colors space-y-2 group block"
        >
          <div className="flex items-center justify-between text-white">
            <span className="font-bold text-base">Journal & Articles</span>
            <ArrowUpRight className="w-4 h-4 text-[#FF4D12]" />
          </div>
          <p className="text-xs text-[#9494A8]">
            Write and publish thought leadership essays and strategy notes.
          </p>
        </Link>

        <Link 
          href="/admin/settings"
          className="p-6 bg-[#111114] border border-[#262630] hover:border-[#FF4D12] transition-colors space-y-2 group block"
        >
          <div className="flex items-center justify-between text-white">
            <span className="font-bold text-base">Website Settings</span>
            <ArrowUpRight className="w-4 h-4 text-[#FF4D12]" />
          </div>
          <p className="text-xs text-[#9494A8]">
            Control studio brand metadata, contact info, and WhatsApp desk.
          </p>
        </Link>

      </div>

    </div>
  );
}
