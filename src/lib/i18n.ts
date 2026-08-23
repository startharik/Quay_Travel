export const translations: Record<string, string> = {
  APP_NAME: "كواي",
  DESCRIPTION: "انشر رحلة. وكالات السفر تقدم عروضًا.",
  HOW_IT_WORKS: "كيف يعمل",
  MARKETPLACE: "السوق",
  DESK: "لوحة التحكم",
  NEW_REQUEST: "طلب جديد",
  INBOX: "البريد الوارد",
  AGENCIES: "الوكالات",
  PROFILE: "الملف الشخصي",
  SIGN_IN: "تسجيل الدخول",
  SIGN_IN_TO_DESK: "تسجيل الدخول إلى لوحة التحكم",
  SIGN_IN_DISABLED: "تم تعطيل تسجيل الدخول.",
  OR_EMAIL: "أو عبر البريد الإلكتروني",
  NAME: "الاسم",
  EMAIL: "البريد الإلكتروني",
  PASSWORD: "كلمة المرور",
  CREATE_ACCOUNT: "إنشاء حساب",
  SIGN_IN_WITH_EMAIL: "تسجيل الدخول بالبريد الإلكتروني",
  ALREADY_HAVE_ACCOUNT: "هل لديك حساب؟ تسجيل الدخول",
  NEW_HERE_CREATE_ACCOUNT: "جديد هنا؟ إنشاء حساب",
  HOW_QUAY_WORKS: "كيف يعمل كواي",
  TRAVELERS_POST: "يقوم المسافرون بنشر طلبات السفر. تقدم الوكالات عروضًا.",
};

export function t(key: string): string {
  return translations[key] ?? key;
}

export default t;
