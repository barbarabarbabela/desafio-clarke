import { useNavigate } from "react-router-dom";
import Button from "../components/button";
import { TbMoneybagHeart } from "react-icons/tb";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-lg flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-100 leading-tight">
            Descubra quanto você pode economizar em energia
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed">
            Informe seu estado e consumo mensal e compare fornecedores de GD e
            Mercado Livre — com a economia estimada para cada solução.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            className="flex-1 py-4 text-base"
            onClick={() => navigate("/form?step=1")}
            endIcon={TbMoneybagHeart}
          >
            Comece a economizar agora
          </Button>
        </div>
      </div>
    </div>
  );
}
