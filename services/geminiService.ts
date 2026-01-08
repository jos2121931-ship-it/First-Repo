
import { GoogleGenAI, Type } from "@google/genai";
import { StoreConfig, AIContent } from "../types";

export const generateBrandingContent = async (config: StoreConfig): Promise<AIContent> => {
  // Use process.env.API_KEY directly as required by the guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Generate a short, professional greeting and a creative announcement for a retail store or department display.
    
    Department Name: ${config.name}
    Department Vibe: ${config.vibe}
    Current Local Context: Displayed on a large TV in-store.
    
    REQUIREMENT: 
    - The greeting MUST BE exactly "Welcome to the SCC Student Tech Center and Help Desk" or a very close professional variation of it.
    - The announcement should be a short, punchy marketing message (e.g., about quality, a season, or a philosophy) relevant to technology support and academic success.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            greeting: { type: Type.STRING, description: "A welcoming greeting, ideally 'Welcome to the SCC Student Tech Center and Help Desk'." },
            announcement: { type: Type.STRING, description: "A short professional announcement." }
          },
          required: ["greeting", "announcement"]
        }
      }
    });

    // response.text is a getter, calling trim() on the string output is correct.
    return JSON.parse(response.text.trim()) as AIContent;
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      greeting: `Welcome to the SCC Student Tech Center and Help Desk`,
      announcement: config.tagline
    };
  }
};
