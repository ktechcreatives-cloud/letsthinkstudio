'use client';

import React, { useState } from 'react';
import { 
  Download, 
  Search, 
  Filter, 
  Calendar, 
  User, 
  Mail, 
  Phone, 
  Building, 
  FileText, 
  X, 
  Check, 
  Clock, 
  DollarSign,
  Send,
  Loader2
} from 'lucide-react';
import { Enquiry, EnquiryStatus } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface EnquiryManagementViewProps {
  initialEnquiries: Enquiry[];
}

const STATUSES: EnquiryStatus[] = [
  'New',
  'Contacted',
  'Meeting Scheduled',
  'Proposal Sent',
  'Won',
  'Lost'
];

export function EnquiryManagementView({ initialEnquiries }: EnquiryManagementViewProps) {
  const [enquiries, setEnquiries] = useState<Enquiry[]>(initialEnquiries);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  
  // Note state for modal
  const [newNote, setNewNote] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  // Status badge style helper
  const getStatusBadge = (status: EnquiryStatus) => {
    switch (status) {
      case 'New': return <Badge variant="accent">New</Badge>;
      case 'Contacted': return <Badge variant="default">Contacted</Badge>;
      case 'Meeting Scheduled': return <Badge variant="citron">Meeting Scheduled</Badge>;
      case 'Proposal Sent': return <Badge variant="default">Proposal Sent</Badge>;
      case 'Won': return <span className="px-2 py-0.5 bg-emerald-950/60 border border-emerald-500 text-emerald-400 font-mono text-[10px] uppercase">Won</span>;
      case 'Lost': return <span className="px-2 py-0.5 bg-red-950/60 border border-red-500 text-red-400 font-mono text-[10px] uppercase">Lost</span>;
      default: return <Badge variant="default">{status}</Badge>;
    }
  };

  const filtered = enquiries.filter((e) => {
    const matchesStatus = statusFilter === 'All' || e.status === statusFilter;
    const q = searchTerm.toLowerCase();
    const matchesSearch = 
      e.fullName.toLowerCase().includes(q) ||
      (e.companyName && e.companyName.toLowerCase().includes(q)) ||
      e.businessEmail.toLowerCase().includes(q) ||
      e.serviceRequired.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  const handleStatusChange = async (enquiryId: string, newStatus: EnquiryStatus) => {
    try {
      const res = await fetch('/api/enquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: enquiryId, status: newStatus }),
      });
      if (res.ok) {
        const { enquiry: updated } = await res.json();
        setEnquiries(prev => prev.map(e => e.id === enquiryId ? updated : e));
        if (selectedEnquiry && selectedEnquiry.id === enquiryId) {
          setSelectedEnquiry(updated);
        }
      }
    } catch (err) {
      console.error('Failed to change status:', err);
    }
  };

  const handleSaveModalUpdates = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEnquiry) return;
    setIsUpdating(true);

    try {
      const res = await fetch('/api/enquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: selectedEnquiry.id,
          status: selectedEnquiry.status,
          followUpDate: selectedEnquiry.followUpDate,
          internalNotes: selectedEnquiry.internalNotes,
          newNote: newNote.trim() ? newNote.trim() : undefined,
        }),
      });

      if (res.ok) {
        const { enquiry: updated } = await res.json();
        setEnquiries(prev => prev.map(item => item.id === updated.id ? updated : item));
        setSelectedEnquiry(updated);
        setNewNote('');
      }
    } catch (err) {
      console.error('Failed to update enquiry:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header & CSV Download */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#262630]">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-[#FF4D12]">
            // Inbound CRM
          </span>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Enquiry & Lead Management
          </h1>
          <p className="text-xs text-[#9494A8] font-mono mt-1">
            Tracking {enquiries.length} live project leads across all stages.
          </p>
        </div>

        <a
          href="/api/enquiries/export"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#181820] hover:bg-[#22222B] border border-[#262630] text-white text-xs font-mono uppercase tracking-wider transition-all"
        >
          <Download className="w-3.5 h-3.5 text-[#FF4D12]" />
          <span>Export Pipeline to CSV</span>
        </a>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9494A8]" />
          <input
            type="text"
            placeholder="Search by client, brand, email, or service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#111114] border border-[#262630] text-white text-xs font-mono placeholder-[#9494A8]/60 focus:outline-none focus:border-[#FF4D12]"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setStatusFilter('All')}
            className={`px-3 py-2 text-xs font-mono transition-colors ${
              statusFilter === 'All'
                ? 'bg-[#FF4D12] text-white font-bold'
                : 'bg-[#111114] text-[#9494A8] border border-[#262630] hover:text-white'
            }`}
          >
            All ({enquiries.length})
          </button>
          {STATUSES.map(s => {
            const count = enquiries.filter(e => e.status === s).length;
            return (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-2.5 py-2 text-xs font-mono transition-colors ${
                  statusFilter === s
                    ? 'bg-[#FF4D12] text-white font-bold'
                    : 'bg-[#111114] text-[#9494A8] border border-[#262630] hover:text-white'
                }`}
              >
                {s} ({count})
              </button>
            );
          })}
        </div>

      </div>

      {/* Main Table */}
      <div className="bg-[#111114] border border-[#262630] overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="border-b border-[#262630] text-[#9494A8] bg-[#16161C]">
              <th className="py-3 px-4 uppercase">Client / Brand</th>
              <th className="py-3 px-4 uppercase">Discipline</th>
              <th className="py-3 px-4 uppercase">Budget & Timeline</th>
              <th className="py-3 px-4 uppercase">Lead Status</th>
              <th className="py-3 px-4 uppercase">Follow-up</th>
              <th className="py-3 px-4 uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#262630]">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-[#9494A8]">
                  // No matching enquiries found.
                </td>
              </tr>
            ) : (
              filtered.map((enq) => (
                <tr key={enq.id} className="hover:bg-[#181820]/60 transition-colors">
                  <td className="py-4 px-4">
                    <span className="text-white font-bold block">{enq.fullName}</span>
                    <span className="text-[#9494A8] block text-[11px]">{enq.companyName || 'Individual'}</span>
                    <span className="text-[#9494A8] block text-[10px]">{enq.businessEmail}</span>
                  </td>

                  <td className="py-4 px-4 text-[#F5F5F8]">
                    {enq.serviceRequired}
                  </td>

                  <td className="py-4 px-4">
                    <span className="text-white block font-medium">{enq.budgetRange}</span>
                    <span className="text-[#9494A8] block text-[11px]">{enq.expectedTimeline}</span>
                  </td>

                  <td className="py-4 px-4">
                    <select
                      value={enq.status}
                      onChange={(e) => handleStatusChange(enq.id, e.target.value as EnquiryStatus)}
                      className="bg-[#181820] border border-[#262630] text-xs font-mono text-white px-2 py-1 focus:outline-none focus:border-[#FF4D12]"
                    >
                      {STATUSES.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>

                  <td className="py-4 px-4 text-[#9494A8]">
                    {enq.followUpDate || 'None set'}
                  </td>

                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => setSelectedEnquiry(enq)}
                      className="px-3 py-1.5 bg-[#181820] hover:bg-[#252532] border border-[#262630] text-white text-xs font-mono transition-colors"
                    >
                      Review Brief
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Drawer for Enquiry Inspection & Notes */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
          <div className="bg-[#111114] border border-[#262630] w-full max-w-3xl max-h-[90vh] flex flex-col justify-between overflow-hidden shadow-2xl">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-[#262630] flex items-center justify-between">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#FF4D12]">
                  // Enquiry Specification
                </span>
                <h2 className="text-xl font-bold text-white">
                  {selectedEnquiry.fullName} &bull; {selectedEnquiry.companyName || 'Independent'}
                </h2>
                <p className="text-xs text-[#9494A8] font-mono">
                  ID: {selectedEnquiry.id} &bull; Submitted: {new Date(selectedEnquiry.createdAt).toLocaleString()}
                </p>
              </div>

              <button
                onClick={() => setSelectedEnquiry(null)}
                className="p-2 text-[#9494A8] hover:text-white focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs font-mono">
              
              {/* Contact Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-[#16161C] border border-[#262630]">
                <div>
                  <span className="text-[#9494A8] block">BUSINESS EMAIL:</span>
                  <a href={`mailto:${selectedEnquiry.businessEmail}`} className="text-white hover:text-[#FF4D12] underline">
                    {selectedEnquiry.businessEmail}
                  </a>
                </div>
                <div>
                  <span className="text-[#9494A8] block">PHONE:</span>
                  <span className="text-white">{selectedEnquiry.phoneNumber || 'Not provided'}</span>
                </div>
                <div>
                  <span className="text-[#9494A8] block">DISCIPLINE REQUIRED:</span>
                  <span className="text-[#FF4D12] font-bold">{selectedEnquiry.serviceRequired}</span>
                </div>
                <div>
                  <span className="text-[#9494A8] block">BUDGET & TIMELINE:</span>
                  <span className="text-white">{selectedEnquiry.budgetRange} ({selectedEnquiry.expectedTimeline})</span>
                </div>
                <div>
                  <span className="text-[#9494A8] block">REFERRAL SOURCE:</span>
                  <span className="text-[#9494A8]">{selectedEnquiry.referralSource || 'Direct Form'}</span>
                </div>
                <div>
                  <span className="text-[#9494A8] block">CURRENT STATUS:</span>
                  {getStatusBadge(selectedEnquiry.status)}
                </div>
              </div>

              {/* Full Project Description */}
              <div className="space-y-2">
                <span className="text-[#FF4D12] uppercase font-bold block">
                  // Client Project Challenge / Brief
                </span>
                <div className="p-4 bg-[#181820] border border-[#262630] text-sm text-[#F5F5F8] leading-relaxed whitespace-pre-wrap">
                  {selectedEnquiry.projectDescription}
                </div>
              </div>

              {/* Editable Fields: Status & Follow-Up Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1.5">
                  <label className="text-[#9494A8] uppercase">Update Lead Status:</label>
                  <select
                    value={selectedEnquiry.status}
                    onChange={(e) => setSelectedEnquiry({ ...selectedEnquiry, status: e.target.value as EnquiryStatus })}
                    className="w-full px-3 py-2 bg-[#181820] border border-[#262630] text-white focus:outline-none focus:border-[#FF4D12]"
                  >
                    {STATUSES.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[#9494A8] uppercase">Follow-up Target Date:</label>
                  <input
                    type="date"
                    value={selectedEnquiry.followUpDate || ''}
                    onChange={(e) => setSelectedEnquiry({ ...selectedEnquiry, followUpDate: e.target.value })}
                    className="w-full px-3 py-2 bg-[#181820] border border-[#262630] text-white focus:outline-none focus:border-[#FF4D12]"
                  />
                </div>
              </div>

              {/* Internal Notes History */}
              <div className="space-y-3 pt-2">
                <span className="text-white uppercase font-bold block">
                  // Internal Strategic Notes
                </span>

                {selectedEnquiry.internalNotes && (
                  <div className="p-3 bg-[#181820] border border-[#262630] text-[#9494A8]">
                    {selectedEnquiry.internalNotes}
                  </div>
                )}

                {selectedEnquiry.notesHistory && selectedEnquiry.notesHistory.length > 0 && (
                  <div className="space-y-2">
                    {selectedEnquiry.notesHistory.map((nh) => (
                      <div key={nh.id} className="p-3 bg-[#14141A] border-l-2 border-[#FF4D12] text-xs">
                        <div className="flex justify-between text-[#9494A8] mb-1">
                          <span className="font-bold text-white">{nh.authorName}</span>
                          <span>{new Date(nh.createdAt).toLocaleString()}</span>
                        </div>
                        <p className="text-[#F5F5F8]">{nh.noteContent}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add new note */}
                <div className="space-y-2 pt-2">
                  <textarea
                    rows={2}
                    placeholder="Append new internal note regarding meeting, proposal, or qualification..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="w-full p-3 bg-[#181820] border border-[#262630] text-white focus:outline-none focus:border-[#FF4D12]"
                  />
                </div>
              </div>

            </div>

            {/* Modal Actions */}
            <div className="p-6 border-t border-[#262630] bg-[#16161C] flex items-center justify-between">
              <Button onClick={() => setSelectedEnquiry(null)} variant="outline" size="sm">
                Cancel
              </Button>
              <Button
                onClick={handleSaveModalUpdates}
                variant="primary"
                size="sm"
                isLoading={isUpdating}
              >
                Save Updates & Append Note
              </Button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
