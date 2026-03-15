import { create } from "zustand";
import { Policy } from "@/types";
import { mockPolicies } from "@/mocks/data";

interface PolicyState {
  policies: Policy[];
  activePolicyId: string | null;
  uploadPolicy: (policy: Policy) => void;
  fetchPolicies: () => Promise<void>;
  setActivePolicy: (id: string | null) => void;
}

export const usePolicyStore = create<PolicyState>((set) => ({
  policies: [],
  activePolicyId: null,
  async fetchPolicies() {
    // In a real app this would call the API; for now we hydrate from mocks.
    set({ policies: mockPolicies, activePolicyId: mockPolicies[0]?.id ?? null });
  },
  uploadPolicy(policy) {
    set((state) => ({
      policies: [...state.policies, policy],
    }));
  },
  setActivePolicy(id) {
    set({ activePolicyId: id });
  },
}));

