import { Link } from "wouter";
import { Instagram, Facebook, Mail } from "lucide-react";
import { useCreateSubscriber } from "@/hooks/use-content";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertSubscriberSchema } from "@shared/routes";
import { z } from "zod";

type SubscriberForm = z.infer<typeof insertSubscriberSchema>;

export function Footer() {
  const { mutate, isPending } = useCreateSubscriber();
  const { toast } = useToast();
  
  const form = useForm<SubscriberForm>({
    resolver: zodResolver(insertSubscriberSchema),
  });

  const onSubmit = (data: SubscriberForm) => {
    mutate(data, {
      onSuccess: () => {
        toast({
          title: "Subscribed!",
          description: "Thank you for joining our mailing list.",
        });
        form.reset();
      },
      onError: () => {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Something went wrong. Please try again.",
        });
      },
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-secondary/30 pt-20 pb-10 border-t border-border/40">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-20">
          {/* Brand */}
          <div className="space-y-6">
            <h3 className="font-serif text-2xl">Naz Studio</h3>
            <p className="text-muted-foreground leading-relaxed max-w-sm">
              We create bespoke interiors that balance aesthetics with functionality, delivering homes that inspire and endure.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 rounded-full border border-border hover:bg-white transition-colors">
                <Instagram className="w-5 h-5 text-primary" />
              </a>
              <a href="#" className="p-2 rounded-full border border-border hover:bg-white transition-colors">
                <Facebook className="w-5 h-5 text-primary" />
              </a>
              <a href="mailto:hello@nazstudio.com" className="p-2 rounded-full border border-border hover:bg-white transition-colors">
                <Mail className="w-5 h-5 text-primary" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-6">
            <h4 className="luxury-spacing text-muted-foreground">Menu</h4>
            <nav className="flex flex-col space-y-4">
              <Link href="/studio" className="hover:text-muted-foreground transition-colors w-fit">Projects</Link>
              <Link href="/services" className="hover:text-muted-foreground transition-colors w-fit">Services</Link>
              <Link href="/press" className="hover:text-muted-foreground transition-colors w-fit">Press & Articles</Link>
              <Link href="/contact" className="hover:text-muted-foreground transition-colors w-fit">Contact Us</Link>
            </nav>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h4 className="luxury-spacing text-muted-foreground">Newsletter</h4>
            <p className="text-sm text-muted-foreground">Subscribe to receive design inspiration and studio updates.</p>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <input
                {...form.register("email")}
                placeholder="Email Address"
                className="w-full bg-white border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
              />
              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-primary text-primary-foreground py-3 text-xs uppercase tracking-widest hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {isPending ? "Subscribing..." : "Join Our List"}
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border/40 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Naz Studio. All Rights Reserved.</p>
          <button 
            onClick={scrollToTop}
            className="mt-4 md:mt-0 uppercase tracking-widest text-xs hover:text-primary transition-colors"
          >
            Back to Top
          </button>
        </div>
      </div>
    </footer>
  );
}
