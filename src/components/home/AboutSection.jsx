import { SocialIcons } from "@/src/components/SocialIcons";
import { Card, CardContent } from "@/src/components/ui/card";
import Image from "next/image";

export function AboutSection() {
  return (
    <Card className="border-0 shadow-none mt-16 sm:mt-26">
      <CardContent className="p-4 md:p-10">
        <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start max-w-2xl mx-auto sm:text-left">
          {/* Profile Image */}
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border text-center shadow-sm flex-shrink-0">
            <Image
              src="/profile_1200.jpeg"
              alt="Profile"
              width={128}
              height={128}
              className="w-full h-full object-cover"
              priority
            />
          </div>

          {/* Text Content */}
          <div className="space-y-3 md:space-y-4">
            <div className="text-sm md:text-base">
              <p>I'm <strong>Engineer</strong> by <strong>profession</strong>, Designer by heart, building scalable, reliable softwares for the web.</p>
            </div>
            <div className="text-sm md:text-base">
              <p>I specialize in <strong>Backend Design and Devops</strong>, focusing on building scalable <strong>AI solutions.</strong></p>
            </div>
            {/* Social Icons */}
            <div className="mt-4 flex">
              <SocialIcons />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
