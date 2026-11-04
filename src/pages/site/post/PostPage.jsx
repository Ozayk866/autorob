import { Seo } from "@/shared/seo";

/** TODO: /blog/:slug — maqola (body — backend tozalagan HTML), Article JSON-LD, Seo type="article" */
export function PostPage() {
  return (
    <>
      <Seo />
      <div data-page="post" />
    </>
  );
}
