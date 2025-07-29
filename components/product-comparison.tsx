"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { ArrowLeftRight, X, Star, Check, Minus } from "lucide-react"

interface ComparisonProduct {
  id: string
  name: string
  price: number
  originalPrice: number
  discount: number
  image: string
  rating: number
  reviews: number
  brand: string
  features: string[]
  specifications: Record<string, string>
}

interface ProductComparisonProps {
  products: ComparisonProduct[]
  isOpen: boolean
  onClose: () => void
  onRemoveProduct: (productId: string) => void
}

export function ProductComparison({ products, isOpen, onClose, onRemoveProduct }: ProductComparisonProps) {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null)

  // Get all unique features across products
  const allFeatures = Array.from(new Set(products.flatMap((product) => product.features)))

  // Get all unique specifications
  const allSpecs = Array.from(new Set(products.flatMap((product) => Object.keys(product.specifications))))

  const hasFeature = (product: ComparisonProduct, feature: string) => {
    return product.features.includes(feature)
  }

  const getSpecValue = (product: ComparisonProduct, spec: string) => {
    return product.specifications[spec] || "-"
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <ArrowLeftRight className="h-5 w-5" />
            <span>Product Comparison ({products.length} items)</span>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-auto">
          {products.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <ArrowLeftRight className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Products to Compare</h3>
                <p className="text-gray-600">Add products to start comparing their features and specifications.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Product Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {products.map((product) => (
                  <Card key={product.id} className="relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 z-10 h-6 w-6 text-gray-400 hover:text-red-500"
                      onClick={() => onRemoveProduct(product.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>

                    <CardContent className="p-4">
                      <div className="relative aspect-square mb-4 rounded-lg overflow-hidden">
                        {product.discount > 0 && (
                          <Badge className="absolute top-2 left-2 z-10 bg-red-500 text-white text-xs">
                            {product.discount}% OFF
                          </Badge>
                        )}
                        <Image
                          src={
                            product.image ||
                            `/placeholder.svg?height=200&width=200&text=${encodeURIComponent(product.name)}`
                          }
                          alt={product.name}
                          fill
                          className="object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = `/placeholder.svg?height=200&width=200&text=${encodeURIComponent(product.name)}`
                          }}
                          onLoad={(e) => {
                            const target = e.target as HTMLImageElement
                            target.style.opacity = "1"
                          }}
                          style={{ opacity: 0, transition: "opacity 0.3s ease-in-out" }}
                        />
                      </div>

                      <div className="space-y-2">
                        <Badge variant="outline" className="text-xs">
                          {product.brand}
                        </Badge>
                        <h3 className="font-semibold text-sm line-clamp-2">{product.name}</h3>

                        <div className="flex items-center space-x-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-500">({product.reviews})</span>
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-lg">${product.price}</span>
                            {product.originalPrice > product.price && (
                              <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Separator />

              {/* Features Comparison */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Features Comparison</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-medium">Feature</th>
                        {products.map((product) => (
                          <th key={product.id} className="text-center p-3 font-medium min-w-[150px]">
                            {product.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {allFeatures.map((feature) => (
                        <tr
                          key={feature}
                          className={`border-b hover:bg-gray-50 cursor-pointer ${
                            selectedFeature === feature ? "bg-pink-50" : ""
                          }`}
                          onClick={() => setSelectedFeature(selectedFeature === feature ? null : feature)}
                        >
                          <td className="p-3 font-medium">{feature}</td>
                          {products.map((product) => (
                            <td key={product.id} className="p-3 text-center">
                              {hasFeature(product, feature) ? (
                                <Check className="h-5 w-5 text-green-500 mx-auto" />
                              ) : (
                                <Minus className="h-5 w-5 text-gray-300 mx-auto" />
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <Separator />

              {/* Specifications Comparison */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Specifications</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-medium">Specification</th>
                        {products.map((product) => (
                          <th key={product.id} className="text-center p-3 font-medium min-w-[150px]">
                            {product.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {allSpecs.map((spec) => (
                        <tr key={spec} className="border-b hover:bg-gray-50">
                          <td className="p-3 font-medium">{spec}</td>
                          {products.map((product) => (
                            <td key={product.id} className="p-3 text-center text-sm">
                              {getSpecValue(product, spec)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Price Comparison */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Price Comparison</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {products.map((product) => (
                    <Card key={product.id}>
                      <CardContent className="p-4 text-center">
                        <h4 className="font-medium mb-2 line-clamp-1">{product.name}</h4>
                        <div className="space-y-1">
                          <div className="text-2xl font-bold text-green-600">${product.price}</div>
                          {product.originalPrice > product.price && (
                            <>
                              <div className="text-sm text-gray-500 line-through">${product.originalPrice}</div>
                              <div className="text-sm text-red-600 font-medium">
                                Save ${(product.originalPrice - product.price).toFixed(2)}
                              </div>
                            </>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center space-x-4 pt-6 border-t">
                <Button variant="outline" onClick={() => products.forEach((p) => onRemoveProduct(p.id))}>
                  Clear All
                </Button>
                <Button
                  onClick={onClose}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                >
                  Close Comparison
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
