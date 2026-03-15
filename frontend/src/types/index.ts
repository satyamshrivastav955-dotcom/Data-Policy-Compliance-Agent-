export type Severity = "CRITICAL" | "HIGH" | "MEDIUM" | "INFO";

export interface Policy {
  id: string;
  name: string;
  description?: string;
  status: "active" | "processing" | "failed";
  uploadedAt: string;
  ruleCount: number;
}

export interface Rule {
  id: string;
  policyId: string;
  code: string;
  description: string;
  field: string;
  operator: string;
  threshold: string;
  confidence: number; // 0-1
  type: "precise" | "fuzzy";
  createdAt: string;
}

export interface Violation {
  id: string;
  policyId: string;
  ruleId: string;
  ruleCode: string;
  description: string;
  severity: Severity;
  txId: string;
  amount: number;
  currency: string;
  country: string;
  transactionType: string;
  occurredAt: string;
}

export interface Conflict {
  id: string;
  leftRuleId: string;
  rightRuleId: string;
  leftRuleCode: string;
  rightRuleCode: string;
  leftSummary: string;
  rightSummary: string;
  leftPolicyName: string;
  rightPolicyName: string;
  similarity: number; // 0-1
  conflictType: string;
  memo: string;
}

export interface CopilotMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  createdAt: string;
}

export interface ThinkingStep {
  id: string;
  label: string;
  status: "pending" | "running" | "done";
}

