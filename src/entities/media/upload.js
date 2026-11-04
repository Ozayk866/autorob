import { useMutation } from "@tanstack/react-query";
import { api } from "@/shared/api";

/** @typedef {{ id: string, url: string, sizes: { 480: string, 1024: string, 1920: string } }} Media */

/**
 * Rasm yuklash. FormData yuboriladi — client.js Content-Type qo'ymaydi, brauzer boundary'ni o'zi qo'yadi.
 * @param {File} file
 * @returns {Promise<Media>}
 */
export function uploadImage(file) {
  const form = new FormData();
  form.append("file", file);
  return api("/api/admin/media", { method: "POST", body: form });
}

export const useUploadImage = () => useMutation({ mutationFn: uploadImage });

/** <img srcSet={srcSet(media)} sizes="(max-width: 768px) 100vw, 50vw" /> */
export const srcSet = (media) =>
  media?.sizes
    ? Object.entries(media.sizes)
        .map(([w, url]) => `${url} ${w}w`)
        .join(", ")
    : undefined;
