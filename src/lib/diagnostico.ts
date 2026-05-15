import {
  type LicencaSanitaria,
  type LocalPrestacao,
  type RespostasCalculadora,
  type ServicoMedico,
  type TipoOrganizacao,
} from "./types";

export type NivelDiagnostico = "FORTE" | "MEDIO" | "FRACO";

export type TipoSinalizacao = "critico" | "atencao" | "positivo";

export interface Sinalizacao {
  tipo: TipoSinalizacao;
  texto: string;
}

export interface Diagnostico {
  pontuacao: number;
  nivel: NivelDiagnostico;
  mensagemPrincipal: string;
  sinalizacoes: Sinalizacao[];
  detalhes: {
    pontosOrganizacao: number;
    pontosServicos: number;
    pontosLocal: number;
    pontosLicenca: number;
    pontuacaoBruta: number;
  };
}

// REQUISITO 1 — Sociedade Empresária (peso 35)
const PONTOS_ORGANIZACAO: Record<TipoOrganizacao, number> = {
  "pessoa-fisica": 0,
  "soc-simples": 5,
  ltda: 35,
  "slu-eireli": 35,
  sa: 35,
  "nao-sei": 15,
};

// REQUISITO 2 — Serviços Hospitalares (peso 40)
const SERVICOS_TIER_ALTO = new Set<ServicoMedico>([
  "cirurgias",
  "uti-urgencia",
  "internacao-hospital-dia",
  "terapias-complexas",
  "anestesiologia",
  "endoscopia",
]);

const SERVICOS_TIER_EXAMES = new Set<ServicoMedico>([
  "exames-imagem",
  "exames-laboratorio",
]);

// Bonificação por LOCAL (Passo 4)
const PONTOS_LOCAL: Record<LocalPrestacao, number> = {
  "consultorio-simples": -10,
  "clinica-especializada": 5,
  "hospital-terceiros": 0,
  "hospital-proprio": 5,
  misto: 0,
};

// REQUISITO 3 — ANVISA (peso 25)
const PONTOS_LICENCA: Record<LicencaSanitaria, number> = {
  vigente: 25,
  renovacao: 20,
  "nao-se-aplica": 15,
  "nao-sei": 10,
  "nao-tenho": 0,
};

function pontuarServicos(servicos: ServicoMedico[]): number {
  let pontosAlto = 0;
  let pontosExames = 0;
  let pontosBaixo = 0;

  for (const servico of servicos) {
    if (SERVICOS_TIER_ALTO.has(servico)) {
      pontosAlto += 8;
    } else if (SERVICOS_TIER_EXAMES.has(servico)) {
      pontosExames += 6;
    } else if (servico === "fisioterapia") {
      pontosBaixo += 3;
    }
    // consultas e estética: 0 pts
  }

  return Math.min(pontosAlto, 40) + Math.min(pontosExames, 30) + pontosBaixo;
}

function temServicoHospitalar(servicos: ServicoMedico[]): boolean {
  return servicos.some(
    (s) => SERVICOS_TIER_ALTO.has(s) || SERVICOS_TIER_EXAMES.has(s)
  );
}

function mensagemPorNivel(nivel: NivelDiagnostico): string {
  switch (nivel) {
    case "FORTE":
      return "Os indicadores apontam alta probabilidade de enquadramento na equiparação hospitalar (Tema 217, STJ). Recomenda-se análise documental para confirmar e formalizar o pedido perante a Receita Federal.";
    case "MEDIO":
      return "Há indícios de enquadramento, mas com pontos de atenção. Com ajustes pontuais (formalização societária, licenças sanitárias ou redirecionamento de atividades), a tese pode ser sustentada.";
    case "FRACO":
      return "Os indicadores apontam baixa probabilidade de enquadramento sem reorganização. É possível avaliar abertura ou reestruturação da PJ para alcançar a equiparação no futuro.";
  }
}

