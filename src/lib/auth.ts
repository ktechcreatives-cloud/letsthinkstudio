import { cookies } from 'next/headers';
import crypto from 'crypto';

const SESSION_COOKIE_NAME = 'lts_admin_token';
const SECRET = process.env.ADMIN_SESSION_SECRET || (process.env.NODE_ENV !== 'production' ? 'lets-think-studio-dev-secret-key-2026' : '');

export interface AdminUser {
  email: string;
  name: string;
  role: 'admin';
}

function signToken(payload: string): string {
  const secretKey = SECRET || process.env.ADMIN_SESSION_SECRET || 'dev-fallback-key';
  const hmac = crypto.createHmac('sha256', secretKey);
  hmac.update(payload);
  const signature = hmac.digest('hex');
  return `${Buffer.from(payload).toString('base64url')}.${signature}`;
}

function verifyToken(token: string): string | null {
  try {
    const [encodedPayload, signature] = token.split('.');
    if (!encodedPayload || !signature) return null;

    const payload = Buffer.from(encodedPayload, 'base64url').toString('utf-8');
    const secretKey = SECRET || process.env.ADMIN_SESSION_SECRET || 'dev-fallback-key';
    const hmac = crypto.createHmac('sha256', secretKey);
    hmac.update(payload);
    const expectedSignature = hmac.digest('hex');

    if (crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
      const data = JSON.parse(payload);
      if (data.exp && Date.now() > data.exp) return null;
      return data.email;
    }
  } catch {
    return null;
  }
  return null;
}

export async function validateAdminCredentials(email: string, pass: string): Promise<boolean> {
  const adminEmail = process.env.ADMIN_DEFAULT_EMAIL || 'admin@letsthinkstudio.com';
  // Require explicit environment variable in production. Dev mode fallback only for local setup testing.
  const adminPassword = process.env.ADMIN_DEFAULT_PASSWORD || (process.env.NODE_ENV !== 'production' ? 'letsthink2026!' : '');

  if (!adminPassword) {
    console.error('Security alert: ADMIN_DEFAULT_PASSWORD is not configured in the environment.');
    return false;
  }

  const emailMatch = email.toLowerCase().trim() === adminEmail.toLowerCase().trim();
  const passMatch = pass === adminPassword;
  return emailMatch && passMatch;
}

export async function createAdminSession(email: string): Promise<string> {
  const payload = JSON.stringify({
    email,
    role: 'admin',
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days
  });
  const token = signToken(payload);

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60,
    path: '/'
  });

  return token;
}

export async function getAdminSession(): Promise<AdminUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    if (!token) return null;

    const email = verifyToken(token);
    if (!email) return null;

    return {
      email,
      name: "Studio Administrator",
      role: 'admin'
    };
  } catch {
    return null;
  }
}

export async function destroyAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
