import { useNavigate } from "react-router-dom";
import { usePersistentForm } from "../hooks/use-persistent-form";
import Button from "../components/button";
import { useFornecedoresPorEstado } from "../hooks/use-fornecedore-por-estado";
import type { Fornecedor } from "../types/fornecedor.type";
import type { Solucao } from "../types/solucao.type";
import { formatCurrencyToBRL } from "../utils/format-currency-to-brl";
import FornecedorPorUfCard from "../components/fornecedor-por-uf-card";
import CardSkeleton from "../components/card-skeleton";

const SOLUCAO_LABEL: Record<string, string> = {
  GD: "Geração Distribuída",
  MERCADO_LIVRE: "Mercado Livre",
};

export default function Results() {
  const navigate = useNavigate();
  const { formData, clearForm } = usePersistentForm();
  const { fornecedores, loading, error } = useFornecedoresPorEstado(
    formData.state,
    formData.consumption ?? 0,
  );

  const porSolucao = fornecedores.reduce<
    Record<string, { fornecedor: Fornecedor; solucao: Solucao }[]>
  >((acc, fornecedor) => {
    fornecedor.solucoes.forEach((solucao) => {
      if (!acc[solucao.solucao]) acc[solucao.solucao] = [];
      acc[solucao.solucao].push({ fornecedor, solucao });
    });
    return acc;
  }, {});

  const melhoresPorSolucao = Object.entries(porSolucao).reduce<
    Record<string, number>
  >((acc, [solucao, items]) => {
    acc[solucao] = Math.max(...items.map((i) => i.solucao.economia));
    return acc;
  }, {});

  function handleReiniciar() {
    clearForm();
    navigate("/");
  }

  return (
    <div className="min-h-screen w-full px-6 py-12">
      <div className="max-w-2xl mx-auto flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-100 leading-tight">
              Resultados para {formData.state}
            </h1>
            <p className="text-base text-gray-400 mt-1">
              Consumo de {formData.consumption?.toLocaleString("pt-BR")} kWh/mês
              · {formData.name}
            </p>
          </div>
        </div>

        {loading && <CardSkeleton />}

        {error && (
          <div className="rounded-2xl p-6 text-red-700 font-bold">
            Erro ao carregar fornecedores. Tente novamente.
          </div>
        )}

        {!loading &&
          !error &&
          Object.entries(porSolucao).map(([solucao, items]) => (
            <div key={solucao} className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-100">
                  {SOLUCAO_LABEL[solucao] ?? solucao}
                </h2>
                <span className="text-sm text-gray-400">
                  Melhor economia:{" "}
                  <span className="font-semibold text-green-700">
                    {formatCurrencyToBRL(melhoresPorSolucao[solucao])}
                  </span>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {items
                  .sort((a, b) => b.solucao.economia - a.solucao.economia)
                  .map(({ fornecedor, solucao: s }) => (
                    <FornecedorPorUfCard
                      key={`${fornecedor.id}-${s.solucao}`}
                      fornecedor={fornecedor}
                      solucao={s}
                    />
                  ))}
              </div>
            </div>
          ))}

        {!loading && !error && Object.keys(porSolucao).length === 0 && (
          <div className="bg-white border border-gray-100 rounded-2xl p-8 text-center text-gray-400">
            Nenhum fornecedor encontrado para este estado e consumo.
          </div>
        )}

        <div className="pt-4">
          <Button className="w-full py-4 text-base" onClick={handleReiniciar}>
            Fazer nova simulação
          </Button>
        </div>
      </div>
    </div>
  );
}
