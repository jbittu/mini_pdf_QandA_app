# 📄 PDF Question & Answer System

A full-stack application that allows users to **upload PDFs, process them into embeddings, store them in ChromaDB**, and then **ask natural language questions** about the content.  

The system uses:
- **Backend (Node.js + Express)** → Handles PDF parsing, embeddings, and Gemini-powered Q&A.  
- **Vector Database (ChromaDB)** → Stores and retrieves semantic embeddings.  
- **Hugging Face Inference API** → Generates embeddings using `sentence-transformers/all-MiniLM-L6-v2`.  
- **Gemini (Google Generative AI)** → Answers questions using retrieved context.  
- **Frontend (Streamlit)** → Simple UI for PDF upload and Q&A interaction.  

---

## 🌐 Live Demo

👉 [PDF Q&A App](https://jbittu-mini-pdf-qanda-app-frontend-g7zcpw.streamlit.app/)

---

## 🚀 Features

- Upload and parse **PDF documents**.  
- Chunk text into smaller segments for efficient processing.  
- Create **semantic embeddings** and store them in **ChromaDB**.  
- Perform **semantic search** over PDF content.  
- Ask natural language questions and get **Gemini-powered answers**.  
- Interactive **Streamlit frontend**.  

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express, Multer  
- **Vector Store:** ChromaDB  
- **Embeddings:** Hugging Face Inference API (`sentence-transformers/all-MiniLM-L6-v2`)  
- **LLM:** Google Gemini (`gemini-2.0-flash`)  
- **Frontend:** Streamlit (Python)  
- **Others:** dotenv, pdf-parse  

---

## 📂 Project Structure

.
├── app.js                 
├── controllers/
│   └── chatController.js  
├── routes/
│   └── chatRoutes.js      
├── services/
│   ├── pdfService.js       
│   ├── embeddingService.js 
│   └── askGemini.js        
├── utils/
│   └── chunkText.js        
├── frontend.py             
├── uploads/                
├── .env                    
└── README.md               

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository
```bash
git clone https://github.com/yourusername/pdf-qa-system.git
cd pdf-qa-system
```

---

### 2️⃣ Backend Setup (Node.js)

Install dependencies:
npm install

Create a `.env` file in the project root:
```bash
PORT=3000
HUGGINGFACEHUB_ACCESS_TOKEN=your_huggingface_api_token
GEMINI_API_KEY=your_google_gemini_api_key
```

Start **ChromaDB** (requires Docker):
```bash
docker run -d -p 8000:8000 chromadb/chroma
```

Run backend:
```bash
node app.js
```    

Backend runs at: http://localhost:3000

---

### 3️⃣ Frontend Setup (Streamlit)

Create a `requirements.txt` file:
```bash
streamlit
requests
```

Install dependencies:
```bash
pip install -r requirements.txt
```

Run frontend:
```bash
streamlit run frontend.py
```
Frontend runs at: http://localhost:8501

---

## 🖥️ Usage

1. Open the **Streamlit app** (local or deployed).  
2. Upload a PDF (≤ 5 MB).  
3. Ask a question in natural language.  
4. Get Gemini-powered answers from your document.  

---

## 🛡️ Troubleshooting

- **"Failed to perform inference"** → Check Hugging Face API key and internet connection.  
- **Chroma connection error** → Ensure Docker is running on port `8000`.  
- **Gemini API error** → Verify your Google Gemini API key.  

---

## 📌 Future Improvements

- Multiple PDF support.  
- Persistent chat history.  
- Deploy backend alongside frontend.  
- More embedding models.  

---

## 🤝 Contributing

Pull requests are welcome! Open an issue first to discuss what you’d like to improve.  

---

## 📜 License

MIT License © 2025 bittu
