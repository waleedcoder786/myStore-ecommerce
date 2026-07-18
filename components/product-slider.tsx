'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Star, ShoppingCart, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { products } from '@/lib/products'

export function ProductSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  const sliderProducts = products.slice(0, 6)

  useEffect(() => {
    if (!isAutoPlay) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sliderProducts.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [isAutoPlay, sliderProducts.length])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + sliderProducts.length) % sliderProducts.length)
    setIsAutoPlay(false)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % sliderProducts.length)
    setIsAutoPlay(false)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlay(false)
  }

  const currentProduct = sliderProducts[currentIndex]

  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-white dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 shadow-lg">
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slideIn 0.6s ease-out;
        }
      `}</style>

      {/* Slider Container */}
      <div className="relative h-80 sm:h-96 md:h-[520px] lg:h-[600px] flex items-stretch overflow-hidden">
        {/* Product Images - Right Side */}
        <div className="absolute right-0 top-0 w-full h-full md:w-3/5 flex items-center justify-end pr-4 sm:pr-8 md:pr-12">
          {sliderProducts.map((product, index) => (
            <div
              key={product.id}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                index === currentIndex 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-0 scale-105'
              }`}
            >
              <div className="w-full h-full relative flex items-center justify-center">
                <div className="relative w-4/5 h-4/5 max-w-sm max-h-sm">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Content - Left Side */}
        <div className="absolute inset-0 md:w-1/2 flex flex-col items-start justify-center px-6 sm:px-8 md:px-12 py-8 md:py-16 z-20">
          <div className={`space-y-4 sm:space-y-6 w-full ${currentIndex !== null ? 'animate-slide-in' : ''}`}>
            {/* Badge */}
            <div className="flex items-center gap-2 w-fit">
              <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-semibold tracking-wide">
                Featured
              </span>
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
              {currentProduct.title}
            </h2>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.round(currentProduct.rate) 
                        ? 'fill-amber-400 text-amber-400' 
                        : 'text-slate-300 dark:text-slate-600'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                {currentProduct.rate} ({currentProduct.count} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
                ${currentProduct.price.toFixed(2)}
              </span>
            </div>

            {/* Description */}
            <p className="text-base text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed hidden sm:block">
              {currentProduct.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button 
                asChild
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                <Link href={`/product/${currentProduct.id}`}>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Shop Now
                </Link>
              </Button>
              <Button 
                variant="outline"
                className="border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold rounded-lg"
              >
                <Heart className="h-4 w-4 mr-2" />
                Wishlist
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-md hover:shadow-lg"
        aria-label="Previous"
      >
        <ChevronLeft className="h-6 w-6 text-slate-900 dark:text-white" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-md hover:shadow-lg"
        aria-label="Next"
      >
        <ChevronRight className="h-6 w-6 text-slate-900 dark:text-white" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {sliderProducts.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex
                ? 'bg-blue-600 h-2.5 w-8 shadow-md'
                : 'bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500 h-2.5 w-2.5'
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Counter Badge */}
      <div className="absolute bottom-6 right-6 z-30 px-3 py-1.5 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300">
        {currentIndex + 1} / {sliderProducts.length}
      </div>
    </div>
  )
}
