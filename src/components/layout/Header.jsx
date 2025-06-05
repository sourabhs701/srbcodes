'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { GripVertical, GripHorizontal, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SocialIcons } from '../SocialIcons';
import Magnet from '@/src/components/ui/Magnet';

export default function Header() {
  const [show, setShow] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    let lastScroll = window.scrollY;
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setShow(currentScroll < lastScroll || currentScroll < 10);
      lastScroll = currentScroll;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`flex justify-between items-center px-4 sm:px-6 md:px-8 lg:px-16 py-4 md:py-8 sticky top-0 z-50 transition-transform duration-300 ${show ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className='font-inter font-light text-xs sm:text-sm md:text-base flex items-center gap-2'>
          <Magnet padding={100} disabled={false} magnetStrength={10} onClick={() => setIsOpen(!isOpen)}
            className="text-black">
            {isOpen ?
              <GripHorizontal size={20} className='text-white hover:text-blue-600 transition-colors' /> :
              <GripVertical size={20} className='text-white hover:text-blue-600 transition-colors' />
            }
          </Magnet>

          <Link href='/' className="hover:opacity-80 tracking-wider">SRB.CODES</Link>
        </div>
        <div className=' md:flex font-inter font-light text-xs space-x-6 items-center tracking-wider'>
          <Link href='/work' className='blue-dot hover:text-blue-600 transition-colors hover:underline font-medium'>WORK</Link>
          <Link href='/about' className='hover:text-blue-600 transition-colors font-medium hover:underline'>ABOUT</Link>
          <Link href='/#contact' className='hover:text-blue-600 transition-colors font-medium hover:underline'>CONTACT</Link>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black text-white z-50 flex flex-col justify-between px-4 sm:px-6 md:px-8 lg:px-16 py-4 md:py-8 overflow-y-auto"
          >
            {/* Close Button */}
            <div className="flex justify-start">
              <Magnet padding={100} disabled={false} magnetStrength={10} onClick={() => setIsOpen(false)}>
                <GripHorizontal size={20} className='text-white text-xs sm:text-sm md:text-base hover:text-blue-600 transition-colors' />
              </Magnet>

              <Link href='/' className="tracking-wider text-white font-inter font-light pl-2 text-xs sm:text-sm md:text-base">SRB.CODES</Link>
            </div>

            <div className='flex flex-col lg:flex-row h-full justify-between gap-8 lg:gap-16 text-white py-8'>
              <div className='grid place-content-center gap-2 text-white'>
                <FlipLink href="/" onClick={() => setIsOpen(false)}>Home</FlipLink>
                <FlipLink href="/work" onClick={() => setIsOpen(false)}>Work</FlipLink>
                <FlipLink href="/about" onClick={() => setIsOpen(false)}>About</FlipLink>
                <FlipLink href="/#contact" onClick={() => setIsOpen(false)}>Contact</FlipLink>
              </div>

              <div className='flex flex-col justify-center items-start lg:items-end h-full text-white font-inter text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold uppercase tracking-wide mt-8 lg:mt-0'>
                <div>
                  <h1>Social</h1>
                  <SocialIcons />
                </div>

                <div className='mt-6 lg:mt-8'>
                  <h1>Address</h1>
                  <p className='font-light text-base sm:text-lg md:text-xl leading-none'>Originally from India To World.</p>
                </div>
                <div className='mt-6 lg:mt-8'>
                  <h1>Say hi 👋</h1>
                  <p className="underline font-light text-base sm:text-lg md:text-xl">sourabhs701@gmail.com</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const DURATION = 0.25;
const STAGGER = 0.025;
const FlipLink = ({ children, href, onClick }) => {
  return (
    <motion.a
      initial="initial"
      whileHover="hovered"
      href={href}
      onClick={onClick}
      className="relative block overflow-hidden whitespace-nowrap text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl font-black uppercase"
      style={{
        lineHeight: 0.75,
      }}
    >
      <div>
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: {
                y: 0,
              },
              hovered: {
                y: "-100%",
              },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
      <div className="absolute inset-0">
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: {
                y: "100%",
              },
              hovered: {
                y: 0,
              },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
    </motion.a>
  );
};