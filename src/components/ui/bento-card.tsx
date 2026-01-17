"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BentoCardProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
}

export function BentoCard({ children, className, title }: BentoCardProps) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={cn(
                "relative overflow-hidden rounded-3xl p-6 border border-brand-soft/10 bg-surface-100/50 backdrop-blur-sm",
                className
            )}
        >
            {title && <h3 className="text-sm font-mono text-brand-soft mb-4 uppercase tracking-widest">{title}</h3>}
            {children}
        </motion.div>
    );
}