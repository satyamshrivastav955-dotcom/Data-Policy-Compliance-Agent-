import { motion } from "framer-motion";
import type { ThinkingStep as ThinkingStepType } from "@/types";

interface ThinkingStepProps {
  step: ThinkingStepType;
  index: number;
}

export const ThinkingStep = ({ step, index }: ThinkingStepProps) => {
  const icon =
    step.status === "done" ? "✓" : step.status === "running" ? "›" : "•";

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.18 }}
      className="flex items-center gap-1.5 text-[11px] text-text-muted"
    >
      <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-bg-elevated text-[10px]">
        {icon}
      </span>
      <span>{step.label}</span>
    </motion.div>
  );
};

export default ThinkingStep;

