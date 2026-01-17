"use client";

import { useTranslations } from "next-intl";
import { ServiceItem } from "../ui/service-item";

export function Services() {
    const t = useTranslations("Services");

    const services = [
        { title: t("list.dev.title"), description: t("list.dev.description") },
        { title: t("list.design.title"), description: t("list.design.description") },
        { title: t("list.motion.title"), description: t("list.motion.description") },
        { title: t("list.branding.title"), description: t("list.branding.description") },
    ];

    return (
        <section id="services" className="px-6 md:px-12 py-32">
            <div className="max-w-8xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                    <div>
                        <h2 className="text-xs font-mono text-brand-primary uppercase tracking-[0.5em] mb-4">
                            {t("title")}
                        </h2>
                        <p className="text-4xl md:text-5xl font-bold tracking-tighter max-w-2xl text-foreground">
                            {t("subtitle")}
                        </p>
                    </div>
                    <div className="hidden md:block text-right">
                        <span className="text-foreground/10 text-9xl font-bold leading-none select-none uppercase">
                            {t("title")}
                        </span>
                    </div>
                </div>

                <div className="flex flex-col">
                    {services.map((service, index) => (
                        <ServiceItem
                            key={index}
                            index={index}
                            title={service.title}
                            description={service.description}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}