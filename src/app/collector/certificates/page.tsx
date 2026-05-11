'use client';

import { useMemo, useState } from 'react';
import { Award, Search, CheckCircle, Copy, Download } from 'lucide-react';
import { useCurrentCollectorId } from '@/hooks/useCurrentCollector';
import { getCertificates, getCertificateByCode } from '@/lib/collector';

export default function CollectorCertificatesPage() {
  const collectorId = useCurrentCollectorId();
  const certs = useMemo(() => collectorId ? getCertificates(collectorId) : [], [collectorId]);
  const [search, setSearch] = useState('');
  const [verifyCode, setVerifyCode] = useState('');
  const [verifyResult, setVerifyResult] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  const filtered = certs.filter((c) =>
    c.artworkTitle.toLowerCase().includes(search.toLowerCase()) ||
    c.artistName.toLowerCase().includes(search.toLowerCase()) ||
    c.verificationCode.toLowerCase().includes(search.toLowerCase())
  );

  const handleVerify = () => {
    if (!verifyCode.trim()) return;
    const result = getCertificateByCode(verifyCode.trim());
    setVerifyResult(result ? { found: true, cert: result } : { found: false });
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!collectorId) {
    return <div className="text-center py-20 text-sm text-andy-bronze">Loading...</div>;
  }

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-andy-black mb-6">Certificates of Authenticity</h1>

      {/* Verify Section */}
      <div className="bg-white rounded-2xl border border-andy-stone/20 p-6 mb-6">
        <h3 className="text-sm font-semibold text-andy-black mb-3">Verify Certificate</h3>
        <div className="flex gap-2">
          <input
            value={verifyCode}
            onChange={(e) => setVerifyCode(e.target.value)}
            placeholder="Enter verification code or certificate ID"
            className="flex-1 px-4 py-2.5 rounded-xl border border-andy-stone/20 text-sm focus:outline-none focus:ring-2 focus:ring-andy-gold/40"
          />
          <button onClick={handleVerify} className="px-4 py-2.5 bg-andy-gold text-andy-black rounded-xl text-xs font-semibold hover:bg-andy-gold/80 transition-all">
            Verify
          </button>
        </div>
        {verifyResult && (
          <div className={`mt-3 p-3 rounded-xl text-sm ${verifyResult.found ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-red-50 border border-red-200 text-red-600'}`}>
            {verifyResult.found ? (
              <div className="flex items-center gap-2">
                <CheckCircle size={14} />
                <span>Verified: <strong>{verifyResult.cert.artworkTitle}</strong> by {verifyResult.cert.artistName} · Owned by {verifyResult.cert.collectorName}</span>
              </div>
            ) : (
              <span>No certificate found with that code.</span>
            )}
          </div>
        )}
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-andy-bronze" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search certificates..."
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-andy-stone/20 text-sm focus:outline-none focus:ring-2 focus:ring-andy-gold/40"
        />
      </div>

      {/* Certificates */}
      <div className="space-y-4">
        {filtered.map((cert) => (
          <div key={cert.id} className="bg-white rounded-2xl border border-andy-stone/20 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-andy-gold/10 rounded-xl flex items-center justify-center">
                  <Award size={18} className="text-andy-gold" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-andy-black">{cert.artworkTitle}</p>
                  <p className="text-xs text-andy-bronze">{cert.artistName} · {cert.yearCreated}</p>
                </div>
              </div>
              <span className="text-xs text-andy-gold font-medium">Verified</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs mb-4">
              <div className="bg-andy-stone/5 rounded-lg p-3">
                <p className="text-andy-bronze mb-1">Certificate ID</p>
                <p className="font-mono text-andy-black">{cert.certificateId}</p>
              </div>
              <div className="bg-andy-stone/5 rounded-lg p-3">
                <p className="text-andy-bronze mb-1">Verification Code</p>
                <div className="flex items-center gap-2">
                  <p className="font-mono text-andy-black">{cert.verificationCode}</p>
                  <button onClick={() => handleCopy(cert.verificationCode)} className="text-andy-bronze hover:text-andy-gold">
                    <Copy size={12} />
                  </button>
                </div>
              </div>
              <div className="bg-andy-stone/5 rounded-lg p-3">
                <p className="text-andy-bronze mb-1">Medium</p>
                <p className="text-andy-black">{cert.medium}</p>
              </div>
              <div className="bg-andy-stone/5 rounded-lg p-3">
                <p className="text-andy-bronze mb-1">Dimensions</p>
                <p className="text-andy-black">{cert.dimensions || 'N/A'}</p>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-andy-bronze border-t border-andy-stone/10 pt-3">
              <span>Issued {new Date(cert.issuedDate).toLocaleDateString()} by {cert.issuedBy}</span>
              <button className="flex items-center gap-1 text-andy-gold hover:underline">
                <Download size={12} /> Download PDF
              </button>
            </div>

            {cert.blockchainRef && (
              <div className="mt-2 text-[10px] text-andy-bronze/50 font-mono">Blockchain: {cert.blockchainRef}</div>
            )}
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-sm text-andy-bronze/40">No certificates found</div>
        )}
      </div>
    </div>
  );
}