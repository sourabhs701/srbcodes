import Link from "next/link";
import { ArrowRight } from "lucide-react";

function GuideCard({ title, description, href }) {
  return (
    <Link href={href}>
      <div className="group h-full bg-white border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-4px]">
        <h3 className="text-xl mb-3 font-medium group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 text-sm mb-4">
          {description}
        </p>
        <div className="flex items-center text-sm font-medium text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
          <span>Read guide</span>
          <ArrowRight className="ml-1 h-4 w-4" />
        </div>
      </div>
    </Link>
  );
}
export function GuidesSection() {
  const guides = [
    {
      title: "Find winning startup ideas using Reddit & AI",
      description:
        "My exact playbook for how to find internet gold on Reddit and use AI to find and validate startup ideas. (video tutorial included)",
      href: "/reddit-ideas",
    },
    {
      title: "Startup ideas bank (+ how I'd start them)",
      description:
        "A database with 30+ of my favorite startup ideas, collected from hundreds of conversations with top entrepreneurs.",
      href: "/30startupideas",
    },
    {
      title: "2 growth playbooks for your business",
      description: "Get a B2B & B2C growth playbooks to build your business.",
      href: "/growth-guides",
    },
  ];

  return (
    <section className="py-12 ">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="max-w-2xl ">
          <h2 className="text-xl md:text-2xl font-handwritten font-medium text-gray-800 mb-8">
            Popular guides
          </h2>
          <p className="text-gray-600 max-w-2xl">
            Actionable resources to help you build and grow your startup
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {guides.map((guide, index) => (
            <GuideCard
              key={index}
              title={guide.title}
              description={guide.description}
              href={guide.href}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
