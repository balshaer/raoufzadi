import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Logo() {
  return (
    <Link to={"/"}>
      <div className="flex cursor-pointer select-none items-center justify-start gap-2">
        <motion.img
          src="../../../app/images/LOGO.svg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
          className="h-10 font-bold text-[var(--headline)]"
        />
      </div>
    </Link>
  );
}
