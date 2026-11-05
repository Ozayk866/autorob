import { stats } from "@/data/company";
import { useT } from "@/i18n";
import "./StatsRow.css";

/** Hero ostidagi raqamlar (dizayn: «Stats» 1440×161). Ma'lumot — API (admin → Raqamlar). */
export function StatsRow() {
  const t = useT();

  return (
    <section className="stats-row" aria-label={t("home.stats.label")}>
      <dl className="container stats-row-grid">
        {stats.slice(0, 4).map((stat) => (
          <div key={stat.id} className="stats-row-item">
            <dt className="stats-row-label">{stat.label}</dt>
            <dd className="stats-row-value">{stat.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
