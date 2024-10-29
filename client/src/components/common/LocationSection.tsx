import i18n from "@/i18n";
import { Button } from "../ui/button";
import MapComponent from "./MapComponent";
import { useTranslation } from "react-i18next";
import { MapPinIcon } from "lucide-react";
import { motion } from "framer-motion";

const LocationSection = () => {
  const { t } = useTranslation();
  const direction = i18n.language === "ar" ? "rtl" : "ltr";

  const animationVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const renderHeader = () => (
    <header className="flex flex-col items-center justify-center text-center">
      <motion.h1
        className="section-title pb-2"
        initial="hidden"
        animate="visible"
        variants={animationVariants}
        transition={{ duration: 0.5 }}
      >
        {t("Location")}
      </motion.h1>
      <div
        dir={direction}
        className="flex items-center justify-center gap-1 pb-6"
      >
        <MapPinIcon className="h-full w-4" />
        <p className="section-subtitle m-0 p-0">{t("LocationSubtitle")}</p>
      </div>
    </header>
  );

  const renderMap = () => (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={animationVariants}
      transition={{ duration: 0.5 }}
    >
      <MapComponent />
    </motion.div>
  );

  const renderAddressSection = () => (
    <div
      dir={direction}
      className="flex w-1/2 flex-col items-center justify-start gap-3 text-center max-md:w-full"
    >
      <h1 className="section-title pb-2 max-md:text-xl">{t("Address")}</h1>
      <ul className="flex flex-col items-center justify-center gap-3">
        <li className="flex gap-2">{t("AddressLine1")}</li>
        <li className="flex gap-2">{t("AddressLine2")}</li>
        <li className="flex gap-2">{t("AddressPhone")}</li>
        <a
          href="https://maps.app.goo.gl/uhgPQ7dn2V9yieA56"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="mt-2">
            <span>{t("OpenMap")}</span>
          </Button>
        </a>
      </ul>
    </div>
  );

  const renderHoursSection = () => (
    <div
      dir={direction}
      className="flex w-1/2 flex-col items-center justify-center gap-3 text-center max-md:w-full"
    >
      <h1 className="section-title pb-2 max-md:text-xl">{t("Hours")}</h1>
      <ul className="flex flex-col items-center justify-center gap-3">
        <li className="flex gap-2">
          <span className="text-[var(--headline)]">{t("Monday")}</span>
          <span>{t("Closed")}</span>
        </li>
        <li className="flex gap-2">
          <span className="text-[var(--headline)]">{t("Tuesday")}</span>
          <span>{t("TuesdayHours")}</span>
        </li>
        <li className="flex gap-2">
          <span className="text-[var(--headline)]">{t("Wednesday")}</span>
          <span>{t("WednesdayHours")}</span>
        </li>
        <li className="flex gap-2">
          <span className="text-[var(--headline)]">{t("Thursday")}</span>
          <span>{t("ThursdayHours")}</span>
        </li>
        <li className="flex gap-2">
          <span className="text-[var(--headline)]">{t("Friday")}</span>
          <span>{t("FridayHours")}</span>
        </li>
        <li className="flex gap-2">
          <span className="text-[var(--headline)]">{t("Saturday")}</span>
          <span>{t("SaturdayHours")}</span>
        </li>
        <li className="flex gap-2">
          <span className="text-[var(--headline)]">{t("Sunday")}</span>
          <span>{t("Closed")}</span>
        </li>
      </ul>
    </div>
  );

  return (
    <section className="section">
      {renderHeader()}
      {renderMap()}
      <div className="container flex w-full items-start justify-between max-md:py-10 py-20 max-md:flex-col max-md:gap-5">
        {renderAddressSection()}
        {renderHoursSection()}
      </div>
    </section>
  );
};

export default LocationSection;
