"use client";
import Footer from "@/src/components/layout/Footer";
import Loader from "@/src/components/layout/Loader";
import CustomCursor from "@/src/components/ui/CustomCursor";
import CategorySelector from "@/src/components/ui/CategorySelector";
import { DATA } from "@/src/data/resume";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";
import { useRef, useState, useMemo } from "react";

const Page = () => {
  const [showCustomCursor, setShowCustomCursor] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const router = useRouter();

  const handleNavigation = (href) => {
    setPageLoading(true);
    router.push(href);
  };

  // Get all unique categories from badges
  const categories = useMemo(() => {
    const allCategories = DATA.projects.flatMap(
      (project) => project.Category || []
    );
    const uniqueCategories = [...new Set(allCategories)];
    return ["All", ...uniqueCategories.sort()];
  }, []);

  // Filter projects based on selected category
  const filteredProjects = useMemo(() => {
    if (selectedCategory === "All") {
      return DATA.projects;
    }
    return DATA.projects.filter(
      (project) =>
        project.Category && project.Category.includes(selectedCategory)
    );
  }, [selectedCategory]);

  return (
    <>
      {pageLoading && <Loader />}
      <CustomCursor isVisible={showCustomCursor} />
      <div className="h-[200px] bg-black"></div>
      <div className="mx-2 md:mx-16 mb-16">
        <CategorySelector
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          filteredCount={filteredProjects.length}
          totalCount={DATA.projects.length}
          label="projects"
        />

        {filteredProjects.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-lg text-gray-500">
              No projects found in this category
            </p>
          </div>
        ) : (
          <div className="flex flex-col space-y-8">
            {filteredProjects.map((item) => (
              <Link
                key={item.slug}
                item={item}
                setShowCustomCursor={setShowCustomCursor}
                onClick={() => handleNavigation(`/work/${item.slug}`)}
              />
            ))}
          </div>
        )}
      </div>
      <div className="pt-16">
        <Footer />
      </div>
    </>
  );
};

const Link = ({ item, setShowCustomCursor, onClick }) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const top = useTransform(mouseYSpring, [0.5, -0.5], ["40%", "60%"]);
  const left = useTransform(mouseXSpring, [0.5, -0.5], ["60%", "70%"]);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (onClick) onClick();
  };

  return (
    <motion.a
      href={`/work/${item.slug}`}
      ref={ref}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      initial="initial"
      whileHover="whileHover"
      className="group relative flex items-center justify-between border-b-2 border-neutral-700 py-4 transition-colors duration-500 hover:border-neutral-50 md:py-8 cursor-none"
      style={{
        cursor: "none",
      }}
      onMouseEnter={() => {
        document.body.style.cursor = "none";
        setShowCustomCursor(true);
      }}
      onMouseLeave={() => {
        document.body.style.cursor = "auto";
        setShowCustomCursor(false);
      }}
    >
      <div>
        <motion.span
          variants={{
            initial: { x: 0 },
            whileHover: { x: -16 },
          }}
          transition={{
            type: "spring",
            staggerChildren: 0.075,
            delayChildren: 0.25,
          }}
          className="relative z-10 block text-2xl font-bold text-neutral-500 transition-colors duration-300 group-hover:text-neutral-50 md:text-3xl"
        >
          {item.title.split("").map((l, i) => (
            <motion.span
              variants={{
                initial: { x: 0 },
                whileHover: { x: 16 },
              }}
              transition={{ type: "spring" }}
              className="inline-block"
              key={i}
            >
              {l}
            </motion.span>
          ))}
        </motion.span>

        <span className="relative z-10 mt-2 block text-base text-neutral-500 transition-colors duration-300 group-hover:text-neutral-50 mb-1">
          {item.description}
        </span>

        <div className="flex items-center gap-4 text-sm text-neutral-600 group-hover:text-neutral-400">
          <span>{item.dates}</span>
          <span>•</span>
          {item.technologies.map((tech, index) => (
            <span
              key={`tech-${index}`}
              className="bg-neutral-800 px-2 py-1 rounded text-xs "
            >
              {tech}
            </span>
          ))}

          <span>•</span>
          {item.Category.map((category, index) => (
            <span
              key={`category-${index}`}
              className="bg-neutral-600 text-neutral-800 group-hover:text-neutral-400 px-3 py-1 rounded text-xs mr-2"
            >
              {category}
            </span>
          ))}
        </div>
      </div>

      <motion.img
        style={{
          top,
          left,
          translateX: "-50%",
          translateY: "-50%",
        }}
        variants={{
          initial: { scale: 0, rotate: "-12.5deg" },
          whileHover: { scale: 1, rotate: "12.5deg" },
        }}
        transition={{ type: "spring" }}
        src={item.image}
        className="absolute z-50 h-24 w-32 rounded-lg object-cover md:h-48 md:w-64"
        alt={`Image for ${item.title}`}
      />
    </motion.a>
  );
};

export default Page;
