import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <>
      {/* Contenedor para la imagen de fondo fija y el degradado */}
      <div className="fixed top-0 left-0 w-full h-screen -z-10">
        <img 
          src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1887&auto=format&fit=crop" 
          alt="" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Sección de contenido del Hero, que actúa como espaciador */}
      <section className="relative w-full h-[80vh] md:h-screen -mt-20">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight drop-shadow-lg">El Sabor de la Tradición</h1>
          <p className="text-lg md:text-2xl mt-4 max-w-3xl drop-shadow-md">Donde cada tapa cuenta una historia. Bienvenido a tu casa.</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild>
              <a href="#reservas">Reserva Tu Mesa</a>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <a href="#menu">Ver Menú</a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};