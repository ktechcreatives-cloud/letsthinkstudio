import { NextRequest, NextResponse } from 'next/server';
import { getTestimonials, saveTestimonial, deleteTestimonial } from '@/lib/db/storage';
import { getAdminSession } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status') || undefined;
  const testimonials = await getTestimonials(status);
  return NextResponse.json({ testimonials });
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    if (!body.clientName || !body.quote) {
      return NextResponse.json({ error: 'Client name and quote are required' }, { status: 400 });
    }

    const saved = await saveTestimonial(body);
    return NextResponse.json({ success: true, testimonial: saved });
  } catch (err: unknown) {
    console.error('Error saving testimonial:', err);
    return NextResponse.json({ error: 'Failed to save testimonial' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'Missing testimonial ID' }, { status: 400 });
  }

  const deleted = await deleteTestimonial(id);
  if (!deleted) {
    return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, message: 'Testimonial deleted' });
}
