"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
    const [isLoading, setIsLoading] = useState(true);
    const [count, setCount] = useState(0);

    useEffect(() => {
        // Simulación de carga
        const duration = 800;
        const steps = 100;
        const intervalTime = duration / steps;

        let current = 0;
        const timer = setInterval(() => {
            current++;
            setCount(current);
            if (current >= 100) {
                clearInterval(timer);
                setTimeout(() => setIsLoading(false), 500); // Pausa al 100%
            }
        }, intervalTime);

        return () => clearInterval(timer);
    }, []);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[99999] flex items-center justify-center bg-black overflow-hidden"
                    exit={{
                        clipPath: "circle(0% at 50% 50%)", // Efecto Iris cerrándose o circle reveal
                        // Pero el usuario pidió "pantalla de carga circular". 
                        // Una transición épica es que el circulo negro (el preloader) se encoja revelando el sitio, 
                        // o que se expanda revelando el sitio (mask invertida).
                        // Vamos a hacer que la capa negra desaparezca mediante un "agujero" que crece.
                    }}
                >
                    {/* Contenido del Preloader */}
                    <div className="relative flex flex-col items-center">
                        <span className="text-9xl font-black text-brand-primary tracking-tighter mix-blend-difference">
                            {count}%
                        </span>

                        <div className="mt-4 h-1 w-64 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-brand-primary"
                                initial={{ width: 0 }}
                                animate={{ width: `${count}%` }}
                                transition={{ ease: "linear", duration: 0.02 }} // Instantáneo visualmente con el state
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
