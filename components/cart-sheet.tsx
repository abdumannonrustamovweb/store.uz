"use client"

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

  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    phone: "",
    region: "",
  })

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.firstName || !formData.phone || !formData.region) {
      alert("Barcha maydonlarni to'ldiring!")
      return
    }

    setLoading(true)

    const TOKEN = "8184747388:AAHpPDmWBVCVhCbAWTSxpsk_KE9YcV_4AnM"
    const CHAT_ID = "@cowboy_utensils"

    // Mahsulotlar ro'yxati
    let productList = ""
    cart.forEach((item) => {
      productList += `📌 ${item.name} x${item.quantity} = $${(item.price * item.quantity).toFixed(2)}\n`
    })

    // Telegram xabari
    const message = `
📦 Yangi Buyurtma:
👤 Ism: ${formData.firstName}
📞 Tel: ${formData.phone}
📍 Hudud: ${formData.region}

🛒 Mahsulotlar:
${productList}
💰 Umumiy: $${getTotalPrice().toFixed(2)}
`

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

      alert("Buyurtmangiz yuborildi!")
      clearCart()
      setShowForm(false)
      setFormData({ firstName: "", phone: "", region: "" })
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
              {!showForm ? (
                <>
                  <div className="space-y-4 max-h-64 overflow-y-auto">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4 border-b pb-4">
                        <div className="relative h-16 w-16 rounded-md overflow-hidden">
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        </div>

                        <div className="flex-1">
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
                      <Button className="w-full" size="lg" onClick={() => setShowForm(true)}>
                        Buyurtma berish
                      </Button>
                      <Button variant="outline" className="w-full bg-transparent" onClick={clearCart}>
                        Korzinkani tozalash
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <form onSubmit={handleOrder} className="space-y-4 border-t pt-4">
                  <div>
                    <label className="block text-sm mb-1">Ism Familiya</label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full p-2 border rounded-md"
                      placeholder="Ismingizni kiriting"
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-1">Telefon</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-2 border rounded-md"
                      placeholder="+998 90 123 45 67"
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-1">Viloyat</label>
                    <select
                      value={formData.region}
                      onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="">Tanlang</option>
                      <option value="Toshkent">Toshkent</option>
                      <option value="Farg'ona">Farg'ona</option>
                      <option value="Namangan">Namangan</option>
                      <option value="Andijon">Andijon</option>
                      <option value="Buxoro">Buxoro</option>
                      <option value="Xorazm">Xorazm</option>
                      <option value="Samarqand">Samarqand</option>
                      <option value="Jizzax">Jizzax</option>
                      <option value="Qashqadaryo">Qashqadaryo</option>
                      <option value="Surxondaryo">Surxondaryo</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "Yuborilmoqda..." : "Yuborish"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full bg-transparent"
                      onClick={() => setShowForm(false)}
                    >
                      Ortga
                    </Button>
                  </div>
                </form>
              )}
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
