import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

export default function Contact() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-lg border border-yellow-100 rounded-3xl p-8 md:p-12 shadow-sm overflow-hidden">
        <div className="flex flex-col gap-2 mb-10">
          <h1 className="text-3xl font-bold text-zinc-100">Fale com a gente</h1>

          <p className="text-zinc-400 text-sm leading-relaxed">
            Tem alguma dúvida ou quer saber mais sobre o marketplace? Entre em
            contato.
          </p>
        </div>

        <div className="flex flex-col gap-4 border-zinc-800">
          {[
            {
              icon: MdEmail,
              label: "E-mail",
              value: "contato@teste.com.br",
            },
            {
              icon: MdPhone,
              label: "Telefone",
              value: "+55 (11) 99999-9999",
            },
            {
              icon: MdLocationOn,
              label: "Endereço",
              value: "Belo Horizonte, MG — Brasil",
            },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
                <Icon className="text-yellow-400" size={16} />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-xs uppercase tracking-widest text-zinc-500">
                  {label}
                </span>
                <span className="text-sm text-zinc-200">{value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
