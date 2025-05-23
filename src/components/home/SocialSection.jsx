import Carousel from "@/src/components/ui/Carousel";

export function SocialSection() {
  return (
    <section className="pt-4 pb-4 md:pt-4 md:pb-4">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="max-w-2xl">

          <h2 className="text-2xl font-medium font-handwritten text-gray-800 p-2">Check my X out</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div style={{ height: '600px', position: 'relative' }}>
              <Carousel
                baseWidth={300}
                autoplay={true}
                autoplayDelay={3000}
                pauseOnHover={true}
                loop={true}
                round={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
