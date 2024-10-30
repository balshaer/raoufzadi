import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Phone, ArrowRight, ArrowLeft, X } from "lucide-react";
import emailjs from "@emailjs/browser";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";

const timeSlots = Array.from({ length: 12 }, (_, i) => `${i + 9}:00`).concat(
  Array.from({ length: 12 }, (_, i) => `${i + 9}:30`),
);

const stepVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
};

export default function CustomBookingDialog({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    selectedDate: "",
    selectedTime: "",
    selectedService: "",
    name: "",
    email: "",
    phone: "",
  });
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const dir = i18n.language === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (step === 1 && !formData.selectedDate) return false;
    if (step === 2 && !formData.selectedTime) return false;
    if (step === 3) {
      const { name, email, phone } = formData;
      return name && email && phone; // Ensure all fields are filled
    }
    return true;
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      setErrorMessage(t("pleaseFillAllFields"));
      return;
    }

    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      await emailjs.send(
        "service_mvjqvvc",
        "template_1ryzr7b",
        {
          from_name: formData.name,
          to_name: "YourBusinessName",
          email: formData.email,
          phone: formData.phone,
          date: formData.selectedDate,
          time: formData.selectedTime,
          selected_service: formData.selectedService,
          selected_date: formData.selectedDate,
          selected_time: formData.selectedTime,
          to_email: formData.email,
          message: `Your appointment for ${formData.selectedService} is confirmed for ${formData.selectedDate} at ${formData.selectedTime}.`,
        },
        "RgYWnQ2yCygAfh1Up",
      );

      setSuccessMessage(t("appointmentConfirmed"));
      onClose();
    } catch (error) {
      console.error("Failed to send email:", error);
      setErrorMessage(t("failedToSendEmail"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (!validateForm()) {
      setErrorMessage(t("pleaseFillAllFields"));
      return;
    }
    setDirection(1);
    setStep((prevStep) => Math.min(prevStep + 1, 3));
  };

  const prevStep = () => {
    setDirection(-1);
    setStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#16161a] bg-opacity-50">
      <div
        dir={dir}
        className="flex h-[80vh] w-full max-w-[600px] flex-col rounded-lg bg-[var(--background)] text-[#fffffe] shadow-xl"
      >
        <div className="flex items-center justify-between border-b border-[#010101] p-6">
          <h2 className="text-3xl font-bold text-[#fffffe]">
            {t("bookYourAppointment")}
          </h2>
          <button
            onClick={onClose}
            className="text-[#94a1b2] hover:text-[#fffffe]"
          >
            <X size={24} />
          </button>
        </div>
        <form
          onSubmit={handleBooking}
          className="flex-grow overflow-hidden bg-transparent p-6"
        >
          <AnimatePresence custom={direction} mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                custom={direction}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="h-full w-full space-y-4 bg-transparent"
              >
                <label
                  htmlFor="date"
                  className="block text-lg font-medium text-[#fffffe]"
                >
                  {t("selectDate")}
                </label>
                <div className="relative mt-2">
                  <input
                    id="date"
                    type="date"
                    value={formData.selectedDate}
                    onChange={(e) =>
                      handleInputChange("selectedDate", e.target.value)
                    }
                    className="block w-full rounded-md border-[#010101] bg-[#242629] py-2 pl-10 pr-3 text-lg text-[#fffffe] shadow-sm focus:border-[#f3f4f6] focus:ring-[#f3f4f6]"
                  />
                </div>
              </motion.div>
            )}
            {step === 2 && (
              <motion.div
                key="step2"
                custom={direction}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="h-full w-full space-y-4 bg-transparent px-2"
              >
                <label
                  htmlFor="time"
                  className="block text-lg font-medium text-[#fffffe]"
                >
                  {t("selectTime")}
                </label>
                <div className="relative mt-2">
                  <select
                    id="time"
                    value={formData.selectedTime}
                    onChange={(e) =>
                      handleInputChange("selectedTime", e.target.value)
                    }
                    className="block w-full rounded-md border-[#010101] bg-[#242629] py-2 pl-10 pr-3 text-lg text-[#fffffe] shadow-sm focus:border-[#f3f4f6] focus:ring-[#f3f4f6]"
                  >
                    <option value="">{t("selectTimePlaceholder")}</option>
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </motion.div>
            )}
            {step === 3 && (
              <motion.div
                key="step3"
                custom={direction}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="h-full w-full space-y-6 overflow-y-auto bg-transparent px-2"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block text-lg font-medium text-[#fffffe]"
                  >
                    {t("yourName")}
                  </label>
                  <div className="relative mt-2">
                    <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#94a1b2]" />
                    <input
                      id="name"
                      type="text"
                      placeholder={t("yourNamePlaceholder")}
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      className="block w-full rounded-md border-[#010101] bg-[#242629] py-2 pl-10 pr-3 text-lg text-[#fffffe] shadow-sm focus:border-[#f3f4f6] focus:ring-[#f3f4f6]"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-lg font-medium text-[#fffffe]"
                  >
                    {t("yourEmail")}
                  </label>
                  <div className="relative mt-2">
                    <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#94a1b2]" />
                    <input
                      id="email"
                      type="email"
                      placeholder={t("yourEmailPlaceholder")}
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="block w-full rounded-md border-[#010101] bg-[#242629] py-2 pl-10 pr-3 text-lg text-[#fffffe] shadow-sm focus:border-[#f3f4f6] focus:ring-[#f3f4f6]"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-lg font-medium text-[#fffffe]"
                  >
                    {t("yourPhone")}
                  </label>
                  <div className="relative mt-2">
                    <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#94a1b2]" />
                    <input
                      id="phone"
                      type="tel"
                      placeholder={t("yourPhonePlaceholder")}
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      className="block w-full rounded-md border-[#010101] bg-[#242629] py-2 pl-10 pr-3 text-lg text-[#fffffe] shadow-sm focus:border-[#f3f4f6] focus:ring-[#f3f4f6]"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {errorMessage && <p className="mt-2 text-red-400">{errorMessage}</p>}
          {successMessage && (
            <p className="mt-2 text-green-500">{successMessage}</p>
          )}
          <div className="mt-4 flex justify-between">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="rounded-md border border-[#f3f4f6] px-4 py-2 text-[#f3f4f6] hover:bg-[#f3f4f6] hover:text-[#010101]"
              >
                <ArrowLeft className="mr-2 inline-block" />
                {t("back")}
              </button>
            )}
            {step < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="rounded-md border border-[#f3f4f6] px-4 py-2 text-[#f3f4f6] hover:bg-[#f3f4f6] hover:text-[#010101]"
              >
                {t("next")}
                <ArrowRight className="ml-2 inline-block" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className={`rounded-md border border-[#f3f4f6] px-4 py-2 text-[#f3f4f6] hover:bg-[#f3f4f6] hover:text-[#010101] ${
                  isSubmitting ? "cursor-not-allowed opacity-50" : ""
                }`}
              >
                {isSubmitting ? t("submitting") : t("confirm")}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
