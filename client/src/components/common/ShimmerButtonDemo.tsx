import { t } from "i18next";
import ShimmerButton from "../ui/shimmer-button";

export function ShimmerButtonDemo({ onClick }) {
  return (
    <div className="z-10 flex items-center justify-center">
      <ShimmerButton className="shadow-2xl" onClick={onClick}>
        <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
          {t("booking")}
        </span>
      </ShimmerButton>
    </div>
  );
}
