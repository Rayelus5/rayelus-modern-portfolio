"use client";

import { useTranslations, useLocale } from "next-intl";
import { ServiceItem } from "../ui/service-item";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { TailChase } from 'ldrs/react';
import 'ldrs/react/TailChase.css';

export function Services() {
    const t = useTranslations("Services");
    const locale = useLocale();
    const router = useRouter();
    const [isLoadingServices, setIsLoadingServices] = useState(false);

    const handleExploreServices = () => {
        setIsLoadingServices(true);
        router.push(`/${locale}/services`);
    };

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

                <div className="mt-16 flex justify-center">
                    <button
                        onClick={handleExploreServices}
                        disabled={isLoadingServices}
                        className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-brand-primary/10 text-brand-primary rounded-full hover:bg-brand-primary hover:text-white transition-all overflow-hidden min-w-[300px]"
                    >
                        {isLoadingServices ? (
                            <TailChase
                                size="24"
                                speed="1.75"
                                color="currentColor"
                            />
                        ) : (
                            <>
                                <span className="font-bold relative z-10">Explorar todos los Servicios</span>
                                <span className="absolute inset-0 bg-brand-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" />
                            </>
                        )}
                    </button>
                </div>
            </div>
        </section>
    );
}