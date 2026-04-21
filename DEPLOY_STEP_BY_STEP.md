# 🚀 Deploy AndyArt to Netlify + Neon Database

## Complete Step-by-Step Guide

### Step 1: Push to GitHub

1. **Initialize Git** (if not already done):
   ```bash
   cd "C:\Users\Dedan Odero\OneDrive\Desktop\KLM2026\AndyArt"
   git init
   git add .
   git commit -m "Initial commit: AndyArt gallery platform"
   ```

2. **Create GitHub Repository**:
   - Go to https://github.com/new
   - Repository name: `andyart` (or your choice)
   - Keep it **Public** or **Private**
   - Click "Create repository"

3. **Push to GitHub**:
   ```bash
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/andyart.git
   git push -u origin main
   ```

---

### Step 2: Create Neon Database (Free)

1. **Go to Neon**: https://console.neon.tech
2. **Sign up** with GitHub (recommended) or email
3. **Create a new project**:
   - Project name: `andyart`
   - Region: Choose closest to your users
   - Click "Create project"

4. **Get Connection String**:
   - Copy the **Connection string** (looks like `postgresql://user:password@ep-xxx...`)
   - You'll need this for Netlify environment variables

5. **Run Database Migrations**:
   - Open connection string in **Connection Details**
   - Copy both:
     - **Connection string** → for `DATABASE_URL`
     - **Direct connection** → for `DIRECT_URL`

---

### Step 3: Deploy to Netlify

1. **Go to Netlify**: https://app.netlify.com
2. **Sign up** with GitHub (recommended)

3. **Add New Site**:
   - Click "Add new site" → "Import an existing project"
   - Click **GitHub**
   - Authorize Netlify (if prompted)
   - Select your `andyart` repository

4. **Configure Build**:
   - **Base directory**: (leave empty)
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`

5. **Click "Deploy site"**

---

### Step 4: Set Environment Variables

In Netlify dashboard:

1. Go to **Site settings** → **Environment variables**
2. Click **Add a variable**
3. Add these variables:

| Key | Value |
|-----|-------|
| `DATABASE_URL` | `postgresql://user:password@ep-xxx.region.aws.neon.tech/andyart?sslmode=require` |
| `DIRECT_URL` | Same as DATABASE_URL (for Neon) |
| `NEXTAUTH_URL` | `https://your-site-name.netlify.app` (update after deploy) |
| `NEXTAUTH_SECRET` | Generate with `openssl rand -base64 32` |

**Optional** (for full features):
| Key | Value |
|-----|-------|
| `STRIPE_SECRET_KEY` | `sk_test_...` from Stripe Dashboard |
| `STRIPE_PUBLISHABLE_KEY` | `pk_test_...` from Stripe Dashboard |
| `GOOGLE_CLIENT_ID` | From Google Cloud Console |
| `GOOGLE_CLIENT_SECRET` | From Google Cloud Console |

4. **Redeploy** after adding variables:
   - Go to **Deploys** tab
   - Click "Trigger deploy" → "Clear cache and deploy site"

---

### Step 5: Set Up Database Schema

After first deploy succeeds:

1. **Install Netlify CLI** (optional, for running migrations):
   ```bash
   npm install -g netlify-cli
   ```

2. **Run Prisma migrations**:
   
   **Option A: Run locally with production DB**
   ```bash
   # Create .env file with production DATABASE_URL
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```

   **Option B: Use Netlify Functions** (advanced)
   - Create a migration function
   - Trigger it once after deploy

---

### Step 6: Verify Deployment

1. **Visit your site**: `https://your-site-name.netlify.app`
2. **Test pages**:
   - Homepage `/`
   - Gallery `/gallery`
   - Events `/events`
   - Services `/services`
   - Profile `/profile`

3. **Test features**:
   - Chatbot (bottom-right)
   - Bottom navigation
   - Floating footer menu
   - Event RSVP form
   - Service booking form
   - Partner application form

---

## Troubleshooting

### Build Fails
- Check **Deploy logs** in Netlify
- Run `npm run build` locally to test
- Ensure all dependencies are in package.json

### Database Connection Error
- Verify `DATABASE_URL` and `DIRECT_URL` are correct
- Ensure SSL mode is included: `?sslmode=require`
- Check Neon dashboard for connection limits

### API Routes Return 500
- Check **Functions logs** in Netlify dashboard
- Verify environment variables are set
- Ensure database schema is pushed

### Images Not Loading
- External images must be allowed in `next.config.js`
- Consider using Cloudinary for production images

---

## Custom Domain (Optional)

1. In Netlify: **Site settings** → **Domain management**
2. Click **Add custom domain**
3. Enter your domain (e.g., `andyart.gallery`)
4. Update DNS records as instructed
5. Enable HTTPS (automatic)

---

## Quick Commands Reference

```bash
# Generate secret key
openssl rand -base64 32

# Test build locally
npm run build

# Netlify CLI
netlify login
netlify dev          # Local dev with Netlify env
netlify deploy       # Deploy preview
netlify deploy --prod # Deploy to production

# Prisma
npx prisma generate
npx prisma db push
npx prisma db seed
npx prisma studio
```

---

## Cost Summary (All Free!)

| Service | Plan | Cost |
|---------|------|------|
| GitHub | Free | $0 |
| Netlify | Free | $0 (100GB bandwidth/month) |
| Neon | Free | $0 (0.5 GB storage) |

**Total: $0/month** 🎉

---

## Next Steps After Deployment

1. Set up Google Analytics
2. Configure custom domain
3. Set up Stripe for payments
4. Enable Google OAuth
5. Set up email notifications
6. Add Cloudinary for image optimization

---

**Need Help?**
- [Netlify Docs](https://docs.netlify.com)
- [Neon Docs](https://neon.tech/docs)
- [Next.js on Netlify](https://docs.netlify.com/frameworks/next-js/overview/)
