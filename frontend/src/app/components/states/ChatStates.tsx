import { FaSpinner } from "react-icons/fa";

export function ChatEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-2 select-none animate-fade-in">
      <div className="max-w-xs w-full rounded-3xl shadow-2xl px-6 py-8 flex flex-col items-center animate-fade-in border border-white/20 bg-white/10 backdrop-blur-2xl" style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10), 0 1.5px 8px 0 rgba(0,0,0,0.06) inset' }}>
        <span className="text-5xl mb-4 animate-fade-in">🍕</span>
        <p className="text-gray-800 text-center text-base font-normal opacity-80 tracking-wide" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          Nenhuma mensagem por aqui.<br/>
          <span className="text-gray-500 text-sm font-light">Envie sua primeira mensagem para começar o atendimento.</span>
        </p>
      </div>
    </div>
  );
}

export function ChatLoadingState() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-2 select-none animate-fade-in">
      <div className="max-w-xs w-full rounded-3xl shadow-2xl px-6 py-8 flex flex-col items-center animate-fade-in border border-white/20 bg-white/10 backdrop-blur-2xl" style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10), 0 1.5px 8px 0 rgba(0,0,0,0.06) inset' }}>
        <FaSpinner className="text-4xl text-blue-500 animate-spin mb-3 opacity-80" />
        <p className="text-gray-800 text-center text-base font-normal opacity-80 tracking-wide animate-pulse" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          Carregando histórico...<br/>
          <span className="text-gray-500 text-sm font-light">Aguarde um instante.</span>
        </p>
      </div>
    </div>
  );
}
