import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';

export function Footer({ activePage }) {
  const { t } = useLanguage();
  const ft = t.footer;

  return (
    <footer className="mt-auto py-10 px-6 bg-zinc-950 border-t border-zinc-800/80 text-sm text-zinc-500">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {activePage === 'cashflow' ? (
          <>
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-lime-400 text-zinc-950 flex items-center justify-center font-bold text-xs">
                $
              </div>
              <span className="font-bold text-sm tracking-tight text-white">CASHFLOW CLUB POLAND</span>
            </div>

            <p className="text-xs text-zinc-500">
              {ft.cashflowRights}
            </p>
          </>
        ) : (
          <>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm tracking-wider text-white">WOOD<span className="text-amber-400">IQ</span></span>
            </div>

            <p className="text-xs text-zinc-500">
              {ft.woodiqRights}
            </p>
          </>
        )}
      </div>
    </footer>
  );
}
