"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, Download } from "lucide-react";
import { TextReveal } from "../motion/text-reveal";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { TailChase } from 'ldrs/react';
import 'ldrs/react/TailChase.css';

export function Hero() {
    const t = useTranslations("Hero");
    const tcv = useTranslations("Footer");
    const locale = useLocale();
    const router = useRouter();
    const [isDownloading, setIsDownloading] = useState(false);
    const [isLoadingServices, setIsLoadingServices] = useState(false);

    const handleDownloadCV = () => {
        setIsDownloading(true);
        // Simular preparación de archivo
        setTimeout(() => {
            setIsDownloading(false);
            window.open(`/cv/${locale}/Rayelus_CV_(${locale.toUpperCase()}).pdf`, "_blank");
        }, 1500);
    };

    const handleExploreServices = () => {
        setIsLoadingServices(true);
        router.push(`/${locale}/services`);
    };

    return (
        <section className="relative min-h-[90vh] flex flex-col justify-center px-6 md:px-12 overflow-hidden">
            {/* Badge Disponibilidad */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-2 mb-8 w-fit px-4 py-1.5 rounded-full border border-brand-soft/20 bg-brand-soft/5 backdrop-blur-md z-10"
            >
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-soft opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-soft"></span>
                </span>
                <span className="text-[10px] md:text-xs font-mono tracking-widest uppercase text-brand-soft">
                    {t("badge")}
                </span>
            </motion.div>

            {/* Título Principal Tipográfico */}
            <div className="relative z-10">
                <h2 className="text-xs md:text-sm font-mono text-foreground/50 mb-4 tracking-[0.3em] uppercase">
                    {t("role")}
                </h2>

                <div className="text-5xl md:text-8xl lg:text-[10rem] font-bold leading-[0.85] tracking-tighter">
                    <TextReveal>
                        {t("title_part1")}
                    </TextReveal>
                    <TextReveal delay={0.1}>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-deep via-brand-primary to-brand-soft">
                            {t("title_part2")}
                        </span>
                    </TextReveal>
                </div>
            </div>

            {/* Descripción y CTAs */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-end z-10">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="md:col-span-5 text-lg md:text-xl text-foreground/60 leading-relaxed font-light"
                >
                    {t("description")}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 }}
                    className="md:col-span-7 flex flex-wrap gap-4 md:justify-end"
                >

                    <button
                        onClick={handleExploreServices}
                        disabled={isLoadingServices}
                        className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-brand-primary/10 text-brand-primary rounded-full hover:bg-brand-primary hover:text-white transition-all overflow-hidden backdrop-blur-[4px] border-2 border-brand-primary/20 min-w-[250px]"
                    >
                        {isLoadingServices ? (
                            <TailChase
                                size="24"
                                speed="1.75"
                                color="currentColor"
                            />
                        ) : (
                            <>
                                <span className="font-bold relative z-10">Explorar Servicios</span>
                                <span className="absolute inset-0 bg-brand-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" />
                            </>
                        )}
                    </button>

                    <button
                        onClick={handleDownloadCV}
                        disabled={isDownloading}
                        className="group relative flex items-center gap-3 px-8 py-3 bg-foreground rounded-full text-background font-bold overflow-hidden transition-all hover:bg-brand-primary hover:text-white"
                        data-cursor={tcv("cv").split(" ")[0].toUpperCase()}
                    >
                        <Download size={18} className={isDownloading ? "animate-bounce" : ""} />
                        {isDownloading ? tcv("cv_loading") : tcv("cv")}
                    </button>

                    {/* Boton de contacto lleva a la seccion contact */}


                    {/* <a
                        href="#contact"
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="px-8 py-4 border-2 border-foreground/10 rounded-full backdrop-blur-[4px] font-bold hover:bg-surface-100 transition-colors"
                    >
                        {t("cta_secondary")}
                    </a> */}
                </motion.div>
            </div>

            {/* Fondo Video Abstracto */}
            <div className="absolute inset-0 z-0 hidden md:block select-none pointer-events-none">
                <div className="absolute inset-0 bg-background/50 mix-blend-overlay z-10" />
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute top-0 right-0 w-full h-full object-cover opacity-30 mix-blend-screen"
                    style={{
                        maskImage: "linear-gradient(to right, transparent, black 40%), linear-gradient(to top, transparent, black 40%)",
                        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 50%)"
                    }}
                >
                    <source src="/videos/hero-bg.mp4" type="video/mp4" />
                </video>
                {/* Gradiente adicional para fundir mejor a la izquierda, abajo y arriba */}
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/20 to-transparent z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
                <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-transparent z-10" />
            </div>

            {/* Decoración de Fondo (Abstracta) - Mantenemos como fallback o complemento */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-brand-primary/10 blur-3xl rounded-full z-0 pointer-events-none" />
        </section>
    );
}