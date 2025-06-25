import FileUploader from "../components/FileUploader";

export default function Home() {
  const handleFileUpload = (file) => {
    console.log("File received:", file);
    // You can call your backend here
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">AI MCQ Generator</h1>
      <FileUploader onFileUpload={handleFileUpload} />
    </div>
  );
}
