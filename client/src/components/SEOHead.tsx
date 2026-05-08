/**
 * WILLOW TREE FUNERALS — SEO Head Component
 * Injects per-page title, meta description, OG tags, and JSON-LD schema
 */

import { useEffect } from "react";
import { COMPANY } from "../../../shared/company";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  schema?: object;
  ogImage?: string;
}

export default function SEOHead({ title, description, canonical, schema, ogImage }: SEOHeadProps) {
  const fullTitle = title.includes("Willow Tree") ? title : `${title} | Willow Tree Funerals Hurstville`;
  const image = ogImage || COMPANY.assets.heroBg;

  useEffect(() => {
    document.title = fullTitle;

    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    setMeta("description", description);
    setMeta("robots", "index, follow");
    setMeta("og:title", fullTitle, true);
    setMeta("og:description", description, true);
    setMeta("og:image", image, true);
    setMeta("og:type", "website", true);
    setMeta("og:site_name", COMPANY.name, true);
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", description);

    // Canonical — always use www and handle both full URLs and paths
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      // If a full URL is passed, normalise it to www form; otherwise prepend base
      let canonicalHref: string;
      if (canonical.startsWith('http')) {
        // Replace any non-www or bare domain with www version
        canonicalHref = canonical
          .replace('https://willowtreefunerals.com.au', 'https://www.willowtreefunerals.com.au')
          .replace('http://willowtreefunerals.com.au', 'https://www.willowtreefunerals.com.au')
          .replace('http://www.willowtreefunerals.com.au', 'https://www.willowtreefunerals.com.au');
      } else {
        canonicalHref = `https://www.willowtreefunerals.com.au${canonical}`;
      }
      link.href = canonicalHref;
    }

    // JSON-LD
    if (schema) {
      const id = "page-schema";
      let el = document.getElementById(id);
      if (!el) {
        el = document.createElement("script");
        el.id = id;
        (el as HTMLScriptElement).type = "application/ld+json";
        document.head.appendChild(el);
      }
      el.textContent = JSON.stringify(schema);
    }
  }, [fullTitle, description, canonical, schema, image]);

  return null;
}
