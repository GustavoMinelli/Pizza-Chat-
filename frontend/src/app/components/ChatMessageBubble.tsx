import React from "react";
import { FaRobot, FaUserCircle } from "react-icons/fa";

interface ChatMessageBubbleProps {
  role: "user" | "assistant";
  content: string;
  createdAt?: string;
  isLoading?: boolean;
}

function formatHour(dateString?: string) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

// Função para parsear markdown simples (**bold**, *itálico*, __underline__)
function parseSimpleMarkdown(text: string) {
  // Bold: **text**
  let parsed = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  // Italic: *text*
  parsed = parsed.replace(/\*(.*?)\*/g, '<em>$1</em>');
  // Underline: __text__
  parsed = parsed.replace(/__(.*?)__/g, '<u>$1</u>');
  return parsed;
}

export default function ChatMessageBubble({ role, content, createdAt, isLoading }: Readonly<ChatMessageBubbleProps>) {
  const bubbleBase =
    "px-3 py-2 rounded-2xl shadow max-w-[75%] min-w-[48px] animate-pop-in flex flex-col";
  const bubbleClass =
    role === "user"
      ? `bg-[#dcf8c6] text-gray-900 rounded-br-sm ${bubbleBase}`
      : `bg-white text-gray-900 rounded-bl-sm ${bubbleBase}`;

  return (
    <div className={`flex items-end gap-2 ${role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}>
      {role === "assistant" && (
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 shadow mr-1 animate-pop-in">
          <FaRobot />
        </span>
      )}
      <span className={bubbleClass} style={{ wordBreak: "break-word", transition: 'background 0.3s' }}>
        <span className="w-full">
          {isLoading ? (
            <span className="inline-block align-middle">
              <span className="inline-block w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms', marginRight: '2px' }}></span>
              <span className="inline-block w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms', marginRight: '2px' }}></span>
              <span className="inline-block w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
            </span>
          ) : (
            <span dangerouslySetInnerHTML={{ __html: parseSimpleMarkdown(content) }} />
          )}
        </span>
        {createdAt && (
          <span
            className={`text-[10px] font-mono text-gray-400 select-none mt-1 ${role === "user" ? "self-end" : "self-start"}`}
            style={{ opacity: 0.8 }}
          >
            {formatHour(createdAt)}
          </span>
        )}
      </span>
      {role === "user" && (
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600 shadow ml-1 animate-pop-in">
          <FaUserCircle />
        </span>
      )}
    </div>
  );
}
