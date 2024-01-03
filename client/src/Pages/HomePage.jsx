import Navbar from "../components/HomeComponents/Navbar";
import HeroSection from "../components/HomeComponents/HeroSection";
import AboutSection from "../components/HomeComponents/AboutSection";
import FeaturesSection from "../components/HomeComponents/FeaturesSection";
import TestimonialsSection from "../components/HomeComponents/TestimonialsSection";
import CTASection from "../components/HomeComponents/CTASection";
import Footer from "../components/HomeComponents/Footer";

function HomePage() {
  return (
    <main className="snap-y">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  );
}

export default HomePage;
