import { Header } from "@/components/tapas-bar/Header";
import { Hero } from "@/components/tapas-bar/Hero";
import { Menu } from "@/components/tapas-bar/Menu";
import { Specials } from "@/components/tapas-bar/Specials";
import { About } from "@/components/tapas-bar/About";
import { Gallery } from "@/components/tapas-bar/Gallery";
import { Testimonials } from "@/components/tapas-bar/Testimonials";
import { Reservations } from "@/components/tapas-bar/Reservations";
import { Footer } from "@/components/tapas-bar/Footer";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Menu />
        <Specials />
        <About />
        <Gallery />
        <Testimonials />
        <Reservations />
      </main>
      <Footer />
    </div>
  );
};

export default Index;