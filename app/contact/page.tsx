import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ContactPage() {
  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Biz bilan bog'laning</h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="h-5 w-5 mr-2" />
                  Telefon
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg">+998 90 123 45 67</p>
                <p className="text-muted-foreground">Dushanba - Yakshanba: 9:00 - 21:00</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="h-5 w-5 mr-2" />
                  Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg">info@cowboy.uz</p>
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
                <p className="text-lg">Toshkent sh., Chilonzor tumani</p>
                <p className="text-lg">Bunyodkor ko'chasi, 1-uy</p>
                <p className="text-muted-foreground">Metro: Bunyodkor</p>
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
                <div className="space-y-1">
                  <p>Dushanba - Juma: 9:00 - 20:00</p>
                  <p>Shanba: 10:00 - 18:00</p>
                  <p>Yakshanba: 10:00 - 16:00</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Xabar yuborish</CardTitle>
                <CardDescription>Savolingiz bormi? Bizga yozing!</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Ismingiz</label>
                    <input type="text" className="w-full p-3 border rounded-md" placeholder="Ismingizni kiriting" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input type="email" className="w-full p-3 border rounded-md" placeholder="email@example.com" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Telefon</label>
                    <input type="tel" className="w-full p-3 border rounded-md" placeholder="+998 90 123 45 67" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Xabar</label>
                    <textarea rows={4} className="w-full p-3 border rounded-md" placeholder="Xabaringizni yozing..." />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground p-3 rounded-md hover:bg-primary/90 transition-colors"
                  >
                    Xabar yuborish
                  </button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
