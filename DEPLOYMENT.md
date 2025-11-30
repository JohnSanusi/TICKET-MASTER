# Deployment Guide: Using Supabase

## 1. Create Supabase Database

1. Go to [supabase.com](https://supabase.com) and sign up.
2. Click **"New Project"**.
3. Enter a Name (e.g., `ticketmaster`) and a strong Database Password.
4. Choose a Region close to you.
5. Click **"Create new project"**.

## 2. Get Connection String

1. Once the project is created, go to **Project Settings** (cog icon) -> **Database**.
2. Under **Connection parameters**, find the **Connection String** section.
3. Click on the **"URI"** tab.
4. **IMPORTANT**: Copy the **"Transaction"** connection string (Mode: Transaction). It looks like this:
   ```
   postgres://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres
   ```
   *Note: If you don't see a pooler URL, the direct connection string (port 5432) will also work, but the pooler (port 6543) is better for Vercel.*

5. Replace `[password]` with the password you created in step 1.

## 3. Configure Storage (Required for Images)

1. Go to your Supabase project dashboard -> **Storage**.
2. Click **"New Bucket"**.
3. Name it `events`.
4. Make it **Public**.
5. Click **"Save"**.

### Local Setup
Update your `.env` file:
```bash
DATABASE_URL="your-supabase-connection-string"
```

Then push your schema:
```bash
npm run db:push
```

### Vercel Setup
1. Go to your Vercel Project Settings -> **Environment Variables**.
2. Add/Update `DATABASE_URL` with your Supabase connection string.
3. Redeploy your project.

## 5. Verify Build Command
Ensure your Vercel **Build Command** (in Settings -> General) is:
```bash
npm run build
```
(You should run `npm run db:push` locally to update the database schema).
