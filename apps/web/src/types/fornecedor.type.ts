import type { Solucao } from "./solucao.type";

export type Fornecedor = {
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
