import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import photo1 from '../img/photo_2026-09-03_15-41-33.jpg';
import photo2 from '../img/photo_2026-09-03_15-42-50.jpg';
import photo3 from '../img/photo_2026-09-03_15-42-53.jpg';

export function CashflowGallery() {
  const { t } = useLanguage();
  const cg = t.cashflowGallery || {};

  const galleryImages = [
    {
      id: 1,
      src: photo1,
      title: cg.items?.[0]?.title || 'Фінансова практика та аналіз угод',
      desc: cg.items?.[0]?.desc || 'Укладання реальних сценаріїв угод на папері',
    },
    {
      id: 2,
      src: photo2,
      title: cg.items?.[1]?.title || 'Емоції, нетворкінг та обмін досвідом',
      desc: cg.items?.[1]?.desc || 'Знайомство з підприємцями та однодумцями',
    },
    {
      id: 3,
      src: photo3,
      title: cg.items?.[2]?.title || 'Гра в колі амбітних людей',
      desc: cg.items?.[2]?.desc || 'Спільний розбір стратегій та вихід із «щурячих перегонів»',
    },
  ];

  return (
    <section id="cashflow-gallery" className="py-16 sm:py-20 px-4 sm:px-6 bg-zinc-950 border-t border-zinc-900 overflow-hidden relative">
      {/* Декоративный фон */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-lime-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Заголовок */}
        <div className="text-center mb-8 sm:mb-12 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-lime-400 mb-2.5 bg-lime-400/10 px-3.5 py-1.5 rounded-full border border-lime-400/20">
            <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-ping" />
            {cg.badge || '📸 Атмосфера'}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            {cg.title || 'Ось так проходять наші ігри'}
          </h2>
          <p className="mt-2 text-zinc-400 text-xs sm:text-sm max-w-xl mx-auto">
            {cg.subtitle || 'Справжні емоції, корисний нетворкінг та інвестиційна практика за столом Cashflow.'}
          </p>
        </div>

        {/* Горизонтальная галерея с плавной прокруткой */}
        <div className="flex sm:grid sm:grid-cols-3 gap-4 sm:gap-6 overflow-x-auto sm:overflow-visible pb-4 sm:pb-0 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          {galleryImages.map((img) => (
            <div
              key={img.id}
              className="group relative flex-none w-[84vw] max-w-[340px] sm:max-w-none sm:w-auto rounded-3xl p-[1px] bg-gradient-to-b from-zinc-700/60 via-zinc-800/40 to-zinc-900 shadow-[0_15px_35px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(163,230,53,0.12)] snap-center flex flex-col"
            >
              <div className="h-full rounded-[23px] bg-zinc-900/90 p-3 sm:p-3.5 flex flex-col justify-between overflow-hidden">
                {/* Картинка */}
                <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden border border-zinc-800 group/image">
                  <img
                    src={img.src}
                    alt={img.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/image:scale-108"
                    loading="lazy"
                  />

                  {/* Затемняющий градиент */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                </div>

                {/* Подпись */}
                <div className="p-3">
                  <h3 className="text-base font-bold text-white mb-1 leading-snug group-hover:text-lime-400 transition-colors">
                    {img.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {img.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
