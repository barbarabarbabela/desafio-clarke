import { describe, it, expect } from "vitest";
import { calcularEconomia } from "../src/services/fornecedor.service";

describe("calcularEconomia", () => {
  it("deve calcular o custo total corretamente", () => {
    const result = calcularEconomia(5000, 0.72, 0.58);
    expect(result.custoTotal).toBe(2900);
  });

  it("deve calcular a economia corretamente", () => {
    const result = calcularEconomia(5000, 0.72, 0.58);
    expect(result.economia).toBe(700);
  });

  it("deve calcular a economia percentual corretamente", () => {
    const result = calcularEconomia(5000, 0.72, 0.58);
    expect(result.economiaPercentual).toBe(19.44);
  });

  it("deve retornar economia zero quando custo do fornecedor igual à tarifa base", () => {
    const result = calcularEconomia(5000, 0.72, 0.72);
    expect(result.economia).toBe(0);
    expect(result.economiaPercentual).toBe(0);
  });

  it("deve funcionar com consumo alto", () => {
    const result = calcularEconomia(30000, 0.72, 0.49);
    expect(result.economia).toBe(6900);
  });

  it("deve retornar economia negativa quando fornecedor é mais caro que a tarifa base", () => {
    const result = calcularEconomia(5000, 0.58, 0.72);
    expect(result.economia).toBeLessThan(0);
  });

  it("deve funcionar com consumo mínimo (1 kWh)", () => {
    const result = calcularEconomia(1, 0.72, 0.58);
    expect(result.custoTotal).toBe(0.58);
    expect(result.economia).toBe(0.14);
  });

  it("não deve retornar valores com mais de 2 casas decimais", () => {
    const result = calcularEconomia(3333, 0.72, 0.58);
    const casasEconomia = result.economia.toString().split(".")[1]?.length ?? 0;
    const casasPercentual =
      result.economiaPercentual.toString().split(".")[1]?.length ?? 0;

    expect(casasEconomia).toBeLessThanOrEqual(2);
    expect(casasPercentual).toBeLessThanOrEqual(2);
  });

  it("deve calcular corretamente com tarifa base diferente por estado", () => {
    const resultSP = calcularEconomia(5000, 0.72, 0.58);
    const resultRJ = calcularEconomia(5000, 0.81, 0.58);

    expect(resultRJ.economia).toBeGreaterThan(resultSP.economia);
  });

  it("deve refletir maior economia para fornecedores com menor custo", () => {
    const resultVerdeWatts = calcularEconomia(5000, 0.85, 0.59); // RS
    const resultSolarBr = calcularEconomia(5000, 0.82, 0.61); // SP
    expect(resultVerdeWatts.economiaPercentual).toBeGreaterThan(
      resultSolarBr.economiaPercentual,
    );
  });
});
