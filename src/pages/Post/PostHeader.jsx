// Maqola boshi: «Bosh sahifa › Blog › CRM», kategoriya + sana + daqiqa, sarlavha, muallif, muqova
// post.title, post.category.name, post.publishedAt (formatDate), post.readingMinutes, post.authorName, post.coverImage
import "./PostHeader.css"

export function PostHeader({ post }) {
  return <header className="post-header">
    <div className="container">
    <div className="div1">
    <button className="CRM1">CRM</button>
    <p className="vaqt">12 oktabr 2026 · 6 daqiqa o'qish</p>
    </div>

    <div className="div2">
    <h2 className="h22">CRM joriy qilish: ishlab
chiqarish korxonasi uchun 5
qadam</h2>
    </div>

    <div className="div3">
    
    <div className="div4">

    <p className="name">Ism Familiya</p>
    <p className="CRM2">CRM loyihalar rahbari</p>
    </div>
    </div>

    </div>
    
  </header>;
}
