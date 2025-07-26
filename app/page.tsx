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
    
    }
  }, [products.length, addProduct])

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4"> Cowboy Collection</h1>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground mb-4">Hozircha mahsulotlar yo'q</p>
          
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
