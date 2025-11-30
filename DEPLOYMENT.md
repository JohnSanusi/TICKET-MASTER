# Deployment Guide: MongoDB Atlas

MongoDB Atlas is a fully managed cloud database that works perfectly with Vercel and other hosting platforms.

## 1. Create MongoDB Atlas Account

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Click **"Try Free"** and sign up
3. Choose the **FREE** tier (M0 Sandbox)

## 2. Create a Database

1. Click **"Build a Database"**
2. Choose **M0 FREE** tier
3. Select a cloud provider and region (choose one close to you)
4. Click **"Create Cluster"**

## 3. Configure Database Access

1. Go to **Database Access** (left sidebar)
2. Click **"Add New Database User"**
3. Choose **Password** authentication
4. Create a username and strong password (save these!)
5. Set privileges to **"Read and write to any database"**
6. Click **"Add User"**

## 4. Configure Network Access

1. Go to **Network Access** (left sidebar)
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (for development)
   - IP: `0.0.0.0/0`
4. Click **"Confirm"**

## 5. Get Connection String

1. Go to **Database** → Click **"Connect"**
2. Choose **"Connect your application"**
3. Copy the connection string (looks like):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
4. Replace `<username>` and `<password>` with your actual credentials
5. Add your database name before the `?`:
   ```
   mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net/ticketmaster?retryWrites=true&w=majority
   ```

## 6. Configure Environment Variables

### Local Setup (.env)
```bash
DATABASE_URL="mongodb+srv://sanusijohn0_db_user:<db_password>@cluster0.gtpccca.mongodb.net/ticketmaster?retryWrites=true&w=majority&appName=Cluster0"
```
*Replace `<db_password>` with your actual database password.*

**Note**: Images are stored as base64 data URLs directly in MongoDB, so no external storage is needed.

### Vercel Setup
1. Go to Vercel Project Settings → **Environment Variables**
2. Add `DATABASE_URL` with your MongoDB connection string

## 7. Deploy to Vercel

Your Vercel **Build Command** should be:
```bash
npm run build
```

That's it! MongoDB Atlas works automatically with Vercel.

## MongoDB Atlas Benefits
- ✅ Works on Vercel (serverless-friendly)
- ✅ Generous free tier (512 MB storage)
- ✅ No cold starts
- ✅ Automatic backups
- ✅ Easy to scale
- ✅ No schema migrations needed
