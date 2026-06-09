import { GoogleGenerativeAI } from "@google/generative-ai";
import { getServerConfig } from "./config.server";

let genAIInstance: GoogleGenerativeAI | null = null;

function getGeminiClient(): GoogleGenerativeAI | null {
  if (genAIInstance) return genAIInstance;
  
  const config = getServerConfig();
  const apiKey = config.geminiApiKey;
  
  if (!apiKey) {
    console.warn("Gemini API key is not configured. Falling back to local static analysis.");
    return null;
  }
  
  genAIInstance = new GoogleGenerativeAI(apiKey);
  return genAIInstance;
}

export interface GeminiResponse {
  success: boolean;
  text?: string;
  error?: string;
}

export async function generateAdmitOsSuggestions(
  studentName: string,
  targetMajor: string,
  bottlenecksList: string[],
  criticalTasksList: string[]
): Promise<GeminiResponse> {
  try {
    const genAI = getGeminiClient();
    if (!genAI) {
      return { success: false, error: "Gemini API key not configured." };
    }

    // Using gemini-1.5-flash as the standard fast text model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      You are an elite college admissions advisor analyzing progress data for a student named ${studentName} applying for ${targetMajor}.
      
      Here are the current unresolved bottlenecks in their application cycle:
      ${bottlenecksList.map((b, i) => `- ${b}`).join("\n")}
      
      Here are their highest ROI priority tasks:
      ${criticalTasksList.map((t, i) => `- ${t}`).join("\n")}
      
      Please provide a highly tactical, motivational, and structured weekly improvement strategy (3 short bullet points) for this student. Focus on how to resolve the bottlenecks and make progress on high-priority tasks. Keep it concise, professional, and minimal.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return {
      success: true,
      text: text.trim(),
    };
  } catch (error: any) {
    console.error("Error calling Gemini API:", error);
    return {
      success: false,
      error: error.message || "Unknown error occurred while contacting Gemini.",
    };
  }
}
