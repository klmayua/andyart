'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Shield, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { ROLE_LABELS } from '@/types/auth';

export default function OpsSignInPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = login(email, password);
    setLoading(false);
    if (result.success) {
      router.push('/ops/crm');
    } else {
      setError(result.error || 'Authentication failed');
    }
  };

  const fillDemo = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('demo');
    setError('');
  };

  return (
    <div className="min-h-screen bg-[#171614] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-andy-gold rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Shield size={32} className="text-andy-black" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-andy-ivory mb-2">Operator Portal</h1>
          <p className="text-andy-ivory/40 text-sm">AndyArt Cultural House — Secure Access</p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs text-andy-ivory/60 uppercase tracking-wider mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="operator@andyart.gallery"
                className="w-full px-5 py-3.5 rounded-xl bg-white/10 border border-white/10 text-andy-ivory placeholder:text-andy-ivory/30 focus:outline-none focus:ring-2 focus:ring-andy-gold/40 focus:border-andy-gold/30 transition-all text-sm"
              />
            </div>

            <div>
              <label className="block text-xs text-andy-ivory/60 uppercase tracking-wider mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter password"
                  className="w-full px-5 py-3.5 pr-12 rounded-xl bg-white/10 border border-white/10 text-andy-ivory placeholder:text-andy-ivory/30 focus:outline-none focus:ring-2 focus:ring-andy-gold/40 focus:border-andy-gold/30 transition-all text-sm"
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-andy-ivory/40 hover:text-andy-ivory/70 transition-colors">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                <AlertCircle size={14} className="text-red-400 flex-shrink-0" />
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-andy-gold text-andy-black py-3.5 rounded-xl font-semibold text-sm hover:bg-andy-gold/80 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <><span className="w-4 h-4 border-2 border-andy-black/30 border-t-andy-black rounded-full animate-spin" /> Signing in...</>
              ) : 'Sign In to Portal'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-xs text-andy-ivory/40 text-center mb-3">Demo accounts (use any password)</p>
            <div className="space-y-1.5">
              {[
                { email: 'admin@andyart.gallery', role: 'Super Admin', color: 'text-red-400' },
                { email: 'chioma@andyart.gallery', role: 'Concierge Director', color: 'text-andy-gold' },
                { email: 'tunde@andyart.gallery', role: 'Concierge Director', color: 'text-andy-gold' },
                { email: 'compliance@andyart.gallery', role: 'Compliance', color: 'text-cyan-400' },
                { email: 'readview@andyart.gallery', role: 'Read Only', color: 'text-gray-400' },
              ].map((demo) => (
                <button
                  key={demo.email}
                  type="button"
                  onClick={() => fillDemo(demo.email)}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs hover:bg-white/5 transition-colors group"
                >
                  <span className="text-andy-ivory/50">{demo.email}</span>
                  <span className={`ml-2 font-medium ${demo.color}`}>{demo.role}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="text-center mt-6">
          <a href="/" className="text-andy-ivory/30 hover:text-andy-ivory/50 text-xs transition-colors">
            &larr; Back to andyart.gallery
          </a>
        </p>
      </div>
    </div>
  );
}