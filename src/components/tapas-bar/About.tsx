import { useScrollAnimate } from "@/hooks/useScrollAnimate";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export const About = () => {
  const { ref, isInView } = useScrollAnimate<HTMLElement>({ triggerOnce: true });
  const FALLBACK_IMG = "https://placehold.co/1200x800?text=Imagen";
  const RAW_IMG = "https://media.istockphoto.com/id/1428737062/es/foto/mesa-de-madera-vac%C3%ADa-con-luces-bokeh-en-el-fondo-del-restaurante-borroso.jpg?b=1&s=612x612&w=0&k=20&c=C8t7u0gwWNEA8aIJUQp2A22veJ_gdTl0_Fgdf9LlPS0=";

  const optimizeImageSrc = (url: string) => {
    try {
      const u = new URL(url);
      const heavyHosts = ["media.istockphoto.com"];
      if (heavyHosts.includes(u.hostname)) {
        const hostPath = `${u.hostname}${u.pathname}${u.search}`;
        const encoded = encodeURIComponent(hostPath);
        return `https://wsrv.nl/?url=${encoded}&w=1200&h=800&fit=cover&output=webp`;
      }
      return url;
    } catch {
      return url;
    }
  };

  const [currentSrc, setCurrentSrc] = useState<string>(FALLBACK_IMG);
  const optimized = optimizeImageSrc(RAW_IMG);

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
          <img
            src={currentSrc}
            alt="Interior del bar de tapas El Bodegón"
            className="rounded-lg shadow-lg w-full"
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </section>
  );
};