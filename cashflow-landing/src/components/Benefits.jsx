import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { GraphUp, ShieldCheck, Group } from 'iconoir-react';

export function Benefits() {
  const { t } = useLanguage();
  const b = t.benefits;

  const icons = [
    <GraphUp className="w-5 h-5 text-lime-400" />,
    <ShieldCheck className="w-5 h-5 text-lime-400" />,
    <Group className="w-5 h-5 text-lime-400" />,
  ];

  return (
    <section id="about" className="py-20 sm:py-24 px-4 sm:px-6 bg-zinc-950 border-b border-zinc-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3 tracking-tight">
            {b.title}
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            {b.subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {b.items.map((item, idx) => (
            <div 
              key={idx} 
              className="p-7 sm:p-8 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors flex flex-col items-start text-left"
            >
              <div className="w-11 h-11 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center mb-6 shrink-0">
                {icons[idx]}
              </div>
              <h3 className="text-lg font-bold text-white mb-2 tracking-tight">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
