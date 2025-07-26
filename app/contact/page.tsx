"use client"

import { useState } from "react"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ContactPage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  // Telegram API uchun sozlamalar
  const TOKEN = "8184747388:AAHpPDmWBVCVhCbAWTSxpsk_KE9YcV_4AnM"
  const CHAT_ID = "@cowboy_utensils" // yoki -100 bilan boshlanadigan kanal ID

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)

    const form = e.currentTarget
    const name = (form.elements.namedItem("name") as HTMLInputElement).value
    const phone = (form.elements.namedItem("phone") as HTMLInputElement).value
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value

    const text = `
📩 *Yangi xabar*
👤 Ism: ${name}
📞 Telefon: ${phone}
💬 Xabar: ${message}
`

    try {
      await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: text,
          parse_mode: "Markdown",
        }),
      })

      setSuccess(true)
      form.reset()
    } catch (error) {
      console.error("Telegramga yuborishda xatolik:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Biz bilan bog'laning</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Kontakt ma'lumotlari */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="h-5 w-5 mr-2" />
                  Telefon
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg">+998 90 858 06 85</p>
                <p className="text-muted-foreground">Har kuni 7/24</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="h-5 w-5 mr-2" />
                  Telegram
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg">@cowboy_utensils</p>
                <p className="text-muted-foreground">24 soat ichida javob beramiz</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Manzil
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg">Farg'ona viloyati</p>
                <p className="text-lg">Uchko'prik tumani</p>
                <p className="text-muted-foreground">Begmurod qishlog'i</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Ish vaqti
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Dushanba - Yakshanba: 8:00 - 22:00</p>
              </CardContent>
            </Card>
          </div>

          {/* Forma */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Xabar yuborish</CardTitle>
                <CardDescription>Savolingiz bormi? Bizga yozing!</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Ismingiz</label>
                    <input
                      type="text"
                      name="name"
                      className="w-full p-3 border rounded-md"
                      placeholder="Ismingizni kiriting"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Telefon</label>
                    <input
                      type="tel"
                      name="phone"
                      className="w-full p-3 border rounded-md"
                      placeholder="+998 90 858 06 85"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Xabar</label>
                    <textarea
                      name="message"
                      rows={4}
                      className="w-full p-3 border rounded-md"
                      placeholder="Xabaringizni yozing..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground p-3 rounded-md hover:bg-primary/90 transition-colors"
                    disabled={loading}
                  >
                    {loading ? "Yuborilmoqda..." : "Xabar yuborish"}
                  </button>

                  {success && <p className="text-green-600 mt-2">✅ Xabaringiz yuborildi!</p>}
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
