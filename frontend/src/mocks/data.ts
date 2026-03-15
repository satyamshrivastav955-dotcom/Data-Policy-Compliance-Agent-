import { Conflict, CopilotMessage, Policy, Rule, Severity, Violation } from "@/types";
import { subHours, subMinutes } from "date-fns";

export const mockPolicies: Policy[] = [
  {
    id: "aml-2024",
    name: "AML Policy 2024",
    description: "Anti-Money Laundering monitoring for high-risk transactions.",
    status: "active",
    uploadedAt: subHours(new Date(), 48).toISOString(),
    ruleCount: 18,
  },
  {
    id: "gdpr-ruleset",
    name: "GDPR Ruleset",
    description: "Data retention and privacy obligations for EU customers.",
    status: "active",
    uploadedAt: subHours(new Date(), 120).toISOString(),
    ruleCount: 14,
  },
];

const baseRules = (policyId: string): Rule[] => [
  {
    id: `${policyId}-r1`,
    policyId,
    code: policyId === "aml-2024" ? "AML-07" : "GDPR-12",
    description:
      policyId === "aml-2024"
        ? "Flag single transactions over 50,000 USD for enhanced due diligence."
        : "Delete personal data after 90 days of inactivity.",
    field: policyId === "aml-2024" ? "amount" : "last_active_at",
    operator: policyId === "aml-2024" ? ">" : ">",
    threshold: policyId === "aml-2024" ? "50000" : "90d",
    confidence: 0.96,
    type: "precise",
    createdAt: subHours(new Date(), 80).toISOString(),
  },
  {
    id: `${policyId}-r2`,
    policyId,
    code: policyId === "aml-2024" ? "AML-11" : "GDPR-21",
    description:
      policyId === "aml-2024"
        ? "Escalate when transactions originate from sanctioned jurisdictions."
        : "Require explicit consent before processing marketing preferences.",
    field: policyId === "aml-2024" ? "country" : "marketing_consent",
    operator: policyId === "aml-2024" ? "IN" : "==",
    threshold: policyId === "aml-2024" ? "SANCTIONED_LIST" : "true",
    confidence: 0.91,
    type: "fuzzy",
    createdAt: subHours(new Date(), 72).toISOString(),
  },
  {
    id: `${policyId}-r3`,
    policyId,
    code: policyId === "aml-2024" ? "AML-15" : "GDPR-08",
    description:
      policyId === "aml-2024"
        ? "Detect structuring by aggregating transactions over 7 days."
        : "Encrypt customer identifiers at rest using AES-256.",
    field: policyId === "aml-2024" ? "rolling_7d_amount" : "encryption_status",
    operator: policyId === "aml-2024" ? ">" : "==",
    threshold: policyId === "aml-2024" ? "100000" : "encrypted",
    confidence: 0.88,
    type: "fuzzy",
    createdAt: subHours(new Date(), 64).toISOString(),
  },
];

export const mockRules: Rule[] = [
  ...baseRules("aml-2024"),
  ...baseRules("gdpr-ruleset"),
];

const severities: Severity[] = ["CRITICAL", "HIGH", "MEDIUM"];
const countries = ["US", "GB", "DE", "FR", "IN", "BR", "AE", "NG"];
const txTypes = ["WIRE", "CARD", "ACH", "SWIFT"];

export const mockViolations: Violation[] = Array.from({ length: 50 }).map(
  (_, i) => {
    const severity = severities[i % severities.length];
    const policy = i % 2 === 0 ? mockPolicies[0] : mockPolicies[1];
    const rule = mockRules[(i * 3) % mockRules.length];
    const minutesAgo = (i + 1) * 20;
    return {
      id: `v-${i + 1}`,
      policyId: policy.id,
      ruleId: rule.id,
      ruleCode: rule.code,
      description:
        severity === "CRITICAL"
          ? "Potential sanctioned entity payment detected."
          : severity === "HIGH"
          ? "High-risk jurisdiction with abnormal pattern."
          : "Moderate deviation from typical customer behavior.",
      severity,
      txId: `TX-${(100000 + i).toString()}`,
      amount: 1200 + i * 830,
      currency: "USD",
      country: countries[i % countries.length],
      transactionType: txTypes[i % txTypes.length],
      occurredAt: subMinutes(new Date(), minutesAgo).toISOString(),
    };
  }
);

export const mockConflicts: Conflict[] = [
  {
    id: "conf-1",
    leftRuleId: "gdpr-ruleset-r1",
    rightRuleId: "aml-2024-r1",
    leftRuleCode: "GDPR-12",
    rightRuleCode: "AML-07",
    leftSummary: "Delete personal data after 90 days of inactivity.",
    rightSummary: "Retain transaction records for at least 7 years.",
    leftPolicyName: "GDPR Ruleset",
    rightPolicyName: "AML Policy 2024",
    similarity: 0.91,
    conflictType: "Operator contradiction",
    memo:
      "GDPR retention requirements conflict with AML evidence retention for auditability. Recommend layered retention with irreversible pseudonymisation after 90 days while preserving audit attributes for 7 years.",
  },
  {
    id: "conf-2",
    leftRuleId: "gdpr-ruleset-r2",
    rightRuleId: "aml-2024-r2",
    leftRuleCode: "GDPR-21",
    rightRuleCode: "AML-11",
    leftSummary:
      "Restrict profiling of customers without explicit consent.",
    rightSummary:
      "Continuously profile high-risk customers for suspicious activity.",
    leftPolicyName: "GDPR Ruleset",
    rightPolicyName: "AML Policy 2024",
    similarity: 0.86,
    conflictType: "Scope tension",
    memo:
      "Risk-based AML profiling must be limited to strictly necessary attributes with strong governance. Recommend explicit customer disclosures and DPIA-backed safeguards.",
  },
];

export const mockCopilotMessages: CopilotMessage[] = [
  {
    id: "m1",
    role: "assistant",
    content:
      "I’m monitoring live violations across AML and GDPR policies. Ask me where risk is clustering, or which rules are driving alerts.",
    createdAt: new Date().toISOString(),
  },
];

export const mockCopilotSuggestions: string[] = [
  "Summarise today’s highest-risk violations",
  "Which rules are firing most frequently?",
  "Explain why AML-07 is critical",
  "Generate a memo for the last GDPR conflict",
  "Show anomalies by country in the last 24h",
];

