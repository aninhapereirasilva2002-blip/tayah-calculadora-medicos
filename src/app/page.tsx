import Link from "next/link";
import Disclaimer from "@/components/Disclaimer";

const provasSociais = [
  {
    titulo: "Clínica de imagem",
    descricao:
      "Economizou R$ 78 mil/ano após reorganização tributária e enquadramento administrativo.",
    metrica: "R$ 78.000",
    rotulo: "economia anual",
  },
  {
    titulo: "Sociedade de anestesiologistas",
    descricao:
      "Reduziu carga tributária em 5,4 pontos percentuais sobre o faturamento bruto.",
    metrica: "-5,4 p.p.",
    rotulo: "carga tributária",
  },
  {
    titulo: "Hospital-dia",
    descricao:
      "Obteve enquadramento administrativo perante a Receita sem necessidade de judicialização.",
    metrica: "0 ações",
    rotulo: "via administrativa",
  },
];

const etapas = [
  {
    numero: "01",
    titulo: "Responda 7 perguntas",
    descricao:
      "Sobre a organização da sua PJ, regime tributário, tipos de serviço prestados e licenças.",
  },
  {
    numero: "02",
    titulo: "Receba o diagnóstico",
    descricao:
      "Em 2 minutos você vê uma estimativa da economia anual potencial e os requisitos do Tema 217.",
  },
  {
    numero: "03",
    titulo: "Fale com a equipe Tayah",
    descricao:
      "Se houver indicação de enquadramento, um advogado retorna em até 1 dia útil para análise documental.",
  },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-tayah-black text-tayah-white">
      {/* Top bar */}
      <header className="border-b border-tayah-white/5">
        <div className="container-tayah flex items-center justify-between py-6">
          <div className="font-serif text-2xl tracking-wide text-tayah-white">
            TAYAH<span className="text-tayah-red">.</span>
          </div>
          <div className="hidden font-sans text-[11px] uppercase tracking-widest text-tayah-white/60 md:block">
            Advogados · Direito Tributário Médico
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(ellipse at 20% 0%, rgba(138,42,43,0.45), transparent 55%), radial-gradient(ellipse at 90% 100%, rgba(138,42,43,0.25), transparent 50%)",
          }}
          aria-hidden
        />

        <div className="container-tayah relative py-20 md:py-32">
          <div className="max-w-3xl">
            <p className="eyebrow mb-8">
              Tayah Advogados · Direito Tributário Médico
            </p>

            <h1 className="font-serif text-5xl leading-[1.05] text-tayah-white md:text-7xl">
              Sua clínica pode pagar até{" "}
              <span className="text-tayah-red">70% menos</span> de IRPJ e CSLL
            </h1>

            <p className="mt-8 max-w-2xl font-sans text-lg leading-relaxed text-tayah-white/75 md:text-xl">
              Médicos organizados em sociedade empresária que prestam serviços
              hospitalares têm direito à equiparação tributária prevista no
              art. 15, §1º, III, "a" da Lei 9.249/95{" "}
              <span className="text-tayah-white/95">(STJ, Tema 217)</span>.
              Descubra em 2 minutos se sua clínica se enquadra.
            </p>

            <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link href="/calculadora" className="btn-primary">
                Fazer minha análise gratuita
                <span aria-hidden>→</span>
              </Link>
              <span className="font-sans text-xs uppercase tracking-widest text-tayah-white/50">
                2 min · sem cadastro inicial · gratuito
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Prova social */}
      <section className="border-t border-tayah-white/5 bg-tayah-gray-900">
        <div className="container-tayah py-20 md:py-24">
          <div className="mb-12 max-w-2xl">
            <p className="eyebrow mb-4">Casos representativos</p>
            <h2 className="font-serif text-3xl leading-tight text-tayah-white md:text-4xl">
              Resultados que a tese pode entregar
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {provasSociais.map((caso) => (
              <article
                key={caso.titulo}
                className="group relative flex flex-col justify-between border border-tayah-white/10 bg-tayah-gray-800 p-8 transition-colors duration-300 hover:border-tayah-red/60"
              >
                <div>
                  <p className="font-sans text-[11px] uppercase tracking-widest text-tayah-white/50">
                    {caso.titulo}
                  </p>
                  <p className="mt-6 font-serif text-4xl text-tayah-red md:text-5xl">
                    {caso.metrica}
                  </p>
                  <p className="mt-1 font-sans text-xs uppercase tracking-widest text-tayah-white/60">
                    {caso.rotulo}
                  </p>
                </div>
                <p className="mt-8 font-sans text-sm leading-relaxed text-tayah-white/75">
                  {caso.descricao}
                </p>
              </article>
            ))}
          </div>

          <p className="mt-8 font-sans text-[11px] leading-relaxed text-tayah-white/40">
            Casos representativos baseados em situações reais de clientes;
            valores e descrições foram generalizados para preservar sigilo
            profissional. Resultados variam conforme análise documental
            individualizada.
          </p>
        </div>
      </section>

      {/* Como funciona */}
      <section className="border-t border-tayah-white/5">
        <div className="container-tayah py-20 md:py-28">
          <div className="mb-16 max-w-2xl">
            <p className="eyebrow mb-4">Como funciona</p>
            <h2 className="font-serif text-3xl leading-tight text-tayah-white md:text-4xl">
              Um diagnóstico tributário em três passos
            </h2>
          </div>

          <div className="grid gap-10 md:grid-cols-3">
            {etapas.map((etapa) => (
              <div key={etapa.numero} className="border-t border-tayah-red/40 pt-6">
                <p className="font-serif text-3xl text-tayah-red">
                  {etapa.numero}
                </p>
                <h3 className="mt-4 font-serif text-2xl text-tayah-white">
                  {etapa.titulo}
                </h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-tayah-white/70">
                  {etapa.descricao}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 flex flex-col items-start gap-4 border-t border-tayah-white/10 pt-12 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md font-sans text-sm text-tayah-white/70">
              Pronto para descobrir o potencial tributário da sua sociedade?
            </p>
            <Link href="/calculadora" className="btn-primary">
              Começar análise
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Base legal */}
      <section className="border-t border-tayah-white/5 bg-tayah-gray-900">
        <div className="container-tayah py-16">
          <div className="grid gap-8 md:grid-cols-2 md:gap-16">
            <div>
              <p className="eyebrow mb-4">Base legal</p>
              <h2 className="font-serif text-2xl text-tayah-white md:text-3xl">
                Equiparação Hospitalar
              </h2>
            </div>
            <ul className="space-y-3 font-sans text-sm leading-relaxed text-tayah-white/70">
              <li>
                <span className="text-tayah-white">Lei 9.249/95</span>, art. 15,
                §1º, III, "a" (IRPJ) e art. 20 (CSLL)
              </li>
              <li>
                <span className="text-tayah-white">STJ Tema 217</span> — REsp
                1.116.399/BA
              </li>
              <li>
                <span className="text-tayah-white">IN RFB 1.234/2012</span> e IN
                RFB 1.700/2017
              </li>
              <li>
                <span className="text-tayah-white">ADI RFB 18/2003</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-tayah-white/5 bg-tayah-black">
        <div className="container-tayah py-12">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="font-serif text-xl tracking-wide text-tayah-white">
                TAYAH<span className="text-tayah-red">.</span>
              </div>
              <p className="mt-2 font-sans text-xs uppercase tracking-widest text-tayah-white/40">
                Advogados
              </p>
            </div>
            <div className="max-w-xl">
              <Disclaimer variant="footer" />
            </div>
          </div>
          <div className="mt-10 flex flex-col gap-4 border-t border-tayah-white/5 pt-6 font-sans text-[11px] uppercase tracking-widest text-tayah-white/40 sm:flex-row sm:items-center sm:justify-between">
            <span>© {new Date().getFullYear()} Tayah Advogados · Direito Tributário · Saúde</span>
            <nav className="flex gap-5">
              <Link
                href="/politica-privacidade"
                className="transition-colors hover:text-tayah-white"
              >
                Política de Privacidade
              </Link>
              <Link
                href="/termos-de-uso"
                className="transition-colors hover:text-tayah-white"
              >
                Termos de Uso
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </main>
  );
}
