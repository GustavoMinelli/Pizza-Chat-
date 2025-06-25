"use client";
import { useEffect, useRef, useState } from "react";

const API_URL = "http://localhost:3001";
const WS_URL = "ws://localhost:3001";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const ws = useRef<WebSocket | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Carrega histórico inicial
  useEffect(() => {
    fetch(`${API_URL}/messages`)
      .then(res => res.json())
      .then(data => setMessages(data));
  }, []);

  // Conecta WebSocket
  useEffect(() => {
    ws.current = new WebSocket(WS_URL);
    ws.current.onmessage = (event) => {
      const newMsgs: Message[] = JSON.parse(event.data);
      setMessages(prev => [...prev, ...newMsgs]);
    };
    return () => ws.current?.close();
  }, []);

  // Scroll automático para o fim
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    await fetch(`${API_URL}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: "user", content: input })
    });
    setInput("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-center mt-10">Pizza Chat</h1>
      <div className="w-full max-w-md flex-1 flex flex-col border rounded-lg p-4 bg-white shadow mt-10">
        <div className="flex-1 h-96 overflow-y-auto mb-4 bg-gray-50 rounded p-2">
          {messages.length === 0 ? (
            <p className="text-gray-400 text-center">No messages yet.</p>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className={`mb-2 text-gray-800 ${msg.role === "user" ? "text-right" : "text-left"}`}>
                <span className={msg.role === "user" ? "bg-blue-100 px-2 py-1 rounded" : "bg-green-100 px-2 py-1 rounded"}>
                  <b>{msg.role === "user" ? "Você" : "PizzaBot"}:</b> {msg.content}
                </span>
              </div>
            ))
          )}
          <div ref={bottomRef} />
        </div>
        <form onSubmit={handleSend} className="flex gap-2">
          <input
            type="text"
            className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring"
            placeholder="Digite sua mensagem..."
            value={input}
            onChange={e => setInput(e.target.value)}
            autoFocus
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Enviar
          </button>
        </form>
      </div>
      <p className="text-center mt-5 text-gray-500">
        Bem-vindo ao Pizza Chat! Seu atendimento automatizado com IA.
      </p>
    </div>
  );
}
