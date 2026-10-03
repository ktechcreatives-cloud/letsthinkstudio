import React from 'react';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/auth';
import { getEnquiries } from '@/lib/db/storage';
import { EnquiryManagementView } from '@/components/admin/EnquiryManagementView';

export const metadata: Metadata = {
  title: "Enquiry Pipeline Management",
};

export const revalidate = 0;

export default async function AdminEnquiriesPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect('/admin/login');
  }

  const enquiries = await getEnquiries();

  return <EnquiryManagementView initialEnquiries={enquiries} />;
}
