import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Termos de Uso · Tayah Advogados",
  description:
    "Termos de Uso da Calculadora Tributária para Médicos da Tayah Advogados.",
};

export default function TermosDeUsoPage() {
  return (
    <main className="min-h-screen bg-tayah-cream/30">
      <header className="border-b border-tayah-gray-200 bg-white">
        <div className="container-tayah flex items-center justify-between py-5">
          <Link
            href="/"
            className="font-serif text-xl tracking-wide text-tayah-black"
          >
            TAYAH<span className="text-tayah-red">.</span>
          </Link>
          <span className="font-sans text-[11px] uppercase tracking-widest text-tayah-gray-700">
            Documentos legais
          </span>
        </div>
      </header>

      <article className="container-tayah max-w-3xl py-16 md:py-24">
        <p className="eyebrow mb-4">Documento</p>
        <h1 className="font-serif text-4xl text-tayah-black md:text-5xl">
          Termos de Uso
        </h1>
        <p className="mt-4 font-sans text-sm text-tayah-gray-700">
          Última atualização: 15 de maio de 2026.
        </p>

        <div className="mt-12 space-y-10 font-sans text-base leading-relaxed text-tayah-gray-900">
          <p>
            Ao acessar e utilizar a Calculadora Tributária para Médicos (a
            &quot;Ferramenta&quot;), disponibilizada pela Tayah Advogados, você
            declara concordar com estes Termos de Uso.
          </p>

          <Secao titulo="1. Sobre a Ferramenta">
            <p>
              A Ferramenta é um serviço{" "}
              <strong>gratuito</strong> disponibilizado pela Tayah Advogados
              com a finalidade de apresentar uma <strong>estimativa preliminar</strong>{" "}
              sobre a possibilidade de enquadramento de sociedades médicas na
              equiparação hospitalar (Lei nº 9.249/95, art. 15, §1º, III,
              &quot;a&quot;, e STJ Tema 217 — REsp 1.116.399/BA), com base nas
              respostas que você fornecer.
            </p>
          </Secao>

          <Secao titulo="2. Natureza da Estimativa">
            <p>A Ferramenta <strong>não constitui</strong>:</p>
            <ul className="ml-6 list-disc space-y-1">
              <li>Parecer jurídico ou opinião técnica individualizada.</li>
              <li>Consultoria tributária personalizada.</li>
              <li>
                Garantia, promessa ou asseguração de enquadramento perante a
                Receita Federal do Brasil.
              </li>
              <li>
                Vínculo contratual de prestação de serviços advocatícios.
              </li>
            </ul>
            <p>
              A análise definitiva exige avaliação documental específica
              (contrato social, alvarás sanitários, laudos, notas fiscais,
              entre outros) por profissional habilitado, considerando a
              realidade concreta de cada caso.
            </p>
          </Secao>

          <Secao titulo="3. Limitação de Responsabilidade">
            <p>
              Os valores e classificações apresentados são estimativas
              calculadas sobre médias de mercado e alíquotas vigentes em 2026
              (Lucro Presumido). Resultados reais podem variar significativamente
              conforme a realidade jurídica, contábil e operacional de cada
              caso, eventuais alterações legislativas e a transição da Reforma
              Tributária (EC 132/2023).
            </p>
            <p>
              A Tayah Advogados não se responsabiliza por decisões tomadas
              exclusivamente com base na estimativa apresentada pela
              Ferramenta.
            </p>
          </Secao>

          <Secao titulo="4. Ausência de Promessa de Resultado">
            <p>
              Em conformidade com o Código de Ética e Disciplina da OAB e com o
              Provimento OAB 205/2021, a Ferramenta{" "}
              <strong>não promete, garante ou assegura resultado</strong>.
              Eventual contratação posterior dos serviços jurídicos da Tayah
              Advogados é facultativa e seguirá processo próprio de proposta,
              instrumento contratual e aprovação.
            </p>
          </Secao>

          <Secao titulo="5. Propriedade Intelectual">
            <p>
              A Ferramenta, sua interface, textos, lógica de cálculo,
              identidade visual e materiais relacionados são de titularidade
              exclusiva da Tayah Advogados. Reprodução, cópia, engenharia
              reversa ou utilização para fins comerciais sem autorização prévia
              é vedada.
            </p>
          </Secao>

          <Secao titulo="6. Tratamento de Dados Pessoais">
            <p>
              O tratamento dos dados que você fornecer ao final do questionário
              rege-se pela{" "}
              <Link
                href="/politica-privacidade"
                className="text-tayah-red underline underline-offset-2"
              >
                Política de Privacidade
              </Link>
              .
            </p>
          </Secao>

          <Secao titulo="7. Modificações">
            <p>
              Estes Termos podem ser alterados a qualquer momento pela Tayah
              Advogados. A versão vigente estará sempre disponível nesta página
              com a respectiva data de atualização.
            </p>
          </Secao>

          <Secao titulo="8. Foro e Lei Aplicável">
            <p>
              Estes Termos regem-se pela legislação brasileira. Fica eleito o
              foro da comarca de{" "}
              <span className="font-mono">[a definir]</span>, com renúncia
              expressa a qualquer outro, por mais privilegiado que seja.
            </p>
          </Secao>

          <Secao titulo="9. Contato">
            <p>
              Dúvidas sobre estes Termos:{" "}
              <a
                href="mailto:contato@tayah.com.br"
                className="text-tayah-red underline underline-offset-2"
              >
                contato@tayah.com.br
              </a>
              .
            </p>
          </Secao>
        </div>

        <div className="mt-16 border-t border-tayah-gray-200 pt-8">
          <Link
            href="/"
            className="font-sans text-xs uppercase tracking-widest text-tayah-gray-700 hover:text-tayah-red"
          >
            ← Voltar para a página inicial
          </Link>
        </div>
      </article>
    </main>
  );
}

function Secao({
  titulo,
  children,
}: {
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-serif text-2xl text-tayah-black md:text-3xl">
        {titulo}
      </h2>
      <div className="mt-4 space-y-3 text-tayah-gray-900">{children}</div>
    </section>
  );
}
