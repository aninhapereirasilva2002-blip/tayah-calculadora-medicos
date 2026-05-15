export interface CalculoTributario {
  faturamentoMensal: number;
  faturamentoAnual: number;

  semEquiparacao: {
    baseIRPJ: number;
    irpj: number;
    baseCSLL: number;
    csll: number;
    totalMensal: number;
    totalAnual: number;
    aliquotaEfetiva: number;
  };

  comEquiparacao: {
    baseIRPJ: number;
    irpj: number;
    baseCSLL: number;
    csll: number;
    totalMensal: number;
    totalAnual: number;
    aliquotaEfetiva: number;
  };

  economia: {
    mensal: number;
    anual: number;
    em5anos: number;
    em10anos: number;
    percentualReducao: number;
    diferencaPontosPercentuais: number;
  };
}

export function calcularEconomia(faturamentoMensal: number): CalculoTributario {
  const faturamentoAnual = faturamentoMensal * 12;

  // SEM equiparação — Lucro Presumido, base 32% (serviços profissionais)
  const baseIRPJ_sem = faturamentoMensal * 0.32;
  const irpj_sem = baseIRPJ_sem * 0.15;
  const baseCSLL_sem = faturamentoMensal * 0.32;
  const csll_sem = baseCSLL_sem * 0.09;
  const totalMensal_sem = irpj_sem + csll_sem;

  // COM equiparação — Lei 9.249/95, art. 15, §1º, III, "a" + art. 20
  const baseIRPJ_com = faturamentoMensal * 0.08;
  const irpj_com = baseIRPJ_com * 0.15;
  const baseCSLL_com = faturamentoMensal * 0.12;
  const csll_com = baseCSLL_com * 0.09;
  const totalMensal_com = irpj_com + csll_com;

  const economiaMensal = totalMensal_sem - totalMensal_com;
  const economiaAnual = economiaMensal * 12;

  return {
    faturamentoMensal,
    faturamentoAnual,
    semEquiparacao: {
      baseIRPJ: baseIRPJ_sem,
      irpj: irpj_sem,
      baseCSLL: baseCSLL_sem,
      csll: csll_sem,
      totalMensal: totalMensal_sem,
      totalAnual: totalMensal_sem * 12,
      aliquotaEfetiva: 7.68,
    },
    comEquiparacao: {
      baseIRPJ: baseIRPJ_com,
      irpj: irpj_com,
      baseCSLL: baseCSLL_com,
      csll: csll_com,
      totalMensal: totalMensal_com,
      totalAnual: totalMensal_com * 12,
      aliquotaEfetiva: 2.28,
    },
    economia: {
      mensal: economiaMensal,
      anual: economiaAnual,
      em5anos: economiaAnual * 5,
      em10anos: economiaAnual * 10,
      percentualReducao:
        ((totalMensal_sem - totalMensal_com) / totalMensal_sem) * 100,
      diferencaPontosPercentuais: 5.4,
    },
  };
}

export const formatBRL = (v: number): string =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
