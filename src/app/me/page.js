import { Separator } from "@/src/components/ui/separator";
const About = () => {
  return (
    <div className="min-h-screen ">
      <div className="max-w-4xl mx-auto p-6 md:p-8 lg:p-12">
        <h1 className="text-8xl font-bold font-handwritten mb-8 ">
          About Me
        </h1>
        <Separator className="mb-8 bg-gray-300" />

        <div className="prose prose-stone lg:prose-lg max-w-none">
          <p className="text-lg mb-6">
            I was born in 2001, raised in Jaipur, Rajasthan—y&apos;know, the
            Pink City, where it&apos;s all vibrant culture, spicy dal baati, and
            summers so hot you&apos;d think the sun&apos;s got a personal
            grudge. Jaipur&apos;s not exactly Silicon Valley, right? Camels and
            forts don&apos;t scream &quot;tech hub,&quot; but in this dusty,
            royal city, a kid like me was already dreaming of pixels, code, and
            Western vibes—think GTA, PlayStations, and those slick computers
            you&apos;d see in Hollywood flicks.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Early Days</h2>
          <p className="mb-6">
            So, I&apos;m from a solid middle-class fam—mom&apos;s making killer
            ghewar, and we&apos;re just vibing in our cozy Jaipur home. My
            obsession with tech kicked off early. As a tiny human, I&apos;d
            stare at those clunky CRT monitors in cyber cafes like they were
            portals to Narnia. Games? Oh man, I was that kid at the local
            e-mitra shop, begging for one more round of Tekken 3 or GTA Vice
            City on those janky arcade machines. My pocket money? Straight to
            the game vendor. But deep down, it wasn&apos;t just about
            button-mashing—it was the magic of computers, those glowing screens
            that could do anything.
          </p>

          <p className="mb-6">
            Cue the big day: we finally got a PC at home. Not gonna lie, it felt
            like we&apos;d won the lottery. Picture a proper computer desk,
            complete with that slide-out drawer for the keyboard and mouse (peak
            2000s aesthetic). My sister, our resident &quot;Laxmi&quot;
            (y&apos;know, the goddess of prosperity), took charge of the grand
            opening. She did a full-on puja—sandalwood vibes, a kalawa tied to
            the monitor stand like it&apos;s gonna ward off evil viruses, and
            boom, she hit the power button. That Windows XP startup chime? Pure
            music. The screen lit up with that iconic green hill wallpaper, and
            we were all grinning like we&apos;d just unlocked the future.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            From Gamer to Coder
          </h2>
          <p className="mb-6">
            But, classic Indian household rules: &quot;No games, beta, only
            study!&quot; My parents were like, &quot;This is for schoolwork, not
            your nonsense.&quot; So, I turned into a sneaky mastermind. After
            weeks of plotting—think Ocean&apos;s Eleven but for installing Road
            Rash—I managed to snag some totally legit game files. Sonic, Contra,
            Road Rash, the works. I even hid them in a folder named
            &quot;.SecretGames&quot; like I was some hacker genius. Life was
            good. I&apos;d wait for everyone to sleep, then race bikes or blast
            aliens in glorious 8-bit.
          </p>

          <p className="mb-6">
            Until… crash. The dreaded blue screen of death. RIP our OS. The
            whole fam pointed fingers at me like I&apos;d personally insulted
            the computer gods. &quot;You and your games!&quot; they said. Next
            day, the computer wala bhaiya showed up, gave me the stink-eye, and
            wiped everything clean with a fresh Windows install. My precious
            games? Gone. Poof.
          </p>

          <p className="mb-6">
            So, I laid low, stuck to the safe stuff: Minesweeper (pro strats
            only), Pinball, and that card game that felt like it was judging
            you. But something shifted. That gamer kid? He didn&apos;t die—he
            leveled up. I stumbled into the wild, wild internet and got hooked.
            Not just games, but making stuff. I started messing with HTML and
            CSS, building janky websites that looked like a 90s fever dream.
            Then came C++, and suddenly I was that guy trying to code his own
            &quot;game&quot; (spoiler: it was mostly bugs).
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            Hardware Adventures
          </h2>
          <p className="mb-6">
            Post-C++ and janky website days, I was hooked on making stuff—code,
            gadgets, you name it. Around 2018, I got my hands on an ESP8266
            NodeMCU WiFi Development Board and a REES52 4CH 5V Relay Module.
            Sounds fancy, right? Basically, I turned my room into a sci-fi movie
            set. Picture me, sitting cross-legged on the floor, wires
            everywhere, trying to make my lights and fan obey my phone&apos;s
            commands. Home automation, baby!
          </p>

          <p className="mb-6">
            Before diving headfirst into game design, I started small—messing
            around in Blender to create cups and chairs. Yep, I was the Picasso
            of pottery and furniture! But as fate would have it, the lure of
            digital adventures soon had me swapping static objects for dynamic
            chaos. I followed YouTube tutorials for building a box game in
            Blender—y&apos;know, super basic, just a cube dodging stuff. The
            result? A gloriously janky game where my cube hero had the physics
            of a drunk potato.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            The Server Obsession
          </h2>
          <p className="mb-6">
            I got obsessed with servers. I set up a Network Attached Storage
            (NAS) for a media server and VPN using Proxmox. This was my
            &quot;I&apos;m basically a sysadmin now&quot; era. I had all my
            movies, music, and totally legal ISOs (wink) stored on this bad boy,
            streaming to every device in the house. Setting up Proxmox was like
            solving a puzzle—part fun, part &quot;why is this not
            working?!&quot;—but once it was running, I felt like I&apos;d built
            my own cloud.
          </p>

          <p className="mb-6">
            Then there was my KVM adventure—because who has time to juggle a
            dozen keyboards and monitors? I decided to build my own Keyboard,
            Video, Mouse (KVM) switch to control all my servers like a tech
            warlord. One click, and I could hop between my servers like I was
            piloting the Enterprise. It wasn&apos;t pretty, but it was mine, and
            it felt like I&apos;d hacked the Matrix.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            The Crypto Mining Era
          </h2>
          <p className="mb-6">
            Now, let&apos;s talk about the big one: crypto mining. This was my
            2020-2023 saga. It started small—just my personal GPU crunching
            numbers, dreaming of Bitcoin riches. But then I caught the bug. By
            the end, I had a full-on crypto mining farm with 21 GPUs—we&apos;re
            talking 3x 1660s, 3x 2060 Supers, 3x 3060s, 2x 3060Tis, 6x 3070Tis,
            and 4x 3080Tis. My room looked like a sci-fi server farm, fans
            roaring like a jet engine.
          </p>

          <p className="mb-6">
            I built my own ventilation system for the server room using Amazon
            fans and exhausts. I even rigged up six GPU setups on an
            AmazonBasics 9-Pair Shoe Rack. Yeah, a shoe rack! I also dove into
            hard disk mining and Proof-of-Stake (PoS) setups, building a beast
            of a server with close to 1 petabyte of storage.
          </p>

          <p className="mb-6">
            On top of all that, I started selling mining rigs, turning my side
            gig into a legit operation. I even launched miningbuddies.in, a site
            to share my crypto-mining wisdom and sling rigs to other hopefuls.
            Was I the Wolf of Wall Street? Nah, more like the Geek of Jaipur,
            but I was living the dream.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Today and Beyond</h2>
          <p className="mb-6">
            Jaipur might not have been the tech capital, but it gave me roots,
            grit, and just enough spice to chase my nerdy dreams. And honestly?
            I wouldn&apos;t trade that kalawa-tied monitor or those sneaky game
            nights for anything.
          </p>

          <p className="mb-6">
            Today, I&apos;m still that Jaipur kid at heart—middle-class,
            chai-sipping, and always chasing the next tech adventure. I&apos;ve
            built, broken, and learned a ton. My room&apos;s still a mess of
            wires and dreams, and I wouldn&apos;t have it any other way.
            What&apos;s next? Maybe I&apos;ll code an AI to play Road Rash for
            me—or just keep tinkering till I accidentally invent Skynet. Either
            way, it&apos;s gonna be a fun ride. 😎
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
