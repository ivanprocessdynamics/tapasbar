"use client"

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { UtensilsCrossed, Menu } from "lucide-react";

export const Header = () => {
  const navLinks = [
    { href: "#menu", label: "Menú" },
    { href: "#especiales", label: "Especiales" },
    { href: "#quienes-somos", label: "Quiénes Somos" },
    { href: "#galeria", label: "Local" },
    { href: "#reseñas", label: "Reseñas" },
    { href: "#reservas", label: "Contacto" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 shadow-sm backdrop-blur-sm">
      <div className="container flex h-20 items-center">
        <a href="#" className="flex items-center gap-2 mr-auto">
          <UtensilsCrossed className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">El Bodegón</span>
        </a>
        
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium mr-8">
          {navLinks.map(link => (
            <a key={link.href} href={link.href} className="transition-colors hover:text-primary">{link.label}</a>
          ))}
        </nav>

        <div className="hidden md:flex">
          <Button asChild>
            <a href="#reservas">Reserva Tu Mesa</a>
          </Button>
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="grid gap-6 text-lg font-medium mt-10">
                <a href="#" className="flex items-center gap-2 text-lg font-semibold mb-4">
                  <UtensilsCrossed className="h-6 w-6 text-primary" />
                  <span>El Bodegón</span>
                </a>
                {navLinks.map(link => (
                  <a key={link.href} href={link.href} className="text-muted-foreground hover:text-foreground">{link.label}</a>
                ))}
              </nav>
              <div className="mt-8">
                <Button className="w-full" asChild>
                  <a href="#reservas">Reserva Tu Mesa</a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};