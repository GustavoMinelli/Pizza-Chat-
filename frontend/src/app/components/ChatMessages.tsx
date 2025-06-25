import ChatMessageBubble from "./ChatMessageBubble";
import { ChatEmptyState, ChatLoadingState } from "./states/ChatStates";

export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
};

interface ChatMessagesProps {
  messages: Message[];
  loadingHistory: boolean;
  bottomRef: React.RefObject<HTMLDivElement>;
}

export default function ChatMessages({ messages, loadingHistory, bottomRef }: Readonly<ChatMessagesProps>) {
  return (
    <div
      className={`flex-1 overflow-y-auto mb-4 rounded-3xl p-4 flex flex-col gap-2 border border-gray-200 relative backdrop-blur-md shadow-2xl h-full min-h-0 ${messages.length === 0 ? "items-center justify-center" : ""}`}
      style={{
        background: "rgba(255, 255, 255, 0.65)",
        boxShadow: "0 4px 32px 0 rgba(0,0,0,0.10), inset 0 2px 12px 0 rgba(0,0,0,0.08)",
        border: "1.5px solid #e5e7eb"
      }}
    >
      {loadingHistory ? (
        <ChatLoadingState />
      ) : messages.length === 0 ? (
        <ChatEmptyState />
      ) : (
        messages.map((msg) => (
          <ChatMessageBubble key={msg.id} role={msg.role} content={msg.content} createdAt={msg.createdAt} />
        ))
      )}
      <div ref={bottomRef} />
    </div>
  );
}
