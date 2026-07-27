export function SchedulePricing({ eventDetails, customPrices, onOpenModal, siteTexts }) {
  const prices = customPrices || { test: 120, combo: 150 };

  const tiers = [
    {
      id: "test",
      title: "Тест-Драйв",
      subtitle: "Одно индивидуальное место за игровым столом",
      price: prices.test,
      features: [
        "Участие в игре (4 часа)",
        "Обучение правилам с нуля (20 мин)",
        "Чай, кофе и печенье на кофе-брейке",
        "Индивидуальный разбор финансовых стратегий"
      ],
      cta: "Забронировать 1 место",
      popular: true
    },
    {
      id: "combo",
      title: "Комбо на двоих",
      subtitle: "Специальная цена для пар или друзей",
      price: prices.combo,
      features: [
        "2 билета на одну игру",
        "Скидка по сравнению с одиночной записью",
        "Гарантированные соседние места за столом",
        "Совместный разбор партнерских стратегий"
      ],
      cta: "Забронировать 2 места",
      popular: false
    }
  ];

  return (
    <section id="schedule-pricing" className="py-24 px-6 bg-zinc-950 border-t border-zinc-900">
      <div className="max-w-5xl mx-auto">
        
        {/* Анонс ближайшей встречи */}
        <div className="mb-16 p-8 rounded-3xl bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-lime-400/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="text-center max-w-2xl mx-auto relative z-10">
            <span className="text-lime-400 text-xs font-bold uppercase tracking-widest bg-lime-400/10 px-3 py-1.5 rounded-full border border-lime-400/20 mb-2 inline-block">
              ⚡ Ближайший сбор
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-4 mb-3">
              {eventDetails.date || "Суббота, 18:00"}
            </h2>
            <p className="text-zinc-300 text-sm md:text-base font-medium mb-6">
              📍 {eventDetails.place || "Адрес уточняется"}
            </p>
            
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-950/80 border border-zinc-800 rounded-xl text-xs font-semibold text-zinc-400">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              Осталось свободных мест: <span className="text-lime-400 font-bold text-sm">{eventDetails.spots}</span>
            </div>
          </div>
        </div>

        {/* Тарифы на участие */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2">Выберите формат участия</h2>
          <p className="text-zinc-400 text-sm">Забронируйте место прямо сейчас — количество участников за столом строго ограничено.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto">
          {tiers.map((tier) => (
            <div 
              key={tier.id} 
              className={`relative p-8 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                tier.popular 
                  ? 'bg-zinc-900/80 border-lime-400/60 shadow-[0_0_30px_rgba(163,230,53,0.1)]' 
                  : 'bg-zinc-900/40 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              {tier.popular && (
                <span className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-lime-400 text-zinc-950 font-black text-[10px] uppercase tracking-widest rounded-full shadow-md">
                  Самый популярный
                </span>
              )}

              <div>
                <h3 className="text-2xl font-bold text-white mb-1">{tier.title}</h3>
                <p className="text-xs text-zinc-400 mb-6">{tier.subtitle}</p>
                
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-4xl font-extrabold text-white">{tier.price}</span>
                  <span className="text-sm font-semibold text-zinc-500">PLN</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feat, i) => (
                    <li key={i} className="text-sm text-zinc-300 flex items-start gap-2.5">
                      <span className="text-lime-400 font-bold mt-0.5">✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button 
                onClick={() => onOpenModal(tier.id)}
                className={`w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 ${
                  tier.popular 
                    ? 'bg-lime-400 text-zinc-950 hover:bg-lime-300 shadow-lg' 
                    : 'bg-zinc-950 text-zinc-200 hover:bg-zinc-900 border border-zinc-800'
                }`}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
