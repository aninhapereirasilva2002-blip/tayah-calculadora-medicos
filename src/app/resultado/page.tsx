"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import BlocoComparativo from "@/components/BlocoComparativo";
import BlocoEconomiaEstimada from "@/components/BlocoEconomiaEstimada";
import BlocoMemoriaCalculo from "@/components/BlocoMemoriaCalculo";
import BlocoProjecaoAnoAAno from "@/components/BlocoProjecaoAnoAAno";
import DiagnosticoVerbal from "@/components/DiagnosticoVerbal";
import LeadForm, { type LeadData } from "@/components/LeadForm";
import {
  gerarDiagnostico,
  type Diagnostico,
} from "@/lib/diagnostico";
import {
  calcularEconomia,
  type CalculoTributario,
} from "@/lib/calculo-tributario";
import {
  PONTO_MEDIO_FATURAMENTO,
  STORAGE_KEY,
  type RespostasCalculadora,
} from "@/lib/types";

type Estado =
  | { status: "carregando" }
  | { status: "sem-dados" }
  | { status: "erro"; mensagem: string }
  | {
      status: "pronto";
      diagnostico: Diagnostico;
      respostas: RespostasCalculadora;
      calculo: CalculoTributario;
    };

export default function ResultadoPage() {
  const [estado, setEstado] = useState<Estado>({ status: "carregando" });
  const [enviado, setEnviado] = useState<LeadData | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) {
        setEstado({ status: "sem-dados" });
        return;
      }
      const respostas = JSON.parse(raw) as RespostasCalculadora;
      const diagnostico = gerarDiagnostico(respostas);
      if (!respostas.faixaFaturamento) {
        throw new Error("Faixa de faturamento ausente nas respostas.");
      }
      const calculo = calcularEconomia(
        PONTO_MEDIO_FATURAMENTO[respostas.faixaFaturamento]
      );
      setEstado({ status: "pronto", diagnostico, respostas, calculo });
    } catch (err) {
      setEstado({
        status: "erro",
        mensagem:
          err instanceof Error
            ? err.message
            : "Erro ao processar suas respostas.",
      });
    }
  }, []);

  return (
    <main className="min-h-screen bg-tayah-cream/30">
      <header className="border-b border-tayah-gray-200 bg-white">
        <div className="container-tayah flex items-center justify-between py-5">
          <Link
            href="/"
            className="font-serif text-xl tracking-wide text-tayah-black"
          >
            TAYAH<span className="text-tayah-red">.</span>
          </Link>
          <span className="font-sans text-[11px] uppercase tracking-widest text-tayah-gray-700">
            Diagnóstico tributário
          </span>
        </div>
      </header>

      <div className="container-tayah max-w-3xl py-12 md:py-20">
        {estado.status === "carregando" && (
          <p className="font-sans text-sm text-tayah-gray-700">Carregando…</p>
        )}

        {estado.status === "sem-dados" && <SemDados />}
        {estado.status === "erro" && <ErroEstado mensagem={estado.mensagem} />}

        {estado.status === "pronto" && (
          <>
            <DiagnosticoVerbal diagnostico={estado.diagnostico} />

            {/* Bloco B — Card "Economia Tributária Anual Estimada" */}
            <div className="mt-12">
              <BlocoEconomiaEstimada calculo={estado.calculo} />
            </div>

            {/* Bloco C — Comparativo lado a lado */}
            <div className="mt-12">
              <BlocoComparativo calculo={estado.calculo} />
            </div>

            {/* Bloco D — Memória de cálculo */}
            <div className="mt-12">
              <BlocoMemoriaCalculo calculo={estado.calculo} />
            </div>

            {/* Bloco E — Projeção ano a ano */}
            <div className="mt-6">
              <BlocoProjecaoAnoAAno calculo={estado.calculo} />
            </div>

            <div className="mt-16">
              {enviado ? (
                <PainelPosEnvio
                  lead={enviado}
                  diagnostico={estado.diagnostico}
                />
              ) : (
                <GateLead
                  diagnostico={estado.diagnostico}
                  respostas={estado.respostas}
                  calculo={estado.calculo}
                  onSuccess={(data) => setEnviado(data)}
                />
              )}
            </div>

            <div className="mt-16">
              <Link
                href="/calculadora"
                className="font-sans text-xs uppercase tracking-widest text-tayah-gray-700 hover:text-tayah-red"
              >
                ← Refazer calculadora
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

function GateLead({
  diagnostico,
  respostas,
  calculo,
  onSuccess,
}: {
  diagnostico: Diagnostico;
  respostas: RespostasCalculadora;
  calculo: CalculoTributario;
  onSuccess: (data: LeadData) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="border border-tayah-gray-200 bg-white p-8 md:p-10"
    >
      <p className="eyebrow mb-3">Próximos passos</p>
      <h2 className="font-serif text-3xl text-tayah-black md:text-4xl">
        Receba a análise completa
      </h2>
      <p className="mt-3 max-w-xl font-sans text-sm leading-relaxed text-tayah-gray-700">
        Preencha seus dados para liberar as recomendações específicas para o
        seu caso e ser contatado pela equipe Tayah em até 1 dia útil.
      </p>

      <div className="mt-8">
        <LeadForm
          onSuccess={onSuccess}
          payloadAdicional={{
            diagnostico: {
              nivel: diagnostico.nivel,
              pontuacao: diagnostico.pontuacao,
              sinalizacoes: diagnostico.sinalizacoes,
              respostasOriginais: respostas,
            },
            calculo,
          }}
        />
      </div>
    </motion.div>
  );
}

function PainelPosEnvio({
  lead,
  diagnostico,
}: {
  lead: LeadData;
  diagnostico: Diagnostico;
}) {
  const numero = process.env.NEXT_PUBLIC_WHATSAPP_NUMERO || "5511999999999";
  const mensagem = encodeURIComponent(
    `Olá, Tayah! Sou ${lead.nome} e acabei de fazer a calculadora de equiparação hospitalar (diagnóstico ${diagnostico.nivel}). Gostaria de avançar com a análise.`
  );
  const linkWa = `https://wa.me/${numero}?text=${mensagem}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="border border-tayah-red bg-tayah-red/5 p-8 md:p-10"
    >
      <p className="eyebrow mb-3">Recebido com sucesso</p>
      <h2 className="font-serif text-3xl text-tayah-black md:text-4xl">
        Obrigado, {lead.nome.split(" ")[0]}.
      </h2>
      <p className="mt-3 max-w-xl font-sans text-sm leading-relaxed text-tayah-gray-700">
        Em até <strong className="text-tayah-black">1 dia útil</strong> um
        advogado da Tayah vai te retornar pelo WhatsApp ou email para apresentar
        os próximos passos.
      </p>

      <div className="mt-8 border-t border-tayah-red/20 pt-6">
        <p className="font-sans text-xs uppercase tracking-widest text-tayah-gray-700">
          Próximo passo recomendado
        </p>
        <p className="mt-2 font-serif text-xl text-tayah-black">
          Análise dos atos constitutivos e enquadramento administrativo
        </p>
        <p className="mt-2 font-sans text-sm leading-relaxed text-tayah-gray-700">
          Validação do contrato social, alvarás sanitários e tipos de
          procedimento prestados, com elaboração do pedido de equiparação na
          esfera administrativa (sem necessidade de judicialização imediata).
        </p>
      </div>

      <a
        href={linkWa}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex items-center gap-2 rounded-sm bg-emerald-600 px-7 py-4 font-sans text-sm font-semibold uppercase tracking-widest text-white transition-all duration-300 hover:bg-emerald-700 hover:translate-y-[-1px]"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="currentColor"
          aria-hidden
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.057 22a9.95 9.95 0 0 1-5.054-1.37l-5.624 1.473 1.502-5.49a9.92 9.92 0 0 1-1.488-5.245C1.392 6.135 6.13 1.4 11.96 1.4c2.834 0 5.498 1.103 7.5 3.107a10.554 10.554 0 0 1 3.097 7.502c-.002 5.804-4.74 10.54-10.5 10.99zM12 0C5.373 0 0 5.373 0 12c0 2.119.553 4.207 1.605 6.045L0 24l6.078-1.585A11.953 11.953 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
        </svg>
        Falar com a equipe Tayah agora
      </a>
    </motion.div>
  );
}

function SemDados() {
  return (
    <div className="border border-tayah-gray-200 bg-white p-8">
      <h1 className="font-serif text-3xl text-tayah-black md:text-4xl">
        Nenhuma análise encontrada
      </h1>
      <p className="mt-3 font-sans text-sm text-tayah-gray-700">
        Para ver o diagnóstico tributário, primeiro responda às 7 perguntas da
        calculadora.
      </p>
      <Link
        href="/calculadora"
        className="mt-6 inline-flex items-center gap-2 rounded-sm bg-tayah-red px-6 py-3 font-sans text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-tayah-red-dark"
      >
        Ir para a calculadora <span aria-hidden>→</span>
      </Link>
    </div>
  );
}

function ErroEstado({ mensagem }: { mensagem: string }) {
  return (
    <div className="border border-tayah-red bg-tayah-red/5 p-8">
      <h1 className="font-serif text-3xl text-tayah-black md:text-4xl">
        Não foi possível gerar o diagnóstico
      </h1>
      <p className="mt-3 font-sans text-sm text-tayah-gray-700">{mensagem}</p>
      <Link
        href="/calculadora"
        className="mt-6 inline-flex items-center gap-2 rounded-sm bg-tayah-red px-6 py-3 font-sans text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-tayah-red-dark"
      >
        Refazer calculadora <span aria-hidden>→</span>
      </Link>
    </div>
  );
}
