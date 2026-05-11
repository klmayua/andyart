'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Shield, Eye, EyeOff } from 'lucide-react';

export default function SignInPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = login(email, password);
    setLoading(false);
    if (result.success) {
      router.push('/ops/crm');
    } else {
      setError(result.error || 'Login failed');
    }
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
                className="w-full px-5 py-3.5 rounded-xl bg-white/10 border border-white/10 text-andy-ivory placeholder:text-andy-ivory/30 focus:outline-none focus:ring-2 focus:ring-andy-gold/40 focus:border-andy-gold/30 transition-all"
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
                  className="w-full px-5 py-3.5 pr-12 rounded-xl bg-white/10 border border-white/10 text-andy-ivory placeholder:text-andy-ivory/30 focus:outline-none focus:ring-2 focus:ring-andy-gold/40 focus:border-andy-gold/30 transition-all"
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-andy-ivory/40 hover:text-andy-ivory/70">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-andy-wine/10 border border-andy-wine/20 rounded-xl px-4 py-3 text-sm text-andy-wine">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-andy-gold text-andy-black py-3.5 rounded-xl font-semibold text-sm hover:bg-andy-gold/80 transition-all disabled:opacity-60"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-xs text-andy-ivory/40 text-center mb-3">Demo Accounts</p>
            <div className="space-y-2">
              {[
                { email: 'admin@andyart.gallery', label: 'Super Admin' },
                { email: 'chioma@andyart.gallery', label: 'Concierge Director' },
                { email: 'readview@andyart.gallery', label: 'Read Only' },
              ].map((demo) => (
                <button
                  key={demo.email}
                  type="button"
                  onClick={() => { setEmail(demo.email); setPassword('demo'); }}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs text-andy-ivory/60 hover:text-andy-ivory/90 hover:bg-white/5 transition-colors"
                >
                  {demo.label} → {demo.email}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}