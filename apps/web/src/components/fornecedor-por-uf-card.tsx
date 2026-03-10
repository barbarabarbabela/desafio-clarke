import { MdPeople, MdStar } from "react-icons/md";
import { formatCurrencyToBRL } from "../utils/format-currency-to-brl";
import type { Fornecedor } from "../types/fornecedor.type";
import type { Solucao } from "../types/solucao.type";
import Button from "./button";

interface FornecedorCardProps {
  fornecedor: Fornecedor;
  solucao: Solucao;
}

export default function FornecedorPorUfCard({
  fornecedor,
  solucao,
}: FornecedorCardProps) {
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

      <div className=" rounded-xl px-4 py-3 flex flex-col gap-1">
        <span className="text-xs text-gray-400 uppercase tracking-wide">
          Economia estimada
        </span>
        <span className="text-3xl font-bold text-green-500">
          {formatCurrencyToBRL(solucao.economia)}
        </span>
        <span className="text-sm text-gray-400">
          {solucao.economiaPercentual.toFixed(1)}% de economia ·{" "}
          {formatCurrencyToBRL(solucao.custoTotal)}/mês
        </span>
      </div>

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

      <Button variant="outline">Selecionar</Button>
    </div>
  );
}
