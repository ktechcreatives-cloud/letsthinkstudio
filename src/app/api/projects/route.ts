import { NextRequest, NextResponse } from 'next/server';
import { getProjects, saveProject, deleteProject } from '@/lib/db/storage';
import { getAdminSession } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status') || undefined;
  const projects = await getProjects(status);
  return NextResponse.json({ projects });
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    if (!body.title || !body.category) {
      return NextResponse.json({ error: 'Title and category are required' }, { status: 400 });
    }

    const saved = await saveProject(body);
    return NextResponse.json({ success: true, project: saved });
  } catch (err: unknown) {
    console.error('Error saving project:', err);
    return NextResponse.json({ error: 'Failed to save project' }, { status: 500 });
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
    return NextResponse.json({ error: 'Missing project ID' }, { status: 400 });
  }

  const deleted = await deleteProject(id);
  if (!deleted) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, message: 'Project deleted' });
}
