"use client";

import { Service } from "@/data/services";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, ChevronUp, Layers } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ServicePlans } from "./service-plans";

interface ServiceCardProps {
    service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <motion.div
            layout
            className={cn(
                "group relative rounded-3xl border-2 transition-all duration-500 overflow-hidden",
                isExpanded
                    ? "bg-surface-100 border-brand-primary/40 shadow-2xl z-10"
                    : "bg-surface-100/30 border-brand-primary/50 hover:border-brand-primary/80 hover:shadow-lg"
            )}
        >
            <div className="grid grid-cols-1 md:grid-cols-[1.5fr_2fr] gap-6">
                {/* Image Section */}
                <div className="relative h-48 md:h-full min-h-[200px] overflow-hidden">
                    <div className="absolute inset-0 bg-surface-300 animate-pulse" /> {/* Placeholder color */}
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-100 via-transparent to-transparent opacity-80 z-[1]" />
                    {/* If image fails, fallback is handled nicely by just having the placeholder/gradient */}
                    <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={(e) => {
                            // Basic fallback if image is missing - handled by parent div bg usually
                            (e.target as HTMLImageElement).style.display = 'none';
                        }}
                    />

                    <div className="absolute bottom-4 left-4 z-[2]">
                        <span className="inline-block px-3 py-1 rounded-full bg-brand-primary/90 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm shadow-lg mb-2">
                            {service.category}
                        </span>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-6 md:p-8 flex flex-col justify-center">
                    <h3 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 mb-3">
                        {service.title}
                    </h3>
                    <p className="text-foreground/60 leading-relaxed mb-6">
                        {service.shortDescription}
                    </p>

                    <div className="flex items-center gap-4 mt-auto justify-end">
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className={cn(
                                "flex items-center gap-2 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all no-cursor-hover",
                                isExpanded
                                    ? "bg-foreground text-background"
                                    : "bg-brand-primary/10 text-brand-primary hover:bg-brand-primary hover:text-white"
                            )}
                        >
                            {isExpanded ? (
                                <>
                                    Cerrar Planes <ChevronUp size={14} />
                                </>
                            ) : (
                                <>
                                    Ver Planes y Precios <Layers size={14} />
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Expanded Content - Plans */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "circOut" }}
                        className="overflow-hidden border-t border-brand-primary/30"
                    >
                        <div className="p-6 md:p-8 bg-surface-100/50">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="text-sm font-bold text-foreground/50 uppercase tracking-widest">
                                    Planes Disponibles
                                </h4>
                                <span className="text-sm text-brand-primary bg-brand-primary/10 px-2 py-0.5 rounded border-2 border-brand-primary/20">
                                    Precios Orientativos
                                </span>
                            </div>

                            <ServicePlans plans={service.plans} serviceName={service.title} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
