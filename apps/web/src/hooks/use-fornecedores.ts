import { useQuery } from "@apollo/client/react";
import type { Fornecedor } from "../types/fornecedor.type";
import type { Solucao } from "../types/solucao.type";
import { GET_FORNECEDORES } from "../queries/get-fornecedores";

type RawFornecedor = {
  id: number;
  nome: string;
  logo: string | null;
  descricao: string | null;
  estadoOrigem: string;
  totalClientes: number;
  avaliacaoMedia: number;
  ufsAtendidas: string[];
  solucoes: {
    solucao: string;
    custoKwh: number;
  }[];
};

type GetTodosFornecedoresData = {
  todosFornecedores: RawFornecedor[];
};

function mapToFornecedor(raw: RawFornecedor): Fornecedor {
  return {
    ...raw,
    id: String(raw.id),
    solucoes: raw.solucoes.map(
      (s): Solucao => ({
        ...s,
        solucao: s.solucao as "GD" | "MERCADO_LIVRE",
        custoTotal: 0,
        economia: 0,
        economiaPercentual: 0,
      }),
    ),
  };
}

export function useFornecedores() {
  const { data, loading, error } =
    useQuery<GetTodosFornecedoresData>(GET_FORNECEDORES);

  return {
    fornecedores: (data?.todosFornecedores ?? []).map(mapToFornecedor),
    loading,
    error,
  };
}
