'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth, getDemoAccounts } from '@/hooks/useAuth';
import { loginDemoUser, loginWithDemoAccount, getDemoUser } from '@/lib/demo-auth';

export default function SignInPage() {
  const router = useRouter();
  const { login, enableDemoMode, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<'login' | 'demo'>('login');

  const demoAccounts = getDemoAccounts();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const result = login(email, password);
    
    if (result.success) {
      const session = loginDemoUser(email, password);
      if (session.session) {
        router.push(session.session.defaultRoute);
      } else {
        router.push('/enterprise');
      }
    } else {
      setError(result.error || 'Invalid credentials');
      setIsSubmitting(false);
    }
  };

  const handleDemoSelect = async (account: typeof demoAccounts[0]) => {
    const result = loginWithDemoAccount(account);
    if (result.success && result.session) {
      router.push(account.defaultRoute);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0C0A] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-andy-gold rounded-2xl flex items-center justify-center mx-auto mb-6">
            <span className="text-[#0D0C0A] font-serif font-bold text-2xl">AA</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-[#FFFDF9] mb-2">
            Institutional Access
          </h1>
          <p className="text-andy-bronze text-sm max-w-md mx-auto">
            Access operational workspaces and private cultural systems.
          </p>
        </div>

        <div className="bg-[#171614] border border-[#FFFDF9]/10 rounded-2xl p-8 max-w-md mx-auto mb-10">
          <div className="flex border-b border-[#FFFDF9]/10 mb-6">
            <button
              type="button"
              onClick={() => setActiveTab('login')}
              className={`flex-1 pb-3 text-sm font-medium transition-colors ${
                activeTab === 'login' 
                  ? 'text-andy-gold border-b-2 border-andy-gold' 
                  : 'text-andy-bronze hover:text-[#FFFDF9]'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('demo')}
              className={`flex-1 pb-3 text-sm font-medium transition-colors ${
                activeTab === 'demo' 
                  ? 'text-andy-gold border-b-2 border-andy-gold' 
                  : 'text-andy-bronze hover:text-[#FFFDF9]'
              }`}
            >
              Demo Access
            </button>
          </div>

          {activeTab === 'login' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-andy-wine/10 text-andy-wine text-sm px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-[#FFFDF9] mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#0D0C0A] border border-[#FFFDF9]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-andy-gold/30 text-[#FFFDF9] placeholder:text-andy-bronze/50"
                  placeholder="email@andyart.house"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#FFFDF9] mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#0D0C0A] border border-[#FFFDF9]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-andy-gold/30 text-[#FFFDF9] placeholder:text-andy-bronze/50"
                  placeholder="Enter password"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isLoading}
                className="w-full bg-andy-gold text-[#0D0C0A] py-3 rounded-lg font-medium hover:bg-andy-gold/90 transition-colors disabled:opacity-50 text-sm tracking-wide"
              >
                {isSubmitting ? 'Authenticating...' : 'Enter'}
              </button>
            </form>
          )}

          {activeTab === 'demo' && (
            <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
              {demoAccounts.map((account) => (
                <button
                  key={account.id}
                  onClick={() => handleDemoSelect(account)}
                  className="w-full flex items-center gap-3 p-3 bg-[#0D0C0A] border border-[#FFFDF9]/10 rounded-lg hover:border-andy-gold/30 transition-all text-left group"
                >
                  <div className="w-10 h-10 rounded-full bg-andy-gold/10 flex items-center justify-center text-andy-gold font-serif font-bold text-sm">
                    {account.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[#FFFDF9] font-medium text-sm truncate">{account.title}</p>
                    <p className="text-andy-bronze text-xs truncate">{account.email}</p>
                  </div>
                  <span className="text-andy-gold text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    Enter &rarr;
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="text-center">
          <Link href="/" className="text-andy-bronze hover:text-[#FFFDF9] text-sm transition-colors">
            &larr; Return to public site
          </Link>
        </div>
      </div>
    </div>
  );
}