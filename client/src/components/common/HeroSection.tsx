import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import CustomBookingDialog from "./CustomBookingDialog";
import { ShimmerButtonDemo } from "./ShimmerButtonDemo";

import hero from "@/assets/hero.jpg";

export default function HeroSection() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerChildren = {
    visible: { transition: { staggerChildren: 0.2 } },
  };

  const styles = {
    link: "inline-block  rounded-full bg-primary px-8 py-3 text-lg font-semibold text-white transition-colors hover:bg-primary/90",
  };

  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);

  const handleBookClick = () => {
    setIsBookingDialogOpen(true);
  };

  return (
    <motion.section
      ref={ref}
      className="relative h-screen w-full overflow-hidden"
    >
      <motion.div style={{ y, opacity }} className="absolute inset-0">
        <img
          src={hero}
          alt="Barber shop background"
          className="h-full w-full object-cover"
        />
        <motion.div
          className="absolute inset-0 bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1 }}
        />
      </motion.div>

      <div className="container relative z-10 flex h-full items-center justify-center px-4 text-center text-[var(--headline)]">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
          className="max-w-4xl"
        >
          <motion.h1
            variants={fadeInUp}
            className="mb-8 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl"
          >
            {t("about")}
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="mb-6 max-w-2xl text-lg sm:text-xl md:text-2xl"
          >
            {t("about_description")}
          </motion.p>

          <motion.div className="block max-md:hidden" variants={fadeInUp}>
            <ShimmerButtonDemo onClick={handleBookClick} />
          </motion.div>

          <motion.div className="hidden max-md:block" variants={fadeInUp}>
            <button onClick={handleBookClick} className={styles.link}>
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
