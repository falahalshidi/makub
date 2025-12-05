import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Mail, Lock, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInUser } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { isAdminUser } from "@/config/admin";

const Login = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await signInUser(email, password);

            // التحقق من أن المستخدم هو المدير
            if (isAdminUser(email)) {
                toast({
                    title: "مرحباً بك في لوحة الإدارة! 👑",
                    description: "تم تسجيل الدخول كمدير",
                });
                navigate("/admin");
            } else {
                toast({
                    title: "تم تسجيل الدخول بنجاح! 🎉",
                    description: "مرحباً بعودتك",
                });
                navigate("/profile");
            }
        } catch (error: any) {
            toast({
                title: "خطأ في تسجيل الدخول",
                description: error.message,
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            <div className="w-full max-w-md relative z-10">
                {/* Logo and Header */}
                <div className="text-center mb-8 space-y-2">
                    <Link to="/" className="inline-flex items-center gap-2 group">
                        <Sparkles className="h-10 w-10 text-primary group-hover:rotate-12 transition-transform" />
                        <span className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                            بوتيك الجمال
                        </span>
                    </Link>
                    <p className="text-muted-foreground text-sm">
                        مرحباً بعودتك! سجل دخولك للمتابعة
                    </p>
                </div>

                {/* Login Card */}
                <Card className="border-2 shadow-2xl backdrop-blur-sm bg-card/95">
                    <CardHeader className="space-y-1 pb-4">
                        <CardTitle className="text-2xl text-center font-bold">تسجيل الدخول</CardTitle>
                        <CardDescription className="text-center">
                            أدخل بياناتك للوصول إلى حسابك
                        </CardDescription>
                    </CardHeader>

                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4">
                            {/* Email Field */}
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-right block">
                                    البريد الإلكتروني
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="example@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="pl-10 h-11"
                                        required
                                        dir="ltr"
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password" className="text-right">
                                        كلمة المرور
                                    </Label>
                                    <a href="#" className="text-xs text-primary hover:underline">
                                        نسيت كلمة المرور؟
                                    </a>
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="pl-10 h-11"
                                        required
                                        dir="ltr"
                                    />
                                </div>
                            </div>

                            {/* Remember Me */}
                            <div className="flex items-center justify-end space-x-2 space-x-reverse">
                                <label htmlFor="remember" className="text-sm cursor-pointer select-none">
                                    تذكرني
                                </label>
                                <input
                                    id="remember"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                                />
                            </div>
                        </CardContent>

                        <CardFooter className="flex flex-col gap-4">
                            {/* Login Button */}
                            <Button
                                type="submit"
                                className="w-full h-11 text-base group"
                                variant="hero"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <span className="flex items-center gap-2">
                                        <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        جاري التحميل...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        تسجيل الدخول
                                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                )}
                            </Button>

                            {/* Divider */}
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-card px-2 text-muted-foreground">أو</span>
                                </div>
                            </div>

                            {/* Sign Up Link */}
                            <div className="text-center text-sm">
                                <span className="text-muted-foreground">ليس لديك حساب؟ </span>
                                <Link to="/register" className="text-primary hover:underline font-medium">
                                    إنشاء حساب جديد
                                </Link>
                            </div>

                            {/* Back to Home */}
                            <Link
                                to="/"
                                className="text-center text-sm text-muted-foreground hover:text-primary transition-colors"
                            >
                                ← العودة إلى الصفحة الرئيسية
                            </Link>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default Login;
