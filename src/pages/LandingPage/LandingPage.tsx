import React from "react";
import Header from "../../components/landing_page/Header";
import Hero from "../../components/landing_page/Hero";
import Feature from "../../components/landing_page/Feature";
import VideoChatHero from "../../components/landing_page/VideoChatHero";
import ChatSalesSection from "../../components/landing_page/ChatSalesSection";
import DirectOrdersSection from "../../components/landing_page/DirectOrdersSection";
import TestimonialsSection from "../../components/landing_page/TestimonialsSection";
import FinalCTASection from "../../components/landing_page/FinalCTASection";

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
