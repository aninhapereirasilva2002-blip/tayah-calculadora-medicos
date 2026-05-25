import { ReactNode } from "react";
import DollarIcon from "@/components/icons/Dollar";
import ScaleIcon from "@/components/icons/Scale";
import {
  formatBRL,
  type CalculoTributario,
} from "@/lib/calculo-tributario";

interface Props {
  calculo: CalculoTributario;
}

export default function CardsResumo({ calculo }: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Card
        label="Faturamento anual"
        icone={<DollarIcon className="h-4 w-4" />}
        valor={formatBRL(calculo.faturamentoAnual)}
        sub="Base usada nos cálculos"
        valorClassName="text-tayah-text-strong"
      />
      <Card
        label="Imposto atual anual"
        icone={<DollarIcon className="h-4 w-4" />}
        valor={formatBRL(calculo.semEquiparacao.totalAnual)}
        sub="IRPJ + CSLL — Lucro Presumido 32%"
        valorClassName="text-tayah-text-strong"
      />
      <Card
        label="Com equiparação"
        icone={<ScaleIcon className="h-4 w-4" />}
        valor={formatBRL(calculo.comEquiparacao.totalAnual)}
        sub="Bases reduzidas 8% / 12% — Lei 9.249/95"
        valorClassName="text-tayah-orange"
      />
    </div>
  );
}

function Card({
  label,
  icone,
  valor,
  sub,
  valorClassName,
}: {
  label: string;
  icone: ReactNode;
  valor: string;
  sub: string;
  valorClassName: string;
}) {
  return (
    <article className="rounded-xl border border-tayah-border-card bg-tayah-white p-6 shadow-tayah-card-sm">
      <header className="flex items-center justify-between gap-2">
        <p className="font-sans text-[11px] font-semibold uppercase tracking-[1.5px] text-tayah-text-muted">
          {label}
        </p>
        <span className="text-tayah-text-muted">{icone}</span>
      </header>
      <p
        className={`mt-3 font-serif text-[26px] font-bold leading-tight md:text-[28px] ${valorClassName}`}
      >
        {valor}
      </p>
      <p className="mt-2 font-sans text-xs leading-relaxed text-tayah-text-muted">
        {sub}
      </p>
    </article>
  );
}
