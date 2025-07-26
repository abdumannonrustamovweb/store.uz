"use client"

import type React from "react"
import { useState } from "react"
import { useApp } from "@/app/context/app-context"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Minus, Plus, Trash2 } from "lucide-react"
import Image from "next/image"

interface CartSheetProps {
  children: React.ReactNode
}

export function CartSheet({ children }: CartSheetProps) {
  const { cart, updateCartQuantity, removeFromCart, getTotalPrice, clearCart } = useApp()
  const [loading, setLoading] = useState(false)

  const handleOrder = async () => {
    if (cart.length === 0) {
      alert("Korzinka bo'sh!")
      return
    }

    const firstName = prompt("Ismingizni kiriting:")
    const phone = prompt("Telefon raqamingizni kiriting (+998 ...):")
    const region = prompt("Qaysi viloyatga yetkazib berish kerak?")

    if (!firstName || !phone || !region) {
      alert("Barcha ma'lumotlarni to'ldiring!")
      return
    }

    setLoading(true)

    const token = "YOUR_BOT_TOKEN" // ✅ Bu yerga bot tokeningizni qo'ying
    const chat_id = "@YOUR_CHANNEL_OR_CHAT_ID" // ✅ Kanal username yoki chat ID

    // 1️⃣ Mahsulotlar ro'yxati
    let productList = ""
    cart.forEach((item) => {
      productList += `📌 ${item.name} x${item.quantity} = $${(item.price * item.quantity).toFixed(2)}\n`
    })

    // 2️⃣ Umumiy buyurtma ma'lumotlari
    const message = `
📦 Yangi Buyurtma:
👤 Ism: ${firstName}
📞 Tel: ${phone}
📍 Hudud: ${region}

🛒 Mahsulotlar:
${productList}
💰 Umumiy: $${getTotalPrice().toFixed(2)}
`

    // 3️⃣ Telegramga yuborish
    try {
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id,
          text: message,
        }),
      })

      alert("Zakazingiz yuborildi!")
      clearCart()
    } catch (error) {
      alert("Xatolik yuz berdi!")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Korzinka</SheetTitle>
          <SheetDescription>Sizning tanlagan mahsulotlaringiz</SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {cart.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">Korzinka bo'sh</p>
          ) : (
            <>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 border-b pb-4">
                    <div className="relative h-16 w-16 rounded-md overflow-hidden">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium truncate">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-transparent"
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>

                      <span className="w-8 text-center text-sm">{item.quantity}</span>

                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-transparent"
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>

                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive bg-transparent"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Jami:</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>

                <div className="space-y-2">
                  <Button className="w-full" size="lg" onClick={handleOrder} disabled={loading}>
                    {loading ? "Yuborilmoqda..." : "Buyurtma berish"}
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent" onClick={clearCart}>
                    Korzinkani tozalash
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
