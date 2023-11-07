// import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/HomeComponents/Navbar";
import HeroSection from "../components/HomeComponents/HeroSection";
import AboutSection from "../components/HomeComponents/AboutSection";
import FeaturesSection from "../components/HomeComponents/FeaturesSection";
import TestimonialsSection from "../components/HomeComponents/TestimonialsSection";
import CTASection from "../components/HomeComponents/CTASection";

function HomePage() {
  let navigate = useNavigate();

  return (
    <main className="snap-y">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
}

export default HomePage;
