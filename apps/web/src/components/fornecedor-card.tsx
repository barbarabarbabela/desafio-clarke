import { MdPeople, MdStar } from "react-icons/md";
import type { Fornecedor } from "../types/fornecedor.type";

interface FornecedorCardProps {
  fornecedor: Fornecedor;
}

export default function FornecedorCard({ fornecedor }: FornecedorCardProps) {
  return (
    <div className="border border-gray-300 rounded-2xl p-6 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-2xl font-bold text-gray-100">
            {fornecedor.nome}
          </span>
          <span className="text-lg text-gray-400 uppercase tracking-wide">
            {fornecedor.estadoOrigem}
          </span>
        </div>
        {fornecedor.logo ? (
          <img
            src={fornecedor.logo}
            alt={fornecedor.nome}
            className="w-20 h-20 rounded-xl object-contain border border-gray-100"
          />
        ) : (
          <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 font-bold text-lg">
            {fornecedor.nome[0]}
          </div>
        )}
      </div>

      {fornecedor.descricao && (
        <p className="text-sm text-gray-400">{fornecedor.descricao}</p>
      )}

      <div className="flex items-center gap-4 text-sm text-gray-400">
        <span className="flex items-center gap-1">
          <MdStar className="text-yellow-400" />
          {fornecedor.avaliacaoMedia.toFixed(1)}
        </span>
        <span className="flex items-center gap-1">
          <MdPeople />
          {fornecedor.totalClientes.toLocaleString("pt-BR")} clientes
        </span>
      </div>
    </div>
  );
}
