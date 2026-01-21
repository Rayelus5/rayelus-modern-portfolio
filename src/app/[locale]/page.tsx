import { Hero } from "@/components/sections/hero";
import { Footer } from "@/components/layout/footer";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import dynamic from 'next/dynamic';

const About = dynamic(() => import('@/components/sections/about').then(mod => mod.About));
const Projects = dynamic(() => import('@/components/sections/projects').then(mod => mod.Projects));
const Services = dynamic(() => import('@/components/sections/services').then(mod => mod.Services));
const Testimonials = dynamic(() => import('@/components/sections/testimonials').then(mod => mod.Testimonials));
const Contact = dynamic(() => import('@/components/sections/contact').then(mod => mod.Contact));


export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Añadimos los IDs para el scroll */}
      <ScrollReveal id="home" className="w-full max-w-8xl mx-auto" delay={0.7}><Hero /></ScrollReveal>
      <ScrollReveal id="about" className="w-full max-w-8xl mx-auto"><About /></ScrollReveal>
      <ScrollReveal id="projects" className="w-full max-w-7xl mx-auto"><Projects /></ScrollReveal>
      <div id="services" className="w-full"><Services /></div>
      <div id="testimonials" className="w-full"><Testimonials /></div>
      <ScrollReveal id="contact" className="w-full max-w-7xl mx-auto"><Contact /></ScrollReveal>
    </div>
  );
}