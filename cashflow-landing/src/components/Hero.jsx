import React from 'react';
import heroVideo from '../videos/a.MOV';
import bgPoster from '../img/photo_2026-01-16_14-33-51.jpg';
import { useLanguage } from '../i18n/LanguageContext';

export function Hero({ onOpenModal }) {
  const { t } = useLanguage();
  const h = t.heroCashflow;

  return (
    <section className="relative pt-16 pb-20 md:py-32 px-6 overflow-hidden">
      {/* Фоновое видео */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster={bgPoster}
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
      >
        <source src={heroVideo} type="video/mp4" />
        <source src={heroVideo} type="video/quicktime" />
      </video>
      <div className="absolute inset-0 bg-zinc-950/80 pointer-events-none" />

      {/* Мягкое неоновое свечение на фоне */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-lime-500/10 blur-[120px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-zinc-900 border border-emerald-900/50 px-4 py-2 rounded-full text-xs font-semibold text-lime-400 mb-4 shadow-inner">
          <span className="w-2 h-2 rounded-full bg-lime-400 animate-ping" />
          {h.badge}
        </div>

        {/* Соцмережі Cashflow */}
        <div className="mb-6 sm:mb-8 flex items-center justify-center gap-3">
          <a
            href="https://t.me/CashFlow_Katowice"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Telegram"
            title="Telegram"
            className="group inline-flex items-center gap-2 rounded-full border border-lime-400/30 bg-black/40 px-4 py-2 text-xs sm:text-sm font-bold text-zinc-300 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-lime-400 hover:text-lime-300 hover:bg-black/60 cursor-pointer"
          >
            <svg className="w-4 h-4 fill-current text-sky-400 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
            </svg>
            <span>Telegram</span>
          </a>

          <a
            href="https://www.instagram.com/cashflowkatowice/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            title="Instagram"
            className="group inline-flex items-center gap-2 rounded-full border border-lime-400/30 bg-black/40 px-4 py-2 text-xs sm:text-sm font-bold text-zinc-300 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-lime-400 hover:text-lime-300 hover:bg-black/60 cursor-pointer"
          >
            <svg className="w-4 h-4 fill-current text-pink-400 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
          <span>Instagram</span>
        </a>
      </div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.15]">
          {h.title1}
          <span className="bg-gradient-to-r from-lime-400 to-emerald-400 bg-clip-text text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
            {h.titleHighlight}
          </span>
          {h.title2}
        </h1>
        
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed text-center">
          {h.desc}
        </p>
        
        {/* Кнопка записи отображается только на мобильных устройствах */}
        <div className="flex sm:hidden flex-col items-center justify-center">
          <button 
            onClick={onOpenModal}
            className="w-full px-8 py-4 bg-gradient-to-r from-lime-400 to-emerald-400 text-zinc-950 font-bold rounded-xl hover:opacity-90 transition-all duration-300 shadow-[0_0_30px_rgba(163,230,53,0.25)] text-base"
          >
            {h.cta}
          </button>
        </div>
      </div>
    </section>
  );
}
