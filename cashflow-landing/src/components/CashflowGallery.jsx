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
    <section id="cashflow-gallery" className="py-20 sm:py-24 px-4 sm:px-6 bg-zinc-950 border-b border-zinc-900">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-lime-400 mb-3 bg-lime-400/10 px-3 py-1 rounded-full border border-lime-400/20">
            <span className="w-1.5 h-1.5 rounded-full bg-lime-400" />
            <span>{cg.badge?.replace(/^[^\wа-яА-ЯіїєґІЇЄҐa-zA-Z]+/, '') || 'Атмосфера'}</span>
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            {cg.title || 'Ось так проходять наші ігри'}
          </h2>
          <p className="mt-3 text-zinc-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            {cg.subtitle || 'Справжні емоції, корисний нетворкінг та інвестиційна практика за столом Cashflow.'}
          </p>
        </div>

        {/* Gallery Cards */}
        <div className="flex sm:grid sm:grid-cols-3 gap-5 sm:gap-6 overflow-x-auto sm:overflow-visible pb-4 sm:pb-0 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          {galleryImages.map((img) => (
            <article
              key={img.id}
              className="group relative flex-none w-[84vw] max-w-[340px] sm:max-w-none sm:w-auto rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden transition-all duration-200 hover:border-zinc-700 snap-center flex flex-col"
            >
              {/* Image with 4:3 ratio */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-950">
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Caption */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-white mb-1.5 leading-snug group-hover:text-lime-400 transition-colors">
                    {img.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {img.desc}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
