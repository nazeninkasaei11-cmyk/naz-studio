import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { useServices } from "@/hooks/use-content";
import { motion } from "framer-motion";

export default function Services() {
  const { data: services, isLoading } = useServices();

  return (
    <div className="min-h-screen bg-background pt-32">
      <Navigation />

      <div className="container mx-auto px-6 pb-24">
        <SectionHeader 
          label="What We Do"
          title="Design Services"
        />

        <div className="max-w-3xl mx-auto text-center mb-20">
          <p className="text-muted-foreground text-lg font-light leading-relaxed">
            When you become our client, you are offered personalised services that go beyond just design. We are a lifestyle studio that carefully tailors its offerings to meet your intricate design needs and desires.
          </p>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-96 bg-gray-100 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services?.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-secondary/20 p-8 md:p-10 group hover:bg-secondary/40 transition-colors"
              >
                <div className="mb-6 overflow-hidden h-48 w-full">
                  <img 
                    src={service.imageUrl} 
                    alt={service.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <h3 className="font-serif text-2xl mb-4 text-primary">{service.title}</h3>
                <p className="text-muted-foreground font-light leading-relaxed text-sm">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
