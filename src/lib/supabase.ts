import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  in_stock: boolean;
  created_at: string;
  shopify_product_id?: string | number; // ID prodotto Shopify per Buy Button
};

export type Rental = {
  id: string;
  name: string;
  description: string;
  price_per_day: number;
  image_url: string;
  available: boolean;
  created_at: string;
};

export type UsedBoat = {
  id: string;
  name: string;
  description: string;
  price: number;
  year: number;
  length: number;
  image_url: string;
  sold: boolean;
  created_at: string;
};

export type Service = {
  id: string;
  name: string;
  description: string;
  price: number | null;
  image_url: string;
  created_at: string;
};

export type Accessory = {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  in_stock: boolean;
  created_at: string;
  shopify_product_id?: string | number; // ID prodotto Shopify per Buy Button
};

export type NewsArticle = {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  image_url: string;
  published_at: string;
  created_at: string;
};
