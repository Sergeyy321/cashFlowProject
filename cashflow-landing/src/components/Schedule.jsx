import React from "react";
import { useLanguage } from "../i18n/LanguageContext";
import { Check, Calendar } from "iconoir-react";

export function SchedulePricing({ eventDetails, customPrices, onOpenModal }) {
  const { t } = useLanguage();
  const s = t.schedule;
  const prices = customPrices || { test: 120, combo: 150 };

  const tiers = [
    {
      id: "test",
      title: s.tiers.test.title,
      subtitle: s.tiers.test.subtitle,
      price: prices.test,
      features: s.tiers.test.features,
      cta: s.tiers.test.cta,
      popular: true,
    },
    {
      id: "combo",
      title: s.tiers.combo.title,
      subtitle: s.tiers.combo.subtitle,
      price: prices.combo,
      features: s.tiers.combo.features,
      cta: s.tiers.combo.cta,
      popular: false,
    },
  ];

  return (
    <section id="schedule" className="py-20 sm:py-24 px-4 sm:px-6 bg-zinc-950 border-b border-zinc-900">
      <div className="max-w-5xl mx-auto">
        
        {/* Next Event Announcement */}
        <div className="mb-14 p-6 sm:p-8 rounded-2xl bg-zinc-900 border border-zinc-800 text-center max-w-3xl mx-auto">
          <span id="games" className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-lime-400/10 border border-lime-400/20 text-lime-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Calendar className="w-3.5 h-3.5 text-lime-400" />
            <span>{s.badge?.replace(/^[^\wа-яА-ЯіїєґІЇЄҐa-zA-Z]+/, '') || 'Найближча гра'}</span>
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-2 tracking-tight">
            {eventDetails.date || s.defaultDate}
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base font-medium mb-5">
            {eventDetails.place || s.defaultPlace}
          </p>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-zinc-950 border border-zinc-800 rounded-lg text-xs font-medium text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>{s.spotsLeft}</span>
            <span className="text-white font-bold">{eventDetails.spots}</span>
          </div>
        </div>

        {/* Section Heading */}
        <div className="text-center mb-10 max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 tracking-tight">
            {s.sectionTitle}
          </h2>
          <p className="text-zinc-400 text-sm leading-relaxed">
            {s.sectionSubtitle}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="flex md:grid md:grid-cols-2 gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide max-w-3xl mx-auto items-stretch">
          {tiers.map((tier) => (
            <div 
              key={tier.id} 
              className={`relative min-w-[88%] sm:min-w-[70%] md:min-w-0 snap-center p-6 sm:p-8 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                tier.popular 
                  ? 'bg-zinc-900 border-lime-400/50 shadow-sm' 
                  : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-3 left-6 px-3 py-1 bg-lime-400 text-zinc-950 font-bold text-[11px] uppercase tracking-wider rounded-full shadow-xs whitespace-nowrap">
                  {s.popularBadge}
                </span>
              )}

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 tracking-tight">
                  {tier.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 mb-6 leading-relaxed">
                  {tier.subtitle}
                </p>
                
                <div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-zinc-800">
                  <span className="text-4xl font-extrabold text-white tracking-tight">
                    {tier.price}
                  </span>
                  <span className="text-sm font-semibold text-zinc-400">
                    {s.currency}
                  </span>
                </div>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feat, i) => (
                    <li key={i} className="text-xs sm:text-sm text-zinc-300 flex items-start gap-2.5">
                      <span className="flex items-center justify-center w-4 h-4 rounded-full bg-lime-400/10 text-lime-400 mt-0.5 shrink-0">
                        <Check className="w-3 h-3 text-lime-400" />
                      </span>
                      <span className="leading-snug">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button 
                type="button"
                onClick={() => onOpenModal(tier.id)}
                className={`w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer ${
                  tier.popular 
                    ? 'bg-lime-400 text-zinc-950 hover:bg-lime-300 shadow-sm' 
                    : 'bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700/80'
                }`}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Mobile Swipe Hint */}
        <div className="flex md:hidden justify-center items-center gap-1.5 mt-3 text-xs text-zinc-500 font-medium">
          <span>{s.swipeHint}</span>
          <span className="text-lime-400">→</span>
        </div>

      </div>
    </section>
  );
}
