"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TailChase } from 'ldrs/react';
import 'ldrs/react/TailChase.css';

export function Preloader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // We simulate a shorter loading time for better UX
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 600);

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[99999] flex items-center justify-center bg-brand-darkest"
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <TailChase
                        size="80"
                        speed="2"
                        color="white"
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
