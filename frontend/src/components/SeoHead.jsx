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

    let script = document.getElementById("jsonld-seo");
    if (script) {
      script.remove();
    }

    if (jsonLd) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = "jsonld-seo";
      script.text = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      const oldScript = document.getElementById("jsonld-seo");
      if (oldScript) oldScript.remove();
    };
  }, [title, description, canonical, jsonLd]);

  return null;
}
