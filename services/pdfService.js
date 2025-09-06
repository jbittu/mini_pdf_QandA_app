const fs = require("fs");
const pdfParse = require("pdf-parse");
const { chunkText } = require("../utils/chunkText");

exports.parseAndChunk = async (pdfPath) => {
  const dataBuffer = fs.readFileSync(pdfPath);
  const pdfData = await pdfParse(dataBuffer);
  let chunks = chunkText(pdfData.text, 500);
  chunks = chunks
    .map(chunk => chunk.trim())
    .filter(chunk => chunk.length > 0);
  chunks = [...new Set(chunks)];
  return chunks;
};