"use client";

import { useTranslations, useLocale } from "next-intl";
import { getServicesData } from "@/data/services";
import { ServiceCard } from "@/components/services/service-card";
import { useState, useMemo } from "react";
import { Search, Filter, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function ServicesPage() {
    const t = useTranslations("ServicesPage");
    const locale = useLocale();
    const servicesData = getServicesData(locale);

    // Fallback if translations are missing or working with hardcoded for now?
    // We expect t() to work now.

    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState(t("filter_all"));

    const categories = [t("filter_all"), "Web", "Design", "Other"];

    const filteredServices = useMemo(() => {
        return servicesData.filter(service => {
            const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                service.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
            // Map category logic: "Todos" means all. 
            // The category in data is "Web", "Design", "Other" (English internal keys).
            // The filter buttons show translated categories? 
            // internal categories are English "Web", "Design", "Other".
            // activeCategory is UI string.

            // Problem: activeCategory from `categories` array includes translated strings like "Todos".
            // If internal data uses "Web", "Design", "Other", we need to match appropriately.

            if (activeCategory === t("filter_all")) return matchesSearch;

            return matchesSearch && service.category === activeCategory;
        });
    }, [searchQuery, activeCategory, t, servicesData]);

    return (
        <div className="min-h-screen pb-24">
            {/* Header Section */}
            <section className="relative pt-32 pb-20 px-6 md:px-12 overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] z-0" />
                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full border-2 border-brand-primary/20 bg-brand-primary/5 text-brand-primary text-xs font-mono uppercase tracking-widest mb-6">
                            {t("badge")}
                        </span>
                        <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6">
                            {t("title_prefix")} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-deep">
                                {t("title_highlight")}
                            </span>
                        </h1>
                        <p className="text-lg text-foreground/60 max-w-2xl mx-auto leading-relaxed">
                            {t("description")}
                        </p>
                    </motion.div>

                    {/* Search & Filter Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="mt-12 max-w-2xl mx-auto"
                    >
                        <div className="relative group">
                            <div className="absolute inset-0 bg-brand-primary/5 blur-xl rounded-2xl group-hover:bg-brand-primary/10 transition-colors" />
                            <div className="relative bg-surface-100/80 backdrop-blur-xl border-2  border-brand-primary/30 rounded-2xl p-2 flex flex-col md:flex-row gap-2 shadow-2xl">

                                <div className="relative flex-1">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/30 w-5 h-5" />
                                    <input
                                        type="text"
                                        placeholder={t("search_placeholder")}
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full bg-transparent border-none pl-12 py-3 focus:outline-none text-foreground placeholder:text-foreground/30 no-cursor-hover cursor-none"
                                    />
                                </div>

                                <div className="flex gap-1 bg-surface-200/50 p-1 rounded-xl">
                                    {categories.map(cat => (
                                        <button
                                            key={cat}
                                            onClick={() => setActiveCategory(cat)}
                                            className={cn(
                                                "px-4 py-2 rounded-lg text-sm font-medium transition-all no-cursor-hover",
                                                activeCategory === cat
                                                    ? "bg-brand-primary text-white shadow-lg"
                                                    : "text-foreground/60 hover:bg-surface-300 hover:text-foreground"
                                            )}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>

                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Grid Section */}
            <section className="px-6 md:px-12 max-w-7xl mx-auto">
                {filteredServices.length > 0 ? (
                    <div className="grid grid-cols-1 gap-8">
                        {filteredServices.map(service => (
                            <ServiceCard key={service.id} service={service} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24 border-2 border-dashed border-brand-soft/10 rounded-3xl">
                        <div className="inline-block p-4 rounded-full bg-surface-200 mb-4">
                            <Filter size={32} className="text-foreground/30" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground/50">{t("no_results")}</h3>
                        <button
                            onClick={() => { setSearchQuery(""); setActiveCategory(t("filter_all")); }}
                            className="mt-4 text-brand-primary hover:underline text-sm font-bold"
                        >
                            {t("clear_filters")}
                        </button>
                    </div>
                )}
            </section>
        </div>
    );
}
