"use client";
import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";

const DEFAULT_ITEMS = [
    {
        username: "sourabh.sol",
        handle: "@sourabhdotsol",
        verified: true,
        content: "i want this frame sooooo badddddd",
        timestamp: "11:39 PM · Dec 7, 2025",
        image: "/x/1.png",
        likes: "35.2K",
        replies: "2.6K",
        id: 1,
        profileImage: "/profile_320.jpeg",
    },
    {
        username: "sourabh.sol",
        handle: "@sourabhdotsol",
        verified: true,
        content: "setup check.",
        timestamp: "3:45 PM · Dec 5, 2024",
        image: "/x/2.png",
        likes: "42.1K",
        replies: "3.4K",
        id: 2,
        profileImage: "/profile_320.jpeg",
    },
    {
        username: "sourabh.sol",
        handle: "@sourabhdotsol",
        verified: true,
        content: "ps: this image is ai generated",
        timestamp: "9:30 AM · Dec 1, 2025",
        image: "/x/3.png",
        likes: "12.8K",
        replies: "847",
        id: 3,
        profileImage: "/profile_320.jpeg",
    },
];

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = { type: "spring", stiffness: 300, damping: 30 };

export default function Carousel({
    items = DEFAULT_ITEMS,
    baseWidth = 450,
    autoplay = false,
    autoplayDelay = 3000,
    pauseOnHover = false,
    loop = false,
    round = false,
}) {
    const containerPadding = 16;
    const itemWidth = baseWidth - containerPadding * 2;
    const trackItemOffset = itemWidth + GAP;

    const carouselItems = loop ? [...items, items[0]] : items;
    const [currentIndex, setCurrentIndex] = useState(0);
    const x = useMotionValue(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isResetting, setIsResetting] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Check if we're on mobile
    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkIsMobile();
        window.addEventListener('resize', checkIsMobile);

        return () => {
            window.removeEventListener('resize', checkIsMobile);
        };
    }, []);

    const containerRef = useRef(null);
    useEffect(() => {
        if (pauseOnHover && containerRef.current) {
            const container = containerRef.current;
            const handleMouseEnter = () => setIsHovered(true);
            const handleMouseLeave = () => setIsHovered(false);
            container.addEventListener("mouseenter", handleMouseEnter);
            container.addEventListener("mouseleave", handleMouseLeave);
            return () => {
                container.removeEventListener("mouseenter", handleMouseEnter);
                container.removeEventListener("mouseleave", handleMouseLeave);
            };
        }
    }, [pauseOnHover]);

    useEffect(() => {
        if (autoplay && (!pauseOnHover || !isHovered)) {
            const timer = setInterval(() => {
                setCurrentIndex((prev) => {
                    if (prev === items.length - 1 && loop) {
                        return prev + 1; // Animate to clone.
                    }
                    if (prev === carouselItems.length - 1) {
                        return loop ? 0 : prev;
                    }
                    return prev + 1;
                });
            }, autoplayDelay);
            return () => clearInterval(timer);
        }
    }, [
        autoplay,
        autoplayDelay,
        isHovered,
        loop,
        items.length,
        carouselItems.length,
        pauseOnHover,
    ]);

    const effectiveTransition = isResetting ? { duration: 0 } : SPRING_OPTIONS;

    const handleAnimationComplete = () => {
        if (loop && currentIndex === carouselItems.length - 1) {
            setIsResetting(true);
            x.set(0);
            setCurrentIndex(0);
            setTimeout(() => setIsResetting(false), 50);
        }
    };

    const handleDragEnd = (_, info) => {
        const offset = info.offset.x;
        const velocity = info.velocity.x;
        if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
            if (loop && currentIndex === items.length - 1) {
                setCurrentIndex(currentIndex + 1);
            } else {
                setCurrentIndex((prev) => Math.min(prev + 1, carouselItems.length - 1));
            }
        } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
            if (loop && currentIndex === 0) {
                setCurrentIndex(items.length - 1);
            } else {
                setCurrentIndex((prev) => Math.max(prev - 1, 0));
            }
        }
    };

    const dragProps = loop
        ? {}
        : {
            dragConstraints: {
                left: -trackItemOffset * (carouselItems.length - 1),
                right: 0,
            },
        };

    return (
        <div
            className="relative mx-auto"
            style={{
                maxWidth: `${isMobile ? Math.min(baseWidth + 40, window.innerWidth - 20) : baseWidth + 40}px`,
            }}
        >
            {/* iPhone frame */}
            <div className="relative rounded-[40px] bg-[#1a1a1c] p-3 shadow-xl border border-[#2a2a2c]">
                {/* iPhone notch */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-8 bg-[#1a1a1c] rounded-b-2xl z-10 flex justify-center items-end pb-1">
                    <div className="w-16 h-5 bg-[#1a1a1c] rounded-lg relative">
                        <div className="absolute left-4 top-1.5 w-2 h-2 rounded-full bg-[#383838]"></div>
                        <div className="absolute right-4 top-1.5 w-1 h-1 rounded-full bg-[#3a3a3c]"></div>
                    </div>
                </div>

                {/* iPhone screen */}
                <div
                    ref={containerRef}
                    className="relative overflow-hidden rounded-[32px] bg-white border border-gray-200 shadow-inner mt-4 pt-8"
                    style={{
                        width: `${isMobile ? Math.min(baseWidth, window.innerWidth - 40) : baseWidth}px`,
                        maxWidth: "100%",
                        paddingBottom: "28px", // Space for home indicator
                        paddingLeft: "16px",

                    }}
                >
                    {/* Home indicator */}
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-1/3 h-1 bg-black rounded-full z-10"></div>

                    <motion.div
                        className="flex"
                        drag="x"
                        dragDirectionLock
                        dragElastic={0.1}
                        {...dragProps}
                        style={{
                            width: itemWidth,
                            gap: `${GAP}px`,
                            perspective: 1000,
                            perspectiveOrigin: `${currentIndex * trackItemOffset + itemWidth / 2}px 50%`,
                            x,
                        }}
                        onDragEnd={handleDragEnd}
                        animate={{ x: -(currentIndex * trackItemOffset) }}
                        transition={effectiveTransition}
                        onAnimationComplete={handleAnimationComplete}
                    >
                        {carouselItems.map((item, index) => {
                            const range = [
                                -(index + 1) * trackItemOffset,
                                -index * trackItemOffset,
                                -(index - 1) * trackItemOffset,
                            ];
                            const outputRange = [90, 0, -90];
                            // eslint-disable-next-line react-hooks/rules-of-hooks
                            const rotateY = useTransform(x, range, outputRange, { clamp: false });
                            return (
                                <motion.div
                                    key={index}
                                    className="relative shrink-0 flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden cursor-grab active:cursor-grabbing shadow-sm hover:shadow-md transition-shadow"
                                    style={{
                                        width: itemWidth,
                                        rotateY: rotateY,
                                    }}
                                    transition={effectiveTransition}
                                >
                                    {/* Header with profile info */}
                                    <div className="flex items-center p-3 sm:p-4">
                                        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 mr-3 flex-shrink-0">
                                            {item.profileImage ? (
                                                <div className="relative w-full h-full">
                                                    <Image
                                                        src={item.profileImage}
                                                        alt={item.username}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center font-bold text-gray-500">
                                                    {item.username?.[0] || "?"}
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-grow min-w-0">
                                            <div className="flex items-center">
                                                <span className="font-bold text-black truncate">{item.username}</span>
                                                {item.verified && (
                                                    <span className="ml-1 text-blue-500 flex-shrink-0">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                                            <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                                                        </svg>
                                                    </span>
                                                )}
                                            </div>
                                            <div className="text-gray-500 truncate">{item.handle}</div>
                                        </div>
                                        <div className="text-gray-400 flex-shrink-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Post content */}
                                    <div className="px-3 sm:px-4 pb-3">
                                        <p className="text-black text-base mb-3">{item.content}</p>
                                    </div>

                                    {/* Post image */}
                                    {item.image && (
                                        <div className="relative w-full aspect-[16/9] bg-gray-100 mb-3 overflow-hidden border-t border-b border-gray-100">
                                            <Image
                                                src={item.image}
                                                alt={`Post by ${item.username}`}
                                                fill
                                                sizes="(max-width: 768px) 100vw, 450px"
                                                className="object-cover"
                                                priority
                                            />
                                        </div>
                                    )}

                                    {/* Post timestamp */}
                                    <div className="px-3 sm:px-4 text-gray-500 text-sm mb-2">
                                        {item.timestamp}
                                    </div>

                                    {/* Post interactions */}
                                    <div className="px-3 sm:px-4 py-3 flex justify-between border-t border-gray-200">
                                        <div className="flex items-center text-gray-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-sm">{item.replies}</span>
                                        </div>
                                        <div className="flex items-center text-rose-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-sm">{item.likes}</span>
                                        </div>
                                        <div className="flex items-center text-gray-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                                            </svg>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>

                {/* Volume buttons */}
                <div className="absolute left-[-2px] top-20 w-[4px] h-12 bg-gray-800 rounded-r-lg"></div>
                <div className="absolute left-[-2px] top-36 w-[4px] h-12 bg-gray-800 rounded-r-lg"></div>

                {/* Power button */}
                <div className="absolute right-[-2px] top-28 w-[4px] h-16 bg-gray-800 rounded-l-lg"></div>
            </div>

            {/* Indicators */}
            <div className="flex w-full justify-center items-center mt-4">
                <div className="flex justify-center gap-2 sm:gap-3">
                    {items.map((_, index) => (
                        <motion.button
                            key={index}
                            className={`h-1.5 sm:h-2 w-3 sm:w-4 rounded-full cursor-pointer transition-all duration-150 focus:outline-none ${currentIndex % items.length === index
                                ? "bg-blue-500 w-4 sm:w-6"
                                : "bg-gray-300 "
                                }`}
                            animate={{
                                scale: currentIndex % items.length === index ? 1.1 : 1,
                            }}
                            onClick={() => setCurrentIndex(index)}
                            transition={{ duration: 0.15 }}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
