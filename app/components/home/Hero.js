import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 py-12 lg:flex lg:items-center lg:gap-12 lg:py-16">
        <div className="mx-auto max-w-3xl text-center lg:text-left">
          <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
            Building Digital <span className="sm:block">Experiences</span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm text-gray-600 dark:text-gray-400 sm:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Full-stack developer crafting modern web applications with Next.js,
            Cloudflare, and other cutting-edge technologies.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
            <Link
              href="/projects"
              className="block w-full rounded bg-gradient-to-r from-blue-500 to-purple-600 px-12 py-3 text-sm font-medium text-white shadow hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring sm:w-auto"
            >
              View Projects
            </Link>

            <Link
              href="https://github.com/sourabhs701"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-blue-600 hover:bg-blue-600 hover:text-white focus:outline-none focus:ring active:bg-blue-500 dark:border-blue-400 dark:text-blue-400 dark:hover:border-blue-500 dark:hover:bg-blue-500 dark:hover:text-white sm:w-auto"
            >
              GitHub
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
