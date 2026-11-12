import { PostCard } from "@/components";

// «O'xshash maqolalar» (och kulrang fon) — 3 ta karta. Karta tayyor — PostCard
// Sizning ishingiz: sarlavha, och kulrang fon va .post-related-grid ni 3 ustunli to'r qilish (PostPage.css)
export function PostRelated({ posts }) {
  return (
    <section className="post-related">
      <div className="container">
        {/* sarlavha: «O'xshash maqolalar» */}
        <ul className="post-related-grid">
          {posts.map((post) => (
            <li key={post.id}>
              <PostCard post={post} />
            </li>
          ))} 
        </ul>
      </div> 
    </section>
  );
}
