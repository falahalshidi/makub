/**
 * Oman Governorates and Wilayats Configuration
 * محافظات وولايات سلطنة عمان
 */

export const OMAN_GOVERNORATES = {
    muscat: {
        name: "محافظة مسقط",
        wilayats: [
            { value: "muscat-city", name: "مسقط" },
            { value: "muttrah", name: "مطرح" },
            { value: "bawshar", name: "بوشر" },
            { value: "seeb", name: "السيب" },
            { value: "amerat", name: "العامرات" },
            { value: "qurayyat", name: "قريات" },
        ]
    },
    dhofar: {
        name: "محافظة ظفار",
        wilayats: [
            { value: "salalah", name: "صلالة" },
            { value: "taqah", name: "طاقة" },
            { value: "mirbat", name: "مرباط" },
            { value: "sadah", name: "سدح" },
            { value: "rakhyut", name: "رخيوت" },
            { value: "thumrait", name: "ثمريت" },
            { value: "dalkut", name: "ضلكوت" },
            { value: "muqshin", name: "المزيونة" },
            { value: "shalim", name: "شليم وجزر الحلانيات" },
        ]
    },
    musandam: {
        name: "محافظة مسندم",
        wilayats: [
            { value: "khasab", name: "خصب" },
            { value: "bukha", name: "بخاء" },
            { value: "daba", name: "دبا" },
            { value: "madha", name: "مدحاء" },
        ]
    },
    buraimi: {
        name: "محافظة البريمي",
        wilayats: [
            { value: "buraimi-city", name: "البريمي" },
            { value: "mahadah", name: "محضة" },
            { value: "sunainah", name: "السنينة" },
        ]
    },
    dakhliyah: {
        name: "محافظة الداخلية",
        wilayats: [
            { value: "nizwa", name: "نزوى" },
            { value: "bahla", name: "بهلاء" },
            { value: "manah", name: "منح" },
            { value: "adam", name: "أدم" },
            { value: "hamra", name: "الحمراء" },
            { value: "izki", name: "إزكي" },
            { value: "samail", name: "سمائل" },
            { value: "bidiyah", name: "بدية" },
        ]
    },
    "north-batinah": {
        name: "محافظة شمال الباطنة",
        wilayats: [
            { value: "sohar", name: "صحار" },
            { value: "shinas", name: "شناص" },
            { value: "liwa", name: "لوى" },
            { value: "saham", name: "صحم" },
            { value: "khabourah", name: "الخابورة" },
            { value: "swayq", name: "السويق" },
        ]
    },
    "south-batinah": {
        name: "محافظة جنوب الباطنة",
        wilayats: [
            { value: "rustaq", name: "الرستاق" },
            { value: "awabi", name: "العوابي" },
            { value: "nakhal", name: "نخل" },
            { value: "wadi-maawil", name: "وادي المعاول" },
            { value: "barka", name: "بركاء" },
            { value: "musanaa", name: "المصنعة" },
        ]
    },
    "north-sharqiyah": {
        name: "محافظة شمال الشرقية",
        wilayats: [
            { value: "ibra", name: "إبراء" },
            { value: "mudhaibi", name: "المضيبي" },
            { value: "bidiyah-sharqiyah", name: "بدية" },
            { value: "qabil", name: "القابل" },
            { value: "wadi-bani-khalid", name: "وادي بني خالد" },
            { value: "dama-taeen", name: "دماء والطائيين" },
        ]
    },
    "south-sharqiyah": {
        name: "محافظة جنوب الشرقية",
        wilayats: [
            { value: "sur", name: "صور" },
            { value: "masirah", name: "مصيرة" },
            { value: "jaalan-bani-bu-ali", name: "جعلان بني بو علي" },
            { value: "jaalan-bani-bu-hassan", name: "جعلان بني بو حسن" },
            { value: "kamil-wafi", name: "الكامل والوافي" },
        ]
    },
    dhahirah: {
        name: "محافظة الظاهرة",
        wilayats: [
            { value: "ibri", name: "عبري" },
            { value: "yanqul", name: "ينقل" },
            { value: "dhank", name: "ضنك" },
        ]
    },
    wusta: {
        name: "محافظة الوسطى",
        wilayats: [
            { value: "haima", name: "هيما" },
            { value: "mahout", name: "محوت" },
            { value: "duqm", name: "الدقم" },
            { value: "jazer", name: "الجازر" },
        ]
    },
};

export type GovernorateKey = keyof typeof OMAN_GOVERNORATES;
