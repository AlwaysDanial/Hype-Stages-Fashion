"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Smartphone, Camera, RotateCw, Share2, X, Loader2, CheckCircle, AlertCircle } from "lucide-react"

interface ARIntegrationProps {
  productId: string
  productName: string
  productModel?: string
  onClose?: () => void
}

export function ARIntegration({ productId, productName, productModel, onClose }: ARIntegrationProps) {
  const [isARActive, setIsARActive] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasCamera, setHasCamera] = useState(false)
  const [arSupported, setARSupported] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    checkARSupport()
    checkCameraAccess()
  }, [])

  const checkARSupport = () => {
    // Check for WebXR support
    if ("xr" in navigator) {
      // @ts-ignore
      navigator.xr
        .isSessionSupported("immersive-ar")
        .then((supported: boolean) => {
          setARSupported(supported)
        })
        .catch(() => {
          setARSupported(false)
        })
    } else {
      // Fallback: Check for basic camera and device orientation support
      setARSupported(
        "mediaDevices" in navigator && "getUserMedia" in navigator.mediaDevices && "DeviceOrientationEvent" in window,
      )
    }
  }

  const checkCameraAccess = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices()
      const hasVideoInput = devices.some((device) => device.kind === "videoinput")
      setHasCamera(hasVideoInput)
    } catch (err) {
      setHasCamera(false)
    }
  }

  const startARSession = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Request camera access
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment", // Use back camera
        },
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
        setIsARActive(true)
      }

      // Simulate AR model loading
      setTimeout(() => {
        setIsLoading(false)
      }, 2000)
    } catch (err) {
      setError("Camera access denied or not available")
      setIsLoading(false)
    }
  }

  const stopARSession = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
      videoRef.current.srcObject = null
    }
    setIsARActive(false)
  }

  const captureARPhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current
      const video = videoRef.current
      const ctx = canvas.getContext("2d")

      if (ctx) {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        ctx.drawImage(video, 0, 0)

        // Convert to blob and download
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob)
              const link = document.createElement("a")
              link.href = url
              link.download = `${productName}-ar-try-on.jpg`
              link.click()
              URL.revokeObjectURL(url)
            }
          },
          "image/jpeg",
          0.9,
        )
      }
    }
  }

  const shareARExperience = () => {
    if (navigator.share) {
      navigator.share({
        title: `Try ${productName} in AR`,
        text: `Check out how ${productName} looks in augmented reality!`,
        url: window.location.href,
      })
    } else {
      // Fallback to copy link
      navigator.clipboard.writeText(window.location.href)
      alert("AR experience link copied to clipboard!")
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Smartphone className="h-5 w-5" />
            <span>AR Try-On: {productName}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 relative">
          {!isARActive ? (
            // AR Setup Screen
            <div className="h-full flex items-center justify-center">
              <Card className="w-full max-w-md">
                <CardContent className="p-8 text-center space-y-6">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Smartphone className="h-10 w-10 text-white" />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-2">Ready to Try On?</h3>
                    <p className="text-gray-600 mb-4">Experience {productName} in augmented reality</p>
                  </div>

                  {/* System Requirements */}
                  <div className="space-y-3 text-left">
                    <div className="flex items-center space-x-3">
                      {hasCamera ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-red-500" />
                      )}
                      <span className="text-sm">Camera Access</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      {arSupported ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-red-500" />
                      )}
                      <span className="text-sm">AR Support</span>
                    </div>
                  </div>

                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-600 text-sm">{error}</p>
                    </div>
                  )}

                  <Button
                    onClick={startARSession}
                    disabled={!hasCamera || !arSupported || isLoading}
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Starting AR...
                      </>
                    ) : (
                      <>
                        <Camera className="h-4 w-4 mr-2" />
                        Start AR Try-On
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-gray-500">Works best in good lighting conditions</p>
                </CardContent>
              </Card>
            </div>
          ) : (
            // AR Camera View
            <div className="relative h-full bg-black rounded-lg overflow-hidden">
              <video ref={videoRef} className="w-full h-full object-cover" playsInline muted />

              {/* AR Overlay */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Simulated AR Product Overlay */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-48 h-48 border-2 border-pink-500 border-dashed rounded-lg flex items-center justify-center bg-pink-500/20">
                    <div className="text-center text-white">
                      <RotateCw className="h-8 w-8 mx-auto mb-2 animate-spin" />
                      <p className="text-sm">3D Model Loading...</p>
                    </div>
                  </div>
                </div>

                {/* AR Instructions */}
                <div className="absolute top-4 left-4 right-4">
                  <Badge className="bg-black/50 text-white border-0">
                    Point camera at flat surface • Move device to place product
                  </Badge>
                </div>
              </div>

              {/* AR Controls */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
                  onClick={captureARPhoto}
                >
                  <Camera className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
                  onClick={shareARExperience}
                >
                  <Share2 className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-red-500/80 hover:bg-red-600/80 text-white backdrop-blur-sm"
                  onClick={stopARSession}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Loading Overlay */}
              {isLoading && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Loader2 className="h-8 w-8 mx-auto mb-2 animate-spin" />
                    <p>Loading 3D model...</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Hidden canvas for photo capture */}
          <canvas ref={canvasRef} className="hidden" />
        </div>
      </DialogContent>
    </Dialog>
  )
}
