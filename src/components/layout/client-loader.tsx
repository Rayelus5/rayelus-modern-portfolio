"use client";

import { Preloader } from "../ui/preloader";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function ClientLoader({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isHome, setIsHome] = useState(false);

    useEffect(() => {
        // Solo mostrar preloader en la home
        setIsHome(pathname === "/" || pathname === "/en" || pathname === "/es");
    }, [pathname]);

    return (
        <>
            {isHome && <Preloader />}
            {children}
        </>
    );
}
