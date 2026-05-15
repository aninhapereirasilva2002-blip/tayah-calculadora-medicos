import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
  "Calculadora Tributária para Médicos · Tayah Advogados";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#0A0A0A",
          padding: "80px 100px",
          position: "relative",
          fontFamily: "serif",
        }}
      >
        {/* Acento vermelho vertical à esquerda */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 8,
            height: "100%",
            backgroundColor: "#8A2A2B",
          }}
        />

        {/* Brilho sutil vermelho no canto */}
        <div
          style={{
            position: "absolute",
            top: -200,
            right: -200,
            width: 600,
            height: 600,
            borderRadius: 9999,
            backgroundColor: "#8A2A2B",
            opacity: 0.25,
            filter: "blur(60px)",
          }}
        />

        {/* Eyebrow */}
        <div
          style={{
            display: "flex",
            color: "#8A2A2B",
            fontSize: 22,
            letterSpacing: 6,
            textTransform: "uppercase",
            fontWeight: 800,
            marginBottom: 48,
            fontFamily: "sans-serif",
          }}
        >
          Tayah Advogados · Direito Tributário Médico
        </div>

        {/* Título principal */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            color: "#FFFFFF",
            fontSize: 88,
            lineHeight: 1.02,
            fontWeight: 700,
            letterSpacing: -2,
          }}
        >
          <div style={{ display: "flex" }}>Calculadora Tributária</div>
          <div style={{ display: "flex", marginTop: 6 }}>
            para
            <span style={{ color: "#8A2A2B", marginLeft: 22 }}>Médicos</span>
          </div>
        </div>

        {/* Subtítulo (alinhado ao rodapé) */}
        <div
          style={{
            display: "flex",
            marginTop: "auto",
            color: "rgba(255,255,255,0.78)",
            fontSize: 30,
            lineHeight: 1.35,
            maxWidth: 900,
            fontWeight: 400,
            fontFamily: "sans-serif",
          }}
        >
          <span>
            Descubra em 2 minutos se sua clínica tem direito a até{" "}
            <span style={{ color: "#FFFFFF", fontWeight: 700 }}>
              70% menos IRPJ e CSLL
            </span>
            .
          </span>
        </div>

        {/* Brand mark inferior direito */}
        <div
          style={{
            position: "absolute",
            right: 100,
            bottom: 60,
            display: "flex",
            color: "#FFFFFF",
            fontSize: 38,
            fontWeight: 700,
            letterSpacing: 3,
          }}
        >
          TAYAH
          <span style={{ color: "#8A2A2B" }}>.</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