function gerarSinalizacoes(r: RespostasCalculadora): Sinalizacao[] {
  const sin: Sinalizacao[] = [];

  if (r.tipoOrganizacao === "pessoa-fisica") {
    sin.push({
      tipo: "critico",
      texto:
        "Atuação como pessoa física — não há benefício direto. O primeiro passo é abrir uma sociedade empresária (Ltda, SLU ou S/A).",
    });
  } else if (r.tipoOrganizacao === "soc-simples") {
    sin.push({
      tipo: "critico",
      texto:
        "Sociedade simples não atende ao requisito formal — convém transformar em Ltda (registro na Junta Comercial).",
    });
  } else if (r.tipoOrganizacao === "nao-sei") {
    sin.push({
      tipo: "atencao",
      texto:
        "Tipo societário incerto — vale revisar o contrato social para confirmar se é sociedade empresária.",
    });
  }

  if (r.regimeTributario === "simples") {
    sin.push({
      tipo: "atencao",
      texto:
        "No Simples Nacional, a tributação é unificada e a equiparação tem efeito diferente — análise específica recomendada.",
    });
  } else if (r.regimeTributario === "real") {
    sin.push({
      tipo: "atencao",
      texto:
        "No Lucro Real, o benefício se manifesta de outra forma — vale comparar com migração para Lucro Presumido com equiparação.",
    });
  } else if (r.regimeTributario === "pessoa-fisica") {
    sin.push({
      tipo: "critico",
      texto:
        "Sem PJ, não há equiparação possível — primeiro abra a sociedade empresária.",
    });
  }

  if (!temServicoHospitalar(r.servicos)) {
    sin.push({
      tipo: "critico",
      texto:
        "Os serviços marcados não têm natureza hospitalar — STJ Tema 217 exige atos como cirurgias, exames invasivos, internação ou anestesia.",
    });
  }

  const soConsultasOuEstetica =
    r.servicos.length > 0 &&
    r.servicos.every((s) => s === "consultas" || s === "estetica");
  if (soConsultasOuEstetica) {
    sin.push({
      tipo: "critico",
      texto:
        "Você presta majoritariamente consultas/estética — atividades consideradas profissionais (sem complexidade hospitalar) na linha do Tema 217.",
    });
  }

  if (r.localPrestacao === "consultorio-simples") {
    sin.push({
      tipo: "critico",
      texto:
        "Estrutura de consultório simples não atende ao Tema 217 — a tese exige estrutura compatível com hospital.",
    });
  }

  if (r.licencaSanitaria === "nao-tenho") {
    sin.push({
      tipo: "critico",
      texto:
        "Falta licença sanitária — requisito essencial da tese (estrutura compatível com normas da ANVISA).",
    });
  } else if (r.licencaSanitaria === "nao-sei") {
    sin.push({
      tipo: "atencao",
      texto:
        "Verificar se há licença sanitária vigente — requisito essencial da tese.",
    });
  } else if (r.licencaSanitaria === "renovacao") {
    sin.push({
      tipo: "atencao",
      texto:
        "Licença em renovação — manter a documentação atualizada é importante para sustentar a tese.",
    });
  }

  const orgOK =
    r.tipoOrganizacao === "ltda" ||
    r.tipoOrganizacao === "slu-eireli" ||
    r.tipoOrganizacao === "sa";
  const licencaOK =
    r.licencaSanitaria === "vigente" ||
    r.licencaSanitaria === "renovacao" ||
    r.licencaSanitaria === "nao-se-aplica";
  const semCriticos = sin.every((s) => s.tipo !== "critico");

  if (orgOK && temServicoHospitalar(r.servicos) && licencaOK && semCriticos) {
    sin.unshift({
      tipo: "positivo",
      texto:
        "Os três requisitos cumulativos do Tema 217 (sociedade empresária, serviços hospitalares e estrutura/licença sanitária) aparentam estar atendidos.",
    });
  }

  return sin;
}

export function gerarDiagnostico(r: RespostasCalculadora): Diagnostico {
  if (
    !r.tipoOrganizacao ||
    !r.regimeTributario ||
    !r.localPrestacao ||
    !r.licencaSanitaria ||
    !r.faixaFaturamento ||
    !r.duvidaPrincipal
  ) {
    throw new Error("Respostas incompletas — não é possível gerar diagnóstico.");
  }

  const pontosOrganizacao = PONTOS_ORGANIZACAO[r.tipoOrganizacao];
  const pontosServicos = pontuarServicos(r.servicos);
  const pontosLocal = PONTOS_LOCAL[r.localPrestacao];
  const pontosLicenca = PONTOS_LICENCA[r.licencaSanitaria];

  const pontuacaoBruta =
    pontosOrganizacao + pontosServicos + pontosLocal + pontosLicenca;
  const pontuacao = Math.max(0, Math.min(100, pontuacaoBruta));

  const nivel: NivelDiagnostico =
    pontuacao >= 75 ? "FORTE" : pontuacao >= 45 ? "MEDIO" : "FRACO";

  const sinalizacoes = gerarSinalizacoes(r);
  const mensagemPrincipal = mensagemPorNivel(nivel);

  return {
    pontuacao,
    nivel,
    mensagemPrincipal,
    sinalizacoes,
    detalhes: {
      pontosOrganizacao,
      pontosServicos,
      pontosLocal,
      pontosLicenca,
      pontuacaoBruta,
    },
  };
}
