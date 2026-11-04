import { Navigate, useLocation } from "react-router";
import { routes } from "@/shared/config";
import { Spinner } from "@/shared/ui";
import { useMe } from "./useMe";

/**
 * Kirmagan → /admin/login (qaytish manzili state.from'da).
 * mustChangePassword → /admin/change-password (shu sahifaning o'zidan tashqari).
 * @param {{ allowMustChangePassword?: boolean, children: import("react").ReactNode }} props
 */
export function RequireAuth({ allowMustChangePassword = false, children }) {
  const { data: me, isPending } = useMe();
  const location = useLocation();

  if (isPending) return <Spinner fullPage />;
  if (!me) return <Navigate to={routes.admin.login} replace state={{ from: location }} />;
  if (me.mustChangePassword && !allowMustChangePassword)
    return <Navigate to={routes.admin.changePassword} replace />;
  if (!me.mustChangePassword && allowMustChangePassword) return <Navigate to={routes.admin.root} replace />;
  return children;
}
