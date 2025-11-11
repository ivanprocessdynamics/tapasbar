"use client"

import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useScrollAnimate } from "@/hooks/useScrollAnimate";

const menuData = {
  tapas: [
    { name: "Patatas Bravas", description: "Nuestra salsa brava secreta con un toque de alioli.", price: "6.50€", image: "https://images.unsplash.com/photo-1603303888424-08a3fed370c3?q=80&w=1887&auto=format&fit=crop" },
    { name: "Gambas al Ajillo", description: "Salteadas en aceite de oliva, ajo y guindilla.", price: "9.00€", image: "https://images.unsplash.com/photo-1639104444528-81258576133a?q=80&w=1887&auto=format&fit=crop" },
    { name: "Tortilla Española", description: "Jugosa y hecha al momento, como la de la abuela.", price: "5.00€", image: "https://images.unsplash.com/photo-1586272340333-8570c0a5316c?q=80&w=1887&auto=format&fit=crop" },
    { name: "Croquetas de Jamón", description: "Caseras y cremosas, con jamón ibérico.", price: "7.50€", image: "https://images.unsplash.com/photo-1635678119560-5c6d68cd8f3e?q=80&w=1887&auto=format&fit=crop" },
    { name: "Pimientos de Padrón", description: "Fritos con aceite de oliva y sal gorda.", price: "6.00€", image: "https://images.unsplash.com/photo-1587390089292-c0abf09e1f95?q=80&w=1887&auto=format&fit=crop" },
    { name: "Boquerones en Vinagre", description: "Frescos, marinados en vinagre de Jerez.", price: "6.50€", image: "https://images.unsplash.com/photo-1580959862194-ef4ff65c3178?q=80&w=1887&auto=format&fit=crop" },
  ],
  raciones: [
    { name: "Pulpo a la Gallega", description: "Cocido a la perfección con pimentón de la Vera.", price: "18.00€", image: "https://images.unsplash.com/photo-1573089824739-27e83a4c8fb2?q=80&w=1887&auto=format&fit=crop" },
    { name: "Jamón Ibérico de Bellota", description: "Cortado a cuchillo, acompañado de picos de pan.", price: "22.00€", image: "https://images.unsplash.com/photo-1599054999628-108a55a58a86?q=80&w=1887&auto=format&fit=crop" },
    { name: "Calamares a la Andaluza", description: "Tiernos y crujientes, con un toque de limón.", price: "14.00€", image: "https://images.unsplash.com/photo-1604539231342-3412f0c2c3d3?q=80&w=1887&auto=format&fit=crop" },
    { name: "Bacalao al Pil Pil", description: "Con su emulsión de aceite y ajo, pura tradición.", price: "16.00€", image: "https://images.unsplash.com/photo-1625943553852-781c6fd583f0?q=80&w=1887&auto=format&fit=crop" },
    { name: "Secreto Ibérico", description: "A la plancha con pimientos asados.", price: "19.00€", image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1887&auto=format&fit=crop" },
    { name: "Rabo de Toro", description: "Estofado durante horas hasta su punto perfecto.", price: "17.50€", image: "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?q=80&w=1887&auto=format&fit=crop" },
  ],
  postres: [
    { name: "Tarta de Santiago", description: "Almendra artesanal con azúcar glas.", price: "5.50€", image: "https://images.unsplash.com/photo-1578775887804-699de7086ff9?q=80&w=1887&auto=format&fit=crop" },
    { name: "Flan de Huevo Casero", description: "Con caramelo líquido, receta de la abuela.", price: "4.50€", image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?q=80&w=1887&auto=format&fit=crop" },
    { name: "Tarta de Queso", description: "Cremosa, horneada a baja temperatura.", price: "5.00€", image: "https://images.unsplash.com/photo-1533134242-6e8f0de87881?q=80&w=1887&auto=format&fit=crop" },
    { name: "Crema Catalana", description: "Con azúcar caramelizada crujiente.", price: "5.00€", image: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?q=80&w=1887&auto=format&fit=crop" },
  ],
  vinos: [
    { name: "Ribera del Duero", description: "Tinto crianza, notas de frutas rojas.", price: "4.50€/copa", image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1887&auto=format&fit=crop" },
    { name: "Albariño", description: "Blanco afrutado de las Rías Baixas.", price: "4.00€/copa", image: "https://images.unsplash.com/photo-1547595628-c61a29f496f0?q=80&w=1887&auto=format&fit=crop" },
    { name: "Cava Brut Nature", description: "Burbujas finas y elegantes.", price: "5.00€/copa", image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=1887&auto=format&fit=crop" },
    { name: "Rioja Reserva", description: "Tinto con crianza en barrica de roble.", price: "5.50€/copa", image: "https://images.unsplash.com/photo-1586370434639-0fe43b2d32d6?q=80&w=1887&auto=format&fit=crop" },
  ],
};

const MenuItem = ({ name, description, price, image }: { name: string, description: string, price: string, image: string }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="group w-full aspect-[4/3] [perspective:1000px] cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setIsFlipped(!isFlipped)}
    >
      <div
        className={cn(
          "relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d]",
          isFlipped && "[transform:rotateY(180deg)]"
        )}
      >
        {/* Front Side */}
        <div className="absolute w-full h-full [backface-visibility:hidden] rounded-lg overflow-hidden shadow-lg">
          <img src={image} alt={name} className="w-full h-full object-cover" />
          <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
            <h3 className="text-xl font-bold text-white drop-shadow-md">{name}</h3>
          </div>
        </div>

        {/* Back Side */}
        <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <Card className="w-full h-full flex flex-col justify-center p-6 bg-secondary border-primary/50 border-2">
            <CardHeader className="p-0 mb-2">
              <h3 className="text-xl font-semibold text-secondary-foreground">{name}</h3>
            </CardHeader>
            <CardContent className="p-0 flex-grow">
              <p className="text-sm text-muted-foreground">{description}</p>
            </CardContent>
            <CardFooter className="p-0 mt-4 justify-end">
              <span className="font-bold text-2xl text-primary">{price}</span>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export const Menu = () => {
  const { ref, isInView } = useScrollAnimate<HTMLElement>({ triggerOnce: true });
  const animations = ["animate-slide-in-from-left", "animate-slide-in-from-bottom", "animate-slide-in-from-right"];

  return (
    <section id="menu" ref={ref} className="bg-background py-16 md:py-24 overflow-x-hidden">
      <div className="container">
        <div className={cn("text-center mb-12 opacity-0", isInView && "animate-slide-in-from-bottom")}>
          <h2 className="text-3xl md:text-4xl font-bold">Nuestra Carta</h2>
          <p className="text-muted-foreground mt-2 text-lg">Sabores que te transportan al corazón de España.</p>
        </div>
        <Tabs defaultValue="tapas" className="w-full">
          <TabsList 
            className={cn("grid w-full grid-cols-2 md:grid-cols-4 mx-auto max-w-3xl opacity-0", isInView && "animate-slide-in-from-bottom")}
            style={{ animationDelay: '150ms' }}
          >
            <TabsTrigger value="tapas">Tapas</TabsTrigger>
            <TabsTrigger value="raciones">Raciones</TabsTrigger>
            <TabsTrigger value="postres">Postres</TabsTrigger>
            <TabsTrigger value="vinos">Vinos</TabsTrigger>
          </TabsList>
          <TabsContent value="tapas" className="mt-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {menuData.tapas.map((item, index) => (
                <div key={item.name} className={cn("opacity-0", isInView && animations[index % 3])} style={{ animationDelay: `${300 + index * 150}ms` }}>
                  <MenuItem {...item} />
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="raciones" className="mt-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {menuData.raciones.map((item, index) => (
                <div key={item.name} className={cn("opacity-0", isInView && animations[index % 3])} style={{ animationDelay: `${300 + index * 150}ms` }}>
                  <MenuItem {...item} />
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="postres" className="mt-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {menuData.postres.map((item, index) => (
                <div key={item.name} className={cn("opacity-0", isInView && animations[index % 3])} style={{ animationDelay: `${300 + index * 150}ms` }}>
                  <MenuItem {...item} />
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="vinos" className="mt-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {menuData.vinos.map((item, index) => (
                <div key={item.name} className={cn("opacity-0", isInView && animations[index % 3])} style={{ animationDelay: `${300 + index * 150}ms` }}>
                  <MenuItem {...item} />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};