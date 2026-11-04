import { Navigate, useLocation } from "react-router";
import { routes } from "@/shared/config";
import { Spinner } from "@/shared/ui";
import { useMe } from "./useMe";

/** Faqat kirmagan foydalanuvchi uchun (login sahifasi). Kirgan bo'lsa — kelgan joyiga yoki /admin ga. */
export function GuestOnly({ children }) {
  const { data: me, isPending } = useMe();
  const location = useLocation();

  if (isPending) return <Spinner fullPage />;
  if (me) {
    if (me.mustChangePassword) return <Navigate to={routes.admin.changePassword} replace />;
    return <Navigate to={location.state?.from?.pathname ?? routes.admin.root} replace />;
  }
  return children;
}
