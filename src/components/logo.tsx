import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      to="/"
      onClick={onClick}
      className={cn(
        "group flex items-center gap-2.5 text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest",
        className,
      )}
      aria-label="Avenya"
    >
      <img
        src="/brand/avenya-mark.png"
        alt=""
        width={148}
        height={65}
        className="h-9 w-auto"
      />
      <span className="font-display text-2xl font-medium tracking-tight text-forest leading-none">
        Avenya
      </span>
    </Link>
  );
}
