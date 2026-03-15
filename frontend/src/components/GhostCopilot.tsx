import { ArrowUpRight, ArrowUpRightSquare, MessageCircle } from "lucide-react";
import { useCopilotStore } from "@/store/copilotStore";
import { mockCopilotSuggestions } from "@/mocks/data";
import { useState } from "react";
import { ThinkingStep } from "./ui/ThinkingStep";
import { Chip } from "./ui/Chip";

const GhostCopilot = () => {
  const { messages, thinkingSteps, isThinking, sendMessage } = useCopilotStore();
  const [input, setInput] = useState("");

  const handleSubmit = async (value?: string) => {
    const content = value ?? input.trim();
    if (!content) return;
    setInput("");
    await sendMessage(content);
  };

  return (
    <div className="card card-hover h-full flex flex-col p-3">
      <header className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-full bg-bg-elevated flex items-center justify-center text-teal">
            <MessageCircle className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-[13px] font-semibold">Ghost Copilot</span>
            <span className="text-[11px] text-text-muted">AI · ↗</span>
          </div>
        </div>
        <ArrowUpRightSquare className="h-4 w-4 text-text-muted" />
      </header>

      <div className="flex-1 flex flex-col overflow-hidden gap-2">
        <div className="flex-1 overflow-auto space-y-2 pr-1">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`rounded-lg px-2.5 py-1.5 text-[12px] ${
                m.role === "assistant"
                  ? "bg-bg-elevated text-text-secondary"
                  : "bg-teal/10 text-text-primary"
              }`}
            >
              {m.content}
            </div>
          ))}

          {isThinking && (
            <div className="mt-1 space-y-1">
              {thinkingSteps.map((step, idx) => (
                <ThinkingStep key={step.id} step={step} index={idx} />
              ))}
            </div>
          )}
        </div>

        <div className="mt-1 flex flex-wrap gap-1.5">
          {mockCopilotSuggestions.slice(0, 4).map((s, idx) => (
            <Chip
              key={s}
              label={s}
              delay={idx * 0.05}
              onClick={() => handleSubmit(s)}
            />
          ))}
        </div>

        <form
          className="mt-2 flex items-center gap-1.5 border border-border rounded-control bg-bg-elevated px-2 py-1"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <input
            className="flex-1 bg-transparent outline-none text-[12px] placeholder:text-text-muted"
            placeholder="Ask Ghost anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-teal text-[11px] text-white hover:bg-teal-dark transition-colors"
          >
            <ArrowUpRight className="h-3 w-3" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default GhostCopilot;

