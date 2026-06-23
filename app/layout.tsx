import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyCTA } from "@/components/layout/MobileStickyCTA";
import { buildOrganization, buildMedicalClinic } from "@/lib/schema/builders";
import { CLINIC } from "@/lib/constants/clinic";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-sans",
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
  variable: "--font-display",
});

export const metadata: Metadata = {
  metadataBase: new URL(CLINIC.domain),
  title: {
    default: `${CLINIC.name} — стоматология в Сочи`,
    template: `%s — ${CLINIC.name}`,
  },
  description:
    "Стоматология полного цикла в центре Сочи. Лечение, протезирование, имплантация. ★ 4.9 на 2ГИС.",
};

export const viewport: Viewport = {
  themeColor: "#0284c7",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgSchema = buildOrganization();
  const clinicSchema = buildMedicalClinic();
  return (
    <html lang="ru" className={`${inter.variable} ${manrope.variable}`}>
      <body className="flex min-h-screen flex-col font-sans antialiased pb-[72px] md:pb-0">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileStickyCTA />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicSchema) }}
        />
      </body>
    </html>
  );
}
