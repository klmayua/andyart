'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { DEMO_ROLES, setDemoSession } from '@/lib/demo-session';

export default function SignInPage() {
  const router = useRouter();

  const handleRoleSelect = (role: typeof DEMO_ROLES[0]) => {
    setDemoSession(role);
    router.push(role.route);
  };

  return (
    <div className="min-h-screen bg-[#F7F2E8] px-4 py-12 pt-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl font-bold text-andy-black mb-3">
            Institutional Access
          </h1>
          <p className="text-andy-bronze max-w-xl mx-auto">
            Select an operational identity to explore the AndyArt ecosystem.
            Each role provides access to its respective operational surfaces.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {DEMO_ROLES.map((role) => (
            <button
              key={role.role}
              onClick={() => handleRoleSelect(role)}
              className="group bg-white border border-andy-stone/20 rounded-xl p-6 text-left hover:border-andy-gold/40 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-andy-gold/10 flex items-center justify-center text-andy-gold font-serif font-bold text-lg">
                  {role.initials}
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>
              
              <h3 className="font-serif text-lg font-semibold text-andy-black mb-1">
                {role.title}
              </h3>
              <p className="text-sm font-medium text-andy-bronze mb-3">
                {role.name}
              </p>
              <p className="text-sm text-andy-stone leading-relaxed">
                {role.context}
              </p>
              
              <div className="mt-4 pt-4 border-t border-andy-stone/10 flex items-center text-andy-gold text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Enter &rarr;
              </div>
            </button>
          ))}
        </div>

        <div className="text-center border-t border-andy-stone/20 pt-8">
          <p className="text-andy-bronze text-sm mb-4">
            This is a demonstration environment. No authentication required.
          </p>
          <Link href="/" className="text-andy-bronze hover:text-andy-black text-sm transition-colors">
            &larr; Return to public site
          </Link>
        </div>
      </div>
    </div>
  );
}