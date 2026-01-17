"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname, routing } from "@/i18n/routing";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface LocaleConfig {
    flag: string;
    label: string;
    fontVar?: string;
}

const localeInfo: Record<string, LocaleConfig> = {
    en: { flag: "🇺🇸", label: "English" },
    es: { flag: "🇪🇸", label: "Español" },
    ca: { flag: "🏴󠁥󠁳󠁣󠁴󠁿", label: "Català" },
    fr: { flag: "🇫🇷", label: "Français" },
    zh: { flag: "🇨🇳", label: "中文", fontVar: "--font-zh" },
    ja: { flag: "🇯🇵", label: "日本語", fontVar: "--font-ja" },
    ar: { flag: "🇸🇦", label: "العربية", fontVar: "--font-ar" },
};

export function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const changeLocale = (nextLocale: string) => {
        router.replace(pathname, { locale: nextLocale });
        setIsOpen(false);
    };

    // Close on click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={containerRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "no-cursor-hover flex items-center justify-center gap-1 pl-3 pr-2 h-12 rounded-full bg-surface-100 hover:bg-surface-200 transition-colors border border-brand-soft/40 outline-none",
                    isOpen && "bg-surface-200 ring-2 ring-brand-primary/20"
                )}
                aria-label="Change Language"
                aria-expanded={isOpen}
            >
                <span className="text-xl leading-none">{localeInfo[locale as keyof typeof localeInfo]?.flag || "🌐"}</span>
                <ChevronDown size={14} className={cn("text-foreground/50 transition-transform duration-300", isOpen && "rotate-180")} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full right-0 mt-2 w-48 bg-surface-100 border border-brand-soft/20 rounded-2xl shadow-2xl p-2 z-50 overflow-hidden"
                    >
                        <div className="flex flex-col gap-1">
                            {routing.locales.map((cur) => {
                                const info = localeInfo[cur as keyof typeof localeInfo];
                                return (
                                    <button
                                        key={cur}
                                        onClick={() => changeLocale(cur)}
                                        className={cn(
                                            "w-full text-left flex items-center justify-between px-3 py-2 rounded-xl transition-all text-sm font-medium no-cursor-hover",
                                            cur === locale
                                                ? "bg-brand-primary/10 text-brand-primary"
                                                : "hover:bg-surface-200 text-foreground/70 hover:text-foreground"
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="text-lg leading-none">{info?.flag}</span>
                                            <span style={{ fontFamily: info?.fontVar ? `var(${info.fontVar})` : undefined }}>
                                                {info?.label}
                                            </span>
                                        </div>
                                        {cur === locale && <Check size={14} />}
                                    </button>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}