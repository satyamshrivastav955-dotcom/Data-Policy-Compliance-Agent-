import { create } from "zustand";
import { Violation } from "@/types";
import { mockViolations } from "@/mocks/data";

interface ViolationState {
  violations: Violation[];
  liveViolations: Violation[];
  isStreaming: boolean;
  addViolation: (violation: Violation) => void;
  toggleStream: () => void;
  fetchViolations: () => Promise<void>;
}

export const useViolationStore = create<ViolationState>((set) => ({
  violations: [],
  liveViolations: [],
  isStreaming: true,
  async fetchViolations() {
    set({ violations: mockViolations });
  },
  addViolation(violation) {
    set((state) => {
      const updated = [violation, ...state.liveViolations].slice(0, 50);
      return { liveViolations: updated };
    });
  },
  toggleStream() {
    set((state) => ({ isStreaming: !state.isStreaming }));
  },
}));

