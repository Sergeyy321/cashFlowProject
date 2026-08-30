import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';

export function GameProcess() {
  const { t } = useLanguage();
  const tm = t.timeline;

  return (
    <section id="process" className="py-24 px-6 bg-zinc-950">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-white mb-4">{tm.title}</h2>
          <p className="text-zinc-400 max-w-xl mx-auto">{tm.subtitle}</p>
        </div>

        <div className="relative border-l-2 border-emerald-500/20 ml-4 md:ml-32 space-y-12">
          {tm.steps.map((step, idx) => (
            <div key={idx} className="relative pl-8 group">
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-zinc-950 border-2 border-lime-400 group-hover:bg-lime-400 transition-colors duration-300" />
              
              <div className="absolute -left-4 md:-left-32 top-0 hidden md:block w-24 text-right">
                <span className="text-xs font-bold text-lime-400 uppercase tracking-wider">{step.time}</span>
              </div>

              <div className="p-6 bg-zinc-900/40 border border-zinc-800/80 rounded-2xl group-hover:border-lime-500/20 transition-all duration-300">
                <span className="text-xs font-bold text-lime-400 uppercase tracking-wider block md:hidden mb-2">
                  {step.time}
                </span>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}