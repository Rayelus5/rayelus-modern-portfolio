"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { motion } from "framer-motion";

export function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const toggleLanguage = () => {
        const nextLocale = locale === "es" ? "en" : "es";
        router.replace(pathname, { locale: nextLocale });
    };

    return (
        <button
            onClick={toggleLanguage}
            className="no-cursor-hover flex items-center justify-center p-3 rounded-full bg-surface-100 hover:bg-surface-200 transition-colors border  border-brand-soft/40 overflow-hidden relative"
            aria-label="Toggle Language"
        >
            <motion.div
                key={locale}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-xl w-6 h-6 flex items-center justify-center"
            >
                {locale === "es" ? "🇪🇸" : "🇺🇸"}
            </motion.div>
        </button>
    );
}