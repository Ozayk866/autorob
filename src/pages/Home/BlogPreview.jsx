import { posts as allPosts } from "@/data/posts";
import { routes, useLocale, useT } from "@/i18n";
import { Button, PostCard, SectionHeading } from "@/components";
import "./BlogPreview.css";

/** Bosh sahifadagi «Blog» bloki — so'nggi 3 ta maqola. Maqola bo'lmasa yoki xato — blok ko'rinmaydi. */
export function BlogPreview() {
  const t = useT();
  const lang = useLocale();
  const posts = allPosts.slice(0, 3); // so'nggi 3 ta maqola

  return (
    <section className="blog-preview">
      <div className="container">
        <div className="blog-preview-head">
          <SectionHeading eyebrow={t("home.blog.eyebrow")} title={t("home.blog.title")} />
          <Button variant="secondary" size="lg" iconRight="arrow-right" to={routes.blog(lang)}>
            {t("home.blog.all")}
          </Button>
        </div>
        <ul className="blog-preview-grid">
          {posts.map((post) => (
            <li key={post.id}>
              <PostCard post={post} showIcon={false} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
