'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface FormState {
  fullName: string;
  companyName: string;
  businessEmail: string;
  phoneNumber: string;
  serviceRequired: string;
  projectDescription: string;
  budgetRange: string;
  expectedTimeline: string;
  referralSource: string;
  privacyConsent: boolean;
  // Honeypot field for bot spam prevention
  hp_field: string;
}

const INITIAL_FORM: FormState = {
  fullName: '',
  companyName: '',
  businessEmail: '',
  phoneNumber: '',
  serviceRequired: '',
  projectDescription: '',
  budgetRange: '',
  expectedTimeline: '',
  referralSource: '',
  privacyConsent: false,
  hp_field: '',
};

const SERVICES = [
  'Brand Strategy & Identity',
  'Graphic Design & Advertising',
  'Website Design & Development',
  'Digital Campaign Creatives',
  'Packaging & Print Design',
  'Multi-Disciplinary / Complete Overhaul'
];

const BUDGETS = [
  '$10,000 - $25,000',
  '$25,000 - $50,000',
  '$50,000 - $100,000',
  '$100,000+'
];

const TIMELINES = [
  'Urgent (< 1 month)',
  '1 - 2 Months',
  '2 - 3 Months',
  '3 - 6 Months',
  'Flexible / Planning Phase'
];

export function EnquiryForm() {
  const [formData, setFormData] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverMessage, setServerMessage] = useState('');
  const [enquiryId, setEnquiryId] = useState('');

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      errs.fullName = 'Full name must be at least 2 characters.';
    }

    if (!formData.businessEmail.trim()) {
      errs.businessEmail = 'Business email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.businessEmail)) {
      errs.businessEmail = 'Please provide a valid email address.';
    }

    if (!formData.serviceRequired) {
      errs.serviceRequired = 'Please select the required discipline.';
    }

    if (!formData.projectDescription.trim() || formData.projectDescription.trim().length < 20) {
      errs.projectDescription = 'Please provide at least 20 characters describing your project challenge.';
    }

    if (!formData.budgetRange) {
      errs.budgetRange = 'Please select a budget range.';
    }

    if (!formData.expectedTimeline) {
      errs.expectedTimeline = 'Please select your expected timeline.';
    }

    if (!formData.privacyConsent) {
      errs.privacyConsent = 'You must accept the privacy policy to proceed.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check
    if (formData.hp_field) {
      // Quietly drop bot spam
      setIsSuccess(true);
      return;
    }

    if (!validate()) {
      return;
    }

    setIsLoading(true);
    setServerMessage('');

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          companyName: formData.companyName,
          businessEmail: formData.businessEmail,
          phoneNumber: formData.phoneNumber,
          serviceRequired: formData.serviceRequired,
          projectDescription: formData.projectDescription,
          budgetRange: formData.budgetRange,
          expectedTimeline: formData.expectedTimeline,
          referralSource: formData.referralSource,
          privacyConsent: formData.privacyConsent,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.errors) {
          const formatted: Record<string, string> = {};
          for (const key in result.errors) {
            formatted[key] = result.errors[key][0];
          }
          setErrors(formatted);
        }
        setServerMessage(result.message || 'Submission failed. Please check form errors.');
        setIsLoading(false);
        return;
      }

      setIsSuccess(true);
      setEnquiryId(result.enquiryId || '');
      setServerMessage(result.message || 'Thank you. Your project brief has been received.');
      setFormData(INITIAL_FORM);
      setErrors({});
    } catch {
      setServerMessage('A network error occurred. Please try again or email us directly.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="p-8 sm:p-14 bg-white border border-[#E5E5E0] shadow-sm space-y-6 text-center animate-fade-in rounded-sm">
        <div className="w-16 h-16 rounded-full bg-[#FF572D]/10 border border-[#FF572D]/20 flex items-center justify-center mx-auto text-[#FF572D]">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-xs font-semibold text-[#FF572D] uppercase tracking-widest">
            // Brief Received
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#171819] font-heading">
            Thank you. Your project brief is in our hands.
          </h3>
          <p className="text-base text-[#737373] max-w-xl mx-auto leading-relaxed">
            We review all submissions personally. You will receive an initial assessment and dialogue invitation within 24 business hours.
          </p>
        </div>

        {enquiryId && (
          <div className="p-3 bg-[#F5F5F3] border border-[#E5E5E0] max-w-xs mx-auto text-xs font-mono text-[#737373] rounded-sm">
            Enquiry Reference: <span className="text-[#171819] font-bold">{enquiryId}</span>
          </div>
        )}

        <div className="pt-4 flex flex-wrap justify-center gap-4">
          <Button onClick={() => setIsSuccess(false)} variant="outline">
            Submit Another Inquiry
          </Button>
          <Button href="/work" variant="primary">
            Explore Portfolio While Waiting
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-8 sm:p-12 bg-white border border-[#E5E5E0] shadow-sm space-y-7 rounded-sm" noValidate>
      
      {serverMessage && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-3 rounded-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <span>{serverMessage}</span>
        </div>
      )}

      {/* Hidden honeypot field */}
      <input
        type="text"
        name="hp_field"
        value={formData.hp_field}
        onChange={(e) => setFormData({ ...formData, hp_field: e.target.value })}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="space-y-6">
        
        {/* Name & Company */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#171819]">
              Full Name <span className="text-[#FF572D]">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Henrik Lindqvist"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className={`w-full px-4 py-3 bg-[#F5F5F3] border text-[#171819] placeholder-[#737373]/60 text-sm focus:outline-none focus:border-[#FF572D] focus:bg-white transition-colors rounded-none ${
                errors.fullName ? 'border-red-500' : 'border-[#DDDDC6]'
              }`}
            />
            {errors.fullName && <p className="text-xs text-red-600 font-mono">{errors.fullName}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#171819]">
              Company / Brand Name
            </label>
            <input
              type="text"
              placeholder="e.g. Aethelgard Studio"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              className="w-full px-4 py-3 bg-[#F5F5F3] border border-[#DDDDC6] text-[#171819] placeholder-[#737373]/60 text-sm focus:outline-none focus:border-[#FF572D] focus:bg-white transition-colors rounded-none"
            />
          </div>
        </div>

        {/* Business Email & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#171819]">
              Business Email <span className="text-[#FF572D]">*</span>
            </label>
            <input
              type="email"
              placeholder="name@company.com"
              value={formData.businessEmail}
              onChange={(e) => setFormData({ ...formData, businessEmail: e.target.value })}
              className={`w-full px-4 py-3 bg-[#F5F5F3] border text-[#171819] placeholder-[#737373]/60 text-sm focus:outline-none focus:border-[#FF572D] focus:bg-white transition-colors rounded-none ${
                errors.businessEmail ? 'border-red-500' : 'border-[#DDDDC6]'
              }`}
            />
            {errors.businessEmail && <p className="text-xs text-red-600 font-mono">{errors.businessEmail}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#171819]">
              Phone or WhatsApp (Optional)
            </label>
            <input
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              className="w-full px-4 py-3 bg-[#F5F5F3] border border-[#DDDDC6] text-[#171819] placeholder-[#737373]/60 text-sm focus:outline-none focus:border-[#FF572D] focus:bg-white transition-colors rounded-none"
            />
          </div>
        </div>

        {/* Required Discipline */}
        <div className="space-y-2">
          <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#171819]">
            Primary Discipline Required <span className="text-[#FF572D]">*</span>
          </label>
          <select
            value={formData.serviceRequired}
            onChange={(e) => setFormData({ ...formData, serviceRequired: e.target.value })}
            className={`w-full px-4 py-3 bg-[#F5F5F3] border text-[#171819] text-sm focus:outline-none focus:border-[#FF572D] focus:bg-white transition-colors rounded-none ${
              errors.serviceRequired ? 'border-red-500' : 'border-[#DDDDC6]'
            }`}
          >
            <option value="">Select a discipline...</option>
            {SERVICES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {errors.serviceRequired && <p className="text-xs text-red-600 font-mono">{errors.serviceRequired}</p>}
        </div>

        {/* Project Description */}
        <div className="space-y-2">
          <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#171819]">
            Project Overview & Goals <span className="text-[#FF572D]">*</span>
          </label>
          <textarea
            rows={4}
            placeholder="Tell us about your brand challenge, target market, timeline, and what success looks like for this engagement..."
            value={formData.projectDescription}
            onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
            className={`w-full px-4 py-3 bg-[#F5F5F3] border text-[#171819] placeholder-[#737373]/60 text-sm focus:outline-none focus:border-[#FF572D] focus:bg-white transition-colors rounded-none ${
              errors.projectDescription ? 'border-red-500' : 'border-[#DDDDC6]'
            }`}
          />
          {errors.projectDescription && <p className="text-xs text-red-600 font-mono">{errors.projectDescription}</p>}
        </div>

        {/* Budget & Timeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#171819]">
              Estimated Budget Range <span className="text-[#FF572D]">*</span>
            </label>
            <select
              value={formData.budgetRange}
              onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
              className={`w-full px-4 py-3 bg-[#F5F5F3] border text-[#171819] text-sm focus:outline-none focus:border-[#FF572D] focus:bg-white transition-colors rounded-none ${
                errors.budgetRange ? 'border-red-500' : 'border-[#DDDDC6]'
              }`}
            >
              <option value="">Select budget range...</option>
              {BUDGETS.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
            {errors.budgetRange && <p className="text-xs text-red-600 font-mono">{errors.budgetRange}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#171819]">
              Expected Launch Timeline <span className="text-[#FF572D]">*</span>
            </label>
            <select
              value={formData.expectedTimeline}
              onChange={(e) => setFormData({ ...formData, expectedTimeline: e.target.value })}
              className={`w-full px-4 py-3 bg-[#F5F5F3] border text-[#171819] text-sm focus:outline-none focus:border-[#FF572D] focus:bg-white transition-colors rounded-none ${
                errors.expectedTimeline ? 'border-red-500' : 'border-[#DDDDC6]'
              }`}
            >
              <option value="">Select expected timeline...</option>
              {TIMELINES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            {errors.expectedTimeline && <p className="text-xs text-red-600 font-mono">{errors.expectedTimeline}</p>}
          </div>
        </div>

        {/* Referral Source */}
        <div className="space-y-2">
          <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#171819]">
            How Did You Discover Let&apos;s Think Studio?
          </label>
          <input
            type="text"
            placeholder="e.g. Colleague referral, recent project, search"
            value={formData.referralSource}
            onChange={(e) => setFormData({ ...formData, referralSource: e.target.value })}
            className="w-full px-4 py-3 bg-[#F5F5F3] border border-[#DDDDC6] text-[#171819] placeholder-[#737373]/60 text-sm focus:outline-none focus:border-[#FF572D] focus:bg-white transition-colors rounded-none"
          />
        </div>

        {/* Consent Checkbox */}
        <div className="space-y-2 pt-2">
          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={formData.privacyConsent}
              onChange={(e) => setFormData({ ...formData, privacyConsent: e.target.checked })}
              className="mt-1 w-4 h-4 rounded-none accent-[#FF572D]"
            />
            <span className="text-xs text-[#737373] leading-relaxed">
              I consent to Let&apos;s Think Studio storing my information to review this brief and contact me regarding this enquiry. We protect your privacy under our{' '}
              <Link href="/privacy-policy" className="text-[#171819] underline hover:text-[#FF572D] font-medium">
                Privacy Policy
              </Link>.
            </span>
          </label>
          {errors.privacyConsent && <p className="text-xs text-red-600 font-mono">{errors.privacyConsent}</p>}
        </div>

      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <Button
          type="submit"
          size="lg"
          variant="primary"
          isLoading={isLoading}
          withArrow={!isLoading}
          className="w-full sm:w-auto"
        >
          {isLoading ? 'Submitting Brief...' : 'Send Project Enquiry'}
        </Button>
      </div>

    </form>
  );
}
