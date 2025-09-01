'use client';

import { InlineWidget } from "react-calendly";
import Header from "@/components/Header";
import { useEffect, useState } from "react";

export default function SchedulePage() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined" || !window.matchMedia) return;
        const media = window.matchMedia("(prefers-color-scheme: dark)");
        const applyDarkPreference = () => setIsDarkMode(media.matches);
        applyDarkPreference();
        if (media.addEventListener) {
            media.addEventListener("change", applyDarkPreference);
        } else {
            media.addListener(applyDarkPreference);
        }
        return () => {
            if (media.removeEventListener) {
                media.removeEventListener("change", applyDarkPreference);
            } else {
                media.removeListener(applyDarkPreference);
            }
        };
    }, []);

    const pageSettings = isDarkMode
        ? { backgroundColor: "0a0a0a", textColor: "ededed" }
        : { backgroundColor: "ffffff", textColor: "171717" };

    return (
        <div className="App">
            <Header />
            <InlineWidget url="https://calendly.com/tripledev" pageSettings={pageSettings} />
        </div>
    );
}