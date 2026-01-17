"use client";

import { motion } from "framer-motion";
import { ReactNode, HTMLAttributes } from "react";

interface ScrollRevealProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    delay?: number;
}

export function ScrollReveal({ children, delay = 0, className = "", ...props }: ScrollRevealProps) {
    return (
        <div className={className} {...props}>
            <motion.div
                initial={{ opacity: 0, y: 75 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: delay, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
                {children}
            </motion.div>
        </div>
    );
}

export function FadeIn({ children, className = "", delay = 0 }: ScrollRevealProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: delay }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
