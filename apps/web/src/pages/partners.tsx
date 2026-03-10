import CardSkeleton from "../components/card-skeleton";
import FornecedorCard from "../components/fornecedor-card";
import { useFornecedores } from "../hooks/use-fornecedores";

export default function Partners() {
  const { fornecedores, loading, error } = useFornecedores();

  return (
    <div className="min-h-screen w-full px-6 py-12">
      <div className="max-w-2xl mx-auto flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-100 leading-tight">
              Parceiros
            </h1>
            <p className="text-base text-gray-400 mt-1">
              Conheça todos os fornecedores disponíveis na plataforma
            </p>
          </div>
        </div>

        {loading && <CardSkeleton />}

        {error && (
          <div className="rounded-2xl p-6 text-red-700 font-bold">
            Erro ao carregar fornecedores. Tente novamente.
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fornecedores.map((fornecedor) => (
              <FornecedorCard key={fornecedor.id} fornecedor={fornecedor} />
            ))}
          </div>
        )}

        {!loading && !error && fornecedores.length === 0 && (
          <div className="rounded-2xl p-8 text-center text-gray-400">
            Nenhum parceiro cadastrado.
          </div>
        )}
      </div>
    </div>
  );
}
