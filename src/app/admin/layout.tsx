import React from 'react';
import { getAdminSession } from '@/lib/auth';
import { AdminSidebar } from '@/components/admin/AdminSidebar';

export const revalidate = 0;

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  // If user is not authenticated, child pages (like /admin/login) will render directly
  // Protected pages will verify or redirect
  if (!session) {
    return <div className="min-h-screen bg-[#0A0A0C]">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-[#0A0A0C] flex flex-col lg:flex-row text-[#F5F5F8]">
      <AdminSidebar />
      <main className="flex-1 min-w-0 p-6 sm:p-10 lg:p-12 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
