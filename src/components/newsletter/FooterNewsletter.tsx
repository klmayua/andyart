'use client';

import NewsletterCaptureClient from './NewsletterCaptureClient';

export default function FooterNewsletter() {
  return (
    <div>
      <NewsletterCaptureClient source="footer" title="Footer" compact />
    </div>
  );
}