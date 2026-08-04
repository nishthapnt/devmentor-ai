import { Source } from "@/lib/api";

interface MessageProps {
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
}

export default function Message({ role, content, sources }: MessageProps) {
  const isUser = role === "user";

  return (
    <div className={`flex gap-4 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
          isUser ? "bg-gray-800 text-white" : "bg-blue-100 text-blue-600"
        }`}
      >
        {isUser ? (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        )}
      </div>

      <div className={`max-w-[80%] ${isUser ? "items-end" : "items-start"} flex flex-col gap-2`}>
        <div
          className={`px-4 py-3 rounded-2xl ${
            isUser ? "bg-gray-800 text-white rounded-tr-none" : "bg-gray-50 text-gray-800 rounded-tl-none border border-gray-100"
          }`}
        >
          <p className="whitespace-pre-wrap leading-relaxed">{content}</p>
        </div>

        {!isUser && sources && sources.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1">
            <span className="text-xs font-semibold text-gray-400 self-center mr-1">Sources:</span>
            {sources.map((src, i) => (
              <span
                key={i}
                className="inline-flex items-center px-2 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-medium border border-blue-100"
                title={`Chunk ${src.chunk}`}
              >
                <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                {src.filename} (Page {src.page})
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
