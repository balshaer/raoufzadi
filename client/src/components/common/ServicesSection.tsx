import { motion, useScroll, useTransform } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Scissors, GraduationCap, Brush } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function ServicesSection() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const { t } = useTranslation(); // Use the translation hook

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <motion.section
      id="services"
      className="relative overflow-hidden py-20"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--paragraph)",
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <div className="h-full w-full" style={{ opacity: 0.1 }} />
      </motion.div>
      <div className="container relative z-10">
        <motion.h2
          className="mb-12 text-center text-4xl font-bold"
          style={{ color: "var(--headline)" }}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t("OurServices")} 
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 gap-8 md:grid-cols-3"
          variants={containerVariants}
        >
          <ServiceCard
            icon={Scissors}
            title={t("ExpertHaircuts")}
            description={t("ExpertHaircutsDescription")}
            variants={itemVariants}
          />
          <ServiceCard
            icon={GraduationCap}
            title={t("BarberingEducation")}
            description={t("BarberingEducationDescription")}
            variants={itemVariants}
          />
          <ServiceCard
            icon={Brush}
            title={t("ProfessionalStyling")}
            description={t("ProfessionalStylingDescription")}
            variants={itemVariants}
          />
        </motion.div>
      </div>
    </motion.section>
  );
}

function ServiceCard({ icon: Icon, title, description, variants }) {
  return (
    <motion.div variants={variants}>
      <Card
        className="h-60 transition-all duration-300 hover:shadow-lg"
        style={{ backgroundColor: "var(--card-background)" }}
      >
        <CardContent className="flex flex-col items-center p-6">
          <Icon className="mb-4 h-12 w-12" style={{ color: "var(--button)" }} />
          <h3
            className="mb-2 text-xl font-bold"
            style={{ color: "var(--card-headline)" }}
          >
            {title}
          </h3>
          <p className="text-center" style={{ color: "var(--card-paragraph)" }}>
            {description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
