import { useEffect } from 'react';
import { siteConfig } from '../config/siteConfig';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
}

export default function SEO({
  title,
  description,
  canonical,
  ogType = 'website',
  ogImage = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
}: SEOProps) {
  useEffect(() => {
    // 1. Set Document Title
    const fullTitle = title
      ? `${title} | ${siteConfig.companyName}`
      : `${siteConfig.companyName} | ${siteConfig.tagline}`;
    document.title = fullTitle;

    // 2. Set Meta Description
    const metaDesc = description || siteConfig.subTagline;
    let descTag = document.querySelector('meta[name="description"]');
    if (!descTag) {
      descTag = document.createElement('meta');
      descTag.setAttribute('name', 'description');
      document.head.appendChild(descTag);
    }
    descTag.setAttribute('content', metaDesc);

    // 3. Open Graph Tags
    const setMetaTag = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    setMetaTag('og:title', fullTitle);
    setMetaTag('og:description', metaDesc);
    setMetaTag('og:type', ogType);
    setMetaTag('og:image', ogImage);

    // 4. Scroll to top on route change
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [title, description, canonical, ogType, ogImage]);

  return null;
}
