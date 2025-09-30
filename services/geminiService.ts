
import { GoogleGenAI, Modality, GenerateContentResponse } from "@google/genai";

const fileToGenerativePart = (base64: string, mimeType: string) => {
  return {
    inlineData: {
      data: base64.split(',')[1],
      mimeType
    },
  };
};

const getMimeType = (base64: string): string => {
    return base64.substring(base64.indexOf(":") + 1, base64.indexOf(";"));
}


export async function generatePhotoshootImage(
  modelImageBase64: string,
  productImageBase64: string,
  userPrompt: string,
  stylePrompt: string,
  aspectRatio: string
): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

  const modelMimeType = getMimeType(modelImageBase64);
  const productMimeType = getMimeType(productImageBase64);

  const modelImagePart = fileToGenerativePart(modelImageBase64, modelMimeType);
  const productImagePart = fileToGenerativePart(productImageBase64, productMimeType);

  const fullPrompt = `
    As an expert photo editor, your task is to seamlessly integrate a product image into a model's photo to create a professional product photoshoot.

    **Instructions:**
    1.  You will be given two images: a primary image of a model and a secondary image of a product.
    2.  Carefully and realistically place the product from the second image into the first image with the model.
    3.  Adhere to the user's creative instructions for the placement and context.
    4.  Apply the specified style for the final image's look and feel.
    5.  Ensure the final image has the correct aspect ratio.
    6.  Pay meticulous attention to lighting, shadows, reflections, and perspective to make the product look like it was part of the original scene. The integration must be flawless.

    **User Creative Instructions:** "${userPrompt || 'Place the product naturally in the scene, for example, in the model\'s hand or on a surface near them.'}"
    **Style:** "${stylePrompt}"
    **Aspect Ratio:** "${aspectRatio}"

    Now, generate the final image.
  `;
  
  const textPart = { text: fullPrompt };

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image-preview',
      contents: {
        parts: [
          modelImagePart,
          productImagePart,
          textPart,
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });

    for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
            const base64ImageBytes: string = part.inlineData.data;
            return `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
        }
    }
    throw new Error("No image was generated in the response.");

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to communicate with the AI model.");
  }
}
