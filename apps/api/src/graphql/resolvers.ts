import {
  listarFornecedores,
  listarUfsDisponiveis,
  listarResumoSolucoes,
} from "../services/fornecedor.service";

export const resolvers = {
  Query: {
    fornecedores: (
      _: any,
      { uf, consumoKwh }: { uf: string; consumoKwh: number },
    ) => listarFornecedores(uf, consumoKwh),

    ufsDisponiveis: () => listarUfsDisponiveis(),

    resumoSolucoes: (
      _: any,
      { uf, consumoKwh }: { uf: string; consumoKwh: number },
    ) => listarResumoSolucoes(uf, consumoKwh),
  },
};
