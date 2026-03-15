import { clsx } from "clsx";
import type { Severity } from "@/types";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "critical" | "high" | "medium" | "info" | "outline";
  severity?: Severity;
  className?: string;
}

const severityToVariant = (severity?: Severity): BadgeProps["variant"] => {
  if (!severity) return "default";
  switch (severity) {
    case "CRITICAL":
      return "critical";
    case "HIGH":
      return "high";
    case "MEDIUM":
      return "medium";
    default:
      return "info";
  }
};

export const Badge = ({
  children,
  variant = "default",
  severity,
  className,
}: BadgeProps) => {
  const v = severityToVariant(severity) ?? variant;

  const base =
    "inline-flex items-center rounded-pill px-2.5 py-0.5 text-[11px] font-medium border";
  const styles: Record<string, string> = {
    default:
      "border-border bg-bg-elevated text-text-secondary",
    outline:
      "border-border text-text-secondary bg-transparent",
    critical:
      "border-red/40 bg-red/10 text-red-light",
    high:
      "border-amber/40 bg-amber/10 text-amber",
    medium:
      "border-teal.bg bg-teal.bg text-teal-light",
    info:
      "border-blue/40 bg-blue/10 text-blue",
  };

  return (
    <span className={clsx(base, styles[v], className)}>
      {children}
    </span>
  );
};

export default Badge;

