"use client"

import { useApp } from "./context/app-context"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"

export default function HomePage() {
  const { products, addProduct } = useApp()

  // Demo mahsulotlarni qo'shish (faqat birinchi marta)
  useEffect(() => {
    if (products.length === 0) {
      const demoProducts = [
        {
          name: "Cowboy Hat Classic",
          description: "An'anaviy kovboy shlyapasi, yuqori sifatli materialdan tayyorlangan",
          price: 89.99,
          image: "/placeholder.svg?height=400&width=400",
        },
        {
          name: "Western Boots",
          description: "Haqiqiy teri kovboy etiklari, barcha ob-havo sharoitlari uchun",
          price: 159.99,
          image: "/placeholder.svg?height=400&width=400",
        },
        {
          name: "Denim Jacket",
          description: "Klassik kovboy uslubidagi denim kurtka",
          price: 79.99,
          image: "/placeholder.svg?height=400&width=400",
        },
        {
          name: "Leather Belt",
          description: "Kovboy uslubidagi teri kamar, metall tokali",
          price: 45.99,
          image: "/placeholder.svg?height=400&width=400",
        },
        {
          name: "Bandana Red",
          description: "Klassik qizil bandana, 100% paxta",
          price: 12.99,
          image: "/placeholder.svg?height=400&width=400",
        },
        {
          name: "Cowboy Shirt",
          description: "Kovboy uslubidagi ko'ylak, katak naqshli",
          price: 55.99,
          image: "/placeholder.svg?height=400&width=400",
        },
        {
          name: "Spurs Silver",
          description: "Kumush kovboy mahmuzlari, an'anaviy dizayn",
          price: 34.99,
          image: "/placeholder.svg?height=400&width=400",
        },
        {
          name: "Lasso Rope",
          description: "Professional kovboy arqoni, yuqori sifatli",
          price: 28.99,
          image: "/placeholder.svg?height=400&width=400",
        },
      ]

      demoProducts.forEach((product) => addProduct(product))
    }
  }, [products.length, addProduct])

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">🤠 Cowboy Collection</h1>
        <p className="text-xl text-muted-foreground">Eng yaxshi kovboy mahsulotlari to'plami</p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground mb-4">Hozircha mahsulotlar yo'q</p>
          <Button asChild>
            <a href="/admin">Admin panelga o'tish</a>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
