import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vector X-Ray",
  description: "Simulador visual para entender vetores passo a passo."
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
