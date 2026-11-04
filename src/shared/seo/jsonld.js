import { env } from "@/shared/config/env";

// Sahifada: <script type="application/ld+json">{JSON.stringify(organizationLd())}</script>

export const organizationLd = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AUTOROB",
  url: env.VITE_SITE_URL,
  logo: `${env.VITE_SITE_URL}/favicon.svg`,
});

/** @param {{ name: string, url: string }[]} items */
export const breadcrumbLd = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: item.url,
  })),
});

// TODO: post entity tayyor bo'lgach maydonlarni moslash
export const articleLd = (post) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: post.title,
  datePublished: post.publishedAt,
  image: post.cover?.url,
});
