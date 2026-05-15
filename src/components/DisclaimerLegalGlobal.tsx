"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function DisclaimerLegalGlobal() {
  const [open, setOpen] = useState(false);

  return (
    <section className="border-t border-tayah-white/10 bg-tayah-black">
      <div className="container-tayah py-5">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="aviso-legal-conteudo"
          className="inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-widest text-tayah-white/60 transition-colors hover:text-tayah-white"
        >
          <span
            aria-hidden
            className="inline-block leading-none transition-transform duration-200"
            style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)" }}
          >
            ▶
          </span>
          Ler aviso legal completo
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id="aviso-legal-conteudo"
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{ overflow: "hidden" }}
            >
              <p className="mt-4 max-w-3xl font-sans text-[11px] leading-relaxed text-tayah-white/55">
                Esta calculadora é uma estimativa preliminar baseada nas
                respostas informadas e nas alíquotas vigentes em 2026 para o
                regime de Lucro Presumido. Os valores em reais são projeções
                matemáticas que <strong className="text-tayah-white/80">não</strong>{" "}
                constituem parecer fiscal, consultoria tributária
                individualizada nem garantia de enquadramento perante a
                Receita Federal do Brasil. A análise definitiva exige
                avaliação documental completa (contrato social, atos
                constitutivos, alvarás sanitários, laudos da ANVISA, notas
                fiscais emitidas, classificação CNAE, livros fiscais). Não
                foram considerados: adicional de IRPJ, PIS, COFINS, ISS, INSS
                patronal, contribuição previdenciária dos sócios, eventuais
                regimes especiais, nem os efeitos da transição da Reforma
                Tributária (EC 132/2023). A equiparação hospitalar do art. 15,
                §1º, III, &quot;a&quot; da Lei 9.249/95 depende do cumprimento
                cumulativo dos requisitos firmados pelo STJ no Tema 217 (REsp
                1.116.399/BA).
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
