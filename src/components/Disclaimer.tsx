type Variant = "footer" | "inline";

export default function Disclaimer({ variant = "footer" }: { variant?: Variant }) {
  if (variant === "inline") {
    return (
      <p className="text-xs leading-relaxed text-tayah-gray-300">
        Estimativa preliminar. Não constitui parecer fiscal nem garantia de
        enquadramento.
      </p>
    );
  }

  return (
    <p className="text-xs leading-relaxed text-tayah-gray-300">
      Esta ferramenta é uma estimativa preliminar. Não constitui parecer fiscal
      nem garantia de enquadramento. A análise definitiva exige avaliação dos
      atos constitutivos da sociedade, contratos, alvarás e laudos sanitários.
    </p>
  );
}
