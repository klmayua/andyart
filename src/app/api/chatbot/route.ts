import { NextRequest, NextResponse } from 'next/server';

const chatbotResponses: Record<string, { reply: string; suggestedActions?: string[] }> = {
  show_art_categories: {
    reply: "We curate paintings, sculptures, digital art, and mixed media from exceptional African artists. Browse our collection at /gallery or I can connect you with a specialist.",
    suggestedActions: ['show_upcoming_events', 'open_calendar'],
  },
  show_upcoming_events: {
    reply: "Our upcoming experiences include Collector Salons, Artist Conversations, and Private Dinners. Visit /events to see availability.",
    suggestedActions: ['show_partnership_form', 'open_calendar'],
  },
  show_partnership_form: {
    reply: "We partner with interior designers, corporations, and venues. Please visit /partners/apply to submit your application.",
    suggestedActions: ['show_art_categories', 'open_calendar'],
  },
  open_calendar: {
    reply: "Private viewings are available by appointment. Visit /consult to reserve your exclusive session.",
    suggestedActions: ['show_art_categories', 'show_human_contact_form'],
  },
  show_human_contact_form: {
    reply: "Our concierge team is available Monday–Saturday, 10am–6pm. Reach us at hello@andyart.gallery or request a callback.",
    suggestedActions: ['show_art_categories', 'show_upcoming_events'],
  },
  show_commission_form: {
    reply: "Bespoke commissions are one of our specialties. Visit /consult to schedule a consultation with our curation team.",
    suggestedActions: ['show_art_categories', 'open_calendar'],
  },
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, message, action } = body;

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const responseSessionId = sessionId || `session_${Date.now()}`;

    let response;
    if (action && chatbotResponses[action]) {
      response = chatbotResponses[action];
    } else {
      response = {
        reply: "Thank you for your message. How can I help you today? You can ask about collecting art, booking experiences, or our concierge services.",
        suggestedActions: ['show_art_categories', 'show_upcoming_events', 'show_partnership_form', 'open_calendar'],
      };
    }

    return NextResponse.json({
      sessionId: responseSessionId,
      reply: response.reply,
      suggestedActions: response.suggestedActions,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Chatbot API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
