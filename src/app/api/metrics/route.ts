import { NextResponse } from 'next/server';
import { getDashboardMetrics } from '@/lib/db/storage';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const metrics = await getDashboardMetrics();
  return NextResponse.json({ metrics });
}
