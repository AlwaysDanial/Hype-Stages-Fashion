"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Menu,
  Search,
  User,
  ShoppingCart,
  Heart,
  Star,
  ArrowRight,
  Truck,
  Shield,
  RotateCcw,
  Headphones,
} from "lucide-react"

const products = [
  {
    id: 1,
    name: "Cargo Pants with Patches",
    price: 89.99,
    originalPrice: 119.99,
    discount: 25,
    image: "/placeholder.svg?height=300&width=300&text=Cargo+Pants",
    rating: 4.5,
    reviews: 128,
  },
  {
    id: 2,
    name: "Graphic Hoodie",
    price: 79.99,
    originalPrice: 99.99,
    discount: 20,
    image: "/placeholder.svg?height=300&width=300&text=Hoodie",
    rating: 4.8,
    reviews: 89,
  },
  {
    id: 3,
    name: "Essential T-Shirt Pack",
    price: 49.99,
    originalPrice: 69.99,
    discount: 30,
    image: "/placeholder.svg?height=300&width=300&text=T-Shirt+Pack",
    rating: 4.6,
    reviews: 156,
  },
  {
    id: 4,
    name: "Premium T-Shirt Collection",
    price: 59.99,
    originalPrice: 79.99,
    discount: 25,
    image: "/placeholder.svg?height=300&width=300&text=Premium+Tee",
    rating: 4.7,
    reviews: 203,
  },
]

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Free shipping on orders over $100",
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description: "100% secure payment processing",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "30-day hassle-free returns",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Round-the-clock customer support",
  },
]

export default function HomePage() {
  const [cartItems, setCartItems] = useState(3)
  const [wishlistItems, setWishlistItems] = useState<number[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const addToCart = (productId: number) => {
    setCartItems((prev) => prev + 1)
  }

  const toggleWishlist = (productId: number) => {
    setWishlistItems((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
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
              <Link href="/" className="text-pink-500 font-medium">
                Home
              </Link>
              <Link href="/shop" className="text-gray-700 hover:text-pink-500 transition-colors">
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

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 py-20">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url('/placeholder.svg?height=600&width=1200')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className={`transform transition-all duration-1000 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <div className="mb-8">
              <h2 className="text-6xl md:text-8xl font-black mb-4 relative">
                <span className="inline-block transform hover:scale-110 transition-transform duration-300 cursor-default">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 drop-shadow-lg filter">
                    S
                  </span>
                </span>
                <span className="inline-block transform hover:scale-110 transition-transform duration-300 cursor-default delay-100">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 drop-shadow-lg filter">
                    a
                  </span>
                </span>
                <span className="inline-block transform hover:scale-110 transition-transform duration-300 cursor-default delay-200">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 drop-shadow-lg filter">
                    l
                  </span>
                </span>
                <span className="inline-block transform hover:scale-110 transition-transform duration-300 cursor-default delay-300">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 drop-shadow-lg filter">
                    e
                  </span>
                </span>
              </h2>
              <h3 className="text-4xl md:text-6xl font-black text-gray-800 mb-6">PROMOTION</h3>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                Discover the latest in streetwear fashion with exclusive discounts up to 30% off. Limited time offer!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/shop">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  SHOP NOW
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white px-8 py-4 text-lg font-semibold rounded-full transform hover:scale-105 transition-all duration-300 bg-transparent"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`text-center transform transition-all duration-500 ${
                  isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mb-4">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our latest collection of streetwear essentials with exclusive discounts
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <Card
                key={product.id}
                className={`group cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-xl ${
                  isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${400 + index * 100}ms` }}
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <Badge className="absolute top-3 left-3 z-10 bg-red-500 hover:bg-red-600 text-white font-bold">
                      SALE {product.discount}%
                    </Badge>

                    <Button
                      variant="ghost"
                      size="icon"
                      className={`absolute top-3 right-3 z-10 bg-white/80 hover:bg-white transition-colors ${
                        wishlistItems.includes(product.id) ? "text-red-500" : "text-gray-600"
                      }`}
                      onClick={() => toggleWishlist(product.id)}
                    >
                      <Heart className={`h-4 w-4 ${wishlistItems.includes(product.id) ? "fill-current" : ""}`} />
                    </Button>

                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = `/placeholder.svg?height=300&width=300&text=${encodeURIComponent(product.name)}`
                      }}
                      onLoad={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.opacity = "1"
                      }}
                      style={{ opacity: 0, transition: "opacity 0.3s ease-in-out" }}
                    />

                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  </div>

                  <div className="p-4">
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
                    </div>

                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
                      {product.name}
                    </h3>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-gray-900">${product.price}</span>
                        <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                      </div>
                    </div>

                    <Button
                      className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white transform hover:scale-105 transition-all duration-300"
                      onClick={() => addToCart(product.id)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/shop">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white px-8 py-3 text-lg font-semibold rounded-full transform hover:scale-105 transition-all duration-300 bg-transparent"
              >
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gradient-to-r from-pink-500 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Stay Updated with Latest Deals</h2>
          <p className="text-pink-100 mb-8 text-lg">
            Subscribe to our newsletter and never miss exclusive offers and new arrivals
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-full border-0 focus:ring-2 focus:ring-white focus:outline-none"
            />
            <Button className="bg-white text-pink-600 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold transform hover:scale-105 transition-all duration-300">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent mb-4">
                HYPE STAGES
              </h3>
              <p className="text-gray-400 mb-4">Your destination for the latest streetwear and fashion trends.</p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-pink-400">
                  <div className="w-5 h-5 bg-current rounded" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-pink-400">
                  <div className="w-5 h-5 bg-current rounded" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-pink-400">
                  <div className="w-5 h-5 bg-current rounded" />
                </Button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/" className="hover:text-pink-400 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/shop" className="hover:text-pink-400 transition-colors">
                    Shop
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-pink-400 transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-pink-400 transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Customer Service</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-pink-400 transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-pink-400 transition-colors">
                    Shipping
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-pink-400 transition-colors">
                    Returns
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-pink-400 transition-colors">
                    Size Guide
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Newsletter</h4>
              <p className="text-gray-400 mb-4 text-sm">Subscribe for exclusive deals and updates</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
                />
                <Button className="bg-pink-500 hover:bg-pink-600 px-4 py-2 rounded-r-md">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 HYPE STAGES. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
