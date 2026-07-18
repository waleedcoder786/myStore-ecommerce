"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { products } from "@/lib/products"
import { ProductCard } from "@/components/product-card"
import { ProductSlider } from "@/components/product-slider"
import { ArrowRight, Shield, Truck, HeadphonesIcon, Star } from "lucide-react"

export default function HomePage() {
  const featuredProducts = products.slice(0, 8)

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section with Product Slider */}
      <section className="container pt-8">
        <ProductSlider />
      </section>

      {/* Features Section */}
      

      {/* Featured Products Section */}
      <section className="container space-y-8">
        <div className="text-center space-y-3">
          <p className="text-sm font-semibold text-accent uppercase tracking-widest">Curated Selection</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Featured Products</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Discover handpicked items from our premium collection</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center pt-4">
          <Button asChild size="lg" variant="outline">
            <Link href="/shop">
              View All Products <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="container space-y-8">
        <div className="text-center space-y-3">
          <p className="text-sm font-semibold text-accent uppercase tracking-widest">Testimonials</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">What Our Customers Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Trusted by thousands of satisfied shoppers worldwide</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              name: "Sarah Johnson",
              review:
                "Amazing quality products and fast shipping! Highly recommend EliteStore for all your shopping needs.",
              rating: 5,
            },
            {
              name: "Michael Chen",
              review: "Great customer service and the best prices I've found online. Will definitely shop here again!",
              rating: 5,
            },
            {
              name: "Emily Rodriguez",
              review: "Love the variety of products and the website is so easy to use. My new favorite online store!",
              rating: 5,
            },
          ].map((review, index) => (
            <Card key={index}>
              <CardContent className="p-6 space-y-4">
                <div className="flex gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{review.review}</p>
                <p className="font-semibold">{review.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container">
        <Card className="bg-accent text-accent-foreground border-0 shadow-lg">
          <CardContent className="p-12 md:p-16 text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Explore Our Collection</h2>
            <p className="text-base md:text-lg opacity-95 max-w-2xl mx-auto">
              Curated premium products with fast shipping and exceptional customer service
            </p>
            <Button size="lg" variant="secondary" asChild className="mt-6 font-semibold">
              <Link href="/shop">Start Shopping</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
