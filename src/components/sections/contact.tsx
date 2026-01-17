"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { contactSchema, ContactFormData } from "@/utils/validators/contact";
import { Send, Mail, MapPin, Github, Linkedin } from "lucide-react";

export function Contact() {
    const t = useTranslations("Contact");
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: ContactFormData) => {
        // Simulación de envío
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log(data);
        alert(t("form.success"));
        reset();
    };

    return (
        <section id="contact" className="px-6 md:px-12 py-24 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                {/* Información de contacto */}
                <div className="flex flex-col justify-between py-4">
                    <div>
                        <h2 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8">
                            {t("title")}<span className="text-brand-primary">.</span>
                        </h2>
                        <p className="text-xl text-foreground/60 max-w-sm mb-12">
                            {t("subtitle")}
                        </p>
                    </div>

                    <div className="space-y-8">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                                <Mail size={20} />
                            </div>
                            <div>
                                <p className="text-xs font-mono uppercase text-brand-soft/60">{t("info.email")}</p>
                                <p className="text-lg font-medium">rayelus@proton.me</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                                <MapPin size={20} />
                            </div>
                            <div>
                                <p className="text-xs font-mono uppercase text-brand-soft/60">{t("info.location")}</p>
                                <p className="text-lg font-medium">Sevilla, España</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Formulario */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="bg-surface-100 p-8 md:p-12 rounded-[2.5rem] border border-brand-soft/10 shadow-2xl"
                >
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-mono uppercase text-brand-soft/60 ml-2">{t("form.name")}</label>
                            <input
                                {...register("name")}
                                className="w-full bg-background border border-brand-soft/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-primary transition-colors no-cursor-hover cursor-none"
                                placeholder="Raimundo Palma"
                            />
                            {errors.name && <p className="text-red-400 text-xs ml-2">{errors.name.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-mono uppercase text-brand-soft/60 ml-2">{t("form.email")}</label>
                            <input
                                {...register("email")}
                                className="w-full bg-background border border-brand-soft/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-primary transition-colors no-cursor-hover cursor-none"
                                placeholder="email@ejemplo.com"
                            />
                            {errors.email && <p className="text-red-400 text-xs ml-2">{errors.email.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-mono uppercase text-brand-soft/60 ml-2">{t("form.message")}</label>
                            <textarea
                                {...register("message")}
                                rows={4}
                                className="w-full bg-background border border-brand-soft/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-primary transition-colors resize-none no-cursor-hover cursor-none"
                                placeholder="..."
                            />
                            {errors.message && <p className="text-red-400 text-xs ml-2">{errors.message.message}</p>}
                        </div>

                        <button
                            disabled={isSubmitting}
                            className="group w-full bg-brand-primary text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-brand-deep transition-all active:scale-[0.98]"
                        >
                            {isSubmitting ? t("form.sending") : t("form.send")}
                            <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}