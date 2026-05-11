'use client';

import NewsletterCaptureClient from './NewsletterCaptureClient';

interface Props {
  articleTitle?: string;
}

export default function JournalArticleNewsletter({ articleTitle }: Props) {
  return (
    <section className="px-4 pb-24">
      <div className="max-w-[720px] mx-auto text-center">
        <div
          className="rounded-2xl p-10 md:p-14"
          style={{
            background: 'rgba(255,255,255,.60)',
            border: '1px solid rgba(198,166,107,.16)',
            backdropFilter: 'blur(18px)',
          }}
        >
          <h3 className="font-serif font-semibold text-[#171410] text-2xl mb-3">
            Stay in the conversation
          </h3>
          <p className="text-[#7A6E60] mb-6" style={{ maxWidth: '480px', margin: '0 auto 24px' }}>
            New stories, collector guides, and artist profiles delivered to your inbox.
          </p>
          <NewsletterCaptureClient source="journal" title={articleTitle} />
        </div>
      </div>
    </section>
  );
}