import i18n from "@/i18n";
import { useTranslation } from "react-i18next";

export default function NotFoundPage() {
  const { t } = useTranslation();
  const direction = i18n.language === "ar" ? "rtl" : "ltr";

  return (
    <div dir={direction} className="h-full w-full bg-[var(--background)]">
      <div className="container flex h-max min-h-[100vh] flex-col gap-6">
        <div>
          <div className="grid h-screen place-content-center px-4">
            <div className="text-center">
              <h1 className="mt-6 text-2xl font-bold tracking-tight text-[var(--headline)] sm:text-4xl">
              404  {t("notFound.title")}
              </h1>
              <p className="mt-4 text-[var(--paragraph)]">
                {t("notFound.message")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
