"use client";

import { useTranslations } from "next-intl";
import { ProjectCard } from "../ui/project-card";
import Link from "next/link";
import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, ChevronLeft, ChevronRight, Check, MoreHorizontal, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Projects() {
    const t = useTranslations("Projects");

    // Datos de ejemplo
    const rawProjects = [
        { id: "p1", category: "Web App", tag: t("items.p1.tag"), title: t("items.p1.title"), desc: t("items.p1.desc"), url: "#", cursorText: t("cursorText.p1") },
        { id: "p2", category: "Web App", tag: t("items.p2.tag"), title: t("items.p2.title"), desc: t("items.p2.desc"), url: "#", cursorText: t("cursorText.p2") },
        { id: "p3", category: "Design", tag: "Design System", title: "Aura UI System", desc: "Enterprise design system architecture.", url: "#", cursorText: "Case Study" },
        { id: "p4", category: "E-Commerce", tag: "E-Commerce", title: "Neon Market", desc: "Next.js 14 headless shopify storefront.", url: "#", cursorText: "Shop" },
        { id: "p5", category: "Web App", tag: "Web App", title: "TaskFlow Pro", desc: "Productivity dashboard with real-time sync.", url: "#", cursorText: "App" },
        { id: "p6", category: "Landing", tag: "Landing", title: "Crypto Finance", desc: "High-performance marketing landing page.", url: "#", cursorText: "Preview" },
    ];

    const filterCategories = ["All", "Web App", "Design", "E-Commerce", "Landing", "Other"];
    const ITEMS_PER_PAGE = 2;

    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState("All");
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const filterRef = useRef<HTMLDivElement>(null);

    // Click outside handler for filters
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                setIsFilterOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Filter Logic
    const filteredProjects = useMemo(() => {
        return rawProjects.filter(p => {
            const matchesSearch =
                p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.tag.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesCategory = activeFilter === "All" || p.category === activeFilter;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, activeFilter, rawProjects]);

    // Pagination Logic
    const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
    const displayedProjects = filteredProjects.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    // Reset page on search/filter
    useEffect(() => { setCurrentPage(1); }, [searchQuery, activeFilter]);

    // Validar salto de página manual
    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
            // Opcional: scroll al top de la sección
            const section = document.getElementById("projects");
            if (section) section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleFilterSelect = (category: string) => {
        setActiveFilter(category);
        setIsFilterOpen(false);
    };

    // --- Pagination Controls Component (Adapted from User Request) ---
    const PaginationControls = () => {
        const [showJump, setShowJump] = useState<'left' | 'right' | null>(null);
        const [jumpValue, setJumpValue] = useState("");

        if (totalPages <= 1) return null;

        const handleJumpSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            const page = parseInt(jumpValue);
            if (!isNaN(page) && page >= 1 && page <= totalPages) {
                handlePageChange(page);
                setShowJump(null);
                setJumpValue("");
            }
        };

        const getPageNumbers = () => {
            const items: (number | string)[] = [];
            items.push(1);

            let start = Math.max(2, currentPage - 1);
            let end = Math.min(totalPages - 1, currentPage + 1);

            if (currentPage <= 3) end = Math.min(totalPages - 1, 4);
            if (currentPage >= totalPages - 2) start = Math.max(2, totalPages - 3);

            if (start > 2) items.push('dots-left');
            for (let i = start; i <= end; i++) {
                if (i > 1 && i < totalPages) items.push(i);
            }
            if (end < totalPages - 1) items.push('dots-right');
            if (totalPages > 1) items.push(totalPages);

            return items;
        };

        return (
            <div className="flex items-center justify-center gap-2 py-2 select-none">
                <button
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="w-10 h-10 flex items-center justify-center rounded-xl border border-brand-primary/20 bg-surface-100 hover:bg-brand-primary/10 text-foreground/50 hover:text-brand-primary disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-foreground/50 transition-all"
                >
                    <ChevronLeft size={18} />
                </button>

                {getPageNumbers().map((p, i) => {
                    if (typeof p === 'number') {
                        return (
                            <button
                                key={i}
                                onClick={() => handlePageChange(p)}
                                className={cn(
                                    "w-10 h-10 flex items-center justify-center rounded-xl border text-xs font-bold transition-all",
                                    currentPage === p
                                        ? "bg-brand-primary text-white border-brand-primary shadow-lg shadow-brand-primary/25"
                                        : "border-brand-primary/10 bg-surface-100 text-foreground/50 hover:text-brand-primary hover:border-brand-primary/30"
                                )}
                            >
                                {p}
                            </button>
                        );
                    }

                    const isLeft = p === 'dots-left';
                    return (
                        <div key={i} className="relative">
                            <button
                                onClick={() => setShowJump(isLeft ? 'left' : 'right')}
                                className="w-10 h-10 flex items-center justify-center text-foreground/40 hover:text-brand-primary transition-colors"
                            >
                                <MoreHorizontal size={20} />
                            </button>

                            <AnimatePresence>
                                {showJump === (isLeft ? 'left' : 'right') && (
                                    <>
                                        <div className="fixed inset-0 z-40" onClick={() => setShowJump(null)} />
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 z-50 p-4 border border-brand-primary/20 bg-surface-100/90 backdrop-blur-xl rounded-2xl shadow-2xl min-w-[140px]"
                                        >
                                            <form onSubmit={handleJumpSubmit} className="flex flex-col gap-3">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-[10px] font-bold uppercase text-foreground/50 tracking-widest">Jump to</span>
                                                    <X size={12} className="text-foreground/50 cursor-pointer hover:text-brand-primary" onClick={() => setShowJump(null)} />
                                                </div>
                                                <div className="flex gap-2">
                                                    <input
                                                        autoFocus type="number" value={jumpValue}
                                                        onChange={(e) => setJumpValue(e.target.value)}
                                                        placeholder="#"
                                                        className="w-full bg-surface-200 border border-brand-primary/10 rounded-lg px-2 py-1.5 text-xs font-bold text-foreground outline-none focus:border-brand-primary/50"
                                                    />
                                                    <button type="submit" className="bg-brand-primary text-white p-1.5 rounded-lg hover:bg-brand-deep transition-colors">
                                                        <ArrowRight size={14} />
                                                    </button>
                                                </div>
                                            </form>
                                        </motion.div>
                                    </>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}

                <button
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="w-10 h-10 flex items-center justify-center rounded-xl border border-brand-primary/20 bg-surface-100 hover:bg-brand-primary/10 text-foreground/50 hover:text-brand-primary disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-foreground/50 transition-all"
                >
                    <ChevronRight size={18} />
                </button>
            </div>
        );
    };

    return (
        <section id="projects" className="px-6 md:px-12 py-24 mx-auto max-w-7xl">

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-8">
                <div className="flex flex-col gap-4">
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
                        {t("title")}<span className="text-brand-primary">.</span>
                    </h2>
                    <p className="text-foreground/60 max-w-md">
                        {t("subtitle")}
                    </p>
                </div>

                <div className="flex flex-col gap-4 w-full md:w-auto z-20">
                    <div className="flex items-center gap-2 self-start md:self-end text-sm font-mono text-foreground/50">
                        <span>PAGE {displayedProjects.length > 0 ? currentPage : 0} / {totalPages == 0 ? 0 : totalPages}</span>
                    </div>

                    <div className="flex gap-2 relative">
                        {/* Search Input */}
                        <div className="relative group w-full md:w-[280px]">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-brand-soft">
                                <Search className="h-5 w-5" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search projects..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 pr-4 py-3 w-full bg-surface-100 border border-brand-soft/20 rounded-xl focus:outline-none focus:border-brand-primary/50 transition-colors no-cursor-hover cursor-none"
                            />
                        </div>

                        {/* Filter Dropdown */}
                        <div className="relative" ref={filterRef}>
                            <button
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                                className={cn(
                                    "p-3 rounded-xl border transition-all flex items-center gap-2 no-cursor-hover",
                                    isFilterOpen || activeFilter !== "All"
                                        ? "bg-brand-primary text-white border-brand-primary"
                                        : "bg-surface-100 border-brand-soft/20 text-brand-soft hover:bg-surface-200"
                                )}
                            >
                                <Filter className="h-5 w-5" />
                                {activeFilter !== "All" && <span className="text-sm font-bold hidden md:inline">{activeFilter}</span>}
                            </button>

                            <AnimatePresence>
                                {isFilterOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute right-0 mt-2 w-48 bg-surface-100 border border-brand-soft/10 rounded-xl shadow-xl overflow-hidden z-[50] no-cursor-hover"
                                    >
                                        <div className="py-1">
                                            {filterCategories.map((category) => (
                                                <button
                                                    key={category}
                                                    onClick={() => handleFilterSelect(category)}
                                                    className={cn(
                                                        "w-full text-left px-4 py-2.5 text-sm flex items-center justify-between transition-colors",
                                                        activeFilter === category
                                                            ? "bg-brand-primary/10 text-brand-primary font-medium"
                                                            : "text-foreground/70 hover:bg-surface-200"
                                                    )}
                                                >
                                                    {category}
                                                    {activeFilter === category && <Check className="w-4 h-4" />}
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Pagination Logic Replaced with Advanced Controls */}
            {totalPages > 1 && (
                <div className="flex justify-start mb-8 no-cursor-hover">
                    <PaginationControls />
                </div>
            )}

            {/* Grid */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentPage + searchQuery + activeFilter}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12"
                >
                    {displayedProjects.length > 0 ? (
                        displayedProjects.map((project, index) => (
                            <Link href={project.url} key={project.id} className="block h-full">
                                <ProjectCard
                                    index={index}
                                    title={project.title}
                                    description={project.desc}
                                    tag={project.tag}
                                    cursorText={project.cursorText}
                                />
                            </Link>
                        ))
                    ) : (
                        <div className="col-span-2 text-center py-24 flex flex-col items-center justify-center border border-dashed border-brand-soft/20 rounded-3xl">
                            <span className="text-4xl mb-4"><Search size={40} /></span>
                            <h3 className="text-xl font-bold text-foreground">No projects found</h3>
                            <button
                                onClick={() => { setSearchQuery(""); setActiveFilter("All"); }}
                                className="mt-6 px-6 py-2 text-sm font-medium text-brand-primary bg-brand-primary/10 rounded-full hover:bg-brand-primary hover:text-white transition-colors no-cursor-hover"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Bottom Pagination Logic Replaced with Advanced Controls */}
            {totalPages > 1 && (
                <div className="mt-10 border-t border-brand-primary/5 pt-5 no-cursor-hover">
                    <PaginationControls />
                </div>
            )}
        </section>
    );
}