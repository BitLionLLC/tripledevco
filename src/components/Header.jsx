"use client"

import Link from "next/link";
import { useState } from "react";

export default function Header () {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative z-10 flex-col items-center justify-center pt-3 px-6 sm:px-10 w-full bg-black/30">
            <header className="relative z-10 w-full max-w-6xl flex items-center justify-between py-6 self-center m-auto">
                <Link href="/" className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-md bg-gradient-to-br from-indigo-500 via-cyan-400 to-emerald-400 shadow-lg shadow-cyan-500/30" />
                    <span className="text-lg font-semibold tracking-tight">TripleDev.co</span>
                </Link>
                <nav className="hidden sm:flex items-center gap-6 sm:gap-8 text-sm text-white/80 min-w-12 sm:justify-between">
                    <Link href="/work" className="hover:text-white transition-colors">Work</Link>
                    <Link href="/services" className="hover:text-white transition-colors ml-2">Services</Link>
                    <Link href="/schedule" className="hover:text-white transition-colors ml-2">Book a Call</Link>
                    <Link href="/contact" className="hover:text-white transition-colors ml-2">Contact</Link>
                </nav>
                <button
                    type="button"
                    className="sm:hidden inline-flex items-center justify-center rounded-md p-2 text-white/80 hover:text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 transition-colors"
                    aria-controls="mobile-menu"
                    aria-expanded={isOpen}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span className="sr-only">Toggle main menu</span>
                    <svg className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    <svg className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </header>
            <div id="mobile-menu" className={`${isOpen ? 'block' : 'hidden'} sm:hidden w-full`}>
                <nav className="w-full max-w-6xl m-auto mt-2 rounded-lg bg-black/70 backdrop-blur border border-white/10 p-4">
                    <div className="flex flex-col gap-1 text-sm text-white/90">
                        <Link href="/work" className="px-2 py-2 rounded hover:bg-white/10 transition-colors" onClick={() => setIsOpen(false)}>Work</Link>
                        <Link href="/services" className="px-2 py-2 rounded hover:bg-white/10 transition-colors" onClick={() => setIsOpen(false)}>Services</Link>
                        <Link href="/schedule" className="px-2 py-2 rounded hover:bg-white/10 transition-colors" onClick={() => setIsOpen(false)}>Book a Call</Link>
                        <Link href="/contact" className="px-2 py-2 rounded hover:bg-white/10 transition-colors" onClick={() => setIsOpen(false)}>Contact</Link>
                    </div>
                </nav>
            </div>
        </div>
    )
}