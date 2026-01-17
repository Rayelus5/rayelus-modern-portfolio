import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Projects } from "@/components/sections/projects";
import { Services } from "@/components/sections/services";
import { Testimonials } from "@/components/sections/testimonials";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/layout/footer";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Añadimos los IDs para el scroll */}
      <ScrollReveal id="home" className="w-full max-w-8xl mx-auto" delay={1.8}><Hero /></ScrollReveal>
      <ScrollReveal id="about" className="w-full max-w-8xl mx-auto"><About /></ScrollReveal>
      <ScrollReveal id="projects" className="w-full max-w-7xl mx-auto"><Projects /></ScrollReveal>
      <div id="services" className="w-full"><Services /></div>
      <div id="testimonials" className="w-full"><Testimonials /></div>
      <ScrollReveal id="contact" className="w-full max-w-7xl mx-auto"><Contact /></ScrollReveal>
    </div>
  );
}