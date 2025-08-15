
import { GoogleGenAI } from "@google/genai";

// Ensure the API key is available in the environment variables
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you might want to handle this more gracefully.
  // For this context, we assume the key is always present.
  console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generateProductDescription = async (productName: string): Promise<string> => {
  if (!API_KEY) {
    return "API Key not configured. Please set the API_KEY environment variable.";
  }
  
  try {
    const prompt = `Create a compelling, short (2-3 sentences) marketing description for a product named "${productName}". Focus on its key benefits and target audience. Do not use markdown.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text.trim();

  } catch (error) {
    console.error("Error generating product description:", error);
    if (error instanceof Error) {
        return `Failed to generate description: ${error.message}`;
    }
    return "An unknown error occurred while generating the description.";
  }
};
