import { useT } from "@/i18n";
import { cn } from "@/components/cn";
import { Icon } from "@/components";
import "./SlideProgress.css";

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
    <div className="container slide-progress">
      <div className="slide-progress-tabs">
        {slides.map((slide, i) => (
          <button
            key={slide.tab}
            type="button"
            className={cn("slide-progress-tab", i === index && "slide-progress-active")}
            aria-current={i === index ? "true" : undefined}
            aria-label={`${i + 1}: ${slide.tab}`}
            onClick={() => onSelect(i)}
          >
            <span className="slide-progress-track">
              {i === index && (
                <span
                  // key — har slaydda animatsiya boshidan boshlanadi
                  key={index}
                  className={cn(
                    "slide-progress-fill",
                    autoplay && "slide-progress-running",
                    paused && "slide-progress-paused",
                  )}
                  onAnimationEnd={onCycleEnd}
                />
              )}
            </span>
            <span className="slide-progress-label">
              <span className="slide-progress-number">{pad(i + 1)}</span>
              <span className="slide-progress-name">{slide.tab}</span>
            </span>
          </button>
        ))}
      </div>

      <div className="slide-progress-arrows">
        <button
          type="button"
          className="slide-progress-arrow"
          aria-label={t("home.hero.prev")}
          onClick={onPrev}
        >
          <Icon name="chevron-left" size={18} />
        </button>
        <button
          type="button"
          className="slide-progress-arrow"
          aria-label={t("home.hero.next")}
          onClick={onNext}
        >
          <Icon name="chevron-right" size={18} />
        </button>
      </div>
    </div>
  );
}
