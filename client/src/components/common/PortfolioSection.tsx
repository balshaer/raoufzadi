import i18n from "@/i18n";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function PortfolioSection({ fadeIn }: { fadeIn: any }) {
  const { t } = useTranslation();

  const scaleOnHover = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };
  const direction = i18n.language === "ar" ? "rtl" : "ltr";

  const portfolioItems = [
    {
      id: 1,
      title: t("ClassicFade"),
      description: t("ClassicFadeDescription"),
    },
    {
      id: 2,
      title: t("Undercut"),
      description: t("UndercutDescription"),
    },
    {
      id: 3,
      title: t("TexturedCrop"),
      description: t("TexturedCropDescription"),
    },
    {
      id: 4,
      title: t("BeardSculpting"),
      description: t("BeardSculptingDescription"),
    },
    {
      id: 5,
      title: t("LongHairStyling"),
      description: t("LongHairStylingDescription"),
    },
    {
      id: 6,
      title: t("ChildrensHaircuts"),
      description: t("ChildrensHaircutsDescription"),
    },
  ];

  return (
    <motion.section
      id="portfolio"
      className="mb-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeIn}
      dir={direction}
    >
      {/* <h3 className="mb-8 text-center text-3xl font-bold text-[var(--headline)]">
        {t("Portfolio")} 
      </h3> */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {portfolioItems.map((item) => (
          <motion.div
            key={item.id}
            variants={scaleOnHover}
            whileHover="hover"
            className="rounded-lg bg-[var(--card-background)] p-4 shadow-lg"
          >
            <h4 className="text-xl font-semibold">{item.title}</h4>
            <p className="mt-2 text-gray-600">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
