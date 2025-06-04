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
      <nav className={`flex justify-between items-center mx-16 py-8 sticky top-0 z-50  transition-transform duration-300 ${show ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className='font-inter font-light text-sm md:text-base flex items-center gap-2'>
          {/* if clicked switch to GripHorizontal and vice versa */}
          <Magnet padding={100} disabled={false} magnetStrength={10} onClick={() => setIsOpen(!isOpen)}
            className="text-black ">


            {isOpen ? <GripHorizontal size={24} className='text-white hover:text-blue-600 transition-colors' /> : <GripVertical size={24} className='text-white hover:text-blue-600 transition-colors' />}

          </Magnet>

          <Link href='/' className="hover:opacity-80 tracking-wider">SRB.CODES</Link>
        </div>
        <div className='font-inter font-light text-sm flex space-x-6 items-center tracking-wider '>
          <Link href='/work' className='blue-dot hover:text-blue-600 transition-colors hover:underline font-medium'>WORK</Link>
          <Link href='/about' className='hover:text-blue-600 transition-colors font-medium hover:underline'>ABOUT</Link>
          <Link href='/#contact' className='hover:text-blue-600 transition-colors font-medium hover:underline'>CONTACT</Link>
        </div>
      </nav>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black text-white z-50 flex flex-col justify-between px-16 py-8"
        >
          {/* Close Button */}
          <div className="flex justify-start">
            <Magnet padding={100} disabled={false} magnetStrength={10} onClick={() => setIsOpen(false)} >
              <GripHorizontal size={24} className='text-white hover:text-blue-600 transition-colors ' />
            </Magnet>

            <Link href='/' className="tracking-wider text-white font-inter font-light pl-2">SRB.CODES</Link>
          </div>



          <div className='flex h-full justify-between gap-16 text-white '>
            <div className='grid place-content-center gap-2 text-white px-8'>
              <FlipLink href="/" onClick={() => setIsOpen(false)}>Home</FlipLink>
              <FlipLink href="/work" onClick={() => setIsOpen(false)}>Work</FlipLink>
              <FlipLink href="/about" onClick={() => setIsOpen(false)}>About</FlipLink>
              <FlipLink href="/#contact" onClick={() => setIsOpen(false)}>Contact</FlipLink>
            </div>

            <div className='flex flex-col justify-center items-end h-full text-white font-inter text-7xl font-semibold uppercase tracking-wide'>
              <div>
                <h1>Social</h1>
                <SocialIcons />
              </div>

              <div className='mt-8'>
                <h1>Address</h1>
                <p className='font-light text-xl leading-none'>Originally from India To World.</p>
              </div>
              <div className='mt-8'>
                <h1>Say hi 👋</h1>
                <p className="underline font-light text-xl">sourabhs701@gmail.com</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}

const DURATION = 0.25;
const STAGGER = 0.025;
const FlipLink = ({ children, href }) => {
  return (
    <motion.a
      initial="initial"
      whileHover="hovered"
      href={href}
      className="relative block overflow-hidden whitespace-nowrap text-4xl font-black uppercase sm:text-7xl md:text-8xl lg:text-9xl"
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