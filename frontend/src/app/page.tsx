"use client";
import { useEffect, useRef, useState, FormEvent } from "react";
import ChatContainer from "./components/ChatContainer";
import ChatMessages, { Message } from "./components/ChatMessages";
import ChatInput from "./components/ChatInput";

const API_URL = "http://localhost:3001";
const WS_URL = "ws://localhost:3001";

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const ws = useRef<WebSocket | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Carrega histórico inicial
  useEffect(() => {
    setLoadingHistory(true);
    fetch(`${API_URL}/messages`)
      .then(res => res.json())
      .then(data => setMessages(data))
      .finally(() => setLoadingHistory(false));
  }, []);

  // Conecta WebSocket
  useEffect(() => {
    ws.current = new WebSocket(WS_URL);
    ws.current.onmessage = (event) => {
      const newMsgs: Message[] = JSON.parse(event.data);
      setMessages(prev => {
        const ids = new Set(prev.map(m => m.id));
        const filtered = newMsgs.filter(m => !ids.has(m.id));
        return [...prev, ...filtered];
      });
    };
    ws.current.onopen = () => console.log('WebSocket conectado');
    ws.current.onclose = () => console.log('WebSocket desconectado');
    ws.current.onerror = (e) => console.error('WebSocket erro', e);
    return () => ws.current?.close();
  }, []);

  // Scroll automático para o fim
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setLoading(true);
    await fetch(`${API_URL}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: "user", content: input })
    });
    setInput("");
    setLoading(false);
  };

  // Função para limpar o chat (frontend e backend)
  const handleClearChat = async () => {
    await fetch(`${API_URL}/messages`, { method: "DELETE" });
    setMessages([]);
  };

  return (
    <ChatContainer>
      <ChatMessages messages={messages} loadingHistory={loadingHistory} bottomRef={bottomRef} />
      {loading && (
        <div className="text-center text-gray-500 mb-2 animate-pulse">PizzaBot está digitando...</div>
      )}
      <ChatInput
        input={input}
        setInput={setInput}
        loading={loading}
        handleSend={handleSend}
        handleClearChat={handleClearChat}
      />
    </ChatContainer>
  );
}
