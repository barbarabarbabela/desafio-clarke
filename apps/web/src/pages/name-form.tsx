import { useNavigate } from "react-router-dom";
import Button from "../components/button";
import Input from "../components/input";
import { MdNavigateNext } from "react-icons/md";
import { usePersistentForm } from "../hooks/use-persistent-form";

export default function NameForm() {
  const navigate = useNavigate();
  const { formData, updateField } = usePersistentForm();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    navigate("/form?step=2");
  }

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-100 leading-tight">
          Qual é o seu nome completo?
        </h2>
      </div>

      <Input
        name="name"
        autoFocus
        value={formData.name}
        onChange={(e) => updateField("name", e.target.value)}
      />

      <div className="flex flex-col-reverse sm:flex-row gap-5 pt-2">
        <Button
          type="button"
          variant="plain"
          className="py-3 text-base"
          onClick={() => navigate("/")}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          className="flex-1 py-3 text-base"
          endIcon={MdNavigateNext}
          disabled={!formData.name}
        >
          Próximo
        </Button>
      </div>
    </form>
  );
}
