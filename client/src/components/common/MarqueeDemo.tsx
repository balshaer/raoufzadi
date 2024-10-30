import { cn } from "@/lib/utils";
import Marquee from "../ui/marquee";

const reviews = [
  {
    img: "../../../app/images/1.jpg",
  },
  {
    img: "../../../app/images/2.jpg",
  },
  {
    img: "../../../app/images/3.jpg",
  },
  {
    img: "../../../app/images/4.jpg",
  },
  {
    img: "../../../app/images/5.jpg",
  },
  {
    img: "../../../app/images/6.jpg",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({ img }: { img: string }) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        "h-[500px] w-[500px] border-gray-950/[.1] bg-gray-950/[.01] object-cover hover:bg-gray-950/[.05]",
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <img
        className="h-full w-full object-cover"
        loading="lazy"
        alt="Review"
        src={img}
      />
    </figure>
  );
};

export function MarqueeDemo() {
  return (
    <div className="section relative flex h-max w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-[var(--background)]">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review, index) => (
          <ReviewCard key={index} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review, index) => (
          <ReviewCard key={index} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l"></div>
    </div>
  );
}
