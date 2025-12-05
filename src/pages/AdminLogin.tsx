import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Shield, Lock, Loader2, Mail } from "lucide-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { ADMIN_CONFIG, isAdminUser } from "@/config/admin";

const AdminLogin = () => {
    const { toast } = useToast();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        // التحقق من البريد الإلكتروني أولاً
        if (!isAdminUser(email)) {
            toast({
                title: "غير مصرح",
                description: "ليس لديك صلاحيات الوصول لهذه الصفحة",
                variant: "destructive",
            });
            return;
        }

        try {
            setLoading(true);

            // محاولة تسجيل الدخول
            await signInWithEmailAndPassword(auth, email, password);

            toast({
                title: "مرحباً",
                description: "تم تسجيل الدخول بنجاح",
            });

            // الانتقال إلى لوحة الإدارة
            navigate("/admin");
        } catch (error: any) {
            console.error("Login error:", error);

            let errorMessage = "حدث خطأ أثناء تسجيل الدخول";

            if (error.code === "auth/invalid-credential" || error.code === "auth/wrong-password") {
                errorMessage = "البريد الإلكتروني أو كلمة المرور غير صحيحة";
            } else if (error.code === "auth/user-not-found") {
                errorMessage = "هذا الحساب غير موجود";
            } else if (error.code === "auth/too-many-requests") {
                errorMessage = "تم تجاوز عدد المحاولات المسموحة. يرجى المحاولة لاحقاً";
            }

            toast({
                title: "خطأ في تسجيل الدخول",
                description: errorMessage,
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-3 text-center">
                    <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <Shield className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">لوحة تحكم الإدارة</CardTitle>
                    <CardDescription>
                        قم بتسجيل الدخول للوصول إلى لوحة التحكم
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">البريد الإلكتروني</Label>
                            <div className="relative">
                                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="admin@makub-beauty.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    disabled={loading}
                                    className="pr-10"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">كلمة المرور</Label>
                            <div className="relative">
                                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    disabled={loading}
                                    className="pr-10"
                                />
                            </div>
                        </div>
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2 className="h-4 w-4 ml-2 animate-spin" />
                                    جاري تسجيل الدخول...
                                </>
                            ) : (
                                <>
                                    <Shield className="h-4 w-4 ml-2" />
                                    تسجيل الدخول
                                </>
                            )}
                        </Button>
                    </form>
                    <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                        <p className="text-xs text-muted-foreground text-center">
                            <Lock className="h-3 w-3 inline ml-1" />
                            هذه الصفحة محمية ومخصصة للإدارة فقط
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminLogin;
