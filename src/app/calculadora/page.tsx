"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
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
    <main className="min-h-screen bg-tayah-cream">
      <div className="mx-auto w-full max-w-[720px] px-4 py-8 md:px-6 md:py-16">
        <div className="rounded-2xl bg-tayah-white p-6 shadow-tayah-card md:p-12">
          <ProgressBar current={step} total={TOTAL_PASSOS} />

          <div className="relative mt-8 overflow-hidden">
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

          <div className="mt-10 flex items-center justify-between gap-3 border-t border-tayah-border-soft pt-6">
            <button
              type="button"
              onClick={voltar}
              disabled={step === 1}
              className="inline-flex items-center gap-2 rounded-md border-2 border-tayah-border-card bg-tayah-white px-5 py-3 font-sans text-sm font-semibold text-tayah-text-muted transition-colors hover:border-tayah-text-muted hover:text-tayah-text-strong disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-tayah-border-card disabled:hover:text-tayah-text-muted"
            >
              <span aria-hidden>←</span> Voltar
            </button>
            <button
              type="button"
              onClick={avancar}
              disabled={!podeAvancar}
              className="inline-flex items-center gap-2 rounded-md bg-tayah-red px-6 py-3 font-sans text-sm font-semibold text-tayah-white transition-all duration-200 hover:scale-[1.02] hover:bg-tayah-red-dark disabled:cursor-not-allowed disabled:bg-tayah-border-card disabled:text-tayah-text-muted disabled:hover:scale-100 disabled:hover:bg-tayah-border-card"
            >
              {step === TOTAL_PASSOS ? "Ver diagnóstico" : "Próximo"}
              <span aria-hidden>→</span>
            </button>
          </div>
        </div>

        <p className="mt-6 text-center font-sans text-[11px] leading-relaxed text-tayah-text-muted">
          Suas respostas ficam armazenadas apenas no seu navegador até você
          enviar os dados no final. Estimativa preliminar — não constitui
          parecer fiscal.
        </p>
      </div>
    </main>
  );
}
