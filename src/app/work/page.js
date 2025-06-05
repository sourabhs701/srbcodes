"use client";
import Footer from "@/src/components/layout/Footer";
import Loader from "@/src/components/layout/Loader";
import CustomCursor from "@/src/components/ui/CustomCursor";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";

const Page = () => {
  const [showCustomCursor, setShowCustomCursor] = useState(false);
  const [workItems, setWorkItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageLoading, setPageLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchWorkItems = async () => {
      try {
        const res = await fetch("/api/work");
        if (!res.ok) throw new Error("Failed to fetch work items");
        const data = await res.json();
        setWorkItems(data.data);
      } catch (err) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkItems();
  }, []);

  const handleNavigation = (href) => {
    setPageLoading(true);
    router.push(href);
  };

  return (
    <>
      {pageLoading && <Loader />}
      <CustomCursor isVisible={showCustomCursor} />
      <div className="h-[200px] bg-black"></div>
      <div className="mx-16 mb-16">
        {/* <h1 className="text-4xl font-light py-6">Projects</h1> */}

        {loading ? (
          <div className="py-8 text-center">
            <p className="text-lg text-gray-500">Loading projects...</p>
          </div>
        ) : error ? (
          <div className="py-8 text-center">
            <p className="text-lg text-red-500">Error: {error}</p>
          </div>
        ) : workItems.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-lg text-gray-500">No projects found</p>
          </div>
        ) : (
          <div className="flex flex-col">
            {workItems.map((item) => (
              <Link
                key={item.slug}
                heading={item.title || item.slug}
                subheading={item.description || ""}
                imgSrc={item.image || "https://via.placeholder.com/400x300"}
                href={`/work/${item.slug}`}
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

const Link = ({
  heading,
  imgSrc,
  subheading,
  href,
  setShowCustomCursor,
  onClick,
}) => {
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
      href={href}
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
          className="relative z-10 block text-4xl font-bold text-neutral-500 transition-colors duration-500 group-hover:text-neutral-50 md:text-6xl"
        >
          {heading.split("").map((l, i) => (
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

        <span className="relative z-10 mt-2 block text-base text-neutral-500 transition-colors duration-500 group-hover:text-neutral-50">
          {subheading}
        </span>
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
        src={imgSrc}
        className="absolute z-0 h-24 w-32 rounded-lg object-cover md:h-48 md:w-64"
        alt={`Image for ${heading}`}
      />
    </motion.a>
  );
};

export default Page;
