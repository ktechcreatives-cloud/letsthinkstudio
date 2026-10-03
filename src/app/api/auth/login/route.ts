import { NextRequest, NextResponse } from 'next/server';
import { validateAdminCredentials, createAdminSession } from '@/lib/auth';
import { addActivityLog } from '@/lib/db/storage';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const isValid = await validateAdminCredentials(email, password);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid administrator credentials.' },
        { status: 401 }
      );
    }

    await createAdminSession(email);

    await addActivityLog({
      action: 'Admin Logged In',
      entityType: 'auth',
      actorEmail: email,
      details: { timestamp: new Date().toISOString() }
    });

    return NextResponse.json({
      success: true,
      message: 'Authenticated successfully as Studio Administrator.'
    });
  } catch (err: unknown) {
    console.error('Login error:', err);
    return NextResponse.json(
      { error: 'An error occurred during authentication.' },
      { status: 500 }
    );
  }
}
