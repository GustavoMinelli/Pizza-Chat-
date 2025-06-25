import { ReactNode } from "react";

export default function ChatContainer({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-transparent">
      <div
        className="relative flex items-center justify-center mt-8 mb-8"
        style={{ zIndex: 2 }}
      >
        <div className="absolute inset-0 rounded-3xl bg-white/60 border border-gray-200 shadow-xl backdrop-blur-md" style={{ filter: 'blur(2px)' }} />
        <h1
          className="relative text-5xl font-extrabold text-center px-8 py-4 text-gray-800 drop-shadow-xl tracking-tight select-none flex items-center gap-4 animate-fade-in"
          style={{ letterSpacing: 1.5 }}
        >
          <span aria-label="pizza" className="text-6xl mr-2">🍕</span>
          Pizza Chat!
        </h1>
      </div>
      <div className="flex flex-col items-center w-full">
        <div className="w-full max-w-lg min-h-[720px] h-[720px] flex flex-col rounded-[2rem] p-6 bg-white shadow-xl border border-gray-200 mb-4 overflow-hidden">
          <div className="flex-1 flex flex-col gap-3 rounded-full min-h-0">
            {children}
          </div>
        </div>
        <div className="text-center mt-4 mb-0 px-4 w-full flex justify-center">
          <div className="inline-block bg-white/70 border border-gray-200 rounded-xl px-6 py-4 shadow-md backdrop-blur-md">
            <span className="block text-lg font-semibold text-gray-700 mb-1">Bem-vindo ao Pizza Chat!</span>
            <span className="block text-base text-gray-500">Peça sua pizza, tire dúvidas ou converse com nosso assistente inteligente. Atendimento rápido, prático e saboroso! 🍕</span>
          </div>
        </div>
      </div>
    </div>
  );
}
