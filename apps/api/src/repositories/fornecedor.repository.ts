import { db } from "../db";
import {
  fornecedores,
  fornecedorSolucoes,
  fornecedorEstados,
  tarifasBase,
} from "../db/schema";
import { eq, and, lte, gte, or, isNull, inArray } from "drizzle-orm";

export async function buscarTarifaBase(uf: string): Promise<number> {
  const result = await db
    .select({ tarifaKwh: tarifasBase.tarifaKwh })
    .from(tarifasBase)
    .where(eq(tarifasBase.uf, uf.toUpperCase()))
    .limit(1);

  return result.length > 0 ? Number(result[0].tarifaKwh) : 0.75;
}

export async function buscarUfsDisponiveis(): Promise<string[]> {
  const result = await db
    .selectDistinct({ uf: fornecedorEstados.uf })
    .from(fornecedorEstados)
    .orderBy(fornecedorEstados.uf);

  return result.map((r) => r.uf);
}

export async function buscarUfsDoFornecedor(
  fornecedorId: number,
): Promise<string[]> {
  const result = await db
    .select({ uf: fornecedorEstados.uf })
    .from(fornecedorEstados)
    .where(eq(fornecedorEstados.fornecedorId, fornecedorId));

  return result.map((r) => r.uf);
}

export async function buscarFornecedoresComSolucoes(
  uf: string,
  consumoKwh: number,
) {
  const estados = await db
    .select({ fornecedorId: fornecedorEstados.fornecedorId })
    .from(fornecedorEstados)
    .where(eq(fornecedorEstados.uf, uf.toUpperCase()));

  if (estados.length === 0) return [];

  const ids = estados.map((e) => e.fornecedorId);

  const resultado = await db
    .select({ fornecedor: fornecedores, solucao: fornecedorSolucoes })
    .from(fornecedores)
    .innerJoin(
      fornecedorSolucoes,
      eq(fornecedorSolucoes.fornecedorId, fornecedores.id),
    );

  const mapa = new Map<number, any>();
  for (const row of resultado) {
    if (!mapa.has(row.fornecedor.id)) {
      mapa.set(row.fornecedor.id, { ...row.fornecedor, _solucoes: [] });
    }
    mapa.get(row.fornecedor.id)._solucoes.push(row.solucao);
  }

  return Array.from(mapa.values());
}
