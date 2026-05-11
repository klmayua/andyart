'use client';

import NewsletterCapture from './NewsletterCapture';

interface Props {
  source?: string;
  title?: string;
}

export default function NewsletterCaptureClient({ source, title }: Props) {
  return <NewsletterCapture source={source} title={title} />;
}