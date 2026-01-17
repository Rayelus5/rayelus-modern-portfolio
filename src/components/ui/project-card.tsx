"use client";

import { CardBody, CardContainer, CardItem } from "./3d-card";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

interface ProjectCardProps {
    title: string;
    description: string;
    tag: string;
    index: number;
    cursorText: string;
    image?: string;
}

export function ProjectCard({ title, description, tag, index, cursorText, image = "/images/placeholder-project.jpg" }: ProjectCardProps) {
    return (
        <CardContainer className="inter-var w-full h-full" containerClassName="py-2">
            <CardBody className="bg-surface-200/50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-brand-primary/[0.1] border-black/[0.1] w-full h-auto rounded-3xl p-6 border border-brand-primary/10 backdrop-blur-sm">

                {/* Image Section */}
                <CardItem
                    translateZ="50"
                    className="w-full mt-0"
                >
                    <div
                        className="w-full aspect-[16/10] relative rounded-xl overflow-hidden group-hover/card:shadow-xl bg-surface-300 cursor-none"
                        data-cursor={cursorText}
                    >
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover/card:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />

                        {/* Hover Icon */}
                        <div className="absolute bottom-4 right-4 translate-y-4 opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all duration-300 z-10">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-primary text-white shadow-xl">
                                <ArrowUpRight className="h-5 w-5" />
                            </div>
                        </div>
                    </div>
                </CardItem>

                {/* Content Section */}
                <div className="mt-6 flex flex-col gap-2">
                    <CardItem
                        translateZ="60"
                        className="flex items-center justify-between w-full"
                    >
                        <span className="px-3 py-1 text-[10px] font-mono border border-brand-primary/30 bg-brand-primary/5 text-brand-primary rounded-md uppercase tracking-wide">
                            {tag}
                        </span>
                    </CardItem>

                    <CardItem
                        as="h3"
                        translateZ="70"
                        className="text-xl md:text-2xl font-bold text-foreground mt-2 group-hover/card:text-brand-primary transition-colors"
                    >
                        {title}
                    </CardItem>

                    <CardItem
                        as="p"
                        translateZ="60"
                        className="text-sm text-foreground/60 max-w-sm mt-2 leading-relaxed"
                    >
                        {description}
                    </CardItem>
                </div>
            </CardBody>
        </CardContainer>
    );
}