import { NextRequest, NextResponse } from 'next/server';

// Mock chatbot responses - replace with actual GPT/ManyChat integration
const chatbotResponses: Record<string, { reply: string; suggestedActions?: string[] }> = {
  show_art_categories: {
    reply: "Great! We offer paintings, sculptures, digital art, and mixed media. What style are you interested in? You can browse our full gallery at /gallery",
    suggestedActions: ['show_upcoming_events', 'open_calendar'],
  },
  show_upcoming_events: {
    reply: "We have exciting paint & sip events coming up! Check out our Events page to see dates and RSVP. Would you like me to share the link?",
    suggestedActions: ['show_partnership_form', 'open_calendar'],
  },
  show_partnership_form: {
    reply: "Wonderful! We partner with interior designers, corporations, and venues. Please visit /partners/apply to submit your application.",
    suggestedActions: ['show_art_categories', 'open_calendar'],
  },
  open_calendar: {
    reply: "Perfect! You can book a consultation directly through our calendar. Visit /consult to see available times.",
    suggestedActions: ['show_art_categories', 'show_human_contact_form'],
  },
  show_human_contact_form: {
    reply: "Of course! You can reach us at hello@andyart.gallery or call us directly. Would you like to leave a message?",
    suggestedActions: ['show_art_categories', 'show_upcoming_events'],
  },
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, message, action } = body;

    // Validate request
    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Generate session ID if not provided
    const responseSessionId = sessionId || `session_${Date.now()}`;

    // Get response based on action or message content
    let response;
    if (action && chatbotResponses[action]) {
      response = chatbotResponses[action];
    } else {
      // Default response for unrecognized messages
      response = {
        reply: "Thank you for your message. How can I help you today? You can ask about buying art, booking services, or partnering with us.",
        suggestedActions: ['show_art_categories', 'show_upcoming_events', 'show_partnership_form', 'open_calendar'],
      };
    }

    // In production, you would:
    // 1. Store the conversation in a database
    // 2. Send to GPT API or ManyChat for intelligent responses
    // 3. Log the interaction for analytics

    return NextResponse.json({
      sessionId: responseSessionId,
      reply: response.reply,
      suggestedActions: response.suggestedActions,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Chatbot API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
