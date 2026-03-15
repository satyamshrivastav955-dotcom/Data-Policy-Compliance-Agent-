import { clsx } from "clsx";

interface LiveDotProps {
  active?: boolean;
}

export const LiveDot = ({ active = true }: LiveDotProps) => {
  return (
    <span
      className={clsx(
        "h-2.5 w-2.5 rounded-full",
        active ? "bg-teal animate-liveDot" : "bg-border"
      )}
    />
  );
};

export default LiveDot;

