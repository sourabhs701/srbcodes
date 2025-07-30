import Footer from "@/src/components/layout/Footer";
import Image from "next/image";
import {
  Code2,
  Lightbulb,
  Rocket,
  Users,
  Award,
  BookOpen,
  Music,
  Target,
} from "lucide-react";

const About = () => {
  const skills = [
    {
      icon: Code2,
      title: "Full-Stack Development",
      description: "Building end-to-end solutions with modern technologies",
    },
    {
      icon: Rocket,
      title: "System Architecture",
      description: "Designing scalable and maintainable software systems",
    },
    {
      icon: Lightbulb,
      title: "AI Integration",
      description: "Implementing intelligent automation and ML solutions",
    },
    {
      icon: Users,
      title: "Team Leadership",
      description: "Mentoring developers and leading technical projects",
    },
  ];

  const process = [
    {
      step: "01",
      title: "Discovery & Strategy",
      description:
        "Understanding your needs through deep consultation and market research to create a tailored strategy.",
    },
    {
      step: "02",
      title: "Architecture & Design",
      description:
        "Crafting scalable solutions with clean code architecture and user-centered design principles.",
    },
    {
      step: "03",
      title: "Development & Testing",
      description:
        "Building robust applications with comprehensive testing and quality assurance throughout.",
    },
    {
      step: "04",
      title: "Launch & Support",
      description:
        "Seamless deployment with ongoing support and optimization for long-term success.",
    },
  ];

  const interests = [
    {
      icon: BookOpen,
      label: "Reading",
      description: "Technical literature & philosophy",
    },
    { icon: Music, label: "Music", description: "Hans Zimmer soundtracks" },
    {
      icon: Target,
      label: "Snooker",
      description: "Strategic thinking & precision",
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-6 pt-24 pb-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              {/* Content */}
              <div className="lg:col-span-8 space-y-8">
                <div className="space-y-6">
                  <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                    Nice to
                    <span className="text-blue-500"> meet you</span>!
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl">
                    I&apos;m{" "}
                    <span className="text-white font-medium">Sourabh</span>, a
                    passionate software engineer who creates digital experiences
                    that are both functional and beautifully crafted.
                  </p>
                </div>

                <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
                  <p>
                    With a strong foundation in{" "}
                    <span className="text-blue-400 font-medium">
                      full-stack development
                    </span>{" "}
                    and
                    <span className="text-blue-400 font-medium">
                      {" "}
                      system architecture
                    </span>
                    , I specialize in building scalable solutions that solve
                    complex business challenges.
                  </p>
                  <p>
                    My approach combines technical excellence with creative
                    problem-solving, ensuring every project delivers both
                    outstanding performance and exceptional user experiences.
                  </p>
                </div>
              </div>

              {/* Profile Image */}
              <div className="lg:col-span-4 flex justify-center lg:justify-end">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-white to-blue-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                  <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-2 border-gray-800 shadow-2xl">
                    <Image
                      src="/profile_1200.jpeg"
                      alt="Sourabh - Software Engineer"
                      width={400}
                      height={400}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="container mx-auto px-6 py-24">
          <div className="max-w-6xl mx-auto space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Core <span className="text-blue-500">Expertise</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Specialized skills honed through years of building innovative
                solutions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {skills.map((skill, index) => {
                const IconComponent = skill.icon;
                return (
                  <div
                    key={index}
                    className="group p-8 bg-gray-900/50 border border-gray-800 rounded-2xl hover:border-blue-500/50 transition-all duration-300 hover:bg-gray-900/70"
                  >
                    <div className="space-y-4">
                      <div className="p-3 bg-blue-500/10 rounded-lg w-fit group-hover:bg-blue-500/20 transition-colors duration-300">
                        <IconComponent className="w-8 h-8 text-blue-400" />
                      </div>
                      <h3 className="text-2xl font-semibold text-white">
                        {skill.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {skill.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="container mx-auto px-6 py-24 bg-gray-900/30">
          <div className="max-w-6xl mx-auto space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                My <span className="text-blue-500">Approach</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                A refined four-step process designed for maximum efficiency and
                exceptional results
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {process.map((step, index) => (
                <div
                  key={index}
                  className="group relative p-8 bg-black/50 border border-gray-800 rounded-2xl hover:border-blue-500/50 transition-all duration-300"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <span className="text-6xl font-bold text-blue-500/30 group-hover:text-blue-500/50 transition-colors duration-300">
                        {step.step}
                      </span>
                      <h3 className="text-2xl font-semibold text-white">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-gray-300 leading-relaxed pl-20">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Personal Interests */}
        <section className="container mx-auto px-6 py-24">
          <div className="max-w-4xl mx-auto space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Beyond <span className="text-blue-500">Code</span>
              </h2>
              <p className="text-xl text-gray-300">
                What fuels my creativity and keeps me inspired
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {interests.map((interest, index) => {
                const IconComponent = interest.icon;
                return (
                  <div
                    key={index}
                    className="text-center p-8 bg-gray-900/30 border border-gray-800 rounded-2xl hover:border-blue-500/30 transition-all duration-300 group"
                  >
                    <div className="space-y-4">
                      <div className="mx-auto p-4 bg-blue-500/10 rounded-full w-fit group-hover:bg-blue-500/20 transition-colors duration-300">
                        <IconComponent className="w-8 h-8 text-blue-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-white">
                        {interest.label}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {interest.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default About;
