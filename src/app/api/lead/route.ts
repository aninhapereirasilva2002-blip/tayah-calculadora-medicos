import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { formatBRL } from "@/lib/calculo-tributario";
import { type NivelDiagnostico } from "@/lib/diagnostico";
import {
  LABEL_DUVIDA,
  LABEL_FAIXA_FATURAMENTO,
  LABEL_LICENCA,
  LABEL_LOCAL,
  LABEL_REGIME,
  LABEL_SERVICO,
  LABEL_TIPO_ORGANIZACAO,
  type ServicoMedico,
} from "@/lib/types";

const sinalizacaoSchema = z.object({
  tipo: z.enum(["critico", "atencao", "positivo"]),
  texto: z.string(),
});

const diagnosticoPayloadSchema = z.object({
  nivel: z.enum(["FORTE", "MEDIO", "FRACO"]),
  pontuacao: z.number(),
  sinalizacoes: z.array(sinalizacaoSchema),
  respostasOriginais: z.object({
    tipoOrganizacao: z.string().nullable(),
    regimeTributario: z.string().nullable(),
    servicos: z.array(z.string()),
    localPrestacao: z.string().nullable(),
    licencaSanitaria: z.string().nullable(),
    faixaFaturamento: z.string().nullable(),
    duvidaPrincipal: z.string().nullable(),
  }),
});

const cenarioSchema = z.object({
  baseIRPJ: z.number(),
  irpj: z.number(),
  baseCSLL: z.number(),
  csll: z.number(),
  totalMensal: z.number(),
  totalAnual: z.number(),
  aliquotaEfetiva: z.number(),
});

const calculoSchema = z.object({
  faturamentoMensal: z.number(),
  faturamentoAnual: z.number(),
  semEquiparacao: cenarioSchema,
  comEquiparacao: cenarioSchema,
  economia: z.object({
    mensal: z.number(),
    anual: z.number(),
    em5anos: z.number(),
    em10anos: z.number(),
    percentualReducao: z.number(),
    diferencaPontosPercentuais: z.number(),
  }),
});

const payloadSchema = z.object({
  nome: z.string().trim().min(3),
  email: z.string().trim().email(),
  whatsapp: z.string().regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$/),
  crmOuEspecialidade: z.string().trim().optional(),
  aceiteLgpd: z.literal(true),
  diagnostico: diagnosticoPayloadSchema,
  calculo: calculoSchema,
});

type Payload = z.infer<typeof payloadSchema>;

const NIVEL_VISUAL: Record<
  NivelDiagnostico,
  { icon: string; label: string; cor: string }
