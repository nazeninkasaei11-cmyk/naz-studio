import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { useCreateInquiry } from "@/hooks/use-content";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertInquirySchema } from "@shared/routes";
import { z } from "zod";
import { motion } from "framer-motion";

type InquiryForm = z.infer<typeof insertInquirySchema>;

export default function Contact() {
  const { mutate, isPending } = useCreateInquiry();
  const { toast } = useToast();
  
  const form = useForm<InquiryForm>({
    resolver: zodResolver(insertInquirySchema),
  });

  const onSubmit = (data: InquiryForm) => {
    mutate(data, {
      onSuccess: () => {
        toast({
          title: "Inquiry Sent",
          description: "Thank you for your message. We will be in touch shortly.",
        });
        form.reset();
      },
      onError: (error) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message || "Failed to submit inquiry",
        });
      },
    });
  };

  return (
    <div className="min-h-screen bg-background pt-32">
      <Navigation />

      <div className="container mx-auto px-6 pb-24">
        <SectionHeader 
          label="Get In Touch"
          title="Project Enquiry"
        />

        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-12"
          >
            <div>
              <h3 className="font-serif text-2xl mb-4">Studio</h3>
              <p className="text-muted-foreground font-light leading-relaxed">
                20 Robinson Rd E<br />
                Virginia QLD 4014
              </p>
            </div>
            
            <div>
              <h3 className="font-serif text-2xl mb-4">Contact</h3>
              <p className="text-muted-foreground font-light leading-relaxed mb-2">
                <a href="mailto:info@nazstudio.com.au" className="hover:text-primary transition-colors">
                  info@nazstudio.com.au
                </a>
              </p>
              <p className="text-muted-foreground font-light">
                +61 45 14 333 14
              </p>
            </div>

            <div>
              <h3 className="font-serif text-2xl mb-4">Follow Us</h3>
              <div className="flex flex-col space-y-2 text-muted-foreground font-light">
                <a href="https://www.instagram.com/nazstudio.com.au/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors w-fit">Instagram</a>
                <a href="https://www.facebook.com/profile.php?id=61585530939751" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors w-fit">Facebook</a>
                <a href="#" className="hover:text-primary transition-colors w-fit">Pinterest</a>
              </div>
            </div>

            <div className="pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground font-light italic">
                We are currently accepting new projects for 2025. Please fill out the form to discuss your project.
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-secondary/30 p-8 md:p-12"
          >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground">Name</label>
                <input
                  {...form.register("name")}
                  className="w-full bg-white border-b border-border px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                  placeholder="Your Full Name"
                />
                {form.formState.errors.name && (
                  <p className="text-destructive text-xs mt-1">{form.formState.errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground">Email</label>
                <input
                  {...form.register("email")}
                  className="w-full bg-white border-b border-border px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                  placeholder="email@example.com"
                />
                {form.formState.errors.email && (
                  <p className="text-destructive text-xs mt-1">{form.formState.errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground">Message</label>
                <textarea
                  {...form.register("message")}
                  rows={6}
                  className="w-full bg-white border-b border-border px-4 py-3 focus:outline-none focus:border-primary transition-colors resize-none"
                  placeholder="Tell us about your project..."
                />
                {form.formState.errors.message && (
                  <p className="text-destructive text-xs mt-1">{form.formState.errors.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-primary text-white py-4 uppercase tracking-widest text-xs hover:bg-primary/90 transition-colors shadow-lg shadow-primary/10 disabled:opacity-50"
              >
                {isPending ? "Sending..." : "Send Message"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
