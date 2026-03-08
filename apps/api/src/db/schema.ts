import {
  pgTable,
  serial,
  varchar,
  numeric,
  text,
  pgEnum,
  integer,
} from "drizzle-orm/pg-core";

export const solucaoEnum = pgEnum("solucao", ["GD", "MERCADO_LIVRE"]);

export const fornecedores = pgTable("fornecedores", {
  id: serial("id").primaryKey(),
  nome: varchar("nome", { length: 100 }).notNull(),
  logo: text("logo"),
  descricao: text("descricao"),
  estadoOrigem: varchar("estado_origem", { length: 2 }).notNull(),
  totalClientes: integer("total_clientes").notNull().default(0),
  avaliacaoMedia: numeric("avaliacao_media", { precision: 3, scale: 2 })
    .notNull()
    .default("0"),
});

export const fornecedorSolucoes = pgTable("fornecedor_solucoes", {
  id: serial("id").primaryKey(),
  fornecedorId: serial("fornecedor_id").references(() => fornecedores.id),
  solucao: solucaoEnum("solucao").notNull(),
  custoKwh: numeric("custo_kwh", { precision: 8, scale: 4 }).notNull(),
});

export const fornecedorEstados = pgTable("fornecedor_estados", {
  id: serial("id").primaryKey(),
  fornecedorId: serial("fornecedor_id").references(() => fornecedores.id),
  uf: varchar("uf", { length: 2 }).notNull(),
});

export const tarifasBase = pgTable("tarifas_base", {
  id: serial("id").primaryKey(),
  uf: varchar("uf", { length: 2 }).notNull().unique(),
  tarifaKwh: numeric("tarifa_kwh", { precision: 8, scale: 4 }).notNull(),
});
