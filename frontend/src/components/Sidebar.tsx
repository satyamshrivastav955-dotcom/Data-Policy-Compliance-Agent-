import { NavLink } from "react-router-dom";
import {
  AlertTriangle,
  BookOpen,
  FileText,
  GitMerge,
  LayoutDashboard,
  Upload,
} from "lucide-react";
import { usePolicyStore } from "@/store/policyStore";
import { useViolationStore } from "@/store/violationStore";
import { mockConflicts } from "@/mocks/data";

const navItemBase =
  "relative flex items-center gap-2 px-3 py-2 rounded-lg text-[13px] text-text-secondary hover:text-text-primary hover:bg-bg-elevated transition-colors";

const Sidebar = () => {
  const { policies } = usePolicyStore();
  const { violations } = useViolationStore();

  const violationCount = violations.length;
  const conflictCount = mockConflicts.length;

  return (
    <div className="flex flex-col h-full p-4 gap-6">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-lg bg-teal/20 border border-teal/40 flex items-center justify-center text-[15px] font-semibold text-teal">
          PG
        </div>
        <div className="flex flex-col">
          <span className="text-[14px] font-semibold">Policy Ghost</span>
          <span className="text-[11px] text-text-muted">
            Compliance intelligence
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-1 text-[13px]">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${navItemBase} ${isActive ? "text-teal bg-teal.bg" : ""}`
          }
        >
          <LayoutDashboard className="h-4 w-4" />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to="/upload"
          className={({ isActive }) =>
            `${navItemBase} ${isActive ? "text-teal bg-teal.bg" : ""}`
          }
        >
          <Upload className="h-4 w-4" />
          <span>Upload Policy</span>
        </NavLink>
        <NavLink
          to="/rules"
          className={({ isActive }) =>
            `${navItemBase} ${isActive ? "text-teal bg-teal.bg" : ""}`
          }
        >
          <BookOpen className="h-4 w-4" />
          <span>Rule Viewer</span>
        </NavLink>
        <NavLink
          to="/violations"
          className={({ isActive }) =>
            `${navItemBase} ${isActive ? "text-teal bg-teal.bg" : ""}`
          }
        >
          <AlertTriangle className="h-4 w-4 text-red-light" />
          <span>Violations</span>
          {violationCount > 0 && (
            <span className="ml-auto inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red/20 text-[10px] text-red-light px-1.5">
              {violationCount}
            </span>
          )}
        </NavLink>
        <NavLink
          to="/conflicts"
          className={({ isActive }) =>
            `${navItemBase} ${isActive ? "text-teal bg-teal.bg" : ""}`
          }
        >
          <GitMerge className="h-4 w-4 text-amber" />
          <span>Conflicts</span>
          {conflictCount > 0 && (
            <span className="ml-auto inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-amber/20 text-[10px] text-amber px-1.5">
              {conflictCount}
            </span>
          )}
        </NavLink>
        <NavLink
          to="/reports"
          className={({ isActive }) =>
            `${navItemBase} ${isActive ? "text-teal bg-teal.bg" : ""}`
          }
        >
          <FileText className="h-4 w-4" />
          <span>Reports</span>
        </NavLink>
      </nav>

      {/* Active policies list */}
      <div className="mt-2 border-t border-border pt-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] uppercase tracking-wide text-text-muted">
            Active policies
          </span>
          <span className="text-[11px] text-text-secondary">
            {policies.length}
          </span>
        </div>
        <div className="space-y-1.5">
          {policies.map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-2 text-[12px] text-text-secondary"
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  p.status === "active"
                    ? "bg-teal"
                    : p.status === "processing"
                    ? "bg-amber"
                    : "bg-red"
                }`}
              />
              <span className="truncate">{p.name}</span>
            </div>
          ))}
          {policies.length === 0 && (
            <span className="text-[12px] text-text-muted">
              No policies yet. Upload to start monitoring.
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

