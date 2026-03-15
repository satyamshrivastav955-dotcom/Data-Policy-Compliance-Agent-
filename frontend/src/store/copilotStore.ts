import { create } from "zustand";
import { CopilotMessage, ThinkingStep } from "@/types";
import { mockCopilotMessages } from "@/mocks/data";

interface CopilotState {
  messages: CopilotMessage[];
  isThinking: boolean;
  thinkingSteps: ThinkingStep[];
  sendMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
}

const baseSteps: ThinkingStep[] = [
  { id: "s1", label: "Querying violations database", status: "done" },
  { id: "s2", label: "Filtering by severity", status: "done" },
  { id: "s3", label: "Generating summary", status: "running" },
];

export const useCopilotStore = create<CopilotState>((set) => ({
  messages: mockCopilotMessages,
  isThinking: false,
  thinkingSteps: [],
  async sendMessage(content: string) {
    const userMessage: CopilotMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      content,
      createdAt: new Date().toISOString(),
    };
    set((state) => ({
      messages: [...state.messages, userMessage],
      isThinking: true,
      thinkingSteps: baseSteps,
    }));

    // Simulated streaming / delayed assistant reply for now.
    await new Promise((resolve) => setTimeout(resolve, 900));

    const assistantMessage: CopilotMessage = {
      id: `a-${Date.now()}`,
      role: "assistant",
      content:
        "Here’s a high-level summary based on current mock data. Once the backend is wired, this will stream from the live copilot endpoint.",
      createdAt: new Date().toISOString(),
    };

    set((state) => ({
      messages: [...state.messages, userMessage, assistantMessage],
      isThinking: false,
      thinkingSteps: baseSteps.map((s) => ({ ...s, status: "done" })),
    }));
  },
  clearMessages() {
    set({ messages: [], thinkingSteps: [], isThinking: false });
  },
}));

