import { useLeadModal } from "@/features/lead-form";
import { localizePath, useLocale, useT } from "@/shared/i18n";
import { cn } from "@/shared/lib";
import { Button } from "@/shared/ui";
import styles from "./HeroSlider.module.css";

const TONES = ["blue", "teal", "slate", "indigo"];
const pad = (n) => String(n).padStart(2, "0");

/** Sarlavhadagi `accent` so'zini ko'k rangga bo'yaydi: "Har bir mijoz — nazoratda" → ... <span>nazoratda</span> */
function AccentTitle({ title, accent }) {
  const at = accent ? title.toLowerCase().indexOf(accent.toLowerCase()) : -1;
  if (at < 0) return title;
  return (
    <>
      {title.slice(0, at)}
      <span className={styles.accent}>{title.slice(at, at + accent.length)}</span>
      {title.slice(at + accent.length)}
    </>
  );
}

/**
 * Bitta slayd. Faol bo'lmaganlari ko'rinmaydi va klaviatura/ekran o'quvchidan yashiriladi (`inert`).
 * @param {{ slide: { tab: string, title: string, accent?: string, text: string, image?: string,
 *   secondary?: { label: string, href: string } }, index: number, total: number, active: boolean }} props
 */
export function HeroSlide({ slide, index, total, active }) {
  const t = useT();
  const lang = useLocale();
  const { open } = useLeadModal();
  // Sahifada bitta h1: birinchi slayd sarlavhasi
  const Heading = index === 0 ? "h1" : "h2";

  return (
    <div
      className={cn(styles.slide, styles[TONES[index % TONES.length]], active && styles.active)}
      style={slide.image ? { "--slide-image": `url(${slide.image})` } : undefined}
      role="group"
      aria-roledescription="slide"
      aria-label={`${index + 1} / ${total}`}
      aria-hidden={!active}
      inert={!active}
    >
      <div className={cn("container", styles.content)}>
        <p className={styles.eyebrow}>
          <span className={styles.counter}>
            {pad(index + 1)} / {pad(total)}
          </span>
          <span className={styles.dash} aria-hidden="true" />
          {slide.tab}
        </p>
        <Heading className={styles.title}>
          <AccentTitle title={slide.title} accent={slide.accent} />
        </Heading>
        <p className={styles.text}>{slide.text}</p>
        <div className={styles.actions}>
          <Button size="lg" iconRight="arrow-right" onClick={() => open()}>
            {t("lead.cta")}
          </Button>
          {slide.secondary && (
            <Button size="lg" variant="outline" to={localizePath(slide.secondary.href, lang)}>
              {slide.secondary.label}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
