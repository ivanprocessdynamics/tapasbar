import { Card, CardContent } from "@/components/ui/card";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useScrollAnimate } from "@/hooks/useScrollAnimate";
import { cn } from "@/lib/utils";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1770&auto=format&fit=crop",
    alt: "Interior acogedor del bar El Bodegón"
  },
  {
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1770&auto=format&fit=crop",
    alt: "Zona de comedor con mesas de madera"
  },
  {
    src: "https://images.unsplash.com/photo-1631515924082-064d36885238?q=80&w=1760&auto=format&fit=crop",
    alt: "Barra con productos españoles"
  },
  {
    src: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1770&auto=format&fit=crop",
    alt: "Terraza exterior con ambiente nocturno"
  },
  {
    src: "https://images.unsplash.com/photo-1554306274-421e813ab2c8?q=80&w=1770&auto=format&fit=crop",
    alt: "Detalles del local con iluminación cálida"
  },
  {
    src: "https://images.unsplash.com/photo-1603303888424-08a3fed370c3?q=80&w=1887&auto=format&fit=crop",
    alt: "Zona de preparación de tapas"
  }
];

export const Gallery = () => {
  const { ref, isInView } = useScrollAnimate<HTMLElement>({ triggerOnce: true });

  return (
    <section id="galeria" ref={ref} className="py-16 md:py-24 bg-background overflow-x-hidden">
      <div className="container">
        <div className={cn("text-center mb-12 opacity-0", isInView && "animate-slide-in-from-bottom")}>
          <h2 className="text-3xl md:text-4xl font-bold">Nuestro Local</h2>
          <p className="text-muted-foreground mt-2 text-lg">Un rincón auténtico con encanto español</p>
        </div>
        
        <div className={cn("opacity-0", isInView && "animate-slide-in-from-bottom")} style={{ animationDelay: '150ms' }}>
          <Carousel 
            className="w-full max-w-5xl mx-auto"
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 4000,
                stopOnInteraction: false,
              }),
            ]}
          >
            <CarouselContent>
              {galleryImages.map((image, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="overflow-hidden">
                    <CardContent className="p-0 aspect-square">
                      <img 
                        src={image.src} 
                        alt={image.alt} 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};