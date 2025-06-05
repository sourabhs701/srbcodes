import React from 'react'
import { SocialIcons } from "@/src/components/SocialIcons";

const Footer = () => {
    return (
        <footer className="text-white w-full px-4 sm:px-8 md:px-16 py-6 sm:py-12 mt-4 sm:mt-6">
            <div className="mx-auto font-light tracking-wider">
                {/* <p className="text-sm mb-6">Contact</p> */}

                <h2 className="text-xl sm:text-2xl md:text-3xl font-light tracking-wider mb-3 sm:mb-4">I'd love to work together.</h2>

                <div className="mb-4 sm:mb-6">
                    <a
                        href="mailto:sourabhs701@gmail.com"
                        className="block hover:underline"
                    >
                        sourabhs701@gmail.com ↗
                    </a>
                    <a
                        href="tel:+918107655737"
                        className="block hover:underline"
                    >
                        +91 8107 655737
                    </a>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-2 sm:gap-0 text-xs sm:text-sm text-gray-200">
                    <span>srb.codes©{new Date().getFullYear()}</span>
                    <SocialIcons />
                    <span>All rights reserved </span>
                </div>
            </div>
        </footer>
    )
}

export default Footer
