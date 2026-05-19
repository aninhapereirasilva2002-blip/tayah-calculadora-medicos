import Link from "next/link";
import CheckIcon from "@/components/icons/Check";
import ScaleIcon from "@/components/icons/Scale";

const WHATSAPP_HREF =
  "https://wa.me/5521998917757?text=Ol%C3%A1%2C%20vim%20pela%20calculadora%20de%20equipara%C3%A7%C3%A3o%20hospitalar";

const BULLETS = [
  "Análise técnica em minutos",
  "Cálculo de economia tributária estimada",
  "Sem custo · Sem compromisso",
];

const CARDS = [
  {
    valor: "Até 70%",
    label: "Redução em IRPJ + CSLL sobre faturamento",
  },
  {
    valor: "8% / 12%",
    label: "Base reduzida IRPJ / CSLL (vs 32% sem equiparação)",
  },
  {
    valor: "Tema 217",
    label: "STJ — REsp 1.116.399/BA — equiparação hospitalar consolidada",
  },
];

export default function LandingPage() {
  return (
    <main className="bg-tayah-cream">
      <section className="container-tayah py-12 md:py-20">
        <div className="grid gap-12 md:grid-cols-5 md:gap-12 lg:gap-16">
          {/* Coluna esquerda — 60% (3 de 5) */}
          <div className="flex flex-col gap-8 md:col-span-3">
            <span className="inline-flex w-fit items-center gap-2 rounded bg-tayah-red px-4 py-2 font-sans text-[11px] font-semibold uppercase tracking-[2px] text-tayah-white">
              <ScaleIcon className="h-4 w-4" />
              Direito Tributário Médico · 60 anos de tradição
            </span>

            <h1 className="font-serif text-[40px] font-medium leading-[1.05] tracking-tight text-tayah-text-strong md:text-[56px]">
              Sua clínica paga imposto demais? Pode ter direito a até 70%{" "}
              <span className="text-tayah-red">MENOS.</span>
            </h1>

            <p className="font-sans text-base leading-relaxed text-tayah-text-muted md:text-lg">
              Calculadora gratuita desenvolvida pela equipe Tayah Advogados. Em
              2 minutos você descobre se sua clínica se enquadra na equiparação
              hospitalar (Lei 9.249/95, art. 15) e quanto pode economizar em
              IRPJ e CSLL.
            </p>

            <ul className="flex flex-col gap-3">
              {BULLETS.map((texto) => (
                <li key={texto} className="flex items-center gap-3">
                  <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-tayah-green">
                    <CheckIcon className="h-3.5 w-3.5 text-white" />
                  </span>
                  <span className="font-sans text-base text-tayah-text-strong">
                    {texto}
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/calculadora"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-tayah-red px-8 py-4 font-sans text-sm font-semibold text-tayah-white shadow-sm transition-all duration-200 hover:scale-[1.02] hover:bg-tayah-red-dark hover:shadow-md"
              >
                Analisar minha clínica agora
                <span aria-hidden>→</span>
              </Link>
              <Link
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md border-2 border-tayah-red bg-transparent px-8 py-4 font-sans text-sm font-semibold text-tayah-red transition-colors duration-200 hover:bg-tayah-red hover:text-tayah-white"
              >
                Falar com a equipe
              </Link>
            </div>

            <p className="font-sans text-xs text-tayah-text-muted">
              Tayah Advogados · OAB/RJ desde 1965 · Sede em Centro/RJ
            </p>
          </div>

          {/* Coluna direita — 40% (2 de 5) · 3 cards empilhados */}
          <div className="flex flex-col gap-4 md:col-span-2">
            {CARDS.map((card) => (
              <article
                key={card.valor}
                className="rounded-xl border border-tayah-border-card bg-tayah-white p-8 shadow-tayah-card"
              >
                <p className="font-serif text-5xl font-bold leading-none text-tayah-red">
                  {card.valor}
                </p>
                <p className="mt-3 font-sans text-sm leading-relaxed text-tayah-text-muted">
                  {card.label}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
