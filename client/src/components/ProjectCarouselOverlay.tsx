import { useCallback, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Project } from "@shared/schema";

interface ProjectCarouselOverlayProps {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProjectCarouselOverlay({
  project,
  open,
  onOpenChange,
}: ProjectCarouselOverlayProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const allImages = project
    ? [project.imageUrl, ...(project.images || [])]
    : [];

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  useEffect(() => {
    if (open && api) {
      api.scrollTo(0);
      setCurrent(1);
    }
  }, [open, api]);

  const scrollPrev = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "ArrowLeft") {
        scrollPrev();
      } else if (e.key === "ArrowRight") {
        scrollNext();
      } else if (e.key === "Escape") {
        onOpenChange(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, scrollPrev, scrollNext, onOpenChange]);

  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-[95vw] max-h-[95vh] w-full h-full p-0 border-none bg-black/95 overflow-hidden"
        data-testid="dialog-project-carousel"
      >
        <VisuallyHidden>
          <DialogTitle>{project.title} Gallery</DialogTitle>
        </VisuallyHidden>
        
        <div className="absolute top-4 right-4 z-50">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onOpenChange(false)}
            className="text-white/80 hover:text-white hover:bg-white/10"
            data-testid="button-close-carousel"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        <div className="absolute top-4 left-4 z-50">
          <div className="text-white/80">
            <span className="font-serif text-lg">{project.title}</span>
            <span className="text-white/50 text-sm ml-3">
              {current} / {count}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-center w-full h-full">
          <Carousel
            setApi={setApi}
            className="w-full h-full"
            opts={{
              loop: true,
            }}
          >
            <CarouselContent className="h-full ml-0">
              {allImages.map((imageUrl, index) => (
                <CarouselItem
                  key={index}
                  className="h-full pl-0 flex items-center justify-center"
                  data-testid={`carousel-image-${index}`}
                >
                  <div className="relative w-full h-full flex items-center justify-center p-8 md:p-16">
                    <img
                      src={imageUrl}
                      alt={`${project.title} - Image ${index + 1}`}
                      className="max-w-full max-h-[80vh] w-auto h-auto object-contain"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {allImages.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={scrollPrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white hover:bg-white/10 h-12 w-12"
                  data-testid="button-carousel-prev"
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={scrollNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white hover:bg-white/10 h-12 w-12"
                  data-testid="button-carousel-next"
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>
              </>
            )}
          </Carousel>
        </div>

        {allImages.length > 1 && api && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {allImages.map((_, index) => (
              <button
                key={index}
                onClick={() => api.scrollTo(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  current === index + 1
                    ? "bg-white"
                    : "bg-white/30 hover:bg-white/50"
                }`}
                data-testid={`button-dot-${index}`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
