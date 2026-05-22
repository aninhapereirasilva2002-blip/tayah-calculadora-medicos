"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { z } from "zod";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const leadSchema = z.object({
  nome: z.string().trim().min(3, "Nome muito curto (mínimo 3 caracteres)."),
  email: z.string().trim().email("Email inválido."),
  whatsapp: z
    .string()
    .regex(
      /^\(\d{2}\)\s\d{4,5}-\d{4}$/,
      "WhatsApp inválido — use o formato (XX) XXXXX-XXXX."
    ),
  crmOuEspecialidade: z.string().trim().optional(),
  aceiteLgpd: z.literal(true, {
    errorMap: () => ({
      message: "Você precisa autorizar o contato para receber a análise.",
    }),
  }),
});

export type LeadData = z.infer<typeof leadSchema>;

interface Props {
  onSuccess: (data: LeadData) => void;
  payloadAdicional?: Record<string, unknown>;
}

function formatarWhatsapp(valor: string): string {
  const num = valor.replace(/\D/g, "").slice(0, 11);
  if (num.length <= 2) return num;
  if (num.length <= 6) return `(${num.slice(0, 2)}) ${num.slice(2)}`;
  if (num.length <= 10)
    return `(${num.slice(0, 2)}) ${num.slice(2, 6)}-${num.slice(6)}`;
  return `(${num.slice(0, 2)}) ${num.slice(2, 7)}-${num.slice(7)}`;
}

export default function LeadForm({ onSuccess, payloadAdicional }: Props) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [crmOuEspecialidade, setCrm] = useState("");
  const [aceiteLgpd, setAceite] = useState(false);

  const [erros, setErros] = useState<Record<string, string>>({});
  const [erroGlobal, setErroGlobal] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setErros({});
    setErroGlobal(null);

    const parsed = leadSchema.safeParse({
      nome,
      email,
      whatsapp,
      crmOuEspecialidade: crmOuEspecialidade || undefined,
      aceiteLgpd,
    });

    if (!parsed.success) {
      const novosErros: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const campo = issue.path[0];
        if (typeof campo === "string" && !novosErros[campo]) {
          novosErros[campo] = issue.message;
        }
      }
      setErros(novosErros);
      return;
    }

    setEnviando(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...parsed.data, ...payloadAdicional }),
      });
      const json = await res.json().catch(() => ({ success: false }));
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Falha ao enviar. Tente novamente.");
      }
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "Lead", {
          content_name: "Calculadora Equiparacao Hospitalar",
          content_category: "Direito Tributario Medico",
        });
      }
      onSuccess(parsed.data);
    } catch (err) {
      setErroGlobal(
        err instanceof Error ? err.message : "Erro inesperado ao enviar."
      );
    } finally {
      setEnviando(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-5" noValidate>
      <Campo
        label="Nome completo"
        required
        erro={erros.nome}
        valor={nome}
        onChange={setNome}
        placeholder="Como você gostaria de ser chamado(a)"
        autoComplete="name"
      />

      <Campo
        label="E-mail"
        type="email"
        required
        erro={erros.email}
        valor={email}
        onChange={setEmail}
        placeholder="seu@email.com"
        autoComplete="email"
      />

      <Campo
        label="WhatsApp"
        type="tel"
        required
        erro={erros.whatsapp}
        valor={whatsapp}
        onChange={(v) => setWhatsapp(formatarWhatsapp(v))}
        placeholder="(11) 99999-9999"
        autoComplete="tel"
        inputMode="numeric"
      />

      <Campo
        label="CRM ou especialidade"
        erro={erros.crmOuEspecialidade}
        valor={crmOuEspecialidade}
        onChange={setCrm}
        placeholder="Opcional — ex: CRM-SP 123456 / Anestesiologia"
        helper="Opcional · ajuda a equipe a contextualizar o retorno."
      />

      <label className="flex cursor-pointer items-start gap-3 rounded-md border-2 border-tayah-border-card bg-tayah-white p-4 transition-colors hover:border-tayah-red/40">
        <input
          type="checkbox"
          checked={aceiteLgpd}
          onChange={(e) => setAceite(e.target.checked)}
          className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-tayah-red"
        />
        <span className="font-sans text-xs leading-relaxed text-tayah-text-muted">
          Autorizo o tratamento dos meus dados pela Tayah Advogados para
          contato sobre este diagnóstico, conforme a{" "}
          <Link
            href="/politica-privacidade"
            className="text-tayah-red underline underline-offset-2 hover:text-tayah-red-dark"
            target="_blank"
          >
            Política de Privacidade
          </Link>
          .
        </span>
      </label>
      {erros.aceiteLgpd && (
        <p className="font-sans text-xs text-tayah-red">{erros.aceiteLgpd}</p>
      )}

      {erroGlobal && (
        <div
          role="alert"
          className="rounded-md border border-tayah-red bg-tayah-cream-deep p-4 font-sans text-sm text-tayah-red"
        >
          {erroGlobal}
        </div>
      )}

      <button
        type="submit"
        disabled={enviando}
        className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-tayah-red py-[18px] px-7 font-sans text-base font-semibold text-tayah-white transition-all duration-300 hover:bg-tayah-red-dark hover:translate-y-[-1px] disabled:cursor-not-allowed disabled:bg-tayah-border-card disabled:text-tayah-text-muted disabled:hover:translate-y-0"
      >
        {enviando ? (
          "Enviando…"
        ) : (
          <>
            <span aria-hidden>📱</span>
            Quero falar com a equipe Tayah
          </>
        )}
      </button>

      <p className="font-sans text-[11px] leading-relaxed text-tayah-text-muted">
        Seus dados ficam confidenciais e são tratados apenas pela equipe
        jurídica da Tayah Advogados. Você pode solicitar exclusão a qualquer
        momento via dpo@tayah.com.br.
      </p>
    </form>
  );
}

function Campo({
  label,
  valor,
  onChange,
  erro,
  helper,
  type = "text",
  placeholder,
  required,
  autoComplete,
  inputMode,
}: {
  label: string;
  valor: string;
  onChange: (v: string) => void;
  erro?: string;
  helper?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
  inputMode?: "text" | "tel" | "email" | "numeric";
}) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center">
        <span className="font-sans text-xs font-semibold uppercase tracking-widest text-tayah-text-muted">
          {label} {required && <span className="text-tayah-red">*</span>}
        </span>
      </span>
      <input
        type={type}
        value={valor}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        className={`w-full rounded-md border bg-tayah-white px-4 py-3 font-sans text-base text-tayah-text-strong placeholder:text-tayah-text-muted/60 focus:outline-none focus:ring-2 focus:ring-tayah-red focus:ring-offset-0 ${
          erro
            ? "border-tayah-red"
            : "border-tayah-border-card hover:border-tayah-text-muted"
        }`}
      />
      {erro ? (
        <p className="mt-1.5 font-sans text-xs text-tayah-red">{erro}</p>
      ) : helper ? (
        <p className="mt-1.5 font-sans text-xs text-tayah-text-muted">
          {helper}
        </p>
      ) : null}
    </label>
  );
}
