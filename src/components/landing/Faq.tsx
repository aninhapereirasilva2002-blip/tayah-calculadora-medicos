"use client";

import { useState } from "react";

interface FaqItem {
  pergunta: string;
  resposta: string;
}

interface Props {
  items: FaqItem[];
}

export default function Faq({ items }: Props) {
  const [aberto, setAberto] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, idx) => {
        const isAberto = aberto === idx;
        return (
          <div
            key={item.pergunta}
            className="overflow-hidden rounded-lg border border-tayah-border-card bg-tayah-white"
          >
            <button
              type="button"
              onClick={() => setAberto(isAberto ? null : idx)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-tayah-cream-deep/30 md:px-6 md:py-5"
              aria-expanded={isAberto}
            >
              <span className="font-sans text-sm font-semibold text-tayah-text-strong md:text-base">
                {item.pergunta}
              </span>
              <span
                aria-hidden
                className={`shrink-0 font-serif text-2xl leading-none text-tayah-red transition-transform ${
                  isAberto ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>
            {isAberto && (
              <div className="border-t border-tayah-border-soft px-5 py-4 md:px-6 md:py-5">
                <p className="font-sans text-sm leading-relaxed text-tayah-text-muted md:text-[15px]">
                  {item.resposta}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
