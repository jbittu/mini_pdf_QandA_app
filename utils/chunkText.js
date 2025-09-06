
function chunkText(text, chunkSize = 200, overlap = 50) {
  const chunks = [];
  let start = 0;

  while (start < text.length) {
    const end = Math.min(start + chunkSize, text.length);
    chunks.push(text.slice(start, end));
    start += chunkSize - overlap; 
  }

  return chunks;
}

module.exports = { chunkText };
