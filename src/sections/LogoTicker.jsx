'use client'

import quantumLogo from '@/public/logo/logo-quantum.png'
import acmeLogo from '@/public/logo/logo-acme.png'
import echoLogo from '@/public/logo/logo-echo.png'
import celestialLogo from '@/public/logo/logo-celestial.png'
import pulseLogo from '@/public/logo/logo-pulse.png'
import apexLogo from '@/public/logo/logo-apex.png'


import Image from 'next/image'
import { motion } from 'framer-motion'
export const LogoTicker = () => {
    return (
        <div className='py-8 md:py-12 bg-gray-100'>
            <div className='container'>
                <div className='flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black,transparent)]'>
                    <motion.div className='flex gap-14 flex-none pr-14'
                        animate={{
                            translateX: "-50%"
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear",
                            repeatType: "loop"
                        }}
                    >
                        <Image src={quantumLogo} alt="Quantum Logo" className='logo-ticker-image' />
                        <Image src={acmeLogo} alt="Acme Logo" className='logo-ticker-image' />
                        <Image src={echoLogo} alt="Echo Logo" className='logo-ticker-image' />
                        <Image src={celestialLogo} alt="Celestial Logo" className='logo-ticker-image' />
                        <Image src={pulseLogo} alt="Pulse Logo" className='logo-ticker-image' />
                        <Image src={apexLogo} alt="Apex Logo" className='logo-ticker-image' />

                        <Image src={quantumLogo} alt="Quantum Logo" className='logo-ticker-image' />
                        <Image src={acmeLogo} alt="Acme Logo" className='logo-ticker-image' />
                        <Image src={echoLogo} alt="Echo Logo" className='logo-ticker-image' />
                        <Image src={celestialLogo} alt="Celestial Logo" className='logo-ticker-image' />
                        <Image src={pulseLogo} alt="Pulse Logo" className='logo-ticker-image' />
                        <Image src={apexLogo} alt="Apex Logo" className='logo-ticker-image' />
                    </motion.div>
                </div>

            </div>
        </div>
    );
};