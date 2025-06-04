"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const CustomCursor = ({ isVisible }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-20 h-20 bg-black rounded-full flex items-center justify-center z-50 pointer-events-none mix-blend-difference"
      style={{
        x: mousePosition.x - 40,
        y: mousePosition.y - 40,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
    >
      <div className="w-16 h-16 border-2 border-white rounded-full flex items-center justify-center">
        <ArrowUpRight className="text-white text-sm font-medium tracking-wider" />
      </div>
    </motion.div>
  );
};

export default CustomCursor;
