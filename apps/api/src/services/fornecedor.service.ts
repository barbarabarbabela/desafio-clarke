import {
  buscarFornecedoresComSolucoes,
  buscarTarifaBase,
  buscarTodasUfsBrasil,
  buscarTodosFornecedores,
  buscarUfsDoFornecedor,
} from "../repositories/fornecedor.repository";

export type SolucaoComCalculo = {
  solucao: string;
  custoKwh: number;
  consumoMinimoKwh: number;
  consumoMaximoKwh: number | null;
  custoTotal: number;
  economia: number;
  economiaPercentual: number;
};

export type FornecedorComCalculo = {
  id: number;
  nome: string;
  logo: string | null;
  descricao: string | null;
  estadoOrigem: string;
  totalClientes: number;
  avaliacaoMedia: number;
  solucoes: SolucaoComCalculo[];
  ufsAtendidas: string[];
};

export type ResumoSolucao = {
  solucao: string;
  melhorEconomia: number;
  melhorFornecedor: string;
};

export function calcularEconomia(
  consumoKwh: number,
  tarifaBase: number,
  custoKwh: number,
) {
  const custoBase = consumoKwh * tarifaBase;
  const custoFornecedor = consumoKwh * custoKwh;
  const economia = custoBase - custoFornecedor;
  const economiaPercentual = (economia / custoBase) * 100;

  return {
    custoTotal: Math.round(custoFornecedor * 100) / 100,
    economia: Math.round(economia * 100) / 100,
    economiaPercentual: Math.round(economiaPercentual * 100) / 100,
  };
}

export async function listarFornecedores(
  uf: string,
  consumoKwh: number,
): Promise<FornecedorComCalculo[]> {
  const tarifaBase = await buscarTarifaBase(uf);
  const lista = await buscarFornecedoresComSolucoes(uf, consumoKwh);

  const resultado = await Promise.all(
    lista.map(async (f) => {
      const ufsAtendidas = await buscarUfsDoFornecedor(f.id);

      const solucoes: SolucaoComCalculo[] = f._solucoes.map((s: any) => ({
        solucao: s.solucao,
        custoKwh: Number(s.custoKwh),
        ...calcularEconomia(consumoKwh, tarifaBase, Number(s.custoKwh)),
      }));

      return {
        id: f.id,
        nome: f.nome,
        logo: f.logo,
        descricao: f.descricao,
        estadoOrigem: f.estadoOrigem,
        totalClientes: f.totalClientes,
        avaliacaoMedia: Number(f.avaliacaoMedia),
        solucoes,
        ufsAtendidas,
      };
    }),
  );

  return resultado;
}

export async function listarUfsDisponiveis(): Promise<string[]> {
  return buscarTodasUfsBrasil();
}

export async function listarResumoSolucoes(
  uf: string,
  consumoKwh: number,
): Promise<ResumoSolucao[]> {
  const fornecedoresList = await listarFornecedores(uf, consumoKwh);

  const mapa = new Map<string, { economia: number; nomeFornecedor: string }>();

  for (const fornecedor of fornecedoresList) {
    for (const solucao of fornecedor.solucoes) {
      const atual = mapa.get(solucao.solucao);
      if (!atual || solucao.economia > atual.economia) {
        mapa.set(solucao.solucao, {
          economia: solucao.economia,
          nomeFornecedor: fornecedor.nome,
        });
      }
    }
  }

  return Array.from(mapa.entries()).map(
    ([solucao, { economia, nomeFornecedor }]) => ({
      solucao,
      melhorEconomia: economia,
      melhorFornecedor: nomeFornecedor,
    }),
  );
}

export async function listarTodosFornecedores(): Promise<
  FornecedorComCalculo[]
> {
  const lista = await buscarTodosFornecedores();

  const resultado = await Promise.all(
    lista.map(async (f) => {
      const ufsAtendidas = await buscarUfsDoFornecedor(f.id);

      const solucoes: SolucaoComCalculo[] = f._solucoes.map((s: any) => ({
        solucao: s.solucao,
        custoKwh: Number(s.custoKwh),
        consumoMinimoKwh: Number(s.consumoMinimoKwh),
        consumoMaximoKwh: s.consumoMaximoKwh
          ? Number(s.consumoMaximoKwh)
          : null,
        custoTotal: 0,
        economia: 0,
        economiaPercentual: 0,
      }));

      return {
        id: f.id,
        nome: f.nome,
        logo: f.logo,
        descricao: f.descricao,
        estadoOrigem: f.estadoOrigem,
        totalClientes: f.totalClientes,
        avaliacaoMedia: Number(f.avaliacaoMedia),
        solucoes,
        ufsAtendidas,
      };
    }),
  );

  return resultado;
}
