import { useLocation, useNavigate } from "react-router-dom";
import { Play, Square, Upload as UploadIcon } from "lucide-react";
import { useViolationStore } from "@/store/violationStore";
import { LiveDot } from "./ui/LiveDot";

const routeTitleMap: Record<string, string> = {
  "/": "Dashboard",
  "/upload": "Upload Policy",
  "/rules": "Rule Viewer",
  "/violations": "Violations Monitor",
  "/conflicts": "Conflict Detector",
  "/reports": "Reports",
};

const Topbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isStreaming } = useViolationStore();

  const title = routeTitleMap[location.pathname] ?? "Policy Ghost";

  return (
    <header className="h-14 border-b border-border bg-bg-surface flex items-center justify-between px-page">
      <div className="flex flex-col">
        <h1 className="text-[18px] font-semibold leading-tight">{title}</h1>
        <p className="text-[12px] text-text-muted">
          Monitoring 10,247 transactions · Last updated 2s ago
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 rounded-pill border border-border bg-bg-elevated px-2.5 py-1.5 text-[11px]">
          <LiveDot active={isStreaming} />
          <span className="text-text-secondary">
            {isStreaming ? "Live monitoring" : "Paused"}
          </span>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-control border border-border bg-bg-elevated px-2.5 py-1.5 text-[12px] text-text-secondary hover:border-border-bright hover:bg-bg-elevated/80 transition"
        >
          {isStreaming ? (
            <>
              <Square className="h-3.5 w-3.5" />
              <span>Pause stream</span>
            </>
          ) : (
            <>
              <Play className="h-3.5 w-3.5" />
              <span>Resume stream</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => navigate("/upload")}
          className="inline-flex items-center gap-1.5 rounded-control bg-teal px-3 py-1.5 text-[12px] font-medium text-white shadow-sm hover:scale-[1.02] hover:bg-teal-dark transition-transform"
        >
          <UploadIcon className="h-3.5 w-3.5" />
          <span>Upload Policy</span>
        </button>
      </div>
    </header>
  );
};

export default Topbar;

