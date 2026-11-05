import { PostCard, usePosts } from "@/entities/post";
import { routes } from "@/shared/config";
import { useLocale, useT } from "@/shared/i18n";
import { Button, SectionHeading, Skeleton } from "@/shared/ui";
import styles from "./BlogPreview.module.css";

/** Bosh sahifadagi «Blog» bloki — so'nggi 3 ta maqola. Maqola bo'lmasa yoki xato — blok ko'rinmaydi. */
export function BlogPreview() {
  const t = useT();
  const lang = useLocale();
  const { data, isPending, isError } = usePosts(lang, { pageSize: 3 });
  const posts = data?.data ?? [];

  if (isError || (!isPending && !posts.length)) return null;

  return (
    <section className={styles.root}>
      <div className="container">
        <div className={styles.head}>
          <SectionHeading eyebrow={t("home.blog.eyebrow")} title={t("home.blog.title")} />
          <Button variant="secondary" size="lg" iconRight="arrow-right" to={routes.blog(lang)}>
            {t("home.blog.all")}
          </Button>
        </div>
        <ul className={styles.grid}>
          {isPending
            ? Array.from({ length: 3 }, (_, i) => (
                <li key={i} className={styles.skeleton}>
                  <Skeleton className={styles.skeletonCover} />
                  <Skeleton className={styles.skeletonLine} />
                  <Skeleton className={styles.skeletonLine} />
                </li>
              ))
            : posts.map((post) => (
                <li key={post.id}>
                  <PostCard post={post} showIcon={false} />
                </li>
              ))}
        </ul>
      </div>
    </section>
  );
}
