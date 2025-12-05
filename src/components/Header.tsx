import { Button } from "@/components/ui/button";
import { Menu, Sparkles } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    // First navigate to home page
    navigate("/");
    // Close mobile menu if open
    setIsMenuOpen(false);

    // Wait for navigation to complete before scrolling
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <button
          onClick={() => scrollToSection("home")}
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
        >
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            بوتيك الجمال
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <button
            onClick={() => scrollToSection("home")}
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            الرئيسية
          </button>
          <button
            onClick={() => scrollToSection("artists")}
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            الميكب آرتست
          </button>
          <button
            onClick={() => scrollToSection("spaces")}
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            المساحات
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            من نحن
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            تواصل معنا
          </button>
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost" className="hidden md:inline-flex">
              تسجيل الدخول
            </Button>
          </Link>

          <Link to="/register">
            <Button variant="hero" className="hidden md:inline-flex">
              انضم الآن
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="container flex flex-col gap-4 py-4">
            <button
              onClick={() => scrollToSection("home")}
              className="text-sm font-medium hover:text-primary transition-colors text-right"
            >
              الرئيسية
            </button>
            <button
              onClick={() => scrollToSection("artists")}
              className="text-sm font-medium hover:text-primary transition-colors text-right"
            >
              الميكب آرتست
            </button>
            <button
              onClick={() => scrollToSection("spaces")}
              className="text-sm font-medium hover:text-primary transition-colors text-right"
            >
              المساحات
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-sm font-medium hover:text-primary transition-colors text-right"
            >
              من نحن
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-sm font-medium hover:text-primary transition-colors text-right"
            >
              تواصل معنا
            </button>
            <div className="flex flex-col gap-2 pt-2">
              <Link to="/login" className="w-full">
                <Button variant="ghost" className="w-full">
                  تسجيل الدخول
                </Button>
              </Link>

              <Link to="/register" className="w-full">
                <Button variant="hero" className="w-full">
                  انضم الآن
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
