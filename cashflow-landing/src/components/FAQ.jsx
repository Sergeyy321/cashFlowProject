import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { NavArrowDown } from 'iconoir-react';

export function FAQ() {
  const { t } = useLanguage();
  const f = t.faq;
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex((prev) => (prev === idx ? -1 : idx));
  };

  return (
    <section id="faq" className="py-20 sm:py-24 px-4 sm:px-6 bg-zinc-950 border-b border-zinc-900">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-14">
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-lime-400 mb-3 bg-lime-400/10 px-3 py-1 rounded-full border border-lime-400/20">
            {f.badge}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            {f.title}
          </h2>
        </div>

        {/* Interactive Accordion */}
        <div className="rounded-2xl bg-zinc-900 border border-zinc-800 divide-y divide-zinc-800/80 overflow-hidden shadow-xs">
          {f.items.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div key={idx} className="transition-colors">
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer group"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-zinc-950 border border-zinc-800 text-lime-400 text-xs font-bold shrink-0">
                      0{idx + 1}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-lime-400 transition-colors leading-snug">
                      {faq.q}
                    </h3>
                  </div>

                  <span
                    className={`flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-400 group-hover:text-white transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-lime-400 border-lime-400/30' : ''
                    }`}
                  >
                    <NavArrowDown className="w-4 h-4" />
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm leading-relaxed text-zinc-400 pl-14 sm:pl-16">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}