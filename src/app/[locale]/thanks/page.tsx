"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, CheckCircle } from "lucide-react";

export default function ThanksPage() {
    const t = useTranslations("Thanks");

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center relative overflow-hidden bg-background">

            {/* Background Decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-primary/10 blur-[100px] rounded-full z-0 pointer-events-none" />

            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "backOut" }}
                className="relative z-10 bg-surface-100 p-12 rounded-[3rem] border border-brand-primary/20 shadow-2xl shadow-brand-primary/10 flex flex-col items-center gap-6 max-w-lg"
            >
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 mb-2">
                    <CheckCircle size={40} />
                </div>

                <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
                    {t("title")}
                </h1>

                <p className="text-lg text-foreground/60 leading-relaxed">
                    {t("message")}
                </p>

                <Link
                    href="/"
                    className="mt-4 px-8 py-3 bg-brand-primary text-white rounded-full font-bold flex items-center gap-2 hover:bg-brand-deep transition-all hover:pr-10"
                >
                    <ArrowLeft size={18} />
                    {t("button")}
                </Link>
            </motion.div>
        </div>
    );
}
