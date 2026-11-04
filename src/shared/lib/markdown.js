// Blog/yechim matnlari Markdown'da saqlanadi (admin — shared/form/RichTextEditor).
// Saytda: <div dangerouslySetInnerHTML={{ __html: renderMarkdown(text) }} />
// Xavfsizlik: avval butun matn HTML-escape qilinadi, keyin faqat ruxsat etilgan teglar qo'yiladi.

export const escapeHtml = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch],
  );

/**
 * TODO: qo'llab-quvvatlanadigan sintaksis: # / ## / ### sarlavhalar, paragraflar, **qalin**, *kursiv*,
 * [havola](https://…) (faqat http/https), - ro'yxat, 1. ro'yxat, ![rasm](url).
 * @param {string} text
 * @returns {string} xavfsiz HTML
 */
export function renderMarkdown(text) {
  return escapeHtml(text ?? "")
    .split(/\n{2,}/)
    .map((block) => `<p>${block.replace(/\n/g, "<br>")}</p>`)
    .join("");
}
