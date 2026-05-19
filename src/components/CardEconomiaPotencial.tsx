import CalendarIcon from "@/components/icons/Calendar";
import {
  formatBRL,
  type CalculoTributario,
} from "@/lib/calculo-tributario";

interface Props {
  calculo: CalculoTributario;
}

export default function CardEconomiaPotencial({ calculo }: Props) {
  return (
    <section
      className="rounded-2xl p-8 md:p-10"
      style={{ backgroundColor: "#FDEEE8" }}
    >
      <div className="grid grid-cols-1 gap-8 md:grid-cols-5 md:gap-6">
        <div className="md:col-span-3">
          <div className="flex items-center gap-3">
            <CalendarIcon className="h-9 w-9 text-tayah-red" />
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[1.5px] text-tayah-text-muted">
              Economia potencial (5 anos)
            </p>
          </div>
          <p className="mt-3 font-serif text-[40px] font-bold leading-none text-tayah-red md:text-[48px]">
            {formatBRL(calculo.economia.em5anos)}
          </p>
          <p className="mt-3 font-sans text-sm leading-relaxed text-tayah-text-muted md:text-base">
            Projeção sobre IRPJ + CSLL · faturamento constante
          </p>
        </div>

        <div className="md:col-span-2 md:text-right">
          <p className="font-sans text-[13px] font-semibold text-tayah-text-strong">
            Fundamento jurídico
          </p>
          <p className="mt-2 font-sans text-xs leading-relaxed text-tayah-text-muted">
            Lei 9.249/95, art. 15, §1º, III, &quot;a&quot;
          </p>
          <p className="mt-1 font-sans text-xs leading-relaxed text-tayah-text-muted">
            STJ — Tema 217 (REsp 1.116.399/BA)
          </p>
        </div>
      </div>
    </section>
  );
}
