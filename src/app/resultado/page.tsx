"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import CardEconomiaPotencial from "@/components/CardEconomiaPotencial";
import CardsResumo from "@/components/CardsResumo";
import LeadForm, { type LeadData } from "@/components/LeadForm";
import TabsResultado from "@/components/TabsResultado";
import WhatsAppIcon from "@/components/icons/WhatsApp";
import {
  contarRequisitosAtendidos,
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
    <main className="min-h-screen bg-tayah-cream">
      <div className="mx-auto w-full max-w-[1200px] px-4 py-8 md:px-6 md:py-12">
        {estado.status === "carregando" && (
          <p className="font-sans text-sm text-tayah-text-muted">Carregando…</p>
        )}

        {estado.status === "sem-dados" && <SemDados />}
        {estado.status === "erro" && <ErroEstado mensagem={estado.mensagem} />}

        {estado.status === "pronto" && (
          <>
            <BarraAcoes />

            <div className="mt-6">
              <CardsResumo
                calculo={estado.calculo}
                nivel={estado.diagnostico.nivel}
                requisitosAtendidos={contarRequisitosAtendidos(
                  estado.respostas
                )}
              />
            </div>

            <div className="mt-6">
              <CardEconomiaPotencial calculo={estado.calculo} />
            </div>

            <div className="mt-6">
              <TabsResultado calculo={estado.calculo} />
            </div>

            <div className="mt-8 print:hidden">
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
          </>
        )}
      </div>
    </main>
  );
}

function BarraAcoes() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
      <div className="flex flex-wrap gap-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-md border-2 border-tayah-border-card bg-tayah-white px-4 py-2 font-sans text-sm font-semibold text-tayah-text-muted transition-colors hover:border-tayah-text-muted hover:text-tayah-text-strong"
        >
          <span aria-hidden>←</span> Voltar
        </Link>
        <Link
          href="/calculadora"
          className="inline-flex items-center gap-2 rounded-md border-2 border-tayah-border-card bg-tayah-white px-4 py-2 font-sans text-sm font-semibold text-tayah-text-muted transition-colors hover:border-tayah-text-muted hover:text-tayah-text-strong"
        >
          <span aria-hidden>↻</span> Novo cálculo
        </Link>
      </div>
      <button
        type="button"
        onClick={() => window.print()}
        className="inline-flex items-center gap-2 rounded-md bg-tayah-red px-4 py-2 font-sans text-sm font-semibold text-tayah-white transition-all hover:scale-[1.02] hover:bg-tayah-red-dark"
      >
        <span aria-hidden>📄</span> Gerar relatório PDF
      </button>
    </div>
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
      className="rounded-2xl bg-tayah-white p-6 shadow-tayah-card md:p-10"
    >
      <h2 className="font-serif text-3xl text-tayah-text-strong md:text-4xl">
        Receba a análise completa por e-mail e fale com nossa equipe
      </h2>
      <p className="mt-3 max-w-2xl font-sans text-sm leading-relaxed text-tayah-text-muted md:text-base">
        Em até <strong className="text-tayah-text-strong">1 dia útil</strong>{" "}
        um advogado tributarista da Tayah te retorna.
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
  const numero = process.env.NEXT_PUBLIC_WHATSAPP_NUMERO || "5521972473104";
  const mensagem = encodeURIComponent(
    `Olá, Tayah! Sou ${lead.nome} e acabei de fazer a calculadora de equiparação hospitalar (diagnóstico ${diagnostico.nivel}). Gostaria de avançar com a análise.`
  );
  const linkWa = `https://wa.me/${numero}?text=${mensagem}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl border-2 border-tayah-red bg-tayah-cream-deep p-6 md:p-10"
    >
      <p className="font-sans text-[11px] font-semibold uppercase tracking-[2px] text-tayah-red">
        Recebido com sucesso
      </p>
      <h2 className="mt-3 font-serif text-3xl text-tayah-text-strong md:text-4xl">
        Obrigado, {lead.nome.split(" ")[0]}.
      </h2>
      <p className="mt-3 max-w-xl font-sans text-sm leading-relaxed text-tayah-text-muted md:text-base">
        Em até <strong className="text-tayah-text-strong">1 dia útil</strong>{" "}
        um advogado da Tayah vai te retornar pelo WhatsApp ou email para
        apresentar os próximos passos.
      </p>

      <div className="mt-8 border-t border-tayah-red/20 pt-6">
        <p className="font-sans text-xs uppercase tracking-widest text-tayah-text-muted">
          Próximo passo recomendado
        </p>
        <p className="mt-2 font-serif text-xl text-tayah-text-strong">
          Análise dos atos constitutivos e enquadramento administrativo
        </p>
        <p className="mt-2 font-sans text-sm leading-relaxed text-tayah-text-muted">
          Validação do contrato social, alvarás sanitários e tipos de
          procedimento prestados, com elaboração do pedido de equiparação na
          esfera administrativa (sem necessidade de judicialização imediata).
        </p>
      </div>

      <a
        href={linkWa}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex items-center gap-2 rounded-md bg-tayah-green px-6 py-4 font-sans text-sm font-semibold text-tayah-white transition-all duration-300 hover:translate-y-[-1px] hover:opacity-90"
      >
        <WhatsAppIcon className="h-4 w-4" />
        Falar com a equipe Tayah agora
      </a>
    </motion.div>
  );
}

function SemDados() {
  return (
    <div className="rounded-2xl border border-tayah-border-card bg-tayah-white p-8 shadow-tayah-card-sm">
      <h1 className="font-serif text-3xl text-tayah-text-strong md:text-4xl">
        Nenhuma análise encontrada
      </h1>
      <p className="mt-3 font-sans text-sm text-tayah-text-muted">
        Para ver o diagnóstico tributário, primeiro responda às 7 perguntas da
        calculadora.
      </p>
      <Link
        href="/calculadora"
        className="mt-6 inline-flex items-center gap-2 rounded-md bg-tayah-red px-6 py-3 font-sans text-sm font-semibold text-tayah-white transition-colors hover:bg-tayah-red-dark"
      >
        Ir para a calculadora <span aria-hidden>→</span>
      </Link>
    </div>
  );
}

function ErroEstado({ mensagem }: { mensagem: string }) {
  return (
    <div className="rounded-2xl border-2 border-tayah-red bg-tayah-cream-deep p-8">
      <h1 className="font-serif text-3xl text-tayah-text-strong md:text-4xl">
        Não foi possível gerar o diagnóstico
      </h1>
      <p className="mt-3 font-sans text-sm text-tayah-text-muted">{mensagem}</p>
      <Link
        href="/calculadora"
        className="mt-6 inline-flex items-center gap-2 rounded-md bg-tayah-red px-6 py-3 font-sans text-sm font-semibold text-tayah-white transition-colors hover:bg-tayah-red-dark"
      >
        Refazer calculadora <span aria-hidden>→</span>
      </Link>
    </div>
  );
}
