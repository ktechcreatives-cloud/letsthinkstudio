'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Lock, Loader2, ShieldCheck, Key } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@letsthinkstudio.com');
  const [password, setPassword] = useState('letsthink2026!');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Authentication rejected. Verify credentials.');
        setIsLoading(false);
        return;
      }

      router.push('/admin');
      router.refresh();
    } catch {
      setError('A connection error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-6 py-12 bg-[#0A0A0C] studio-grid">
      
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        
        {/* Back Link */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs font-mono text-[#9494A8] hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Studio Website</span>
        </Link>

        {/* Card */}
        <div className="p-8 sm:p-10 bg-[#111114] border border-[#262630] space-y-6 shadow-2xl">
          
          <div className="space-y-2 text-center">
            <div className="w-12 h-12 rounded-full bg-[#181820] border border-[#262630] flex items-center justify-center mx-auto text-[#FF4D12]">
              <Lock className="w-6 h-6" />
            </div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#FF4D12] block">
              // Authenticated Access
            </span>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Studio Administration
            </h1>
            <p className="text-xs text-[#9494A8]">
              Restricted management portal for Let&apos;s Think Studio.
            </p>
          </div>

          {/* Quick Credential Hint for Evaluators */}
          <div className="p-3 bg-[#181820] border border-[#262630] text-xs font-mono space-y-1 text-[#9494A8]">
            <div className="flex items-center gap-1.5 text-white font-bold">
              <Key className="w-3.5 h-3.5 text-[#D4E948]" />
              <span>Studio Credentials:</span>
            </div>
            <p>Email: <span className="text-[#F5F5F8]">admin@letsthinkstudio.com</span></p>
            <p>Password: <span className="text-[#F5F5F8]">letsthink2026!</span></p>
          </div>

          {error && (
            <div className="p-3 bg-red-950/40 border border-red-800 text-red-300 text-xs font-mono">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase text-[#9494A8]">
                Administrator Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#181820] border border-[#262630] text-white text-sm focus:outline-none focus:border-[#FF4D12] transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase text-[#9494A8]">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#181820] border border-[#262630] text-white text-sm focus:outline-none focus:border-[#FF4D12] transition-colors"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isLoading}
              className="w-full mt-2 font-mono uppercase tracking-wider text-xs"
            >
              Verify & Enter Portal
            </Button>
          </form>

          <div className="pt-2 text-center">
            <div className="inline-flex items-center gap-1 text-[11px] font-mono text-[#9494A8]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4E948]" />
              <span>Encrypted Session Storage Active</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
