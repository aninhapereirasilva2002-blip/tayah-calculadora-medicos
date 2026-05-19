"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CheckIcon from "@/components/icons/Check";
import {
  formatBRL,
  type CalculoTributario,
} from "@/lib/calculo-tributario";

interface Props {
  calculo: CalculoTributario;
}

type Tab = "projecao" | "memoria";

const ANO_INICIAL = 2026;
const TOTAL_ANOS = 5;

export default function TabsResultado({ calculo }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("projecao");

  return (
    <section className="overflow-hidden rounded-2xl bg-tayah-white shadow-tayah-card">
      <div className="flex">
        <TabButton
          label="📊 Projeção Ano a Ano"
          active={activeTab === "projecao"}
          onClick={() => setActiveTab("projecao")}
        />
        <TabButton
          label="🧮 Memória de Cálculo"
          active={activeTab === "memoria"}
          onClick={() => setActiveTab("memoria")}
        />
      </div>

      <div className="p-5 md:p-8">
        <AnimatePresence mode="wait">
          {activeTab === "projecao" ? (
            <motion.div
              key="projecao"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <ProjecaoContent calculo={calculo} />
            </motion.div>
          ) : (
            <motion.div
              key="memoria"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <MemoriaContent calculo={calculo} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function TabButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex-1 border-b-[3px] px-3 py-4 font-sans text-xs transition-colors md:text-sm ${
        active
          ? "border-tayah-red bg-tayah-white font-semibold text-tayah-text-strong"
          : "border-transparent bg-tayah-cream text-tayah-text-muted hover:bg-tayah-cream-deep"
      }`}
    >
      {label}
    </button>
  );
}

function ProjecaoContent({ calculo }: { calculo: CalculoTributario }) {
  const linhas = Array.from({ length: TOTAL_ANOS }, (_, i) => ({
    label: `Ano ${i + 1} (${ANO_INICIAL + i})`,
    sem: calculo.semEquiparacao.totalAnual,
    com: calculo.comEquiparacao.totalAnual,
    economiaAno: calculo.economia.anual,
    acumulada: calculo.economia.anual * (i + 1),
  }));

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-serif text-2xl text-tayah-text-strong">
            Projeção Ano a Ano
          </h3>
          <p className="mt-1 font-sans text-[13px] text-tayah-text-muted">
            5 anos com faturamento constante
          </p>
        </div>
        <span className="inline-flex items-center rounded-md bg-tayah-red px-3.5 py-2 font-sans text-[11px] font-bold uppercase tracking-wider text-tayah-white">
          Economia acumulada: {formatBRL(calculo.economia.em5anos)}
        </span>
      </div>

      <p className="mb-2 font-sans text-[11px] italic text-tayah-text-muted md:hidden">
        Deslize horizontalmente para ver toda a tabela →
      </p>

      <div className="overflow-x-auto rounded-lg border border-tayah-border-soft">
        <table className="w-full min-w-[760px] border-collapse text-left font-sans text-[13px]">
          <thead>
            <tr style={{ backgroundColor: "#8A2A2B" }}>
              <Th>Ano</Th>
              <Th align="right">IRPJ+CSLL Atual</Th>
              <Th align="right">IRPJ+CSLL com Equiparação</Th>
              <Th align="right">Economia no Ano</Th>
              <Th align="right">Economia Acumulada</Th>
              <Th align="center">Status</Th>
            </tr>
          </thead>
          <tbody>
            {linhas.map((l, i) => (
              <tr
                key={l.label}
                className="border-t border-tayah-border-soft"
                style={{ backgroundColor: i % 2 === 0 ? "#FFFFFF" : "#FDEEE8" }}
              >
                <td className="px-3.5 py-3.5 font-semibold text-tayah-text-strong">
                  {l.label}
                </td>
                <td className="px-3.5 py-3.5 text-right font-mono text-tayah-text-strong">
                  {formatBRL(l.sem)}
                </td>
                <td className="px-3.5 py-3.5 text-right font-mono text-tayah-orange">
                  {formatBRL(l.com)}
                </td>
                <td className="px-3.5 py-3.5 text-right font-mono font-bold text-tayah-red">
                  {formatBRL(l.economiaAno)}
                </td>
                <td className="px-3.5 py-3.5 text-right font-mono font-bold text-tayah-red">
                  {formatBRL(l.acumulada)}
                </td>
                <td className="px-3.5 py-3.5">
                  <div className="flex justify-center">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-tayah-green">
                      <CheckIcon className="h-3 w-3 text-tayah-white" />
                    </span>
                  </div>
                </td>
              </tr>
            ))}
            <tr
              className="border-t border-tayah-border-soft"
              style={{ backgroundColor: "#FCDDCF" }}
            >
              <td
                colSpan={3}
                className="px-3.5 py-4 text-right font-bold uppercase tracking-widest text-[11px] text-tayah-red"
              >
                Total em 5 anos →
              </td>
              <td className="px-3.5 py-4 text-right font-mono font-bold text-tayah-red">
                {formatBRL(calculo.economia.anual * TOTAL_ANOS)}
              </td>
              <td className="px-3.5 py-4 text-right font-mono font-bold text-tayah-red">
                {formatBRL(calculo.economia.em5anos)}
              </td>
              <td />
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mt-3 font-sans text-xs italic text-tayah-text-muted">
        Projeção considera faturamento constante. Valores não incluem correção
        monetária.
      </p>
    </div>
  );
}

function Th({
  children,
  align,
}: {
  children: React.ReactNode;
  align?: "left" | "right" | "center";
}) {
  const alignClass =
    align === "right"
      ? "text-right"
      : align === "center"
        ? "text-center"
        : "text-left";
  return (
    <th
      className={`px-3.5 py-3 font-semibold uppercase tracking-wider text-[11px] text-tayah-white ${alignClass}`}
    >
      {children}
    </th>
  );
}

function MemoriaContent({ calculo }: { calculo: CalculoTributario }) {
  const c = calculo;

  return (
    <div className="space-y-4">
      <PassoCard titulo="Passo 1 — Faturamento base do cálculo">
        {`Faturamento mensal estimado:    ${formatBRL(c.faturamentoMensal)}
Faturamento anual estimado:     ${formatBRL(c.faturamentoAnual)}
(Valor médio da faixa selecionada no Passo 6)`}
      </PassoCard>

      <PassoCard titulo="Passo 2 — Cálculo SEM equiparação hospitalar">
        {`Regime: Lucro Presumido — Serviços Profissionais (base 32%)
Fundamento: Lei 9.249/95, art. 15

IRPJ:
  Base de cálculo = Faturamento × 32%
                  = ${formatBRL(c.faturamentoMensal)} × 0,32
                  = ${formatBRL(c.semEquiparacao.baseIRPJ)}
  IRPJ devido     = Base × 15%
                  = ${formatBRL(c.semEquiparacao.baseIRPJ)} × 0,15
                  = ${formatBRL(c.semEquiparacao.irpj)} por mês

CSLL:
  Base de cálculo = Faturamento × 32%
                  = ${formatBRL(c.faturamentoMensal)} × 0,32
                  = ${formatBRL(c.semEquiparacao.baseCSLL)}
  CSLL devida     = Base × 9%
                  = ${formatBRL(c.semEquiparacao.baseCSLL)} × 0,09
                  = ${formatBRL(c.semEquiparacao.csll)} por mês

TOTAL IRPJ + CSLL mensal: ${formatBRL(c.semEquiparacao.totalMensal)}
Alíquota efetiva: 7,68% do faturamento`}
      </PassoCard>

      <PassoCard titulo="Passo 3 — Cálculo COM equiparação hospitalar">
        {`Regime: Lucro Presumido — Serviços Hospitalares (base reduzida)
Fundamento: Lei 9.249/95, art. 15, §1º, III, "a" + art. 20
Precedente: STJ, Tema 217 (REsp 1.116.399/BA)

IRPJ:
  Base de cálculo = Faturamento × 8%
                  = ${formatBRL(c.faturamentoMensal)} × 0,08
                  = ${formatBRL(c.comEquiparacao.baseIRPJ)}
  IRPJ devido     = Base × 15%
                  = ${formatBRL(c.comEquiparacao.baseIRPJ)} × 0,15
                  = ${formatBRL(c.comEquiparacao.irpj)} por mês

CSLL:
  Base de cálculo = Faturamento × 12%
                  = ${formatBRL(c.faturamentoMensal)} × 0,12
                  = ${formatBRL(c.comEquiparacao.baseCSLL)}
  CSLL devida     = Base × 9%
                  = ${formatBRL(c.comEquiparacao.baseCSLL)} × 0,09
                  = ${formatBRL(c.comEquiparacao.csll)} por mês

TOTAL IRPJ + CSLL mensal: ${formatBRL(c.comEquiparacao.totalMensal)}
Alíquota efetiva: 2,28% do faturamento`}
      </PassoCard>

      <PassoCard titulo="Passo 4 — Diferença e economia projetada">
        {`Economia mensal:    ${formatBRL(c.semEquiparacao.totalMensal)} − ${formatBRL(c.comEquiparacao.totalMensal)}
                  = ${formatBRL(c.economia.mensal)}

Economia anual:     ${formatBRL(c.economia.mensal)} × 12
                  = ${formatBRL(c.economia.anual)}

Em 5 anos:          ${formatBRL(c.economia.anual)} × 5
                  = ${formatBRL(c.economia.em5anos)}

Em 10 anos:         ${formatBRL(c.economia.anual)} × 10
                  = ${formatBRL(c.economia.em10anos)}

Redução percentual sobre IRPJ + CSLL:
                    (7,68% − 2,28%) / 7,68% × 100
                  = ${c.economia.percentualReducao.toFixed(2)}%`}
      </PassoCard>

      <p className="mt-2 font-sans text-[12px] italic leading-relaxed text-tayah-text-muted">
        <strong className="not-italic">Nota técnica:</strong> Cálculos não
        consideram: (i) adicional de IRPJ de 10% sobre lucro presumido excedente
        a R$ 20.000/mês — raro de incidir no cenário com equiparação; (ii) PIS,
        COFINS e ISS, que <strong className="not-italic">não</strong> sofrem
        alteração com a equiparação hospitalar; (iii) eventuais ajustes do
        Anexo III/V do Simples Nacional, se aplicável; (iv) transição da Reforma
        Tributária (EC 132/2023 — IBS/CBS), cujo período de transição começa
        em 2026.
      </p>
    </div>
  );
}

function PassoCard({
  titulo,
  children,
}: {
  titulo: string;
  children: string;
}) {
  return (
    <div className="rounded-lg border-l-4 border-tayah-red bg-tayah-white p-6 shadow-tayah-card-sm">
      <h4 className="font-serif text-xl font-medium text-tayah-text-strong">
        {titulo}
      </h4>
      <div className="mt-4 overflow-x-auto rounded-md p-4" style={{ backgroundColor: "#FDF6F0" }}>
        <pre className="whitespace-pre font-mono text-[12px] leading-relaxed text-tayah-text-strong md:text-[13px]">
          {children}
        </pre>
      </div>
    </div>
  );
}
