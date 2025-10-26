export function EnhancedStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "TechnologyCompany", "Service"],
    "name": "MODRON",
    "url": "https://www.modron.com",
    "logo": "https://www.modron.com/ICON_GENESIS_01.png",
    "description": "Australia's first deployable supercomputers in a box with enterprise-grade AI infrastructure and industry-leading compute density. Locally-built, immersion-cooled GPU clusters (RTX 4090, H200, L40S, Blackwell GB300) and solar-powered modular containers with 48-hour deployment.",
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
            "name": "Sovereign AI Training Infrastructure",
            "description": "Australian-built, immersion-cooled GPU clusters (RTX 4090, H200, L40S, Blackwell GB300) with industry-leading compute density for sovereign AI model training and enterprise-grade inference with complete data sovereignty",
            "provider": {
              "@type": "LocalBusiness",
              "name": "MODRON"
            },
            "areaServed": ["Australia"],
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
            "description": "Australian-developed immersion cooling technology reducing GPU failure rates by 60% and enabling industry-leading compute density for sovereign AI infrastructure with enterprise-grade performance",
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
            "description": "Solar-powered modular container infrastructure providing sustainable energy for Australian sovereign AI compute with 48-hour rapid deployment capabilities",
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
      }
    ],
    "serviceType": "Sovereign AI Compute Infrastructure",
    "slogan": "Building Australia's first deployable supercomputers in a box",
    "keywords": "Australia sovereign AI infrastructure, Australian-built GPU clusters, High-performance GPU clusters Australia, Enterprise AI infrastructure Australia, Industry-leading compute density, Immersion-cooled GPUs Australia, Solar-powered AI compute, Modular AI infrastructure, Australian data sovereignty, Locally-assembled GPUs, Sovereign AI compute Australia, RTX 4090 Australia, H200 L40S Australia, Blackwell GB300 Australia, Enterprise-grade AI compute, Rapid deployment AI infrastructure, 48-hour AI deployment Australia",
    "knowsAbout": [
      "Artificial Intelligence",
      "Machine Learning",
      "GPU Computing",
      "Immersion Cooling",
      "Solar Power Technology",
      "Modular Infrastructure",
      "Data Sovereignty",
      "Australian Manufacturing",
      "Sovereign AI Infrastructure"
    ],
    "makesOffer": [
      {
        "@type": "Offer",
        "name": "Sovereign GPU Infrastructure",
        "description": "Australian-built, immersion-cooled GPU clusters for sovereign AI training and inference"
      },
      {
        "@type": "Offer", 
        "name": "Modular AI Infrastructure",
        "description": "Solar-powered modular container infrastructure for Australian enterprises"
      }
    ]
  };

  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "MODRON",
    "url": "https://www.modron.com",
    "description": "Australia's first deployable supercomputers in a box. Enterprise-grade AI infrastructure with industry-leading compute density. Locally-built, immersion-cooled GPU clusters (RTX 4090, H200, L40S, Blackwell GB300) with solar power and modular containers for Australian enterprises.",
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
    "logo": "https://www.modron.com/ICON_GENESIS_01.png",
    "description": "Australia's leading provider of sovereign AI compute infrastructure with enterprise-grade AI infrastructure and industry-leading compute density. Locally-built, immersion-cooled GPU clusters (RTX 4090, H200, L40S, Blackwell GB300) and solar-powered modular containers with 48-hour deployment",
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
      "Solar Power Technology",
      "Modular Infrastructure",
      "Data Sovereignty",
      "Australian Manufacturing",
      "Sovereign AI Infrastructure"
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
          "text": "MODRON's Australian-developed immersion cooling system reduces GPU failure rates by 60% compared to traditional air cooling, enabling higher performance and longer hardware lifespan for sovereign AI infrastructure."
        }
      },
      {
        "@type": "Question", 
        "name": "How does MODRON's solar-powered infrastructure work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "MODRON uses solar-powered modular containers that provide sustainable energy for our sovereign AI infrastructure, reducing carbon footprint while ensuring data sovereignty for Australian enterprises."
        }
      },
      {
        "@type": "Question",
        "name": "What regions does MODRON serve?",
        "acceptedAnswer": {
          "@type": "Answer", 
          "text": "MODRON provides sovereign AI compute infrastructure services exclusively for Australia, ensuring data sovereignty and local control for Australian enterprises, researchers, and government agencies."
        }
      },
      {
        "@type": "Question",
        "name": "What GPU types are available for sovereign AI training?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "MODRON offers Australian-assembled, immersion-cooled GPU clusters including RTX 4090, H200, L40S, and Blackwell GB300 with industry-leading compute density, optimized for enterprise-grade AI model training and inference workloads with complete data sovereignty and 48-hour deployment."
        }
      }
    ]
  };

  const productStructuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "MODRON Immersion-Cooled GPU Clusters",
    "description": "Enterprise-grade, immersion-cooled GPU clusters featuring RTX 4090, H200, L40S, and Blackwell GB300. Australian-assembled, solar-powered, with industry-leading compute density. Deploy in 48 hours with complete data sovereignty.",
    "brand": {
      "@type": "Brand",
      "name": "MODRON"
    },
    "manufacturer": {
      "@type": "Organization",
      "name": "MODRON",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "AU",
        "addressRegion": "NSW",
        "addressLocality": "Sydney"
      }
    },
    "category": "High-Performance Computing",
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "AUD",
      "priceRange": "$$$",
      "availability": "https://schema.org/InStock",
      "availabilityStarts": "2024-01-01",
      "seller": {
        "@type": "Organization",
        "name": "MODRON"
      }
    },
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "GPU Models",
        "value": "RTX 4090, H200, L40S, Blackwell GB300"
      },
      {
        "@type": "PropertyValue",
        "name": "Compute Density",
        "value": "Industry-leading"
      },
      {
        "@type": "PropertyValue",
        "name": "Cooling Technology",
        "value": "Immersion cooling"
      },
      {
        "@type": "PropertyValue",
        "name": "Power Source",
        "value": "Solar-powered"
      },
      {
        "@type": "PropertyValue",
        "name": "Deployment Time",
        "value": "48 hours"
      },
      {
        "@type": "PropertyValue",
        "name": "Data Sovereignty",
        "value": "Australian data residency"
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productStructuredData) }}
      />
      {/* hreflang links for international SEO */}
      <link rel="alternate" hrefLang="en-AU" href="https://www.modron.com" />
      <link rel="alternate" hrefLang="x-default" href="https://www.modron.com" />
    </>
  );
}
