const pdfService = require("../services/pdfService");
const embeddingService = require("../services/embeddingService");
const { askGemini } = require("../services/askGemini");

exports.uploadPDF = async (req, res) => {
  try {
    const pdfPath = req.file.path;
    const textChunks = await pdfService.parseAndChunk(pdfPath);

    await embeddingService.createStore(textChunks);
    res.json({ message: "PDF processed and stored in Chroma (HF embeddings)." });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.askQuestion = async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ error: "Question required" });
    }

    
    const context = await embeddingService.queryStore(question);

    
    const answer = await askGemini(context, question);

    res.json({ answer });
  } catch (err) {
    console.error("Q&A error:", err);
    res.status(500).json({ error: err.message });
  }
};
