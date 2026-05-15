"use client";

import {
  type Diagnostico,
  type NivelDiagnostico,
  type Sinalizacao,
} from "@/lib/diagnostico";

interface Props {
  diagnostico: Diagnostico;
}

const NIVEL_CONFIG: Record<
  NivelDiagnostico,
  { label: string; classes: string }
> = {
  FORTE: {
    label: "Indicação forte",
    classes: "bg-tayah-red text-white",
  },
  MEDIO: {
    label: "Indicação intermediária",
    classes: "bg-amber-500 text-tayah-black",
  },
  FRACO: {
    label: "Indicação fraca",
    classes: "bg-tayah-gray-700 text-white",
  },
};

export default function DiagnosticoVerbal({ diagnostico }: Props) {
  const { nivel, mensagemPrincipal, sinalizacoes } = diagnostico;
  const cfg = NIVEL_CONFIG[nivel];
  const visiveis = sinalizacoes.slice(0, 5);

  return (
    <div className="space-y-12">
      <div>
        <span
          className={`inline-flex items-center gap-2 px-3 py-1.5 font-sans text-[11px] font-semibold uppercase tracking-widest ${cfg.classes}`}
        >
          <span aria-hidden>●</span>
          {cfg.label}
        </span>
        <h1 className="mt-6 font-serif text-4xl leading-tight text-tayah-black md:text-5xl">
          Diagnóstico tributário preliminar
        </h1>
        <p className="mt-4 max-w-2xl font-sans text-base leading-relaxed text-tayah-gray-700">
          {mensagemPrincipal}
        </p>
      </div>

      {visiveis.length > 0 && (
        <div>
          <p className="eyebrow mb-4">Sinalizações identificadas</p>
          <ul className="space-y-3">
            {visiveis.map((sin, i) => (
              <SinalizacaoItem key={i} sinalizacao={sin} />
            ))}
          </ul>
          {sinalizacoes.length > 5 && (
            <p className="mt-4 font-sans text-xs text-tayah-gray-700">
              + {sinalizacoes.length - 5} sinalizações adicionais — detalhadas
              na análise documental.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function SinalizacaoItem({ sinalizacao }: { sinalizacao: Sinalizacao }) {
  const cfg = {
    critico: {
      badge: "bg-tayah-red text-white",
      icon: "!",
    },
    atencao: {
      badge: "bg-amber-500 text-tayah-black",
      icon: "!",
    },
    positivo: {
      badge: "bg-emerald-600 text-white",
      icon: "✓",
    },
  }[sinalizacao.tipo];

  return (
    <li className="flex items-start gap-3 border-l-2 border-tayah-gray-200 pl-4">
      <span
        className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full font-sans text-[11px] font-bold ${cfg.badge}`}
        aria-hidden
      >
        {cfg.icon}
      </span>
      <p className="font-sans text-sm leading-relaxed text-tayah-black">
        {sinalizacao.texto}
      </p>
    </li>
  );
}
