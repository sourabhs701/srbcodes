export const DATA = {
    name: "Sourabh Soni",
    initials: "SS",
    url: "https://srb.codes",
    location: "Jaipur, Rajasthan",
    locationLink: "https://www.google.com/maps/place/Jaipur,+Rajasthan",
    description:
        "Full Stack | Software Engineer ",
    summary:
        "I build in public — which basically means I live on X (Twitter)  \n\nwhat i do? code, play chess, read books, and play piano ",
    avatarUrl: "/me.png",
    skills: [
        "React",
        "Next.js",
        "JavaScript",
        "Python",
        "PostgresSQL",
        "C++",
        "AWS",
        "Docker",
        "Git",
        "Cloudflare Workers",
    ],
    contact: {
        email: "Sourabhs701@gmail.com",
        tel: "+91 8107655737",
        social: {
            GitHub: {
                name: "GitHub",
                url: "https://github.com/sourabhs701",
                navbar: true,
            },
            LinkedIn: {
                name: "LinkedIn",
                url: "https://www.linkedin.com/in/sourabhs701/",
                navbar: false,
            },
            X: {
                name: "X",
                url: "https://x.com/intent/follow?screen_name=srbcode",
                navbar: true,
            },
            email: {
                name: "Send Email",
                url: "mailto:Sourabhs701@gmail.com",
                navbar: false,
            },
        },
    },
    work: [
        {
            company: "Vedhin Technologies",
            href: "https://vedhin.com/",
            location: "Jaipur, Rajasthan",
            title: "Full Stack Developer Intern",
            logoUrl: "/vedhin.png",
            start: "Apr 2024",
            end: "Sep 2024",
            description:
                "Developed scalable web apps with React.js, Node.js, and PostgreSQL. Deployed on AWS (EC2, S3, CloudFront). Integrated Mailgun SMTP for email delivery. Focused on optimizing performance and user experience.",
        },
    ],
    education: [
        {
            school: "Rajasthan Technical University",
            href: "https://www.rtu.ac.in/",
            degree: "Masters in Computer Application (MCA)",
            logoUrl: "/rtu.png",
            start: "2023",
            end: "2025",
        },
        {
            school: "University of Rajasthan",
            href: "https://www.uniraj.ac.in/",
            degree: "Bachelors in Computer Application (BCA)",
            logoUrl: "/uniraj.png",
            start: "2019",
            end: "2022",
        },
    ],
    projects: [
        {
            "slug": "platform-as-a-service",
            "title": "MakeThumb — Vercel Clone",
            "dates": "May 2025 – Present",
            "description": "Developed a self-hosted Platform-as-a-Service (PaaS) that enables one-click deployment of React applications with custom domains. Implemented a Dockerized build-on-demand pipeline reducing deployment time from hours to minutes, automated asset delivery to AWS S3, and integrated a secure multi-tenant reverse proxy for scalable, isolated, and fast releases.",
            "technologies": [
                "Node.js",
                "Docker",
                "Reverse Proxy",
                "CI/CD"
            ],
            "Category": ["Full Stack", "Product"],
            "Notion_id": "248d7bdb0e2e803a85dbfc9f97fb60d4",
            "links": [
                {
                    "type": "Website",
                    "href": "https://makethumb.com"
                }
            ],
            "image": "/makethumb.png"
        },

        {
            "slug": "hls-transcoder",
            "title": "HLS Transcoder — Scalable Adaptive Video Streaming (OSS)",
            "dates": "Feb 2025 – May 2025",
            "description": "Built a distributed video transcoding system using FFmpeg within Dockerized environments to deliver adaptive bitrate HLS streaming (360p–1080p). Designed for scalability and seamless multi-device playback, the pipeline dynamically processes video streams and serves them via HTTP Live Streaming through AWS ECS.",
            "technologies": [
                "Node.js",
                "FFmpeg",
                "Docker",
                "AWS ECS",
                "HLS"
            ],
            "Category": ["Open Source", "DevOps"],
            "Notion_id": "",
            "links": [],
            "image": "/hls-transcoder.png"
        },

        {
            slug: "bloom-animated-landing",
            title: "Bloom",
            dates: "Feb 2025 – Present",
            description:
                "Beautifully animated landing page showcasing smooth scroll effects and parallax animations.",
            technologies: [
                "Next.js",
                "Framer Motion",
            ],
            Category: ["Frontend"],
            Notion_id: "",
            links: [
                {
                    type: "Website",
                    href: "https://bloom.srb.codes",
                },
            ],
            image: "/bloom.png",
        },
        {
            slug: "portfolio-notionx-cms",
            title: "Portfolio - NotionX_CMS",
            dates: "Dec 2024 – May 2025",
            description:
                "Dynamic CMS-powered portfolio pulling content directly from Notion.",
            technologies: [
                "Next.js",
                "PostgreSQL",
                "NotionX",
                "Tailwind CSS",
            ],
            Category: ["CMS", "Full Stack"],
            Notion_id: "248d7bdb0e2e80c5b612d025c3448e2e",
            links: [
                {
                    type: "Website",
                    href: "https://srbcodes.sourabhs701.workers.dev/",
                },
            ],
            image: "/portfolio.png",
        },
        {
            "slug": "storage-as-a-service",
            "title": "Google Drive Clone — Self-Hosted Cloud Storage (OSS)",
            "dates": "Jan 2025 – Jun 2025",
            "description": "Built a self-hosted, secure cloud storage platform with support for virtual folders, multipart uploads, and CDN-backed delivery. Implemented fuzzy search for efficient file discovery, integrated Cloudflare Tunnels for seamless self-hosting, and containerized the application using Docker. Designed for scalable, private, and enterprise-ready file management.",
            "technologies": [
                "Node.js",
                "PostgreSQL",
                "AWS S3",
                "AWS CloudFront",
                "Docker",
                "Cloudflare Tunnels",
            ],
            "Category": ["Open Source", "Product", "Full Stack"],
            "Notion_id": "248d7bdb0e2e807cbcd8fd1c7ec3ecf3",
            "links": [
                {
                    "type": "Website",
                    "href": "https://cloud.srb.codes"
                }
            ],
            "image": "/storage.png"
        },
        {
            "slug": "college-chatbot",
            "title": "AI Chatbot — College Query Assistant",
            "dates": "Oct 2024 – May 2025",
            "description": "Developed an AI-powered chatbot trained on college website content to provide instant, accurate responses to student queries. Leveraged Gemini API for natural language understanding, integrated with Cloudflare KV for efficient data retrieval, and deployed on a modern Next.js stack for seamless user experience.",
            "technologies": [
                "Next.js",
                "JavaScript",
                "Cloudflare KV",
                "Gemini API"
            ],
            "Category": [, "AI", "Frontend"],
            "Notion_id": "",
            "links": [
                {
                    "type": "Website",
                    "href": "https://poddarai.srb.codes"
                }
            ],
            "image": "/chatbot.png"
        },
        {
            "slug": "kairos-chat",
            "title": "Kairos Chat — Real-Time Public Chatrooms (OSS)",
            "dates": "Mar 2025 – May 2025",
            "description": "Designed and developed a real-time public chat platform leveraging edge-first infrastructure. Implemented WebSocket-based communication with Cloudflare Durable Objects for consistent state management, ensuring scalable, low-latency interactions. Optimized storage with SQLite for lightweight persistence and seamless user experience.",
            "technologies": [
                "Cloudflare Durable Objects",
                "WebSocket",
                "SQLite",
                "JavaScript"
            ],
            "Category": ["Open Source", "DevOps"],
            "Notion_id": "248d7bdb0e2e806584e4c88572d5f244",
            "links": [
                {
                    "type": "Website",
                    "href": "https://kairo.srb.codes"
                }
            ],
            "image": "/kairo.png"
        }
    ],
};