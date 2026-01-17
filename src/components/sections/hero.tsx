"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { TextReveal } from "../motion/text-reveal";
import { cn } from "@/lib/utils";

export function Hero() {
    const t = useTranslations("Hero");

    return (
        <section className="relative min-h-[90vh] flex flex-col justify-center px-6 md:px-12 overflow-hidden">
            {/* Badge Disponibilidad */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-2 mb-8 w-fit px-4 py-1.5 rounded-full border border-brand-soft/20 bg-brand-soft/5 backdrop-blur-md"
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
            <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
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
                    <button className="group relative px-8 py-4 bg-foreground text-background rounded-full font-bold overflow-hidden transition-all hover:pr-12">
                        <span className="relative z-10 flex items-center gap-2">
                            {t("cta_primary")}
                            <ArrowUpRight className="w-4 h-4" />
                        </span>
                        <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </button>

                    <button className="px-8 py-4 border border-foreground/10 rounded-full font-bold hover:bg-surface-100 transition-colors">
                        {t("cta_secondary")}
                    </button>
                </motion.div>
            </div>

            {/* Decoración de Fondo (Abstracta) */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full z-0 opacity-50" />
            <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-accent-violet/20 blur-[100px] rounded-full z-0 opacity-30" />
        </section>
    );
}