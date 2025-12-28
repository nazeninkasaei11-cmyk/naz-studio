import { motion } from "framer-motion";

interface SectionHeaderProps {
  label: string;
  title: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeader({ label, title, className = "", align = "center" }: SectionHeaderProps) {
  return (
    <div className={`mb-16 ${align === "center" ? "text-center" : "text-left"} ${className}`}>
      <motion.span 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="luxury-spacing text-muted-foreground block mb-4"
      >
        {label}
      </motion.span>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-3xl md:text-5xl font-serif text-primary"
      >
        {title}
      </motion.h2>
    </div>
  );
}
