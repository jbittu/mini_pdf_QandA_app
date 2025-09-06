const { HfInference } = require("@huggingface/inference");
const { Chroma } = require("@langchain/community/vectorstores/chroma");
const { Document } = require("langchain/document");

const hf = new HfInference(process.env.HUGGINGFACEHUB_ACCESS_TOKEN);
const COLLECTION_NAME = "pdf_embeddings";
const CHROMA_URL = "http://localhost:8000";

async function embed(text) {
  try {
    if (!text || text.trim().length === 0) {
      throw new Error("Empty text passed to embed()");
    }

    console.log(
      `Embedding text (length: ${text.length} chars, preview: "${text.slice(
        0,
        100
      )}...")`
    );

    const res = await hf.featureExtraction({
      model: "sentence-transformers/all-MiniLM-L6-v2",
      inputs: text,
    });

    
    const vector = Array.isArray(res[0]) ? res[0] : res;

    if (
      !Array.isArray(vector) ||
      vector.length === 0 ||
      !vector.every((x) => typeof x === "number")
    ) {
      throw new Error(
        "Embedding API returned an empty or invalid embedding array"
      );
    }

    return vector;
  } catch (err) {
    console.error("Hugging Face inference error:", err);
    throw new Error("Failed to perform inference: " + (err.message || err));
  }
}

// Batch Embedding

async function embedDocumentsInBatches(chunks, batchSize = 5) {
  const results = [];
  for (let i = 0; i < chunks.length; i += batchSize) {
    const batch = chunks.slice(i, i + batchSize);
    console.log(
      `Processing embedding batch ${i / batchSize + 1}/${Math.ceil(
        chunks.length / batchSize
      )} (size ${batch.length})`
    );
    const batchEmbeddings = await Promise.all(batch.map(embed));
    results.push(...batchEmbeddings);
  }
  return results;
}


// Create Vector Store

exports.createStore = async (texts) => {
  if (!Array.isArray(texts) || texts.length === 0) {
    throw new Error("No texts provided to createStore");
  }

  const docs = texts.map(
    (t, i) => new Document({ pageContent: t, metadata: { id: i } })
  );

  const embeddings = {
    embedQuery: embed,
    embedDocuments: (arr) => embedDocumentsInBatches(arr, 5),
  };

  console.log(`Creating Chroma collection "${COLLECTION_NAME}" with ${docs.length} docs...`);

  await Chroma.fromDocuments(docs, embeddings, {
    collectionName: COLLECTION_NAME,
    url: CHROMA_URL,
  });

  console.log("Chroma store created successfully.");
};


// Query Vector Store

exports.queryStore = async (query, topK = 3) => {
  if (!query || query.trim().length === 0) {
    throw new Error("Query is empty");
  }

  const embeddings = {
    embedQuery: embed,
    embedDocuments: (arr) => embedDocumentsInBatches(arr, 5),
  };

  const store = await Chroma.fromExistingCollection(embeddings, {
    collectionName: COLLECTION_NAME,
    url: CHROMA_URL,
  });

  console.log(` Running similarity search for query: "${query}"`);

  const results = await store.similaritySearch(query, topK);
  return results.map((doc) => doc.pageContent).join("\n");
};
