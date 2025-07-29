-- Insert sample products
INSERT INTO products (name, price, original_price, discount, image_url, rating, reviews, category, brand, colors, sizes, stock_quantity) VALUES
('Cargo Pants with Patches', 89.99, 119.99, 25, '/placeholder.svg?height=300&width=300', 4.5, 128, 'pants', 'StreetWear Co', ARRAY['Black', 'Khaki', 'Navy'], ARRAY['S', 'M', 'L', 'XL'], 50),
('Graphic Hoodie', 79.99, 99.99, 20, '/placeholder.svg?height=300&width=300', 4.8, 89, 'hoodies', 'Urban Style', ARRAY['Navy', 'Black', 'Gray'], ARRAY['S', 'M', 'L', 'XL', 'XXL'], 75),
('Essential T-Shirt Pack', 49.99, 69.99, 30, '/placeholder.svg?height=300&width=300', 4.6, 156, 't-shirts', 'Basic Tees', ARRAY['White', 'Black', 'Gray', 'Navy'], ARRAY['S', 'M', 'L', 'XL'], 100),
('Premium T-Shirt Collection', 59.99, 79.99, 25, '/placeholder.svg?height=300&width=300', 4.7, 203, 't-shirts', 'Premium Co', ARRAY['White', 'Black'], ARRAY['S', 'M', 'L', 'XL'], 60),
('Denim Jacket', 129.99, 159.99, 19, '/placeholder.svg?height=300&width=300', 4.4, 67, 'jackets', 'Denim Works', ARRAY['Blue', 'Black', 'Light Blue'], ARRAY['S', 'M', 'L', 'XL'], 30),
('Sneakers Classic', 149.99, 199.99, 25, '/placeholder.svg?height=300&width=300', 4.9, 342, 'shoes', 'Sneaker Pro', ARRAY['White', 'Black', 'Red'], ARRAY['7', '8', '9', '10', '11', '12'], 40),
('Oversized Hoodie', 94.99, 124.99, 24, '/placeholder.svg?height=300&width=300', 4.3, 91, 'hoodies', 'Comfort Zone', ARRAY['Gray', 'Black', 'Cream'], ARRAY['S', 'M', 'L', 'XL', 'XXL'], 45),
('Distressed Jeans', 109.99, 139.99, 21, '/placeholder.svg?height=300&width=300', 4.6, 178, 'pants', 'Denim Co', ARRAY['Blue', 'Black', 'Light Wash'], ARRAY['28', '30', '32', '34', '36'], 35);
