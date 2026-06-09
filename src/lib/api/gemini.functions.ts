import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { generateAdmitOsSuggestions } from "../gemini-service.server";

// Server function that bridges client-side calls to our server-only Gemini service.
// The .handler code executes strictly on the server.
export const getGeminiPrioritizationAdvice = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      studentName: z.string(),
      targetMajor: z.string(),
      bottlenecks: z.array(z.string()),
      criticalTasks: z.array(z.string()),
    })
  )
  .handler(async ({ data }) => {
    return await generateAdmitOsSuggestions(
      data.studentName,
      data.targetMajor,
      data.bottlenecks,
      data.criticalTasks
    );
  });
