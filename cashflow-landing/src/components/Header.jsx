import React from 'react';
import woodiqLogo from '../img/WOOD IQ-01.svg';
import { useLanguage } from '../i18n/LanguageContext';
import { useCart } from '../context/CartContext';

const CashIcon = () => (
  <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-lime-400 shrink-0 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const Header = ({ activePage, setActivePage, onOpenModal, onOpenCart }) => {
  const { lang, setLang, t, languages } = useLanguage();
  const { cartCount } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-900/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 md:px-8 py-2.5 sm:py-3.5 md:py-4 flex items-center justify-between gap-2 sm:gap-4 md:gap-6">
        
        {/* Brand Switcher Navigation */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 md:gap-3 shrink-0">
          <button 
            onClick={() => setActivePage('cashflow')}
            className={`group flex items-center gap-2 px-2.5 sm:px-3.5 md:px-4 py-1.5 sm:py-2 md:py-2.5 rounded-xl md:rounded-2xl transition-all duration-300 font-bold text-xs sm:text-sm md:text-base cursor-pointer ${
              activePage === 'cashflow'
                ? 'bg-gradient-to-r from-emerald-500/20 to-lime-500/20 border border-lime-400/50 text-white shadow-[0_0_20px_rgba(163,230,53,0.2)]'
                : 'text-zinc-400 hover:text-white bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700'
            }`}
          >
            <CashIcon />
            <span className="truncate">
              Cashflow<span className="hidden xs:inline text-lime-400 font-black"> Club</span>
            </span>
          </button>

          <button
            onClick={() => setActivePage('woodiq')}
            className={`group flex items-center gap-2 px-2.5 sm:px-3.5 md:px-4 py-1.5 sm:py-2 md:py-2.5 rounded-xl md:rounded-2xl transition-all duration-300 font-bold text-xs sm:text-sm md:text-base cursor-pointer ${
              activePage === 'woodiq'
                ? 'bg-amber-500/20 border border-amber-400/50 text-white shadow-[0_0_20px_rgba(251,191,36,0.2)]'
                : 'text-zinc-400 hover:text-white bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700'
            }`}
          >
            <span className="flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 shrink-0 transition-transform group-hover:scale-110">
              <img
                src={woodiqLogo}
                alt="WOODIQ"
                className="w-full h-full object-contain"
              />
            </span>
            <span className="truncate">
              Wood<span className="text-amber-400 font-black">IQ</span>
            </span>
          </button>
        </div>

        {/* Desktop Section Anchors */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm md:text-[15px] font-semibold text-zinc-400">
          {activePage === 'cashflow' ? (
            <>
              <a href="#schedule" className="hover:text-lime-400 transition-colors py-1">{t.header.schedule}</a>
              <a href="#about" className="hover:text-lime-400 transition-colors py-1">{t.header.about}</a>
              <a href="#process" className="hover:text-lime-400 transition-colors py-1">{t.header.process}</a>
              <a href="#quiz" className="hover:text-lime-400 transition-colors py-1">{t.header.quiz}</a>
            </>
          ) : (
            <>
              <a href="#wood-catalog" className="hover:text-amber-400 transition-colors py-1">{t.header.woodCatalog}</a>
              <a href="#wood-pricing" className="hover:text-amber-400 transition-colors py-1">{t.header.woodPricing}</a>
              <a href="#wood-rental" className="hover:text-amber-400 transition-colors py-1">{t.header.woodRental}</a>
            </>
          )}
          <a
            href="#faq"
            className={`${
              activePage === 'woodiq' ? 'hover:text-amber-400' : 'hover:text-lime-400'
            } transition-colors py-1`}
          >
            {t.header.faq}
          </a>
        </nav>

        {/* Right actions: Cart + Language Switcher + CTA */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 shrink-0">
          {/* Cart Button (for WoodIQ) */}
          {activePage === 'woodiq' && (
            <button
              type="button"
              onClick={() => onOpenCart ? onOpenCart() : onOpenModal('rental')}
              className={`relative flex items-center gap-2 px-2.5 sm:px-3.5 md:px-4 py-1.5 sm:py-2 md:py-2.5 rounded-xl md:rounded-2xl border transition-all duration-300 shadow-inner group cursor-pointer ${
                cartCount > 0
                  ? 'bg-amber-400/20 border-amber-400/70 text-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.15)]'
                  : 'bg-zinc-900/80 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
              }`}
              title={t.cart.title}
            >
              <span className="text-sm sm:text-base md:text-lg group-hover:scale-110 transition-transform">
                🛒
              </span>
              <span className="hidden md:inline text-xs md:text-sm font-bold text-zinc-300 group-hover:text-amber-400 transition-colors">
                {t.cart.title}
              </span>
              {cartCount > 0 && (
                <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-amber-400 text-zinc-950 font-black text-[11px] md:text-xs animate-pulse shadow-md">
                  {cartCount}
                </span>
              )}
            </button>
          )}

          {/* Compact Language Switcher */}
          <div className="flex items-center rounded-xl md:rounded-2xl bg-zinc-900/90 border border-zinc-800/90 p-1 shadow-inner">
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`px-2 sm:px-2.5 md:px-3 py-1 md:py-1.5 rounded-lg md:rounded-xl text-[10px] sm:text-xs md:text-sm font-extrabold tracking-wider transition-all duration-200 cursor-pointer ${
                  lang === l.code
                    ? activePage === 'woodiq'
                      ? 'bg-amber-400 text-zinc-950 shadow-md scale-105'
                      : 'bg-lime-400 text-zinc-950 shadow-md scale-105'
                    : 'text-zinc-400 hover:text-white'
                }`}
                title={l.name}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Action CTA Button on Desktop */}
          <button
            onClick={onOpenModal}
            className={`hidden md:block px-5 lg:px-6 py-2.5 lg:py-3 font-black rounded-xl md:rounded-2xl transition-all duration-300 text-sm md:text-[15px] cursor-pointer hover:scale-105 active:scale-95 shadow-md ${
              activePage === 'cashflow'
                ? 'bg-lime-400 text-zinc-950 hover:bg-lime-300 shadow-[0_0_25px_rgba(163,230,53,0.3)]'
                : 'bg-amber-400 text-zinc-950 hover:bg-amber-300 shadow-[0_0_25px_rgba(251,191,36,0.3)]'
            }`}
          >
            {activePage === 'cashflow' ? t.header.bookSpot : t.header.orderGames}
          </button>
        </div>
      </div>
    </header>
  );
};
