"use client";

import { useTranslations } from "next-intl";
import { Github, Linkedin, Twitter, Download, Globe, Heart } from "lucide-react";
import { useState } from "react";
import { useLocale } from "next-intl";

export function Footer() {
    const t = useTranslations("Footer");
    const locale = useLocale();
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownloadCV = () => {
        setIsDownloading(true);
        // Simular preparación de archivo
        setTimeout(() => {
            setIsDownloading(false);
            window.open(`/cv/${locale}/Rayelus_CV_(${locale.toUpperCase()}).pdf`, "_blank");
        }, 1500);
    };

    return (
        <footer className="border-t border-foreground/10 bg-surface-200 py-12 px-6 md:px-12">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">

                <div className="flex flex-col items-center md:items-start gap-2">
                    <span className="text-2xl font-bold tracking-tighter text-foreground">
                        RAYELUS<span className="text-brand-primary">.</span>
                    </span>
                    <p className="text-xs text-foreground/60 font-mono italic flex items-center gap-2">
                        Designed & Developed with <Heart className="text-brand-primary" size={16} /> by Rayelus
                    </p>
                </div>

                <div className="flex flex-col items-center gap-6">
                    <button
                        onClick={handleDownloadCV}
                        disabled={isDownloading}
                        className="group relative flex items-center gap-3 px-8 py-3 bg-brand-primary/10 border border-brand-primary/20 rounded-full text-brand-primary font-bold overflow-hidden transition-all hover:bg-brand-primary hover:text-white"
                        data-cursor={t("cv").toUpperCase().split(" ")[0]}
                    >
                        <Download size={18} className={isDownloading ? "animate-bounce" : ""} />
                        {isDownloading ? t("cv_loading") : t("cv")}
                    </button>

                    <div className="flex gap-6 text-foreground/60">
                        <a href="https://github.com/Rayelus5" className="hover:text-brand-primary transition-colors"><Github size={20} /></a>
                        <a href="https://www.linkedin.com/in/rayelus/" className="hover:text-brand-primary transition-colors"><Linkedin size={20} /></a>
                        <a href="https://rayelus.com" className="hover:text-brand-primary transition-colors"><Globe size={20} /></a>
                    </div>
                </div>

                <p className="text-xs text-foreground/40 font-mono">
                    © {new Date().getFullYear()} — {t("rights")}
                </p>
            </div>
        </footer>
    );
}