import Iridescence from "@/src/components/ui/Iridescence";
import Noise from "@/src/components/ui/Noise";
import Footer from "@/src/components/layout/Footer";

export function ContactSection() {
    return (
        <section id="contact" className="relative mx-4 sm:mx-8 md:mx-16 mt-10 sm:mt-20 mb-4 sm:mb-8 bg-black h-[calc(100vh-100px)] sm:h-[calc(100vh-150px)] flex flex-col justify-between rounded-2xl sm:rounded-4xl overflow-hidden">

            {/* Iridescence as background */}
            <Iridescence
                color={[0.1, 0.3, 0.1]}
                mouseReact={false}
                amplitude={0.1}
                speed={1.0}
                className="absolute inset-0 w-full h-full z-0"
            />

            {/* Noise overlay */}
            <div className="absolute inset-0 z-10">
                <Noise
                    patternSize={300}
                    patternScaleX={1}
                    patternScaleY={1}
                    patternRefreshInterval={2}
                    patternAlpha={25}
                />
            </div>

            {/* Content on top */}
            <div className="relative z-20 flex flex-col justify-between h-full">
                <div className="h-2/3 flex justify-start mt-4 sm:mt-8 text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white pl-4 sm:pl-8 pt-4 sm:pt-8 leading-tight font-serif">
                    <h2>
                        <strong>Front to back,</strong><br />
                        I've got your stack.
                    </h2>
                </div>
                {/* <div className="flex justify-end mr-6 h-1/3 items-center text-2xl text-white font-inter">
                    <h2>
                        Have a project or idea? Let's talk —
                        <span className="text-white ml-2 hover:underline">sourabhs701@gmail.com</span>
                    </h2>
                </div> */}
                <Footer />
            </div>

        </section>
    );
}
