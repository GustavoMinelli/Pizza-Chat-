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
  let content;
  if (loadingHistory) {
    content = <ChatLoadingState />;
  } else if (messages.length === 0) {
    content = <ChatEmptyState />;
  } else {
    content = messages.map((msg) => (
      <ChatMessageBubble key={msg.id} role={msg.role} content={msg.content} createdAt={msg.createdAt} />
    ));
  }

  return (
    <div
      className={`flex-1 overflow-y-auto mb-4 rounded-3xl p-4 flex flex-col gap-2 border border-gray-200 relative backdrop-blur-md h-full min-h-0 ${messages.length === 0 ? "items-center justify-center" : ""}`}
      style={{
        background: "rgba(255, 255, 255, 0.65)",
        boxShadow: "inset 0 2px 12px 0 rgba(0,0,0,0.06), inset 0 1px 6px 0 rgba(0,0,0,0.04)",
        border: "1.5px solid #e5e7eb"
      }}
    >
      {content}
      <div ref={bottomRef} />
    </div>
  );
}
