import { useState } from "react";
import FileUploader from "../components/FileUploader";

export default function Home() {
  const [fileName, setFileName] = useState("");
  const [status, setStatus] = useState("");

  const handleFileUpload = (file) => {
    if (!file) return;

    setFileName(file.name);
    setStatus("Processing...");

    // Simulate processing (like API call)
    setTimeout(() => {
      setStatus("✅ File uploaded and processed!");
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">AI MCQ Generator</h1>

      <FileUploader onFileUpload={handleFileUpload} />

      {fileName && (
        <div className="mt-4 p-3 bg-white shadow rounded-lg text-center">
          <p className="text-gray-700 font-medium">File: {fileName}</p>
          <p className="text-blue-500 mt-2">{status}</p>
        </div>
      )}
    </div>
  );
}
