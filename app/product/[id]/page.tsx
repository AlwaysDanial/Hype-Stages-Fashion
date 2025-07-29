"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductGalleryAdvanced } from "@/components/product-gallery-advanced"
import { ARIntegration } from "@/components/ar-integration"
import { ProductComparison } from "@/components/product-comparison"
import {
  ShoppingCart,
  Heart,
  Share2,
  Star,
  Truck,
  RotateCcw,
  Shield,
  Menu,
  Search,
  User,
  ArrowLeftRight,
} from "lucide-react"

// Enhanced product data with 360°, videos, and AR support
const productData = {
  id: "1",
  name: "Cargo Pants with Patches",
  price: 89.99,
  originalPrice: 119.99,
  discount: 25,
  rating: 4.5,
  reviews: 128,
  brand: "StreetWear Co",
  category: "pants",
  description:
    "Premium cargo pants featuring unique patch details and multiple pockets. Made from durable cotton blend fabric with a comfortable relaxed fit.",
  features: [
    "100% Cotton blend fabric",
    "Multiple cargo pockets",
    "Unique patch details",
    "Relaxed fit design",
    "Machine washable",
    "Available in multiple colors",
    "Reinforced stitching",
    "Adjustable waist",
    "Water-resistant coating",
  ],
  sizes: ["S", "M", "L", "XL", "XXL"],
  colors: ["Black", "Khaki", "Navy", "Olive"],
  images: [
    {
      id: "main-1",
      url: "/placeholder.svg?height=600&width=600&text=Main+View+Front",
      alt: "Cargo Pants - Main Front View",
      type: "main" as const,
    },
    {
      id: "main-2",
      url: "/placeholder.svg?height=600&width=600&text=Main+View+Back",
      alt: "Cargo Pants - Main Back View",
      type: "back" as const,
    },
    {
      id: "detail-1",
      url: "/placeholder.svg?height=600&width=600&text=Patch+Detail",
      alt: "Cargo Pants - Patch Detail",
      type: "detail" as const,
    },
    {
      id: "detail-2",
      url: "/placeholder.svg?height=600&width=600&text=Pocket+Detail",
      alt: "Cargo Pants - Pocket Detail",
      type: "detail" as const,
    },
    {
      id: "lifestyle-1",
      url: "/placeholder.svg?height=600&width=600&text=Lifestyle+Shot+1",
      alt: "Cargo Pants - Lifestyle Photo",
      type: "lifestyle" as const,
    },
    {
      id: "lifestyle-2",
      url: "/placeholder.svg?height=600&width=600&text=Lifestyle+Shot+2",
      alt: "Cargo Pants - Lifestyle Photo 2",
      type: "lifestyle" as const,
    },
    {
      id: "side-1",
      url: "/placeholder.svg?height=600&width=600&text=Side+View",
      alt: "Cargo Pants - Side View",
      type: "side" as const,
    },
  ],
  // 360° view data
  product360: {
    images: Array.from({ length: 36 }, (_, i) => `/placeholder.svg?height=600&width=600&text=360+Frame+${i + 1}`),
    totalFrames: 36,
  },
  // Video data
  videos: [
    {
      id: "video-1",
      url: "/placeholder-video.mp4",
      thumbnail: "/placeholder.svg?height=400&width=600&text=Product+Video+1",
      title: "Product Overview",
      duration: "2:30",
    },
    {
      id: "video-2",
      url: "/placeholder-video-2.mp4",
      thumbnail: "/placeholder.svg?height=400&width=600&text=Styling+Tips",
      title: "Styling Tips",
      duration: "1:45",
    },
    {
      id: "video-3",
      url: "/placeholder-video-3.mp4",
      thumbnail: "/placeholder.svg?height=400&width=600&text=Care+Instructions",
      title: "Care Instructions",
      duration: "1:20",
    },
  ],
  specifications: {
    Material: "100% Cotton Blend",
    Fit: "Relaxed",
    Care: "Machine wash cold",
    Origin: "Made in USA",
    Weight: "1.2 lbs",
    "Waist Type": "Adjustable",
    "Pocket Count": "8 pockets",
    "Inseam Length": "32 inches",
  },
}

