import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Gallery } from "@/components/sections/gallery";
import { Testimonials } from "@/components/sections/testimonials";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { SkipToContent } from "@/components/layout/skip-to-content";

export default function App() {
  return (
    <>
      <SkipToContent />
      <Header />
      <main id="main">
        <Hero />
        <Services />
        <Gallery />
        <Testimonials />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
