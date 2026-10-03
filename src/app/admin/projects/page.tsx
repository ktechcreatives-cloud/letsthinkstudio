import React from 'react';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/auth';
import { getProjects } from '@/lib/db/storage';
import { ProjectManagementView } from '@/components/admin/ProjectManagementView';

export const metadata: Metadata = {
  title: "Project & Portfolio Management",
};

export const revalidate = 0;

export default async function AdminProjectsPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect('/admin/login');
  }

  const projects = await getProjects('all');

  return <ProjectManagementView initialProjects={projects} />;
}
