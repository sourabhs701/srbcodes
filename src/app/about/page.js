import Footer from "@/src/components/layout/Footer";
import Image from "next/image";
const About = () => {
  return (
    <>
      <div className="mx-16 ">
        <div className="h-[200px]"></div>
        <div className="flex flex-row gap-10">
          <div>
            <h1>Nice to meet you!</h1>
            <br />
            <p>
              I&apos;m Sourabh, a software engineer with a passion for building
              products that are both functional and aesthetically pleasing.
            </p>
            <br />
            <p>
              From crafting sleek logos to building full-scale brand identities,
              my primary focus lays on designs that are both visually pleasing
              and differ from your competitors.
            </p>
            <br />
            <p>
              Outside of work , I love reading books and playing snooker while
              listening to han zimmer.
            </p>
          </div>
          {/* profile picture */}
          <div>
            <Image src="/profile_1200.jpeg" alt="Profile" width={128} height={128} />
          </div>
        </div>

        <div className="mt-16">
          <h1>Approach</h1>
          <p>
            My process consists of four key steps, carefully refined for maximum
            efficiency
            <br /> and effectiveness on both ends.
          </p>
          <p className="mt-4">Start project</p>
          <div className="mt-4 flex gap-4">
            <p>
              Discovery & Strategy
              <br />
              After a quick call to understand your needs, I’ll make a strategy
              backed by deep market research, ensuring your brand looks great
              and works effectively.
            </p>
            <p>
              Design
              <br />
              With a solid strategy in place, I’ll develop design assets that
              bring it to life, ensuring a cohesive visual identity that aligns
              with your business.
            </p>
            <p>
              Feedback
              <br />
              Your input is essential. We’ll discuss your preferences and refine
              the final details, ensuring everything is perfected before launch.
            </p>
            <p>
              Launch & Support
              <br />
              Ready to launch! You’ll receive all files, including guidelines
              for consistent use across platforms. Even after the project is
              done, I’ll be here to support you—focused on long-term success.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
