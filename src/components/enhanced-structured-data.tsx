export function EnhancedStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "MODRON",
    "url": "https://www.modron.com",
    "logo": "https://www.modron.com/Modron_logo.png",
    "description": "High-availability enterprise AI compute infrastructure with SLA-backed hosting and sustainable GPU rentals",
    "foundingDate": "2024",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "AU"
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
      "name": "Enterprise AI Infrastructure Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Enterprise AI Training Infrastructure",
            "description": "High-performance GPU clusters for enterprise AI model training in Asia Pacific"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Immersion Cooling Technology",
            "description": "Proprietary liquid cooling system reducing failure rates by 60% for enterprise workloads"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Solar-Powered Computing",
            "description": "Sustainable energy infrastructure with solar and grid hybrid power for Asia Pacific region"
          }
        }
      ]
    },
    "areaServed": ["Global", "Australia", "Asia Pacific", "APAC", "US", "Europe"],
    "serviceType": "Enterprise AI Compute Infrastructure",
    "slogan": "Sustainable enterprise AI compute for global enterprises",
    "keywords": "Australian enterprise AI compute, GPU rental Asia Pacific, Green AI compute infrastructure Australia, Sustainable AI compute hosting, High-performance GPU hosting Australia"
  };

  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "MODRON",
    "url": "https://www.modron.com",
    "description": "High-availability enterprise AI compute infrastructure with SLA-backed hosting. Sustainable GPU rentals with immersion cooling, solar power, and global availability.",
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
