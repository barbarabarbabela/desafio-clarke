import { useNavigate } from "react-router-dom";
import Button from "../components/button";
import Input from "../components/input";
import { usePersistentForm } from "../hooks/use-persistent-form";
import { useState } from "react";

export default function ConsumptionForm() {
  const navigate = useNavigate();
  const { formData, updateField } = usePersistentForm();
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    navigate("/results");
  }

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-100 leading-tight">
          Qual é o seu consumo de energia mensal?
        </h2>
        <p className="text-base text-gray-400">Informe o valor em kWh.</p>
      </div>

      <div className="flex flex-col gap-1">
        <Input
          type="number"
          autoFocus
          placeholder="Ex: 350"
          min={0}
          value={formData.consumption ?? ""}
          onChange={(e) => {
            updateField("consumption", Number(e.target.value));
            setError("");
          }}
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>

      <div className="flex flex-col-reverse sm:flex-row gap-5 pt-2">
        <Button
          type="button"
          variant="outline"
          className="py-3 text-base"
          onClick={() => navigate("/form?step=2")}
        >
          Voltar
        </Button>
        <Button
          type="submit"
          className="flex-1 py-3 text-base"
          disabled={!formData.consumption || formData.consumption === 0}
        >
          Calcular
        </Button>
      </div>
    </form>
  );
}
