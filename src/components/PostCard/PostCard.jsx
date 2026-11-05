import { Link } from "react-router";
import { routes, useLocale, formatDate } from "@/i18n";
import { CoverArt } from "@/components/CoverArt/CoverArt";
import "./PostCard.css";

// Rasm yo'q maqolalar uchun — kategoriya bo'yicha rang va ikonka (dizayndagidek)
const CATEGORY_ART = {
  crm: { tone: "blue", icon: "users" },
  erp: { tone: "teal", icon: "layers" },
  robotlashtirish: { tone: "slate", icon: "bot" },
  "ishlab-chiqarish": { tone: "indigo", icon: "factory" },
  talim: { tone: "sky", icon: "graduation-cap" },
};
const DEFAULT_ART = { tone: "blue", icon: "send" };

/**
 * Maqola kartasi: muqova, «Kategoriya · sana», sarlavha. Butun karta — bitta havola.
 * @param {{ post: import("../api").PostListItem, showIcon?: boolean, headingLevel?: "h2" | "h3" }} props
 * showIcon — gradient ustida ikonka (blog sahifasi); bosh sahifada — faqat gradient
 */
export function PostCard({ post, showIcon = true, headingLevel: Heading = "h3" }) {
  const lang = useLocale();
  const art = CATEGORY_ART[post.category?.slug] ?? DEFAULT_ART;

  return (
    <article className="post-card">
      <Link to={routes.post(post.slug, lang)} className="post-card-link">
        <CoverArt
          image={post.coverImage}
          tone={art.tone}
          icon={showIcon ? art.icon : undefined}
          className="post-card-cover"
        />
        <p className="post-card-meta">
          {post.category?.name} ·{" "}
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, lang)}</time>
        </p>
        <Heading className="post-card-title">{post.title}</Heading>
      </Link>
    </article>
  );
}
