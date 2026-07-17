import React from "react";
export function Header({ onOpenModal }) {
  return (
    <header className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-md border-b border-emerald-950/30">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-lime-400 flex items-center justify-center text-zinc-950 font-extrabold text-xl shadow-[0_0_15px_rgba(163,230,53,0.3)]">
            $
          </div>
          <span className="font-bold text-xl tracking-tight text-white">
            CASHFLOW <span className="text-lime-400">CLUB</span>
          </span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <a href="#about" className="hover:text-lime-400 transition-colors">Об игре</a>
          <a href="#calculator" className="hover:text-lime-400 transition-colors">Симулятор</a>
          <a href="#quiz" className="hover:text-lime-400 transition-colors">Тест IQ</a>
          <a href="#faq" className="hover:text-lime-400 transition-colors">FAQ</a>
        </nav>
        
        <button 
          onClick={onOpenModal}
          className="px-5 py-2.5 bg-lime-400 text-zinc-950 font-bold rounded-xl hover:bg-lime-300 transition-all duration-300 text-sm shadow-[0_0_20px_rgba(163,230,53,0.15)]"
        >
          Занять стол
        </button>
      </div>
    </header>
  );
}
