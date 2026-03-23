import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://xray-vector.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Vector X-Ray",
  description: "Simulador visual para entender vetores passo a passo.",
  openGraph: {
    title: "Vector X-Ray",
    description: "Simulador visual para entender vetores passo a passo.",
    url: siteUrl,
    type: "website",
    locale: "pt_BR"
  }
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className="bg-grid bg-[size:22px_22px]">
        <a
          href="#conteudo-principal"
          className="skip-link"
        >
          Pular para o conteúdo principal
        </a>
        {children}
      </body>
    </html>
  );
}
