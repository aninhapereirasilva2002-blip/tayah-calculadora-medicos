"use client";

import { motion } from "framer-motion";
import {
  formatBRL,
  type CalculoTributario,
} from "@/lib/calculo-tributario";

interface Props {
  calculo: CalculoTributario;
}

export default function BlocoEconomiaEstimada({ calculo }: Props) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="rounded-xl border-2 p-8 md:p-10"
      style={{ backgroundColor: "#FFE5E5", borderColor: "#8A2A2B" }}
    >
      <header className="text-center">
        <h2 className="font-serif text-[28px] leading-tight text-tayah-black">
          Economia Tributária Anual Estimada
        </h2>
        <p className="mt-2 font-sans text-sm text-tayah-gray-700">
          Baseado em faturamento médio de{" "}
          <strong className="text-tayah-black">
            {formatBRL(calculo.faturamentoMensal)}
          </strong>
          /mês
        </p>
      </header>

      <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-6">
        {/* Coluna 1 — principal */}
        <div className="text-center">
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-tayah-gray-700">
            Economia anual estimada
          </p>
          <p
            className="mt-3 font-serif font-bold leading-none"
            style={{ color: "#8A2A2B", fontSize: "clamp(36px, 7vw, 48px)" }}
          >
            {formatBRL(calculo.economia.anual)}
          </p>
          <p className="mt-3 font-sans text-[13px] text-tayah-gray-700">
            em IRPJ + CSLL
          </p>
        </div>

        {/* Coluna 2 */}
        <div className="text-center">
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-tayah-gray-700">
            Redução percentual
          </p>
          <p className="mt-3 font-serif text-[36px] font-bold leading-none text-tayah-black">
            {calculo.economia.percentualReducao.toFixed(1)}%
          </p>
          <p className="mt-3 font-sans text-[13px] text-tayah-gray-700">
            sobre IRPJ + CSLL atuais
          </p>
        </div>

        {/* Coluna 3 */}
        <div className="text-center">
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-tayah-gray-700">
            Economia mensal
          </p>
          <p
            className="mt-3 font-serif text-[28px] font-bold leading-none"
            style={{ color: "#000000" }}
          >
            {formatBRL(calculo.economia.mensal)}
          </p>
          <p className="mt-3 font-sans text-[13px] text-tayah-gray-700">
            diferença por mês
          </p>
        </div>
      </div>
    </motion.section>
  );
}
