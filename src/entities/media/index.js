import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/shared/api";
import { toQuery } from "@/shared/lib";

// Rasmlar — kontrakt §3 (rasm obyekti), §11 (media API). Hammasi WebP, ≤ 5 MB, JPEG/PNG/WebP qabul qilinadi.

/** @typedef {import("@/shared/api/types").Image} Image */

/**
 * Rasm yuklash (FormData). Javob: { id, url, variants, width, height, alt: null, ... }.
 * Keyin kontentga ID orqali biriktiriladi: coverImageId, photoId, logoId …
 * Xatolar: 400 UNSUPPORTED_FILE / INVALID_IMAGE, 413 FILE_TOO_LARGE.
 * @param {File} file
 */
export function uploadImage(file) {
  const form = new FormData();
  form.append("file", file);
  return api("/api/admin/media", { method: "POST", body: form });
}

export const getMediaList = (params) => api("/api/admin/media" + toQuery(params), { withMeta: true });
export const updateMediaAlt = (id, alt) => api(`/api/admin/media/${id}`, { method: "PATCH", body: { alt } });
/** Rasm ishlatilayotgan bo'lsa → 409 IN_USE, error.details.usedIn */
export const deleteMedia = (id) => api(`/api/admin/media/${id}`, { method: "DELETE" });

export const mediaKeys = { all: ["media"], list: (params = {}) => ["media", "list", params] };

export const useUploadImage = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: uploadImage,
    onSuccess: () => qc.invalidateQueries({ queryKey: mediaKeys.all }),
  });
};
export const useMediaList = (params) =>
  useQuery({
    queryKey: mediaKeys.list(params),
    queryFn: () => getMediaList(params),
    placeholderData: keepPreviousData,
  });

/**
 * <img src={image.url} srcSet={srcSet(image)} sizes="(max-width: 768px) 100vw, 33vw"
 *      width={image.width} height={image.height} alt={image.alt} loading="lazy" />
 * @param {Image | null | undefined} image
 */
export const srcSet = (image) =>
  image?.variants
    ? Object.entries(image.variants)
        .map(([w, url]) => `${url} ${w}w`)
        .join(", ")
    : undefined;
