import i18n from "@/i18n";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Skeleton } from "../ui/skeleton";

const MapComponent = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);

  const handleMapLoad = () => {
    setLoading(false);
  };

  setTimeout(() => {
    setLoading(false);
  }, 5000);

  const direction = i18n.language === "ar" ? "rtl" : "ltr";

  return (
    <div
      dir={direction}
      className="flex h-full w-full items-center justify-center border-2 border-[var(--horder-color)]"
    >
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3207.092399342127!2d5.884507999999999!3d36.503631600000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12f252893e06db0b%3A0xc0a8c1bb8077a9e6!2z2KrYs9iv2KfZhiDYrdiv2KfYr9ip2Iwg2KfZhNis2LLYp9im2LE!5e0!3m2!1sar!2s!4v1730193003165!5m2!1sar!2s"
        width="100%"
        height="600"
        style={{ border: 0, display: loading ? "none" : "block" }}
        allowFullScreen={false}
        loading="lazy"
        className="m-0 p-0"
        referrerPolicy="no-referrer-when-downgrade"
        onLoad={handleMapLoad}
      ></iframe>

      {loading && (
        <Skeleton className="flex h-[600px] w-full items-center flex-col-reverse gap-3 justify-center">
          <p className="text-sm">{t("loading")}</p>
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500"></div>
        </Skeleton>
      )}
    </div>
  );
};

export default MapComponent;
