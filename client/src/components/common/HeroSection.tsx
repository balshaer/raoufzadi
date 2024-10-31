import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import CustomBookingDialog from "./CustomBookingDialog";
import { ShimmerButtonDemo } from "./ShimmerButtonDemo";
import banner from "@/assets/banner.png";
import useMediaQuery from "@/hooks/useMediaQuery";
import i18n from "@/i18n";

export default function HeroSection() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const isMaxMd = useMediaQuery("(max-width: 768px)");

  const gap = useTransform(
    scrollYProgress,
    [0, 1],
    ["0px", isMaxMd ? "1000px" : "1500px"],
  );

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerChildren = {
    visible: { transition: { staggerChildren: 0.2 } },
  };
  const dir = i18n.language === "ar" ? "rtl" : "ltr";

  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);

  const handleBookClick = () => {
    setIsBookingDialogOpen(true);
  };

  return (
    <motion.section
      ref={ref}
      className="relative h-screen w-full overflow-hidden max-md:h-[90vh]"
    >
      <motion.div style={{ y, opacity }} className="absolute inset-0">
        <motion.div
          className="flex w-full items-start justify-center bg-[var(--background)] max-md:h-full"
          style={{ gap }} // Apply responsive gap here
        >
          <div className="flex h-full w-full items-center justify-center max-md:h-[80%] max-md:w-full">
            <img
              src={banner}
              alt="Barber shop background"
              className="h-[800px] w-[800px] object-contain max-md:h-full max-md:w-full"
            />
          </div>

          <div className="bannerimg flex h-full w-full items-center justify-center max-md:h-[80%] max-md:w-full">
            <img
              src={banner}
              alt="Barber shop background"
              className="h-[800px] w-[800px] object-contain max-md:h-full max-md:w-full"
            />
          </div>
        </motion.div>

        <motion.div
          className="absolute inset-0 bg-[var(--background)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1 }}
        />
      </motion.div>

      <div className="container relative z-10 flex h-full items-center justify-center px-4 text-center text-[var(--headline)] max-md:h-full">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
          className="max-w-4xl max-md:flex max-md:w-full max-md:max-w-full max-md:flex-col max-md:items-center max-md:justify-center"
        >
          <motion.h1
            variants={fadeInUp}
            className="mb-8 text-4xl font-bold leading-tight max-md:mb-2 sm:text-5xl md:text-6xl"
          >
            {t("about")}
          </motion.h1>
          <motion.p
            dir={dir}
            variants={fadeInUp}
            className="mb-6 max-w-2xl text-lg sm:text-xl md:text-2xl"
          >
            {t("about_description")}
          </motion.p>

          <motion.div className="block max-md:hidden" variants={fadeInUp}>
            <ShimmerButtonDemo onClick={handleBookClick} />
          </motion.div>

          <motion.div className="hidden max-md:block" variants={fadeInUp}>
            <button
              onClick={handleBookClick}
              className="inline-block rounded-full bg-[var(--button-background)] px-8 py-3 text-lg font-semibold text-white transition-colors hover:bg-primary/90"
            >
              {t("booking")}
            </button>
          </motion.div>
        </motion.div>
      </div>

      <CustomBookingDialog
        isOpen={isBookingDialogOpen}
        onClose={() => setIsBookingDialogOpen(false)}
      />
    </motion.section>
  );
}
