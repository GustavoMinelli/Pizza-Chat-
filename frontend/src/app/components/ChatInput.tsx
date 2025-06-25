import { FormEvent } from "react";
import { FaPaperPlane, FaTrash } from "react-icons/fa";

interface ChatInputProps {
  input: string;
  setInput: (v: string) => void;
  loading: boolean;
  handleSend: (e: FormEvent) => void;
  handleClearChat: () => void;
}

export default function ChatInput({ input, setInput, loading, handleSend, handleClearChat }: Readonly<ChatInputProps>) {
  return (
    <form onSubmit={handleSend} className="flex gap-2 mt-2">
      <input
        type="text"
        className="flex-1 bg-white/80 border border-gray-200 rounded-full px-4 py-3 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400/60 text-gray-900 placeholder-gray-400 transition-all duration-200 backdrop-blur-sm focus:bg-white focus:border-blue-400 focus:shadow-[0_4px_24px_0_rgba(59,130,246,0.10)]"
        placeholder="Digite sua mensagem..."
        value={input}
        onChange={e => setInput(e.target.value)}
        autoFocus
        disabled={loading}
        style={{ fontSize: 16, boxShadow: '0 2px 8px 0 rgba(0,0,0,0.06), inset 0 1.5px 6px 0 rgba(0,0,0,0.04)', transition: 'box-shadow 0.2s, background 0.2s, border 0.2s' }}
      />
      <button
        type="submit"
        className="bg-gradient-to-tr from-blue-100 to-blue-50 border border-blue-200 text-blue-600 p-3 rounded-full hover:from-blue-200 hover:to-blue-100 hover:text-blue-700 flex items-center justify-center shadow-lg transition-all duration-200 focus:ring-2 focus:ring-blue-300 focus:outline-none backdrop-blur-md hover:scale-105 hover:shadow-2xl active:scale-100"
        disabled={loading}
        title="Enviar"
        style={{ fontSize: 22, boxShadow: '0 2px 8px 0 rgba(59,130,246,0.10)', transition: 'box-shadow 0.2s, transform 0.2s' }}
      >
        <FaPaperPlane className="drop-shadow-md" />
      </button>
      <button
        type="button"
        className="bg-gradient-to-tr from-red-100 to-white border border-red-200 text-red-500 p-3 rounded-full hover:from-red-200 hover:to-white hover:text-red-600 flex items-center justify-center shadow-lg transition-all duration-200 backdrop-blur-md hover:scale-105 hover:shadow-2xl active:scale-100"
        onClick={handleClearChat}
        disabled={loading}
        title="Limpar Chat"
        style={{ fontSize: 20, boxShadow: '0 2px 8px 0 rgba(239,68,68,0.10)', transition: 'box-shadow 0.2s, transform 0.2s' }}
      >
        <FaTrash />
      </button>
    </form>
  );
}
