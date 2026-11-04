import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getFaqItems,
  getFaqItemsAdmin,
  getFaqItemAdmin,
  createFaqItem,
  updateFaqItem,
  deleteFaqItem,
} from "./api";

export const faqItemKeys = {
  all: ["faq"],
  list: (lang, filters = {}) => [...faqItemKeys.all, "list", lang, filters],
  adminList: () => [...faqItemKeys.all, "admin", "list"],
  adminDetail: (id) => [...faqItemKeys.all, "admin", "detail", id],
};

// Query options — route loader'larda ham ishlatiladi: queryClient.ensureQueryData(faqItemsQuery(lang))
export const faqItemsQuery = (lang, filters) => ({
  queryKey: faqItemKeys.list(lang, filters),
  queryFn: () => getFaqItems(lang, filters),
});

export const useFaqItems = (lang, filters) => useQuery(faqItemsQuery(lang, filters));

export const useFaqItemsAdmin = () =>
  useQuery({ queryKey: faqItemKeys.adminList(), queryFn: getFaqItemsAdmin });
export const useFaqItemAdmin = (id) =>
  useQuery({
    queryKey: faqItemKeys.adminDetail(id),
    queryFn: () => getFaqItemAdmin(id),
    enabled: Boolean(id),
  });

function useInvalidate() {
  const qc = useQueryClient();
  return () => qc.invalidateQueries({ queryKey: faqItemKeys.all });
}

export function useCreateFaqItem() {
  return useMutation({ mutationFn: createFaqItem, onSuccess: useInvalidate() });
}

export function useUpdateFaqItem() {
  return useMutation({
    mutationFn: ({ id, ...body }) => updateFaqItem(id, body),
    onSuccess: useInvalidate(),
  });
}

export function useDeleteFaqItem() {
  return useMutation({ mutationFn: deleteFaqItem, onSuccess: useInvalidate() });
}
