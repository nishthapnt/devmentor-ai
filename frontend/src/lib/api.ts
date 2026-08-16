export interface Source {
  filename: string;
  page: number;
  chunk: number;
}

export interface ChatResponse {
  question: string;
  answer: string;
  sources: Source[];
}

const API_BASE_URL = "http://localhost:8000";


export async function uploadPdf(file: File): Promise<any> {
  const formData = new FormData();
  // Using 'file' as the form field name based on standard FastAPI UploadFile
  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || "Failed to upload PDF.");
  }

  return response.json();
}

/**
 * Sends a chat message to the backend and returns the AI's answer with sources.
 */
export async function askQuestion(message: string): Promise<ChatResponse> {
  const response = await fetch(`${API_BASE_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || "Failed to get an answer.");
  }

  return response.json();
}
