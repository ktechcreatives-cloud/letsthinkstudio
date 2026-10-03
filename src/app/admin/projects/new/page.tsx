import React from 'react';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/auth';
import { NewProjectForm } from '@/components/admin/NewProjectForm';

export const metadata: Metadata = {
  title: "Create New Project | Studio Admin",
};

export const revalidate = 0;

export default async function AdminNewProjectPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect('/admin/login');
  }

  return <NewProjectForm />;
}
