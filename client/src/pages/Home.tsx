import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { ProjectCard } from "@/components/ProjectCard";
import { SEO } from "@/components/SEO";
import { useProjects } from "@/hooks/use-content";

export default function Home() {
  const { data: projects, isLoading } = useProjects();

  // Filter for featured projects, take top 3
  const featuredProjects = projects?.filter(p => p.isFeatured).slice(0, 3) || [];

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Luxury Interior Design Brisbane"
        description="Naz Studio is a luxury interior design studio in Brisbane, Australia. We create bespoke homes and timeless interiors focused on lifestyle, quality, and functionality."
        canonical="/"
      />
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax-like feel via fixed attachment if desired, but object-cover is cleaner here */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/20 z-10" />
          {/* Living room interior bright airy */}
          <img 
            src="/images/hero-bg.avif"
            alt="Luxury modern living room interior design by Naz Studio Brisbane" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-20 container mx-auto px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight max-w-4xl mx-auto">
              A design studio dedicated to client-led, bespoke homes and timeless interiors.
            </h1>
            <p className="text-lg md:text-xl font-light tracking-wide mb-10 opacity-90">
              Focusing on lifestyle, quality, and functionality.
            </p>
            <Link href="/studio">
              <button className="px-8 py-4 border border-white text-white uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all duration-300">
                View Our Portfolio
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-24 md:py-32 bg-secondary/20">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img 
              src="/images/founder-portrait.png" 
              alt="Naz, founder and principal designer of Naz Studio interior design Brisbane" 
              className="w-full h-[500px] object-cover grayscale hover:grayscale-0 transition-all duration-700"
              loading="lazy"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="luxury-spacing text-muted-foreground block mb-6">About Us</span>
            <h2 className="font-serif text-3xl md:text-4xl text-primary mb-6 leading-tight">
              Designing Homes and Commercial Spaces in Brisbane
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8 text-lg font-light">
              Naz Studio brings a global perspective to architecture and interiors, shaped by professional experience in Europe, including Germany and Spain. From renovating character homes in Brisbane to delivering tailored new builds, our work is defined by thoughtful planning, refined detailing, and a deep understanding of how considered design supports modern living.
            </p>
            <Link href="/services" className="inline-flex items-center text-primary border-b border-primary/20 pb-1 hover:border-primary transition-colors group">
              <span className="uppercase tracking-widest text-xs mr-2">Discover Our Services</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 md:py-32 container mx-auto px-6">
        <SectionHeader 
          label="Selected Works"
          title="Recent Projects"
        />

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 aspect-[4/5] mb-6" />
                <div className="h-4 bg-gray-200 w-24 mx-auto mb-3" />
                <div className="h-6 bg-gray-200 w-48 mx-auto" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        )}

        <div className="mt-16 text-center">
          <Link href="/studio">
            <button className="px-8 py-3 bg-primary text-white text-xs uppercase tracking-widest hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
              View All Projects
            </button>
          </Link>
        </div>
      </section>

      {/* Testimonial / Quote */}
      <section className="py-24 bg-primary text-white text-center">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-6xl font-serif text-white/20 block mb-6">"</span>
            <h3 className="font-serif text-2xl md:text-3xl leading-relaxed mb-8 italic">
              The entire collaboration was professional from start to finish, and the final outcome far surpassed what we imagined. Naz Studio understood our concept perfectly and executed it with incredible precision and style.
            </h3>
            <cite className="not-italic luxury-spacing text-white/60">
              — Lukas Schmidt
            </cite>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
