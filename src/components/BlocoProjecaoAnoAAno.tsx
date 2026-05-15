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

const ANO_INICIAL = 2026;
const TOTAL_ANOS = 5;

export default function BlocoProjecaoAnoAAno({ calculo }: Props) {
  const [open, setOpen] = useState(false);

  const linhas = Array.from({ length: TOTAL_ANOS }, (_, i) => ({
    label: `Ano ${i + 1} (${ANO_INICIAL + i})`,
    sem: calculo.semEquiparacao.totalAnual,
    com: calculo.comEquiparacao.totalAnual,
    economiaAno: calculo.economia.anual,
    acumulada: calculo.economia.anual * (i + 1),
  }));

  return (
    <section>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="projecao-conteudo"
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
        Ver projeção ano a ano (5 anos)
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="projecao-conteudo"
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{ overflow: "hidden" }}
          >
            <div className="mt-4">
              <p className="mb-2 font-sans text-[11px] italic text-tayah-gray-700 md:hidden">
                Deslize horizontalmente para ver toda a tabela →
              </p>

              <div className="overflow-x-auto rounded-lg border border-tayah-gray-200">
                <table className="w-full min-w-[680px] border-collapse text-left font-sans text-[13px]">
                  <thead>
                    <tr style={{ backgroundColor: "#8A2A2B" }}>
                      <th className="px-3 py-3 text-left font-semibold uppercase tracking-widest text-[11px] text-white">
                        Ano
                      </th>
                      <th className="px-3 py-3 text-right font-semibold uppercase tracking-widest text-[11px] text-white">
                        IRPJ+CSLL Atual
                      </th>
                      <th className="px-3 py-3 text-right font-semibold uppercase tracking-widest text-[11px] text-white">
                        IRPJ+CSLL com Equiparação
                      </th>
                      <th className="px-3 py-3 text-right font-semibold uppercase tracking-widest text-[11px] text-white">
                        Economia no Ano
                      </th>
                      <th className="px-3 py-3 text-right font-semibold uppercase tracking-widest text-[11px] text-white">
                        Acumulada
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {linhas.map((l, i) => (
                      <tr
                        key={l.label}
                        className="border-t border-tayah-gray-200"
                        style={{
                          backgroundColor: i % 2 === 0 ? "#FFFFFF" : "#F5F5F5",
                        }}
                      >
                        <td className="px-3 py-3 font-medium text-tayah-black">
                          {l.label}
                        </td>
                        <td className="px-3 py-3 text-right text-tayah-black">
                          {formatBRL(l.sem)}
                        </td>
                        <td
                          className="px-3 py-3 text-right font-medium"
                          style={{ color: "#2E7D32" }}
                        >
                          {formatBRL(l.com)}
                        </td>
                        <td className="px-3 py-3 text-right text-tayah-black">
                          {formatBRL(l.economiaAno)}
                        </td>
                        <td
                          className="px-3 py-3 text-right font-semibold"
                          style={{ color: "#8A2A2B" }}
                        >
                          {formatBRL(l.acumulada)}
                        </td>
                      </tr>
                    ))}
                    <tr
                      className="border-t border-tayah-gray-200"
                      style={{ backgroundColor: "#FFE5E5" }}
                    >
                      <td
                        colSpan={4}
                        className="px-3 py-4 text-right font-bold uppercase tracking-widest text-[11px]"
                        style={{ color: "#8A2A2B" }}
                      >
                        Total em 5 anos →
                      </td>
                      <td
                        className="px-3 py-4 text-right font-bold"
                        style={{ color: "#8A2A2B" }}
                      >
                        {formatBRL(calculo.economia.em5anos)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="mt-3 font-sans text-[12px] italic text-tayah-gray-700">
                Projeção considera faturamento constante. Valores não incluem
                correção monetária.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
