import { SocialIcons } from "@/src/components/SocialIcons";
import { Card, CardContent } from "@/src/components/ui/card";
import Image from "next/image";
export function AboutSection() {
  return (

    <Card className="border-0 shadow-none mt-26">
      <CardContent className="p-6 md:p-10">
        <div className=" flex gap-6">
          {/* Profile Image */}
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border shadow-sm">
            <Image
              src="/profile.jpg"
              alt="Profile"
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Text Content */}
          <div className=" space-y-4 ">
            <span>
              <p>I'm <strong>Engineer</strong> by <strong>profession</strong> Designer by heart </p>
              <p>building scalable, reliable softwares for the web.</p>
            </span>
            <span>
              <p>I specialize in <strong>Backend Design and Devops</strong>,</p>
              <p>focusing on building scalable <strong>AI solutions.</strong></p>
            </span>
            {/* Social Icons */}
            <div className="mt-2">
              <SocialIcons />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

  );
}
