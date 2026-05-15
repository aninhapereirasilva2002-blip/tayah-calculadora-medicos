"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  formatBRL,
  type CalculoTributario,
} from "@/lib/calculo-tributario";

interface Props {
  calculo: CalculoTributario;
}

export default function BlocoMemoriaCalculo({ calculo }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <section>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="memoria-calculo-conteudo"
        className="inline-flex items-center gap-3 rounded-md border px-5 py-3 font-sans text-sm font-semibold transition-colors hover:bg-[#FFE5E5]"
        style={{ borderColor: "#8A2A2B", color: "#8A2A2B" }}
      >
        <span
          aria-hidden
          className="inline-block leading-none transition-transform duration-200"
          style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)" }}
        >
          ▶
        </span>
        Ver como o cálculo foi feito (passo a passo)
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="memoria-calculo-conteudo"
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{ overflow: "hidden" }}
          >
            <div
              className="mt-4 rounded-lg p-5 md:p-6"
              style={{ backgroundColor: "#F5F5F5" }}
            >
              <div className="overflow-x-auto">
                <pre className="whitespace-pre font-mono text-[12px] leading-relaxed text-tayah-black md:text-[13px]">
                  {construirConteudo(calculo)}
                </pre>
              </div>

              <p className="mt-5 border-t border-tayah-black/10 pt-4 font-sans text-[12px] italic leading-relaxed text-tayah-gray-700">
                <strong className="not-italic">Nota técnica:</strong> Cálculos
                não consideram: (i) adicional de IRPJ de 10% sobre lucro
                presumido excedente a R$ 20.000/mês — raro de incidir no
                cenário com equiparação; (ii) PIS, COFINS e ISS, que{" "}
                <strong className="not-italic">não</strong> sofrem alteração
                com a equiparação hospitalar; (iii) eventuais ajustes do Anexo
                III/V do Simples Nacional, se aplicável; (iv) transição da
                Reforma Tributária (EC 132/2023 — IBS/CBS), cujo período de
                transição começa em 2026.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function construirConteudo(c: CalculoTributario): string {
  return `═══════════════════════════════════════
PASSO 1 — Faturamento base do cálculo
═══════════════════════════════════════
Faturamento mensal estimado:    ${formatBRL(c.faturamentoMensal)}
Faturamento anual estimado:     ${formatBRL(c.faturamentoAnual)}
(Valor médio da faixa selecionada no Passo 6)

═══════════════════════════════════════
PASSO 2 — Cálculo SEM equiparação hospitalar
═══════════════════════════════════════
Regime: Lucro Presumido — Serviços Profissionais (base 32%)
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
Alíquota efetiva: 7,68% do faturamento

═══════════════════════════════════════
PASSO 3 — Cálculo COM equiparação hospitalar
═══════════════════════════════════════
Regime: Lucro Presumido — Serviços Hospitalares (base reduzida)
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
Alíquota efetiva: 2,28% do faturamento

═══════════════════════════════════════
PASSO 4 — Diferença e economia projetada
═══════════════════════════════════════
Economia mensal:    ${formatBRL(c.semEquiparacao.totalMensal)} − ${formatBRL(c.comEquiparacao.totalMensal)}
                  = ${formatBRL(c.economia.mensal)}

Economia anual:     ${formatBRL(c.economia.mensal)} × 12
                  = ${formatBRL(c.economia.anual)}

Em 5 anos:          ${formatBRL(c.economia.anual)} × 5
                  = ${formatBRL(c.economia.em5anos)}

Em 10 anos:         ${formatBRL(c.economia.anual)} × 10
                  = ${formatBRL(c.economia.em10anos)}

Redução percentual sobre IRPJ + CSLL:
                    (7,68% − 2,28%) / 7,68% × 100
                  = ${c.economia.percentualReducao.toFixed(2)}%
═══════════════════════════════════════`;
}
