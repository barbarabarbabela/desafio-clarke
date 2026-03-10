import { useQuery } from "@apollo/client/react";
import { GET_UFS } from "../queries/get-ufs";
import Select from "../components/select";
import Button from "../components/button";
import { useNavigate } from "react-router-dom";
import { MdNavigateNext } from "react-icons/md";
import { usePersistentForm } from "../hooks/use-persistent-form";
import { useState } from "react";

export default function StateForm() {
  const navigate = useNavigate();
  const { formData, updateField } = usePersistentForm();
  const [error, setError] = useState("");

  const {
    data,
    loading,
    error: queryError,
  } = useQuery<{ ufsDisponiveis: string[] }>(GET_UFS);

  const options =
    data?.ufsDisponiveis.map((uf) => ({
      value: uf,
      label: uf,
    })) ?? [];

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!formData.state) {
      setError("Por favor, selecione um estado.");
      return;
    }

    navigate("/form?step=3");
  }

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-100 leading-tight">
          Qual é o seu estado?
        </h2>
        <p className="text-base text-gray-400">
          Usaremos essa informação para calcular a sua tarifa base.
        </p>
      </div>

      <div className="flex flex-col gap-1">
        <Select
          placeholder={loading ? "Carregando..." : "Selecione um estado"}
          options={options}
          disabled={loading}
          value={formData.state}
          onChange={(e) => {
            updateField("state", e.target.value);
            setError("");
          }}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        {queryError && (
          <p className="text-sm text-red-500">Erro ao carregar dados.</p>
        )}
      </div>

      <div className="flex flex-col-reverse sm:flex-row gap-5 pt-2">
        <Button
          type="button"
          variant="outline"
          className="py-3 text-base"
          onClick={() => navigate("/form?step=1")}
        >
          Voltar
        </Button>
        <Button
          type="submit"
          className="flex-1 py-3 text-base"
          endIcon={MdNavigateNext}
          disabled={!formData.state}
        >
          Próximo
        </Button>
      </div>
    </form>
  );
}
