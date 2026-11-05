import { useT } from "@/shared/i18n";
import { cn } from "@/shared/lib";
import { Icon } from "@/shared/ui";
import styles from "./SlideProgress.module.css";

const pad = (n) => String(n).padStart(2, "0");

/**
 * Slayder ostidagi tab'lar (01 CRM · 02 ERP …) va ‹ › tugmalari.
 * Faol tab'dagi chiziq `--slide-duration` davomida to'ladi; tugaganda `onCycleEnd` (keyingi slayd).
 * @param {{ slides: { tab: string }[], index: number, autoplay: boolean, paused: boolean,
 *   onSelect: (i: number) => void, onNext: () => void, onPrev: () => void, onCycleEnd: () => void }} props
 */
export function SlideProgress({ slides, index, autoplay, paused, onSelect, onNext, onPrev, onCycleEnd }) {
  const t = useT();

  return (
    <div className={cn("container", styles.root)}>
      <div className={styles.tabs}>
        {slides.map((slide, i) => (
          <button
            key={slide.tab}
            type="button"
            className={cn(styles.tab, i === index && styles.active)}
            aria-current={i === index ? "true" : undefined}
            aria-label={`${i + 1}: ${slide.tab}`}
            onClick={() => onSelect(i)}
          >
            <span className={styles.track}>
              {i === index && (
                <span
                  // key — har slaydda animatsiya boshidan boshlanadi
                  key={index}
                  className={cn(styles.fill, autoplay && styles.running, paused && styles.paused)}
                  onAnimationEnd={onCycleEnd}
                />
              )}
            </span>
            <span className={styles.label}>
              <span className={styles.number}>{pad(i + 1)}</span>
              <span className={styles.name}>{slide.tab}</span>
            </span>
          </button>
        ))}
      </div>

      <div className={styles.arrows}>
        <button type="button" className={styles.arrow} aria-label={t("home.hero.prev")} onClick={onPrev}>
          <Icon name="chevron-left" size={18} />
        </button>
        <button type="button" className={styles.arrow} aria-label={t("home.hero.next")} onClick={onNext}>
          <Icon name="chevron-right" size={18} />
        </button>
      </div>
    </div>
  );
}
