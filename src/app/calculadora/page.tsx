"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import ProgressBar from "@/components/ProgressBar";
import StepCard from "@/components/StepCard";
import {
  LABEL_DUVIDA,
  LABEL_FAIXA_FATURAMENTO,
  LABEL_LICENCA,
  LABEL_LOCAL,
  LABEL_REGIME,
  LABEL_SERVICO,
  LABEL_TIPO_ORGANIZACAO,
  RESPOSTAS_VAZIAS,
  STORAGE_KEY,
  type DuvidaPrincipal,
  type FaixaFaturamento,
  type LicencaSanitaria,
  type LocalPrestacao,
  type RegimeTributario,
  type RespostasCalculadora,
  type ServicoMedico,
  type TipoOrganizacao,
} from "@/lib/types";

const TOTAL_PASSOS = 7;

const toOptions = <T extends string>(record: Record<T, string>) =>
  (Object.keys(record) as T[]).map((value) => ({
    value,
    label: record[value],
  }));

export default function CalculadoraPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [respostas, setRespostas] =
    useState<RespostasCalculadora>(RESPOSTAS_VAZIAS);

  const podeAvancar = useMemo(() => {
    switch (step) {
      case 1:
        return respostas.tipoOrganizacao !== null;
      case 2:
        return respostas.regimeTributario !== null;
      case 3:
        return respostas.servicos.length > 0;
      case 4:
        return respostas.localPrestacao !== null;
      case 5:
        return respostas.licencaSanitaria !== null;
      case 6:
        return respostas.faixaFaturamento !== null;
      case 7:
        return respostas.duvidaPrincipal !== null;
      default:
        return false;
    }
  }, [step, respostas]);

  const avancar = () => {
    if (!podeAvancar) return;
    if (step === TOTAL_PASSOS) {
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(respostas));
      } catch {
        // sessionStorage indisponível — segue assim mesmo
      }
      router.push("/resultado");
      return;
    }
    setDirection(1);
    setStep((s) => s + 1);
  };

  const voltar = () => {
    if (step === 1) return;
    setDirection(-1);
    setStep((s) => s - 1);
  };

  const slideVariants = {
    enter: (dir: 1 | -1) => ({
      x: dir === 1 ? 60 : -60,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: 1 | -1) => ({
      x: dir === 1 ? -60 : 60,
      opacity: 0,
    }),
  };

  return (
    <main className="min-h-screen bg-tayah-cream/30">
      {/* Top bar */}
      <header className="border-b border-tayah-gray-200 bg-white">
        <div className="container-tayah flex items-center justify-between py-5">
          <Link
            href="/"
            className="font-serif text-xl tracking-wide text-tayah-black"
          >
            TAYAH<span className="text-tayah-red">.</span>
          </Link>
          <span className="font-sans text-[11px] uppercase tracking-widest text-tayah-gray-700">
            Calculadora · Equiparação Hospitalar
          </span>
        </div>
      </header>

      <div className="container-tayah max-w-3xl py-12 md:py-16">
        <ProgressBar current={step} total={TOTAL_PASSOS} />

        <div className="relative mt-12 overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {step === 1 && (
                <StepCard
                  eyebrow="Passo 1 de 7"
                  question="Como sua atividade médica está organizada hoje?"
                  type="single"
                  options={toOptions(LABEL_TIPO_ORGANIZACAO)}
                  value={respostas.tipoOrganizacao}
                  onChange={(v) =>
                    setRespostas((r) => ({
                      ...r,
                      tipoOrganizacao: v as TipoOrganizacao,
                    }))
                  }
                />
              )}

              {step === 2 && (
                <StepCard
                  eyebrow="Passo 2 de 7"
                  question="Qual o regime tributário da sua PJ hoje?"
                  type="single"
                  options={toOptions(LABEL_REGIME)}
                  value={respostas.regimeTributario}
                  onChange={(v) =>
                    setRespostas((r) => ({
                      ...r,
                      regimeTributario: v as RegimeTributario,
                    }))
                  }
                />
              )}

              {step === 3 && (
                <StepCard
                  eyebrow="Passo 3 de 7"
                  question="Quais serviços médicos você presta?"
                  helper="Marque todos que se aplicam."
                  type="multi"
                  options={toOptions(LABEL_SERVICO)}
                  value={respostas.servicos}
                  onChange={(v) =>
                    setRespostas((r) => ({
                      ...r,
                      servicos: v as ServicoMedico[],
                    }))
                  }
                />
              )}

              {step === 4 && (
                <StepCard
                  eyebrow="Passo 4 de 7"
                  question="Onde a maior parte dos serviços é prestada?"
                  type="single"
                  options={toOptions(LABEL_LOCAL)}
                  value={respostas.localPrestacao}
                  onChange={(v) =>
                    setRespostas((r) => ({
                      ...r,
                      localPrestacao: v as LocalPrestacao,
                    }))
                  }
                />
              )}

              {step === 5 && (
                <StepCard
                  eyebrow="Passo 5 de 7"
                  question="Sua clínica/sociedade possui licença da ANVISA ou da Vigilância Sanitária local?"
                  type="single"
                  options={toOptions(LABEL_LICENCA)}
                  value={respostas.licencaSanitaria}
                  onChange={(v) =>
                    setRespostas((r) => ({
                      ...r,
                      licencaSanitaria: v as LicencaSanitaria,
                    }))
                  }
                />
              )}

              {step === 6 && (
                <StepCard
                  eyebrow="Passo 6 de 7"
                  question="Qual o faturamento bruto mensal médio da PJ?"
                  helper="Usaremos o ponto médio da faixa para a estimativa."
                  type="single"
                  options={toOptions(LABEL_FAIXA_FATURAMENTO)}
                  value={respostas.faixaFaturamento}
                  onChange={(v) =>
                    setRespostas((r) => ({
                      ...r,
                      faixaFaturamento: v as FaixaFaturamento,
                    }))
                  }
                />
              )}

              {step === 7 && (
                <StepCard
                  eyebrow="Passo 7 de 7"
                  question="O que mais te preocupa hoje na parte tributária?"
                  type="single"
                  options={toOptions(LABEL_DUVIDA)}
                  value={respostas.duvidaPrincipal}
                  onChange={(v) =>
                    setRespostas((r) => ({
                      ...r,
                      duvidaPrincipal: v as DuvidaPrincipal,
                    }))
                  }
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Nav buttons */}
        <div className="mt-12 flex items-center justify-between border-t border-tayah-gray-200 pt-8">
          <button
            type="button"
            onClick={voltar}
            disabled={step === 1}
            className="font-sans text-sm uppercase tracking-widest text-tayah-gray-700 transition-colors hover:text-tayah-red disabled:cursor-not-allowed disabled:opacity-30"
          >
            ← Voltar
          </button>

          <button
            type="button"
            onClick={avancar}
            disabled={!podeAvancar}
            className="inline-flex items-center gap-2 rounded-sm bg-tayah-red px-7 py-4 font-sans text-sm font-semibold uppercase tracking-widest text-white transition-all duration-300 hover:bg-tayah-red-dark hover:translate-y-[-1px] disabled:cursor-not-allowed disabled:bg-tayah-gray-300 disabled:text-tayah-gray-700 disabled:hover:translate-y-0"
          >
            {step === TOTAL_PASSOS ? "Ver diagnóstico" : "Avançar"}
            <span aria-hidden>→</span>
          </button>
        </div>

        <p className="mt-10 text-center font-sans text-[11px] leading-relaxed text-tayah-gray-700">
          Suas respostas ficam armazenadas apenas no seu navegador até você
          enviar os dados no final. Estimativa preliminar — não constitui
          parecer fiscal.
        </p>
      </div>
    </main>
  );
}
