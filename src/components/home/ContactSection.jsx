import Iridescence from "@/src/components/ui/Iridescence";
import Noise from "@/src/components/ui/Noise";

export function ContactSection() {
    return (
        <section className="relative py-20 px-6 h-screen">
            {/* Card container */}
            <div className="relative max-w-6xl mx-auto rounded-3xl overflow-hidden bg-orange-500">

                {/* Content */}
                <div className="relative z-10 text-center px-8 py-24 md:px-16 md:py-32 lg:px-24 lg:py-40">
                    {/* Main heading */}
                    <h2 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-16 leading-tight max-w-4xl mx-auto">
                        Wanna create something awesome together?
                    </h2>

                    {/* Let's talk button */}
                    <div className="mb-12">
                        <button className="group relative inline-flex items-center gap-3 px-8 py-4 text-lg font-medium text-white bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20 transition-all duration-300">
                            <span className="text-xl">✨</span>
                            <span>Let's talk</span>
                            <span className="text-xl">✨</span>
                        </button>
                    </div>

                    {/* Contact info */}
                    <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto">
                        Don't like flashy buttons? Reach out at{" "}
                        <a
                            href="mailto:contact@davidhaz.com"
                            className="text-white hover:text-white/80 transition-colors underline decoration-white/50 hover:decoration-white/80"
                        >
                            contact@davidhaz.com
                        </a>
                    </p>
                </div>
            </div>
        </section>
    );
}
