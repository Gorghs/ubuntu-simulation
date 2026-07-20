import Head from 'next/head';

export default function Meta() {
    return (
        <Head>
            {/* Primary Meta Tags */}
            <title>Karthick V Portfolio | Ubuntu Simulation | Minecraft Styled Portfolio</title>
            <meta charSet="utf-8" />
            <meta name="title" content="Karthick V Portfolio | Ubuntu Simulation | Minecraft Styled Portfolio" />
            <meta name="description"
                content="Karthick's portfolio - an interactive Ubuntu desktop simulation built with Next.js. Features a functional terminal, applications, and showcase of backend engineering, Python development, and agentic AI work." />
            <meta name="author" content="Karthick" />
            <meta name="keywords"
                content="ubuntu simulation, interactive ubuntu desktop, minecraft styled portfolio, web-based ubuntu emulator, linux simulation, developer portfolio, python backend engineer, agentic AI systems, LLM workflows, interactive OS simulation, Karthick portfolio, gorghs, software engineer, fullstack developer, Next.js portfolio, react developer" />
            <meta name="robots" content="index, follow" />
            <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="language" content="English" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#1e1e1e" />
            <link rel="canonical" href="https://gorghs.github.io/" />

            {/* Search Engine */}
            <meta name="image" content="https://gorghs.github.io/images/logos/fevicon.png" />
            
            {/* Schema.org for Google */}
            <meta itemProp="name" content="Karthick V Portfolio | Ubuntu Simulation | Minecraft Styled Portfolio" />
            <meta itemProp="description"
                content="Karthick's portfolio - an interactive Ubuntu desktop simulation built with Next.js. Features a functional terminal, applications, and showcase of backend engineering, Python development, and agentic AI work." />
            <meta itemProp="image" content="https://gorghs.github.io/images/logos/fevicon.png" />
            
            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Karthick V Portfolio | Ubuntu Simulation | Minecraft Styled Portfolio" />
            <meta name="twitter:description"
                content="Karthick's portfolio - an interactive Ubuntu desktop simulation built with Next.js. Features a functional terminal, applications, and showcase of backend engineering, Python development, and agentic AI work." />
            <meta name="twitter:site" content="@Gorghs" />
            <meta name="twitter:creator" content="@Gorghs" />
            <meta name="twitter:image:src" content="https://gorghs.github.io/images/logos/logo_1024.png" />
            
            {/* Open Graph general (Facebook, Pinterest & Google+) */}
            <meta name="og:title" content="Karthick V Portfolio | Ubuntu Simulation | Minecraft Styled Portfolio" />
            <meta name="og:description"
                content="Karthick's portfolio - an interactive Ubuntu desktop simulation built with Next.js. Features a functional terminal, applications, and showcase of backend engineering, Python development, and agentic AI work." />
            <meta name="og:image" content="https://gorghs.github.io/images/logos/logo_1200.png" />
            <meta name="og:url" content="https://gorghs.github.io/" />
            <meta name="og:site_name" content="Karthick V Portfolio | Ubuntu Simulation & Minecraft Styled Portfolio" />
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
                        "url": "https://gorghs.github.io/",
                        "description": "Karthick's portfolio - an interactive Ubuntu desktop simulation built with Next.js. Features a functional terminal, applications, and showcase of backend engineering, Python development, and agentic AI work.",
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
                                "https://github.com/Gorghs",
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
