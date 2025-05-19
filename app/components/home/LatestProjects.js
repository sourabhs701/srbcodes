import Link from "next/link";

export default function LatestProjects() {
  // These are placeholder projects until we fetch from D1
  const projects = [
    {
      id: "1",
      slug: "portfolio-site",
      name: "Portfolio Website",
      description_short:
        "Personal portfolio and project showcase built with Next.js and Cloudflare Workers.",
      tech_stack: ["Next.js", "Cloudflare Workers", "Tailwind CSS"],
      cover_image_url:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600",
      is_public: true,
      github_link: "https://github.com/sourabhs701",
    },
    {
      id: "2",
      slug: "ai-summarizer",
      name: "AI Commit Summarizer",
      description_short:
        "Tool that uses AI to generate summaries of git commit messages.",
      tech_stack: ["Cloudflare AI", "JavaScript", "API"],
      cover_image_url:
        "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=600",
      is_public: true,
      github_link: "https://github.com/sourabhs701",
    },
    {
      id: "3",
      slug: "cloud-dashboard",
      name: "Cloud Analytics Dashboard",
      description_short:
        "Dashboard for monitoring and visualizing cloud service usage and performance.",
      tech_stack: ["React", "D3.js", "REST API"],
      cover_image_url:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600",
      is_public: false,
    },
  ];

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Latest Projects</h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Check out some of my recent work and projects. From web applications
            to AI integrations, these projects showcase my skills and interests.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="block overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
            >
              <img
                alt={project.name}
                src={project.cover_image_url}
                className="h-56 w-full object-cover"
              />

              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {project.name}
                  </h3>

                  {project.is_public && (
                    <span className="inline-flex items-center justify-center rounded-full bg-green-100 px-2.5 py-0.5 text-green-700 dark:bg-green-900 dark:text-green-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="-ms-1 me-1.5 h-4 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>

                      <p className="whitespace-nowrap text-xs">Public</p>
                    </span>
                  )}

                  {!project.is_public && (
                    <span className="inline-flex items-center justify-center rounded-full bg-gray-100 px-2.5 py-0.5 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="-ms-1 me-1.5 h-4 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                        />
                      </svg>

                      <p className="whitespace-nowrap text-xs">Private</p>
                    </span>
                  )}
                </div>

                <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-700 dark:text-gray-200">
                  {project.description_short}
                </p>

                <div className="mt-4 flex flex-wrap gap-1">
                  {project.tech_stack.map((tech, index) => (
                    <span
                      key={index}
                      className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-center gap-2 text-xs">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="block w-full rounded bg-blue-600 px-5 py-3 text-center text-xs font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    View Details
                  </Link>

                  {project.github_link && (
                    <Link
                      href={project.github_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-gray-300 p-3 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      <span className="sr-only">GitHub</span>
                      <svg
                        className="h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded border border-blue-600 px-8 py-3 text-blue-600 hover:bg-blue-600 hover:text-white focus:outline-none focus:ring active:bg-blue-500 dark:border-blue-500 dark:text-blue-400 dark:hover:bg-blue-500 dark:hover:text-white"
          >
            <span className="text-sm font-medium"> View All Projects </span>

            <svg
              className="h-5 w-5 rtl:rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
