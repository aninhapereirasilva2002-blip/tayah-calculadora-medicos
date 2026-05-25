import ScaleIcon from "@/components/icons/Scale";

/**
 * Card de status visível ao usuário.
 *
 * Por decisão de compliance, NÃO exibe a classificação interna
 * (Forte/Médio/Fraco) — essa gradação fica apenas no e-mail enviado à equipe.
 * Aqui a mensagem é sempre idêntica, encorajadora e consultiva, com o badge
 * no vermelho Tayah (#8A2A2B → token `tayah-red`), sem cores que indiquem
 * gradação (verde/amarelo/cinza).
 */
export default function CardStatusPotencial() {
  return (
    <section className="rounded-2xl border-2 border-tayah-red bg-tayah-cream-deep p-6 shadow-tayah-card-sm md:p-8">
      <div className="flex items-start gap-4">
        <span className="mt-0.5 hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-tayah-red text-tayah-white sm:inline-flex">
          <ScaleIcon className="h-5 w-5" />
        </span>
        <div>
          <span className="inline-flex items-center rounded-full bg-tayah-red px-3 py-1 font-sans text-[11px] font-semibold uppercase tracking-[1.5px] text-tayah-white">
            Potencial de enquadramento
          </span>
          <h2 className="mt-3 font-serif text-2xl text-tayah-text-strong md:text-3xl">
            Seu perfil indica POTENCIAL de enquadramento
          </h2>
          <p className="mt-2 max-w-2xl font-sans text-sm leading-relaxed text-tayah-text-muted md:text-base">
            Recomendamos uma análise personalizada gratuita com nossa equipe
            para confirmar os requisitos do seu caso.
          </p>
        </div>
      </div>
    </section>
  );
}
