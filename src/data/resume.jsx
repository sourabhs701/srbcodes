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
        // {
        //     slug: "crowd-funding-platform-powered-by-solana",
        //     title: "Crowdfunding platform",
        //     dates: "May 2025 – Present",
        //     description:
        //         "Next-gen crowdfunding platform on Solana blockchain with escrow-based smart contracts.",
        //     technologies: ["Next.js", "PostgreSQL", "Solana", "JavaScript", "Rust"],
        //     Badge: ["OSS", "Ongoing"],
        //     Notion_id: "227d7bdb0e2e809f9140d24645d0a452",
        //     links: [
        //         {
        //             type: "Website",
        //             href: "https://makethumb.com",
        //         },
        //     ],
        //     image: "/makethumb.png",
        // },
        {
            slug: "platform-as-a-service",
            title: "Paas-makethumb",
            dates: "May 2025 – Present",
            description:
                "Deploy react application in single click with custom domain",
            technologies: ["React", "SQLite", "JavaScript", "Docker", "S3", "Reverse proxy"],
            Badge: ["OSS"],
            Notion_id: "248d7bdb0e2e803a85dbfc9f97fb60d4",
            links: [
                {
                    type: "Website",
                    href: "https://makethumb.com",
                },
            ],
            image: "/makethumb.png",
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
            Badge: ["Personal"],
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
            Badge: ["Personal"],
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
            slug: "storage-as-a-service",
            title: "Cloud-Storage",
            dates: "Jan 2025 – Jun 2025",
            description:
                "Secure internal cloud storage system with efficient file uploads and virtual folders. Leverages AWS S3 and CloudFront for fast content delivery and robust file management.",
            technologies: [
                "Next.js",
                "JavaScript",
                "PostgreSQL",
                "AWS S3",
                "CloudFront",
                "Docker",
            ],
            Badge: ["Personal"],
            Notion_id: "248d7bdb0e2e807cbcd8fd1c7ec3ecf3",
            links: [
                {
                    type: "Website",
                    href: "https://storage.srb.codes",
                },
            ],
            image: "/storage.png",
        },
        {
            slug: "college-chatbot",
            title: "AI-Chatbot",
            dates: "Oct 2024 – May 2025",
            description:
                "AI-powered chatbot trained on college website content to instantly answer student queries.",
            technologies: [
                "Next.js",
                "JavaScript",
                "Cloudflare KV",
                "Gemini API"

            ],
            Badge: ["Client"],
            Notion_id: "",
            links: [
                {
                    type: "Website",
                    href: "https://poddarai.srb.codes",
                },
            ],
            image: "/chatbot.png",
        },
        {
            slug: "kairos-chat",
            title: "public-chatrooms",
            dates: "Mar 2025 – May 2025",
            description:
                "Real-time public chat platform built on edge-first infrastructure.",
            technologies: [
                "Durable Objects",
                "WebSocket",
                "SQLite",
                "JavaScript",
            ],
            Badge: ["OSS"],
            Notion_id: "248d7bdb0e2e806584e4c88572d5f244",
            links: [
                {
                    type: "Website",
                    href: "https://kairo.srb.codes",
                },
            ],
            image: "/kairo.png",
        },


    ],
}