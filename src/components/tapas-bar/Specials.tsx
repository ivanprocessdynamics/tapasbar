import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Flame } from "lucide-react";
import { useScrollAnimate } from "@/hooks/useScrollAnimate";
import { cn } from "@/lib/utils";

const specials = [
  {
    title: "Martes de Tortilla",
    description: "Pintxo de tortilla y caña por solo 3.50€. ¡La combinación perfecta!",
    image: "https://images.unsplash.com/photo-1589301760014-d929f39791e8?q=80&w=1887&auto=format&fit=crop"
  },
  {
    title: "Vino de la Semana",
    description: "Descubre un nuevo Rioja cada semana. Pregunta a nuestro personal por la recomendación.",
    image: "https://images.unsplash.com/photo-1598132762959-5a1a82f27261?q=80&w=1887&auto=format&fit=crop"
  },
  {
    title: "Paella (Solo Domingos)",
    description: "Nuestra paella de marisco, hecha con el sofrito de la abuela. ¡Reserva tu ración!",
    image: "https://images.unsplash.com/photo-1579870111328-f235a0595521?q=80&w=1887&auto=format&fit=crop"
  },
];

export const Specials = () => {
  const { ref, isInView } = useScrollAnimate<HTMLElement>({ triggerOnce: true });
  const animations = ["animate-slide-in-from-left", "animate-slide-in-from-bottom", "animate-slide-in-from-right"];

  return (
    <section id="especiales" ref={ref} className="bg-secondary py-16 md:py-24 overflow-x-hidden">
      <div className="container">
        <div className={cn("text-center mb-12 opacity-0", isInView && "animate-slide-in-from-bottom")}>
          <h2 className="text-3xl md:text-4xl font-bold">Sugerencias del Chef</h2>
          <p className="text-muted-foreground mt-2 text-lg">Ofertas y eventos que no te puedes perder.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {specials.map((special, index) => (
            <Card 
              key={special.title} 
              className={cn("text-center flex flex-col h-full opacity-0", isInView && animations[index % 3])}
              style={{ animationDelay: `${150 + index * 150}ms` }}
            >
              <CardHeader>
                <div className="mx-auto bg-primary/10 p-3 rounded-full mb-4">
                  <Flame className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>{special.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground">{special.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};