import "dotenv/config";
import { db } from "./index";
import {
  fornecedores,
  fornecedorSolucoes,
  fornecedorEstados,
  tarifasBase,
} from "../db/schema";

async function seed() {
  console.log("🌱 Iniciando seed...");

  await db.delete(fornecedorEstados);
  await db.delete(fornecedorSolucoes);
  await db.delete(fornecedores);
  await db.delete(tarifasBase);
  console.log("🧹 Tabelas limpas");

  // Tarifas base por estado (R$/kWh)
  await db.insert(tarifasBase).values([
    { uf: "SP", tarifaKwh: "0.8200" },
    { uf: "RJ", tarifaKwh: "0.9100" },
    { uf: "MG", tarifaKwh: "0.7800" },
    { uf: "RS", tarifaKwh: "0.8500" },
    { uf: "PR", tarifaKwh: "0.7600" },
    { uf: "SC", tarifaKwh: "0.7400" },
    { uf: "BA", tarifaKwh: "0.8800" },
    { uf: "GO", tarifaKwh: "0.8000" },
  ]);
  console.log("✅ Tarifas base inseridas");

  // Fornecedores
  const [solarBr, energyPlus, voltaLivre, solNorte, ampereX] = await db
    .insert(fornecedores)
    .values([
      {
        nome: "SolarBR",
        logo: "https://placehold.co/100x100?text=SolarBR",
        descricao:
          "Especialista em geração distribuída para grandes consumidores.",
        estadoOrigem: "SP",
        totalClientes: 1240,
        avaliacaoMedia: "4.70",
      },
      {
        nome: "EnergyPlus",
        logo: "https://placehold.co/100x100?text=EnergyPlus",
        descricao: "Soluções completas em mercado livre e GD.",
        estadoOrigem: "MG",
        totalClientes: 870,
        avaliacaoMedia: "4.50",
      },
      {
        nome: "VoltaLivre",
        logo: "https://placehold.co/100x100?text=VoltaLivre",
        descricao: "Pioneira no mercado livre de energia no Sul do Brasil.",
        estadoOrigem: "RS",
        totalClientes: 530,
        avaliacaoMedia: "4.30",
      },
      {
        nome: "SolNorte",
        logo: "https://placehold.co/100x100?text=SolNorte",
        descricao: "Energia solar acessível para o Nordeste e Centro-Oeste.",
        estadoOrigem: "BA",
        totalClientes: 410,
        avaliacaoMedia: "4.60",
      },
      {
        nome: "AmpereX",
        logo: "https://placehold.co/100x100?text=AmpereX",
        descricao: "Tecnologia e eficiência no mercado livre.",
        estadoOrigem: "PR",
        totalClientes: 695,
        avaliacaoMedia: "4.20",
      },
    ])
    .returning();
  console.log("✅ Fornecedores inseridos");

  // Soluções por fornecedor (custoKwh menor que a tarifa base = economia garantida)
  await db.insert(fornecedorSolucoes).values([
    // SolarBR — GD em SP e MG
    { fornecedorId: solarBr.id, solucao: "GD", custoKwh: "0.6100" },
    // EnergyPlus — GD e Mercado Livre
    { fornecedorId: energyPlus.id, solucao: "GD", custoKwh: "0.6400" },
    {
      fornecedorId: energyPlus.id,
      solucao: "MERCADO_LIVRE",
      custoKwh: "0.6900",
    },
    // VoltaLivre — Mercado Livre no Sul
    {
      fornecedorId: voltaLivre.id,
      solucao: "MERCADO_LIVRE",
      custoKwh: "0.6200",
    },
    // SolNorte — GD na BA e GO
    { fornecedorId: solNorte.id, solucao: "GD", custoKwh: "0.6600" },
    // AmpereX — Mercado Livre no PR, SC e SP
    { fornecedorId: ampereX.id, solucao: "MERCADO_LIVRE", custoKwh: "0.6500" },
    { fornecedorId: ampereX.id, solucao: "GD", custoKwh: "0.6800" },
  ]);
  console.log("✅ Soluções inseridas");

  // Estados atendidos por fornecedor
  await db.insert(fornecedorEstados).values([
    // SolarBR
    { fornecedorId: solarBr.id, uf: "SP" },
    { fornecedorId: solarBr.id, uf: "MG" },
    { fornecedorId: solarBr.id, uf: "RJ" },
    // EnergyPlus
    { fornecedorId: energyPlus.id, uf: "MG" },
    { fornecedorId: energyPlus.id, uf: "SP" },
    { fornecedorId: energyPlus.id, uf: "GO" },
    // VoltaLivre
    { fornecedorId: voltaLivre.id, uf: "RS" },
    { fornecedorId: voltaLivre.id, uf: "SC" },
    { fornecedorId: voltaLivre.id, uf: "PR" },
    // SolNorte
    { fornecedorId: solNorte.id, uf: "BA" },
    { fornecedorId: solNorte.id, uf: "GO" },
    { fornecedorId: solNorte.id, uf: "MG" },
    // AmpereX
    { fornecedorId: ampereX.id, uf: "PR" },
    { fornecedorId: ampereX.id, uf: "SC" },
    { fornecedorId: ampereX.id, uf: "SP" },
  ]);
  console.log("✅ Estados inseridos");

  console.log("🎉 Seed concluído!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Erro no seed:", err);
  process.exit(1);
});
