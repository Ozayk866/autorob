import { useStats } from "@/entities/stat";
import { useLocale, useT } from "@/shared/i18n";
import { Skeleton } from "@/shared/ui";
import styles from "./StatsRow.module.css";

/** Hero ostidagi raqamlar (dizayn: «Stats» 1440×161). Ma'lumot — API (admin → Raqamlar). */
export function StatsRow() {
  const lang = useLocale();
  const t = useT();
  const { data: stats, isPending, isError } = useStats(lang);

  // Raqamlar muhim emas — xato bo'lsa yoki bo'sh bo'lsa blok ko'rsatilmaydi
  if (isError || (!isPending && !stats?.length)) return null;

  return (
    <section className={styles.root} aria-label={t("home.stats.label")}>
      <dl className={`container ${styles.grid}`}>
        {isPending
          ? Array.from({ length: 4 }, (_, i) => (
              <div key={i} className={styles.item}>
                <Skeleton className={styles.skeletonValue} />
                <Skeleton className={styles.skeletonLabel} />
              </div>
            ))
          : stats.slice(0, 4).map((stat) => (
              <div key={stat.id} className={styles.item}>
                <dt className={styles.label}>{stat.label}</dt>
                <dd className={styles.value}>{stat.value}</dd>
              </div>
            ))}
      </dl>
    </section>
  );
}
