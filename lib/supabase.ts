import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Product {
  id: number
  name: string
  price: number
  original_price: number
  discount: number
  image_url: string
  rating: number
  reviews: number
  category: string
  brand: string
  colors: string[]
  sizes: string[]
  created_at: string
  updated_at: string
}

export interface CartItem {
  id: number
  user_id: string
  product_id: number
  quantity: number
  size: string
  color: string
  created_at: string
}

export interface Order {
  id: number
  user_id: string
  total_amount: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  shipping_address: any
  billing_address: any
  payment_method: string
  created_at: string
  updated_at: string
}
