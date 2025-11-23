import { Button } from "@/components/ui/button";
import { Menu, Sparkles } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            بوتيك الجمال
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#home" className="text-sm font-medium hover:text-primary transition-colors">
            الرئيسية
          </a>
          <a href="#artists" className="text-sm font-medium hover:text-primary transition-colors">
            الميكب آرتست
          </a>
          <a href="#spaces" className="text-sm font-medium hover:text-primary transition-colors">
            المساحات
          </a>
          <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">
            من نحن
          </a>
          <a href="#contact" className="text-sm font-medium hover:text-primary transition-colors">
            تواصل معنا
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" className="hidden md:inline-flex">
            تسجيل الدخول
          </Button>
          <Button variant="hero" className="hidden md:inline-flex">
            انضم الآن
          </Button>
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
            <a href="#home" className="text-sm font-medium hover:text-primary transition-colors">
              الرئيسية
            </a>
            <a href="#artists" className="text-sm font-medium hover:text-primary transition-colors">
              الميكب آرتست
            </a>
            <a href="#spaces" className="text-sm font-medium hover:text-primary transition-colors">
              المساحات
            </a>
            <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">
              من نحن
            </a>
            <a href="#contact" className="text-sm font-medium hover:text-primary transition-colors">
              تواصل معنا
            </a>
            <div className="flex flex-col gap-2 pt-2">
              <Button variant="ghost" className="w-full">
                تسجيل الدخول
              </Button>
              <Button variant="hero" className="w-full">
                انضم الآن
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
