import Carousel from "@/src/components/ui/Carousel";

export function SocialSection() {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-8 md:mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 font-handwritten">
            Check my{" "}
            <a
              href="https://x.com/sourabhdotsol"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600 underline"
            >
              X
            </a>{" "}
            out
          </h2>
        </div>

        <div className="flex justify-center">
          <div>
            <Carousel
              baseWidth={350}
              autoplay={true}
              autoplayDelay={5000}
              pauseOnHover={true}
              loop={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
