import React, { useState, useEffect } from 'react';



const CashIcon = () => (
  <svg className="w-6 h-6 text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);



export const Header = ({ activePage, setActivePage, onOpenModal }) => {
  return (
    <header className="sticky top-0 z-40 bg-zinc-950/85 backdrop-blur-md border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
        
        {/* Brand Switcher Navigation */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setActivePage('cashflow')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl transition-all duration-300 font-bold text-sm ${
              activePage === 'cashflow'
                ? 'bg-gradient-to-r from-emerald-500/20 to-lime-500/20 border border-lime-400/50 text-white shadow-[0_0_15px_rgba(163,230,53,0.15)]'
                : 'text-zinc-400 hover:text-white bg-zinc-900/50 border border-zinc-800/80'
            }`}
          >
            <CashIcon />
            <span>CASHFLOW <span className="text-lime-400">CLUB</span></span>
          </button>

          <button 
            onClick={() => setActivePage('woodiq')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl transition-all duration-300 font-bold text-sm ${
              activePage === 'woodiq'
                ? 'bg-amber-500/20 border border-amber-400/50 text-white shadow-[0_0_15px_rgba(251,191,36,0.15)]'
                : 'text-zinc-400 hover:text-white bg-zinc-900/50 border border-zinc-800/80'
            }`}
          >
            <WoodIcon />
            <span>WOOD<span className="text-amber-400">IQ</span></span>
          </button>
        </div>

        {/* Section Anchors */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-zinc-400">
          {activePage === 'cashflow' ? (
            <>
              <a href="#schedule" className="hover:text-lime-400 transition-colors">Ближайшая игра</a>
              <a href="#about" className="hover:text-lime-400 transition-colors">О тренинге</a>
              <a href="#process" className="hover:text-lime-400 transition-colors">Процесс</a>
       
              <a href="#quiz" className="hover:text-lime-400 transition-colors">Тест IQ</a>
            </>
          ) : (
            <>
              <a href="#wood-catalog" className="hover:text-amber-400 transition-colors">Каталог игр</a>
                <a href="#wood-pricing" className="hover:text-amber-400 transition-colors">Покупка</a>
                    <a href="#wood-rental" className="hover:text-amber-400 transition-colors">Аренда</a>
            </>
          )}
          <a href="#faq" className="hover:text-lime-400 transition-colors">FAQ</a>
        </nav>

        {/* Action CTA Button */}
        <button 
          onClick={onOpenModal}
          className={`px-5 py-2 font-bold rounded-xl transition-all duration-300 text-sm ${
            activePage === 'cashflow'
              ? 'bg-lime-400 text-zinc-950 hover:bg-lime-300 shadow-[0_0_20px_rgba(163,230,53,0.2)]'
              : 'bg-amber-400 text-zinc-950 hover:bg-amber-300 shadow-[0_0_20px_rgba(251,191,36,0.2)]'
          }`}
        >
          {activePage === 'cashflow' ? 'Занять стол' : 'Заказать игры'}
        </button>
      </div>
    </header>
  );
}
