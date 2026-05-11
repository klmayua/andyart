'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Lock, Shield, CreditCard, Banknote, Smartphone, Bitcoin, CheckCircle } from 'lucide-react';

const METHODS = [
  { id: 'card', label: 'Credit Card', icon: CreditCard, desc: 'Visa, Mastercard, Amex' },
  { id: 'bank_transfer', label: 'Bank Transfer', icon: Banknote, desc: 'Wire / SWIFT / SEPA' },
  { id: 'flutterwave', label: 'Flutterwave', icon: Smartphone, desc: 'Mobile money, cards, bank' },
  { id: 'paystack', label: 'Paystack', icon: Smartphone, desc: 'Cards, bank, mobile money' },
  { id: 'stripe', label: 'Stripe', icon: CreditCard, desc: 'Secure card processing' },
  { id: 'crypto', label: 'Crypto', icon: Bitcoin, desc: 'USDC, ETH, BTC' },
];

export default function CheckoutPage() {
  const params = useSearchParams();
  const type = params.get('type') || 'artwork_purchase';
  const amount = Number(params.get('amount') || '0');
  const currency = params.get('currency') || 'USD';
  const title = params.get('title') || 'Artwork Purchase';
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [processing, setProcessing] = useState(false);
  const [complete, setComplete] = useState(false);

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => { setProcessing(false); setComplete(true); }, 2000);
  };

  if (complete) {
    return (
      <div className="min-h-screen bg-[#F7F2E8] flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={32} className="text-green-600" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-andy-black mb-2">Payment Confirmed</h1>
          <p className="text-sm text-andy-bronze mb-6">Your transaction has been processed successfully. A receipt has been sent to your email.</p>
          <div className="bg-white rounded-2xl border border-andy-stone/20 p-5 mb-6">
            <div className="flex justify-between text-sm mb-2"><span className="text-andy-bronze">Amount</span><span className="font-bold text-andy-black">${amount.toLocaleString()} {currency}</span></div>
            <div className="flex justify-between text-sm mb-2"><span className="text-andy-bronze">Description</span><span className="text-andy-black">{title}</span></div>
            <div className="flex justify-between text-sm"><span className="text-andy-bronze">Method</span><span className="text-andy-black capitalize">{selectedMethod.replace('_', ' ')}</span></div>
          </div>
          <a href="/collector/payments" className="inline-block px-6 py-3 bg-andy-gold text-andy-black rounded-xl text-sm font-semibold hover:bg-andy-gold/80 transition-all">
            View My Payments
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F2E8] py-12 px-4">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-andy-gold rounded-xl flex items-center justify-center mx-auto mb-4">
            <Lock size={20} className="text-andy-black" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-andy-black">Secure Checkout</h1>
          <p className="text-sm text-andy-bronze mt-1">AndyArt · Premium Art Transactions</p>
        </div>

        <div className="bg-white rounded-2xl border border-andy-stone/20 p-6 mb-4">
          <h3 className="text-sm font-semibold text-andy-black mb-3">Order Summary</h3>
          <div className="flex justify-between text-sm mb-2"><span className="text-andy-bronze">{title}</span><span className="text-andy-black">${amount.toLocaleString()} {currency}</span></div>
          <div className="flex justify-between text-sm mb-2"><span className="text-andy-bronze">Platform fee (2.5%)</span><span className="text-andy-black">${Math.round(amount * 0.025).toLocaleString()} {currency}</span></div>
          <div className="border-t border-andy-stone/10 pt-2 flex justify-between text-sm font-bold"><span className="text-andy-black">Total</span><span className="text-andy-black">${Math.round(amount * 1.025).toLocaleString()} {currency}</span></div>
        </div>

        <div className="bg-white rounded-2xl border border-andy-stone/20 p-6 mb-4">
          <h3 className="text-sm font-semibold text-andy-black mb-3">Payment Method</h3>
          <div className="space-y-2">
            {METHODS.map((m) => (
              <button key={m.id} onClick={() => setSelectedMethod(m.id)} className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${selectedMethod === m.id ? 'border-andy-gold bg-andy-gold/5' : 'border-andy-stone/10 hover:border-andy-gold/30'}`}>
                <m.icon size={18} className={selectedMethod === m.id ? 'text-andy-gold' : 'text-andy-bronze'} />
                <div>
                  <p className="text-sm font-medium text-andy-black">{m.label}</p>
                  <p className="text-xs text-andy-bronze/60">{m.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-[#171614] rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Shield size={14} className="text-andy-gold" />
            <span className="text-xs text-andy-ivory/60">256-bit SSL encryption · PCI DSS compliant</span>
          </div>
          <button onClick={handlePay} disabled={processing} className="w-full bg-andy-gold text-andy-black py-3.5 rounded-xl font-semibold text-sm hover:bg-andy-gold/80 transition-all disabled:opacity-60 flex items-center justify-center gap-2">
            {processing ? <span className="w-4 h-4 border-2 border-andy-black/30 border-t-andy-black rounded-full animate-spin" /> : null}
            {processing ? 'Processing...' : `Pay ${Math.round(amount * 1.025).toLocaleString()} ${currency}`}
          </button>
          <p className="text-center text-xs text-andy-ivory/30 mt-3">No real payments processed. Demo mode.</p>
        </div>
      </div>
    </div>
  );
}