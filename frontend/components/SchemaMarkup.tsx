"use client";

import Script from "next/script";

export default function SchemaMarkup() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "ConstructionBusiness",
        "name": "S.R. Construction",
        "image": "https://www.studio-sr-construction.com/logo.png",
        "url": "https://www.studio-sr-construction.com",
        "telephone": "+91 98765 43210",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "123 Construction Avenue",
            "addressLocality": "Mumbai",
            "addressRegion": "MH",
            "postalCode": "400001",
            "addressCountry": "IN"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "19.0760",
            "longitude": "72.8777"
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"
            ],
            "opens": "09:00",
            "closes": "18:00"
        },
        "sameAs": [
            "https://www.facebook.com/srconstruction",
            "https://www.instagram.com/srconstruction",
            "https://www.linkedin.com/company/srconstruction"
        ]
    };

    return (
        <Script
            id="schema-org"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
