"use client";

import { motion } from "framer-motion";
import {
  formatBRL,
  type CalculoTributario,
} from "@/lib/calculo-tributario";

interface Props {
  calculo: CalculoTributario;
}

export default function BlocoComparativo({ calculo }: Props) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <h2 className="mb-6 text-center font-serif text-[24px] leading-tight text-tayah-black md:text-[24px]">
        Comparação: o que paga hoje{" "}
        <span style={{ color: "#8A2A2B" }}>×</span> o que pagaria com
        equiparação
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        <ColunaCenario
          emoji="🔴"
          titulo="Sem equiparação hospitalar"
          tituloColor="#8A2A2B"
          background="#FFE5E5"
          border="#8A2A2B"
          totalMensal={calculo.semEquiparacao.totalMensal}
          totalAnual={calculo.semEquiparacao.totalAnual}
          subtituloRegime="Lucro Presumido — base 32%"
          irpj={`${formatBRL(calculo.semEquiparacao.irpj)}/mês`}
          csll={`${formatBRL(calculo.semEquiparacao.csll)}/mês`}
          aliquotaTexto="Alíquota efetiva: 7,68% sobre o faturamento"
        />
        <ColunaCenario
          emoji="🟢"
          titulo="Com equiparação hospitalar"
          tituloColor="#2E7D32"
          background="#E6F4EA"
          border="#2E7D32"
          totalMensal={calculo.comEquiparacao.totalMensal}
          totalAnual={calculo.comEquiparacao.totalAnual}
          subtituloRegime="Base reduzida — Lei 9.249/95"
          irpj={`${formatBRL(calculo.comEquiparacao.irpj)}/mês  (base 8%)`}
          csll={`${formatBRL(calculo.comEquiparacao.csll)}/mês  (base 12%)`}
          aliquotaTexto="Alíquota efetiva: 2,28% sobre o faturamento"
        />
      </div>

      <div
        className="mt-6 rounded-lg p-5 text-center"
        style={{ backgroundColor: "#F5F5F5" }}
      >
        <p className="font-sans text-[15px] font-semibold leading-relaxed text-tayah-black md:text-[18px]">
          Diferença:{" "}
          <span style={{ color: "#8A2A2B" }}>
            {formatBRL(calculo.economia.mensal)}/mês
          </span>{" "}
          •{" "}
          <span style={{ color: "#8A2A2B" }}>
            {formatBRL(calculo.economia.anual)}/ano
          </span>{" "}
          •{" "}
          <span style={{ color: "#8A2A2B" }}>
            {formatBRL(calculo.economia.em5anos)} em 5 anos
          </span>
        </p>
      </div>
    </motion.section>
  );
}

interface ColunaProps {
  emoji: string;
  titulo: string;
  tituloColor: string;
  background: string;
  border: string;
  totalMensal: number;
  totalAnual: number;
  subtituloRegime: string;
  irpj: string;
  csll: string;
  aliquotaTexto: string;
}

function ColunaCenario({
  emoji,
  titulo,
  tituloColor,
  background,
  border,
  totalMensal,
  totalAnual,
  subtituloRegime,
  irpj,
  csll,
  aliquotaTexto,
}: ColunaProps) {
  return (
    <div
      className="flex flex-col rounded-xl border-2 p-6 md:p-8"
      style={{ backgroundColor: background, borderColor: border }}
    >
      <div className="text-center">
        <div
          className="text-[28px] leading-none"
          aria-hidden
          style={{ fontSize: "28px" }}
        >
          {emoji}
        </div>
        <p
          className="mt-2 font-sans text-[11px] font-bold uppercase tracking-[0.2em]"
          style={{ color: tituloColor }}
        >
          {titulo}
        </p>
      </div>

      <p
        className="mt-4 text-center font-serif font-bold leading-none"
        style={{
          color: tituloColor,
          fontSize: "clamp(28px, 5vw, 36px)",
        }}
      >
        {formatBRL(totalMensal)}
        <span className="ml-1 font-sans text-[14px] font-normal">/mês</span>
      </p>

      <div className="mt-6 space-y-1.5 font-sans text-[13px] leading-relaxed text-tayah-black">
        <p className="font-semibold" style={{ color: tituloColor }}>
          {subtituloRegime}
        </p>
        <p>
          <span className="text-tayah-gray-700">IRPJ:</span> {irpj}
        </p>
        <p>
          <span className="text-tayah-gray-700">CSLL:</span> {csll}
        </p>
        <p className="pt-1 text-[12px] italic text-tayah-gray-700">
          {aliquotaTexto}
        </p>
      </div>

      <p
        className="mt-5 border-t pt-4 text-center font-sans text-[14px] font-semibold"
        style={{ color: tituloColor, borderColor: `${border}40` }}
      >
        Total anual: {formatBRL(totalAnual)}
      </p>
    </div>
  );
}
