import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getHeroSlides,
  getHeroSlidesAdmin,
  getHeroSlideAdmin,
  createHeroSlide,
  updateHeroSlide,
  deleteHeroSlide,
} from "./api";

export const heroSlideKeys = {
  all: ["hero-slides"],
  list: (lang, filters = {}) => [...heroSlideKeys.all, "list", lang, filters],
  adminList: () => [...heroSlideKeys.all, "admin", "list"],
  adminDetail: (id) => [...heroSlideKeys.all, "admin", "detail", id],
};

// Query options — route loader'larda ham ishlatiladi: queryClient.ensureQueryData(heroSlidesQuery(lang))
export const heroSlidesQuery = (lang, filters) => ({
  queryKey: heroSlideKeys.list(lang, filters),
  queryFn: () => getHeroSlides(lang, filters),
});

export const useHeroSlides = (lang, filters) => useQuery(heroSlidesQuery(lang, filters));

export const useHeroSlidesAdmin = () =>
  useQuery({ queryKey: heroSlideKeys.adminList(), queryFn: getHeroSlidesAdmin });
export const useHeroSlideAdmin = (id) =>
  useQuery({
    queryKey: heroSlideKeys.adminDetail(id),
    queryFn: () => getHeroSlideAdmin(id),
    enabled: Boolean(id),
  });

function useInvalidate() {
  const qc = useQueryClient();
  return () => qc.invalidateQueries({ queryKey: heroSlideKeys.all });
}

export function useCreateHeroSlide() {
  return useMutation({ mutationFn: createHeroSlide, onSuccess: useInvalidate() });
}

export function useUpdateHeroSlide() {
  return useMutation({
    mutationFn: ({ id, ...body }) => updateHeroSlide(id, body),
    onSuccess: useInvalidate(),
  });
}

export function useDeleteHeroSlide() {
  return useMutation({ mutationFn: deleteHeroSlide, onSuccess: useInvalidate() });
}
