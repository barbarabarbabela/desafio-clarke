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

  const [
    solarBr,
    energyPlus,
    voltaLivre,
    solNorte,
    ampereX,
    solarTech,
    energiaVerde,
    mercadoLivreBR,
    verdeWatts,
  ] = await db
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
      {
        nome: "SolarTech Energia",
        logo: "https://placehold.co/100x40?text=SolarTech",
        descricao: "Especialistas em geração distribuída solar.",
        estadoOrigem: "SP",
        totalClientes: 1200,
        avaliacaoMedia: "4.70",
      },
      {
        nome: "Energia Verde",
        logo: "https://placehold.co/100x40?text=EnergiaVerde",
        descricao: "Fornecimento de energia limpa para GD e Mercado Livre.",
        estadoOrigem: "MG",
        totalClientes: 850,
        avaliacaoMedia: "4.50",
      },
      {
        nome: "Mercado Livre BR",
        logo: "https://placehold.co/100x40?text=MLBR",
        descricao: "Soluções para grandes consumidores no Mercado Livre.",
        estadoOrigem: "RJ",
        totalClientes: 430,
        avaliacaoMedia: "4.20",
      },
      {
        nome: "Verde Watts",
        logo: "https://placehold.co/100x40?text=VerdeWatts",
        descricao: "Energia renovável com foco no Sul do Brasil.",
        estadoOrigem: "RS",
        totalClientes: 670,
        avaliacaoMedia: "4.80",
      },
    ])
    .returning();
  console.log("✅ Fornecedores inseridos");

  await db.insert(fornecedorSolucoes).values([
    { fornecedorId: solarBr.id, solucao: "GD", custoKwh: "0.6100" },
    { fornecedorId: energyPlus.id, solucao: "GD", custoKwh: "0.6400" },
    {
      fornecedorId: energyPlus.id,
      solucao: "MERCADO_LIVRE",
      custoKwh: "0.6900",
    },
    {
      fornecedorId: voltaLivre.id,
      solucao: "MERCADO_LIVRE",
      custoKwh: "0.6200",
    },
    { fornecedorId: solNorte.id, solucao: "GD", custoKwh: "0.6600" },
    { fornecedorId: ampereX.id, solucao: "MERCADO_LIVRE", custoKwh: "0.6500" },
    { fornecedorId: ampereX.id, solucao: "GD", custoKwh: "0.6800" },
    { fornecedorId: solarTech.id, solucao: "GD", custoKwh: "0.6000" },
    { fornecedorId: energiaVerde.id, solucao: "GD", custoKwh: "0.6300" },
    {
      fornecedorId: energiaVerde.id,
      solucao: "MERCADO_LIVRE",
      custoKwh: "0.6700",
    },
    {
      fornecedorId: mercadoLivreBR.id,
      solucao: "MERCADO_LIVRE",
      custoKwh: "0.6100",
    },
    { fornecedorId: verdeWatts.id, solucao: "GD", custoKwh: "0.5900" },
    {
      fornecedorId: verdeWatts.id,
      solucao: "MERCADO_LIVRE",
      custoKwh: "0.6300",
    },
  ]);
  console.log("✅ Soluções inseridas");

  await db.insert(fornecedorEstados).values([
    { fornecedorId: solarBr.id, uf: "SP" },
    { fornecedorId: solarBr.id, uf: "MG" },
    { fornecedorId: solarBr.id, uf: "RJ" },
    { fornecedorId: energyPlus.id, uf: "MG" },
    { fornecedorId: energyPlus.id, uf: "SP" },
    { fornecedorId: energyPlus.id, uf: "GO" },
    { fornecedorId: voltaLivre.id, uf: "RS" },
    { fornecedorId: voltaLivre.id, uf: "SC" },
    { fornecedorId: voltaLivre.id, uf: "PR" },
    { fornecedorId: solNorte.id, uf: "BA" },
    { fornecedorId: solNorte.id, uf: "GO" },
    { fornecedorId: solNorte.id, uf: "MG" },
    { fornecedorId: ampereX.id, uf: "PR" },
    { fornecedorId: ampereX.id, uf: "SC" },
    { fornecedorId: ampereX.id, uf: "SP" },
    { fornecedorId: solarTech.id, uf: "SP" },
    { fornecedorId: solarTech.id, uf: "MG" },
    { fornecedorId: solarTech.id, uf: "RJ" },
    { fornecedorId: energiaVerde.id, uf: "MG" },
    { fornecedorId: energiaVerde.id, uf: "GO" },
    { fornecedorId: mercadoLivreBR.id, uf: "RJ" },
    { fornecedorId: mercadoLivreBR.id, uf: "SP" },
    { fornecedorId: verdeWatts.id, uf: "RS" },
    { fornecedorId: verdeWatts.id, uf: "SC" },
    { fornecedorId: verdeWatts.id, uf: "PR" },
  ]);
  console.log("✅ Estados inseridos");

  console.log("🎉 Seed concluído!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Erro no seed:", err);
  process.exit(1);
});
