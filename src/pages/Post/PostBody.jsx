// Maqola matni — backend'dan tayyor HTML. Shunday chiqariladi:
//   <div className="post-body" dangerouslySetInnerHTML={{ __html: html }} />
// Ichidagi h2, p, blockquote, ul teglarini PostPage.css'da .post-body orqali bezaysiz
export function PostBody({ html }) {
  return <div className="post-body"></div>;
}
