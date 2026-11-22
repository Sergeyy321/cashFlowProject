import React from 'react';
import woodiqLogo from '../img/WOOD IQ-01.svg';
import { useLanguage } from '../i18n/LanguageContext';

export const ProductSwitcher = ({ activePage, setActivePage }) => {
  const isCashflow = activePage === 'cashflow';
  const { t } = useLanguage();
  const sw = t.switcher;

  return (
    <button
      onClick={() => setActivePage(isCashflow ? 'woodiq' : 'cashflow')}
      className={`fixed bottom-5 right-5 z-50 group flex items-center gap-3 rounded-2xl border p-2 sm:px-3.5 sm:py-2.5 backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 shadow-xl cursor-pointer ${
        isCashflow
          ? 'bg-zinc-900/95 border-zinc-800 hover:border-amber-400/40 shadow-black/40'
          : 'bg-zinc-900/95 border-zinc-800 hover:border-lime-400/40 shadow-black/40'
      }`}
      aria-label={isCashflow ? 'WOODIQ' : 'CASHFLOW CLUB'}
    >
      {/* Icon Emblem */}
      <div
        className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all shrink-0 ${
          isCashflow
            ? 'bg-amber-400/10 text-amber-400 border border-amber-400/20'
            : 'bg-lime-400/10 text-lime-400 border border-lime-400/20'
        }`}
      >
        {isCashflow ? (
          <div className="w-6 h-6 overflow-hidden flex items-center justify-center">
            <img
              src={woodiqLogo}
              alt="WOODIQ"
              className="w-full h-full object-contain"
            />
          </div>
        ) : (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )}
      </div>

      {/* Label and Subtext */}
      <div className="text-left pr-1 hidden xs:block sm:block">
        <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-zinc-500 font-semibold mb-0.5">
          {isCashflow ? sw.anotherProduct : sw.weAlsoHave}
        </div>

        <div
          className={`text-xs sm:text-sm font-bold ${
            isCashflow ? 'text-amber-400' : 'text-lime-400'
          }`}
        >
          {isCashflow ? sw.woodiqTitle : sw.cashflowTitle}
        </div>

        <div className="text-[11px] text-zinc-400 max-w-[140px] leading-tight hidden sm:block">
          {isCashflow ? sw.woodiqDesc : sw.cashflowDesc}
        </div>
      </div>

      {/* Arrow Indicator */}
      <svg
        className={`w-4 h-4 text-zinc-500 transition-transform duration-200 group-hover:translate-x-0.5 ${
          isCashflow ? 'group-hover:text-amber-400' : 'group-hover:text-lime-400'
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>
  );
};