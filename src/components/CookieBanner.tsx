"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "tayah:cookie-consent";

type Consent = "accepted" | "refused";

export default function CookieBanner() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) setVisivel(true);
    } catch {
      // localStorage indisponível — não exibe
    }
  }, []);

  const persistir = (v: Consent) => {
    try {
      localStorage.setItem(STORAGE_KEY, v);
    } catch {
      // ignora
    }
    setVisivel(false);
  };

  return (
    <AnimatePresence>
      {visivel && (
        <motion.div
          role="dialog"
          aria-label="Aviso de armazenamento local"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-50 border-t border-tayah-white/10 bg-tayah-black/95 backdrop-blur"
        >
          <div className="container-tayah py-4 md:py-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <p className="font-sans text-xs leading-relaxed text-tayah-white/80 md:max-w-2xl">
                Utilizamos apenas armazenamento local do navegador
                (sessionStorage) essencial para o funcionamento da calculadora.
                Não usamos cookies de rastreio, pixels de remarketing ou
                analytics de terceiros. Veja a{" "}
                <Link
                  href="/politica-privacidade"
                  className="text-tayah-white underline underline-offset-2 hover:text-tayah-red-light"
                >
                  Política de Privacidade
                </Link>
                .
              </p>
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={() => persistir("refused")}
                  className="border border-tayah-white/30 px-4 py-2 font-sans text-[11px] font-semibold uppercase tracking-widest text-tayah-white/80 transition-colors hover:border-tayah-white hover:text-tayah-white"
                >
                  Recusar
                </button>
                <button
                  type="button"
                  onClick={() => persistir("accepted")}
                  className="bg-tayah-red px-4 py-2 font-sans text-[11px] font-semibold uppercase tracking-widest text-white transition-colors hover:bg-tayah-red-dark"
                >
                  Aceitar
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
