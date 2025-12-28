import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { useArticles } from "@/hooks/use-content";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

export default function Press() {
  const { data: articles, isLoading } = useArticles();

  return (
    <div className="min-h-screen bg-background pt-32">
      <Navigation />

      <div className="container mx-auto px-6 pb-24">
        <SectionHeader 
          label="In The Media"
          title="Press & Articles"
        />

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {articles?.map((article, index) => (
            <motion.a
              key={article.id}
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group block"
            >
              <div className="relative overflow-hidden mb-6 aspect-video bg-gray-100">
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10" />
                <img 
                  src={article.imageUrl} 
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-4 right-4 z-20 bg-white/90 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <ExternalLink className="w-4 h-4 text-primary" />
                </div>
              </div>
              <div className="flex justify-between items-baseline mb-2">
                <span className="luxury-spacing text-primary/60">{article.publication}</span>
              </div>
              <h3 className="font-serif text-2xl group-hover:underline decoration-1 underline-offset-4 decoration-primary/30">
                {article.title}
              </h3>
            </motion.a>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
