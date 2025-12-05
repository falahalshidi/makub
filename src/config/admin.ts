/**
 * Admin Configuration
 * هذا الملف يحتوي على بيانات تسجيل الدخول للمدير
 * تحذير: لا تشارك هذه البيانات مع أحد
 */

export const ADMIN_CONFIG = {
    // البريد الإلكتروني للمدير
    email: "admin1@beauty.com",
    // كلمة المرور للمدير
    password: "Admin009",
};

/**
 * التحقق من أن المستخدم هو المدير
 */
export const isAdminUser = (email: string): boolean => {
    return email === ADMIN_CONFIG.email;
};
