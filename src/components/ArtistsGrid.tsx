import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Calendar } from "lucide-react";

const artists = [
  {
    id: 1,
    name: "نورة العتيبي",
    specialty: "ميكب عرائس",
    rating: 4.9,
    reviews: 156,
    location: "مسقط",
    price: "45 ريال عماني",
    image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=400",
    verified: true,
  },
  {
    id: 2,
    name: "سارة البلوشي",
    specialty: "ميكب سهرات",
    rating: 4.8,
    reviews: 203,
    location: "صلالة",
    price: "35 ريال عماني",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=400",
    verified: true,
  },
  {
    id: 3,
    name: "ريم المعولي",
    specialty: "ميكب فوتوغرافي",
    rating: 4.7,
    reviews: 89,
    location: "صحار",
    price: "30 ريال عماني",
    image: "https://images.unsplash.com/photo-1515688594390-b649af70d282?q=80&w=400",
    verified: true,
  },
  {
    id: 4,
    name: "هند الحارثي",
    specialty: "ميكب طبيعي",
    rating: 4.9,
    reviews: 178,
    location: "مسقط",
    price: "25 ريال عماني",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=400",
    verified: true,
  },
  {
    id: 5,
    name: "لمى الكندي",
    specialty: "ميكب سينمائي",
    rating: 5.0,
    reviews: 134,
    location: "نزوى",
    price: "50 ريال عماني",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=400",
    verified: true,
  },
  {
    id: 6,
    name: "ندى الرئيسي",
    specialty: "ميكب حفلات",
    rating: 4.8,
    reviews: 192,
    location: "صور",
    price: "40 ريال عماني",
    image: "https://images.unsplash.com/photo-1580894908361-967195033215?q=80&w=400",
    verified: true,
  },
];

const ArtistsGrid = () => {
  return (
    <section id="artists" className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            أفضل <span className="bg-gradient-hero bg-clip-text text-transparent">الميكب آرتست</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            اختر من بين نخبة من المحترفين المعتمدين لدينا
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {artists.map((artist) => (
            <Card key={artist.id} className="overflow-hidden hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                {artist.verified && (
                  <Badge className="absolute top-3 right-3 bg-primary">
                    معتمد
                  </Badge>
                )}
              </div>

              <CardHeader className="space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold">{artist.name}</h3>
                    <p className="text-sm text-muted-foreground">{artist.specialty}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="font-semibold">{artist.rating}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{artist.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{artist.reviews} تقييم</span>
                  <span className="text-lg font-bold text-primary">{artist.price}</span>
                </div>
              </CardContent>

              <CardFooter>
                <Link to={`/booking/${artist.id}`} className="w-full">
                  <Button variant="default" className="w-full">
                    <Calendar className="ml-2 h-4 w-4" />
                    احجز الآن
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            عرض المزيد
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ArtistsGrid;
