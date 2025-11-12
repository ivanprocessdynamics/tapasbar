import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
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
    src: "https://media.istockphoto.com/id/1428737062/es/foto/mesa-de-madera-vac%C3%ADa-con-luces-bokeh-en-el-fondo-del-restaurante-borroso.jpg?b=1&s=612x612&w=0&k=20&c=C8t7u0gwWNEA8aIJUQp2A22veJ_gdTl0_Fgdf9LlPS0=",
    alt: "Mesa de madera con luces bokeh en el restaurante"
  },
  {
    src: "https://architetturaxtutti.com/wp-content/uploads/2022/02/restaurant-hospitality-interior-design-spanish-barcelona.jpg",
    alt: "Interior de restaurante estilo español en Barcelona"
  },
  {
    src: "https://www.visitfinland.com/dam/jcr:7c2c8221-ace3-4362-a5b0-8073ee6967e9/Savoy-Interior-7.jpeg",
    alt: "Interior elegante de restaurante Savoy"
  },
  {
    src: "https://www.sierracantabria.com/restauranteelpuntido/wp-content/uploads/2022/03/Restaurantepano-768x338.jpg",
    alt: "Panorámica del restaurante El Puntido"
  }
];

const optimizeImageSrc = (url: string) => {
  try {
    const u = new URL(url);
    const heavyHosts = [
      "images.pexels.com",
      "media.istockphoto.com",
      "architetturaxtutti.com",
      "www.visitfinland.com",
      "visitfinland.com",
      "www.sierracantabria.com",
      "sierracantabria.com",
    ];
    if (heavyHosts.includes(u.hostname)) {
      const encoded = encodeURIComponent(url);
      return `https://wsrv.nl/?url=${encoded}&w=800&h=800&fit=cover&output=webp`;
    }
    return url;
  } catch {
    return url;
  }
};

const FALLBACK_IMG = "https://placehold.co/800x800?text=Imagen";

const GalleryImage = ({ src, alt }: { src: string; alt: string }) => {
  const [currentSrc, setCurrentSrc] = useState<string>(FALLBACK_IMG);
  const optimized = optimizeImageSrc(src);
  useEffect(() => {
    let cancelled = false;
    const pre = new Image();
    pre.referrerPolicy = "no-referrer";
    pre.onload = () => { if (!cancelled) setCurrentSrc(optimized); };
    pre.onerror = () => { if (!cancelled) setCurrentSrc(FALLBACK_IMG); };
    pre.src = optimized;
    return () => { cancelled = true; };
  }, [optimized]);
  return (
    <img 
      src={currentSrc} 
      alt={alt} 
      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
    />
  );
};

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
                      <GalleryImage src={image.src} alt={image.alt} />
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