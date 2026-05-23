import Link from "next/link";
import CalculadoraInline from "@/components/CalculadoraInline";
import Faq from "@/components/landing/Faq";
import MetricsBar from "@/components/landing/MetricsBar";
import SectionEyebrow from "@/components/landing/SectionEyebrow";
import CheckIcon from "@/components/icons/Check";
import ScaleIcon from "@/components/icons/Scale";

const WHATSAPP_HREF =
  "https://wa.me/5521972473104?text=Ol%C3%A1%2C%20vim%20pela%20landing%20de%20equipara%C3%A7%C3%A3o%20hospitalar%20e%20quero%20agendar%20uma%20an%C3%A1lise%20gratuita";

const HERO_BULLETS = [
  "Mesma tese já reconhecida pelo STJ em recurso repetitivo (Tema 217)",
  "Aplica-se a clínicas de imagem, laboratórios, centros cirúrgicos, day-clinics e mais",
  "Possível recuperar o que foi pago a maior nos últimos 5 anos",
];

const HERO_CARDS = [
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

const CENARIOS = [
  {
    titulo: "Clínica que fatura R$ 50 mil/mês",
    valor: "~R$ 32 mil/ano",
    descricao: "de economia potencial com a equiparação.",
  },
  {
    titulo: "Clínica que fatura R$ 100 mil/mês",
    valor: "~R$ 65 mil/ano",
    descricao: "deixados de recolher legalmente em IRPJ e CSLL.",
  },
  {
    titulo: "Centro de imagem com R$ 300 mil/mês",
    valor: "~R$ 195 mil/ano",
    descricao: "que poderiam estar no caixa da operação.",
  },
  {
    titulo: "Recuperação retroativa",
    valor: "5 anos",
    descricao: "do que foi pago a maior pode somar centenas de milhares.",
  },
  {
    titulo: "Cada mês sem equiparação",
    valor: "≈ 5,4%",
    descricao: "do faturamento que sai do caixa e não volta.",
  },
  {
    titulo: "Compounding",
    valor: "Anos",
    descricao:
      "de tributação cheia se acumulam: o custo de adiar é alto e silencioso.",
  },
];

const PASSOS = [
  {
    numero: "01",
    titulo: "Análise documental",
    descricao:
      "Avaliamos contrato social, alvarás, notas fiscais, CNAE e estrutura física para confirmar o enquadramento como serviço hospitalar.",
  },
  {
    numero: "02",
    titulo: "Enquadramento",
    descricao:
      "Conduzimos o pedido administrativo junto à Receita Federal ou, quando necessário, ingressamos com a medida judicial cabível.",
  },
  {
    numero: "03",
    titulo: "Economia + recuperação",
    descricao:
      "A base reduzida passa a valer dali em diante e buscamos a restituição do que foi pago a maior nos últimos 5 anos.",
  },
];

const RAZOES = [
  {
    titulo: "65 anos de tradição",
    descricao:
      "Três gerações da família Tayah dedicadas ao direito brasileiro desde 1961.",
  },
  {
    titulo: "Especialização em saúde",
    descricao:
      "Atendimento dedicado a médicos, clínicas, hospitais e operadoras — entendemos a realidade do setor.",
  },
  {
    titulo: "Equipe tributária senior",
    descricao:
      "Time multidisciplinar em direito tributário com foco em teses consolidadas no STJ e STF.",
  },
  {
    titulo: "Aliança Jurídica Nacional",
    descricao:
      "Mais de 30 escritórios conveniados em todo o Brasil para atender clientes em qualquer estado.",
  },
  {
    titulo: "Convênios institucionais",
    descricao:
      "Conveniados com a Aeronáutica (FAB, desde 2002) e Exército Brasileiro (desde 2004).",
  },
  {
    titulo: "Certificações independentes",
    descricao:
      "Reconhecidos por DNA Advocacia, AB2L, GPTW e The Lawyers Global.",
  },
];

const SELOS = [
  { titulo: "DNA Advocacia", periodo: "2024 · 2025 · 2026" },
  { titulo: "AB2L", periodo: "2025 · 2026" },
  { titulo: "GPTW", periodo: "2026" },
  { titulo: "The Lawyers Global", periodo: "Reconhecimento internacional" },
  { titulo: "FAB", periodo: "Conveniado desde 2002" },
  { titulo: "Exército Brasileiro", periodo: "Conveniado desde 2004" },
];

const FAQ_ITEMS = [
  {
    pergunta: "Minha clínica se enquadra como “serviço hospitalar”?",
    resposta:
      "O STJ, no Tema 217 (REsp 1.116.399/BA), definiu que serviços hospitalares são os ligados à promoção da saúde com estrutura compatível — não apenas internação. Clínicas de imagem, laboratórios, centros cirúrgicos, day-clinics, oncologia, hemodiálise, entre outros, costumam se enquadrar. A análise final depende de documentação e da estrutura específica.",
  },
  {
    pergunta: "Preciso entrar na justiça ou dá pra fazer administrativamente?",
    resposta:
      "Sempre que possível, buscamos o caminho administrativo junto à Receita Federal, que é mais rápido e menos custoso. A via judicial é acionada quando há resistência fiscal ou necessidade de modular efeitos retroativos. A escolha depende do caso concreto.",
  },
  {
    pergunta: "Consigo recuperar o que já paguei a mais?",
    resposta:
      "Sim. A prescrição é de 5 anos. Reconhecida a equiparação, é possível pedir a restituição (ou compensação) do que foi pago a maior nesse período, observados os requisitos legais e a forma escolhida (administrativa ou judicial).",
  },
  {
    pergunta: "Sou médico pessoa física (sem PJ) — tenho direito?",
    resposta:
      "A equiparação hospitalar (Lei 9.249/95) pressupõe sociedade empresária no Lucro Presumido. Médicos como pessoa física, autônomos ou em pró-labore, em regra, não acessam diretamente a tese — mas a estruturação societária correta pode abrir esse caminho.",
  },
  {
    pergunta: "Quanto tempo demora para obter a equiparação?",
    resposta:
      "Casos administrativos podem ser resolvidos em poucos meses. Casos judiciais variam conforme a vara e a complexidade. Em qualquer cenário, a economia futura passa a valer assim que reconhecida — e a recuperação retroativa segue depois.",
  },
  {
    pergunta: "E a Reforma Tributária (EC 132/2023) muda isso?",
    resposta:
      "A reforma altera principalmente PIS/Cofins/ICMS/ISS (substituídos por CBS e IBS), e não afeta diretamente a base presumida de IRPJ/CSLL discutida aqui. Ainda assim, há janela relevante para aproveitar a equiparação no modelo atual enquanto a transição ocorre.",
  },
  {
    pergunta: "Quais documentos preciso reunir?",
    resposta:
      "Em geral: contrato social atualizado, alvará de funcionamento, licença sanitária, CNAE, notas fiscais dos últimos 12 meses, DRE/balanço recente e, quando houver, fotos/plantas da estrutura. Na análise inicial gratuita orientamos exatamente o que aplicar ao seu caso.",
  },
];

export default function LandingPage() {
  return (
    <main className="bg-tayah-cream">
      {/* ─────────────────────────────────────
          HERO
          ───────────────────────────────────── */}
      <section className="container-tayah py-12 md:py-20">
        <div className="grid gap-12 md:grid-cols-5 md:gap-12 lg:gap-16">
          <div className="flex flex-col gap-8 md:col-span-3">
            <span className="inline-flex w-fit items-center gap-2 rounded bg-tayah-red px-4 py-2 font-sans text-[11px] font-semibold uppercase tracking-[2px] text-tayah-white">
              <ScaleIcon className="h-4 w-4" />
              § Direito Tributário Médico
            </span>

            <h1 className="font-serif text-[40px] font-medium leading-[1.05] tracking-tight text-tayah-text-strong md:text-[56px]">
              Sua clínica ou consultório paga imposto demais? Você pode pagar
              até 70% <span className="text-tayah-red">MENOS</span> — de forma
              100% legal.
            </h1>

            <p className="font-sans text-base leading-relaxed text-tayah-text-muted md:text-lg">
              Médicos e clínicas organizados como sociedade empresária que
              prestam serviços hospitalares têm direito à equiparação tributária
              da Lei 9.249/95 (STJ, Tema 217): a base de cálculo do IRPJ cai de
              32% para 8%, e a da CSLL para 12%. Na prática, a carga de IRPJ +
              CSLL pode cair de 7,68% para 2,28% do faturamento.
            </p>

            <ul className="flex flex-col gap-3">
              {HERO_BULLETS.map((texto) => (
                <li key={texto} className="flex items-start gap-3">
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
              <a
                href="#calculadora"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-tayah-red px-8 py-4 font-sans text-sm font-semibold text-tayah-white shadow-sm transition-all duration-200 hover:scale-[1.02] hover:bg-tayah-red-dark hover:shadow-md"
              >
                Calcular minha economia agora
                <span aria-hidden>→</span>
              </a>
              <Link
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md border-2 border-tayah-red bg-transparent px-8 py-4 font-sans text-sm font-semibold text-tayah-red transition-colors duration-200 hover:bg-tayah-red hover:text-tayah-white"
              >
                Falar com um especialista
              </Link>
            </div>

            <p className="font-sans text-xs text-tayah-text-muted">
              Análise inicial gratuita · 65 anos de tradição · OAB/RJ desde 1961
            </p>
          </div>

          <div className="flex flex-col gap-4 md:col-span-2">
            {HERO_CARDS.map((card) => (
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

      <MetricsBar />

      {/* ─────────────────────────────────────
          § 01 · O PROBLEMA
          ───────────────────────────────────── */}
      <section className="container-tayah py-16 md:py-24">
        <div className="max-w-3xl">
          <SectionEyebrow numero="01" texto="O problema" />
          <h2 className="font-serif text-3xl font-medium leading-tight text-tayah-text-strong md:text-5xl">
            A maioria das clínicas paga imposto como se fosse uma empresa comum
            — e perde dinheiro todo mês.
          </h2>
          <div className="mt-8 space-y-4 font-sans text-base leading-relaxed text-tayah-text-muted md:text-lg">
            <p>
              No Lucro Presumido, serviços profissionais são tributados sobre
              base de 32%, resultando em <strong>7,68% de IRPJ + CSLL</strong>{" "}
              sobre o faturamento. É o regime aplicado por padrão à grande
              maioria das sociedades médicas que não conhecem a tese.
            </p>
            <p>
              Mas serviços hospitalares têm direito à base reduzida de{" "}
              <strong>8% (IRPJ) e 12% (CSLL)</strong>, fazendo a carga total cair
              para <strong className="text-tayah-red">2,28%</strong> do
              faturamento.
            </p>
            <p>
              A diferença, mês após mês, representa dezenas ou centenas de
              milhares de reais por ano que poderiam ficar no caixa da clínica —
              para investir em equipamentos, equipe, expansão ou simplesmente
              em distribuição de lucros.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────
          § 02 · AS CONSEQUÊNCIAS
          ───────────────────────────────────── */}
      <section className="bg-tayah-cream-deep/40">
        <div className="container-tayah py-16 md:py-24">
          <div className="max-w-3xl">
            <SectionEyebrow numero="02" texto="O que está em jogo" />
            <h2 className="font-serif text-3xl font-medium leading-tight text-tayah-text-strong md:text-5xl">
              Quanto sua clínica deixa na mesa por ano.
            </h2>
            <p className="mt-6 font-sans text-base leading-relaxed text-tayah-text-muted md:text-lg">
              Cenários reais — calculados sobre a diferença entre 7,68% e 2,28%
              da carga de IRPJ + CSLL sobre o faturamento bruto.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {CENARIOS.map((c) => (
              <article
                key={c.titulo}
                className="rounded-xl border border-tayah-border-card bg-tayah-white p-6 shadow-tayah-card md:p-7"
              >
                <p className="font-sans text-xs font-semibold uppercase tracking-wider text-tayah-text-muted">
                  {c.titulo}
                </p>
                <p className="mt-3 font-serif text-3xl font-semibold leading-tight text-tayah-red md:text-4xl">
                  {c.valor}
                </p>
                <p className="mt-3 font-sans text-sm leading-relaxed text-tayah-text-muted">
                  {c.descricao}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <a
              href="#calculadora"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-tayah-red px-8 py-4 font-sans text-sm font-semibold text-tayah-white shadow-sm transition-all duration-200 hover:scale-[1.02] hover:bg-tayah-red-dark hover:shadow-md"
            >
              Quero saber quanto minha clínica perde — Calcular agora
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────
          § 03 · A TESE (DESCOBERTA)
          ───────────────────────────────────── */}
      <section className="container-tayah py-16 md:py-24">
        <div className="max-w-3xl">
          <SectionEyebrow numero="03" texto="O fundamento jurídico" />
          <h2 className="font-serif text-3xl font-medium leading-tight text-tayah-text-strong md:text-5xl">
            O que o STJ decidiu no Tema 217 — e por que vale para a sua clínica.
          </h2>
          <div className="mt-8 space-y-5 font-sans text-base leading-relaxed text-tayah-text-muted md:text-lg">
            <p>
              A Lei 9.249/95 prevê base reduzida para “serviços hospitalares”.
              Por muito tempo, a Receita interpretou esse conceito de forma
              restrita, exigindo internação e estrutura de hospital tradicional.
            </p>
            <p>
              O STJ, no <strong>REsp 1.116.399/BA</strong> (Tema 217), decidido
              em recurso repetitivo, fixou que “serviços hospitalares” são os
              <strong> ligados à promoção da saúde com estrutura compatível</strong>{" "}
              — não apenas internação. A decisão abriu o caminho para clínicas
              de imagem, laboratórios, centros cirúrgicos, day-clinics e outras
              estruturas similares.
            </p>
            <p className="font-sans text-base text-tayah-text-strong">
              Os 3 requisitos consolidados pela jurisprudência:
            </p>
            <ul className="space-y-3 pl-0">
              {[
                "Sociedade empresária (não sociedade simples).",
                "Serviços de natureza hospitalar (promoção da saúde com estrutura compatível).",
                "Cumprimento das normas da ANVISA e da vigilância sanitária local.",
              ].map((req, i) => (
                <li key={req} className="flex items-start gap-3">
                  <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-tayah-red font-sans text-xs font-semibold text-tayah-white">
                    {i + 1}
                  </span>
                  <span className="font-sans text-base text-tayah-text-strong">
                    {req}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────
          § 04 · CALCULADORA (CORAÇÃO)
          ───────────────────────────────────── */}
      <section
        id="calculadora"
        className="scroll-mt-24 bg-tayah-cream-deep/40"
      >
        <div className="container-tayah py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <SectionEyebrow numero="04" texto="Calcule agora" />
            <h2 className="font-serif text-3xl font-medium leading-tight text-tayah-text-strong md:text-5xl">
              Descubra em 2 minutos quanto sua clínica pode economizar.
            </h2>
            <p className="mt-6 font-sans text-base leading-relaxed text-tayah-text-muted md:text-lg">
              Responda 7 perguntas rápidas. Sem custo, sem compromisso. O
              resultado é uma estimativa preliminar baseada nos dados que você
              informar.
            </p>
          </div>

          <div className="mt-12">
            <CalculadoraInline />
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────
          § 05 · COMO FUNCIONA
          ───────────────────────────────────── */}
      <section className="container-tayah py-16 md:py-24">
        <div className="max-w-3xl">
          <SectionEyebrow numero="05" texto="O caminho" />
          <h2 className="font-serif text-3xl font-medium leading-tight text-tayah-text-strong md:text-5xl">
            Como sua clínica obtém a equiparação — em 3 passos.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PASSOS.map((p) => (
            <article
              key={p.numero}
              className="rounded-xl border border-tayah-border-card bg-tayah-white p-7 shadow-tayah-card"
            >
              <p className="font-serif text-5xl font-semibold leading-none text-tayah-red">
                {p.numero}
              </p>
              <h3 className="mt-5 font-serif text-2xl font-medium text-tayah-text-strong">
                {p.titulo}
              </h3>
              <p className="mt-3 font-sans text-sm leading-relaxed text-tayah-text-muted">
                {p.descricao}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────
          § 06 · POR QUE TAYAH
          ───────────────────────────────────── */}
      <section className="bg-tayah-cream-deep/40">
        <div className="container-tayah py-16 md:py-24">
          <div className="max-w-3xl">
            <SectionEyebrow numero="06" texto="Por que a Tayah" />
            <h2 className="font-serif text-3xl font-medium leading-tight text-tayah-text-strong md:text-5xl">
              65 anos de tradição. Especialistas em direito médico e tributário
              da saúde.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {RAZOES.map((r) => (
              <article
                key={r.titulo}
                className="rounded-xl border border-tayah-border-card bg-tayah-white p-6 shadow-tayah-card md:p-7"
              >
                <h3 className="font-serif text-xl font-medium text-tayah-text-strong">
                  {r.titulo}
                </h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-tayah-text-muted">
                  {r.descricao}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────
          § 07 · RECONHECIMENTOS
          ───────────────────────────────────── */}
      <section className="container-tayah py-16 md:py-24">
        <div className="max-w-3xl">
          <SectionEyebrow numero="07" texto="Reconhecimentos" />
          <h2 className="font-serif text-3xl font-medium leading-tight text-tayah-text-strong md:text-5xl">
            Autoridade reconhecida por instituições independentes.
          </h2>
        </div>

        {/* TODO: substituir por imagens dos selos quando Ana fornecer */}
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {SELOS.map((s) => (
            <div
              key={s.titulo}
              className="flex flex-col items-center justify-center rounded-xl border border-tayah-border-card bg-tayah-white px-5 py-6 text-center shadow-tayah-card"
            >
              <p className="font-serif text-lg font-medium text-tayah-text-strong">
                {s.titulo}
              </p>
              <p className="mt-2 font-sans text-[11px] uppercase tracking-wider text-tayah-text-muted">
                {s.periodo}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────
          § 08 · FAQ
          ───────────────────────────────────── */}
      <section className="bg-tayah-cream-deep/40">
        <div className="container-tayah py-16 md:py-24">
          <div className="mx-auto max-w-3xl">
            <SectionEyebrow numero="08" texto="Perguntas frequentes" />
            <h2 className="font-serif text-3xl font-medium leading-tight text-tayah-text-strong md:text-5xl">
              Tudo que você precisa saber sobre a equiparação.
            </h2>

            <div className="mt-10">
              <Faq items={FAQ_ITEMS} />
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────
          § 09 · CTA FINAL
          ───────────────────────────────────── */}
      <section className="container-tayah py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <SectionEyebrow numero="09" texto="O próximo passo" />
          <h2 className="font-serif text-3xl font-medium leading-tight text-tayah-text-strong md:text-5xl">
            A diferença entre pagar 7,68% e{" "}
            <span className="text-tayah-red">2,28%</span> pode ser o melhor
            investimento da sua clínica este ano.
          </h2>
          <p className="mt-6 font-sans text-base leading-relaxed text-tayah-text-muted md:text-lg">
            Convidamos você a uma análise inicial gratuita com nossa equipe.
            Avaliamos sua estrutura, identificamos o enquadramento e indicamos o
            caminho mais eficiente — administrativo ou judicial — para a sua
            realidade.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-tayah-red px-8 py-4 font-sans text-sm font-semibold text-tayah-white shadow-sm transition-all duration-200 hover:scale-[1.02] hover:bg-tayah-red-dark hover:shadow-md"
            >
              Agendar análise gratuita
              <span aria-hidden>→</span>
            </Link>
            <a
              href="#calculadora"
              className="inline-flex items-center justify-center gap-2 rounded-md border-2 border-tayah-red bg-transparent px-8 py-4 font-sans text-sm font-semibold text-tayah-red transition-colors duration-200 hover:bg-tayah-red hover:text-tayah-white"
            >
              Calcular minha economia
            </a>
          </div>

          <p className="mt-10 font-sans text-sm leading-relaxed text-tayah-text-muted">
            <strong className="text-tayah-text-strong">P.S.</strong> Cada mês
            que passa sem a equiparação é dinheiro que sai do caixa da clínica e
            não volta. A análise inicial é gratuita e sem compromisso —{" "}
            <Link
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="text-tayah-red underline underline-offset-4 hover:text-tayah-red-dark"
            >
              fale com a equipe pelo WhatsApp
            </Link>
            .
          </p>

          <div className="mt-12 border-t border-tayah-border-card pt-8">
            <p className="font-serif text-xl text-tayah-text-strong">
              Dr. José Marco Tayah
            </p>
            <p className="mt-1 font-sans text-xs uppercase tracking-widest text-tayah-text-muted">
              CEO & Sócio-Diretor · Três gerações · Desde 1961
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
