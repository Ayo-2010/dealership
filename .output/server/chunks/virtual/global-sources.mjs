const sources = [
    {
        "context": {
            "name": "sitemap:urls",
            "description": "Set with the `sitemap.urls` config."
        },
        "urls": [
            {
                "loc": "/",
                "changefreq": "weekly",
                "priority": 1
            },
            {
                "loc": "/cars",
                "changefreq": "weekly",
                "priority": 0.7
            },
            {
                "loc": "/new-arrivals",
                "changefreq": "weekly",
                "priority": 0.7
            },
            {
                "loc": "/sell-your-car",
                "changefreq": "weekly",
                "priority": 0.7
            },
            {
                "loc": "/about",
                "changefreq": "weekly",
                "priority": 0.7
            },
            {
                "loc": "/contact",
                "changefreq": "weekly",
                "priority": 0.7
            },
            {
                "loc": "/test-drive",
                "changefreq": "weekly",
                "priority": 0.7
            },
            {
                "loc": "/faq",
                "changefreq": "weekly",
                "priority": 0.7
            },
            {
                "loc": "/privacy-policy",
                "changefreq": "weekly",
                "priority": 0.7
            },
            {
                "loc": "/terms",
                "changefreq": "weekly",
                "priority": 0.7
            },
            {
                "loc": "/cars/2024-porsche-911-carrera-s",
                "lastmod": "2026-10-15T09:00:00.000Z",
                "changefreq": "weekly",
                "priority": 0.8
            },
            {
                "loc": "/cars/2025-mercedes-amg-g-63",
                "lastmod": "2026-10-11T09:00:00.000Z",
                "changefreq": "weekly",
                "priority": 0.8
            },
            {
                "loc": "/cars/2023-bmw-m4-competition",
                "lastmod": "2026-10-03T09:00:00.000Z",
                "changefreq": "weekly",
                "priority": 0.8
            },
            {
                "loc": "/cars/2025-range-rover-evoque-r-dynamic",
                "lastmod": "2026-09-19T09:00:00.000Z",
                "changefreq": "weekly",
                "priority": 0.8
            },
            {
                "loc": "/cars/2022-mercedes-benz-s-500-4matic",
                "lastmod": "2026-10-07T09:00:00.000Z",
                "changefreq": "weekly",
                "priority": 0.8
            },
            {
                "loc": "/cars/2025-audi-q7-55-tfsi-quattro",
                "lastmod": "2026-09-14T09:00:00.000Z",
                "changefreq": "weekly",
                "priority": 0.8
            },
            {
                "loc": "/cars/2023-tesla-model-3-long-range",
                "lastmod": "2026-09-27T09:00:00.000Z",
                "changefreq": "weekly",
                "priority": 0.8
            },
            {
                "loc": "/cars/2024-porsche-taycan-4s",
                "lastmod": "2026-09-24T09:00:00.000Z",
                "changefreq": "weekly",
                "priority": 0.8
            },
            {
                "loc": "/cars/2023-mercedes-amg-c-43",
                "lastmod": "2026-09-09T09:00:00.000Z",
                "changefreq": "weekly",
                "priority": 0.8
            },
            {
                "loc": "/cars/2025-ford-f-150-raptor",
                "lastmod": "2026-09-04T09:00:00.000Z",
                "changefreq": "weekly",
                "priority": 0.8
            },
            {
                "loc": "/cars/2022-land-rover-discovery-hse",
                "lastmod": "2026-08-30T09:00:00.000Z",
                "changefreq": "weekly",
                "priority": 0.8
            },
            {
                "loc": "/cars/2021-volkswagen-golf-gti",
                "lastmod": "2026-08-25T09:00:00.000Z",
                "changefreq": "weekly",
                "priority": 0.8
            },
            {
                "loc": "/cars/2020-hyundai-sonata-limited",
                "lastmod": "2026-08-20T09:00:00.000Z",
                "changefreq": "weekly",
                "priority": 0.8
            },
            {
                "loc": "/cars/2019-fiat-500-lounge",
                "lastmod": "2026-07-27T09:00:00.000Z",
                "changefreq": "weekly",
                "priority": 0.8
            },
            {
                "loc": "/cars/2020-bmw-730li-m-sport",
                "lastmod": "2026-08-15T09:00:00.000Z",
                "changefreq": "weekly",
                "priority": 0.8
            },
            {
                "loc": "/cars/2021-audi-tt-s-line",
                "lastmod": "2026-08-10T09:00:00.000Z",
                "changefreq": "weekly",
                "priority": 0.8
            },
            {
                "loc": "/cars/2024-audi-rs7-sportback",
                "lastmod": "2026-10-18T09:00:00.000Z",
                "changefreq": "weekly",
                "priority": 0.8
            },
            {
                "loc": "/cars/2022-bmw-530i-m-sport",
                "lastmod": "2026-08-05T09:00:00.000Z",
                "changefreq": "weekly",
                "priority": 0.8
            },
            {
                "loc": "/cars/2023-ford-mustang-gt",
                "lastmod": "2026-08-01T09:00:00.000Z",
                "changefreq": "weekly",
                "priority": 0.8
            },
            {
                "loc": "/cars/2024-porsche-panamera",
                "lastmod": "2026-09-29T09:00:00.000Z",
                "changefreq": "weekly",
                "priority": 0.8
            },
            {
                "loc": "/cars/2023-audi-r8-v10-performance",
                "lastmod": "2026-07-20T09:00:00.000Z",
                "changefreq": "weekly",
                "priority": 0.8
            },
            {
                "loc": "/cars/2021-mercedes-amg-gt-53",
                "lastmod": "2026-07-15T09:00:00.000Z",
                "changefreq": "weekly",
                "priority": 0.8
            }
        ],
        "sourceType": "user"
    },
    {
        "context": {
            "name": "nuxt:pages",
            "description": "Generated from your static page files.",
            "tips": [
                "Can be disabled with `{ excludeAppSources: ['nuxt:pages'] }`."
            ]
        },
        "urls": [
            {
                "loc": "/about"
            },
            {
                "loc": "/cars"
            },
            {
                "loc": "/contact"
            },
            {
                "loc": "/faq"
            },
            {
                "loc": "/new-arrivals"
            },
            {
                "loc": "/privacy-policy"
            },
            {
                "loc": "/sell-your-car"
            },
            {
                "loc": "/terms"
            },
            {
                "loc": "/test-drive"
            },
            {
                "loc": "/"
            }
        ],
        "sourceType": "app"
    }
];

export { sources };
//# sourceMappingURL=global-sources.mjs.map
