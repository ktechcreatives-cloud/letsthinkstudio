import { NextRequest, NextResponse } from 'next/server';
import { getBlogPosts, saveBlogPost, deleteBlogPost } from '@/lib/db/storage';
import { getAdminSession } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status') || undefined;
  const posts = await getBlogPosts(status);
  return NextResponse.json({ posts });
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

    const saved = await saveBlogPost(body);
    return NextResponse.json({ success: true, post: saved });
  } catch (err: unknown) {
    console.error('Error saving article:', err);
    return NextResponse.json({ error: 'Failed to save article' }, { status: 500 });
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
    return NextResponse.json({ error: 'Missing article ID' }, { status: 400 });
  }

  const deleted = await deleteBlogPost(id);
  if (!deleted) {
    return NextResponse.json({ error: 'Article not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, message: 'Article deleted' });
}
