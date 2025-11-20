/*
  # Nautic Service Database Schema

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `name` (text) - Product name
      - `description` (text) - Product description
      - `price` (numeric) - Product price
      - `image_url` (text) - Product image URL
      - `category` (text) - Product category
      - `in_stock` (boolean) - Availability status
      - `created_at` (timestamptz) - Creation timestamp
    
    - `rentals`
      - `id` (uuid, primary key)
      - `name` (text) - Rental item name
      - `description` (text) - Item description
      - `price_per_day` (numeric) - Daily rental price
      - `image_url` (text) - Item image URL
      - `available` (boolean) - Availability status
      - `created_at` (timestamptz)
    
    - `used_boats`
      - `id` (uuid, primary key)
      - `name` (text) - Boat name/model
      - `description` (text) - Boat description
      - `price` (numeric) - Selling price
      - `year` (integer) - Year of manufacture
      - `length` (numeric) - Boat length in meters
      - `image_url` (text) - Boat image URL
      - `sold` (boolean) - Sold status
      - `created_at` (timestamptz)
    
    - `services`
      - `id` (uuid, primary key)
      - `name` (text) - Service name
      - `description` (text) - Service description
      - `price` (numeric) - Service price (nullable for custom quotes)
      - `image_url` (text) - Service image URL
      - `created_at` (timestamptz)
    
    - `accessories`
      - `id` (uuid, primary key)
      - `name` (text) - Accessory name
      - `description` (text) - Accessory description
      - `price` (numeric) - Accessory price
      - `image_url` (text) - Accessory image URL
      - `in_stock` (boolean) - Stock status
      - `created_at` (timestamptz)
    
    - `news`
      - `id` (uuid, primary key)
      - `title` (text) - News article title
      - `content` (text) - Article content
      - `excerpt` (text) - Short excerpt
      - `image_url` (text) - Article image URL
      - `published_at` (timestamptz) - Publication date
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access (appropriate for an ecommerce site)
    - Write operations can be restricted to authenticated admin users in future

  3. Notes
    - All tables use UUID primary keys
    - Timestamps are automatically set
    - Images are stored as URLs (can be Supabase Storage URLs)
    - Prices are stored as numeric for precision
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price numeric NOT NULL,
  image_url text NOT NULL,
  category text NOT NULL,
  in_stock boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS rentals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price_per_day numeric NOT NULL,
  image_url text NOT NULL,
  available boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS used_boats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price numeric NOT NULL,
  year integer NOT NULL,
  length numeric NOT NULL,
  image_url text NOT NULL,
  sold boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price numeric,
  image_url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS accessories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price numeric NOT NULL,
  image_url text NOT NULL,
  in_stock boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS news (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  excerpt text NOT NULL,
  image_url text NOT NULL,
  published_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE rentals ENABLE ROW LEVEL SECURITY;
ALTER TABLE used_boats ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE accessories ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view products"
  ON products FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Public can view rentals"
  ON rentals FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Public can view used boats"
  ON used_boats FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Public can view services"
  ON services FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Public can view accessories"
  ON accessories FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Public can view news"
  ON news FOR SELECT
  TO anon
  USING (true);