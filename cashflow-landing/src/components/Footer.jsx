import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';

export function Footer({ activePage }) {
  const { t } = useLanguage();
  const ft = t.footer;

  return (
    <footer className="mt-auto py-12 px-6 bg-zinc-955 border-t border-zinc-900/60 text-center text-sm text-zinc-500">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {activePage === 'cashflow' ? (
          <>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-lime-400 flex items-center justify-center text-zinc-950 font-black text-sm">
                $
              </div>
              <span className="font-bold text-base tracking-tight text-white">CASHFLOW CLUB POLAND</span>
            </div>

            <p className="text-xs text-zinc-600">
              {ft.cashflowRights}
            </p>
          </>
        ) : (
          <>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base tracking-tight text-white">WOOD<span className="text-amber-400">IQ</span></span>
            </div>

            <p className="text-xs text-zinc-600">
              {ft.woodiqRights}
            </p>
          </>
        )}
      </div>
    </footer>
  );
}
