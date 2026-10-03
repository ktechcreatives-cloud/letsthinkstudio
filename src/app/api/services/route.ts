import { NextRequest, NextResponse } from 'next/server';
import { getServices, saveService } from '@/lib/db/storage';
import { getAdminSession } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status') || undefined;
  const services = await getServices(status);
  return NextResponse.json({ services });
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    if (!body.title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const saved = await saveService(body);
    return NextResponse.json({ success: true, service: saved });
  } catch (err: unknown) {
    console.error('Error saving service:', err);
    return NextResponse.json({ error: 'Failed to save service' }, { status: 500 });
  }
}
