export default function Collaboration() {
  return (
    <section className="bg-gray-50 dark:bg-gray-800">
      <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Let's Collaborate</h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            I'm always open to new opportunities and collaborations. Whether you
            need a full-stack developer, consultant, or just want to chat about
            technology, I'd love to hear from you.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Card 1 */}
          <div className="block rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-900">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </div>

            <h3 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">
              Full-Stack Development
            </h3>

            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Building complete web applications with modern technologies like
              Next.js, React, and Cloudflare's suite of edge services.
            </p>
          </div>

          {/* Card 2 */}
          <div className="block rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-900">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-purple-50 text-purple-600 dark:bg-purple-900 dark:text-purple-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                />
              </svg>
            </div>

            <h3 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">
              AI Integration
            </h3>

            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Implementing AI tools and services to create intelligent
              applications that solve real-world problems.
            </p>
          </div>

          {/* Card 3 */}
          <div className="block rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-900">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-50 text-green-600 dark:bg-green-900 dark:text-green-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                />
              </svg>
            </div>

            <h3 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">
              Edge Computing
            </h3>

            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Leveraging Cloudflare Workers and other edge computing solutions
              to build faster, more secure applications.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <a
            href="mailto:sourabhs701@gmail.com"
            className="inline-flex items-center gap-2 rounded border border-blue-600 bg-blue-600 px-8 py-3 text-white hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 dark:border-blue-500 dark:bg-blue-500 dark:hover:bg-transparent dark:hover:text-blue-300"
          >
            <span className="text-sm font-medium"> Get in Touch </span>

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
          </a>
        </div>
      </div>
    </section>
  );
}
