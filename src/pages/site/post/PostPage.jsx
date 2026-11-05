import { useParams } from "react-router";
import { usePost } from "@/entities/post";
import { useLocale } from "@/shared/i18n";
import { Seo } from "@/shared/seo";
import { PostHeader } from "./PostHeader";
import { PostBody } from "./PostBody";
import { PostShare } from "./PostShare";
import { PostRelated } from "./PostRelated";
import "./PostPage.css";

// Maqola sahifasi — topshiriq: docs/tz/word/06_Maqola_Abdulazeez.docx
// Har bo'lim — alohida fayl (shu papkada). Stillar — PostPage.css, klasslar «post-»

export function PostPage() {
  const { slug } = useParams();
  const lang = useLocale();
  const { data: post } = usePost(slug, lang); // bitta maqola — bo'limlarga uzatiladi

  if (!post) return null;

  return (
    <>
      <Seo />
      <PostHeader post={post} />
      <PostBody html={post.body} />
      <PostShare />
      <PostRelated posts={post.related} />
    </>
  );
}
