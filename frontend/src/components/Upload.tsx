"use client";

import { useState } from "react";
import { uploadPdf } from "@/lib/api";

export default function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setMessage(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setMessage(null);

    try {
      await uploadPdf(file);
      setMessage({ type: "success", text: "PDF uploaded and indexed successfully!" });
      setFile(null);
    } catch (error: any) {
      setMessage({ type: "error", text: error.message || "Failed to upload file." });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Upload Knowledge Base</h2>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          disabled={isUploading}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100 disabled:opacity-50 cursor-pointer"
        />
        <button
          onClick={handleUpload}
          disabled={!file || isUploading}
          className="px-6 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors whitespace-nowrap"
        >
          {isUploading ? (
            <>
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Uploading...
            </>
          ) : (
            "Upload PDF"
          )}
        </button>
      </div>

      {message && (
        <div className={`p-3 rounded-md text-sm ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
          {message.text}
        </div>
      )}
    </div>
  );
}

//upload pdf to backend  
