import streamlit as st
import requests

# Backend API base URL
API_URL = "http://localhost:3000/api/chat"
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5 MB

st.set_page_config(page_title="📄 PDF Q&A", layout="wide")

st.title("📄 PDF Question & Answer System")

st.subheader("Upload a PDF")
uploaded_file = st.file_uploader("Choose a PDF", type=["pdf"])

if uploaded_file is not None:
    file_content = uploaded_file.getvalue()
    file_size = len(file_content)

    if file_size > MAX_FILE_SIZE:
        st.error(f"File too large! Maximum allowed size is {MAX_FILE_SIZE / (1024*1024):.1f} MB.")
    elif file_size == 0:
        st.error("The uploaded PDF file appears to be empty.")
    else:
        with st.spinner("Uploading and processing PDF..."):
            try:
                files = {"pdf": (uploaded_file.name, file_content, "application/pdf")}
                st.info(f"Uploading {uploaded_file.name} ({file_size / 1024:.1f} KB)...")

                response = requests.post(f"{API_URL}/upload", files=files)

                if response.status_code == 200:
                    st.success("PDF processed successfully!")
                    response_data = response.json()
                    if "chunks" in response_data:
                        st.info(f"Processed {response_data['chunks']} text chunks from your PDF.")
                else:
                    st.error(f"Upload failed: {response.text}")
            except Exception as e:
                st.error(f"Error during upload: {str(e)}")
                st.error("Please try again or contact support.")

# Ask questions
st.subheader("Ask a Question")
question = st.text_input("Enter your question")

if st.button("Ask"):
    if not question:
        st.warning("⚠️ Please enter a question first.")
    else:
        with st.spinner("Thinking..."):
            response = requests.post(f"{API_URL}/ask", json={"question": question})
            if response.status_code == 200:
                st.write("### 💡 Answer:")
                st.success(response.json().get("answer", "No answer found."))
            else:
                st.error(f"Error: {response.text}")
