import InfoCard from "../InfoCard";
import { FaSpinner } from "react-icons/fa";

export function ChatEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-2 select-none animate-fade-in">
      <InfoCard
        className="max-w-xs w-full"
      >
        <p className="text-gray-800 text-center text-base font-normal opacity-80 tracking-wide">
          Nenhuma mensagem por aqui.<br/>
          <span className="text-gray-500 text-sm font-light">Envie sua primeira mensagem para começar o atendimento.</span>
        </p>
      </InfoCard>
    </div>
  );
}

export function ChatLoadingState() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-2 select-none animate-fade-in">
      <InfoCard
        icon={<FaSpinner className="animate-spin text-gray-500" size={24} />}
        title="Carregando histórico..."
        className="max-w-xs w-full"
      >
        <p className="text-gray-500 text-center text-sm font-light animate-pulse mt-1">
          Aguarde um instante.
        </p>
      </InfoCard>
    </div>
  );
}
