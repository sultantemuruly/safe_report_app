import ReportWizard from "@/components/report/ReportWizard";

export default function page() {
  return (
    <div className="relative min-h-screen bg-black selection:bg-sky-500/10 overflow-hidden">
      {/* Gradient Background */}
      <div className="fixed inset-0 -z-10 min-h-screen">
        <div className="absolute inset-0 h-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.03),transparent_50%)]" />
        <div className="absolute inset-0 h-full bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.04),transparent_70%)]" />
      </div>

      <main className="relative px-6 pt-32">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center justify-center space-x-2 text-blue-500 border border-blue-500 rounded-full py-2 px-4">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
              <div>Secure Reporting</div>
            </div>

            <h1 className="mt-8 bg-gradient-to-b from-white to-white/80 bg-clip-text text-5xl font-bold tracking-tight text-transparent">
              Submit Report
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
              We ensure your security with encrypted submissions handled with
              care.
            </p>
          </div>

          <div className="mt-16 bg-zinc-900/50 rounded-2xl border border-white/5 p-6">
            {/* Report Wizard */}
            <ReportWizard />
          </div>
        </div>
      </main>
    </div>
  );
}
