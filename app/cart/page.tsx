"use client"

import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useCartStore } from "@/lib/cart-store"
import { useAuthStore } from "@/lib/auth-store"

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotalPrice } = useCartStore()
  const { isAuthenticated } = useAuthStore()
  const totalPrice = getTotalPrice()

  if (items.length === 0) {
    return (
      <div className="container py-16">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 space-y-4">
            <ShoppingBag className="h-16 w-16 text-muted-foreground" />
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-semibold">{"Your cart is empty"}</h2>
              <p className="text-muted-foreground">{"Add some products to get started"}</p>
            </div>
            <Button asChild>
              <Link href="/">{"Continue Shopping"}</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">{"Shopping Cart"}</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="relative h-24 w-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between gap-4">
                      <Link href={`/product/${item.id}`} className="font-medium hover:underline line-clamp-2">
                        {item.title}
                      </Link>
                      <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)} className="flex-shrink-0">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <p className="text-sm text-muted-foreground capitalize">{item.category}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 bg-transparent"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-12 text-center font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 bg-transparent"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      <p className="text-lg font-bold">
                        {"$"}
                        {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-semibold">{"Order Summary"}</h2>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{"Subtotal"}</span>
                  <span className="font-medium">
                    {"$"}
                    {totalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{"Shipping"}</span>
                  <span className="font-medium">{"FREE"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{"Tax"}</span>
                  <span className="font-medium">
                    {"$"}
                    {(totalPrice * 0.08).toFixed(2)}
                  </span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between text-lg font-bold">
                <span>{"Total"}</span>
                <span>
                  {"$"}
                  {(totalPrice * 1.08).toFixed(2)}
                </span>
              </div>
            </CardContent>

            <CardFooter className="p-6 pt-0 flex flex-col gap-2">
              {isAuthenticated ? (
                <Button asChild className="w-full" size="lg">
                  <Link href="/checkout">{"Proceed to Checkout"}</Link>
                </Button>
              ) : (
                <>
                  <Button asChild className="w-full" size="lg">
                    <Link href="/login?redirect=/checkout">{"Login to Checkout"}</Link>
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className="font-semibold text-primary hover:underline">
                      Register here
                    </Link>
                  </p>
                </>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
