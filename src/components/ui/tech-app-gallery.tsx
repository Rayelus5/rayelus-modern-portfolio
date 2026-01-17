"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useCallback, useEffect, useState } from "react";
import StackIcon from "tech-stack-icons";

const TECH_STACK = [
    { name: "Next.js", iconName: "nextjs2", color: "bg-[#141414]" },
    { name: "PostgreSQL", iconName: "postgresql", color: "bg-[#141414]" },
    { name: "TypeScript", iconName: "typescript", color: "bg-[#141414]" },
    { name: "Tailwind", iconName: "tailwindcss", color: "bg-[#141414]" },
    { name: "JavaScript", iconName: "js", color: "bg-[#141414]" },
    { name: "React", iconName: "react", color: "bg-[#141414]" },
    { name: "Node.js", iconName: "nodejs", color: "bg-[#141414]" },
    { name: "MySQL", iconName: "mysql", color: "bg-[#141414]" },
    { name: "Git", iconName: "git", color: "bg-[#141414]" },
    { name: "Figma", iconName: "figma", color: "bg-[#141414]" },
    { name: "NPM", iconName: "npm", color: "bg-[#141414]" },
    { name: "Photoshop", iconName: "ps", color: "bg-[#141414]" },
    { name: "CSS3", iconName: "css3", color: "bg-[#141414]" },
    { name: "HTML5", iconName: "html5", color: "bg-[#141414]" },
    { name: "Prisma", iconName: "prisma", color: "bg-[#141414]" }
];

export function TechAppGallery() {
    const ITEM_SIZE = 50;
    const GAP = 90;

    const axialCoords = [
        { q: 0, r: 0 }, // Center
        // Ring 1
        { q: 1, r: 0 }, { q: 0, r: 1 }, { q: -1, r: 1 },
        { q: -1, r: 0 }, { q: 0, r: -1 }, { q: 1, r: -1 },
        // Ring 2
        { q: 2, r: 0 }, { q: 1, r: 1 }, { q: -1, r: 2 },
        { q: -2, r: 1 }, { q: -2, r: 0 }, { q: -1, r: -1 },
        { q: 1, r: -2 }, { q: 2, r: -1 }
    ];

    const items = TECH_STACK.map((tech, i) => {
        const coord = axialCoords[i] || { q: 0, r: 0 };
        const radius = (ITEM_SIZE + GAP) / 1.8;
        const x = radius * (Math.sqrt(3) * coord.q + (Math.sqrt(3) / 2) * coord.r);
        const y = radius * (1.5 * coord.r);

        return { ...tech, x, y };
    });

    const containerRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const smoothX = useSpring(mouseX, { damping: 25, stiffness: 120, mass: 0.5 });
    const smoothY = useSpring(mouseY, { damping: 25, stiffness: 120, mass: 0.5 });

    const MAX_PAN_X = 150;
    const MAX_PAN_Y = 150;

    const x = useTransform(smoothX, [-1, 1], [MAX_PAN_X, -MAX_PAN_X]);
    const y = useTransform(smoothY, [-1, 1], [MAX_PAN_Y, -MAX_PAN_Y]);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const nx = (e.clientX - centerX) / (rect.width / 2);
        const ny = (e.clientY - centerY) / (rect.height / 2);

        mouseX.set(Math.max(-1, Math.min(1, nx)));
        mouseY.set(Math.max(-1, Math.min(1, ny)));
    }, [mouseX, mouseY]);

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    }

    return (
        <div
            ref={containerRef}
            className="relative w-full h-full min-h-[350px] overflow-hidden rounded-3xl bg-[#0a0a0a] group no-cursor-hover border border-brand-primary/20"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(circle at 1.5px 1.5px, rgb(255, 255, 255) 1px, transparent 0)`,
                    backgroundSize: '24px 24px'
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/15 via-transparent to-brand-primary/15 pointer-events-none" />
            <div className="absolute inset-0 pointer-events-none z-10 bg-[radial-gradient(circle_at_center,transparent_5%,#050505_85%)]" />

            <motion.div
                className="absolute left-1/2 top-1/2"
                style={{ x, y }}
            >
                {items.map((item, index) => (
                    <Bubble
                        key={item.name}
                        item={item}
                        parentX={x}
                        parentY={y}
                    />
                ))}
            </motion.div>
        </div>
    );
}

function Bubble({ item, parentX, parentY }: any) {
    const scale = useTransform(
        [parentX, parentY],
        ([latestX, latestY]: any) => {
            const visualX = item.x + (latestX as number);
            const visualY = item.y + (latestY as number);

            const dist = Math.sqrt(visualX * visualX + visualY * visualY);

            const maxDist = 220;
            if (dist > maxDist) return 0.6;

            const ratio = dist / maxDist;
            const curve = Math.cos(ratio * Math.PI / 2);

            return 0.6 + (1.2 * curve);
        }
    );

    const filter = useTransform(
        [parentX, parentY],
        ([latestX, latestY]: any) => {
            const visualX = item.x + (latestX as number);
            const visualY = item.y + (latestY as number);
            const dist = Math.sqrt(visualX * visualX + visualY * visualY);

            const maxDist = 200;
            // Cálculo del blur: 0 en el centro, hasta 3px (o más) en los bordes
            const blurRadius = dist > maxDist ? 5 : (dist / maxDist) * 2;

            return `blur(${blurRadius}px)`;
        }
    );

    return (
        <motion.div
            style={{
                x: item.x,
                y: item.y,
                translateX: "-50%",
                translateY: "-50%",
                scale,
                filter,
                width: 70,
                height: 70,
            }}
            className={`absolute flex flex-col items-center justify-center rounded-full shadow-2xl ${item.color} shadow-black/50 border border-white/10 overflow-hidden`}
        >
            <div className="w-[50%] h-[50%] flex items-center justify-center">
                <StackIcon name={item.iconName} className="w-full h-full" />
            </div>
        </motion.div>
    );
}
