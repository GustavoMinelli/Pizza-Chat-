import { ReactNode } from "react";
import InfoCard from "./InfoCard";

export default function ChatContainer({ children }: { readonly children: ReactNode }) {
  return (
    <div className="min-h-screen h-full flex flex-col items-center justify-center bg-transparent gap-6">
      {/* Card do Título */}
      <InfoCard
        title="Pizza Chat!"
        icon={<span aria-label="pizza" className="text-6xl">🍕</span>}
        className="mt-8 mb-0 text-center text-4xl font-extrabold flex items-center justify-center"
      />

      {/* Card do Chat */}
      <InfoCard
        className="w-full flex flex-col h-[650px]"
      >
        <div className="flex-1 flex flex-col gap-3 min-h-0">
          {children}
        </div>
      </InfoCard>
      {/* Card do Footer */}
     <InfoCard
        title="Bem-vindo ao Pizza Chat!"
        description="Peça sua pizza, tire dúvidas ou converse com nosso assistente inteligente. Atendimento rápido, prático e saboroso! 🍕"
        className="text-center mb-3 hidden md:flex"
      />

    </div>
  );
}
