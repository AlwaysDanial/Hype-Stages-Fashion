// Integration utilities for external services

// Supabase integration for product data
export const fetchProductData = async (productId: string) => {
  try {
    const { supabase } = await import("./supabase")
    const { data, error } = await supabase.from("products").select("*").eq("id", productId).single()

    if (error) throw error
    return data
  } catch (error) {
    console.error("Error fetching product:", error)
    return null
  }
}

// Stripe integration for payments
export const createPaymentIntentForProduct = async (productId: string, quantity: number) => {
  try {
    const { createPaymentIntent } = await import("./stripe")
    const product = await fetchProductData(productId)

    if (!product) throw new Error("Product not found")

    const amount = product.price * quantity
    return await createPaymentIntent(amount)
  } catch (error) {
    console.error("Error creating payment intent:", error)
    throw error
  }
}

// Social media sharing utilities
export const shareProduct = {
  facebook: (productName: string, productUrl: string) => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`
    window.open(url, "_blank", "width=600,height=400")
  },

  twitter: (productName: string, productUrl: string) => {
    const text = `Check out this amazing ${productName}! 🔥`
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(productUrl)}`
    window.open(url, "_blank", "width=600,height=400")
  },

  pinterest: (productName: string, productUrl: string, imageUrl: string) => {
    const url = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(productUrl)}&media=${encodeURIComponent(imageUrl)}&description=${encodeURIComponent(productName)}`
    window.open(url, "_blank", "width=600,height=400")
  },

  whatsapp: (productName: string, productUrl: string) => {
    const text = `Check out this ${productName}: ${productUrl}`
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`
    window.open(url, "_blank")
  },
}

// AR/3D model utilities
export const loadARModel = async (productId: string) => {
  // This would integrate with AR libraries like AR.js, 8th Wall, or WebXR
  try {
    // Simulate loading 3D model data
    const modelData = {
      modelUrl: `/models/${productId}.glb`,
      scale: [1, 1, 1],
      position: [0, 0, 0],
      rotation: [0, 0, 0],
    }

    return modelData
  } catch (error) {
    console.error("Error loading AR model:", error)
    return null
  }
}

// 360° image utilities
export const generate360Images = async (productId: string, totalFrames = 36) => {
  // This would integrate with 360° photography services
  try {
    const images = Array.from({ length: totalFrames }, (_, i) => ({
      frame: i,
      url: `/360/${productId}/frame_${String(i).padStart(3, "0")}.jpg`,
      angle: (360 / totalFrames) * i,
    }))

    return images
  } catch (error) {
    console.error("Error generating 360° images:", error)
    return []
  }
}

// Video processing utilities
export const processProductVideos = async (productId: string) => {
  // This would integrate with video processing services like Cloudinary or AWS
  try {
    const videos = [
      {
        id: `${productId}-overview`,
        url: `/videos/${productId}/overview.mp4`,
        thumbnail: `/videos/${productId}/overview-thumb.jpg`,
        title: "Product Overview",
        duration: "2:30",
        quality: "1080p",
      },
      {
        id: `${productId}-styling`,
        url: `/videos/${productId}/styling.mp4`,
        thumbnail: `/videos/${productId}/styling-thumb.jpg`,
        title: "Styling Tips",
        duration: "1:45",
        quality: "1080p",
      },
    ]

    return videos
  } catch (error) {
    console.error("Error processing videos:", error)
    return []
  }
}

// Analytics integration
export const trackProductInteraction = async (
  productId: string,
  action: "view" | "zoom" | "360_rotate" | "video_play" | "ar_try_on" | "share" | "compare",
  metadata?: Record<string, any>,
) => {
  try {
    // This would integrate with analytics services like Google Analytics, Mixpanel, etc.
    const eventData = {
      event: "product_interaction",
      product_id: productId,
      action,
      timestamp: new Date().toISOString(),
      ...metadata,
    }

    // Send to analytics service
    console.log("Analytics event:", eventData)

    // Example: Send to Google Analytics 4
    const gtag = window.gtag // Declare the gtag variable
    if (typeof gtag !== "undefined") {
      gtag("event", action, {
        product_id: productId,
        ...metadata,
      })
    }
  } catch (error) {
    console.error("Error tracking interaction:", error)
  }
}

// Image optimization utilities
export const optimizeProductImages = {
  getOptimizedUrl: (originalUrl: string, width: number, height: number, quality = 80) => {
    // This would integrate with image optimization services like Cloudinary, ImageKit, etc.
    const params = new URLSearchParams({
      w: width.toString(),
      h: height.toString(),
      q: quality.toString(),
      f: "auto",
    })

    return `${originalUrl}?${params.toString()}`
  },

  generateResponsiveSizes: (originalUrl: string) => {
    const sizes = [
      { width: 400, height: 400, label: "small" },
      { width: 600, height: 600, label: "medium" },
      { width: 800, height: 800, label: "large" },
      { width: 1200, height: 1200, label: "xlarge" },
    ]

    return sizes.map((size) => ({
      ...size,
      url: optimizeProductImages.getOptimizedUrl(originalUrl, size.width, size.height),
    }))
  },
}

// Search and recommendation integration
export const getProductRecommendations = async (productId: string, limit = 4) => {
  try {
    // This would integrate with recommendation engines like Algolia, Elasticsearch, etc.
    const { supabase } = await import("./supabase")
    const { data, error } = await supabase.from("products").select("*").neq("id", productId).limit(limit)

    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Error fetching recommendations:", error)
    return []
  }
}

// Inventory management integration
export const checkProductAvailability = async (productId: string, size?: string, color?: string) => {
  try {
    const { supabase } = await import("./supabase")
    let query = supabase.from("inventory").select("quantity").eq("product_id", productId)

    if (size) query = query.eq("size", size)
    if (color) query = query.eq("color", color)

    const { data, error } = await query.single()

    if (error) throw error
    return data?.quantity || 0
  } catch (error) {
    console.error("Error checking availability:", error)
    return 0
  }
}
