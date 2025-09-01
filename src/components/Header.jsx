import Link from "next/link";

export default function Header () {
    return (
        <div className="relative z-10 flex-col items-center justify-center pt-3 px-6 sm:px-10 w-full bg-black/25">
            <header className="relative z-10 w-full max-w-6xl flex items-center justify-between py-6 self-center m-auto">
                <Link href="/" className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-md bg-gradient-to-br from-indigo-500 via-cyan-400 to-emerald-400 shadow-lg shadow-cyan-500/30" />
                    <span className="text-lg font-semibold tracking-tight">TripleDev.co</span>
                </Link>
                <nav className="hidden sm:flex items-center gap-6 text-sm text-white/80">
                    <Link href="#work" className="hover:text-white transition-colors">Work</Link>
                    <Link href="#services" className="hover:text-white transition-colors">Services</Link>
                    <Link href="#contact" className="hover:text-white transition-colors">Contact</Link>
                </nav>
            </header>
        </div>
    )
}