# Supabase Setup Guide for Growzix Natural

To make your admin panel changes live for everyone, you need to set up a Supabase project and create the necessary tables.

## 1. Create a Supabase Project
1. Go to [supabase.com](https://supabase.com/) and create a new project.
2. Once the project is created, go to **Project Settings** > **API**.
3. Copy the `Project URL` and `anon public` key.

## 2. Add Credentials to your Environment
Create a file named `.env.local` in the root of your project (if it doesn't exist) and add:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
```

## 3. Run SQL Schema
Go to the **SQL Editor** in your Supabase dashboard and run the following SQL to create the tables:

```sql
-- Create Products table
CREATE TABLE products (
  "id" TEXT PRIMARY KEY,
  "slug" TEXT UNIQUE,
  "title" TEXT,
  "category" TEXT,
  "description" TEXT,
  "price" DECIMAL,
  "oldPrice" DECIMAL,
  "image" TEXT,
  "images" JSONB,
  "rating" DECIMAL,
  "reviews" INTEGER,
  "stock" INTEGER,
  "badge" TEXT,
  "benefits" JSONB,
  "ingredients" JSONB,
  "usage" TEXT,
  "tierPricing" JSONB,
  "variations" JSONB,
  "customization" JSONB,
  "currency" TEXT DEFAULT 'USD'
);

-- Create Categories table
CREATE TABLE categories (
  "name" TEXT PRIMARY KEY,
  "image" TEXT,
  "count" INTEGER
);

-- Create Orders table
CREATE TABLE orders (
  "id" TEXT PRIMARY KEY,
  "customerEmail" TEXT,
  "customerName" TEXT,
  "phone" TEXT,
  "address" TEXT,
  "city" TEXT,
  "items" JSONB,
  "total" DECIMAL,
  "payment" TEXT,
  "status" TEXT,
  "createdAt" BIGINT
);

-- Create Customers table
CREATE TABLE customers (
  "id" TEXT PRIMARY KEY,
  "name" TEXT,
  "email" TEXT UNIQUE,
  "password" TEXT,
  "createdAt" BIGINT
);

-- Create Offers table
CREATE TABLE offers (
  "id" TEXT PRIMARY KEY,
  "title" TEXT,
  "description" TEXT,
  "discount" TEXT,
  "createdAt" BIGINT,
  "notifiedCount" INTEGER
);

-- Create Settings table
CREATE TABLE settings (
  "id" TEXT PRIMARY KEY DEFAULT 'site_settings',
  "whatsappNumber" TEXT,
  "contactPhone" TEXT,
  "contactEmail" TEXT,
  "contactAddress" TEXT,
  "social" JSONB
);
```

-- Enable Row Level Security (RLS) or Disable it for testing
-- For now, let's allow all access (You should secure this later!)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read" ON products FOR SELECT USING (true);
CREATE POLICY "Allow all for everyone" ON products FOR ALL USING (true);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read" ON categories FOR SELECT USING (true);
CREATE POLICY "Allow all for everyone" ON categories FOR ALL USING (true);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all for everyone" ON orders FOR ALL USING (true);

ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all for everyone" ON customers FOR ALL USING (true);

ALTER TABLE offers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all for everyone" ON offers FOR ALL USING (true);

ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all for everyone" ON settings FOR ALL USING (true);
```

## 4. Final Step
Restart your development server:
```bash
npm run dev
```

Now, when you add a product in the admin panel, it will be saved to Supabase and will be visible to all users on the live website!
