import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeader } from "@/components/SectionHeader";
import { useProjects } from "@/hooks/use-content";
import { Loader2 } from "lucide-react";

export default function Studio() {
  const { data: projects, isLoading } = useProjects();

  return (
    <div className="min-h-screen bg-background pt-32">
      <Navigation />
      
      <div className="container mx-auto px-6 pb-24">
        <SectionHeader 
          label="Portfolio"
          title="Our Projects"
        />

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {projects?.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        )}

        {!isLoading && projects?.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            No projects found. Check back soon.
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
