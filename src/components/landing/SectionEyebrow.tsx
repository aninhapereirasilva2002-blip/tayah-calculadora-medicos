interface Props {
  numero: string;
  texto: string;
}

export default function SectionEyebrow({ numero, texto }: Props) {
  return (
    <p className="mb-6 font-sans text-[11px] font-semibold uppercase tracking-[3px] text-tayah-red">
      § {numero} · {texto}
    </p>
  );
}
