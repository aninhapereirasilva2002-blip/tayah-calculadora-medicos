import Link from "next/link";

const WHATSAPP_NUMERO = "5521998917757";
const WHATSAPP_DISPLAY = "(21) 99891-7757";
const TEL_NUMERO = "+552125447300";
const TEL_DISPLAY = "(21) 2544-7300";
const EMAIL = "atendimento1@tayah.com.br";

const SELOS = [
  "DNA 2024-2026",
  "AB2L 2025-2026",
  "GPTW 2026",
  "The Lawyers Global",
  "FAB · desde 2002",
  "Exército · desde 2004",
];

export default function Footer() {
  return (
    <footer className="bg-tayah-black text-tayah-white print:hidden">
      <div className="container-tayah py-14 md:py-20">
        {/* Marca */}
        <div className="mb-12 md:mb-16">
          <div className="font-serif text-3xl tracking-wide text-tayah-white md:text-4xl">
            TAYAH ADVOGADOS<span className="text-tayah-red">.</span>
          </div>
          <p className="mt-1 font-sans text-[10px] uppercase tracking-[3px] text-tayah-white/50">
            Desde 1961 · Três gerações
          </p>
          <p className="mt-5 max-w-2xl font-sans text-sm leading-relaxed text-tayah-white/70">
            Escritório de advocacia com sede no Rio de Janeiro, especializado
            em direito tributário da saúde, direito médico, civil e empresarial.
            65 anos de tradição familiar a serviço de clientes em todo o
            Brasil.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-10">
          {/* Sede */}
          <div>
            <p className="mb-4 font-sans text-[11px] font-semibold uppercase tracking-[2px] text-tayah-red">
              Sede · Rio de Janeiro
            </p>
            <address className="not-italic font-sans text-sm leading-relaxed text-tayah-white/70">
              Av. Graça Aranha, 206
              <br />
              3º andar · Centro
              <br />
              Rio de Janeiro / RJ
              <br />
              CEP 20.030-001
            </address>
          </div>

          {/* Filial */}
          <div>
            <p className="mb-4 font-sans text-[11px] font-semibold uppercase tracking-[2px] text-tayah-red">
              Filial · Brasília
            </p>
            <address className="not-italic font-sans text-sm leading-relaxed text-tayah-white/70">
              Brasília / DF
              <br />
              Atendimento sob agendamento
            </address>
          </div>

          {/* Contato */}
          <div>
            <p className="mb-4 font-sans text-[11px] font-semibold uppercase tracking-[2px] text-tayah-red">
              Contato
            </p>
            <ul className="space-y-2 font-sans text-sm text-tayah-white/70">
              <li>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMERO}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-tayah-white"
                >
                  WhatsApp {WHATSAPP_DISPLAY}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${TEL_NUMERO}`}
                  className="transition-colors hover:text-tayah-white"
                >
                  Tel {TEL_DISPLAY}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="transition-colors hover:text-tayah-white"
                >
                  {EMAIL}
                </a>
              </li>
              <li>
                <a
                  href="https://tayah.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-tayah-white"
                >
                  www.tayah.com.br
                </a>
              </li>
            </ul>
          </div>

          {/* Redes + Links */}
          <div>
            <p className="mb-4 font-sans text-[11px] font-semibold uppercase tracking-[2px] text-tayah-red">
              Redes sociais
            </p>
            <ul className="space-y-2 font-sans text-sm text-tayah-white/70">
              <li>
                <a
                  href="https://www.instagram.com/tayahadvogados"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-tayah-white"
                >
                  Instagram @tayahadvogados
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/tayahadvogados"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-tayah-white"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/tayahadvogados"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-tayah-white"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@tayahadvogados"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-tayah-white"
                >
                  YouTube
                </a>
              </li>
            </ul>

            <p className="mb-3 mt-8 font-sans text-[11px] font-semibold uppercase tracking-[2px] text-tayah-red">
              Institucional
            </p>
            <ul className="space-y-2 font-sans text-sm text-tayah-white/70">
              <li>
                <Link
                  href="/politica-privacidade"
                  className="transition-colors hover:text-tayah-white"
                >
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link
                  href="/termos-de-uso"
                  className="transition-colors hover:text-tayah-white"
                >
                  Termos de Uso
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Certificações */}
        <div className="mt-14 border-t border-tayah-white/10 pt-10">
          <p className="mb-5 font-sans text-[11px] font-semibold uppercase tracking-[2px] text-tayah-red">
            Certificações & convênios
          </p>
          <div className="flex flex-wrap gap-2">
            {SELOS.map((s) => (
              <span
                key={s}
                className="inline-flex items-center rounded border border-tayah-white/15 px-3 py-1.5 font-sans text-[11px] uppercase tracking-wider text-tayah-white/60"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Compliance OAB */}
        <div className="mt-10 rounded-lg border border-tayah-white/10 bg-tayah-white/[0.02] p-5 md:p-6">
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[2px] text-tayah-white/60">
            Aviso de conformidade · Provimento OAB 205/2021
          </p>
          <p className="mt-3 font-sans text-xs leading-relaxed text-tayah-white/55 md:text-[13px]">
            Este conteúdo tem finalidade exclusivamente informativa, não
            constituindo oferta de serviços ou captação indevida de clientela,
            em estrita observância ao Código de Ética e Disciplina da OAB e ao
            Provimento 205/2021. Resultados passados não garantem resultados
            futuros. Cada caso requer análise específica das particularidades
            documentais, contábeis e operacionais. A calculadora apresenta
            estimativa preliminar e não constitui parecer jurídico ou fiscal.
          </p>
        </div>

        <p className="mt-10 text-center font-sans text-xs leading-relaxed text-tayah-white/40">
          © {new Date().getFullYear()} Tayah Advogados Associados · OAB/RJ desde
          1961
        </p>
      </div>
    </footer>
  );
}
