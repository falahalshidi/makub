import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Mail, Phone, MapPin, Calendar, Star, Edit2, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [isEditing, setIsEditing] = useState(false);

    // بيانات المستخدم (في التطبيق الحقيقي، ستأتي من API أو Context)
    const [userData, setUserData] = useState({
        fullName: "فاطمة الحراصية",
        email: "fatima@example.com",
        phone: "+968 92345678",
        location: "muscat",
        accountType: "client",
        joinDate: "2024-01-15",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200",
    });

    const [editData, setEditData] = useState({ ...userData });

    // سجل الحجوزات (مثال)
    const bookings = [
        {
            id: 1,
            artistName: "نورة العتيبي",
            service: "ميكب عرائس",
            date: "2024-12-15",
            time: "14:00",
            status: "مؤكد",
            price: "45 ريال عماني",
        },
        {
            id: 2,
            artistName: "سارة البلوشي",
            service: "ميكب سهرات",
            date: "2024-11-20",
            time: "18:00",
            status: "مكتمل",
            price: "35 ريال عماني",
        },
    ];

    const handleSaveChanges = () => {
        // Phone validation for Oman
        const phoneRegex = /^(\+968|968)?[79]\d{7}$/;
        if (!phoneRegex.test(editData.phone.replace(/\s/g, ''))) {
            toast({
                title: "تنبيه",
                description: "يرجى إدخال رقم هاتف عماني صحيح",
                variant: "destructive",
            });
            return;
        }

        setUserData({ ...editData });
        setIsEditing(false);
        toast({
            title: "تم الحفظ بنجاح! ✓",
            description: "تم تحديث بياناتك الشخصية",
        });
    };

    const handleCancelEdit = () => {
        setEditData({ ...userData });
        setIsEditing(false);
    };

    const handleChange = (field: string, value: string) => {
        setEditData(prev => ({ ...prev, [field]: value }));
    };

    const getAccountTypeName = (type: string) => {
        const types: { [key: string]: string } = {
            client: "عميل",
            artist: "ميكب آرتست",
            owner: "مالك مساحة",
        };
        return types[type] || type;
    };

    const getLocationName = (location: string) => {
        const locations: { [key: string]: string } = {
            muscat: "مسقط",
            salalah: "صلالة",
            sohar: "صحار",
            nizwa: "نزوى",
            sur: "صور",
            buraimi: "البريمي",
            ibra: "إبراء",
            rustaq: "الرستاق",
        };
        return locations[location] || location;
    };

    const getStatusColor = (status: string) => {
        const colors: { [key: string]: string } = {
            "مؤكد": "bg-blue-500",
            "مكتمل": "bg-green-500",
            "ملغي": "bg-red-500",
            "قيد الانتظار": "bg-yellow-500",
        };
        return colors[status] || "bg-gray-500";
    };

    return (
        <div className="min-h-screen flex flex-col bg-muted/30">
            <Header />

            <main className="flex-1 py-12 px-4">
                <div className="container max-w-6xl">
                    {/* Profile Header */}
                    <Card className="mb-6 shadow-elegant border-2">
                        <CardContent className="pt-6">
                            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                                <Avatar className="h-32 w-32 border-4 border-primary/20">
                                    <AvatarImage src={userData.avatar} alt={userData.fullName} />
                                    <AvatarFallback className="text-3xl">{userData.fullName[0]}</AvatarFallback>
                                </Avatar>

                                <div className="flex-1 text-center md:text-right">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                                        <div>
                                            <h1 className="text-3xl font-bold mb-2">{userData.fullName}</h1>
                                            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                                                <Badge variant="secondary" className="text-sm">
                                                    {getAccountTypeName(userData.accountType)}
                                                </Badge>
                                                <Badge variant="outline" className="text-sm">
                                                    <Calendar className="ml-1 h-3 w-3" />
                                                    انضم في {new Date(userData.joinDate).toLocaleDateString('ar-EG')}
                                                </Badge>
                                            </div>
                                        </div>

                                        {!isEditing ? (
                                            <Button
                                                variant="outline"
                                                onClick={() => setIsEditing(true)}
                                                className="gap-2"
                                            >
                                                <Edit2 className="h-4 w-4" />
                                                تعديل الملف الشخصي
                                            </Button>
                                        ) : (
                                            <div className="flex gap-2">
                                                <Button
                                                    variant="default"
                                                    onClick={handleSaveChanges}
                                                    className="gap-2"
                                                >
                                                    <Save className="h-4 w-4" />
                                                    حفظ
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    onClick={handleCancelEdit}
                                                    className="gap-2"
                                                >
                                                    <X className="h-4 w-4" />
                                                    إلغاء
                                                </Button>
                                            </div>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-2 justify-center md:justify-start">
                                            <Mail className="h-4 w-4" />
                                            <span>{userData.email}</span>
                                        </div>
                                        <div className="flex items-center gap-2 justify-center md:justify-start">
                                            <Phone className="h-4 w-4" />
                                            <span dir="ltr">{userData.phone}</span>
                                        </div>
                                        <div className="flex items-center gap-2 justify-center md:justify-start">
                                            <MapPin className="h-4 w-4" />
                                            <span>{getLocationName(userData.location)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Tabs Section */}
                    <Tabs defaultValue="info" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-6">
                            <TabsTrigger value="info">المعلومات الشخصية</TabsTrigger>
                            <TabsTrigger value="bookings">الحجوزات</TabsTrigger>
                        </TabsList>

                        {/* Personal Information Tab */}
                        <TabsContent value="info">
                            <Card className="shadow-elegant border-2">
                                <CardHeader>
                                    <CardTitle>المعلومات الشخصية</CardTitle>
                                    <CardDescription>
                                        {isEditing ? "قم بتعديل معلوماتك الشخصية" : "معلوماتك الشخصية المسجلة"}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="fullName">الاسم الكامل</Label>
                                            <div className="relative">
                                                <User className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                                                <Input
                                                    id="fullName"
                                                    className="pr-10"
                                                    value={isEditing ? editData.fullName : userData.fullName}
                                                    onChange={(e) => handleChange("fullName", e.target.value)}
                                                    disabled={!isEditing}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="email">البريد الإلكتروني</Label>
                                            <div className="relative">
                                                <Mail className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    className="pr-10"
                                                    value={isEditing ? editData.email : userData.email}
                                                    onChange={(e) => handleChange("email", e.target.value)}
                                                    disabled={!isEditing}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="phone">رقم الهاتف</Label>
                                            <div className="relative">
                                                <Phone className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                                                <Input
                                                    id="phone"
                                                    type="tel"
                                                    className="pr-10 text-left"
                                                    dir="ltr"
                                                    value={isEditing ? editData.phone : userData.phone}
                                                    onChange={(e) => handleChange("phone", e.target.value)}
                                                    disabled={!isEditing}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="location">المنطقة</Label>
                                            <div className="relative">
                                                <MapPin className="absolute right-3 top-3 h-4 w-4 text-muted-foreground z-10" />
                                                {isEditing ? (
                                                    <Select
                                                        value={editData.location}
                                                        onValueChange={(value) => handleChange("location", value)}
                                                    >
                                                        <SelectTrigger className="pr-10">
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="muscat">مسقط</SelectItem>
                                                            <SelectItem value="salalah">صلالة</SelectItem>
                                                            <SelectItem value="sohar">صحار</SelectItem>
                                                            <SelectItem value="nizwa">نزوى</SelectItem>
                                                            <SelectItem value="sur">صور</SelectItem>
                                                            <SelectItem value="buraimi">البريمي</SelectItem>
                                                            <SelectItem value="ibra">إبراء</SelectItem>
                                                            <SelectItem value="rustaq">الرستاق</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                ) : (
                                                    <Input
                                                        className="pr-10"
                                                        value={getLocationName(userData.location)}
                                                        disabled
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Bookings Tab */}
                        <TabsContent value="bookings">
                            <Card className="shadow-elegant border-2">
                                <CardHeader>
                                    <CardTitle>سجل الحجوزات</CardTitle>
                                    <CardDescription>جميع حجوزاتك السابقة والحالية</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {bookings.length === 0 ? (
                                        <div className="text-center py-12 text-muted-foreground">
                                            <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                            <p>لا توجد حجوزات حتى الآن</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {bookings.map((booking) => (
                                                <Card key={booking.id} className="border-2">
                                                    <CardContent className="pt-6">
                                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                            <div className="flex-1">
                                                                <div className="flex items-center gap-3 mb-2">
                                                                    <h3 className="text-lg font-bold">{booking.artistName}</h3>
                                                                    <Badge className={getStatusColor(booking.status)}>
                                                                        {booking.status}
                                                                    </Badge>
                                                                </div>
                                                                <p className="text-muted-foreground mb-2">{booking.service}</p>
                                                                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                                                    <div className="flex items-center gap-1">
                                                                        <Calendar className="h-4 w-4" />
                                                                        <span>{new Date(booking.date).toLocaleDateString('ar-EG')}</span>
                                                                    </div>
                                                                    <div className="flex items-center gap-1">
                                                                        <span className="font-arabic">⏰</span>
                                                                        <span dir="ltr">{booking.time}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="text-left md:text-center">
                                                                <p className="text-2xl font-bold text-primary">{booking.price}</p>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Profile;
