import { useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * Tartibni saqlash (optimistic). SortableTable onDragEnd'da yangi id'lar ketma-ketligini beradi.
 *   const reorder = useReorder({ queryKey: solutionKeys.adminList(), reorder: reorderSolutions });
 *   reorder.mutate(ids)
 * @param {{ queryKey: unknown[], reorder: (ids: string[]) => Promise<unknown> }} options
 */
export function useReorder({ queryKey, reorder }) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: reorder,
    onMutate: async (ids) => {
      await qc.cancelQueries({ queryKey });
      const previous = qc.getQueryData(queryKey);
      qc.setQueryData(queryKey, (list = []) =>
        ids.map((id) => list.find((item) => item.id === id)).filter(Boolean),
      );
      return { previous };
    },
    onError: (_error, _ids, ctx) => qc.setQueryData(queryKey, ctx?.previous),
    onSettled: () => qc.invalidateQueries({ queryKey }),
  });
}
