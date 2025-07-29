-- Insert sample 360° images
INSERT INTO product_360_images (product_id, frame_number, image_url, angle) VALUES
(1, 0, '/360/cargo-pants/frame_000.jpg', 0.0),
(1, 1, '/360/cargo-pants/frame_001.jpg', 10.0),
(1, 2, '/360/cargo-pants/frame_002.jpg', 20.0),
(1, 3, '/360/cargo-pants/frame_003.jpg', 30.0),
(1, 4, '/360/cargo-pants/frame_004.jpg', 40.0),
(1, 5, '/360/cargo-pants/frame_005.jpg', 50.0);

-- Insert sample product videos
INSERT INTO product_videos (product_id, video_url, thumbnail_url, title, duration, video_type) VALUES
(1, '/videos/cargo-pants/overview.mp4', '/videos/cargo-pants/overview-thumb.jpg', 'Product Overview', '2:30', 'overview'),
(1, '/videos/cargo-pants/styling.mp4', '/videos/cargo-pants/styling-thumb.jpg', 'Styling Tips', '1:45', 'styling'),
(1, '/videos/cargo-pants/care.mp4', '/videos/cargo-pants/care-thumb.jpg', 'Care Instructions', '1:20', 'care'),
(2, '/videos/hoodie/overview.mp4', '/videos/hoodie/overview-thumb.jpg', 'Hoodie Overview', '2:15', 'overview'),
(2, '/videos/hoodie/fit-guide.mp4', '/videos/hoodie/fit-guide-thumb.jpg', 'Fit Guide', '1:30', 'sizing');

-- Insert sample AR models
INSERT INTO product_ar_models (product_id, model_url, model_format, file_size) VALUES
(1, '/models/cargo-pants.glb', 'glb', 2048576),
(2, '/models/hoodie.glb', 'glb', 1536000),
(3, '/models/tshirt.glb', 'glb', 1024000),
(4, '/models/premium-tshirt.glb', 'glb', 1200000),
(5, '/models/denim-jacket.glb', 'glb', 3072000),
(6, '/models/sneakers.glb', 'glb', 2560000);

-- Insert sample inventory data
INSERT INTO inventory (product_id, size, color, quantity, reorder_level) VALUES
(1, 'S', 'Black', 15, 5),
(1, 'M', 'Black', 25, 5),
(1, 'L', 'Black', 30, 5),
(1, 'XL', 'Black', 20, 5),
(1, 'S', 'Khaki', 12, 5),
(1, 'M', 'Khaki', 22, 5),
(1, 'L', 'Khaki', 28, 5),
(1, 'XL', 'Khaki', 18, 5),
(2, 'S', 'Navy', 20, 5),
(2, 'M', 'Navy', 35, 5),
(2, 'L', 'Navy', 40, 5),
(2, 'XL', 'Navy', 25, 5),
(2, 'XXL', 'Navy', 15, 5);

-- Insert sample product recommendations
INSERT INTO product_recommendations (product_id, recommended_product_id, recommendation_type, score) VALUES
(1, 2, 'related', 0.85),
(1, 5, 'related', 0.75),
(1, 3, 'complementary', 0.90),
(2, 1, 'related', 0.85),
(2, 3, 'complementary', 0.80),
(2, 4, 'similar', 0.70),
(3, 4, 'similar', 0.95),
(3, 2, 'complementary', 0.80),
(4, 3, 'similar', 0.95),
(5, 1, 'related', 0.75),
(6, 1, 'complementary', 0.85);

-- Insert sample social share data
INSERT INTO product_social_shares (product_id, platform, share_count) VALUES
(1, 'facebook', 45),
(1, 'twitter', 32),
(1, 'instagram', 67),
(1, 'pinterest', 23),
(2, 'facebook', 38),
(2, 'twitter', 28),
(2, 'instagram', 52),
(3, 'facebook', 29),
(3, 'twitter', 19),
(3, 'instagram', 41);

-- Insert sample interaction data
INSERT INTO product_interactions (product_id, interaction_type, interaction_data) VALUES
(1, 'view', '{"source": "homepage", "duration": 45}'),
(1, 'zoom', '{"zoom_level": 2.5, "position": "center"}'),
(1, '360_rotate', '{"total_rotation": 720, "duration": 30}'),
(1, 'video_play', '{"video_id": "overview", "watch_time": 150}'),
(1, 'ar_try_on', '{"session_duration": 120, "photos_taken": 2}'),
(1, 'share', '{"platform": "instagram", "method": "copy_link"}'),
(2, 'view', '{"source": "search", "duration": 32}'),
(2, 'video_play', '{"video_id": "overview", "watch_time": 95}'),
(3, 'view', '{"source": "recommendation", "duration": 28}'),
(3, 'compare', '{"compared_with": [1, 4], "duration": 180}');
