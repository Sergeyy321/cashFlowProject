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
    <header className="sticky top-0 z-40 bg-zinc-950/85 backdrop-blur-md border-b border-zinc-800/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-3 sm:gap-6">
        
        {/* Brand Segment Switcher */}
        <div className="inline-flex items-center p-1 rounded-xl bg-zinc-900 border border-zinc-800/80 shrink-0">
          <button 
            type="button"
            onClick={() => setActivePage('cashflow')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
              activePage === 'cashflow'
                ? 'bg-zinc-800 text-white shadow-sm border border-zinc-700/70'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <CashIcon />
            <span className="truncate">
              Cashflow<span className="hidden xs:inline text-lime-400 font-bold"> Club</span>
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActivePage('woodiq')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
              activePage === 'woodiq'
                ? 'bg-zinc-800 text-white shadow-sm border border-zinc-700/70'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <span className="flex items-center justify-center w-4 h-4 shrink-0">
              <img
                src={woodiqLogo}
                alt="WOODIQ"
                className="w-full h-full object-contain"
              />
            </span>
            <span className="truncate">
              Wood<span className="text-amber-400 font-bold">IQ</span>
            </span>
          </button>
        </div>

        {/* Desktop Section Anchors */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-zinc-400">
          {activePage === 'cashflow' ? (
            <>
              <a href="#schedule" className="hover:text-white transition-colors">{t.header.schedule}</a>
              <a href="#about" className="hover:text-white transition-colors">{t.header.about}</a>
              <a href="#process" className="hover:text-white transition-colors">{t.header.process}</a>
              <a href="#quiz" className="hover:text-white transition-colors">{t.header.quiz}</a>
            </>
          ) : (
            <>
              <a href="#wood-catalog" className="hover:text-white transition-colors">{t.header.woodCatalog}</a>
              <a href="#wood-pricing" className="hover:text-white transition-colors">{t.header.woodPricing}</a>
              <a href="#wood-rental" className="hover:text-white transition-colors">{t.header.woodRental}</a>
            </>
          )}
          <a
            href="#faq"
            className="hover:text-white transition-colors"
          >
            {t.header.faq}
          </a>
        </nav>

        {/* Right actions: Cart + Language Switcher + CTA */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">

          {/* Cart Button (for WoodIQ) */}
          {activePage === 'woodiq' && (
            <button
              type="button"
              onClick={() => onOpenCart ? onOpenCart() : onOpenModal('rental')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                cartCount > 0
                  ? 'bg-amber-400/10 border-amber-400/40 text-amber-300'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
              }`}
              title={t.cart.title}
            >
              <Cart className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="hidden md:inline text-xs font-semibold">
                {t.cart.title}
              </span>
              {cartCount > 0 && (
                <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-amber-400 text-zinc-950 font-bold text-[11px]">
                  {cartCount}
                </span>
              )}
            </button>
          )}

          {/* Language Switcher */}
          <div className="flex items-center p-0.5 rounded-lg bg-zinc-900 border border-zinc-800/80">
            {languages.map((l) => (
              <button
                key={l.code}
                type="button"
                onClick={() => setLang(l.code)}
                className={`px-2 sm:px-2.5 py-1 rounded-md text-[11px] sm:text-xs font-semibold tracking-wider transition-colors cursor-pointer ${
                  lang === l.code
                    ? 'bg-zinc-800 text-white shadow-xs'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
                title={l.name}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Action CTA Button on Desktop */}
          <button
            type="button"
            onClick={onOpenModal}
            className={`hidden md:inline-flex items-center justify-center px-4 sm:px-5 py-2 rounded-lg font-bold text-xs sm:text-sm tracking-tight text-zinc-950 transition-colors cursor-pointer shadow-sm ${
              activePage === 'cashflow'
                ? 'bg-lime-400 hover:bg-lime-300'
                : 'bg-amber-400 hover:bg-amber-300'
            }`}
          >
            {activePage === 'cashflow' ? t.header.bookSpot : t.header.orderGames}
          </button>
        </div>
      </div>
    </header>
  );
};
