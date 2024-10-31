/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import Logo from "../ui/Logo";
import Dialog from "./Dialog";
import CustomBookingDialog from "./CustomBookingDialog";
import SelectLanguage from "./SelectLanguage";
import { headerAnimation, mobileMenuAnimation } from "@/utils/animations";

import About from "@/assets/About.jpg";

export default function Header() {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAboutDialogOpen, setIsAboutDialogOpen] = useState(false);
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [currentLanguage, setCurrentLanguage] = React.useState<string>(() => {
    return localStorage.getItem("selectedLanguage") || "en";
  });

  useEffect(() => {
    const updateIsMobile = () => setIsMobile(window.innerWidth <= 768);
    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);
    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleAboutClick = () => {
    setIsMenuOpen(false);
    setIsAboutDialogOpen(true);
  };

  const handleBookClick = () => {
    setIsMenuOpen(false);
    setIsBookingDialogOpen(true);
  };

  return (
    <motion.header
      className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--nav)] py-4 shadow-sm"
      {...headerAnimation}
    >
      <nav className="container mx-auto flex items-center justify-between px-4">
        <Logo />
        <div className="hidden items-center space-x-6 md:flex">
          <a
            href="#services"
            className="text-[var(--paragraph)] hover:text-[var(--link-hover)]"
          >
            {t("services")}
          </a>

          <button
            onClick={handleAboutClick}
            className="text-[var(--paragraph)] hover:text-[var(--link-hover)]"
          >
            {t("About")}
          </button>
          <button
            onClick={handleBookClick}
            className="text-[var(--paragraph)] hover:text-[var(--link-hover)]"
          >
            {t("Booking")}
          </button>

          <a
            href="#contact"
            className="text-[var(--paragraph)] hover:text-[var(--link-hover)]"
          >
            {t("contact")}
          </a>

          <SelectLanguage
            currentLanguage={currentLanguage}
            onChange={setCurrentLanguage}
          />
        </div>

        <button
          onClick={toggleMenu}
          className="text-[var(--menu-color)] hover:text-[var(--link-hover)] md:hidden"
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[var(--background)]"
            {...mobileMenuAnimation}
          >
            <button
              onClick={toggleMenu}
              className="absolute right-4 top-4 text-[var(--menu-color)] hover:text-[var(--link-hover)]"
              aria-label="Close Menu"
            >
              <HiX size={24} />
            </button>
            <div className="flex flex-col items-center space-y-6">
              <a
                href="#services"
                className="text-xl text-[var(--paragraph)] hover:text-[var(--link-hover)]"
                onClick={toggleMenu}
              >
                {t("services")}
              </a>
              <button
                className="text-xl text-[var(--paragraph)] hover:text-[var(--link-hover)]"
                onClick={handleBookClick}
              >
                {t("Booking")}
              </button>
              <button
                className="text-xl text-[var(--paragraph)] hover:text-[var(--link-hover)]"
                onClick={handleAboutClick}
              >
                {t("About")}
              </button>
              <a
                href="#contact"
                className="text-xl text-[var(--paragraph)] hover:text-[var(--link-hover)]"
                onClick={toggleMenu}
              >
                {t("contact")}
              </a>

              <SelectLanguage
                currentLanguage={i18n.language}
                onChange={changeLanguage}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Dialog
        isOpen={isAboutDialogOpen}
        onClose={() => setIsAboutDialogOpen(false)}
      >
        <img
          src={About}
          alt="Raouf Zadi"
          className="mx-auto mb-4 h-40 w-40 rounded-full object-cover"
        />
        <h3 className="mb-2 text-center text-xl font-semibold text-[var(--card-headline)]">
          {t("name")}
        </h3>
        <p className="text-center leading-7 text-[var(--card-paragraph)]">
          {t("about_description_full")}
        </p>
      </Dialog>

      <CustomBookingDialog
        isOpen={isBookingDialogOpen}
        onClose={() => setIsBookingDialogOpen(false)}
      />
    </motion.header>
  );
}
