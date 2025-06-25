import { useCallback } from 'react';
import { DocumentTextIcon, PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function FileUpload({ file, setFile }) {
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  }, [setFile]);

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  const preventDefault = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div
        onDragOver={preventDefault}
        onDragEnter={preventDefault}
        onDragLeave={preventDefault}
        onDrop={handleDrop}
        className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
      >
        <div className="space-y-1 text-center">
          {file ? (
            <div className="flex flex-col items-center">
              <div className="flex items-center">
                {file.type.startsWith('image/') ? (
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                ) : (
                  <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
                )}
              </div>
              <p className="mt-2 text-sm text-gray-600">
                <span className="font-medium">{file.name}</span>
              </p>
              <button
                type="button"
                onClick={removeFile}
                className="mt-2 inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <XMarkIcon className="h-4 w-4 mr-1" />
                Remove
              </button>
            </div>
          ) : (
            <>
              <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    onChange={handleChange}
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">
                PDF, DOCX, XLSX, JPG, PNG up to 10MB
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}