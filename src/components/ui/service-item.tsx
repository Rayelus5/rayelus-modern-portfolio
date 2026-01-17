"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceItemProps {
    title: string;
    description: string;
    index: number;
}

export function ServiceItem({ title, description, index }: ServiceItemProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative border-b border-foreground/10 py-12 cursor-none"
        >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="flex items-center gap-6">
                    <span className="text-sm font-mono text-brand-primary opacity-50">
                        0{index + 1}
                    </span>
                    <h3 className={cn(
                        "text-4xl md:text-7xl font-bold tracking-tighter transition-all duration-500",
                        isHovered ? "text-brand-primary translate-x-4" : "text-foreground"
                    )}>
                        {title}
                    </h3>
                </div>

                <div className={cn(
                    "max-w-xs transition-all duration-500",
                    isHovered ? "opacity-100 translate-x-0" : "opacity-100 md:opacity-0 md:-translate-x-4"
                )}>
                    <p className="text-sm text-foreground/60 leading-relaxed italic">
                        {description}
                    </p>
                </div>

                <div className={cn(
                    "transition-transform duration-500",
                    isHovered ? "rotate-45 text-brand-primary" : "rotate-0 text-foreground/20"
                )}>
                    <Plus size={48} strokeWidth={1} />
                </div>
            </div>

            {/* Fondo dinámico al hacer hover */}
            <motion.div
                initial={{ scaleX: 0 }}
                animate={isHovered ? { scaleX: 1 } : { scaleX: 0 }}
                className="absolute bottom-0 left-0 h-1 w-full bg-brand-primary origin-left transition-transform duration-500"
            />
        </motion.div>
    );
}