"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2, X } from "lucide-react"

interface ProductImage {
  id: string
  url: string
  alt: string
  type: "main" | "detail" | "lifestyle" | "back" | "side"
}

interface ProductGalleryProps {
  images: ProductImage[]
  productName: string
  discount?: number
  className?: string
}

export function ProductGallery({ images, productName, discount, className = "" }: ProductGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 })

  const currentImage = images[currentImageIndex]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
    setIsZoomed(false)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
    setIsZoomed(false)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    setZoomPosition({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) })
  }

  const toggleZoom = () => {
    setIsZoomed(!isZoomed)
    if (!isZoomed) {
      setZoomPosition({ x: 50, y: 50 })
    }
  }

  const openFullscreen = () => {
    setIsFullscreen(true)
  }

  const closeFullscreen = () => {
    setIsFullscreen(false)
    setIsZoomed(false)
  }

  return (
    <>
      <div className={`space-y-4 ${className}`}>
        {/* Main Image Display */}
        <Card className="relative overflow-hidden group">
          <div
            className="relative aspect-square cursor-crosshair"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setIsZoomed(false)}
          >
            {discount && (
              <Badge className="absolute top-4 left-4 z-10 bg-red-500 text-white font-bold">SALE {discount}% OFF</Badge>
            )}

            <Image
              src={currentImage?.url || "/placeholder.svg?height=600&width=600"}
              alt={currentImage?.alt || productName}
              fill
              className={`object-cover transition-transform duration-300 ${isZoomed ? "scale-150" : "scale-100"}`}
              style={
                isZoomed
                  ? {
                      transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    }
                  : {}
              }
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = "/placeholder.svg?height=600&width=600"
              }}
            />

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}

            {/* Zoom and Fullscreen Controls */}
            <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button variant="ghost" size="icon" className="bg-white/80 hover:bg-white" onClick={toggleZoom}>
                {isZoomed ? <ZoomOut className="h-4 w-4" /> : <ZoomIn className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" size="icon" className="bg-white/80 hover:bg-white" onClick={openFullscreen}>
                <Maximize2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Image Counter */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {images.length}
              </div>
            )}
          </div>
        </Card>

        {/* Thumbnail Navigation */}
        {images.length > 1 && (
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={image.id}
                className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                  index === currentImageIndex
                    ? "border-pink-500 ring-2 ring-pink-200"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => {
                  setCurrentImageIndex(index)
                  setIsZoomed(false)
                }}
              >
                <Image
                  src={image.url || "/placeholder.svg?height=80&width=80"}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = "/placeholder.svg?height=80&width=80"
                  }}
                />
                {/* Image Type Badge */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs px-1 py-0.5 text-center">
                  {image.type}
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Image Type Legend */}
        <div className="flex flex-wrap gap-2 text-xs text-gray-600">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span>Main View</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Detail Shot</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span>Lifestyle</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span>Back/Side View</span>
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          <div className="relative w-full h-full max-w-6xl max-h-6xl p-4">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 text-white"
              onClick={closeFullscreen}
            >
              <X className="h-6 w-6" />
            </Button>

            <div className="relative w-full h-full cursor-crosshair" onMouseMove={handleMouseMove}>
              <Image
                src={currentImage?.url || "/placeholder.svg?height=800&width=800"}
                alt={currentImage?.alt || productName}
                fill
                className={`object-contain transition-transform duration-300 ${isZoomed ? "scale-150" : "scale-100"}`}
                style={
                  isZoomed
                    ? {
                        transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                      }
                    : {}
                }
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = "/placeholder.svg?height=800&width=800"
                }}
              />
            </div>

            {/* Fullscreen Navigation */}
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </>
            )}

            {/* Fullscreen Controls */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-4 bg-black/50 rounded-full px-4 py-2">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20" onClick={toggleZoom}>
                {isZoomed ? <ZoomOut className="h-4 w-4 mr-2" /> : <ZoomIn className="h-4 w-4 mr-2" />}
                {isZoomed ? "Zoom Out" : "Zoom In"}
              </Button>
              {images.length > 1 && (
                <span className="text-white text-sm">
                  {currentImageIndex + 1} / {images.length}
                </span>
              )}
            </div>

            {/* Fullscreen Thumbnails */}
            {images.length > 1 && (
              <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex space-x-2 bg-black/50 rounded-lg p-2">
                {images.map((image, index) => (
                  <button
                    key={image.id}
                    className={`relative w-12 h-12 rounded overflow-hidden border transition-all ${
                      index === currentImageIndex
                        ? "border-white ring-2 ring-white/50"
                        : "border-white/30 hover:border-white/60"
                    }`}
                    onClick={() => {
                      setCurrentImageIndex(index)
                      setIsZoomed(false)
                    }}
                  >
                    <Image
                      src={image.url || "/placeholder.svg?height=48&width=48"}
                      alt={image.alt}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = "/placeholder.svg?height=48&width=48"
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
