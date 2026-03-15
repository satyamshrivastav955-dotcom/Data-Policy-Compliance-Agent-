import { motion } from "framer-motion";

interface ChipProps {
  label: string;
  delay?: number;
  onClick?: () => void;
}

export const Chip = ({ label, delay = 0, onClick }: ChipProps) => (
  <motion.button
    type="button"
    onClick={onClick}
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.2 }}
    className="rounded-pill border border-border bg-bg-elevated px-2.5 py-1 text-[11px] text-text-secondary hover:border-teal hover:text-teal hover:bg-teal.bg transition-colors"
  >
    {label}
  </motion.button>
);

export default Chip;

