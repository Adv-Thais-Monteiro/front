import HeroSection from "@/components/HeroSection";
import StatementSection from "@/components/StatementSection";
import PracticeAreasSection from "@/components/PracticeAreasSection";
import QualificationsSection from "@/components/QualificationsSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <main className="bg-background">
      <HeroSection />
      <StatementSection />
      <PracticeAreasSection />
      <QualificationsSection />
      <AboutSection />
      <ContactSection />
    </main>
  );
};

export default Index;
