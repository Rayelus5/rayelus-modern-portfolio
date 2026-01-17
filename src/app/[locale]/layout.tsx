import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ThemeProvider } from "@/components/layout/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { cn } from "@/lib/utils";
import "@/app/globals.css";
import { Footer } from "@/components/layout/footer";
import { ClientLoader } from "@/components/layout/client-loader";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
    title: "Rayelus | Creative Designer & Frontend Engineer",
    description: "Portfolio profesional de Raimundo Palma Méndez (Rayelus).",
};

export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const messages = await getMessages();

    return (
        <html lang={locale} suppressHydrationWarning>
            <body className={cn(
                "min-h-screen font-sans antialiased noise-bg",
                geistSans.variable,
                geistMono.variable
            )}>
                <NextIntlClientProvider messages={messages}>
                    <ThemeProvider>
                        <ClientLoader>
                            <SmoothScroll>
                                <CustomCursor />
                                <div className="relative flex min-h-screen flex-col">
                                    {/* Grid Pattern Background */}
                                    <div className="fixed inset-0 z-[-1] bg-grid-pattern opacity-[0.03]" />

                                    <Navbar />
                                    <main className="flex-1 pt-24">
                                        {children}
                                    </main>
                                    <Footer />
                                </div>
                            </SmoothScroll>
                        </ClientLoader>
                    </ThemeProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}