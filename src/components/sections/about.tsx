"use client";

import { motion } from "framer-motion";
import { TechAppGallery } from "../ui/tech-app-gallery";
import { Code2, Globe, Cpu, Sparkles, Terminal } from "lucide-react";
import { useTranslations } from "next-intl";

export function About() {
    const t = useTranslations("About");

    return (
        <section className="relative w-full py-20 md:py-32 overflow-hidden">
            {/* Fondo Decorativo Sutil */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[20%] right-[10%] w-96 h-96 bg-brand-primary/5 rounded-full blur-[128px]" />
                <div className="absolute bottom-[10%] left-[5%] w-72 h-72 bg-brand-secondary/5 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">

                    {/* Columna Izquierda: Identidad & Bio */}
                    <div className="w-full lg:w-1/2 flex flex-col gap-8">

                        {/* Title Block */}
                        <div className="relative">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9]"
                            >
                                {t("title_part1")}
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-soft">
                                    {t("title_part2")}
                                </span>
                            </motion.h2>
                            <div className="absolute -top-6 -left-6 w-12 h-12 border-t-2 border-l-2 border-brand-primary/30" />
                        </div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-lg md:text-xl text-foreground/70 font-light border-l-4 border-brand-primary/20 pl-6 space-y-4"
                        >
                            <div
                                dangerouslySetInnerHTML={{ __html: t.raw("bio_p1") }}
                            />
                            <p>
                                {t("bio_p2")}
                            </p>
                        </motion.div>

                        {/* Stats / Info Grid */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="grid grid-cols-2 gap-6 mt-4"
                        >
                            <div className="p-4 bg-surface-100/50 rounded-2xl border-2 border-brand-primary/20 backdrop-blur-[2px] hover:border-brand-soft/30 transition-colors">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-brand-primary/10 rounded-lg text-brand-primary">
                                        <Globe size={20} />
                                    </div>
                                    <span className="text-xs font-mono uppercase text-brand-soft tracking-wider">{t("stats.base_label")}</span>
                                </div>
                                <span className="text-xl font-bold">{t("stats.base_value")}</span>
                            </div>

                            <div className="p-4 bg-surface-100/50 rounded-2xl border-2 border-brand-primary/20 backdrop-blur-[2px] hover:border-brand-soft/30 transition-colors">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-brand-primary/10 rounded-lg text-brand-primary">
                                        <Code2 size={20} />
                                    </div>
                                    <span className="text-xs font-mono uppercase text-brand-soft tracking-wider">{t("stats.exp_label")}</span>
                                </div>
                                <span className="text-xl font-bold">{t("stats.exp_value")}</span>
                            </div>
                        </motion.div>

                    </div>

                    {/* Columna Derecha: The Reactor (Tech Stack) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full lg:w-1/2 relative"
                    >
                        {/* Decorative Frames */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 border border-brand-primary/10 rounded-3xl scale-105 -z-10"
                        />
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 border border-brand-soft/10 rounded-3xl scale-105 -z-10"
                        />
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 border border-brand-soft/10 rounded-3xl scale-110 -z-10 opacity-40 blur-[1px]"
                        />
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 border border-brand-soft/10 rounded-3xl scale-120 -z-10 opacity-20 blur-[2px]"
                        />


                        {/* Main Container */}
                        <div className="relative z-10 bg-surface-100/80 backdrop-blur-xl border-2 border-brand-primary/20 rounded-3xl overflow-hidden shadow-2xl shadow-brand-primary/10 hover:scale-105 transition-transform duration-500">

                            {/* HUD Header */}
                            <div className="flex items-center justify-between px-6 py-4 border-b border-brand-primary/10 bg-foreground/5">
                                <div className="flex items-center gap-2">
                                    <div className="flex gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                                    </div>
                                    <span className="ml-3 text-xs font-mono text-brand-primary/70 tracking-widest">
                                        {t("stats.stack_title")}
                                    </span>
                                </div>
                                <Terminal size={20} className="text-brand-primary/50 animate-pulse" />
                            </div>

                            {/* The Gallery */}
                            <div className="p-4 md:p-6" style={{ minHeight: "380px" }}>
                                <TechAppGallery />
                            </div>

                            {/* Footer Status */}
                            <div className="px-6 py-3 border-t border-brand-primary/10 bg-foreground/5 flex justify-between items-center text-[10px] font-mono text-brand-soft/60 uppercase">
                                <span>{t("stats.dev_since")}</span>
                                <span>v2.0.26</span>
                            </div>
                        </div>

                    </motion.div>

                </div>

            </div>

            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none z-10" />
        </section>
    );
}