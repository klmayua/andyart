# AndyArt Gallery Platform

> Your digital gallery. Your art business. Elevated.

A production-ready Next.js web platform for a solopreneur art gallery. Built with the Stitch design system, featuring mobile-first design, bottom navigation, floating footer, chatbot, events, services, and partnerships.

## 🎨 Design System

This project uses the **Stitch design system** with the following tokens:

### Colors
- **Background**: `#F9F8F6`
- **Surface**: `#FFFFFF`
- **Accent**: `#E6DCC3`
- **Primary CTA**: `#2B1B2E`
- **Text Primary**: `#1E1E1E`
- **Text Secondary**: `#5A5A5A`
- **Success Gold**: `#C5A572`
- **Border Light**: `#EDE8E0`
- **Error**: `#B00020`

### Typography
- **Serif**: Playfair Display, Georgia, serif
- **Sans**: Inter, system-ui, sans-serif

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL database

### Installation

1. **Install dependencies**

```bash
npm install
```

2. **Set up environment variables**

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Required environment variables:
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_URL` - Your app URL (http://localhost:3000 for dev)
- `NEXTAUTH_SECRET` - Generate with `openssl rand -base64 32`
- `STRIPE_SECRET_KEY` - Stripe secret key
- `STRIPE_PUBLISHABLE_KEY` - Stripe publishable key

3. **Set up the database**

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed the database with sample data
npm run db:seed
```

4. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
andyart/
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Seed data script
├── src/
│   ├── app/
│   │   ├── api/           # API routes
│   │   ├── gallery/       # Gallery pages
│   │   ├── events/        # Events pages
│   │   ├── services/      # Services pages
│   │   ├── partners/      # Partnership pages
│   │   ├── profile/       # User profile pages
│   │   ├── legal/         # Legal pages (terms, privacy)
│   │   ├── globals.css    # Global styles
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Homepage
│   ├── components/
│   │   ├── BottomNav.tsx        # Mobile bottom navigation
│   │   ├── FloatingFooter.tsx   # Floating footer menu
│   │   ├── Chatbot.tsx          # Chatbot component
│   │   ├── ArtworkCard.tsx      # Artwork card component
│   │   ├── EventCard.tsx        # Event card component
│   │   └── ServiceCard.tsx      # Service card component
│   ├── lib/
│   │   ├── prisma.ts      # Prisma client instance
│   │   ├── stripe.ts      # Stripe utilities
│   │   └── auth.ts        # NextAuth configuration
│   └── stores/
│       └── useAppStore.ts # Zustand state management
├── .env.example           # Environment variables template
├── next.config.js         # Next.js configuration
├── tailwind.config.js     # Tailwind with Stitch tokens
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies and scripts
```

## 📱 Features

### Core Pages
- **Homepage** (`/`) - Hero section, featured artworks, events, services
- **Gallery** (`/gallery`) - Browse all artworks with filters
- **Artwork Detail** (`/gallery/[slug]`) - Individual artwork page with inquiry form
- **Events** (`/events`) - List of upcoming events
- **Event Detail** (`/events/[slug]`) - Event details with RSVP functionality
- **Services** (`/services`) - List of available services
- **Service Detail** (`/services/[slug]`) - Service details with booking form
- **Partnerships** (`/partners`) - Partnership program information
- **Partner Apply** (`/partners/apply`) - Partnership application form
- **Profile** (`/profile`) - User dashboard with wishlist, bookings, settings
- **Legal** (`/legal/terms`, `/legal/privacy`) - Terms and privacy pages

### Components
- **Bottom Navigation** - Fixed mobile navigation bar (visible on all pages except checkout)
- **Floating Footer** - Collapsible info menu with links
- **Chatbot** - AI-powered gallery assistant with quick replies
- **Artwork Card** - Responsive card with wishlist functionality
- **Event Card** - Event preview with RSVP button
- **Service Card** - Service preview with booking button

### API Endpoints
- `POST /api/chatbot` - Chatbot message handling
- `POST /api/events/rsvp` - Event RSVP submission
- `POST /api/services/book` - Service booking submission
- `POST /api/partners/apply` - Partnership application
- `GET /api/artworks` - Get paginated artworks
- `POST /api/checkout/session` - Create Stripe checkout session

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + Stitch design tokens
- **State Management**: Zustand
- **Database**: PostgreSQL + Prisma ORM
- **Authentication**: NextAuth.js (email + Google)
- **Payments**: Stripe
- **Hosting**: Vercel (recommended)

## 📦 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to database
npm run db:seed      # Seed database with sample data
npm run db:studio    # Open Prisma Studio
```

## 🎨 Mobile-First Design

The platform is designed mobile-first with the following breakpoints:
- **Mobile**: 0-767px
- **Tablet**: 768px-1023px
- **Desktop**: 1024px+

Key mobile features:
- Fixed bottom navigation bar (70px height)
- Floating footer menu (bottom-20 right-4)
- Chatbot trigger (bottom-24 right-4)
- Touch-friendly tap targets (min 44x44px)
- Optimized image loading with Next.js Image

## 🔐 Authentication

Authentication is handled by NextAuth.js with support for:
- Email/password authentication
- Google OAuth
- Session management with JWT

Protected routes will redirect to `/auth/signin` if not authenticated.

## 💳 Payments

Stripe integration for artwork purchases:
- Secure checkout sessions
- Webhook support for payment confirmation
- Order tracking in user profile

## 🤖 Chatbot

The chatbot component features:
- Floating trigger button
- Modal chat interface
- Quick reply buttons
- Session persistence with Zustand
- Webhook integration ready (ManyChat/GPT API)

## 📊 Database Models

- **Artwork** - Art pieces with artist, pricing, images
- **Artist** - Artist profiles with bio and social links
- **Event** - Events with RSVP functionality
- **EventRsvp** - Event registrations
- **Service** - Available services
- **ServiceBooking** - Service appointments
- **PartnerApplication** - Partnership requests
- **User** - User accounts with wishlist and bookings

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Environment Variables for Production

Ensure all environment variables are set in your hosting platform:
- `DATABASE_URL` - Production PostgreSQL URL
- `NEXTAUTH_URL` - Your production domain
- `NEXTAUTH_SECRET` - Secure random string
- `STRIPE_SECRET_KEY` - Production Stripe key
- `STRIPE_PUBLISHABLE_KEY` - Production Stripe key

## 📝 License

This project is proprietary software. All rights reserved.

## 📞 Contact

- **Email**: hello@andyart.gallery
- **Instagram**: @andyart
- **LinkedIn**: /company/andyart

---

Built with ❤️ using Next.js and the Stitch design system.
