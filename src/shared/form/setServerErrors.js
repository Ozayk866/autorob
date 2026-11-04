import { fieldErrors } from "@/shared/api/errors";

/**
 * Backend validatsiya xatolarini React Hook Form maydonlariga qo'yadi.
 *   onError: (error) => { if (!setServerErrors(form.setError, error)) toast.error(error.message) }
 * `path` nuqtali (`title.uz`, `features.0.uz`) — RHF ham shunday yo'llarni tushunadi.
 * @returns {boolean} hech bo'lmasa bitta maydon xatosi qo'yildimi
 */
export function setServerErrors(setError, error) {
  const errors = fieldErrors(error).filter((e) => e.path);
  errors.forEach(({ path, message }, i) =>
    setError(path, { type: "server", message }, { shouldFocus: i === 0 }),
  );
  return errors.length > 0;
}