// Sample comparison products
const comparisonProducts = [
  {
    id: "1",
    name: "Cargo Pants with Patches",
    price: 89.99,
    originalPrice: 119.99,
    discount: 25,
    image: "/placeholder.svg?height=200&width=200&text=Cargo+Pants",
    rating: 4.5,
    reviews: 128,
    brand: "StreetWear Co",
    features: [
      "100% Cotton blend fabric",
      "Multiple cargo pockets",
      "Unique patch details",
      "Relaxed fit design",
      "Machine washable",
      "Water-resistant coating",
    ],
    specifications: {
      Material: "100% Cotton Blend",
      Fit: "Relaxed",
      Care: "Machine wash cold",
      Origin: "Made in USA",
      Weight: "1.2 lbs",
    },
  },
  {
    id: "2",
    name: "Urban Tactical Pants",
    price: 99.99,
    originalPrice: 129.99,
    discount: 23,
    image: "/placeholder.svg?height=200&width=200&text=Tactical+Pants",
    rating: 4.7,
    reviews: 89,
    brand: "Urban Gear",
    features: [
      "Ripstop fabric",
      "Tactical pockets",
      "Reinforced knees",
      "Slim fit design",
      "Quick-dry technology",
      "Water-resistant coating",
    ],
    specifications: {
      Material: "Ripstop Polyester",
      Fit: "Slim",
      Care: "Machine wash warm",
      Origin: "Made in Vietnam",
      Weight: "1.0 lbs",
    },
  },
]

