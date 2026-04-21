# Deploy AndyArt to Netlify

## Quick Deploy Steps

### Option 1: Deploy via Netlify CLI (Recommended for development)

1. **Install Netlify CLI** (if not already installed):
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**:
   ```bash
   netlify login
   ```

3. **Initialize and deploy**:
   ```bash
   netlify init
   netlify deploy --prod
   ```

### Option 2: Deploy via GitHub (Recommended for production)

1. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/andyart.git
   git push -u origin main
   ```

2. **Connect to Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub and select your `andyart` repository
   - Netlify will auto-detect Next.js settings

3. **Configure build settings** (if not auto-detected):
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`

4. **Click "Deploy site"**

## Environment Variables

Set these in Netlify dashboard (Site settings → Environment variables):

```
DATABASE_URL=postgresql://user:password@host:5432/andyart
NEXTAUTH_URL=https://your-site-name.netlify.app
NEXTAUTH_SECRET=your-secret-key-here
STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key
STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-publishable-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### Generate NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```

## Database Setup

### Option 1: Use a managed PostgreSQL service
- **Neon** (neon.tech) - Free tier available
- **Supabase** (supabase.com) - Free tier available
- **Railway** (railway.app) - Free tier available

### Option 2: For demo/testing without database
The app will work with mock data on the frontend. API routes will gracefully handle database connection errors.

## Post-Deploy Checklist

1. ✅ Verify the site loads at your Netlify URL
2. ✅ Test navigation (Gallery, Events, Services, Profile)
3. ✅ Test chatbot functionality
4. ✅ Test forms (RSVP, booking, partner application)
5. ✅ Set up custom domain (optional) in Netlify dashboard

## Custom Domain (Optional)

1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Follow DNS configuration instructions
4. Enable HTTPS (automatic with Netlify)

## Useful Netlify Commands

```bash
# Local development with Netlify environment
netlify dev

# Deploy preview (for pull requests)
netlify deploy

# Deploy to production
netlify deploy --prod

# Open site in browser
netlify open

# View deploy logs
netlify deploy --build
```

## Troubleshooting

### Build fails
- Check build logs in Netlify dashboard
- Ensure all dependencies are in package.json
- Run `npm run build` locally to test

### API routes not working
- Ensure database connection string is set
- Check environment variables are configured
- Review function logs in Netlify dashboard

### Images not loading
- External images must be in next.config.js remotePatterns
- Consider using Cloudinary or similar for production

---

**Need help?** Check [Netlify Next.js documentation](https://docs.netlify.com/frameworks/next-js/overview/)
