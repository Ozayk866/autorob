// «Tanlangan maqola» — katta karta: chapda rasm, o'ngda sarlavha, matn, kategoriya · sana · daqiqa, «O'qish →»

import { CoverArt } from "@/components";

// post.title, post.excerpt, post.category.name, post.publishedAt, post.readingMinutes, post.coverImage, post.slug
export function BlogFeatured({ post }) {
  if (!post) return null;

  return <article className="blog-featured">
    <div className="container">
      <div className="blog-wrapper">
        <CoverArt className="img_u" icon={post.coverImage}/>
        <li className="list">
          <h1 className="h1_u">{post.title}</h1>
          <p className="p_u">{post.excerpt}</p>
          <p className="p_u2">{post.category.name} · {post.publishedAt} · {post.readingMinutes}</p>
          <a className="a_u" href={post.slug}>O'qish</a>
        </li>
      </div>
    </div>
  </article>;
}
