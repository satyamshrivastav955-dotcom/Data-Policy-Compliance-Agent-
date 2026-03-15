import { useEffect } from "react";
import { usePolicyStore } from "@/store/policyStore";
import { useViolationStore } from "@/store/violationStore";

const Dashboard = () => {
  const { fetchPolicies } = usePolicyStore();
  const { fetchViolations } = useViolationStore();

  useEffect(() => {
    fetchPolicies();
    fetchViolations();
  }, [fetchPolicies, fetchViolations]);

  return (
    <div className="h-full">
      <div className="card card-hover p-4 mb-4">
        <h2 className="text-[18px] font-semibold mb-1">Dashboard</h2>
        <p className="text-[13px] text-text-secondary">
          Policy Ghost is connected to mock data. Next steps: wire in stat
          cards, violations chart, live feed, and the audit memo drawer as per
          the design spec.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card p-4 text-[13px] text-text-secondary">
          Violations over time chart will appear here.
        </div>
        <div className="card p-4 text-[13px] text-text-secondary">
          Live violation feed will appear here.
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

