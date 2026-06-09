import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { GeminiChat } from "@/components/GeminiChat";

export const Route = createFileRoute("/copilot")({
  component: CopilotPage,
  head: () => ({
    meta: [
      { title: "AI Copilot · AdmitOS" },
      {
        name: "description",
        content:
          "Gemini-powered admissions consultant. Get elite, strategic guidance on essays, PDCA cycles, and risk management.",
      },
    ],
  }),
});

function CopilotPage() {
  return (
    <AppShell
      title="AI Copilot"
      subtitle="Your Gemini-powered admissions strategist"
    >
      <GeminiChat />
    </AppShell>
  );
}
