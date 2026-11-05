import { useT, useMessages } from "@/i18n";
import { HeroSlide } from "./HeroSlide";
import { SlideProgress } from "./SlideProgress";
import { useAutoplay } from "./useAutoplay";
import "./HeroSlider.css";

const SLIDE_SECONDS = 6;

/**
 * Bosh sahifa slayderi (dizayn: «HeroSlider», 4 slayd). Matnlar statik — lug'at: home.hero.slides.
 * Slaydlar bitta grid katakda ustma-ust turadi — balandlik eng uzun slaydga teng, sakramaydi.
 */
export function HeroSlider() {
  const t = useT();
  const slides = useMessages("home.hero.slides", []);
  const { index, goTo, next, prev, autoplay, paused, containerProps } = useAutoplay(slides.length);
  const active = slides[index];

  if (!slides.length) return null;

  return (
    <section
      className="hero-slider"
      aria-roledescription="carousel"
      aria-label={t("home.hero.label")}
      style={{ "--slide-duration": `${SLIDE_SECONDS}s` }}
      {...containerProps}
    >
      <div className="hero-slider-slides">
        {slides.map((slide, i) => (
          <HeroSlide key={slide.tab} slide={slide} index={i} total={slides.length} active={i === index} />
        ))}
      </div>

      <SlideProgress
        slides={slides}
        index={index}
        autoplay={autoplay}
        paused={paused}
        onSelect={goTo}
        onNext={next}
        onPrev={prev}
        onCycleEnd={next}
      />

      {/* Avtomatik o'tishda e'lon qilinmaydi (bezovta qilmasin), foydalanuvchi boshqarganda — o'qiladi */}
      <p className="visually-hidden" aria-live={autoplay && !paused ? "off" : "polite"}>
        {t("home.hero.status", { current: index + 1, total: slides.length, title: active.title })}
      </p>
    </section>
  );
}
