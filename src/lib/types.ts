export type TipoOrganizacao =
  | "pessoa-fisica"
  | "soc-simples"
  | "ltda"
  | "slu-eireli"
  | "sa"
  | "nao-sei";

export type RegimeTributario =
  | "simples"
  | "presumido"
  | "real"
  | "pessoa-fisica"
  | "nao-sei";

export type ServicoMedico =
  | "consultas"
  | "cirurgias"
  | "exames-imagem"
  | "exames-laboratorio"
  | "endoscopia"
  | "anestesiologia"
  | "terapias-complexas"
  | "uti-urgencia"
  | "internacao-hospital-dia"
  | "fisioterapia"
  | "estetica";

export type LocalPrestacao =
  | "consultorio-simples"
  | "clinica-especializada"
  | "hospital-terceiros"
  | "hospital-proprio"
  | "misto";

export type LicencaSanitaria =
  | "vigente"
  | "renovacao"
  | "nao-tenho"
  | "nao-sei"
  | "nao-se-aplica";

export type FaixaFaturamento =
  | "ate-30k"
  | "30-60k"
  | "60-100k"
  | "100-200k"
  | "200-400k"
  | "acima-400k";

export type DuvidaPrincipal =
  | "imposto-demais"
  | "receita-negou"
  | "abrir-reorganizar"
  | "migrar-mei"
  | "outro";

export interface RespostasCalculadora {
  tipoOrganizacao: TipoOrganizacao | null;
  regimeTributario: RegimeTributario | null;
  servicos: ServicoMedico[];
  localPrestacao: LocalPrestacao | null;
  licencaSanitaria: LicencaSanitaria | null;
  faixaFaturamento: FaixaFaturamento | null;
  duvidaPrincipal: DuvidaPrincipal | null;
}

export const RESPOSTAS_VAZIAS: RespostasCalculadora = {
  tipoOrganizacao: null,
  regimeTributario: null,
  servicos: [],
  localPrestacao: null,
  licencaSanitaria: null,
  faixaFaturamento: null,
  duvidaPrincipal: null,
};

export const STORAGE_KEY = "tayah:calculadora:respostas";

export const PONTO_MEDIO_FATURAMENTO: Record<FaixaFaturamento, number> = {
  "ate-30k": 20_000,
  "30-60k": 45_000,
  "60-100k": 80_000,
  "100-200k": 150_000,
  "200-400k": 300_000,
  "acima-400k": 500_000,
};

export const LABEL_FAIXA_FATURAMENTO: Record<FaixaFaturamento, string> = {
  "ate-30k": "Até R$ 30.000",
  "30-60k": "R$ 30.001 a R$ 60.000",
  "60-100k": "R$ 60.001 a R$ 100.000",
  "100-200k": "R$ 100.001 a R$ 200.000",
  "200-400k": "R$ 200.001 a R$ 400.000",
  "acima-400k": "Acima de R$ 400.000",
};

export const LABEL_TIPO_ORGANIZACAO: Record<TipoOrganizacao, string> = {
  "pessoa-fisica": "Pessoa Física (CPF / autônomo)",
  "soc-simples": "Sociedade Simples",
  ltda: "Sociedade Empresária Limitada (Ltda)",
  "slu-eireli": "SLU ou EIRELI empresária",
  sa: "Sociedade Anônima (S/A)",
  "nao-sei": "Não sei",
};

export const LABEL_REGIME: Record<RegimeTributario, string> = {
  simples: "Simples Nacional (Anexo III ou V)",
  presumido: "Lucro Presumido",
  real: "Lucro Real",
  "pessoa-fisica": "Sou pessoa física (não tenho PJ)",
  "nao-sei": "Não sei",
};

export const LABEL_SERVICO: Record<ServicoMedico, string> = {
  consultas: "Consultas em consultório",
  cirurgias: "Cirurgias (ambulatoriais ou hospitalares)",
  "exames-imagem": "Exames de imagem (US, RM, TC, RX, mamografia)",
  "exames-laboratorio": "Exames laboratoriais",
  endoscopia: "Endoscopia / colonoscopia / procedimentos invasivos",
  anestesiologia: "Anestesiologia",
  "terapias-complexas": "Hemodiálise / oncologia / terapias complexas",
  "uti-urgencia": "UTI / pronto-socorro / urgência",
  "internacao-hospital-dia": "Internação ou hospital-dia",
  fisioterapia: "Fisioterapia / reabilitação",
  estetica: "Estética / dermatologia clínica",
};

export const LABEL_LOCAL: Record<LocalPrestacao, string> = {
  "consultorio-simples": "Em consultório próprio (sala simples)",
  "clinica-especializada":
    "Em clínica especializada com estrutura de procedimentos",
  "hospital-terceiros": "Em hospital de terceiros (sou prestador externo)",
  "hospital-proprio": "Em hospital ou day-clinic próprio",
  misto: "Misto",
};

export const LABEL_LICENCA: Record<LicencaSanitaria, string> = {
  vigente: "Sim, licença vigente",
  renovacao: "Sim, mas em processo de renovação",
  "nao-tenho": "Não, não tenho",
  "nao-sei": "Não sei",
  "nao-se-aplica": "Não se aplica (atendo só em hospital de terceiros)",
};

export const LABEL_DUVIDA: Record<DuvidaPrincipal, string> = {
  "imposto-demais": "Acho que pago imposto demais",
  "receita-negou": "Já tentei a equiparação e a Receita negou",
  "abrir-reorganizar": "Quero abrir/reorganizar minha PJ",
  "migrar-mei": "Sou MEI/autônomo e quero migrar",
  outro: "Outro",
};
