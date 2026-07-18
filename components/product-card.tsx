"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, ShoppingCart, Heart } from "lucide-react"
import { Card, CardContent, CardFooter } from "./ui/card"
import { Button } from "./ui/button"
import type { Product } from "@/lib/products"
import { useCartStore } from "@/lib/cart-store"
import { useFavoritesStore } from "@/lib/favorites-store"
import { useToast } from "@/hooks/use-toast"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)
  const { isFavorite, toggleFavorite } = useFavoritesStore()
  const { toast } = useToast()
  const [isFav, setIsFav] = useState(false)

  useEffect(() => {
    setIsFav(isFavorite(product.id))
  }, [product.id, isFavorite])

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem(product)
    toast({
      title: "Added to cart",
      description: `${product.title} has been added to your cart.`,
    })
  }

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    toggleFavorite(product.id)
    setIsFav(!isFav)
    toast({
      title: isFav ? "Removed from favorites" : "Added to favorites",
      description: isFav 
        ? `${product.title} removed from wishlist`
        : `${product.title} added to wishlist`,
    })
  }

  return (
    <Link href={`/product/${product.id}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-lg">
        <CardContent className="p-0 mt-[-22px] relative">
          <div className="relative  aspect-square overflow-hidden bg-muted">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
            <button
              onClick={handleToggleFavorite}
              className="absolute top-2 right-2 p-2 rounded-full bg-white/90 dark:bg-slate-900/90 hover:bg-white dark:hover:bg-slate-800 transition-colors"
            >
              <Heart
                className={`h-5 w-5 transition-colors ${
                  isFav ? 'fill-red-500 text-red-500' : 'text-slate-600 dark:text-slate-400'
                }`}
              />
            </button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-3 p-4">
          <div className="flex-1 w-full space-y-2">
            <h3 className="font-medium text-sm line-clamp-2 text-balance">{product.title}</h3>

            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < product.rate ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"
                  }`}
                />
              ))}
              <span className="text-xs text-muted-foreground ml-1">
                {"({count})".replace("{count}", product.count.toString())}
              </span>
            </div>

            <p className="text-lg font-bold">
              {"$"}
              {product.price.toFixed(2)}
            </p>
          </div>

          <Button className="w-full" size="sm" onClick={handleAddToCart}>
            <ShoppingCart className="h-4 w-4 mr-2" />
            {"Add to Cart"}
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}
