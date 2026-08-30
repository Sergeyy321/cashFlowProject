import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';

export function FAQGames() {
  const { t } = useLanguage();
  const wf = t.woodFaq;

  return (
    <section id="faq" className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* TITLE */}
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-amber-400 text-xs sm:text-sm font-bold uppercase tracking-[0.25em] mb-3">
            {wf.badge}
          </p>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            {wf.title}
          </h2>

          <div className="mx-auto mt-5 h-px w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
        </div>

        {/* MOBILE — HORIZONTAL GALLERY */}
        <div className="flex sm:hidden gap-5 overflow-x-auto snap-x snap-mandatory pb-6 -mx-4 px-4 scrollbar-hide">
          {wf.items.map((faq, idx) => (
            <article
              key={idx}
              className="relative min-w-[88%] snap-center rounded-3xl p-[1px] bg-gradient-to-br from-amber-300/70 via-amber-500/20 to-zinc-800 shadow-[0_10px_40px_rgba(245,158,11,0.10)]"
            >
              <div className="relative h-full rounded-[23px] p-6 bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 overflow-hidden flex flex-col justify-between">
                {/* Decorative glow */}
                <div className="absolute -top-16 -right-16 w-40 h-40 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

                <div>
                  {/* Number */}
                  <div className="relative flex items-center justify-between mb-6">
                    <span className="flex items-center justify-center w-9 h-9 rounded-full border border-amber-400/30 bg-amber-400/10 text-amber-300 text-xs font-bold">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Question */}
                  <h3 className="relative text-lg font-extrabold leading-snug text-white mb-4">
                    {faq.q}
                  </h3>

                  {/* Accent line */}
                  <div className="w-12 h-[2px] bg-gradient-to-r from-amber-400 to-transparent mb-5" />

                  {/* Answer */}
                  <p className="relative text-[15px] leading-7 text-zinc-300">
                    {faq.a}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* DESKTOP */}
        <div className="hidden sm:block space-y-5">
          {wf.items.map((faq, idx) => (
            <article
              key={idx}
              className="relative p-[1px] rounded-3xl bg-gradient-to-r from-amber-400/50 via-zinc-700/30 to-zinc-800/80 transition-all duration-300 hover:from-amber-400/80 hover:via-amber-500/30 hover:shadow-[0_10px_40px_rgba(245,158,11,0.08)]"
            >
              <div className="rounded-[23px] bg-zinc-900/80 p-7">
                <div className="flex items-start gap-5">
                  <span className="shrink-0 flex items-center justify-center w-11 h-11 rounded-full border border-amber-400/30 bg-amber-400/10 text-amber-300 font-bold text-sm">
                    0{idx + 1}
                  </span>

                  <div>
                    <h3 className="text-lg font-extrabold text-white mb-3">
                      {faq.q}
                    </h3>

                    <div className="w-14 h-[2px] bg-gradient-to-r from-amber-400 to-transparent mb-4" />

                    <p className="text-zinc-300 leading-7 text-sm">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* MOBILE SWIPE HINT */}
        <div className="flex sm:hidden justify-center items-center gap-2 mt-2">
          <span className="text-[11px] text-zinc-500 uppercase tracking-widest">
            {wf.swipeHint}
          </span>
          <span className="text-amber-400 text-sm">
            →
          </span>
        </div>
      </div>
    </section>
  );
}