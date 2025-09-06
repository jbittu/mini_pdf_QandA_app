require("dotenv").config();

exports.askGemini = async (context, question) => {
  try {
    
    const { GoogleGenerativeAI } = await import("@google/generative-ai");
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const prompt = `${context}\n\nQuestion: ${question}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text || "No answer found.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error while querying Gemini.";
  }
};