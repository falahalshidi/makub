import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { isAdminUser } from "@/config/admin";

interface AdminProtectedRouteProps {
    children: React.ReactNode;
}

/**
 * مكون حماية خاص بلوحة الإدارة
 * يتحقق من أن المستخدم مسجل دخول وأنه المدير
 */
const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({ children }) => {
    const { currentUser, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5">
                <div className="text-center space-y-4">
                    <div className="h-12 w-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto" />
                    <p className="text-muted-foreground">جاري التحميل...</p>
                </div>
            </div>
        );
    }

    // التحقق من تسجيل الدخول
    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    // التحقق من أن المستخدم هو المدير
    if (!isAdminUser(currentUser.email || "")) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

export default AdminProtectedRoute;
