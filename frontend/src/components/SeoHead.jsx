import { useEffect } from "react";

export default function SeoHead({
  title,
  description,
  canonical,
  jsonLd = null
}) {
  useEffect(() => {
    document.title = title;

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", description);

    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", canonical);

    document
      .querySelectorAll('script[data-seo-jsonld="true"]')
      .forEach((el) => el.remove());

    if (jsonLd) {
      const items = Array.isArray(jsonLd) ? jsonLd : [jsonLd];

      items.forEach((item, index) => {
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.setAttribute("data-seo-jsonld", "true");
        script.id = `jsonld-seo-${index}`;
        script.text = JSON.stringify(item);
        document.head.appendChild(script);
      });
    }

    return () => {
      document
        .querySelectorAll('script[data-seo-jsonld="true"]')
        .forEach((el) => el.remove());
    };
  }, [title, description, canonical, jsonLd]);

  return null;
}
