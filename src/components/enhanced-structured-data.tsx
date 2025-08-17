export function EnhancedStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "MODRON",
    "url": "https://www.modron.com",
    "logo": "https://www.modron.com/Modron_logo.png",
    "description": "Australia's green GPU infrastructure — solar powered, immersion cooled, and enterprise-ready. Sustainable AI computing with 60% carbon reduction.",
    "foundingDate": "2024",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "AU",
      "addressRegion": "NSW",
      "addressLocality": "Sydney"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "contact@modron.com"
    },
    "sameAs": [
      "https://twitter.com/modron_ai"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "AI Infrastructure Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AI Training Infrastructure",
            "description": "High-performance GPU clusters for AI model training"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Immersion Cooling Technology",
            "description": "Proprietary liquid cooling system reducing failure rates by 60%"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Solar-Powered Computing",
            "description": "Sustainable energy infrastructure with solar and grid hybrid power"
          }
        }
      ]
    },
    "areaServed": {
      "@type": "Country",
      "name": "Australia"
    },
    "serviceType": "AI Infrastructure",
    "keywords": "AI infrastructure, green computing, GPU cloud, sustainable technology, immersion cooling, solar powered, Australia, MODRON"
  };

  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "MODRON",
    "url": "https://www.modron.com",
    "description": "Australia's green GPU infrastructure — solar powered, immersion cooled, and enterprise-ready.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.modron.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData) }}
      />
    </>
  );
}
