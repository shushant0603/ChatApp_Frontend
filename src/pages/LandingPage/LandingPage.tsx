import React from "react";
import Header from "../../components/Header";
import Hero from "../../components/Hero";
import Feature from "../../components/Feature";
import VideoChatHero from "../../components/VideoChatHero";
import ChatSalesSection from "../../components/ChatSalesSection";
import DirectOrdersSection from "../../components/DirectOrdersSection";
import TestimonialsSection from "../../components/TestimonialsSection";
import FinalCTASection from "../../components/FinalCTASection";

const LandingPage: React.FC = () => {
  return (
    <div>

      <Header />
      <Hero />
      <Feature />
      <VideoChatHero />
      <ChatSalesSection />
      <DirectOrdersSection />
      <TestimonialsSection />
      <FinalCTASection />
    </div>
     
  );
};

export default LandingPage;
