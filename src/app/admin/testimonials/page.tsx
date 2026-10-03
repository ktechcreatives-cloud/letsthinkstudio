import React from 'react';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/auth';
import { getTestimonials } from '@/lib/db/storage';
import { TestimonialsManagementView } from '@/components/admin/TestimonialsManagementView';

export const metadata: Metadata = {
  title: "Testimonials Management",
};

export const revalidate = 0;

export default async function AdminTestimonialsPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect('/admin/login');
  }

  const testimonials = await getTestimonials('all');

  return <TestimonialsManagementView initialTestimonials={testimonials} />;
}
