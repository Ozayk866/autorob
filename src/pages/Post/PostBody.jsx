// Maqola matni — backend'dan tayyor HTML. Shunday chiqariladi:
//   <div className="post-body" dangerouslySetInnerHTML={{ __html: html }} />
// Ichidagi h2, p, blockquote, ul teglarini PostPage.css'da .post-body orqali bezaysiz
import "./PostBody.css"
export function PostBody({ html }) {
  return <div className="post-body">
    <p className="matn">Ko'pchilik korxonalarda arizalar hali ham daftarga yoki Excel'ga yoziladi. Natijada mijozlarning
bir qismi javobsiz qoladi, menejerlar ishini esa nazorat qilib bo'lmaydi. Quyida CRM'ni og'riqsiz
joriy qilish uchun 5 ta amaliy qadamni ko'rib chiqamiz.</p>

  <h3 className="h31">1. Jarayonni qog'ozda chizing</h3>

  <p className="matn">Ariza qayerdan keladi, kim qabul qiladi, qaysi bosqichlardan o'tadi va qachon yopiladi —
bularni avval oddiy sxema ko'rinishida yozing. CRM shu sxemaning raqamli nusxasi bo'ladi.</p>

  <blockquote>
  Eng yaxshi CRM — jamoa har kuni ishlatadigan CRM. Shuning uchun murakkab emas,
  tushunarli tizimdan boshlang.
</blockquote>

  <h3 className="h32">2. Asosiy kanallarni ulang</h3>
  <ul>
    <li className="li1">Sayt formasi — arizalar avtomatik tushadi</li>
    <li className="li1">Telegram bot va guruhlar</li>
    <li className="li1">Telefoniya — qo'ng'iroqlar yozuvi bilan</li>
  </ul>

  <p className="matn">Qolgan qadamlar: maydonlarni soddalashtirish, jamoani o'qitish va birinchi oy natijalarini tahlil
qilish. Bular haqida batafsil — keyingi maqolalarda.</p>


  </div>;


}
