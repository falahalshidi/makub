import { Button } from "@/components/ui/button";
import { Sparkles, Users, Calendar } from "lucide-react";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-hero opacity-10" />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=2000')] bg-cover bg-center opacity-20" />
      
      <div className="container relative z-10 py-20 text-center">
        <div className="mx-auto max-w-3xl space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            منصة <span className="bg-gradient-hero bg-clip-text text-transparent">فاخرة</span> لجميع احتياجاتك الجمالية
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            اكتشف أفضل الميكب آرتست والمختصين، احجز خدماتك، أو استأجر مساحة عمل فاخرة لبدء مشروعك
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button variant="hero" size="lg" className="text-lg">
              <Sparkles className="ml-2 h-5 w-5" />
              استكشف الآن
            </Button>
            <Button variant="outline" size="lg" className="text-lg">
              استأجر مساحة
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 pt-12 max-w-2xl mx-auto">
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-primary">200+</div>
              <div className="text-sm text-muted-foreground">ميكب آرتست محترف</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-primary">5000+</div>
              <div className="text-sm text-muted-foreground">حجز شهري</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground">مساحة عمل فاخرة</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