export default function ProductDetailPage() {
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [cartItems, setCartItems] = useState(3)
  const [isLoaded, setIsLoaded] = useState(false)
  const [showARModal, setShowARModal] = useState(false)
  const [showComparison, setShowComparison] = useState(false)
  const [comparisonList, setComparisonList] = useState(comparisonProducts)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const addToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert("Please select size and color")
      return
    }
    setCartItems((prev) => prev + quantity)
    alert("Added to cart!")
  }

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted)
  }

  const handleARTryOn = () => {
    setShowARModal(true)
  }

  const removeFromComparison = (productId: string) => {
    setComparisonList((prev) => prev.filter((p) => p.id !== productId))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
              <Link href="/">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                  HYPE STAGES
                </h1>
              </Link>
            </div>

            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-pink-500 transition-colors">
                Home
              </Link>
              <Link href="/shop" className="text-pink-500 font-medium">
                Shop
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-pink-500 transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-pink-500 transition-colors">
                Contact
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setShowComparison(true)} className="relative">
                <ArrowLeftRight className="h-5 w-5" />
                {comparisonList.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-blue-500">
                    {comparisonList.length}
                  </Badge>
                )}
              </Button>
              <Link href="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cartItems > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-pink-500">
                      {cartItems}
                    </Badge>
                  )}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-pink-500">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-pink-500">
            Shop
          </Link>
          <span>/</span>
          <Link href={`/shop?category=${productData.category}`} className="hover:text-pink-500">
            {productData.category.charAt(0).toUpperCase() + productData.category.slice(1)}
          </Link>
          <span>/</span>
          <span className="text-gray-900">{productData.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Advanced Product Gallery */}
          <div
            className={`transform transition-all duration-500 ${
              isLoaded ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
            }`}
          >
            <ProductGalleryAdvanced
              images={productData.images}
              product360={productData.product360}
              videos={productData.videos}
              productName={productData.name}
              productId={productData.id}
              discount={productData.discount}
              onARTryOn={handleARTryOn}
            />
          </div>

          {/* Product Info */}
          <div
            className={`space-y-6 transform transition-all duration-500 delay-300 ${
              isLoaded ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
            }`}
          >
            {/* Product Header */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline" className="text-pink-600 border-pink-600">
                  {productData.brand}
                </Badge>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleWishlist}
                    className={isWishlisted ? "text-red-500" : "text-gray-400"}
                  >
                    <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-gray-400">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">{productData.name}</h1>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(productData.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">({productData.reviews} reviews)</span>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-gray-900">${productData.price}</span>
                <span className="text-xl text-gray-500 line-through">${productData.originalPrice}</span>
                <Badge className="bg-red-500 text-white">SAVE {productData.discount}%</Badge>
              </div>

              <p className="text-gray-600 mb-6">{productData.description}</p>
            </div>

            {/* Product Options */}
            <Card>
              <CardContent className="p-6 space-y-6">
                {/* Color Selection */}
                <div>
                  <label className="text-sm font-medium mb-3 block">
                    Color: {selectedColor && <span className="text-pink-600">{selectedColor}</span>}
                  </label>
                  <div className="flex space-x-3">
                    {productData.colors.map((color) => (
                      <button
                        key={color}
                        className={`w-12 h-12 rounded-full border-2 transition-all ${
                          selectedColor === color
                            ? "border-pink-500 ring-2 ring-pink-200"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                        style={{ backgroundColor: color.toLowerCase() }}
                        onClick={() => setSelectedColor(color)}
                        title={color}
                      />
                    ))}
                  </div>
                </div>

                {/* Size Selection */}
                <div>
                  <label className="text-sm font-medium mb-3 block">Size</label>
                  <Select value={selectedSize} onValueChange={setSelectedSize}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {productData.sizes.map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Quantity */}
                <div>
                  <label className="text-sm font-medium mb-3 block">Quantity</label>
                  <div className="flex items-center space-x-3">
                    <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                      -
                    </Button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                      +
                    </Button>
                  </div>
                </div>

                {/* Add to Cart */}
                <Button
                  onClick={addToCart}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-3 text-lg font-semibold transform hover:scale-105 transition-all duration-300"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart - ${(productData.price * quantity).toFixed(2)}
                </Button>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t text-center text-sm">
                  <div className="flex flex-col items-center space-y-2">
                    <Truck className="h-6 w-6 text-blue-500" />
                    <span className="text-gray-600">Free Shipping</span>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <RotateCcw className="h-6 w-6 text-green-500" />
                    <span className="text-gray-600">Easy Returns</span>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <Shield className="h-6 w-6 text-purple-500" />
                    <span className="text-gray-600">Secure Payment</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div
          className={`mt-16 transform transition-all duration-500 delay-500 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({productData.reviews})</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Product Description</h3>
                  <p className="text-gray-600 mb-6">{productData.description}</p>

                  <h4 className="font-semibold mb-3">Key Features:</h4>
                  <ul className="space-y-2">
                    {productData.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Product Specifications</h3>
                  <div className="space-y-3">
                    {Object.entries(productData.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-900">{key}:</span>
                        <span className="text-gray-600">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
                  <div className="space-y-6">
                    {[1, 2, 3].map((review) => (
                      <div key={review} className="border-b border-gray-100 pb-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                          <span className="font-medium">Customer {review}</span>
                          <span className="text-gray-500 text-sm">• 2 days ago</span>
                        </div>
                        <p className="text-gray-600">
                          Great quality and perfect fit! The material feels premium and the design is exactly as shown
                          in the photos. The AR try-on feature was amazing!
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* AR Modal */}
      {showARModal && (
        <ARIntegration
          productId={productData.id}
          productName={productData.name}
          onClose={() => setShowARModal(false)}
        />
      )}

      {/* Comparison Modal */}
      <ProductComparison
        products={comparisonList}
        isOpen={showComparison}
        onClose={() => setShowComparison(false)}
        onRemoveProduct={removeFromComparison}
      />
    </div>
  )
}
