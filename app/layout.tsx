import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MyStore ecommerce",
  description: "Shop the latest phones, clothing, electronics, and more",
  generator: "Waleed Ahmad",
    icons: {
    icon: "https://t3.ftcdn.net/jpg/15/48/15/08/360_F_1548150867_yVM1AqzJfcDmkyoUXNJsz6FlmjIpPfM9.jpg",
    shortcut: "https://t3.ftcdn.net/jpg/15/48/15/08/360_F_1548150867_yVM1AqzJfcDmkyoUXNJsz6FlmjIpPfM9.jpg",
    apple: "https://t3.ftcdn.net/jpg/15/48/15/08/360_F_1548150867_yVM1AqzJfcDmkyoUXNJsz6FlmjIpPfM9.jpg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`font-sans antialiased bg-background text-foreground`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <Header />
          <main className="min-h-[calc(100vh-4rem)] px-10 md:px-6 lg:px-8">{children}</main>
          <Footer />
          <Toaster />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
