import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Palette, Building2, Calendar, Trash2, Plus, Edit, Shield, LogOut, Search, Loader2 } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import {
    getArtists, getSpaces, createArtist, createSpace,
    deleteArtist, deleteSpace, updateArtist, updateSpace, Artist, Space
} from "@/lib/firestore";

const OMANI_GOVERNORATES = [
    "محافظة مسقط",
    "محافظة ظفار",
    "محافظة مسندم",
    "محافظة البريمي",
    "محافظة الداخلية",
    "محافظة شمال الباطنة",
    "محافظة جنوب الباطنة",
    "محافظة شمال الشرقية",
    "محافظة جنوب الشرقية",
    "محافظة الظاهرة",
    "محافظة الوسطى"
];

const AdminDashboard = () => {
    const { toast } = useToast();
    const navigate = useNavigate();

    // Data state
    const [artists, setArtists] = useState<Artist[]>([]);
    const [spaces, setSpaces] = useState<Space[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isAddingArtist, setIsAddingArtist] = useState(false);
    const [isAddingSpace, setIsAddingSpace] = useState(false);
    const [isEditingArtist, setIsEditingArtist] = useState(false);
    const [isEditingSpace, setIsEditingSpace] = useState(false);
    const [editingArtistId, setEditingArtistId] = useState<string | null>(null);
    const [editingSpaceId, setEditingSpaceId] = useState<string | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<{ type: 'artist' | 'space', id: string, name: string } | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const [artistForm, setArtistForm] = useState({
        name: "",
        specialty: "",
        location: "",
        price: "",
        image: "",
        bio: "",
        services: ""
    });

    const [spaceForm, setSpaceForm] = useState({
        name: "",
        location: "",
        price: "",
        description: "",
        amenities: "",
        images: ""
    });

    useEffect(() => {
        // المستخدم محمي بالفعل بواسطة AdminProtectedRoute
        loadData();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            toast({
                title: "تم تسجيل الخروج",
                description: "تم تسجيل الخروج بنجاح",
            });
            navigate("/login");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    const loadData = async () => {
        try {
            setLoading(true);
            const [artistsData, spacesData] = await Promise.all([
                getArtists(),
                getSpaces(),
            ]);
            setArtists(artistsData);
            setSpaces(spacesData);
        } catch (error) {
            console.error("Error loading data:", error);
            toast({
                title: "خطأ",
                description: "حدث خطأ أثناء تحميل البيانات",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleAddArtist = async () => {
        try {
            setSubmitting(true);

            if (!artistForm.name || !artistForm.specialty || !artistForm.location || !artistForm.price) {
                toast({
                    title: "بيانات ناقصة",
                    description: "الرجاء ملء جميع الحقول المطلوبة",
                    variant: "destructive",
                });
                return;
            }

            await createArtist({
                userId: auth.currentUser?.uid || "admin",
                name: artistForm.name,
                specialty: artistForm.specialty,
                location: artistForm.location,
                price: parseFloat(artistForm.price),
                image: artistForm.image || "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400",
                bio: artistForm.bio,
                services: artistForm.services.split(",").map(s => s.trim()).filter(s => s),
                rating: 5.0,
                reviews: 0
            });

            toast({
                title: "تم الإضافة",
                description: "تم إضافة الآرتست بنجاح",
            });

            setIsAddingArtist(false);
            setArtistForm({ name: "", specialty: "", location: "", price: "", image: "", bio: "", services: "" });
            loadData();
        } catch (error) {
            console.error("Error adding artist:", error);
            toast({
                title: "خطأ",
                description: "حدث خطأ أثناء إضافة الآرتست",
                variant: "destructive",
            });
        } finally {
            setSubmitting(false);
        }
    };

    const handleEditArtist = async () => {
        try {
            setSubmitting(true);

            if (!editingArtistId) return;

            if (!artistForm.name || !artistForm.specialty || !artistForm.location || !artistForm.price) {
                toast({
                    title: "بيانات ناقصة",
                    description: "الرجاء ملء جميع الحقول المطلوبة",
                    variant: "destructive",
                });
                return;
            }

            await updateArtist(editingArtistId, {
                name: artistForm.name,
                specialty: artistForm.specialty,
                location: artistForm.location,
                price: parseFloat(artistForm.price),
                image: artistForm.image,
                bio: artistForm.bio,
                services: artistForm.services.split(",").map(s => s.trim()).filter(s => s),
            });

            toast({
                title: "تم التحديث",
                description: "تم تحديث بيانات الآرتست بنجاح",
            });

            setIsEditingArtist(false);
            setEditingArtistId(null);
            setArtistForm({ name: "", specialty: "", location: "", price: "", image: "", bio: "", services: "" });
            loadData();
        } catch (error) {
            console.error("Error updating artist:", error);
            toast({
                title: "خطأ",
                description: "حدث خطأ أثناء تحديث الآرتست",
                variant: "destructive",
            });
        } finally {
            setSubmitting(false);
        }
    };

    const openEditArtistDialog = (artist: Artist) => {
        setEditingArtistId(artist.id || null);
        setArtistForm({
            name: artist.name,
            specialty: artist.specialty,
            location: artist.location,
            price: artist.price.toString(),
            image: artist.image,
            bio: artist.bio || "",
            services: artist.services.join(", ")
        });
        setIsEditingArtist(true);
    };

    const handleAddSpace = async () => {
        try {
            setSubmitting(true);

            if (!spaceForm.name || !spaceForm.location || !spaceForm.price || !spaceForm.description) {
                toast({
                    title: "بيانات ناقصة",
                    description: "الرجاء ملء جميع الحقول المطلوبة",
                    variant: "destructive",
                });
                return;
            }

            await createSpace({
                ownerId: auth.currentUser?.uid || "admin",
                name: spaceForm.name,
                location: spaceForm.location,
                price: parseFloat(spaceForm.price),
                description: spaceForm.description,
                amenities: spaceForm.amenities.split(",").map(a => a.trim()).filter(a => a),
                images: spaceForm.images.split(",").map(i => i.trim()).filter(i => i),
                status: "available"
            });

            toast({
                title: "تم الإضافة",
                description: "تم إضافة المساحة بنجاح",
            });

            setIsAddingSpace(false);
            setSpaceForm({ name: "", location: "", price: "", description: "", amenities: "", images: "" });
            loadData();
        } catch (error) {
            console.error("Error adding space:", error);
            toast({
                title: "خطأ",
                description: "حدث خطأ أثناء إضافة المساحة",
                variant: "destructive",
            });
        } finally {
            setSubmitting(false);
        }
    };

    const handleEditSpace = async () => {
        try {
            setSubmitting(true);

            if (!editingSpaceId) return;

            if (!spaceForm.name || !spaceForm.location || !spaceForm.price || !spaceForm.description) {
                toast({
                    title: "بيانات ناقصة",
                    description: "الرجاء ملء جميع الحقول المطلوبة",
                    variant: "destructive",
                });
                return;
            }

            await updateSpace(editingSpaceId, {
                name: spaceForm.name,
                location: spaceForm.location,
                price: parseFloat(spaceForm.price),
                description: spaceForm.description,
                amenities: spaceForm.amenities.split(",").map(a => a.trim()).filter(a => a),
                images: spaceForm.images.split(",").map(i => i.trim()).filter(i => i),
            });

            toast({
                title: "تم التحديث",
                description: "تم تحديث بيانات المساحة بنجاح",
            });

            setIsEditingSpace(false);
            setEditingSpaceId(null);
            setSpaceForm({ name: "", location: "", price: "", description: "", amenities: "", images: "" });
            loadData();
        } catch (error) {
            console.error("Error updating space:", error);
            toast({
                title: "خطأ",
                description: "حدث خطأ أثناء تحديث المساحة",
                variant: "destructive",
            });
        } finally {
            setSubmitting(false);
        }
    };

    const openEditSpaceDialog = (space: Space) => {
        setEditingSpaceId(space.id || null);
        setSpaceForm({
            name: space.name,
            location: space.location,
            price: space.price.toString(),
            description: space.description,
            amenities: space.amenities.join(", "),
            images: space.images.join(", ")
        });
        setIsEditingSpace(true);
    };

    const handleDelete = async () => {
        if (!deleteTarget) return;

        try {
            setSubmitting(true);

            if (deleteTarget.type === 'artist') {
                await deleteArtist(deleteTarget.id);
                toast({
                    title: "تم الحذف",
                    description: "تم حذف الآرتست بنجاح",
                });
            } else {
                await deleteSpace(deleteTarget.id);
                toast({
                    title: "تم الحذف",
                    description: "تم حذف المساحة بنجاح",
                });
            }

            setDeleteTarget(null);
            loadData();
        } catch (error) {
            console.error("Error deleting:", error);
            toast({
                title: "خطأ",
                description: "حدث خطأ أثناء الحذف",
                variant: "destructive",
            });
        } finally {
            setSubmitting(false);
        }
    };


    const filteredArtists = artists.filter(artist =>
        artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artist.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredSpaces = spaces.filter(space =>
        space.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        space.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Loading Screen
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-muted/30">
                <div className="text-center space-y-4">
                    <div className="h-12 w-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto" />
                    <p className="text-muted-foreground">جاري التحميل...</p>
                </div>
            </div>
        );
    }

    // Admin Dashboard
    return (
        <div className="min-h-screen flex flex-col bg-muted/30">
            {/* Admin Header */}
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
                <div className="container flex h-16 items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Shield className="h-8 w-8 text-primary" />
                        <div>
                            <h1 className="text-xl font-bold">لوحة تحكم الإدارة</h1>
                            <p className="text-xs text-muted-foreground">بوتيك الجمال</p>
                        </div>
                    </div>
                    <Button variant="destructive" onClick={handleLogout}>
                        <LogOut className="h-4 w-4 ml-2" />
                        تسجيل الخروج
                    </Button>
                </div>
            </header>

            <main className="flex-1 py-8 px-4">
                <div className="container max-w-7xl">
                    {/* Statistics */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    إجمالي الآرتست
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">{artists.length}</div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    إجمالي المساحات
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">{spaces.length}</div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    المساحات المتاحة
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">
                                    {spaces.filter(s => s.status === "available").length}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    المساحات المؤجرة
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">
                                    {spaces.filter(s => s.status === "rented").length}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Search */}
                    <div className="mb-6">
                        <div className="relative">
                            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="ابحث في الآرتست والمساحات..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pr-10"
                            />
                        </div>
                    </div>

                    {/* Tabs */}
                    <Tabs defaultValue="artists" className="w-full">
                        <TabsList className="grid w-full grid-cols-3 mb-6">
                            <TabsTrigger value="artists">
                                <Palette className="h-4 w-4 ml-2" />
                                إدارة الآرتست
                            </TabsTrigger>
                            <TabsTrigger value="spaces">
                                <Building2 className="h-4 w-4 ml-2" />
                                إدارة المساحات
                            </TabsTrigger>
                            <TabsTrigger value="bookings">
                                <Calendar className="h-4 w-4 ml-2" />
                                إدارة الحجوزات
                            </TabsTrigger>
                        </TabsList>

                        {/* Artists Tab */}
                        <TabsContent value="artists">
                            <Card>
                                <CardHeader>
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                        <div>
                                            <CardTitle>قائمة الميكب آرتست</CardTitle>
                                            <CardDescription>
                                                إدارة جميع الميكب آرتست المسجلين في المنصة ({filteredArtists.length})
                                            </CardDescription>
                                        </div>
                                        <Button onClick={() => setIsAddingArtist(true)}>
                                            <Plus className="h-4 w-4 ml-2" />
                                            إضافة آرتست جديد
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    {filteredArtists.length === 0 ? (
                                        <div className="text-center py-12 text-muted-foreground">
                                            <Palette className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                            <p>لا يوجد ميكب آرتست</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {filteredArtists.map((artist) => (
                                                <div
                                                    key={artist.id}
                                                    className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <img
                                                            src={artist.image}
                                                            alt={artist.name}
                                                            className="h-16 w-16 rounded-full object-cover"
                                                        />
                                                        <div>
                                                            <h3 className="font-semibold">{artist.name}</h3>
                                                            <p className="text-sm text-muted-foreground">
                                                                {artist.specialty} • {artist.location}
                                                            </p>
                                                            <p className="text-sm font-medium text-primary">
                                                                {artist.price} ريال عماني
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => openEditArtistDialog(artist)}
                                                        >
                                                            <Edit className="h-4 w-4 ml-1" />
                                                            تعديل
                                                        </Button>
                                                        <Button
                                                            variant="destructive"
                                                            size="sm"
                                                            onClick={() => setDeleteTarget({ type: 'artist', id: artist.id!, name: artist.name })}
                                                        >
                                                            <Trash2 className="h-4 w-4 ml-1" />
                                                            حذف
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Spaces Tab */}
                        <TabsContent value="spaces">
                            <Card>
                                <CardHeader>
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                        <div>
                                            <CardTitle>قائمة المساحات</CardTitle>
                                            <CardDescription>
                                                إدارة جميع المساحات المتاحة للإيجار ({filteredSpaces.length})
                                            </CardDescription>
                                        </div>
                                        <Button onClick={() => setIsAddingSpace(true)}>
                                            <Plus className="h-4 w-4 ml-2" />
                                            إضافة مساحة جديدة
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    {filteredSpaces.length === 0 ? (
                                        <div className="text-center py-12 text-muted-foreground">
                                            <Building2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                            <p>لا توجد مساحات</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {filteredSpaces.map((space) => (
                                                <div
                                                    key={space.id}
                                                    className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                                                >
                                                    <div>
                                                        <h3 className="font-semibold">{space.name}</h3>
                                                        <p className="text-sm text-muted-foreground">
                                                            {space.location}
                                                        </p>
                                                        <p className="text-sm font-medium text-primary">
                                                            {space.price} ريال عماني / يوم
                                                        </p>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => openEditSpaceDialog(space)}
                                                        >
                                                            <Edit className="h-4 w-4 ml-1" />
                                                            تعديل
                                                        </Button>
                                                        <Button
                                                            variant="destructive"
                                                            size="sm"
                                                            onClick={() => setDeleteTarget({ type: 'space', id: space.id!, name: space.name })}
                                                        >
                                                            <Trash2 className="h-4 w-4 ml-1" />
                                                            حذف
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Bookings Tab */}
                        <TabsContent value="bookings">
                            <Card>
                                <CardHeader>
                                    <CardTitle>قائمة الحجوزات</CardTitle>
                                    <CardDescription>
                                        عرض وإدارة جميع حجوزات الآرتست والمساحات
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-center py-12 text-muted-foreground">
                                        <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                        <p>سيتم إضافة إدارة الحجوزات قريباً</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </main>

            {/* Dialogs - Same as before */}
            {/* Add Artist Dialog */}
            <Dialog open={isAddingArtist} onOpenChange={setIsAddingArtist}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>إضافة ميكب آرتست جديد</DialogTitle>
                        <DialogDescription>
                            املأ البيانات التالية لإضافة ميكب آرتست جديد للمنصة
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="artist-name">الاسم *</Label>
                            <Input
                                id="artist-name"
                                value={artistForm.name}
                                onChange={(e) => setArtistForm({ ...artistForm, name: e.target.value })}
                                placeholder="اسم الآرتست"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="artist-specialty">التخصص *</Label>
                            <Input
                                id="artist-specialty"
                                value={artistForm.specialty}
                                onChange={(e) => setArtistForm({ ...artistForm, specialty: e.target.value })}
                                placeholder="مثال: ميكب عرائس، ميكب سهرات"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="artist-location">المنطقة *</Label>
                            <Select value={artistForm.location} onValueChange={(value) => setArtistForm({ ...artistForm, location: value })}>
                                <SelectTrigger>
                                    <SelectValue placeholder="اختر المنطقة" />
                                </SelectTrigger>
                                <SelectContent>
                                    {OMANI_GOVERNORATES.map((governorate) => (
                                        <SelectItem key={governorate} value={governorate}>{governorate}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="artist-price">السعر (ريال عماني) *</Label>
                            <Input
                                id="artist-price"
                                type="number"
                                value={artistForm.price}
                                onChange={(e) => setArtistForm({ ...artistForm, price: e.target.value })}
                                placeholder="50"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="artist-image">رابط الصورة</Label>
                            <Input
                                id="artist-image"
                                value={artistForm.image}
                                onChange={(e) => setArtistForm({ ...artistForm, image: e.target.value })}
                                placeholder="https://example.com/image.jpg"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="artist-bio">النبذة التعريفية</Label>
                            <Textarea
                                id="artist-bio"
                                value={artistForm.bio}
                                onChange={(e) => setArtistForm({ ...artistForm, bio: e.target.value })}
                                placeholder="نبذة عن الآرتست وخبراته"
                                rows={3}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="artist-services">الخدمات (مفصولة بفاصلة)</Label>
                            <Input
                                id="artist-services"
                                value={artistForm.services}
                                onChange={(e) => setArtistForm({ ...artistForm, services: e.target.value })}
                                placeholder="ميكب عرائس، ميكب سهرات، تصفيف شعر"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddingArtist(false)} disabled={submitting}>
                            إلغاء
                        </Button>
                        <Button onClick={handleAddArtist} disabled={submitting}>
                            {submitting && <Loader2 className="h-4 w-4 ml-2 animate-spin" />}
                            إضافة
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit Artist Dialog */}
            <Dialog open={isEditingArtist} onOpenChange={setIsEditingArtist}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>تعديل بيانات الآرتست</DialogTitle>
                        <DialogDescription>
                            قم بتعديل البيانات وحفظ التغييرات
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="edit-artist-name">الاسم *</Label>
                            <Input
                                id="edit-artist-name"
                                value={artistForm.name}
                                onChange={(e) => setArtistForm({ ...artistForm, name: e.target.value })}
                                placeholder="اسم الآرتست"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-artist-specialty">التخصص *</Label>
                            <Input
                                id="edit-artist-specialty"
                                value={artistForm.specialty}
                                onChange={(e) => setArtistForm({ ...artistForm, specialty: e.target.value })}
                                placeholder="مثال: ميكب عرائس، ميكب سهرات"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-artist-location">المنطقة *</Label>
                            <Select value={artistForm.location} onValueChange={(value) => setArtistForm({ ...artistForm, location: value })}>
                                <SelectTrigger>
                                    <SelectValue placeholder="اختر المنطقة" />
                                </SelectTrigger>
                                <SelectContent>
                                    {OMANI_GOVERNORATES.map((governorate) => (
                                        <SelectItem key={governorate} value={governorate}>{governorate}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-artist-price">السعر (ريال عماني) *</Label>
                            <Input
                                id="edit-artist-price"
                                type="number"
                                value={artistForm.price}
                                onChange={(e) => setArtistForm({ ...artistForm, price: e.target.value })}
                                placeholder="50"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-artist-image">رابط الصورة</Label>
                            <Input
                                id="edit-artist-image"
                                value={artistForm.image}
                                onChange={(e) => setArtistForm({ ...artistForm, image: e.target.value })}
                                placeholder="https://example.com/image.jpg"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-artist-bio">النبذة التعريفية</Label>
                            <Textarea
                                id="edit-artist-bio"
                                value={artistForm.bio}
                                onChange={(e) => setArtistForm({ ...artistForm, bio: e.target.value })}
                                placeholder="نبذة عن الآرتست وخبراته"
                                rows={3}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-artist-services">الخدمات (مفصولة بفاصلة)</Label>
                            <Input
                                id="edit-artist-services"
                                value={artistForm.services}
                                onChange={(e) => setArtistForm({ ...artistForm, services: e.target.value })}
                                placeholder="ميكب عرائس، ميكب سهرات، تصفيف شعر"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsEditingArtist(false)} disabled={submitting}>
                            إلغاء
                        </Button>
                        <Button onClick={handleEditArtist} disabled={submitting}>
                            {submitting && <Loader2 className="h-4 w-4 ml-2 animate-spin" />}
                            حفظ التغييرات
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Add Space Dialog */}
            <Dialog open={isAddingSpace} onOpenChange={setIsAddingSpace}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>إضافة مساحة جديدة</DialogTitle>
                        <DialogDescription>
                            املأ البيانات التالية لإضافة مساحة جديدة للإيجار
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="space-name">اسم المساحة *</Label>
                            <Input
                                id="space-name"
                                value={spaceForm.name}
                                onChange={(e) => setSpaceForm({ ...spaceForm, name: e.target.value })}
                                placeholder="استوديو الجمال"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="space-location">المنطقة *</Label>
                            <Select value={spaceForm.location} onValueChange={(value) => setSpaceForm({ ...spaceForm, location: value })}>
                                <SelectTrigger>
                                    <SelectValue placeholder="اختر المنطقة" />
                                </SelectTrigger>
                                <SelectContent>
                                    {OMANI_GOVERNORATES.map((governorate) => (
                                        <SelectItem key={governorate} value={governorate}>{governorate}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="space-price">السعر (ريال عماني / يوم) *</Label>
                            <Input
                                id="space-price"
                                type="number"
                                value={spaceForm.price}
                                onChange={(e) => setSpaceForm({ ...spaceForm, price: e.target.value })}
                                placeholder="20"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="space-description">الوصف *</Label>
                            <Textarea
                                id="space-description"
                                value={spaceForm.description}
                                onChange={(e) => setSpaceForm({ ...spaceForm, description: e.target.value })}
                                placeholder="وصف المساحة ومميزاتها"
                                rows={3}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="space-amenities">المرافق (مفصولة بفاصلة)</Label>
                            <Input
                                id="space-amenities"
                                value={spaceForm.amenities}
                                onChange={(e) => setSpaceForm({ ...spaceForm, amenities: e.target.value })}
                                placeholder="واي فاي، مكيف، إضاءة احترافية"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="space-images">روابط الصور (مفصولة بفاصلة)</Label>
                            <Input
                                id="space-images"
                                value={spaceForm.images}
                                onChange={(e) => setSpaceForm({ ...spaceForm, images: e.target.value })}
                                placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddingSpace(false)} disabled={submitting}>
                            إلغاء
                        </Button>
                        <Button onClick={handleAddSpace} disabled={submitting}>
                            {submitting && <Loader2 className="h-4 w-4 ml-2 animate-spin" />}
                            إضافة
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit Space Dialog */}
            <Dialog open={isEditingSpace} onOpenChange={setIsEditingSpace}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>تعديل بيانات المساحة</DialogTitle>
                        <DialogDescription>
                            قم بتعديل البيانات وحفظ التغييرات
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="edit-space-name">اسم المساحة *</Label>
                            <Input
                                id="edit-space-name"
                                value={spaceForm.name}
                                onChange={(e) => setSpaceForm({ ...spaceForm, name: e.target.value })}
                                placeholder="استوديو الجمال"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-space-location">المنطقة *</Label>
                            <Select value={spaceForm.location} onValueChange={(value) => setSpaceForm({ ...spaceForm, location: value })}>
                                <SelectTrigger>
                                    <SelectValue placeholder="اختر المنطقة" />
                                </SelectTrigger>
                                <SelectContent>
                                    {OMANI_GOVERNORATES.map((governorate) => (
                                        <SelectItem key={governorate} value={governorate}>{governorate}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-space-price">السعر (ريال عماني / يوم) *</Label>
                            <Input
                                id="edit-space-price"
                                type="number"
                                value={spaceForm.price}
                                onChange={(e) => setSpaceForm({ ...spaceForm, price: e.target.value })}
                                placeholder="20"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-space-description">الوصف *</Label>
                            <Textarea
                                id="edit-space-description"
                                value={spaceForm.description}
                                onChange={(e) => setSpaceForm({ ...spaceForm, description: e.target.value })}
                                placeholder="وصف المساحة ومميزاتها"
                                rows={3}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-space-amenities">المرافق (مفصولة بفاصلة)</Label>
                            <Input
                                id="edit-space-amenities"
                                value={spaceForm.amenities}
                                onChange={(e) => setSpaceForm({ ...spaceForm, amenities: e.target.value })}
                                placeholder="واي فاي، مكيف، إضاءة احترافية"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-space-images">روابط الصور (مفصولة بفاصلة)</Label>
                            <Input
                                id="edit-space-images"
                                value={spaceForm.images}
                                onChange={(e) => setSpaceForm({ ...spaceForm, images: e.target.value })}
                                placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsEditingSpace(false)} disabled={submitting}>
                            إلغاء
                        </Button>
                        <Button onClick={handleEditSpace} disabled={submitting}>
                            {submitting && <Loader2 className="h-4 w-4 ml-2 animate-spin" />}
                            حفظ التغييرات
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>هل أنت متأكد من الحذف؟</AlertDialogTitle>
                        <AlertDialogDescription>
                            سيتم حذف "{deleteTarget?.name}" بشكل نهائي ولا يمكن التراجع عن هذا الإجراء.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={submitting}>إلغاء</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} disabled={submitting} className="bg-destructive hover:bg-destructive/90">
                            {submitting && <Loader2 className="h-4 w-4 ml-2 animate-spin" />}
                            حذف
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default AdminDashboard;
