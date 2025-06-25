import { useState } from "react";
import FileUploader from "../components/FileUploader";

export default function Home() {
  const [fileName, setFileName] = useState("");
  const [status, setStatus] = useState("");
  const [questions, setQuestions] = useState([]);

  const handleFileUpload = async (file) => {
    if (!file) return;
    setFileName(file.name);
    setStatus("📤 Uploading and processing...");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("https://ai-mcq-generator-xo0f.onrender.com"upload/, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || "Upload failed with no detail");
      }

      const result = await response.json();
      setQuestions(result.questions || []);
      setStatus("✅ Questions generated successfully!");
    } catch (error) {
      console.error("Full error:", error);
      setStatus("❌ Error: " + error.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">AI MCQ Generator</h1>
      <FileUploader onFileUpload={handleFileUpload} />

      {fileName && (
        <div className="mt-4 bg-white shadow rounded-lg p-3 text-center">
          <p className="text-gray-700 font-medium">File: {fileName}</p>
          <p className="text-blue-500 mt-2">{status}</p>
        </div>
      )}

      {questions.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-3">Generated Questions:</h2>
          <ul className="space-y-4">
            {questions.map((q, i) => (
              <li key={i} className="p-4 bg-white rounded shadow">
                <p className="font-semibold">{i + 1}. {q.question}</p>
                <ul className="list-disc pl-6 mt-2">
                  {q.options.map((opt, idx) => (
                    <li key={idx}>{opt}</li>
                  ))}
                </ul>
                <p className="mt-2 text-green-600 font-medium">Answer: {q.answer}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
