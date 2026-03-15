import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import GhostCopilot from "./GhostCopilot";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-bg-base text-text-primary flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-[200px] border-r border-border bg-bg-surface">
        <Sidebar />
      </aside>

      {/* Main content + topbar */}
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="flex-1 flex overflow-hidden px-page pb-page pt-4 gap-4">
          <section className="flex-1 overflow-auto">{children}</section>

          {/* Ghost Copilot – always visible on dashboard, hidden on small screens */}
          <aside className="hidden lg:block w-[300px] shrink-0">
            <GhostCopilot />
          </aside>
        </main>
      </div>
    </div>
  );
};

export default Layout;

