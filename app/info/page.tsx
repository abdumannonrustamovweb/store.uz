export default function InfoPage() {
  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Ma'lumotlar</h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Cowboy haqida</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Cowboy - bu an'anaviy g'arb uslubidagi mahsulotlar do'koni. Biz eng yaxshi sifatli cowboy kiyimlari,
              aksessuarlari va jihozlarini taklif etamiz. Bizning maqsadimiz - har bir mijozga haqiqiy kowboy ruhini his
              qilish imkoniyatini berish.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Bizning xizmatlarimiz</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Yuqori sifat</h3>
                <p className="text-muted-foreground">
                  Barcha mahsulotlarimiz eng yaxshi materiallardan tayyorlangan va sifat nazoratidan o'tgan.
                </p>
              </div>

              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Tez yetkazib berish</h3>
                <p className="text-muted-foreground">Buyurtmalaringizni tez va xavfsiz yetkazib beramiz.</p>
              </div>

              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-semibold mb-2">24/7 qo'llab-quvvatlash</h3>
                <p className="text-muted-foreground">
                  Har qanday savol yoki muammo bo'lsa, biz doimo yordamga tayyormiz.
                </p>
              </div>

             
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Bizning tariximiz</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Cowboy do'koni bugungi kunga qadar minglab mijozlarga xizmat ko'rsatib
              kelmoqda. Biz an'anaviy kovboy madaniyatini zamonaviy uslub bilan uyg'unlashtirish orqali noyob
              mahsulotlar yaratamiz.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
