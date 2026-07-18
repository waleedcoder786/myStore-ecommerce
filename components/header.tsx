'use client'

import { useState } from "react"
import Link from "next/link"
import { ShoppingCart, Package, Search, Heart, LogOut, User } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { useCartStore } from "@/lib/cart-store"
import { useAuthStore } from "@/lib/auth-store"
import { products } from "@/lib/products"

export function Header() {
  const getTotalItems = useCartStore((state) => state.getTotalItems)
  const totalItems = getTotalItems()
  const { user, logout } = useAuthStore()
  const [searchQuery, setSearchQuery] = useState("")
  const [showResults, setShowResults] = useState(false)

  const searchResults = searchQuery.trim()
    ? products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 6)
    : []

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-white/95 dark:bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-900/60 shadow-sm">
      <div className="container flex h-16 items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight shrink-0">
         <div className="flex h-30 w-full items-center justify-center rounded-lg overflow-hidden">
  <img
    src="https://res.cloudinary.com/do3bdamxv/image/upload/v1784348185/ChatGPT_Image_Jul_18_2026_09_05_03_AM_ij8dah.png"
    alt="Logo"
    className="h-full w-full object-cover"
  />
</div>
          {/* <span className="hidden sm:inline text-slate-900 dark:text-white">mystore</span> */}
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setShowResults(true)
              }}
              onFocus={() => setShowResults(true)}
              onBlur={() => setTimeout(() => setShowResults(false), 200)}
              className="w-full px-4 py-2 pr-10 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-slate-400" />
            
            {/* Search Results Dropdown */}
            {showResults && searchQuery && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
                {searchResults.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.id}`}
                    onClick={() => {
                      setSearchQuery("")
                      setShowResults(false)
                    }}
                    className="flex items-center gap-3 p-3 hover:bg-slate-100 dark:hover:bg-slate-700 border-b border-slate-100 dark:border-slate-700 last:border-b-0 transition-colors"
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="h-10 w-10 object-cover rounded"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                        {product.title}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        ${product.price}
                      </p>
                    </div>
                  </Link>
                ))}
                {searchResults.length === 0 && searchQuery && (
                  <div className="p-4 text-center text-sm text-slate-500 dark:text-slate-400">
                    No products found
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <Button variant="ghost" size="sm" asChild className="text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
            <Link href="/">Home</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild className="text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
            <Link href="/shop">Shop</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild className="text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
            <Link href="/about">About</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild className="text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
            <Link href="/contact">Contact</Link>
          </Button>
        </nav>

        {/* Right Actions */}
        <nav className="flex items-center gap-2">
          <ThemeToggle />
          
          <Button variant="ghost" size="icon" asChild className="text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
            <Link href="#wishlist">
              <Heart className="h-5 w-5" />
              <span className="sr-only">Wishlist</span>
            </Link>
          </Button>

          <Button variant="ghost" size="icon" asChild className="text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
            <Link href="/orders">
              <Package className="h-5 w-5" />
              <span className="sr-only">Orders</span>
            </Link>
          </Button>

          <Button variant="ghost" size="icon" asChild className="relative text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-blue-600 text-white">
                  {totalItems}
                </Badge>
              )}
              <span className="sr-only">Shopping cart</span>
            </Link>
          </Button>

          {user ? (
            <>
              <Button variant="ghost" size="sm" asChild className="text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1">
                <Link href="/profile">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline text-xs">{user.name}</span>
                </Link>
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={logout}
                className="text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline text-xs">Logout</span>
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild className="text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
                <Link href="/login">Login</Link>
              </Button>
              <Button size="sm" asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                <Link href="/register">Register</Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
