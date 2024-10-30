import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import emailjs from "emailjs-com";
import contact from "@/assets/contact.jpg";
import { toast } from "sonner";
import i18n from "@/i18n";

export default function ContactSection({ fadeIn }: { fadeIn: any }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: "", email: "", message: "" };

    if (!formData.name.trim()) {
      toast.error(t("nameRequired"));
      isValid = false;
    }

    if (!formData.email.trim()) {
      toast.error(t("emailRequired"));
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error(t("emailInvalid"));
      isValid = false;
    }

    if (!formData.message.trim()) {
      toast.error(t("messageRequired"));
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      await emailjs.send(
        "service_mvjqvvc",
        "template_syybtxc",
        formData,
        "RgYWnQ2yCygAfh1Up",
      );
      toast.success(t("messageSent"));
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error(t("messageFailed"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const direction = i18n.language === "ar" ? "rtl" : "ltr";

  return (
    <motion.section
      className="section flex items-center justify-center gap-3 max-md:flex-col"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeIn}
    >
      <div
        dir={direction}
        className="flex h-full w-1/2 flex-col items-start justify-start max-md:w-full max-md:items-center"
      >
        <h3 className="mb-8 text-center text-3xl font-bold text-[var(--headline)]">
          {t("contact")}
        </h3>
        <form dir={direction} onSubmit={handleSubmit} className="form">
          <div>
            <Input
              name="name"
              placeholder={t("yourName")}
              value={formData.name}
              onChange={handleChange}
              className="border-[var(--input-border)] bg-[var(--input-background)] text-[var(--input-text)]"
              aria-invalid={errors.name ? "true" : "false"}
              aria-describedby="name-error"
            />
            {errors.name && (
              <p id="name-error" className="mt-1 text-sm text-red-500">
                {errors.name}
              </p>
            )}
          </div>
          <div>
            <Input
              name="email"
              type="email"
              placeholder={t("email")}
              value={formData.email}
              onChange={handleChange}
              className="border-[var(--input-border)] bg-[var(--input-background)] text-[var(--input-text)]"
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby="email-error"
            />
            {errors.email && (
              <p id="email-error" className="mt-1 text-sm text-red-500">
                {errors.email}
              </p>
            )}
          </div>
          <div>
            <Textarea
              name="message"
              placeholder={t("message")}
              value={formData.message}
              onChange={handleChange}
              className="min-h-40 border-[var(--input-border)] bg-[var(--input-background)] text-[var(--input-text)]"
              aria-invalid={errors.message ? "true" : "false"}
              aria-describedby="message-error"
            />
            {errors.message && (
              <p id="message-error" className="mt-1 text-sm text-red-500">
                {errors.message}
              </p>
            )}
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? t("sending...") : t("submit")}
          </Button>
        </form>
      </div>

      <div className="h-full w-1/2 max-md:hidden">
        <img
          src={contact}
          alt="raouf"
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
    </motion.section>
  );
}
