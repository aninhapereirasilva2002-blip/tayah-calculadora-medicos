import Link from "next/link";

const WHATSAPP_NUMERO = "5521998917757";
const WHATSAPP_DISPLAY = "(21) 99891-7757";
const TEL_NUMERO = "+552125447300";
const TEL_DISPLAY = "(21) 2544-7300";
const EMAIL = "atendimento1@tayah.com.br";

export default function Footer() {
  return (
    <footer className="bg-tayah-black text-tayah-white print:hidden">
      <div className="container-tayah py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
          {/* Coluna 1 — Marca + endereço */}
          <div>
            <div className="font-serif text-3xl tracking-wide text-tayah-white">
              TAYAH<span className="text-tayah-red">.</span>
            </div>
            <p className="mt-1 font-sans text-[10px] uppercase tracking-widest text-tayah-white/50">
              Advogados
            </p>
            <address className="mt-5 not-italic font-sans text-sm leading-relaxed text-tayah-white/70">
              Av. Graça Aranha, 206, gr. 310
              <br />
              Centro · Rio de Janeiro/RJ
              <br />
              CEP 20.030-001
            </address>
          </div>

          {/* Coluna 2 — Contato */}
          <div>
            <p className="mb-4 font-sans text-xs font-semibold uppercase tracking-widest text-tayah-red">
              Contato
            </p>
            <ul className="space-y-2 font-sans text-sm text-tayah-white/70">
              <li>
                <span className="text-tayah-white/50">WhatsApp:</span>{" "}
                <a
                  href={`https://wa.me/${WHATSAPP_NUMERO}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-tayah-white"
                >
                  {WHATSAPP_DISPLAY}
                </a>
              </li>
              <li>
                <span className="text-tayah-white/50">Tel:</span>{" "}
                <a
                  href={`tel:${TEL_NUMERO}`}
                  className="transition-colors hover:text-tayah-white"
                >
                  {TEL_DISPLAY}
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
            </ul>
          </div>

          {/* Coluna 3 — Links */}
          <div>
            <p className="mb-4 font-sans text-xs font-semibold uppercase tracking-widest text-tayah-red">
              Links
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
              <li>
                <a
                  href="https://tayah.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-tayah-white"
                >
                  Site institucional →
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-12 border-t border-tayah-white/10 pt-6 text-center font-sans text-xs leading-relaxed text-tayah-white/50">
          © {new Date().getFullYear()} Tayah Advogados — OAB/RJ desde 1965.
          Esta calculadora é uma estimativa preliminar e não constitui parecer
          fiscal.
        </p>
      </div>
    </footer>
  );
}
