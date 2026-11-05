import { Link } from "react-router";
import { routes } from "@/shared/config";
import { useLocale } from "@/shared/i18n";
import { formatDate } from "@/shared/lib";
import { CoverArt } from "@/shared/ui";
import styles from "./PostCard.module.css";

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
    <article className={styles.root}>
      <Link to={routes.post(post.slug, lang)} className={styles.link}>
        <CoverArt
          image={post.coverImage}
          tone={art.tone}
          icon={showIcon ? art.icon : undefined}
          className={styles.cover}
        />
        <p className={styles.meta}>
          {post.category?.name} ·{" "}
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, lang)}</time>
        </p>
        <Heading className={styles.title}>{post.title}</Heading>
      </Link>
    </article>
  );
}
