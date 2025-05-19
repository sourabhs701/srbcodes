import Link from "next/link";

export default function Navbar() {
  return (
    <header className="bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-800">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <Link
              href="/"
              className="text-2xl font-bold text-gray-900 dark:text-white"
            >
              SRB.CODES
            </Link>
          </div>

          <div className="md:flex md:items-center md:gap-12">
            <nav className="hidden md:block" aria-label="Global">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <Link
                    href="/"
                    className="text-gray-700 transition hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-400"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/projects"
                    className="text-gray-700 transition hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-400"
                  >
                    Projects
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com/sourabhs701"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 transition hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-400"
                  >
                    GitHub
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Mobile menu button */}
            <div className="flex items-center gap-4 md:hidden">
              <button
                className="rounded-lg bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75 dark:bg-gray-800 dark:text-gray-200"
                aria-label="Toggle Menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
