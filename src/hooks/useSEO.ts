import { useEffect } from "react";

interface SEOMeta {
  title: string;
  description: string;
  canonical?: string;
}

function updateOrCreateMetaTag(selector: string, attributeName: string, attributeValue: string, content: string) {
  let meta = document.querySelector<HTMLMetaElement>(selector);
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute(attributeName, attributeValue);
    document.head.appendChild(meta);
  }
  meta.content = content;
}

export function useSEO({ title, description, canonical }: SEOMeta) {
  useEffect(() => {
    document.title = title;

    updateOrCreateMetaTag('meta[name="description"]', 'name', 'description', description);
    updateOrCreateMetaTag('meta[property="og:title"]', 'property', 'og:title', title);
    updateOrCreateMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
    updateOrCreateMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    updateOrCreateMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);

    if (canonical) {
      let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.href = canonical;
    }

    return () => {
      // Reset to defaults on unmount
      document.title = "Luxury Car Rental in  Atlanta | Mead Green Autos";
    };
  }, [title, description, canonical]);
}
