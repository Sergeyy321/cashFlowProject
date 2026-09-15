import React from 'react';
import woodiqLogo from '../img/WOOD IQ-01.svg';
import { useLanguage } from '../i18n/LanguageContext';
import { useCart } from '../context/CartContext';
import { Cart } from 'iconoir-react';

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

        {/* Right actions: Socials + Cart + Language Switcher + CTA */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 md:gap-3 shrink-0">
          {/* Social Media Links (Only for Cashflow page; for WoodIQ they are relocated to HeroWoodIQ) */}
          {activePage === 'cashflow' && (
            <div className="flex items-center gap-1 sm:gap-1.5">
              <a
                href="https://t.me/CashFlow_Katowice"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                title="Telegram"
                className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-lg sm:rounded-xl md:rounded-2xl bg-zinc-900/90 border border-zinc-800/90 text-zinc-400 transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 shadow-inner hover:border-lime-400/60 hover:text-lime-300"
              >
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-4.5 md:h-4.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                </svg>
              </a>

              <a
                href="https://www.instagram.com/cashflowkatowice/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                title="Instagram"
                className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-lg sm:rounded-xl md:rounded-2xl bg-zinc-900/90 border border-zinc-800/90 text-zinc-400 transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 shadow-inner hover:border-lime-400/60 hover:text-lime-300"
              >
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-4.5 md:h-4.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          )}

          {/* Cart Button (for WoodIQ) */}
          {activePage === 'woodiq' && (
            <button
              type="button"
              onClick={() => onOpenCart ? onOpenCart() : onOpenModal('rental')}
              className={`relative flex items-center gap-2 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 rounded-lg sm:rounded-xl md:rounded-2xl border transition-all duration-300 shadow-inner group cursor-pointer ${
                cartCount > 0
                  ? 'bg-amber-400/20 border-amber-400/70 text-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.15)]'
                  : 'bg-zinc-900/80 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
              }`}
              title={t.cart.title}
            >
              <Cart className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-amber-400 group-hover:scale-110 transition-transform shrink-0" />
              <span className="hidden md:inline text-xs md:text-sm font-bold text-zinc-300 group-hover:text-amber-400 transition-colors">
                {t.cart.title}
              </span>
              {cartCount > 0 && (
                <span className="flex items-center justify-center min-w-[18px] sm:min-w-[20px] h-4.5 sm:h-5 px-1 sm:px-1.5 rounded-full bg-amber-400 text-zinc-950 font-black text-[10px] sm:text-[11px] md:text-xs animate-pulse shadow-md">
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
