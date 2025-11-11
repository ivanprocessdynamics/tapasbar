"use client"

import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useScrollAnimate } from "@/hooks/useScrollAnimate";

const menuData = {
  tapas: [
    { name: "Patatas Bravas", description: "Nuestra salsa brava secreta con un toque de alioli.", price: "6.50€", image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Patatas_bravas_%2849415380638%29.jpg" },
    { name: "Gambas al Ajillo", description: "Salteadas en aceite de oliva, ajo y guindilla.", price: "9.00€", image: "https://upload.wikimedia.org/wikipedia/commons/b/b6/Gambas_al_ajillo%2C_2024.jpg" },
    { name: "Tortilla Española", description: "Jugosa y hecha al momento, como la de la abuela.", price: "5.00€", image: "https://upload.wikimedia.org/wikipedia/commons/9/95/Tortilla_espa%C3%B1ola-MMS.JPG" },
    { name: "Croquetas de Jamón", description: "Caseras y cremosas, con jamón ibérico.", price: "7.50€", image: "https://upload.wikimedia.org/wikipedia/commons/0/06/Croquetas-Jam%C3%B3n-Riofr%C3%ADo.jpg" },
    { name: "Pimientos de Padrón", description: "Fritos con aceite de oliva y sal gorda.", price: "6.00€", image: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Pimientos_de_Padr%C3%B3n_%282929150448%29.jpg" },
    { name: "Calamares Fritos", description: "Tiernos y crujientes, con un toque de limón.", price: "8.50€", image: "https://images.pexels.com/photos/17321002/pexels-photo-17321002.jpeg?auto=compress&cs=tinysrgb&w=800" },
  ],
  raciones: [
    { name: "Pulpo a la Gallega", description: "Cocido a la perfección con pimentón de la Vera.", price: "18.00€", image: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Pulpo_a_la_gallega.JPG" },
    { name: "Paella Mixta", description: "Arroz tradicional con marisco y pollo.", price: "16.00€", image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Spanish_Paella_%28Unsplash%29.jpg" },
    { name: "Albóndigas en Salsa", description: "Caseras en salsa de tomate especiada.", price: "12.00€", image: "https://www.lavanguardia.com/files/image_948_465/uploads/2018/07/17/5e997a42b5463.jpeg" },
  ],
  postres: [
    { name: "Churros con Chocolate", description: "Recén hechos con chocolate espeso.", price: "5.50€", image: "https://assets.unileversolutions.com/recipes-v3/240757-default.jpg?im=AspectCrop=(625,469);Resize=(625,469)" },
    { name: "Flan Casero", description: "Con caramelo líquido, receta de la abuela.", price: "4.50€", image: "https://imag.bonviveur.com/flan-de-huevo-casero.webp" },
    { name: "Crema Catalana", description: "Con azúcar caramelizada crujiente.", price: "5.00€", image: "https://www.frutamare.com/wp-content/uploads/2020/03/crema_catalana-1080x675.jpg.webp" },
  ],
  bebidas: [
    { name: "Sangría", description: "Refrescante y afrutada, la bebida del verano.", price: "4.00€/copa", image: "https://www.lotesycestasdenavidad.es/blog/wp-content/uploads/2023/08/Diseno-sin-titulo2.png" },
    { name: "Cerveza", description: "Bien fría, variedad de marcas nacionales.", price: "3.00€", image: "https://images.pexels.com/photos/1672304/pexels-photo-1672304.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { name: "Vino Tinto", description: "Selección de vinos españoles.", price: "4.50€/copa", image: "https://descorcha.com/cdn/shop/articles/1738072462758.jpg?v=1757001400&width=800" },
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
          <TabsList className="grid w-full grid-cols-4 mx-auto max-w-2xl">
            <TabsTrigger value="tapas">Tapas</TabsTrigger>
            <TabsTrigger value="raciones">Raciones</TabsTrigger>
            <TabsTrigger value="postres">Postres</TabsTrigger>
            <TabsTrigger value="bebidas">Bebidas</TabsTrigger>
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
          <TabsContent value="bebidas" className="mt-8">
            <div className="grid md:grid-cols-3 gap-6">
              {menuData.bebidas.map((item, index) => (
                <MenuItem key={item.name} {...item} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};