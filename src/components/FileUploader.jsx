import { useState } from "react";

export default function FileUploader({ onFileUpload }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    onFileUpload(selectedFile);
  };

  return (
    <div className="border-dashed border-2 p-4 rounded-xl text-center bg-white shadow">
      <input type="file" onChange={handleFileChange} className="mb-2" />
      {file && <p className="text-sm mt-2 text-green-600">{file.name} uploaded.</p>}
    </div>
  );
}
