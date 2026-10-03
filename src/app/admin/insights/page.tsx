import React from 'react';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/auth';
import { getBlogPosts } from '@/lib/db/storage';
import { BlogManagementView } from '@/components/admin/BlogManagementView';

export const metadata: Metadata = {
  title: "Insights & Journal Management",
};

export const revalidate = 0;

export default async function AdminInsightsPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect('/admin/login');
  }

  const posts = await getBlogPosts('all');

  return <BlogManagementView initialPosts={posts} />;
}
