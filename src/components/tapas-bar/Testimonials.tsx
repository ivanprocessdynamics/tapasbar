import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useScrollAnimate } from "@/hooks/useScrollAnimate";
import { cn } from "@/lib/utils";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const testimonials = [
  {
    name: "Laura G.",
    rating: 5,
    review: "¡El mejor bar de tapas de Madrid! Las bravas son espectaculares y el ambiente es súper acogedor. Volveremos seguro.",
  },
  {
    name: "Carlos S.",
    rating: 5,
    review: "Un rincón auténtico con sabor a tradición. El pulpo a la gallega estaba de 10. El trato del personal, inmejorable.",
  },
  {
    name: "Ana M.",
    rating: 4,
    review: "Nos encantó. Mucha variedad y todo riquísimo. Se llena bastante, así que recomiendo reservar. El único 'pero' es que el local es algo pequeño.",
  },
];

const GoogleGIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path fill="#4285F4" d="M21.35 11.1h-9.8v3.8h5.6c-.2 1.2-1.2 2.8-3.2 2.8-2.3 0-4.2-1.9-4.2-4.2s1.9-4.2 4.2-4.2c1.1 0 2.1.4 2.8 1.1l2.2-2.2C17.2 6.2 15.1 5 12.5 5c-4.1 0-7.5 3.4-7.5 7.5s3.4 7.5 7.5 7.5c4.4 0 7.2-3.1 7.2-7.3 0-.5-.1-.9-.2-1.1z"/>
    </svg>
);

export const Testimonials = () => {
  const { ref, isInView } = useScrollAnimate<HTMLElement>({ triggerOnce: true });

  return (
    <section id="reseñas" ref={ref} className="py-16 md:py-24 bg-background overflow-x-hidden">
      <div className="container">
        <div className={cn("text-center mb-12 opacity-0", isInView && "animate-slide-in-from-bottom")}>
          <h2 className="text-3xl md:text-4xl font-bold">Lo que dicen nuestros clientes</h2>
          <p className="text-muted-foreground mt-2 text-lg">Reseñas de nuestros comensales en Google.</p>
        </div>
        <div className={cn("opacity-0", isInView && "animate-slide-in-from-bottom")} style={{ animationDelay: '150ms' }}>
          <Carousel
            className="w-full max-w-2xl mx-auto"
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 5000,
                stopOnInteraction: true,
              }),
            ]}
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="p-4">
                  <Card className="flex flex-col h-full">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold">{testimonial.name}</h3>
                        <GoogleGIcon />
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-muted-foreground italic">"{testimonial.review}"</p>
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