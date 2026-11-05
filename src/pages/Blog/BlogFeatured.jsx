// «Tanlangan maqola» — katta karta: chapda rasm, o'ngda sarlavha, matn, kategoriya · sana · daqiqa, «O'qish →»
// post.title, post.excerpt, post.category.name, post.publishedAt, post.readingMinutes, post.coverImage, post.slug
export function BlogFeatured({ post }) {
  if (!post) return null;

  return <article className="blog-featured"></article>;
}
