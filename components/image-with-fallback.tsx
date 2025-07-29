"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"

interface ImageWithFallbackProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  className?: string
  style?: React.CSSProperties
  fallbackText?: string
  onLoad?: (e: React.SyntheticEvent<HTMLImageElement>) => void
  onError?: (e: React.SyntheticEvent<HTMLImageElement>) => void
}

export function ImageWithFallback({
  src,
  alt,
  width,
  height,
  fill,
  className = "",
  style = {},
  fallbackText,
  onLoad,
  onError,
  ...props
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setHasError(true)
    setIsLoading(false)

    const fallbackUrl = fallbackText
      ? `/placeholder.svg?height=${height || 300}&width=${width || 300}&text=${encodeURIComponent(fallbackText)}`
      : `/placeholder.svg?height=${height || 300}&width=${width || 300}&text=${encodeURIComponent(alt)}`

    setImgSrc(fallbackUrl)

    if (onError) {
      onError(e)
    }
  }

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setIsLoading(false)

    if (onLoad) {
      onLoad(e)
    }
  }

  const imageStyle = {
    opacity: isLoading ? 0 : 1,
    transition: "opacity 0.3s ease-in-out",
    ...style,
  }

  const imageProps = {
    src: imgSrc,
    alt,
    className,
    style: imageStyle,
    onError: handleError,
    onLoad: handleLoad,
    ...props,
  }

  if (fill) {
    return <Image {...imageProps} fill />
  }

  return <Image {...imageProps} width={width} height={height} />
}
