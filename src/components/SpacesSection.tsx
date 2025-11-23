import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Sparkles } from "lucide-react";

const spaces = [
  {
    id: 1,
    name: "الباقة الأساسية",
    price: "25 ريال عماني/ساعة",
    description: "مثالية للمبتدئين",
    features: [
      "مساحة 10 متر مربع",
      "إضاءة احترافية",
      "مرآة مضيئة",
      "كرسي عمل مريح",
      "واي فاي مجاني",
      "خزانة تخزين",
    ],
    popular: false,
  },
  {
    id: 2,
    name: "الباقة المميزة",
    price: "40 ريال عماني/ساعة",
    description: "الأكثر طلباً",
    features: [
      "مساحة 20 متر مربع",
      "إضاءة احترافية متقدمة",
      "مرآتان مضيئتان",
      "منطقة استقبال للعملاء",
      "واي فاي مجاني",
      "خزانة تخزين كبيرة",
      "شاشة عرض",
      "نظام صوت",
    ],
    popular: true,
  },
  {
    id: 3,
    name: "الباقة الملكية",
    price: "50 ريال عماني/ساعة",
    description: "للمحترفين",
    features: [
      "مساحة 35 متر مربع",
      "إضاءة احترافية متطورة",
      "3 مرايا مضيئة",
      "منطقة استقبال فاخرة",
      "واي فاي فائق السرعة",
      "غرفة تخزين منفصلة",
      "شاشة عرض كبيرة",
      "نظام صوت متقدم",
      "حمام خاص",
      "مطبخ صغير",
    ],
    popular: false,
  },
];

const SpacesSection = () => {
  return (
    <section id="spaces" className="py-20 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            استأجر <span className="bg-gradient-hero bg-clip-text text-transparent">مساحتك</span> المثالية
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            اختر الباقة المناسبة لك وابدأ مشروعك في بيئة فاخرة واحترافية
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {spaces.map((space) => (
            <Card 
              key={space.id} 
              className={`relative overflow-hidden transition-all duration-300 hover:-translate-y-2 ${
                space.popular ? 'border-primary shadow-elegant scale-105' : 'hover:shadow-soft'
              }`}
            >
              {space.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-hero py-2 text-center">
                  <div className="flex items-center justify-center gap-1 text-sm font-semibold text-white">
                    <Sparkles className="h-4 w-4" />
                    الأكثر شعبية
                  </div>
                </div>
              )}

              <CardHeader className={space.popular ? 'pt-14' : ''}>
                <CardTitle className="text-2xl">{space.name}</CardTitle>
                <CardDescription className="text-base">{space.description}</CardDescription>
                <div className="pt-4">
                  <span className="text-4xl font-bold text-primary">{space.price.split('/')[0]}</span>
                  <span className="text-muted-foreground">/{space.price.split('/')[1]}</span>
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3">
                  {space.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button 
                  variant={space.popular ? "hero" : "default"} 
                  className="w-full"
                  size="lg"
                >
                  احجز الآن
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            هل تحتاج باقة مخصصة؟
          </p>
          <Button variant="outline" size="lg">
            تواصل معنا
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SpacesSection;
