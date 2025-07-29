"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag, Tag, CreditCard, Truck, Shield, Heart } from "lucide-react"

interface CartItem {
  id: number
  name: string
  price: number
  originalPrice: number
  image: string
  quantity: number
  size: string
  color: string
  discount: number
}

const initialCartItems: CartItem[] = [
  {
    id: 1,
    name: "Cargo Pants with Patches",
    price: 89.99,
    originalPrice: 119.99,
    image: "/placeholder.svg?height=200&width=200",
    quantity: 1,
    size: "L",
    color: "Black",
    discount: 25,
  },
  {
    id: 2,
    name: "Graphic Hoodie",
    price: 79.99,
    originalPrice: 99.99,
    image: "/placeholder.svg?height=200&width=200",
    quantity: 2,
    size: "M",
    color: "Navy",
    discount: 20,
  },
  {
    id: 3,
    name: "Essential T-Shirt Pack",
    price: 49.99,
    originalPrice: 69.99,
    image: "/placeholder.svg?height=200&width=200",
    quantity: 1,
    size: "XL",
    color: "White",
    discount: 30,
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems)
  const [discountCode, setDiscountCode] = useState("")
  const [appliedDiscount, setAppliedDiscount] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const applyDiscountCode = () => {
    const validCodes = {
      SAVE10: 10,
      WELCOME20: 20,
      STUDENT15: 15,
    }

    if (validCodes[discountCode as keyof typeof validCodes]) {
      setAppliedDiscount(validCodes[discountCode as keyof typeof validCodes])
      setDiscountCode("")
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discountAmount = (subtotal * appliedDiscount) / 100
  const shipping = subtotal > 100 ? 0 : 9.99
  const tax = (subtotal - discountAmount) * 0.08
  const total = subtotal - discountAmount + shipping + tax

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center space-x-2">
                <ArrowLeft className="h-5 w-5" />
                <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                  HYPESTAGES
                </span>
              </Link>
            </div>
          </div>
        </header>

        {/* Empty Cart */}
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <div className="mb-8">
            <ShoppingBag className="h-24 w-24 mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600">Looks like you haven't added anything to your cart yet.</p>
          </div>
          <Link href="/">
            <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-3 rounded-full">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2 text-gray-700 hover:text-pink-500 transition-colors">
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Continue Shopping</span>
            </Link>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Shopping Cart ({totalItems})
            </h1>
            <div className="w-32" /> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card
              className={`transform transition-all duration-500 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
            >
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ShoppingBag className="h-5 w-5" />
                  <span>Cart Items</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {cartItems.map((item, index) => (
                  <div
                    key={item.id}
                    className={`flex flex-col sm:flex-row gap-4 p-4 border rounded-lg hover:shadow-md transition-all duration-300 ${
                      isLoaded ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="relative">
                      <Image
                        src={
                          item.image || `/placeholder.svg?height=120&width=120&text=${encodeURIComponent(item.name)}`
                        }
                        alt={item.name}
                        width={120}
                        height={120}
                        className="rounded-lg object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = `/placeholder.svg?height=120&width=120&text=${encodeURIComponent(item.name)}`
                        }}
                        onLoad={(e) => {
                          const target = e.target as HTMLImageElement
                          target.style.opacity = "1"
                        }}
                        style={{ opacity: 0, transition: "opacity 0.3s ease-in-out" }}
                      />
                      <Badge className="absolute -top-2 -right-2 bg-red-500 text-white">{item.discount}% OFF</Badge>
                    </div>

                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-900">{item.name}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                            <span>Size: {item.size}</span>
                            <span>Color: {item.color}</span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-gray-900">${item.price.toFixed(2)}</span>
                          <span className="text-sm text-gray-500 line-through">${item.originalPrice.toFixed(2)}</span>
                        </div>

                        <div className="flex items-center space-x-3">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="h-8 w-8"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-8 w-8"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <Button variant="ghost" size="sm" className="text-pink-600 hover:text-pink-700">
                          <Heart className="h-4 w-4 mr-1" />
                          Move to Wishlist
                        </Button>
                        <span className="font-semibold text-gray-900">
                          Subtotal: ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Discount Code */}
            <Card
              className={`transform transition-all duration-500 delay-300 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
            >
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Tag className="h-5 w-5" />
                  <span>Discount Code</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter discount code"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                    className="flex-1"
                  />
                  <Button
                    onClick={applyDiscountCode}
                    disabled={!discountCode}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                  >
                    Apply
                  </Button>
                </div>
                {appliedDiscount > 0 && (
                  <div className="mt-2 text-sm text-green-600 font-medium">✓ {appliedDiscount}% discount applied!</div>
                )}
                <div className="mt-3 text-xs text-gray-500">Try: SAVE10, WELCOME20, STUDENT15</div>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card
              className={`transform transition-all duration-500 delay-500 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
            >
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({appliedDiscount}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
                </div>

                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-3 text-lg font-semibold transform hover:scale-105 transition-all duration-300">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Proceed to Checkout
                </Button>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-2 pt-4 text-center text-xs text-gray-600">
                  <div className="flex flex-col items-center space-y-1">
                    <Shield className="h-4 w-4 text-green-500" />
                    <span>Secure Payment</span>
                  </div>
                  <div className="flex flex-col items-center space-y-1">
                    <Truck className="h-4 w-4 text-blue-500" />
                    <span>Free Shipping</span>
                  </div>
                  <div className="flex flex-col items-center space-y-1">
                    <Heart className="h-4 w-4 text-red-500" />
                    <span>Easy Returns</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recommended Products */}
            <Card
              className={`transform transition-all duration-500 delay-700 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
            >
              <CardHeader>
                <CardTitle>You might also like</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[1, 2].map((item) => (
                    <div
                      key={item}
                      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <Image
                        src={`/placeholder.svg?height=60&width=60&text=Recommended+${item}`}
                        alt="Recommended product"
                        width={60}
                        height={60}
                        className="rounded-md object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = `/placeholder.svg?height=60&width=60&text=Recommended+${item}`
                        }}
                        onLoad={(e) => {
                          const target = e.target as HTMLImageElement
                          target.style.opacity = "1"
                        }}
                        style={{ opacity: 0, transition: "opacity 0.3s ease-in-out" }}
                      />
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">Recommended Item {item}</h4>
                        <p className="text-xs text-gray-600">$39.99</p>
                      </div>
                      <Button size="sm" variant="outline">
                        Add
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
