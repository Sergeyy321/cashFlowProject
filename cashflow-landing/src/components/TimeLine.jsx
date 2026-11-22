import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';

export function GameProcess() {
  const { t } = useLanguage();
  const tm = t.timeline;

  return (
    <section id="process" className="py-20 sm:py-24 px-4 sm:px-6 bg-zinc-950 border-b border-zinc-900">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14 max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3 tracking-tight">
            {tm.title}
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            {tm.subtitle}
          </p>
        </div>

        {/* Timeline List */}
        <div className="relative border-l border-zinc-800 ml-4 sm:ml-28 space-y-10">
          {tm.steps.map((step, idx) => (
            <div key={idx} className="relative pl-6 sm:pl-8 group">
              {/* Dot */}
              <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-lime-400 ring-4 ring-zinc-950" />
              
              {/* Time Label on Desktop */}
              <div className="absolute -left-28 top-0.5 hidden sm:block w-20 text-right">
                <span className="text-xs font-bold text-lime-400 tracking-wider">
                  {step.time}
                </span>
              </div>

              {/* Step Card */}
              <div className="p-5 sm:p-6 rounded-xl bg-zinc-900/70 border border-zinc-800/80 transition-colors hover:border-zinc-700">
                <span className="text-xs font-bold text-lime-400 tracking-wider block sm:hidden mb-1.5">
                  {step.time}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white mb-1.5 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}