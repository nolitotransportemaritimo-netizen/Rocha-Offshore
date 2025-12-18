
import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, JobVacancy } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const geminiService = {
  analyzeProfileMatch: async (profile: UserProfile, job: JobVacancy) => {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analyze the match between this Maritime Professional and this Job Vacancy. 
        Return a JSON object with a 'matchScore' (0-100), 'strengths' (array of strings), and 'missingRequirements' (array of strings).
        
        Professional: ${JSON.stringify(profile)}
        Job: ${JSON.stringify(job)}`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              matchScore: { type: Type.NUMBER },
              strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
              missingRequirements: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["matchScore", "strengths", "missingRequirements"]
          }
        }
      });

      return JSON.parse(response.text);
    } catch (error) {
      console.error("Gemini Match Analysis Error:", error);
      return null;
    }
  },

  generateResumeSummary: async (profile: UserProfile) => {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Generate a professional, high-impact 3-sentence summary for a maritime resume based on this profile data: ${JSON.stringify(profile)}. Focus on rank, experience, and certifications.`,
      });
      return response.text;
    } catch (error) {
      console.error("Gemini Resume Summary Error:", error);
      return "Experienced maritime professional ready for next challenge.";
    }
  }
};
