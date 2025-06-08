import { SocialIcons } from "@/src/components/SocialIcons";
import { Code, Server, Zap, Award } from 'lucide-react';
import Iridescence from "@/src/components/ui/Iridescence";
import Noise from "@/src/components/ui/Noise";

export function AboutSection() {
  const skills = [
    { icon: Code, label: "Full-Stack Development" },
    { icon: Server, label: "Backend Architecture" },
    { icon: Zap, label: "AI Integration" },
    { icon: Award, label: "Enterprise Solutions" }
  ];

  return (
    <div className="space-y-12 ">

      {/* Profile Section */}
      <div className="relative space-y-8 p-8 rounded-2xl overflow-hidden">
        {/* Iridescence background */}
        <Iridescence
          color={[0.6, 0.3, 0.6]}
          mouseReact={false}
          amplitude={0.2}
          speed={1.2}
          className="absolute inset-0 w-full h-full z-0"
        />

        {/* Noise overlay */}
        <div className="absolute inset-0 z-10">
          <Noise
            patternSize={350}
            patternScaleX={1}
            patternScaleY={1}
            patternRefreshInterval={2}
            patternAlpha={25}
          />
        </div>

        {/* Profile content with z-index to appear above backgrounds */}
        <div className="relative z-20">
          {/* Profile Info */}
          <div className="text-center lg:text-left space-y-4">

            <h2 className="text-3xl font-bold text-white">
              Full-Stack Engineer
            </h2>
            <div className="space-y-4">
              <p className="text-lg text-gray-300 leading-relaxed">
                <span className="text-white font-medium">Engineer by profession</span>, designer by heart.
                I build scalable, reliable software solutions that drive business growth.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Specializing in <span className="text-blue-400 font-medium">Backend Architecture</span> and
                <span className="text-blue-400 font-medium"> AI Integration</span>, delivering intelligent
                solutions for complex problems.
              </p>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center lg:justify-start">
            <SocialIcons />
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-white text-center lg:text-left">
          Core Expertise
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {skills.map((skill, index) => {
            const IconComponent = skill.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-3 p-4 border border-gray-800 rounded-lg hover:border-gray-700 transition-colors duration-200"
              >
                <div className="p-2 bg-gray-900 rounded">
                  <IconComponent className="w-5 h-5 text-blue-500" />
                </div>
                <span className="text-gray-300 font-medium">{skill.label}</span>
              </div>
            );
          })}
        </div>
      </div>


    </div>
  );
}
