import { NextRequest, NextResponse } from 'next/server';
import { enquirySchema } from '@/lib/validations/enquiry';
import { createEnquiry, getEnquiries, updateEnquiry } from '@/lib/db/storage';
import { getAdminSession } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Server-side Zod validation
    const parsed = enquirySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Validation failed. Please review the form fields.',
          errors: parsed.error.flatten().fieldErrors 
        },
        { status: 400 }
      );
    }

    const saved = await createEnquiry(parsed.data);

    return NextResponse.json({
      success: true,
      message: 'Your enquiry has been received by Let’s Think Studio. We will review your brief within 24 business hours.',
      enquiryId: saved.id
    }, { status: 201 });
  } catch (err: unknown) {
    console.error('Error handling enquiry submission:', err);
    return NextResponse.json(
      { success: false, message: 'An internal error occurred while saving your enquiry.' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status') || undefined;
  const query = searchParams.get('query') || undefined;

  const enquiries = await getEnquiries({ status, query });
  return NextResponse.json({ enquiries });
}

export async function PATCH(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, status, followUpDate, internalNotes, newNote } = body;

    if (!id) {
      return NextResponse.json({ error: 'Missing enquiry ID' }, { status: 400 });
    }

    const updated = await updateEnquiry(id, {
      status,
      followUpDate,
      internalNotes,
      newNote,
      authorName: session.name
    });

    if (!updated) {
      return NextResponse.json({ error: 'Enquiry not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, enquiry: updated });
  } catch (err: unknown) {
    console.error('Error updating enquiry:', err);
    return NextResponse.json({ error: 'Failed to update enquiry' }, { status: 500 });
  }
}
