import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Covrd — Land the job. Every time.",
  description:
    "Paste a job description and your CV — Covrd writes a tailored cover letter and shows exactly what keywords you're missing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style={{
          backgroundColor: "var(--color-background)",
          color: "var(--color-text)",
          fontFamily: "var(--font-sans)",
          minHeight: "100vh",
        }}
      >
        {children}
      </body>
    </html>
  );
}
