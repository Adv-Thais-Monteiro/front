import HeroSection from "@/components/HeroSection";
import StatementSection from "@/components/StatementSection";
import PracticeAreasSection from "@/components/PracticeAreasSection";
import SuccessCasesSection from "@/components/SuccessCasesSection";
import QualificationsSection from "@/components/QualificationsSection";
import FAQSection from "@/components/FAQSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <main className="bg-background">
      <HeroSection />
      <StatementSection />
      <PracticeAreasSection />
      <SuccessCasesSection />
      <QualificationsSection />
      <FAQSection />
      <AboutSection />
      <ContactSection />
    </main>
  );
};

export default Index;
