"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { createPortal } from "react-dom";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [transitionDetails, setTransitionDetails] = useState<{
        x: number;
        y: number;
        targetTheme: string;
    } | null>(null);

    useEffect(() => setMounted(true), []);

    const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        const nextTheme = theme === "dark" ? "light" : "dark";

        // Trigger transition animation
        setTransitionDetails({ x, y, targetTheme: nextTheme });
    };

    if (!mounted) return <div className="w-9 h-9" />;

    return (
        <>
            <button
                onClick={handleToggle}
                className="relative p-3 rounded-full bg-surface-100 hover:bg-surface-200 transition-colors no-cursor-hover border border-brand-soft/40 outline-none overflow-hidden"
                aria-label="Toggle theme"
            >
                <AnimatePresence mode="wait">
                    {theme === "dark" ? (
                        <motion.div
                            key="sun"
                            initial={{ scale: 0.5, opacity: 0, rotate: -90 }}
                            animate={{ scale: 1, opacity: 1, rotate: 0 }}
                            exit={{ scale: 0.5, opacity: 0, rotate: 90 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Sun className="w-6 h-6 text-foreground" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="moon"
                            initial={{ scale: 0.5, opacity: 0, rotate: -90 }}
                            animate={{ scale: 1, opacity: 1, rotate: 0 }}
                            exit={{ scale: 0.5, opacity: 0, rotate: 90 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Moon className="w-6 h-6 text-brand-deep" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </button>

            {/* Render Transition Overlay via Portal to ensure it covers everything */}
            {transitionDetails && createPortal(
                <ThemeTransitionOverlay
                    x={transitionDetails.x}
                    y={transitionDetails.y}
                    targetTheme={transitionDetails.targetTheme}
                    onSwitchTheme={() => setTheme(transitionDetails.targetTheme)}
                    onComplete={() => setTransitionDetails(null)}
                />,
                document.body
            )}
        </>
    );
}

interface TransitionOverlayProps {
    x: number;
    y: number;
    targetTheme: string;
    onSwitchTheme: () => void;
    onComplete: () => void;
}

function ThemeTransitionOverlay({ x, y, targetTheme, onSwitchTheme, onComplete }: TransitionOverlayProps) {
    const [phase, setPhase] = useState<"expand" | "fade">("expand");

    // Colors matching globals.css
    const bgColor = targetTheme === "dark" ? "#020617" : "#f8fafc"; // brand-darkest vs background-light

    return (
        <motion.div
            initial={{ clipPath: `circle(0px at ${x}px ${y}px)` }}
            animate={
                phase === "expand"
                    ? { clipPath: `circle(150% at ${x}px ${y}px)` }
                    : { opacity: 0 }
            }
            transition={{
                duration: phase === "expand" ? 0.6 : 0.4,
                ease: [0.32, 0, 0.67, 0], // easeInCubic for expansion
            }}
            onAnimationComplete={() => {
                if (phase === "expand") {
                    onSwitchTheme();
                    setPhase("fade");
                } else {
                    onComplete();
                }
            }}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                zIndex: 9999,
                backgroundColor: bgColor,
                pointerEvents: "none", // Allow clicks to pass through if something goes wrong, though it covers screen
            }}
        />
    );
}
