import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@shared/schema";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group cursor-pointer"
    >
      <div className="relative overflow-hidden aspect-[4/5] mb-6 bg-secondary/50">
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10 duration-500" />
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white p-2 rounded-full shadow-lg">
            <ArrowUpRight className="w-5 h-5 text-primary" />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
          {project.category}
        </span>
        <h3 className="font-serif text-xl md:text-2xl text-primary text-center group-hover:text-muted-foreground transition-colors duration-300">
          {project.title}
        </h3>
      </div>
    </motion.div>
  );
}
