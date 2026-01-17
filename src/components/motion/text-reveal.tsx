"use client";

import { motion } from "framer-motion";

export function TextReveal({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
    return (
        <div className="overflow-hidden">
            <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{
                    duration: 0.8,
                    delay: delay,
                    ease: [0.77, 0, 0.175, 1]
                }}
            >
                {children}
            </motion.div>
        </div>
    );
}