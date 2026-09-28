import Head from 'next/head';

export default function Meta() {
    return (
        <Head>
            {/* Primary Meta Tags */}
            <title>Karthick V — Software Development Engineer</title>
            <meta charSet="utf-8" />
            <meta name="title" content="Karthick V — Software Development Engineer" />
            <meta name="description"
                content="Portfolio of Karthick V (Gorghs), Software Development Engineer. Projects in Python backend, automation, agentic AI systems, and browser extensions." />
            <meta name="author" content="Karthick V (Gorghs)" />
            <meta name="keywords"
                content="Karthick V portfolio, software development engineer, Python backend, agentic AI, automation, browser extensions, NestJS, FastAPI, YOLO" />
            <meta name="robots" content="index, follow" />
            <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="language" content="English" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#1e1e1e" />
            <link rel="canonical" href="https://karthickv.dev/" />

            {/* Search Engine */}
            <meta name="image" content="https://karthickv.dev/images/logos/fevicon.png" />
            
            {/* Schema.org for Google */}
            <meta itemProp="name" content="Karthick V — Software Development Engineer" />
            <meta itemProp="description"
                content="Portfolio of Karthick V (Gorghs), Software Development Engineer. Projects in Python backend, automation, agentic AI systems, and browser extensions." />
            <meta itemProp="image" content="https://karthickv.dev/images/logos/fevicon.png" />
            
            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Karthick V — Software Development Engineer" />
            <meta name="twitter:description"
                content="Portfolio of Karthick V (Gorghs), Software Development Engineer. Projects in Python backend, automation, agentic AI systems, and browser extensions." />
            <meta name="twitter:site" content="@Gorghs" />
            <meta name="twitter:creator" content="@Gorghs" />
            <meta name="twitter:image:src" content="https://karthickv.dev/images/logos/logo_1024.png" />
            
            {/* Open Graph general */}
            <meta name="og:title" content="Karthick V — Software Development Engineer" />
            <meta name="og:description"
                content="Portfolio of Karthick V (Gorghs), Software Development Engineer. Projects in Python backend, automation, agentic AI systems, and browser extensions." />
            <meta name="og:image" content="https://karthickv.dev/images/logos/logo_1200.png" />
            <meta name="og:url" content="https://karthickv.dev/" />
            <meta name="og:site_name" content="Karthick V — Software Development Engineer" />
            <meta name="og:locale" content="en_IN" />
            <meta name="og:type" content="website" />

            {/* JSON-LD Structured Data Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ProfilePage",
                        "name": "Karthick V's Portfolio",
                        "url": "https://karthickv.dev/",
                        "description": "Portfolio of Karthick V (Gorghs), Software Development Engineer. Projects in Python backend, automation, agentic AI systems, and browser extensions.",
                        "about": {
                            "@type": "Person",
                            "name": "Karthick V",
                            "alternateName": "Gorghs",
                            "jobTitle": "Software Development Engineer",
                            "email": "karthick.venkatachalem@gmail.com",
                            "knowsAbout": [
                                "Python", "Java", "JavaScript", "C", "Node.js", 
                                "Express.js", "Flask", "FastAPI", "PostgreSQL", 
                                "Supabase", "Git", "Docker", "Agentic AI Systems", 
                                "Backend Development"
                            ],
                            "sameAs": [
                                "https://github.com/Gorghs/arch-simulation",
                                "https://www.linkedin.com/in/karthickv4"
                            ]
                        }
                    })
                }}
            />

            <link rel="icon" href="images/logos/fevicon.svg" />
            <link rel="apple-touch-icon" href="images/logos/logo.png" />
            <link rel="preload" href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Ubuntu:wght@300;400;500;700&display=swap" as="style" />
            <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Ubuntu:wght@300;400;500;700&display=swap" rel="stylesheet"></link>
        </Head>
    )
}
