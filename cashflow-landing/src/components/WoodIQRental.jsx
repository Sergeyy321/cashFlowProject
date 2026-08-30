import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

export function WoodIQRentals({ onOpenModal }) {
  const { t, lang } = useLanguage();
  const wr = t.woodRental;

  // Режим калькулятора: 'daily' (посуточная) или 'turnkey' (под ключ по часам)
  const [calculatorMode, setCalculatorMode] = useState('turnkey');

  // Посуточная аренда
  const [period, setPeriod] = useState(1);
  const [selectedGames, setSelectedGames] = useState('3');

  // Комплексное обслуживание под ключ
  const [selectedTurnkeyTier, setSelectedTurnkeyTier] = useState('4');
  const [turnkeyHours, setTurnkeyHours] = useState(2);

  const rentalPrices = wr.rentalTiers || [];
  const turnkeyPrices = wr.turnkeyTiers || [];
  const additionalServices = wr.services || [];

  const selectedPrice = rentalPrices.find(
    (item) => item.id === selectedGames
  ) || rentalPrices[0];

  const isMegaJengaSelected = selectedGames === 'megajenga';

  const selectedTurnkey = turnkeyPrices.find(
    (item) => item.id === selectedTurnkeyTier
  ) || turnkeyPrices[0];

  // Расчет стоимости "Под ключ": 1-й час + (часы - 1) * последующие часы
  const turnkeyTotal = selectedTurnkey
    ? selectedTurnkey.firstHour + Math.max(0, turnkeyHours - 1) * selectedTurnkey.nextHour
    : 0;

  const handleBooking = (format, title) => {
    onOpenModal?.(format, title);
  };

  // Локализация выпадающего списка часов
  const getLocalizedHourLabel = (h) => {
    if (lang === 'pl') {
      if (h === 1) return `1 godzina (1 ${wr.hourUnit || 'godz.'})`;
      if (h >= 2 && h <= 4) return `${h} godziny (${h} ${wr.hourUnit || 'godz.'})`;
      return `${h} godzin (${h} ${wr.hourUnit || 'godz.'})`;
    }
    if (lang === 'en') {
      if (h === 1) return `1 hour (1 ${wr.hourUnit || 'hr'})`;
      return `${h} hours (${h} ${wr.hourUnit || 'hrs'})`;
    }
    // ukrainian default
    if (h === 1) return `1 година (1 ${wr.hourUnit || 'год.'})`;
    if (h >= 2 && h <= 4) return `${h} години (${h} ${wr.hourUnit || 'год.'})`;
    return `${h} годин (${h} ${wr.hourUnit || 'год.'})`;
  };

  // Локализация вариантов пакетов
  const getLocalizedTierOption = (tier) => {
    const firstLabel = wr.firstHourShort || '1 год';
    const nextLabel = wr.nextHourShort || 'далі';
    const perHour = wr.perHourShort || 'zł/год';
    return `${tier.title} (${firstLabel}: ${tier.firstHour} zł | ${nextLabel}: +${tier.nextHour} ${perHour})`;
  };

  return (
    <section
      id="wood-rental"
      className="relative overflow-hidden bg-[#f5efe4] py-20 text-[#2d2924] sm:py-28"
    >
      {/* Декоративный фон */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-[400px] w-[400px] rounded-full bg-[#d8c2a3]/20 blur-3xl" />
        <div className="absolute -right-40 bottom-20 h-[500px] w-[500px] rounded-full bg-[#b99a70]/10 blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 160 160\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'.4\'/%3E%3C/svg%3E")',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Заголовок */}
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#b99a70]/30 bg-white/50 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#806747]">
            <span className="h-2 w-2 rounded-full bg-[#a88961]" />
            {wr.badge}
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#302b26]">
            {calculatorMode === 'turnkey' ? (wr.turnkeyTitle || 'Комплексне обслуговування "Під ключ"') : (wr.subtitle || 'Оренда дерев’яних ігор')}
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#71685d] sm:text-base">
            {calculatorMode === 'turnkey' ? wr.turnkeySubtitle : wr.subtitle}
          </p>
        </div>

        {/* ПЕРЕКЛЮЧАТЕЛЬ РЕЖИМА АРЕНДЫ */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-2xl border border-[#d8c9b2] bg-white/70 p-1.5 shadow-sm backdrop-blur">
            <button
              type="button"
              onClick={() => setCalculatorMode('turnkey')}
              className={`rounded-xl px-5 py-3 text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                calculatorMode === 'turnkey'
                  ? 'bg-[#3d362e] text-[#f7f0e5] shadow-md scale-[1.02]'
                  : 'text-[#766b5e] hover:text-[#3d362e]'
              }`}
            >
              <span>🎩</span>
              <span>{wr.modeTurnkey || 'Обслуговування "Під ключ"'}</span>
              <span className="hidden sm:inline-block bg-amber-400 text-zinc-950 text-[10px] px-2 py-0.5 rounded-full font-black uppercase">
                Хіт
              </span>
            </button>

            <button
              type="button"
              onClick={() => setCalculatorMode('daily')}
              className={`rounded-xl px-5 py-3 text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                calculatorMode === 'daily'
                  ? 'bg-[#3d362e] text-[#f7f0e5] shadow-md scale-[1.02]'
                  : 'text-[#766b5e] hover:text-[#3d362e]'
              }`}
            >
              <span>📅</span>
              <span>{wr.modeDaily || 'Посуточна оренда'}</span>
            </button>
          </div>
        </div>

        {/* Компактный блок расчета */}
        <div className="mx-auto max-w-3xl">
          <div className="relative overflow-hidden rounded-[30px] border border-[#d8c9b2] bg-[#fffdf9] shadow-[0_25px_70px_rgba(75,58,38,0.12)]">
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#d8c2a3]/20 blur-3xl pointer-events-none" />

            <div className="relative p-6 sm:p-8">
              
              {/* РЕЖИМ 1: ОБСЛУЖИВАНИЕ ПОД КЛЮЧ (Turnkey) */}
              {calculatorMode === 'turnkey' && (
                <div className="space-y-6">
                  {/* Правила подсчета (Бейджи) */}
                  <div className="flex flex-wrap items-center justify-between gap-2 bg-[#f4ebdc] p-3.5 rounded-2xl border border-[#decbb4] text-xs font-semibold text-[#5a4835]">
                    <span className="font-bold text-[#3d362e]">{wr.turnkeyRules?.title || 'Правила розрахунку:'}</span>
                    <span className="bg-white/80 px-2.5 py-1 rounded-lg border border-[#e2d5c3]">
                      {wr.turnkeyRules?.jenga || '🧱 Велика Дженга = 2 гри'}
                    </span>
                    <span className="bg-white/80 px-2.5 py-1 rounded-lg border border-[#e2d5c3]">
                      {wr.turnkeyRules?.iqPuzzle || '🧩 IQ Puzzle (5 шт.) = 1 гра'}
                    </span>
                  </div>

                  {/* Блок селектов: Количество игр и Длительность в часах */}
                  <div className="rounded-2xl border border-[#ded1bd] bg-[#f8f3eb] p-5 sm:p-6 space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      
                      {/* 1. Селект количества игр (пакет) */}
                      <div>
                        <label
                          htmlFor="turnkey-games-select"
                          className="text-xs font-bold uppercase tracking-[0.15em] text-[#756653] block mb-2"
                        >
                          {wr.gamesCount || 'Кількість ігор'}
                        </label>

                        <div className="relative">
                          <select
                            id="turnkey-games-select"
                            value={selectedTurnkeyTier}
                            onChange={(e) => setSelectedTurnkeyTier(e.target.value)}
                            className="w-full appearance-none rounded-xl border border-[#cdbb9f] bg-white px-4 py-3.5 pr-10 text-sm font-bold text-[#302b26] outline-none transition-all focus:border-[#8b6d47] focus:ring-2 focus:ring-[#c6ab84]/30 cursor-pointer shadow-sm"
                          >
                            {turnkeyPrices.map((tier) => (
                              <option key={tier.id} value={tier.id}>
                                {getLocalizedTierOption(tier)}
                              </option>
                            ))}
                          </select>
                          <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8b6d47] text-sm">
                            ▾
                          </span>
                        </div>
                      </div>

                      {/* 2. Селект длительности в часах */}
                      <div>
                        <label
                          htmlFor="turnkey-hours-select"
                          className="text-xs font-bold uppercase tracking-[0.15em] text-[#756653] block mb-2"
                        >
                          {wr.hoursCount || 'Тривалість заходу'}
                        </label>

                        <div className="relative">
                          <select
                            id="turnkey-hours-select"
                            value={turnkeyHours}
                            onChange={(e) => setTurnkeyHours(Number(e.target.value))}
                            className="w-full appearance-none rounded-xl border border-[#cdbb9f] bg-white px-4 py-3.5 pr-10 text-sm font-bold text-[#302b26] outline-none transition-all focus:border-[#8b6d47] focus:ring-2 focus:ring-[#c6ab84]/30 cursor-pointer shadow-sm"
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((h) => (
                              <option key={h} value={h}>
                                {getLocalizedHourLabel(h)}
                              </option>
                            ))}
                          </select>
                          <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8b6d47] text-sm">
                            ▾
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Итоговая плашка цены */}
                    <div className="flex items-center justify-between rounded-xl bg-[#3d362e] px-5 py-4 text-[#f7f0e5] shadow-inner">
                      <div>
                        <div className="text-[11px] uppercase tracking-wider text-[#cdbb9f] font-bold">
                          {selectedTurnkey?.title} ({turnkeyHours} {wr.hourUnit || 'год.'})
                        </div>
                        <div className="text-xs text-[#b9aa96] mt-0.5">
                          {wr.turnkeyBadge || 'Комплексне обслуговування "Під ключ"'}
                        </div>
                      </div>

                      <div className="text-2xl sm:text-3xl font-black text-amber-400">
                        {turnkeyTotal} zł
                      </div>
                    </div>
                  </div>

                  {/* Что включено в обслуживание */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-[#6e5d4b]">
                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-[#e2d5c3]">
                      <span>🚚</span>
                      <span>{wr.includedServices?.delivery || 'Доставка та монтаж зони'}</span>
                    </div>
                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-[#e2d5c3]">
                      <span>👨‍🔧</span>
                      <span>{wr.includedServices?.staff || 'Техніки та аніматори на місці'}</span>
                    </div>
                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-[#e2d5c3]">
                      <span>🧹</span>
                      <span>{wr.includedServices?.cleanup || 'Демонтаж та вивезення'}</span>
                    </div>
                  </div>

                  {/* Кнопка Заказать под ключ */}
                  <button
                    type="button"
                    onClick={() =>
                      handleBooking(
                        'turnkey',
                        `${selectedTurnkey?.title} (${turnkeyHours} год. під ключ)`
                      )
                    }
                    className="flex w-full items-center justify-center gap-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 px-6 py-4 text-sm font-extrabold transition-all hover:-translate-y-0.5 hover:shadow-xl cursor-pointer shadow-md"
                  >
                    <span>{wr.turnkeyBookBtn || 'Замовити обслуговування під ключ'}</span>
                    <span>→</span>
                  </button>

                  {/* Примітка про зв'язок менеджера */}
                  <div className="flex items-center justify-center gap-2 pt-1 text-center text-xs font-medium text-[#7a6b5a]">
                    <span>📞</span>
                    <span>{wr.managerContactNote || "Для уточнення деталей та підтвердження замовлення менеджер з вами зв'яжеться"}</span>
                  </div>
                </div>
              )}

              {/* РЕЖИМ 2: ПОСУТОЧНАЯ АРЕНДА (Daily) */}
              {calculatorMode === 'daily' && (
                <div>
                  {/* Период */}
                  <div className="mb-7 flex items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-[0.15em] text-[#96764d]">
                        {wr.rentalPeriod}
                      </div>
                      <div className="mt-1 text-sm text-[#756b5e]">
                        {wr.selectDuration}
                      </div>
                    </div>

                    <div className="inline-flex rounded-xl border border-[#d8c9b2] bg-[#f5efe4] p-1">
                      {[1, 2].map((days) => (
                        <button
                          key={days}
                          type="button"
                          onClick={() => setPeriod(days)}
                          className={`rounded-lg px-4 py-2 text-sm font-bold transition-all cursor-pointer ${
                            period === days
                              ? 'bg-[#3d362e] text-[#f7f0e5] shadow-sm'
                              : 'text-[#766b5e] hover:text-[#3d362e]'
                          }`}
                        >
                          {days === 1 ? wr.day1 : wr.day2}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Количество игр */}
                  <div className="rounded-2xl border border-[#ded1bd] bg-[#f8f3eb] p-4 sm:p-5">
                    <div className="mb-3 flex items-center justify-between">
                      <label
                        htmlFor="games-count"
                        className="text-xs font-bold uppercase tracking-[0.15em] text-[#756653]"
                      >
                        {wr.gamesCount}
                      </label>

                      {selectedPrice?.popular && (
                        <span className="rounded-full bg-[#e8dcc9] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#806747]">
                          {wr.profitable}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                      <div className="relative flex-1">
                        <select
                          id="games-count"
                          value={selectedGames}
                          onChange={(e) => setSelectedGames(e.target.value)}
                          className="w-full appearance-none rounded-xl border border-[#cdbb9f] bg-white px-5 py-4 pr-12 text-base font-bold text-[#302b26] outline-none transition-all focus:border-[#8b6d47] focus:ring-2 focus:ring-[#c6ab84]/30 cursor-pointer"
                        >
                          {rentalPrices.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.title}
                            </option>
                          ))}
                        </select>

                        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#8b6d47]">
                          ▾
                        </span>
                      </div>

                      <div className="flex items-center justify-between rounded-xl bg-[#3d362e] px-5 py-3.5 text-[#f7f0e5] sm:min-w-[190px]">
                        <div>
                          <div className="text-[10px] uppercase tracking-wider text-[#cdbb9f]">
                            {wr.cost}
                          </div>
                          <div className="text-xs text-[#b9aa96]">
                            {wr.forPeriod} {period === 1 ? wr.day1 : wr.day2}
                          </div>
                        </div>

                        <div className="text-2xl font-black text-amber-400">
                          {selectedPrice
                            ? `${period === 1 ? selectedPrice.day1 : selectedPrice.day2} zł`
                            : '—'}
                        </div>
                      </div>
                    </div>

                    {selectedPrice?.popular && (
                      <div className="mt-3 text-xs text-[#8b765e]">
                        {wr.hint}
                      </div>
                    )}
                  </div>

                  {/* Блок Mega Jenga */}
                  <div
                    onClick={() => {
                      setSelectedGames(isMegaJengaSelected ? '3' : 'megajenga');
                    }}
                    className={`mt-4 cursor-pointer rounded-2xl border p-4 transition-all duration-300 ${
                      isMegaJengaSelected
                        ? 'border-[#8b6d47] bg-[#f0e3ce] shadow-md ring-2 ring-[#8b6d47]/30'
                        : 'border-[#ded1bd] bg-[#fbf7f0] hover:border-[#b99a70] hover:bg-[#f5ebdb]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3.5">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#e3d1ba] text-2xl shadow-inner">
                          🧱
                        </div>

                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-[#302b26] text-base">
                              {wr.megaJengaTitle || 'Mega Jenga'}
                            </span>
                            <span className="rounded-full bg-[#3d362e] px-2.5 py-0.5 text-[11px] font-bold text-[#f7f0e5]">
                              {period === 1 ? '100 zł' : '150 zł'}
                            </span>
                          </div>

                          <p className="mt-0.5 text-xs text-[#756653] leading-relaxed">
                            {wr.megaJengaDesc || 'Гігантська вежа — рахується як 2 гри'}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedGames('megajenga');
                          handleBooking('rental', 'Mega Jenga');
                        }}
                        className={`shrink-0 rounded-xl px-4 py-2.5 text-xs font-bold transition-all shadow-sm cursor-pointer ${
                          isMegaJengaSelected
                            ? 'bg-[#3d362e] text-[#f7f0e5]'
                            : 'bg-[#8b6d47] text-white hover:bg-[#6e5434]'
                        }`}
                      >
                        {isMegaJengaSelected ? wr.selectedBtn : wr.chooseBtn}
                      </button>
                    </div>
                  </div>

                  {/* Информация */}
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-xs text-[#817669]">
                    <span>🕐 {wr.infoHours}</span>
                    <span>🎲 {wr.infoGames}</span>
                    <span>🚚 {wr.infoDelivery}</span>
                  </div>

                  {/* Кнопка Забронировать посуточно */}
                  <button
                    type="button"
                    onClick={() =>
                      handleBooking(
                        'rental',
                        isMegaJengaSelected
                          ? 'Mega Jenga'
                          : selectedPrice?.title || 'Оренда ігор'
                      )
                    }
                    className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl bg-[#3d362e] px-6 py-4 text-sm font-bold text-[#f7f0e5] transition-all hover:-translate-y-0.5 hover:bg-[#51473c] hover:shadow-xl cursor-pointer"
                  >
                    <span>{wr.bookBtn}</span>
                    <span className="text-[#cdbb9f]">→</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>



        {/* Нижний блок для крупных мероприятий */}
        <div className="mt-16 rounded-[28px] border border-[#d5c4aa] bg-[#e9dcc8]/70 p-8 text-center shadow-sm sm:p-12">
          <div className="mx-auto max-w-2xl">
            <h3 className="font-serif text-3xl font-bold text-[#302b26] sm:text-4xl">
              {wr.bigEventTitle}
            </h3>

            <p className="mt-4 leading-7 text-[#706557]">
              {wr.bigEventDesc}
            </p>

            <button
              type="button"
              onClick={() => onOpenModal?.('turnkey', 'Велика подія (20+ ігор під ключ)')}
              className="mt-7 rounded-xl bg-[#3d362e] px-7 py-3.5 font-bold text-[#f7f0e5] transition-all hover:-translate-y-0.5 hover:bg-[#51473c] hover:shadow-lg cursor-pointer"
            >
              {wr.getOfferBtn}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
