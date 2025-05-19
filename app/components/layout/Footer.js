import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex justify-center text-gray-500 dark:text-gray-400 sm:justify-start">
            <p className="text-sm">
              © {currentYear} SRB.CODES. All rights reserved.
            </p>
          </div>

          <nav className="mt-4 flex justify-center gap-6 text-sm sm:mt-0 sm:justify-end">
            <Link
              href="/"
              className="text-gray-500 transition hover:text-gray-500/75 dark:text-gray-400 dark:hover:text-gray-400/75"
            >
              Home
            </Link>

            <Link
              href="/projects"
              className="text-gray-500 transition hover:text-gray-500/75 dark:text-gray-400 dark:hover:text-gray-400/75"
            >
              Projects
            </Link>

            <Link
              href="https://github.com/sourabhs701"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 transition hover:text-gray-500/75 dark:text-gray-400 dark:hover:text-gray-400/75"
            >
              GitHub
            </Link>

            <Link
              href="https://twitter.com/sourabhs701"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 transition hover:text-gray-500/75 dark:text-gray-400 dark:hover:text-gray-400/75"
            >
              Twitter
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
