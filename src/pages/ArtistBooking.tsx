import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Star, MapPin, Clock, Calendar as CalendarIcon, ArrowRight, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

// بيانات الفنانين (نفس البيانات من ArtistsGrid)
const artistsData = [
    {
        id: 1,
        name: "نورة العتيبي",
        specialty: "ميكب عرائس",
        rating: 4.9,
        reviews: 156,
        location: "مسقط",
        image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=400",
        verified: true,
        services: [
            { id: 1, name: "ميكب عرائس كامل", price: 45, duration: "3 ساعات", description: "ميكب عرائس متكامل مع تسريحة شعر وتجميل حواجب" },
            { id: 2, name: "ميكب سهرات", price: 30, duration: "2 ساعة", description: "ميكب سهرات راقي مناسب للمناسبات" },
            { id: 3, name: "ميكب طبيعي", price: 20, duration: "1 ساعة", description: "ميكب يومي طبيعي خفيف" },
        ],
        availableLocations: ["صالون الفنان", "منزل العميل"],
        workingHours: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"],
    },
    {
        id: 2,
        name: "سارة البلوشي",
        specialty: "ميكب سهرات",
        rating: 4.8,
        reviews: 203,
        location: "صلالة",
        image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=400",
        verified: true,
        services: [
            { id: 1, name: "ميكب سهرات VIP", price: 35, duration: "2.5 ساعة", description: "ميكب سهرات فاخر مع رموش وإكسسوارات" },
            { id: 2, name: "ميكب حفلات", price: 28, duration: "2 ساعة", description: "ميكب مميز للحفلات والمناسبات" },
            { id: 3, name: "ميكب تصوير", price: 40, duration: "3 ساعات", description: "ميكب احترافي لجلسات التصوير" },
        ],
        availableLocations: ["صالون الفنان", "منزل العميل"],
        workingHours: ["10:00", "11:00", "12:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"],
    },
    {
        id: 3,
        name: "ريم المعولي",
        specialty: "ميكب فوتوغرافي",
        rating: 4.7,
        reviews: 89,
        location: "صحار",
        image: "https://images.unsplash.com/photo-1515688594390-b649af70d282?q=80&w=400",
        verified: true,
        services: [
            { id: 1, name: "ميكب فوتوغرافي احترافي", price: 30, duration: "2 ساعة", description: "ميكب مثالي لجلسات التصوير الاحترافية" },
            { id: 2, name: "ميكب سينمائي", price: 40, duration: "3 ساعات", description: "ميكب سينمائي للأفلام والإعلانات" },
            { id: 3, name: "ميكب عادي", price: 22, duration: "1.5 ساعة", description: "ميكب عادي للمناسبات البسيطة" },
        ],
        availableLocations: ["صالون الفنان"],
        workingHours: ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"],
    },
    {
        id: 4,
        name: "هند الحارثي",
        specialty: "ميكب طبيعي",
        rating: 4.9,
        reviews: 178,
        location: "مسقط",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=400",
        verified: true,
        services: [
            { id: 1, name: "ميكب طبيعي راقي", price: 25, duration: "1.5 ساعة", description: "ميكب طبيعي يبرز جمالك الحقيقي" },
            { id: 2, name: "ميكب كوري", price: 30, duration: "2 ساعة", description: "ميكب بأسلوب كوري عصري" },
            { id: 3, name: "ميكب يومي سريع", price: 15, duration: "45 دقيقة", description: "ميكب يومي سريع وأنيق" },
        ],
        availableLocations: ["صالون الفنان", "منزل العميل"],
        workingHours: ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "18:00"],
    },
    {
        id: 5,
        name: "لمى الكندي",
        specialty: "ميكب سينمائي",
        rating: 5.0,
        reviews: 134,
        location: "نزوى",
        image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=400",
        verified: true,
        services: [
            { id: 1, name: "ميكب سينمائي كامل", price: 50, duration: "4 ساعات", description: "ميكب سينمائي متكامل للإنتاج الإعلامي" },
            { id: 2, name: "ميكب تلفزيوني", price: 38, duration: "2.5 ساعة", description: "ميكب احترافي للبرامج التلفزيونية" },
            { id: 3, name: "ميكب إعلاني", price: 45, duration: "3 ساعات", description: "ميكب مميز للإعلانات التجارية" },
        ],
        availableLocations: ["صالون الفنان", "منزل العميل", "استوديو خاص"],
        workingHours: ["10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "18:00"],
    },
    {
        id: 6,
        name: "ندى الرئيسي",
        specialty: "ميكب حفلات",
        rating: 4.8,
        reviews: 192,
        location: "صور",
        image: "https://images.unsplash.com/photo-1580894908361-967195033215?q=80&w=400",
        verified: true,
        services: [
            { id: 1, name: "ميكب حفلات فاخر", price: 40, duration: "2.5 ساعة", description: "ميكب فاخر للحفلات الخاصة" },
            { id: 2, name: "ميكب زفاف", price: 48, duration: "3.5 ساعة", description: "ميكب زفاف متكامل مع تسريحة" },
            { id: 3, name: "ميكب مناسبات", price: 32, duration: "2 ساعة", description: "ميكب جميل للمناسبات العائلية" },
        ],
        availableLocations: ["صالون الفنان", "منزل العميل"],
        workingHours: ["09:00", "10:00", "11:00", "12:00", "15:00", "16:00", "17:00", "18:00", "19:00"],
    },
];

