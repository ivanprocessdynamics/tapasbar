import { UtensilsCrossed, Facebook, Instagram, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <footer id="contacto" className="bg-primary text-primary-foreground">
      <div className="container py-8 flex flex-col items-center text-center">
        <div className="flex items-center mb-4">
          <UtensilsCrossed className="h-6 w-6 mr-2" />
          <span className="font-bold text-lg">El Bodegón</span>
        </div>
        <div className="flex space-x-4 mb-4">
          <a href="#" className="hover:opacity-80"><Instagram /></a>
          <a href="#" className="hover:opacity-80"><Facebook /></a>
          <a href="#" className="hover:opacity-80"><Twitter /></a>
        </div>
        <p className="text-sm text-primary-foreground/80">
          &copy; {new Date().getFullYear()} El Bodegón. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};