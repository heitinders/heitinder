import AISection from "@/components/sections/AISection";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Experience from "@/components/sections/Experience";
import Hero from "@/components/sections/Hero";
import LogoBar from "@/components/sections/LogoBar";
import Marquee from "@/components/sections/Marquee";
import MidPageCTA from "@/components/sections/MidPageCTA";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Stats from "@/components/sections/Stats";
import Testimonials from "@/components/sections/Testimonials";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

export default function HomePage() {
  return (
    <>
      <Hero />
      <LogoBar />
      <RevealOnScroll>
        <Marquee />
      </RevealOnScroll>
      <RevealOnScroll>
        <About />
      </RevealOnScroll>
      <RevealOnScroll>
        <Stats />
      </RevealOnScroll>
      <RevealOnScroll>
        <Experience />
      </RevealOnScroll>
      <RevealOnScroll>
        <Projects />
      </RevealOnScroll>
      <RevealOnScroll>
        <MidPageCTA />
      </RevealOnScroll>
      <RevealOnScroll>
        <AISection />
      </RevealOnScroll>
      <RevealOnScroll>
        <Testimonials />
      </RevealOnScroll>
      <RevealOnScroll>
        <Skills />
      </RevealOnScroll>
      <RevealOnScroll>
        <Contact />
      </RevealOnScroll>
    </>
  );
}
