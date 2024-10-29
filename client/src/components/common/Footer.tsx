import { Instagram, Facebook, MessageCircle, Phone } from "lucide-react";
import Logo from "../ui/Logo";
import { t } from "i18next";

export default function Footer() {
  const whatsappNumber = "+213557195508";
  const telegramNumber = "+213557195508";

  return (
    <footer className="border-t border-gray-600 bg-[var(--footer-background)] p-8 text-center transition-colors duration-300">
      <div className="mb-4 flex flex-col items-center">
        <div className="mb-4">
          <Logo />
        </div>
        <div className="my-4 flex justify-center space-x-6">
          <a
            href="https://www.facebook.com/raouf.zahdi?mibextid=LQQJ4d"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--footer-text)] transition-colors hover:text-[var(--link-hover)]"
          >
            <Facebook className="h-6 w-6" />
          </a>
          <a
            href="https://www.instagram.com/raouf__zahdi?igsh=MWJoczZoemxtYW13OA%3D%3D&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--footer-text)] transition-colors hover:text-[var(--link-hover)]"
          >
            <Instagram className="h-6 w-6" />
          </a>
          <a
            href={`https://wa.me/${whatsappNumber}`}
            className="text-[var(--footer-text)] transition-colors hover:text-[var(--link-hover)]"
          >
            <MessageCircle className="h-6 w-6" />
          </a>
          <a
            href={`https://telegram.me/${telegramNumber.replace("+", "")}`}
            className="text-[var(--footer-text)] transition-colors hover:text-[var(--link-hover)]"
          >
            <Phone className="h-6 w-6" />
          </a>
        </div>
      </div>
      <p className="text-[var(--footer-text)]">
        &copy; {new Date().getFullYear()} {t("footerText")}
      </p>
    </footer>
  );
}
