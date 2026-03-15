const UploadPolicy = () => {
  return (
    <div className="h-full space-y-4">
      <section className="relative overflow-hidden rounded-card bg-[#0d3330] px-8 py-10 text-center">
        <h2 className="text-[22px] font-semibold mb-2">
          Upload Your Compliance Policy
        </h2>
        <p className="text-[13px] text-text-secondary max-w-xl mx-auto">
          AI extracts every enforceable rule in under 12 seconds so your teams
          can focus on decisions, not documents.
        </p>
      </section>

      <section className="card p-6">
        <p className="text-[13px] text-text-secondary">
          The full drag-and-drop upload experience will appear here, including
          progress steps and the existing policies list, wired to the mock
          policy data.
        </p>
      </section>
    </div>
  );
};

export default UploadPolicy;

