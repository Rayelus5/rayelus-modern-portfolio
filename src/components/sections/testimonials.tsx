"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star, Quote, ExternalLink } from "lucide-react";

interface ReviewProps {
    id: number;
    name: string;
    role: string;
    projectUrl?: string;
    avatar: string;
    rating: number; // 0 to 5
    text: string;
}

const reviewsConfig = [
    {
        idKey: "r1",
        projectUrl: "https://www.youtube.com/@ElRinc%C3%B3nCrypto",
        avatar: "/images/testimonials/rinconcrypto.jpg",
        rating: 5,
    },
    {
        idKey: "r2",
        projectUrl: "https://chaotic-loom.com",
        avatar: "/images/testimonials/restonic4.jpg",
        rating: 5,
    },
    {
        idKey: "r3",
        projectUrl: "https://tcgshopfinder.es",
        avatar: "/images/testimonials/david.jpg",
        rating: 5,
    },
    {
        idKey: "r4",
        projectUrl: "https://limitless-decklab.vercel.app",
        avatar: "/images/testimonials/laura.jpg",
        rating: 5,
    }
];

const StarRating = ({ rating }: { rating: number }) => {
    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => {
                const fillAmount = Math.max(0, Math.min(1, rating - star + 1));

                return (
                    <div key={star} className="relative">
                        <Star className="w-4 h-4 text-gray-300 dark:text-gray-300" />
                        <div
                            className="absolute top-0 left-0 overflow-hidden"
                            style={{ width: `${fillAmount * 100}%` }}
                        >
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-600" />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

import { useTranslations } from "next-intl";

// ... (StarRating remains same, no need to touch)

export function Testimonials() {
    const t = useTranslations("Testimonials");

    const reviews: ReviewProps[] = reviewsConfig.map((config, index) => ({
        id: index + 1,
        name: t(`reviews.${config.idKey}.name`),
        role: t(`reviews.${config.idKey}.role`),
        text: t(`reviews.${config.idKey}.text`),
        avatar: config.avatar,
        rating: config.rating,
        projectUrl: config.projectUrl,
    }));

    return (
        <section className="py-20 bg-background relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-primary/5 via-transparent to-transparent pointer-events-none" />

            <div className="container mx-auto px-4 mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                        {t("title")} <span className="text-brand-primary">{t("title_highlight")}</span>
                    </h2>
                    <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
                        {t("subtitle")}
                    </p>
                </motion.div>
            </div>

            {/* Marquee Container */}
            <div className="relative w-full overflow-hidden">
                {/* Gradient masks for smooth fade edges */}
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

                <div className="flex">
                    {/* First Loop */}
                    <MarqueeContent reviews={reviews} />
                    {/* Second Loop for seamless effect */}
                    <MarqueeContent reviews={reviews} />
                </div>
            </div>
        </section>
    );
}

const MarqueeContent = ({ reviews }: { reviews: ReviewProps[] }) => (
    <motion.div
        className="flex gap-6 px-3 flex-shrink-0"
        initial={{ x: 0 }}
        animate={{ x: "-100%" }}
        transition={{
            duration: 40,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
        }}
    >
        {reviews.map((review, idx) => (
            <TestimonialCard key={`${review.id}-${idx}`} review={review} />
        ))}
    </motion.div>
);

const TestimonialCard = ({ review }: { review: ReviewProps }) => {
    return (
        <div className="w-[400px] md:w-[450px] p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-brand-primary/30 transition-colors group relative flex flex-col justify-between">
            {/* Quote Icon */}
            <div className="absolute top-6 right-6 text-brand-primary/20 group-hover:text-brand-primary/40 transition-colors">
                <Quote size={40} />
            </div>

            <div>
                {/* Header: Avatar, Name, Role */}
                <div className="flex items-center gap-4 mb-4">
                    {review.projectUrl && (
                        <a
                            href={review.projectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-brand-primary hover:text-brand-primary/80 transition-colors flex items-center gap-4"
                        >

                            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-brand-primary transition-colors">
                                <Image
                                    src={review.avatar}
                                    alt={review.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg leading-tight text-foreground">{review.name}</h3>
                                <div className="flex items-center gap-2 text-sm text-foreground/60">
                                    <span>{review.role}</span>

                                </div>
                            </div>

                            {review.projectUrl && <ExternalLink size={14} />}
                        </a>
                    )}

                    {!review.projectUrl && (
                        <div className="flex items-center gap-4">
                            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-brand-primary transition-colors">
                                <Image
                                    src={review.avatar}
                                    alt={review.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg leading-tight text-foreground">{review.name}</h3>
                                <div className="flex items-center gap-2 text-sm text-foreground/60">
                                    <span>{review.role}</span>

                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Rating */}
                <div className="mb-4">
                    <StarRating rating={review.rating} />
                </div>

                {/* Text */}
                <p className="text-foreground/60 italic relative z-10 leading-relaxed text-justify">
                    "{review.text}"
                </p>
            </div>

            {/* Glow Effect on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
        </div>
    );
};
