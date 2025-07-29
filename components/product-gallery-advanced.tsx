"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  X,
  RotateCw,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Share2,
  Facebook,
  Twitter,
  Instagram,
  Copy,
  Download,
  Eye,
  Smartphone,
  ArrowLeftRight,
  Plus,
} from "lucide-react"

interface ProductImage {
  id: string
  url: string
  alt: string
  type: "main" | "detail" | "lifestyle" | "back" | "side" | "360" | "video" | "ar"
}

interface Product360Data {
  images: string[]
  totalFrames: number
}

interface ProductVideo {
  id: string
  url: string
  thumbnail: string
  title: string
  duration: string
}

interface ProductGalleryAdvancedProps {
  images: ProductImage[]
  product360?: Product360Data
  videos?: ProductVideo[]
  productName: string
  productId: string
  discount?: number
  className?: string
  onARTryOn?: () => void
}

export function ProductGalleryAdvanced({
  images,
  product360,
  videos = [],
  productName,
  productId,
  discount,
  className = "",
  onARTryOn,
}: ProductGalleryAdvancedProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 })
  const [activeTab, setActiveTab] = useState<"images" | "360" | "videos" | "ar">("images")

  // 360° view state
  const [rotation360, setRotation360] = useState(0)
  const [isDragging360, setIsDragging360] = useState(false)
  const [lastMouseX, setLastMouseX] = useState(0)

  // Video state
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isVideoMuted, setIsVideoMuted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Comparison state
  const [showComparison, setShowComparison] = useState(false)
  const [comparisonProducts, setComparisonProducts] = useState<string[]>([])

  // Social sharing state
  const [showShareDialog, setShowShareDialog] = useState(false)

  const currentImage = images[currentImageIndex]
  const current360Frame = Math.floor((rotation360 / 360) * (product360?.totalFrames || 36))

  // 360° view handlers
  const handle360MouseDown = (e: React.MouseEvent) => {
    setIsDragging360(true)
    setLastMouseX(e.clientX)
  }

  const handle360MouseMove = (e: React.MouseEvent) => {
    if (!isDragging360) return

    const deltaX = e.clientX - lastMouseX
    const rotationSpeed = 2
    const newRotation = (rotation360 + deltaX * rotationSpeed) % 360

    setRotation360(newRotation < 0 ? newRotation + 360 : newRotation)
    setLastMouseX(e.clientX)
  }

  const handle360MouseUp = () => {
    setIsDragging360(false)
  }

  // Video handlers
  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsVideoPlaying(!isVideoPlaying)
    }
  }

  const toggleVideoMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isVideoMuted
      setIsVideoMuted(!isVideoMuted)
    }
  }

  // Social sharing handlers
  const shareToSocial = (platform: string) => {
    const url = window.location.href
    const text = `Check out this ${productName}!`

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      instagram: `https://www.instagram.com/`, // Instagram doesn't support direct URL sharing
      copy: url,
    }

    if (platform === "copy") {
      navigator.clipboard.writeText(url)
      alert("Link copied to clipboard!")
    } else {
      window.open(shareUrls[platform as keyof typeof shareUrls], "_blank", "width=600,height=400")
    }
  }

  const downloadImage = () => {
    if (currentImage) {
      const link = document.createElement("a")
      link.href = currentImage.url
      link.download = `${productName}-${currentImage.type}.jpg`
      link.click()
    }
  }

  // AR Try-On handler
  const handleARTryOn = () => {
    if (onARTryOn) {
      onARTryOn()
    } else {
      // Fallback AR simulation
      alert("AR Try-On feature would launch here! This would integrate with AR libraries like AR.js or 8th Wall.")
    }
  }

  // Comparison handlers
  const addToComparison = (productId: string) => {
    if (!comparisonProducts.includes(productId)) {
      setComparisonProducts([...comparisonProducts, productId])
    }
  }

  const removeFromComparison = (productId: string) => {
    setComparisonProducts(comparisonProducts.filter((id) => id !== productId))
  }

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

  return (
    <>
      <div className={`space-y-4 ${className}`}>
        {/* Gallery Tabs */}
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="images" className="flex items-center space-x-2">
              <Eye className="h-4 w-4" />
              <span>Images</span>
            </TabsTrigger>
            {product360 && (
              <TabsTrigger value="360" className="flex items-center space-x-2">
                <RotateCw className="h-4 w-4" />
                <span>360° View</span>
              </TabsTrigger>
            )}
            {videos.length > 0 && (
              <TabsTrigger value="videos" className="flex items-center space-x-2">
                <Play className="h-4 w-4" />
                <span>Videos</span>
              </TabsTrigger>
            )}
            <TabsTrigger value="ar" className="flex items-center space-x-2">
              <Smartphone className="h-4 w-4" />
              <span>AR Try-On</span>
            </TabsTrigger>
          </TabsList>

          {/* Images Tab */}
          <TabsContent value="images" className="mt-4">
            <Card className="relative overflow-hidden group">
              <div
                className="relative aspect-square cursor-crosshair"
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setIsZoomed(false)}
              >
                {discount && (
                  <Badge className="absolute top-4 left-4 z-10 bg-red-500 text-white font-bold">
                    SALE {discount}% OFF
                  </Badge>
                )}

                <Image
                  src={
                    currentImage?.url || `/placeholder.svg?height=600&width=600&text=${encodeURIComponent(productName)}`
                  }
                  alt={currentImage?.alt || productName}
                  fill
                  className={`object-cover transition-transform duration-300 ${isZoomed ? "scale-150" : "scale-100"}`}
                  style={
                    isZoomed
                      ? {
                          transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                          opacity: 1,
                          transition: "transform 0.3s ease-in-out, opacity 0.3s ease-in-out",
                        }
                      : { opacity: 1, transition: "transform 0.3s ease-in-out, opacity 0.3s ease-in-out" }
                  }
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = `/placeholder.svg?height=600&width=600&text=${encodeURIComponent(productName)}`
                  }}
                  onLoad={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.opacity = "1"
                  }}
                />

                {/* Navigation and Controls */}
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

                {/* Action Controls */}
                <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" className="bg-white/80 hover:bg-white" onClick={toggleZoom}>
                    {isZoomed ? <ZoomOut className="h-4 w-4" /> : <ZoomIn className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-white/80 hover:bg-white"
                    onClick={() => setIsFullscreen(true)}
                  >
                    <Maximize2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-white/80 hover:bg-white"
                    onClick={() => setShowShareDialog(true)}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="bg-white/80 hover:bg-white" onClick={downloadImage}>
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-white/80 hover:bg-white"
                    onClick={() => addToComparison(productId)}
                  >
                    <Plus className="h-4 w-4" />
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
          </TabsContent>

          {/* 360° View Tab */}
          {product360 && (
            <TabsContent value="360" className="mt-4">
              <Card className="relative overflow-hidden">
                <div
                  className="relative aspect-square cursor-grab active:cursor-grabbing select-none"
                  onMouseDown={handle360MouseDown}
                  onMouseMove={handle360MouseMove}
                  onMouseUp={handle360MouseUp}
                  onMouseLeave={handle360MouseUp}
                >
                  <Image
                    src={
                      product360.images[current360Frame] ||
                      `/placeholder.svg?height=600&width=600&text=360+View+${productName}`
                    }
                    alt={`${productName} - 360° View Frame ${current360Frame}`}
                    fill
                    className="object-cover pointer-events-none"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = `/placeholder.svg?height=600&width=600&text=360+View+${encodeURIComponent(productName)}`
                    }}
                    onLoad={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.opacity = "1"
                    }}
                    style={{ opacity: 0, transition: "opacity 0.3s ease-in-out" }}
                  />

                  {/* 360° Controls */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-full">
                    <div className="flex items-center space-x-3">
                      <RotateCw className="h-4 w-4" />
                      <span className="text-sm">Drag to rotate • {Math.round(rotation360)}°</span>
                    </div>
                  </div>

                  {/* Rotation Slider */}
                  <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-64">
                    <Slider
                      value={[rotation360]}
                      onValueChange={(value) => setRotation360(value[0])}
                      max={360}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </div>
              </Card>
            </TabsContent>
          )}

          {/* Videos Tab */}
          {videos.length > 0 && (
            <TabsContent value="videos" className="mt-4">
              <Card className="relative overflow-hidden">
                <div className="relative aspect-video">
                  <video
                    ref={videoRef}
                    src={videos[currentVideoIndex]?.url || "/placeholder-video.mp4"}
                    poster={videos[currentVideoIndex]?.thumbnail}
                    className="w-full h-full object-cover"
                    onPlay={() => setIsVideoPlaying(true)}
                    onPause={() => setIsVideoPlaying(false)}
                  />

                  {/* Video Controls */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/20">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="bg-white/80 hover:bg-white w-16 h-16"
                      onClick={toggleVideoPlay}
                    >
                      {isVideoPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
                    </Button>
                  </div>

                  {/* Video Bottom Controls */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="bg-white/80 hover:bg-white"
                        onClick={toggleVideoMute}
                      >
                        {isVideoMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                      </Button>
                      <span className="text-white text-sm bg-black/50 px-2 py-1 rounded">
                        {videos[currentVideoIndex]?.duration}
                      </span>
                    </div>
                    <span className="text-white text-sm bg-black/50 px-2 py-1 rounded">
                      {videos[currentVideoIndex]?.title}
                    </span>
                  </div>
                </div>

                {/* Video Thumbnails */}
                {videos.length > 1 && (
                  <div className="p-4 flex space-x-2 overflow-x-auto">
                    {videos.map((video, index) => (
                      <button
                        key={video.id}
                        className={`relative flex-shrink-0 w-24 h-16 rounded overflow-hidden border-2 transition-all ${
                          index === currentVideoIndex
                            ? "border-pink-500 ring-2 ring-pink-200"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setCurrentVideoIndex(index)}
                      >
                        <Image
                          src={video.thumbnail || "/placeholder.svg?height=64&width=96"}
                          alt={video.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Play className="h-4 w-4 text-white drop-shadow-lg" />
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </Card>
            </TabsContent>
          )}

          {/* AR Try-On Tab */}
          <TabsContent value="ar" className="mt-4">
            <Card className="p-8 text-center">
              <div className="space-y-6">
                <div className="w-24 h-24 mx-auto bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Smartphone className="h-12 w-12 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Try Before You Buy</h3>
                  <p className="text-gray-600 mb-6">
                    Experience {productName} in augmented reality. See how it looks on you or in your space.
                  </p>
                </div>
                <div className="space-y-4">
                  <Button
                    onClick={handleARTryOn}
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-3 text-lg font-semibold"
                  >
                    <Smartphone className="h-5 w-5 mr-2" />
                    Launch AR Try-On
                  </Button>
                  <p className="text-sm text-gray-500">Works best on mobile devices with camera access</p>
                </div>

                {/* AR Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-2">
                      <Eye className="h-6 w-6 text-blue-600" />
                    </div>
                    <h4 className="font-medium">Virtual Fitting</h4>
                    <p className="text-sm text-gray-600">See how it fits</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-2">
                      <RotateCw className="h-6 w-6 text-green-600" />
                    </div>
                    <h4 className="font-medium">360° Preview</h4>
                    <p className="text-sm text-gray-600">View from all angles</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-2">
                      <Share2 className="h-6 w-6 text-purple-600" />
                    </div>
                    <h4 className="font-medium">Share & Save</h4>
                    <p className="text-sm text-gray-600">Capture your look</p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Thumbnail Navigation */}
        {activeTab === "images" && images.length > 1 && (
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
                  src={image.url || `/placeholder.svg?height=80&width=80&text=${encodeURIComponent(image.type)}`}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = `/placeholder.svg?height=80&width=80&text=${encodeURIComponent(image.type)}`
                  }}
                  onLoad={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.opacity = "1"
                  }}
                  style={{ opacity: 0, transition: "opacity 0.3s ease-in-out" }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs px-1 py-0.5 text-center">
                  {image.type}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Social Share Dialog */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share {productName}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={() => shareToSocial("facebook")}
                className="flex items-center space-x-2"
              >
                <Facebook className="h-4 w-4 text-blue-600" />
                <span>Facebook</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => shareToSocial("twitter")}
                className="flex items-center space-x-2"
              >
                <Twitter className="h-4 w-4 text-blue-400" />
                <span>Twitter</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => shareToSocial("instagram")}
                className="flex items-center space-x-2"
              >
                <Instagram className="h-4 w-4 text-pink-600" />
                <span>Instagram</span>
              </Button>
              <Button variant="outline" onClick={() => shareToSocial("copy")} className="flex items-center space-x-2">
                <Copy className="h-4 w-4" />
                <span>Copy Link</span>
              </Button>
            </div>
            <div className="pt-4 border-t">
              <p className="text-sm text-gray-600 mb-2">Direct Link:</p>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={window.location.href}
                  readOnly
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-50"
                />
                <Button size="sm" onClick={() => shareToSocial("copy")}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Comparison Tool */}
      {comparisonProducts.length > 0 && (
        <div className="fixed bottom-4 right-4 z-40">
          <Card className="p-4 bg-white shadow-lg">
            <div className="flex items-center space-x-3">
              <ArrowLeftRight className="h-5 w-5 text-pink-600" />
              <span className="text-sm font-medium">{comparisonProducts.length} item(s) to compare</span>
              <Button size="sm" onClick={() => setShowComparison(true)} className="bg-pink-600 hover:bg-pink-700">
                Compare
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          <div className="relative w-full h-full max-w-6xl max-h-6xl p-4">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 text-white"
              onClick={() => setIsFullscreen(false)}
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
          </div>
        </div>
      )}
    </>
  )
}
