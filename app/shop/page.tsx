"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Menu, Search, User, ShoppingCart, Heart, Star, Grid, List, SlidersHorizontal, Eye } from "lucide-react"

const allProducts = [
  {
    id: 1,
    name: "Cargo Pants with Patches",
    price: 89.99,
    originalPrice: 119.99,
    discount: 25,
    image: "/placeholder.svg?height=300&width=300&text=Cargo+Pants",
    rating: 4.5,
    reviews: 128,
    category: "pants",
    brand: "StreetWear Co",
    colors: ["Black", "Khaki", "Navy"],
    sizes: ["S", "M", "L", "XL"],
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
    category: "hoodies",
    brand: "Urban Style",
    colors: ["Navy", "Black", "Gray"],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: 3,
    name: "Essential T-Shirt Pack",
    price: 49.99,
    originalPrice: 69.99,
    discount: 30,
    image: "/placeholder.svg?height=300&width=300&text=T-Shirt",
    rating: 4.6,
    reviews: 156,
    category: "t-shirts",
    brand: "Basic Tees",
    colors: ["White", "Black", "Gray", "Navy"],
    sizes: ["S", "M", "L", "XL"],
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
    category: "t-shirts",
    brand: "Premium Co",
    colors: ["White", "Black"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 5,
    name: "Denim Jacket",
    price: 129.99,
    originalPrice: 159.99,
    discount: 19,
    image: "/placeholder.svg?height=300&width=300&text=Denim+Jacket",
    rating: 4.4,
    reviews: 67,
    category: "jackets",
    brand: "Denim Works",
    colors: ["Blue", "Black", "Light Blue"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 6,
    name: "Sneakers Classic",
    price: 149.99,
    originalPrice: 199.99,
    discount: 25,
    image: "/placeholder.svg?height=300&width=300&text=Sneakers",
    rating: 4.9,
    reviews: 342,
    category: "shoes",
    brand: "Sneaker Pro",
    colors: ["White", "Black", "Red"],
    sizes: ["7", "8", "9", "10", "11", "12"],
  },
  {
    id: 7,
    name: "Oversized Hoodie",
    price: 94.99,
    originalPrice: 124.99,
    discount: 24,
    image: "/placeholder.svg?height=300&width=300&text=Oversized+Hoodie",
    rating: 4.3,
    reviews: 91,
    category: "hoodies",
    brand: "Comfort Zone",
    colors: ["Gray", "Black", "Cream"],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: 8,
    name: "Distressed Jeans",
    price: 109.99,
    originalPrice: 139.99,
    discount: 21,
    image: "/placeholder.svg?height=300&width=300&text=Distressed+Jeans",
    rating: 4.6,
    reviews: 178,
    category: "pants",
    brand: "Denim Co",
    colors: ["Blue", "Black", "Light Wash"],
    sizes: ["28", "30", "32", "34", "36"],
  },
]

export default function ShopPage() {
  const [products, setProducts] = useState(allProducts)
  const [cartItems, setCartItems] = useState(3)
  const [wishlistItems, setWishlistItems] = useState<number[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("featured")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 200])

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const categories = ["all", "t-shirts", "hoodies", "pants", "jackets", "shoes"]
  const brands = ["StreetWear Co", "Urban Style", "Basic Tees", "Premium Co", "Denim Works", "Sneaker Pro"]

  const addToCart = (productId: number) => {
    setCartItems((prev) => prev + 1)
  }

  const toggleWishlist = (productId: number) => {
    setWishlistItems((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand)
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]

    return matchesSearch && matchesCategory && matchesBrand && matchesPrice
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "newest":
        return b.id - a.id
      default:
        return 0
    }
  })

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card
              className={`transform transition-all duration-500 MYR{isLoaded ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}`}
            >
              <div className="p-6 space-y-6">
                <div className="flex items-center space-x-2">
                  <SlidersHorizontal className="h-5 w-5" />
                  <h3 className="font-semibold">Filters</h3>
                </div>

                {/* Search */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Search</label>
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {/* Categories */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Brands */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Brands</label>
                  <div className="space-y-2">
                    {brands.map((brand) => (
                      <div key={brand} className="flex items-center space-x-2">
                        <Checkbox
                          id={brand}
                          checked={selectedBrands.includes(brand)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedBrands([...selectedBrands, brand])
                            } else {
                              setSelectedBrands(selectedBrands.filter((b) => b !== brand))
                            }
                          }}
                        />
                        <label htmlFor={brand} className="text-sm">
                          {brand}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Price Range: MYR{priceRange[0]} - MYR{priceRange[1]}
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number.parseInt(e.target.value), priceRange[1]])}
                      className="w-full"
                    />
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Products */}
          <div className="lg:col-span-3">
            {/* Toolbar */}
            <div
              className={`flex items-center justify-between mb-6 transform transition-all duration-500 delay-200 MYR{isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
            >
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">{sortedProducts.length} products found</span>
              </div>

              <div className="flex items-center space-x-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex items-center space-x-1">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div
              className={`grid ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"} gap-6`}
            >
              {sortedProducts.map((product, index) => (
                <Card
                  key={product.id}
                  className={`group cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-xl ${
                    isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                  }`}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  <CardContent className="p-0">
                    <div className={`${viewMode === "list" ? "flex" : ""}`}>
                      <div
                        className={`relative overflow-hidden ${viewMode === "list" ? "w-48" : "w-full"} rounded-t-lg`}
                      >
                        <Badge className="absolute top-3 left-3 z-10 bg-red-500 hover:bg-red-600 text-white font-bold">
                          SALE {product.discount}%
                        </Badge>

                        <div className="absolute top-3 right-3 z-10 flex space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className={`bg-white/80 hover:bg-white transition-colors ${
                              wishlistItems.includes(product.id) ? "text-red-500" : "text-gray-600"
                            }`}
                            onClick={() => toggleWishlist(product.id)}
                          >
                            <Heart className={`h-4 w-4 ${wishlistItems.includes(product.id) ? "fill-current" : ""}`} />
                          </Button>
                          <Link href={`/product/${product.id}`}>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="bg-white/80 hover:bg-white transition-colors text-gray-600"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                        </div>

                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={300}
                          height={300}
                          className={`${viewMode === "list" ? "w-48 h-48" : "w-full h-64"} object-cover group-hover:scale-110 transition-transform duration-500`}
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

                      <div className={`p-4 ${viewMode === "list" ? "flex-1" : ""}`}>
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

                        <Link href={`/product/${product.id}`}>
                          <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
                            {product.name}
                          </h3>
                        </Link>

                        <p className="text-sm text-gray-600 mb-2">{product.brand}</p>

                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold text-gray-900">MYR{product.price}</span>
                            <span className="text-sm text-gray-500 line-through">MYR{product.originalPrice}</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 mb-4">
                          <span className="text-xs text-gray-600">Colors:</span>
                          {product.colors.slice(0, 3).map((color) => (
                            <div
                              key={color}
                              className="w-4 h-4 rounded-full border border-gray-300"
                              style={{ backgroundColor: color.toLowerCase() }}
                              title={color}
                            />
                          ))}
                        </div>

                        <div className="flex space-x-2">
                          <Button
                            className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white transform hover:scale-105 transition-all duration-300"
                            onClick={() => addToCart(product.id)}
                          >
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Add to Cart
                          </Button>
                          <Link href={`/product/${product.id}`}>
                            <Button variant="outline" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {sortedProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                <Button
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("all")
                    setSelectedBrands([])
                    setPriceRange([0, 200])
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
