"use client"

import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useScrollAnimate } from "@/hooks/useScrollAnimate";

// Proxy y fallback para hosts lentos/bloqueo de hotlinking
const optimizeImageSrc = (url: string) => {
  try {
    const u = new URL(url);
    const heavyHosts = [
      "www.lavanguardia.com",
      "descorcha.com",
      "www.lotesycestasdenavidad.es",
      "assets.unileversolutions.com",
      "imag.bonviveur.com",
      "www.frutamare.com",
      "cdn-ilddihb.nitrocdn.com",
      "www.infobae.com",
      "imagenes.elpais.com",
      "www.slofoodgroup.com",
      "encrypted-tbn0.gstatic.com",
      "www.sherry.wine",
      "www.alberguesdelcamino.com",
      "cookingtheglobe.com",
      "images.cookforyourlife.org",
      "tropicanabeachclub.es",
      "media.istockphoto.com",
      "spanishsabores.com",
      "faustinorivero.com",
    ];
    if (heavyHosts.includes(u.hostname)) {
      const hostPath = `${u.hostname}${u.pathname}${u.search}`;
      return `https://wsrv.nl/?url=${hostPath}&w=700&h=525&fit=cover&output=webp`;
    }
    return url;
  } catch {
    return url;
  }
};

const FALLBACK_IMG = "https://placehold.co/700x525?text=Imagen";

const menuData = {
  tapas: [
    { name: "Patatas Bravas", description: "Nuestra salsa brava secreta con un toque de alioli.", price: "6.50€", image: "https://cdn-ilddihb.nitrocdn.com/MgqZCGPEMHvMRLsisMUCAIMWvgGMxqaj/assets/images/optimized/rev-9baa5ce/www.goya.com/wp-content/uploads/2023/10/spicy-potatoes.jpg" },
    { name: "Gambas al Ajillo", description: "Salteadas en aceite de oliva, ajo y guindilla.", price: "9.00€", image: "https://www.infobae.com/resizer/v2/KH6OR3WLTRAXBFHFCKUFKNI6A4.jpg?auth=ed1a6aef16bca7840125a81cfc4c4fd48166df53ff3da0f5945f6bdd3634aa1c&smart=true&width=577&height=385&quality=85" },
    { name: "Tortilla Española", description: "Jugosa y hecha al momento, como la de la abuela.", price: "5.00€", image: "https://imagenes.elpais.com/resizer/v2/EE4F4BBKOVCZNN6YUQKD3HMFL4.jpg?auth=1fef256c3d65ceafcdea14287df1aaffd6bf968a237a3685409cd26bd2230911&width=1000" },
    { name: "Croquetas de Jamón", description: "Caseras y cremosas, con jamón ibérico.", price: "7.50€", image: "https://www.slofoodgroup.com/cdn/shop/articles/croquetas-de-jamon-234754.jpg?crop=center&v=1622775032&width=800" },
    { name: "Pimientos de Padrón", description: "Fritos con aceite de oliva y sal gorda.", price: "6.00€", image: "https://spanishsabores.com/wp-content/uploads/2018/04/Padron-Peppers-0792-Blog.jpg" },
    { name: "Calamares Fritos", description: "Tiernos y crujientes, con un toque de limón.", price: "8.50€", image: "https://www.sherry.wine/media/images/vinos_de_jerez_chocos_fritos.width-876.jpg" },
  ],
  raciones: [
    { name: "Pulpo a la Gallega", description: "Cocido a la perfección con pimentón de la Vera.", price: "18.00€", image: "https://www.alberguesdelcamino.com/wp-content/uploads/2024/07/camino.jpg" },
    { name: "Paella Mixta", description: "Arroz tradicional con marisco y pollo.", price: "16.00€", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Spanish_Paella_%28Unsplash%29.jpg/400px-Spanish_Paella_%28Unsplash%29.jpg" },
    { name: "Albóndigas en Salsa", description: "Caseras en salsa de tomate especiada.", price: "12.00€", image: "https://www.lavanguardia.com/files/image_948_465/uploads/2018/07/17/5e997a42b5463.jpeg" },
  ],
  postres: [
    { name: "Churros con Chocolate", description: "Recén hechos con chocolate espeso.", price: "5.50€", image: "https://cookingtheglobe.com/wp-content/uploads/2016/06/churros-con-chocolate-2.jpg" },
    { name: "Flan Casero", description: "Con caramelo líquido, receta de la abuela.", price: "4.50€", image: "https://imag.bonviveur.com/flan-de-huevo-casero.webp" },
    { name: "Crema Catalana", description: "Con azúcar caramelizada crujiente.", price: "5.00€", image: "https://www.frutamare.com/wp-content/uploads/2020/03/crema_catalana-1080x675.jpg.webp" },
  ],
  bebidas: [
    { name: "Sangría", description: "Refrescante y afrutada, la bebida del verano.", price: "4.00€/copa", image: "https://images.cookforyourlife.org/wp-content/uploads/2018/08/1-1024x683.jpg" },
    { name: "Cerveza", description: "Bien fría, variedad de marcas nacionales.", price: "3.00€", image: "https://tropicanabeachclub.es/wp-content/uploads/2022/05/Jarras-de-cerveza-0-23042932_m-e1653340148345.jpg" },
    { name: "Vino Tinto", description: "Selección de vinos españoles.", price: "4.50€/copa", image: "https://faustinorivero.com/wp-content/uploads/2023/04/tipos-de-vino-tinto.jpg" },
  ],
};

const MenuItem = ({ name, description, price, image }: { name: string, description: string, price: string, image: string }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string>(FALLBACK_IMG);
  const src = optimizeImageSrc(image);

  useEffect(() => {
    let cancelled = false;
    const pre = new Image();
    pre.referrerPolicy = "no-referrer";
    pre.onload = () => { if (!cancelled) setCurrentSrc(src); };
    pre.onerror = () => { if (!cancelled) setCurrentSrc(FALLBACK_IMG); };
    pre.src = src;
    return () => { cancelled = true; };
  }, [src]);

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
          <img 
            src={currentSrc} 
            alt={name} 
            className="w-full h-full object-cover" 
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
          />
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