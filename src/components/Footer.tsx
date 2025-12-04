import { Sparkles, Instagram, Twitter, Facebook, Mail, Phone, MapPin } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    // Navigate to home page first
    navigate("/");

    // Wait for navigation to complete, then scroll
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        // If section not found, scroll to top
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 100);
  };

  const scrollToTop = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 cursor-pointer" onClick={scrollToTop}>
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                بوتيك الجمال
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              منصتك الفاخرة لجميع احتياجاتك الجمالية. نربط بين المحترفين والعملاء في بيئة راقية وآمنة.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={scrollToTop}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  الرئيسية
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("artists")}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  الميكب آرتست
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("spaces")}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  المساحات
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  من نحن
                </button>
              </li>
            </ul>
          </div>

          {/* For Professionals */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">للمحترفين</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/register" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  انضم كميكب آرتست
                </Link>
              </li>
              <li>
                <Link to="/rent-space" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  استأجر مساحة
                </Link>
              </li>
              <li>
                <button
                  onClick={scrollToTop}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  الأسعار والباقات
                </button>
              </li>
              <li>
                <button
                  onClick={scrollToTop}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  الشروط والأحكام
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">تواصل معنا</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                info@boutique-beauty.com
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <span dir="ltr">+968 92 123 456</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                مسقط، سلطنة عمان
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2024 بوتيك الجمال. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
