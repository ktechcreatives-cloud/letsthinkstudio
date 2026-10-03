import React from 'react';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/auth';
import { getServices } from '@/lib/db/storage';
import { ServiceManagementView } from '@/components/admin/ServiceManagementView';

export const metadata: Metadata = {
  title: "Service Management",
};

export const revalidate = 0;

export default async function AdminServicesPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect('/admin/login');
  }

  const services = await getServices('all');

  return <ServiceManagementView initialServices={services} />;
}
