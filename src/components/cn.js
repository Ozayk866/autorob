/** Klasslarni birlashtiradi: cn("button", active && "button-active") → "button button-active" */
export const cn = (...classes) => classes.filter(Boolean).join(" ");
