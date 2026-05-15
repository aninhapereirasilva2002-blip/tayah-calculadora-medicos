import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidade · Tayah Advogados",
  description:
    "Política de Privacidade da Calculadora Tributária para Médicos da Tayah Advogados — tratamento de dados conforme LGPD.",
};

export default function PoliticaPrivacidadePage() {
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
        <p className="eyebrow mb-4">Documento · LGPD</p>
        <h1 className="font-serif text-4xl text-tayah-black md:text-5xl">
          Política de Privacidade
        </h1>
        <p className="mt-4 font-sans text-sm text-tayah-gray-700">
          Última atualização: 15 de maio de 2026.
        </p>

        <div className="mt-12 space-y-10 font-sans text-base leading-relaxed text-tayah-gray-900">
          <p>
            A Tayah Advogados respeita sua privacidade. Esta Política descreve
            como tratamos os dados pessoais coletados através da Calculadora
            Tributária para Médicos (a &quot;Ferramenta&quot;), em conformidade
            com a Lei nº 13.709/2018 (LGPD).
          </p>

          <Secao titulo="1. Controlador de Dados">
            <p>
              Tayah Advogados — CNPJ <span className="font-mono">[a definir]</span>
              .
            </p>
            <p>
              Endereço: <span className="font-mono">[a definir]</span>.
            </p>
            <p>
              Encarregado pelo Tratamento de Dados (DPO):{" "}
              <a
                href="mailto:dpo@tayah.com.br"
                className="text-tayah-red underline underline-offset-2"
              >
                dpo@tayah.com.br
              </a>
              .
            </p>
          </Secao>

          <Secao titulo="2. Dados Coletados">
            <p>Ao utilizar a Ferramenta, coletamos:</p>
            <ul className="ml-6 list-disc space-y-1">
              <li>
                Respostas ao questionário de 7 perguntas (organização, regime
                tributário, serviços, local de prestação, licença sanitária,
                faixa de faturamento e dúvida principal).
              </li>
              <li>
                Ao final, mediante seu consentimento expresso: nome, email,
                telefone WhatsApp e CRM/especialidade (opcional).
              </li>
              <li>Data e hora do envio.</li>
            </ul>
            <p>
              Não coletamos dados pessoais sensíveis (origem racial, religião,
              saúde, etc.) e não capturamos automaticamente dados de
              localização ou comportamento de navegação.
            </p>
          </Secao>

          <Secao titulo="3. Finalidade do Tratamento">
            <p>Tratamos seus dados exclusivamente para:</p>
            <ul className="ml-6 list-disc space-y-1">
              <li>
                Apresentar o diagnóstico tributário preliminar baseado em suas
                respostas.
              </li>
              <li>
                Entrar em contato para apresentar os próximos passos da análise
                jurídica.
              </li>
              <li>
                Eventualmente, prestar serviços jurídicos contratados a partir
                desse contato.
              </li>
            </ul>
          </Secao>

          <Secao titulo="4. Base Legal">
            <p>
              A base legal para o tratamento é o seu{" "}
              <strong>consentimento</strong> (art. 7º, inciso I, da LGPD),
              manifestado pelo aceite do termo no momento do envio dos dados.
              Você pode revogar esse consentimento a qualquer tempo (item 7).
            </p>
          </Secao>

          <Secao titulo="5. Compartilhamento com Terceiros">
            <p>
              Não compartilhamos seus dados com terceiros para fins comerciais
              ou publicitários. Para envio do email à nossa equipe utilizamos o
              serviço Resend (resend.com), que atua como operador conforme art.
              5º, VII, da LGPD. Não há transferência internacional de dados
              além daquela inerente à infraestrutura de hospedagem.
            </p>
          </Secao>

          <Secao titulo="6. Tempo de Retenção">
            <p>
              Mantemos seus dados pelo período necessário ao cumprimento da
              finalidade, por até 24 (vinte e quatro) meses após a última
              interação, salvo solicitação anterior de exclusão.
            </p>
          </Secao>

          <Secao titulo="7. Direitos do Titular">
            <p>
              Conforme o art. 18 da LGPD, você pode, a qualquer momento e
              gratuitamente:
            </p>
            <ul className="ml-6 list-disc space-y-1">
              <li>Confirmar a existência do tratamento.</li>
              <li>Acessar seus dados.</li>
              <li>Corrigir dados incompletos, inexatos ou desatualizados.</li>
              <li>
                Solicitar a anonimização, bloqueio ou eliminação dos dados.
              </li>
              <li>Solicitar a portabilidade.</li>
              <li>Revogar o consentimento.</li>
              <li>Opor-se ao tratamento realizado com base no consentimento.</li>
            </ul>
            <p>
              Para exercer qualquer desses direitos, contate{" "}
              <a
                href="mailto:dpo@tayah.com.br"
                className="text-tayah-red underline underline-offset-2"
              >
                dpo@tayah.com.br
              </a>
              . Responderemos em até 15 dias, conforme prazo legal.
            </p>
          </Secao>

          <Secao titulo="8. Armazenamento Local e Cookies">
            <p>
              A Ferramenta utiliza apenas armazenamento local do navegador
              (sessionStorage) para preservar suas respostas durante a sessão.
              Não utilizamos cookies de rastreio, pixels de remarketing,
              fingerprinting nem analytics de terceiros.
            </p>
          </Secao>

          <Secao titulo="9. Segurança">
            <p>
              Adotamos medidas técnicas e organizacionais razoáveis para
              proteger seus dados, incluindo transmissão criptografada (HTTPS)
              e acesso restrito à equipe autorizada.
            </p>
          </Secao>

          <Secao titulo="10. Alterações desta Política">
            <p>
              Esta Política pode ser atualizada. A versão vigente estará sempre
              disponível nesta página com a respectiva data de atualização.
            </p>
          </Secao>

          <Secao titulo="11. Legislação Aplicável">
            <p>
              Esta Política rege-se pela legislação brasileira, em especial a
              Lei nº 13.709/2018 (LGPD).
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
