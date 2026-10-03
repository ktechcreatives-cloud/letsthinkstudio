import { NextRequest, NextResponse } from 'next/server';
import { getSiteSettings, updateSiteSettings } from '@/lib/db/storage';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  const settings = await getSiteSettings();
  return NextResponse.json({ settings });
}

export async function PUT(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const updated = await updateSiteSettings(body);
    return NextResponse.json({ success: true, settings: updated });
  } catch (err: unknown) {
    console.error('Error updating settings:', err);
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