> = {
  FORTE: { icon: "🟢", label: "FORTE", cor: "#16a34a" },
  MEDIO: { icon: "🟡", label: "MÉDIO", cor: "#d97706" },
  FRACO: { icon: "⚪", label: "FRACO", cor: "#6b7280" },
};

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Payload inválido (JSON malformado)." },
      { status: 400 }
    );
  }

  const parsed = payloadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        error: "Dados inválidos.",
        issues: parsed.error.issues.map((i) => ({
          path: i.path.join("."),
          message: i.message,
        })),
      },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const destino = process.env.EMAIL_DESTINO;
  const naoConfigurado =
    !apiKey ||
    !destino ||
    apiKey.startsWith("PLACEHOLDER") ||
    destino.startsWith("PLACEHOLDER");

  if (naoConfigurado) {
    console.warn(
      "[/api/lead] Resend não configurado (RESEND_API_KEY / EMAIL_DESTINO ausentes)."
    );
    if (process.env.NODE_ENV !== "production") {
      console.log("[/api/lead] lead (não enviado, dev):", parsed.data);
      return NextResponse.json({ success: true, simulado: true });
    }
    return NextResponse.json(
      { success: false, error: "Serviço de email não configurado." },
      { status: 503 }
    );
  }

  try {
    const resend = new Resend(apiKey);
    const { html, assunto } = montarEmail(parsed.data);

    const result = await resend.emails.send({
      from: "Tayah Calculadora <onboarding@resend.dev>",
      to: [destino],
      replyTo: parsed.data.email,
      subject: assunto,
      html,
    });

    if (result.error) {
      console.error("[/api/lead] Resend error:", result.error);
      return NextResponse.json(
        { success: false, error: "Falha ao enviar email." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[/api/lead] Erro inesperado:", err);
    return NextResponse.json(
      { success: false, error: "Erro inesperado ao enviar." },
      { status: 500 }
    );
  }
}

function montarEmail(p: Payload): { html: string; assunto: string } {
  const niv = NIVEL_VISUAL[p.diagnostico.nivel];
  const assunto = `🩺 Novo lead médico — ${p.nome} — ${niv.icon} ${niv.label}`;

  const dataHora = new Date().toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    dateStyle: "long",
    timeStyle: "short",
  });

  const numeroWa = p.whatsapp.replace(/\D/g, "");
  const numeroWaIntl = numeroWa.length === 11 ? `55${numeroWa}` : numeroWa;
  const msgWa = encodeURIComponent(
    `Olá, ${p.nome.split(" ")[0]}! Aqui é da equipe Tayah Advogados — recebemos seu diagnóstico tributário da calculadora médica (resultado ${niv.label}) e gostaríamos de conversar sobre os próximos passos.`
  );
  const linkWa = `https://wa.me/${numeroWaIntl}?text=${msgWa}`;

  const r = p.diagnostico.respostasOriginais;
  const linhasRespostas: Array<{ label: string; valor: string }> = [
    {
      label: "Tipo de organização",
      valor: lookupLabel(r.tipoOrganizacao, LABEL_TIPO_ORGANIZACAO),
    },
    {
      label: "Regime tributário",
      valor: lookupLabel(r.regimeTributario, LABEL_REGIME),
    },
    {
      label: "Serviços prestados",
      valor: r.servicos.length
        ? r.servicos
            .map((s) => LABEL_SERVICO[s as ServicoMedico] || s)
            .join(", ")
        : "—",
    },
    {
      label: "Local de prestação",
      valor: lookupLabel(r.localPrestacao, LABEL_LOCAL),
    },
    {
      label: "Licença sanitária",
      valor: lookupLabel(r.licencaSanitaria, LABEL_LICENCA),
    },
    {
      label: "Faturamento mensal",
      valor: lookupLabel(r.faixaFaturamento, LABEL_FAIXA_FATURAMENTO),
    },
    {
      label: "Dúvida principal",
      valor: lookupLabel(r.duvidaPrincipal, LABEL_DUVIDA),
    },
  ];

  const linhasContato: Array<{ label: string; valorHtml: string }> = [
    { label: "Nome", valorHtml: `<strong>${escapeHtml(p.nome)}</strong>` },
    {
      label: "Email",
      valorHtml: `<a href="mailto:${escapeHtml(
        p.email
      )}" style="color:#8A2A2B;text-decoration:underline;">${escapeHtml(
        p.email
      )}</a>`,
    },
    {
      label: "WhatsApp",
      valorHtml: `<a href="${linkWa}" style="color:#8A2A2B;text-decoration:underline;">${escapeHtml(
        p.whatsapp
      )}</a>`,
    },
  ];
  if (p.crmOuEspecialidade) {
    linhasContato.push({
      label: "CRM / especialidade",
      valorHtml: escapeHtml(p.crmOuEspecialidade),
    });
  }

  const c = p.calculo;

  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Novo lead — Tayah Calculadora</title>
</head>
<body style="margin:0;padding:0;background-color:#f5f5f5;font-family:'Helvetica Neue',Arial,sans-serif;color:#0A0A0A;-webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:24px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #e5e5e5;max-width:600px;width:100%;">

          <tr>
            <td style="background:#8A2A2B;padding:28px 32px;color:#ffffff;">
              <div style="font-family:Georgia,'Cormorant Garamond',serif;font-size:26px;letter-spacing:0.05em;">
                TAYAH<span style="opacity:0.65;">.</span>
              </div>
              <div style="font-size:11px;letter-spacing:0.22em;text-transform:uppercase;opacity:0.85;margin-top:4px;">
                Advogados · Calculadora Médicos
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:22px 32px 4px;color:#666666;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;">
              Novo lead · ${escapeHtml(dataHora)}
            </td>
          </tr>

          <tr>
            <td style="padding:12px 32px 8px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FDF6F7;border:1px solid #8A2A2B33;">
                <tr>
                  <td style="padding:22px 24px;">
                    <div style="font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:${niv.cor};font-weight:700;">
                      ${niv.icon} Diagnóstico ${niv.label} · pontuação ${p.diagnostico.pontuacao}
                    </div>
                    <div style="font-family:Georgia,'Cormorant Garamond',serif;font-size:34px;color:#8A2A2B;margin-top:8px;line-height:1.1;">
                      ${formatBRL(c.economia.anual)}
                    </div>
                    <div style="font-size:13px;color:#666666;margin-top:4px;">
                      Economia anual estimada · IRPJ + CSLL · Lucro Presumido
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:8px 32px 8px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F5F5F5;border:1px solid #e5e5e5;">
                <tr>
                  <td style="padding:20px 24px;">
                    <div style="font-family:Georgia,serif;font-size:16px;color:#0A0A0A;font-weight:600;margin-bottom:14px;">
                      📊 Estimativa tributária calculada
                    </div>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:13px;">
                      <tr>
                        <td style="padding:3px 12px 3px 0;color:#666666;">Faturamento mensal estimado:</td>
                        <td style="padding:3px 0;text-align:right;font-weight:600;color:#0A0A0A;">${formatBRL(c.faturamentoMensal)}</td>
                      </tr>
                      <tr>
                        <td style="padding:3px 12px 3px 0;color:#666666;">Faturamento anual estimado:</td>
                        <td style="padding:3px 0;text-align:right;font-weight:600;color:#0A0A0A;">${formatBRL(c.faturamentoAnual)}</td>
                      </tr>
                    </table>

                    <div style="margin-top:16px;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#8A2A2B;font-weight:700;">▼ Sem equiparação (atual)</div>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:13px;margin-top:4px;">
                      <tr>
                        <td style="padding:3px 12px 3px 18px;color:#666666;">IRPJ + CSLL mensal:</td>
                        <td style="padding:3px 0;text-align:right;color:#0A0A0A;">${formatBRL(c.semEquiparacao.totalMensal)}</td>
                      </tr>
                      <tr>
                        <td style="padding:3px 12px 3px 18px;color:#666666;">IRPJ + CSLL anual:</td>
                        <td style="padding:3px 0;text-align:right;color:#0A0A0A;">${formatBRL(c.semEquiparacao.totalAnual)}</td>
                      </tr>
                    </table>

                    <div style="margin-top:16px;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#2E7D32;font-weight:700;">▼ Com equiparação (potencial)</div>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:13px;margin-top:4px;">
                      <tr>
                        <td style="padding:3px 12px 3px 18px;color:#666666;">IRPJ + CSLL mensal:</td>
                        <td style="padding:3px 0;text-align:right;color:#0A0A0A;">${formatBRL(c.comEquiparacao.totalMensal)}</td>
                      </tr>
                      <tr>
                        <td style="padding:3px 12px 3px 18px;color:#666666;">IRPJ + CSLL anual:</td>
                        <td style="padding:3px 0;text-align:right;color:#0A0A0A;">${formatBRL(c.comEquiparacao.totalAnual)}</td>
                      </tr>
                    </table>

                    <div style="margin-top:16px;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#8A2A2B;font-weight:700;">▼ Economia potencial</div>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:13px;margin-top:4px;">
                      <tr>
                        <td style="padding:3px 12px 3px 18px;color:#666666;">Mensal:</td>
                        <td style="padding:3px 0;text-align:right;color:#0A0A0A;font-weight:600;">${formatBRL(c.economia.mensal)}</td>
                      </tr>
                      <tr>
                        <td style="padding:3px 12px 3px 18px;color:#666666;">Anual:</td>
                        <td style="padding:3px 0;text-align:right;color:#0A0A0A;font-weight:600;">${formatBRL(c.economia.anual)}</td>
                      </tr>
                      <tr>
                        <td style="padding:3px 12px 3px 18px;color:#666666;">Em 5 anos:</td>
                        <td style="padding:3px 0;text-align:right;color:#0A0A0A;font-weight:600;">${formatBRL(c.economia.em5anos)}</td>
                      </tr>
                      <tr>
                        <td style="padding:3px 12px 3px 18px;color:#666666;">Redução percentual:</td>
                        <td style="padding:3px 0;text-align:right;color:#8A2A2B;font-weight:700;">${c.economia.percentualReducao.toFixed(2)}%</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:24px 32px 8px;">
              <h2 style="font-family:Georgia,serif;font-size:18px;color:#0A0A0A;margin:0 0 14px;font-weight:600;">Dados de contato</h2>
              <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:14px;">
                ${linhasContato
                  .map(
                    (l) => `
                <tr>
                  <td style="padding:5px 18px 5px 0;color:#666666;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;vertical-align:top;width:140px;">${escapeHtml(
                    l.label
                  )}</td>
                  <td style="padding:5px 0;font-size:14px;vertical-align:top;">${
                    l.valorHtml
                  }</td>
                </tr>`
                  )
                  .join("")}
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:12px 32px 24px;">
              <a href="${linkWa}" style="display:inline-block;background:#16a34a;color:#ffffff;padding:14px 26px;text-decoration:none;font-weight:700;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;">
                💬 Falar com o cliente no WhatsApp
              </a>
            </td>
          </tr>

          <tr>
            <td style="padding:0 32px 8px;">
              <h2 style="font-family:Georgia,serif;font-size:18px;color:#0A0A0A;margin:24px 0 12px;border-top:1px solid #e5e5e5;padding-top:24px;font-weight:600;">Respostas da calculadora</h2>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;">
                ${linhasRespostas
                  .map(
                    (l) => `
                <tr>
                  <td style="padding:8px 18px 8px 0;color:#666666;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;vertical-align:top;width:160px;">${escapeHtml(
                    l.label
                  )}</td>
                  <td style="padding:8px 0;font-size:14px;vertical-align:top;color:#0A0A0A;">${escapeHtml(
                    l.valor
                  )}</td>
                </tr>`
                  )
                  .join("")}
              </table>
            </td>
          </tr>

          ${
            p.diagnostico.sinalizacoes.length > 0
              ? `
          <tr>
            <td style="padding:0 32px 24px;">
              <h2 style="font-family:Georgia,serif;font-size:18px;color:#0A0A0A;margin:24px 0 12px;border-top:1px solid #e5e5e5;padding-top:24px;font-weight:600;">Sinalizações detectadas</h2>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;">
                ${p.diagnostico.sinalizacoes
                  .map(
                    (s) => `
                <tr>
                  <td style="padding:7px 0;vertical-align:top;">
                    <span style="display:inline-block;background:${corPorTipo(
                      s.tipo
                    )};color:#ffffff;padding:2px 8px;font-size:10px;letter-spacing:0.15em;text-transform:uppercase;font-weight:700;margin-right:8px;">${escapeHtml(
                      labelTipoSinalizacao(s.tipo)
                    )}</span>
                    <span style="color:#0A0A0A;line-height:1.6;">${escapeHtml(
                      s.texto
                    )}</span>
                  </td>
                </tr>`
                  )
                  .join("")}
              </table>
            </td>
          </tr>`
              : ""
          }

          <tr>
            <td style="padding:28px 32px;background:#0A0A0A;color:#ffffff;">
              <div style="font-family:Georgia,serif;font-size:16px;letter-spacing:0.05em;">
                TAYAH<span style="color:#8A2A2B">.</span>
              </div>
              <div style="font-size:10px;letter-spacing:0.22em;text-transform:uppercase;opacity:0.5;margin-top:6px;">
                Calculadora médicos · ${new Date().getFullYear()}
              </div>
              <div style="font-size:11px;color:#888888;margin-top:14px;line-height:1.6;">
                Email automático gerado pela calculadora tributária. Os dados informados pelo lead são declaratórios — a análise definitiva exige avaliação documental (contrato social, alvarás, laudos sanitários).
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { html, assunto };
}

function lookupLabel<K extends string>(
  valor: string | null,
  map: Record<K, string>
): string {
  if (!valor) return "—";
  return (map as Record<string, string>)[valor] ?? valor;
}

function corPorTipo(tipo: "critico" | "atencao" | "positivo"): string {
  return tipo === "critico"
    ? "#8A2A2B"
    : tipo === "atencao"
      ? "#d97706"
      : "#16a34a";
}

function labelTipoSinalizacao(
  tipo: "critico" | "atencao" | "positivo"
): string {
  return tipo === "critico"
    ? "Crítico"
    : tipo === "atencao"
      ? "Atenção"
      : "Positivo";
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
