"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
}

export interface CartItem extends Product {
  quantity: number
}

interface AppContextType {
  products: Product[]
  cart: CartItem[]
  addProduct: (product: Omit<Product, "id">) => void
  updateProduct: (id: string, product: Omit<Product, "id">) => void
  deleteProduct: (id: string) => void
  addToCart: (product: Product) => void
  removeFromCart: (id: string) => void
  updateCartQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotalPrice: () => number
  getTotalItems: () => number
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([])
  const [cart, setCart] = useState<CartItem[]>([])

  // LocalStorage dan ma'lumotlarni yuklash
  useEffect(() => {
    const savedProducts = localStorage.getItem("cowboy-products")
    const savedCart = localStorage.getItem("cowboy-cart")

    if (savedProducts) {
      setProducts(JSON.parse(savedProducts))
    }

    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  // Mahsulotlarni localStorage ga saqlash
  useEffect(() => {
    localStorage.setItem("cowboy-products", JSON.stringify(products))
  }, [products])

  // Korzinkani localStorage ga saqlash
  useEffect(() => {
    localStorage.setItem("cowboy-cart", JSON.stringify(cart))
  }, [cart])

  const addProduct = (product: Omit<Product, "id">) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
    }
    setProducts((prev) => [...prev, newProduct])
  }

  const updateProduct = (id: string, updatedProduct: Omit<Product, "id">) => {
    setProducts((prev) => prev.map((product) => (product.id === id ? { ...updatedProduct, id } : product)))
  }

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== id))
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === product.id)
      if (existingItem) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  const updateCartQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }
    setCart((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const clearCart = () => {
    setCart([])
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <AppContext.Provider
      value={{
        products,
        cart,
        addProduct,
        updateProduct,
        deleteProduct,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}
