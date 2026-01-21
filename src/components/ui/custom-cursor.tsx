"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";

export function CustomCursor() {
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const [cursorText, setCursorText] = useState("");

    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    const ringX = useSpring(mouseX, { damping: 40, stiffness: 300 });
    const ringY = useSpring(mouseY, { damping: 40, stiffness: 300 });
    const dotX = useSpring(mouseX, { damping: 60, stiffness: 800 });
    const dotY = useSpring(mouseY, { damping: 60, stiffness: 800 });

    const handleMouseMove = useCallback((e: MouseEvent) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
        if (!isVisible) setIsVisible(true);
    }, [mouseX, mouseY, isVisible]);

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        // ... existing event listeners logic ...
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            // 1. REGLA DE EXCLUSIÓN: Si tiene la clase 'no-cursor-hover', forzamos estado normal
            if (target.closest(".no-cursor-hover")) {
                setIsHovered(false);
                setCursorText("");
                return;
            }

            // 2. REGLA DE INTERACCIÓN: Botones, links y inputs
            const interactiveElement = target.closest("button, a, .cursor-pointer, input, textarea, .cursor-hover");
            if (interactiveElement) {
                setIsHovered(true);
                const customText = interactiveElement.getAttribute("data-cursor");
                setCursorText(customText || (document.documentElement.lang.startsWith("es") ? "VER" : "VIEW"));
            } else {
                setIsHovered(false);
                setCursorText("");
            }

            // 3. REGLA DE EXCLUSION: Movil no hace hover
            if (window.innerWidth < 768) {
                setIsHovered(false);
                setCursorText("");
            }
        };

        const handleMouseDown = () => setIsClicked(true);
        const handleMouseUp = () => setIsClicked(false);
        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseover", handleMouseOver);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);
        document.addEventListener("mouseleave", handleMouseLeave);
        document.addEventListener("mouseenter", handleMouseEnter);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseover", handleMouseOver);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
            document.removeEventListener("mouseleave", handleMouseLeave);
            document.removeEventListener("mouseenter", handleMouseEnter);
        };
    }, [handleMouseMove]);

    if (!isMounted) return null;

    return (
        <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
            <AnimatePresence>
                {isVisible && (
                    <>
                        {/* ANILLO EXTERIOR REDONDO Y GRUESO */}
                        <motion.div
                            className="absolute top-0 left-0 rounded-full border-[3px] border-brand-primary flex items-center justify-center"
                            style={{
                                x: ringX,
                                y: ringY,
                                translateX: "-50%",
                                translateY: "-50%",
                                width: 60,
                                height: 60,
                            }}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{
                                opacity: 1,
                                scale: isClicked ? 0.8 : isHovered ? 2 : 1,
                                backgroundColor: isHovered ? "var(--color-brand-primary)" : "rgba(59, 130, 246, 0)",
                                mixBlendMode: isHovered ? "normal" : "difference",
                            }}
                            exit={{ opacity: 0, scale: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        >
                            {isHovered && (
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-[8px] font-black text-brand-darkest uppercase tracking-widest"
                                >
                                    {cursorText}
                                </motion.span>
                            )}
                        </motion.div>

                        {/* PUNTO CENTRAL (Sólo visible si no hay hover) */}
                        <motion.div
                            className="absolute top-0 left-0 w-2 h-2 bg-brand-primary rounded-full"
                            style={{
                                x: dotX,
                                y: dotY,
                                translateX: "-50%",
                                translateY: "-50%",
                            }}
                            animate={{
                                scale: isHovered ? 0 : 1,
                                opacity: isHovered ? 0 : 1,
                            }}
                        />
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}