import { useScrollAnimate } from "@/hooks/useScrollAnimate";
import { cn } from "@/lib/utils";

export const About = () => {
  const { ref, isInView } = useScrollAnimate<HTMLElement>({ triggerOnce: true });

  return (
    <section id="quienes-somos" ref={ref} className="bg-background py-16 md:py-24 overflow-x-hidden">
      <div className="container grid md:grid-cols-2 gap-12 items-center">
        <div className={cn("space-y-4 opacity-0", isInView && "animate-slide-in-from-left")}>
          <h2 className="text-3xl font-bold">Nuestra Historia</h2>
          <p className="text-muted-foreground text-lg">
            "El Bodegón" nació en 1985 del sueño de Manolo y Carmen, una pareja que quería traer los sabores de su pueblo a la gran ciudad. Lo que empezó como un pequeño bar de barrio, pronto se convirtió en un punto de encuentro para los amantes de la buena comida y el ambiente familiar.
          </p>
          <p className="text-muted-foreground text-lg">
            Hoy, sus hijos continúan con la tradición, manteniendo las recetas de siempre y ese trato cercano que nos caracteriza. Para nosotros, cada cliente es parte de la familia.
          </p>
        </div>
        <div className={cn("opacity-0", isInView && "animate-slide-in-from-right")} style={{ animationDelay: '150ms' }}>
          <img src="https://images.unsplash.com/photo-1529154225420-cf095a5598a1?q=80&w=1887&auto=format&fit=crop" alt="Interior del bar de tapas El Bodegón" className="rounded-lg shadow-lg w-full" />
        </div>
      </div>
    </section>
  );
};