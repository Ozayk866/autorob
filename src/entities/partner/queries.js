import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getPartners,
  getPartnersAdmin,
  getPartnerAdmin,
  createPartner,
  updatePartner,
  deletePartner,
} from "./api";

export const partnerKeys = {
  all: ["partners"],
  list: (lang, filters = {}) => [...partnerKeys.all, "list", lang, filters],
  adminList: () => [...partnerKeys.all, "admin", "list"],
  adminDetail: (id) => [...partnerKeys.all, "admin", "detail", id],
};

// Query options — route loader'larda ham ishlatiladi: queryClient.ensureQueryData(partnersQuery(lang))
export const partnersQuery = (lang, filters) => ({
  queryKey: partnerKeys.list(lang, filters),
  queryFn: () => getPartners(lang, filters),
});

export const usePartners = (lang, filters) => useQuery(partnersQuery(lang, filters));

export const usePartnersAdmin = () =>
  useQuery({ queryKey: partnerKeys.adminList(), queryFn: getPartnersAdmin });
export const usePartnerAdmin = (id) =>
  useQuery({
    queryKey: partnerKeys.adminDetail(id),
    queryFn: () => getPartnerAdmin(id),
    enabled: Boolean(id),
  });

function useInvalidate() {
  const qc = useQueryClient();
  return () => qc.invalidateQueries({ queryKey: partnerKeys.all });
}

export function useCreatePartner() {
  return useMutation({ mutationFn: createPartner, onSuccess: useInvalidate() });
}

export function useUpdatePartner() {
  return useMutation({
    mutationFn: ({ id, ...body }) => updatePartner(id, body),
    onSuccess: useInvalidate(),
  });
}

export function useDeletePartner() {
  return useMutation({ mutationFn: deletePartner, onSuccess: useInvalidate() });
}
