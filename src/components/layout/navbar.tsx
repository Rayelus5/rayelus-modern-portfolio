"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { ThemeToggle } from "../ui/theme-toggle";
import { LanguageSwitcher } from "../ui/language-switcher";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

// IDs de las secciones definidos en el DOM
const navItems = [
    { name: "about", href: "#about" },
    { name: "projects", href: "#projects" },
    { name: "services", href: "#services" },
    { name: "contact", href: "#contact" },
];

export function Navbar() {
    const t = useTranslations("Nav");
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");

    // Detectar sección activa al hacer scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveSection(entry.target.id);
                });
            },
            { threshold: 0.5 }
        );

        navItems.forEach((item) => {
            const el = document.querySelector(item.href);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const targetId = href.replace("#", "");
        const elem = document.getElementById(targetId);
        elem?.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6 pointer-events-none">
            <nav className="flex items-center gap-6 px-6 py-3 rounded-full border border-brand-soft/20 bg-background/60 backdrop-blur-xl shadow-2xl pointer-events-auto">
                <a
                    href="#home"
                    onClick={(e) => handleScroll(e, "#home")}
                    className="text-xl font-bold tracking-tighter hover:text-brand-primary transition-colors"
                >
                    RAYELUS<span className="text-brand-primary">.</span>
                </a>

                {/* Desktop Nav */}
                <ul className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <li key={item.name}>
                            <a
                                href={item.href}
                                onClick={(e) => handleScroll(e, item.href)}
                                className={cn(
                                    "text-sm font-mono uppercase tracking-widest transition-all hover:text-brand-primary",
                                    activeSection === item.href.replace("#", "")
                                        ? "text-brand-primary font-bold"
                                        : "text-foreground/50"
                                )}
                            >
                                {t(item.name)}
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="flex items-center gap-2 border-l border-brand-soft/20 pl-4">
                    <ThemeToggle />
                    <LanguageSwitcher />

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-foreground"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        className="absolute top-24 left-6 right-6 p-8 rounded-[2rem] bg-surface-100 border border-brand-soft/10 shadow-3xl md:hidden pointer-events-auto"
                    >
                        <ul className="flex flex-col gap-6 items-center">
                            {navItems.map((item) => (
                                <li key={item.name}>
                                    <a
                                        href={item.href}
                                        onClick={(e) => handleScroll(e, item.href)}
                                        className="text-2xl font-bold tracking-tighter hover:text-brand-primary"
                                    >
                                        {t(item.name)}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}