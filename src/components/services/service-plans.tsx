"use client";

import { Check, X, Sparkles } from "lucide-react";
import { ServicePlan } from "@/data/services";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ServicePlansProps {
    plans: ServicePlan[];
    serviceName: string;
}

export function ServicePlans({ plans, serviceName }: ServicePlansProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {plans.map((plan, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={cn(
                        "flex flex-col p-6 rounded-2xl border-2 backdrop-blur-sm transition-all relative overflow-hidden",
                        plan.isPopular
                            ? "bg-brand-primary/5 border-brand-primary/30 shadow-xl shadow-brand-primary/5"
                            : "bg-surface-100/50 border-brand-soft/10 hover:border-brand-primary/20"
                    )}
                >
                    {plan.isPopular && (
                        <div className="absolute top-0 right-0 bg-brand-primary text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                            Popular
                        </div>
                    )}

                    <div className="mb-4">
                        <h4 className="text-lg font-bold text-foreground">{plan.name}</h4>
                        <div className="text-2xl font-bold text-brand-primary mt-1">{plan.price}</div>
                        <p className="text-xs text-foreground/50 mt-2 leading-relaxed min-h-[40px]">
                            {plan.description}
                        </p>
                    </div>

                    <div className="flex-1 space-y-3 mb-6">
                        {plan.features.map((feature, i) => (
                            <div key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                                <Check size={14} className="mt-1 text-brand-primary shrink-0" />
                                <span className="text-xs">{feature}</span>
                            </div>
                        ))}
                        {plan.notIncluded?.map((feature, i) => (
                            <div key={i} className="flex items-start gap-2 text-sm text-foreground/40 line-through decoration-foreground/20">
                                <X size={14} className="mt-1 outline-foreground/20 shrink-0" />
                                <span className="text-xs">{feature}</span>
                            </div>
                        ))}
                    </div>

                    <a
                        href={`/#contact`}
                        className={cn(
                            "w-full py-2.5 rounded-xl font-bold uppercase tracking-wider text-center transition-all flex items-center justify-center gap-2",
                            plan.isPopular
                                ? "bg-brand-primary text-white text-lg hover:bg-brand-deep shadow-lg shadow-brand-primary/20"
                                : "bg-surface-200 text-foreground/70 hover:bg-brand-primary hover:text-white text-sm "
                        )}
                    >
                        {plan.isPopular && <Sparkles size={20} />}
                        Solicitar
                    </a>
                </motion.div>
            ))}
        </div>
    );
}
