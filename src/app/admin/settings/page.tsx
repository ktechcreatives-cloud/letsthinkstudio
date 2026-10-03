import React from 'react';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/auth';
import { getSiteSettings } from '@/lib/db/storage';
import { SettingsManagementView } from '@/components/admin/SettingsManagementView';

export const metadata: Metadata = {
  title: "Website & Brand Settings",
};

export const revalidate = 0;

export default async function AdminSettingsPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect('/admin/login');
  }

  const settings = await getSiteSettings();

  return <SettingsManagementView initialSettings={settings} />;
}
