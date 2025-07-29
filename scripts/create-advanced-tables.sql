-- Create advanced tables for enhanced features

-- Create 360° product images table
CREATE TABLE IF NOT EXISTS product_360_images (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  frame_number INTEGER NOT NULL,
  image_url TEXT NOT NULL,
  angle DECIMAL(5,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create product videos table
CREATE TABLE IF NOT EXISTS product_videos (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  title VARCHAR(255) NOT NULL,
  duration VARCHAR(10),
  video_type VARCHAR(50) DEFAULT 'overview',
  quality VARCHAR(10) DEFAULT '1080p',
  file_size BIGINT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create AR models table
CREATE TABLE IF NOT EXISTS product_ar_models (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  model_url TEXT NOT NULL,
  model_format VARCHAR(10) DEFAULT 'glb',
  file_size BIGINT,
  scale_x DECIMAL(5,2) DEFAULT 1.0,
  scale_y DECIMAL(5,2) DEFAULT 1.0,
  scale_z DECIMAL(5,2) DEFAULT 1.0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create product comparisons table
CREATE TABLE IF NOT EXISTS product_comparisons (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  product_ids INTEGER[] NOT NULL,
  comparison_name VARCHAR(255),
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create social shares table
CREATE TABLE IF NOT EXISTS product_social_shares (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  platform VARCHAR(50) NOT NULL,
  share_count INTEGER DEFAULT 0,
  last_shared_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create product interactions table for analytics
CREATE TABLE IF NOT EXISTS product_interactions (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  session_id VARCHAR(255),
  interaction_type VARCHAR(50) NOT NULL,
  interaction_data JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create inventory table for stock management
CREATE TABLE IF NOT EXISTS inventory (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  size VARCHAR(10),
  color VARCHAR(50),
  quantity INTEGER NOT NULL DEFAULT 0,
  reserved_quantity INTEGER DEFAULT 0,
  reorder_level INTEGER DEFAULT 5,
  last_restocked_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(product_id, size, color)
);

-- Create product recommendations table
CREATE TABLE IF NOT EXISTS product_recommendations (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  recommended_product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  recommendation_type VARCHAR(50) DEFAULT 'related',
  score DECIMAL(3,2) DEFAULT 0.0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(product_id, recommended_product_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_product_360_images_product ON product_360_images(product_id);
CREATE INDEX IF NOT EXISTS idx_product_videos_product ON product_videos(product_id);
CREATE INDEX IF NOT EXISTS idx_product_ar_models_product ON product_ar_models(product_id);
CREATE INDEX IF NOT EXISTS idx_product_interactions_product ON product_interactions(product_id);
CREATE INDEX IF NOT EXISTS idx_product_interactions_type ON product_interactions(interaction_type);
CREATE INDEX IF NOT EXISTS idx_inventory_product ON inventory(product_id);
CREATE INDEX IF NOT EXISTS idx_inventory_availability ON inventory(product_id, size, color) WHERE quantity > 0;
CREATE INDEX IF NOT EXISTS idx_product_recommendations_product ON product_recommendations(product_id);
CREATE INDEX IF NOT EXISTS idx_social_shares_product ON product_social_shares(product_id);
