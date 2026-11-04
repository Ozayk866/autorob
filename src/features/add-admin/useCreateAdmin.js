import { useCreateAdminMutation } from "@/entities/admin";

/**
 * Yangi admin yaratish. Javobdagi `tempPassword` faqat TempPasswordNotice'da bir marta ko'rsatiladi
 * va hech qayerda (state'dan tashqari) saqlanmaydi.
 */
export const useCreateAdmin = () => useCreateAdminMutation();
