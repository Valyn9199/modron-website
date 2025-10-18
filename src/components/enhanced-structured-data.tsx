export function EnhancedStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "TechnologyCompany", "Service"],
    "name": "MODRON",
    "url": "https://www.modron.com",
    "logo": "https://www.modron.com/Modron_logo.png",
    "description": "High-availability enterprise AI compute infrastructure with SLA-backed hosting and sustainable GPU rentals",
    "foundingDate": "2024",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "AU",
      "addressRegion": "NSW",
      "addressLocality": "Sydney"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "email": "contact@modron.com",
        "availableLanguage": "English"
      },
      {
        "@type": "ContactPoint",
        "contactType": "sales",
        "email": "sales@modron.com",
        "availableLanguage": "English"
      }
    ],
    "sameAs": [
      "https://twitter.com/modron_ai",
      "https://linkedin.com/company/modron-ai"
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
            "description": "High-performance GPU clusters for enterprise AI model training in Asia Pacific",
            "provider": {
              "@type": "LocalBusiness",
              "name": "MODRON"
            },
            "areaServed": ["Australia", "Asia Pacific", "APAC", "US", "Europe"],
            "serviceType": "AI Compute Infrastructure"
          },
          "priceRange": "$$$",
          "availability": "InStock"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Immersion Cooling Technology",
            "description": "Proprietary liquid cooling system reducing failure rates by 60% for enterprise workloads",
            "provider": {
              "@type": "LocalBusiness",
              "name": "MODRON"
            },
            "serviceType": "Cooling Technology"
          },
          "priceRange": "$$$",
          "availability": "InStock"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Solar-Powered Computing",
            "description": "Sustainable energy infrastructure with solar and grid hybrid power for Asia Pacific region",
            "provider": {
              "@type": "LocalBusiness",
              "name": "MODRON"
            },
            "serviceType": "Sustainable Energy Infrastructure"
          },
          "priceRange": "$$$",
          "availability": "InStock"
        }
      ]
    },
    "areaServed": [
      {
        "@type": "Country",
        "name": "Australia"
      },
      {
        "@type": "Country", 
        "name": "United States"
      },
      {
        "@type": "Country",
        "name": "United Kingdom"
      },
      {
        "@type": "Place",
        "name": "Asia Pacific"
      }
    ],
    "serviceType": "Enterprise AI Compute Infrastructure",
    "slogan": "Sustainable enterprise AI compute for global enterprises",
    "keywords": "Australian enterprise AI compute, GPU rental Asia Pacific, Green AI compute infrastructure Australia, Sustainable AI compute hosting, High-performance GPU hosting Australia",
    "knowsAbout": [
      "Artificial Intelligence",
      "Machine Learning",
      "GPU Computing",
      "Immersion Cooling",
      "Sustainable Technology",
      "Enterprise Infrastructure"
    ],
    "makesOffer": [
      {
        "@type": "Offer",
        "name": "GPU Rental Services",
        "description": "High-performance GPU rental for AI training and inference"
      },
      {
        "@type": "Offer", 
        "name": "Enterprise AI Infrastructure",
        "description": "Complete AI infrastructure solutions for enterprise clients"
      }
    ]
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

  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "MODRON",
    "url": "https://www.modron.com",
    "logo": "https://www.modron.com/Modron_logo.png",
    "description": "Leading provider of sustainable enterprise AI compute infrastructure with immersion cooling and solar power technology",
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
      "email": "contact@modron.com",
      "availableLanguage": "English"
    },
    "sameAs": [
      "https://twitter.com/modron_ai",
      "https://linkedin.com/company/modron-ai"
    ],
    "knowsAbout": [
      "Artificial Intelligence",
      "Machine Learning", 
      "GPU Computing",
      "Immersion Cooling",
      "Sustainable Technology",
      "Enterprise Infrastructure",
      "Data Center Operations"
    ]
  };

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is MODRON's immersion cooling technology?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "MODRON's proprietary immersion cooling system reduces GPU failure rates by 60% compared to traditional air cooling, enabling higher performance and longer hardware lifespan for enterprise AI workloads."
        }
      },
      {
        "@type": "Question", 
        "name": "How does MODRON's solar-powered infrastructure work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "MODRON uses a hybrid solar and grid power system that provides sustainable energy for our AI compute infrastructure, reducing carbon footprint while maintaining high availability for enterprise clients."
        }
      },
      {
        "@type": "Question",
        "name": "What regions does MODRON serve?",
        "acceptedAnswer": {
          "@type": "Answer", 
          "text": "MODRON provides enterprise AI compute infrastructure services globally, with primary focus on Australia, Asia Pacific, United States, and Europe regions."
        }
      },
      {
        "@type": "Question",
        "name": "What GPU types are available for enterprise AI training?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "MODRON offers high-performance GPU clusters including RTX 4090 and other enterprise-grade GPUs optimized for AI model training and inference workloads."
        }
      }
    ]
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
    </>
  );
}
