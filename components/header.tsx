"use client"

import Link from "next/link"
import { ShoppingCart, User } from "lucide-react"
import { useApp } from "@/app/context/app-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CartSheet } from "./cart-sheet"

export function Header() {
  const { getTotalItems } = useApp()
  const totalItems = getTotalItems()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-primary">🤠 Cowboy</div>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
              Barcha mahsulotlar
            </Link>
            <Link href="/info" className="text-sm font-medium transition-colors hover:text-primary">
              Ma'lumotlar
            </Link>
            <Link href="/contact" className="text-sm font-medium transition-colors hover:text-primary">
              Contact
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <Link href="/admin">
            <Button variant="outline" size="sm">
              <User className="h-4 w-4 mr-2" />
              Admin
            </Button>
          </Link>

          <CartSheet>
            <Button variant="outline" size="sm" className="relative bg-transparent">
              <ShoppingCart className="h-4 w-4" />
              {totalItems > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {totalItems}
                </Badge>
              )}
            </Button>
          </CartSheet>
        </div>
      </div>
    </header>
  )
}
