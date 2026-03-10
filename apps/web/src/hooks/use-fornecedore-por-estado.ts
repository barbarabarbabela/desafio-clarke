import { useQuery } from "@apollo/client/react";
import { GET_FORNECEDORES_POR_ESTADO } from "../queries/get-fornecedores-por-estado";

type Solucao = {
  solucao: "GD" | "MERCADO_LIVRE";
  custoKwh: number;
  custoTotal: number;
  economia: number;
  economiaPercentual: number;
};

type Fornecedor = {
  id: string;
  nome: string;
  logo: string | null;
  descricao: string | null;
  estadoOrigem: string;
  totalClientes: number;
  avaliacaoMedia: number;
  ufsAtendidas: string[];
  solucoes: Solucao[];
};

export function useFornecedoresPorEstado(uf: string, consumoKwh: number) {
  const { data, loading, error } = useQuery<{ fornecedores: Fornecedor[] }>(
    GET_FORNECEDORES_POR_ESTADO,
    {
      variables: { uf, consumoKwh },
      skip: !uf || !consumoKwh,
    },
  );

  return {
    fornecedores: data?.fornecedores ?? [],
    loading,
    error,
  };
}