const ArtistBooking = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const { artistId } = useParams();
    const location = useLocation();

    // البحث عن الفنان بناءً على الـ ID
    const artist = artistsData.find(a => a.id === parseInt(artistId || "1"));

    const [selectedService, setSelectedService] = useState<number | null>(null);
    const [selectedLocation, setSelectedLocation] = useState<string>("");
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [selectedTime, setSelectedTime] = useState<string>("");
    const [notes, setNotes] = useState<string>("");

    if (!artist) {
        return (
            <div className="min-h-screen flex flex-col bg-muted/30">
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <Card className="max-w-md">
                        <CardHeader>
                            <CardTitle>الفنان غير موجود</CardTitle>
                            <CardDescription>لم نتمكن من العثور على هذا الفنان</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button onClick={() => navigate("/")} className="w-full">
                                العودة إلى الصفحة الرئيسية
                            </Button>
                        </CardContent>
                    </Card>
                </main>
                <Footer />
            </div>
        );
    }

    const handleBooking = () => {
        if (!selectedService || !selectedLocation || !selectedDate || !selectedTime) {
            toast({
                title: "معلومات ناقصة",
                description: "يرجى تعبئة جميع الحقول المطلوبة",
                variant: "destructive",
            });
            return;
        }

        const service = artist.services.find(s => s.id === selectedService);

        toast({
            title: "تم الحجز بنجاح! 🎉",
            description: `تم حجز ${service?.name} مع ${artist.name}`,
        });

        // في التطبيق الحقيقي، سيتم إرسال البيانات إلى الباك إند
        setTimeout(() => {
            navigate("/profile");
        }, 2000);
    };

    const selectedServiceData = artist.services.find(s => s.id === selectedService);
    const totalPrice = selectedServiceData?.price || 0;

    return (
        <div className="min-h-screen flex flex-col bg-muted/30">
            <Header />

            <main className="flex-1 py-12 px-4">
                <div className="container max-w-6xl">
                    {/* Artist Info Card */}
                    <Card className="mb-6 shadow-elegant border-2">
                        <CardContent className="pt-6">
                            <div className="flex flex-col md:flex-row gap-6 items-start">
                                <Avatar className="h-24 w-24 border-4 border-primary/20">
                                    <AvatarImage src={artist.image} alt={artist.name} />
                                    <AvatarFallback className="text-2xl">{artist.name[0]}</AvatarFallback>
                                </Avatar>

                                <div className="flex-1">
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <h1 className="text-3xl font-bold mb-2">{artist.name}</h1>
                                            <p className="text-lg text-muted-foreground mb-3">{artist.specialty}</p>
                                        </div>
                                        {artist.verified && (
                                            <Badge className="bg-primary">معتمد</Badge>
                                        )}
                                    </div>

                                    <div className="flex flex-wrap gap-4 text-sm">
                                        <div className="flex items-center gap-1">
                                            <Star className="h-4 w-4 fill-primary text-primary" />
                                            <span className="font-semibold">{artist.rating}</span>
                                            <span className="text-muted-foreground">({artist.reviews} تقييم)</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-muted-foreground">
                                            <MapPin className="h-4 w-4" />
                                            <span>{artist.location}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Booking Form */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Select Service */}
                            <Card className="shadow-elegant border-2">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">1</span>
                                        اختر الخدمة
                                    </CardTitle>
                                    <CardDescription>اختر الخدمة المناسبة لك</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <RadioGroup value={selectedService?.toString()} onValueChange={(value) => setSelectedService(parseInt(value))}>
                                        <div className="space-y-3">
                                            {artist.services.map((service) => (
                                                <Label
                                                    key={service.id}
                                                    htmlFor={`service-${service.id}`}
                                                    className={cn(
                                                        "flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all hover:border-primary",
                                                        selectedService === service.id ? "border-primary bg-primary/5" : "border-muted"
                                                    )}
                                                >
                                                    <RadioGroupItem value={service.id.toString()} id={`service-${service.id}`} className="mt-1" />
                                                    <div className="flex-1">
                                                        <div className="flex items-start justify-between mb-1">
                                                            <h4 className="font-semibold">{service.name}</h4>
                                                            <span className="text-lg font-bold text-primary">{service.price} ريال</span>
                                                        </div>
                                                        <p className="text-sm text-muted-foreground mb-2">{service.description}</p>
                                                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                            <Clock className="h-3 w-3" />
                                                            <span>{service.duration}</span>
                                                        </div>
                                                    </div>
                                                </Label>
                                            ))}
                                        </div>
                                    </RadioGroup>
                                </CardContent>
                            </Card>

                            {/* Select Location */}
                            <Card className="shadow-elegant border-2">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">2</span>
                                        اختر الموقع
                                    </CardTitle>
                                    <CardDescription>أين تفضل إجراء الخدمة؟</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <RadioGroup value={selectedLocation} onValueChange={setSelectedLocation}>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {artist.availableLocations.map((loc) => (
                                                <Label
                                                    key={loc}
                                                    htmlFor={`location-${loc}`}
                                                    className={cn(
                                                        "flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all hover:border-primary",
                                                        selectedLocation === loc ? "border-primary bg-primary/5" : "border-muted"
                                                    )}
                                                >
                                                    <RadioGroupItem value={loc} id={`location-${loc}`} />
                                                    <div className="flex items-center gap-2">
                                                        <MapPin className="h-4 w-4 text-primary" />
                                                        <span className="font-medium">{loc}</span>
                                                    </div>
                                                </Label>
                                            ))}
                                        </div>
                                    </RadioGroup>
                                </CardContent>
                            </Card>

                            {/* Select Date & Time */}
                            <Card className="shadow-elegant border-2">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">3</span>
                                        اختر التاريخ والوقت
                                    </CardTitle>
                                    <CardDescription>متى تريد الحجز؟</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>التاريخ</Label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    className={cn(
                                                        "w-full justify-start text-right font-normal",
                                                        !selectedDate && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="ml-2 h-4 w-4" />
                                                    {selectedDate ? format(selectedDate, "PPP", { locale: ar }) : "اختر التاريخ"}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={selectedDate}
                                                    onSelect={setSelectedDate}
                                                    disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                                                    initialFocus
                                                    locale={ar}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>الوقت</Label>
                                        <Select value={selectedTime} onValueChange={setSelectedTime}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="اختر الوقت" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {artist.workingHours.map((time) => (
                                                    <SelectItem key={time} value={time} dir="ltr">
                                                        {time}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Additional Notes */}
                            <Card className="shadow-elegant border-2">
                                <CardHeader>
                                    <CardTitle>ملاحظات إضافية (اختياري)</CardTitle>
                                    <CardDescription>أي ملاحظات أو طلبات خاصة</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Textarea
                                        placeholder="مثال: أفضل ميكب ناعم، لدي حساسية من منتج معين..."
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                        rows={4}
                                    />
                                </CardContent>
                            </Card>
                        </div>

                        {/* Booking Summary */}
                        <div className="lg:col-span-1">
                            <Card className="shadow-elegant border-2 sticky top-4">
                                <CardHeader>
                                    <CardTitle>ملخص الحجز</CardTitle>
                                    <CardDescription>تفاصيل حجزك</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {selectedServiceData && (
                                        <div className="space-y-3 pb-4 border-b">
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">الخدمة</span>
                                                <span className="font-medium text-right max-w-48">{selectedServiceData.name}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">المدة</span>
                                                <span className="font-medium">{selectedServiceData.duration}</span>
                                            </div>
                                        </div>
                                    )}

                                    {selectedLocation && (
                                        <div className="flex justify-between pb-3 border-b">
                                            <span className="text-muted-foreground">الموقع</span>
                                            <span className="font-medium">{selectedLocation}</span>
                                        </div>
                                    )}

                                    {selectedDate && (
                                        <div className="flex justify-between pb-3 border-b">
                                            <span className="text-muted-foreground">التاريخ</span>
                                            <span className="font-medium">{format(selectedDate, "PPP", { locale: ar })}</span>
                                        </div>
                                    )}

                                    {selectedTime && (
                                        <div className="flex justify-between pb-3 border-b">
                                            <span className="text-muted-foreground">الوقت</span>
                                            <span className="font-medium" dir="ltr">{selectedTime}</span>
                                        </div>
                                    )}

                                    <div className="flex justify-between items-center pt-2">
                                        <span className="text-lg font-semibold">المجموع</span>
                                        <span className="text-2xl font-bold text-primary">{totalPrice} ريال</span>
                                    </div>

                                    <Button
                                        variant="hero"
                                        className="w-full text-lg gap-2"
                                        onClick={handleBooking}
                                        disabled={!selectedService || !selectedLocation || !selectedDate || !selectedTime}
                                    >
                                        <CheckCircle2 className="h-5 w-5" />
                                        تأكيد الحجز
                                        <ArrowRight className="h-5 w-5" />
                                    </Button>

                                    <p className="text-xs text-center text-muted-foreground">
                                        بالنقر على "تأكيد الحجز" فإنك توافق على شروط وأحكام الخدمة
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ArtistBooking;
