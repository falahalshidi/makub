import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ArtistsGrid from "@/components/ArtistsGrid";
import SpacesSection from "@/components/SpacesSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <ArtistsGrid />
        <SpacesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
