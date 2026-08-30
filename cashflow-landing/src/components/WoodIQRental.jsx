import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

export function WoodIQRentals({ onOpenModal }) {
  const { t } = useLanguage();
  const wr = t.woodRental;

  const [period, setPeriod] = useState(1);
  const [selectedGames, setSelectedGames] = useState('3');

  const rentalPrices = wr.rentalTiers;
  const additionalServices = wr.services;

  const selectedPrice = rentalPrices.find(
    (item) => item.id === selectedGames
  ) || rentalPrices[0];

  const isMegaJengaSelected = selectedGames === 'megajenga';

  const handleBooking = (title) => {
    onOpenModal?.('rental', title);
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
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#b99a70]/30 bg-white/50 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#806747]">
            <span className="h-2 w-2 rounded-full bg-[#a88961]" />
            {wr.badge}
          </div>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#71685d] sm:text-lg">
            {wr.subtitle}
          </p>
        </div>

        {/* Компактный выбор аренды */}
        <div className="mx-auto max-w-3xl">
          <div className="relative overflow-hidden rounded-[30px] border border-[#d8c9b2] bg-[#fffdf9] shadow-[0_25px_70px_rgba(75,58,38,0.12)]">
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#d8c2a3]/20 blur-3xl" />

            <div className="relative p-6 sm:p-8">
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
                      className={`rounded-lg px-4 py-2 text-sm font-bold transition-all ${
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
                  {/* Select */}
                  <div className="relative flex-1">
                    <select
                      id="games-count"
                      value={selectedGames}
                      onChange={(e) => setSelectedGames(e.target.value)}
                      className="w-full appearance-none rounded-xl border border-[#cdbb9f] bg-white px-5 py-4 pr-12 text-base font-bold text-[#302b26] outline-none transition-all focus:border-[#8b6d47] focus:ring-2 focus:ring-[#c6ab84]/30"
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

                  {/* Цена */}
                  <div className="flex items-center justify-between rounded-xl bg-[#3d362e] px-5 py-3.5 text-[#f7f0e5] sm:min-w-[190px]">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-[#cdbb9f]">
                        {wr.cost}
                      </div>

                      <div className="text-xs text-[#b9aa96]">
                        {wr.forPeriod} {period === 1 ? wr.day1 : wr.day2}
                      </div>
                    </div>

                    <div className="text-2xl font-black">
                      {selectedPrice
                        ? `${period === 1 ? selectedPrice.day1 : selectedPrice.day2} zł`
                        : '—'}
                    </div>
                  </div>
                </div>

                {/* Подсказка */}
                {selectedPrice?.popular && (
                  <div className="mt-3 text-xs text-[#8b765e]">
                    {wr.hint}
                  </div>
                )}
              </div>

              {/* БЛОК MEGA JENGA ВНУТРИ САМОГО КАЛЬКУЛЯТОРА ПРЯМО НАД КНОПКОЙ */}
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
                        {wr.megaJengaDesc || 'Гигантская деревянная башня — рассчитывается как 2 игры'}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedGames('megajenga');
                      handleBooking('Mega Jenga');
                    }}
                    className={`shrink-0 rounded-xl px-4 py-2.5 text-xs font-bold transition-all shadow-sm ${
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

              {/* Кнопка Забронировать */}
              <button
                type="button"
                onClick={() =>
                  handleBooking(
                    isMegaJengaSelected
                      ? 'Mega Jenga'
                      : selectedPrice?.title || 'Аренда игр'
                  )
                }
                className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl bg-[#3d362e] px-6 py-4 text-sm font-bold text-[#f7f0e5] transition-all hover:-translate-y-0.5 hover:bg-[#51473c] hover:shadow-xl cursor-pointer"
              >
                <span>{wr.bookBtn}</span>
                <span className="text-[#cdbb9f]">→</span>
              </button>
            </div>
          </div>
        </div>

        {/* Дополнительные услуги */}
        <div className="mt-20">
          <div className="mx-auto mb-9 max-w-2xl text-center">
            <div className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#96764d]">
              {wr.badge}
            </div>

            <h3 className="font-serif text-3xl font-bold text-[#302b26] sm:text-4xl">
              {wr.additionalTitle}
            </h3>

            <p className="mt-3 text-[#756b5e]">
              {wr.additionalSubtitle}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {additionalServices.map((service) => (
              <div
                key={service.title}
                className="group rounded-2xl border border-[#ded1bd] bg-[#fffdf9] p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-[#c6ab84] hover:shadow-md"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#eee4d4] text-xl">
                  {service.icon}
                </div>

                <h4 className="font-bold text-[#302b26]">
                  {service.title}
                </h4>

                <div className="mt-2 text-lg font-black text-[#8b6d47]">
                  {service.price}
                </div>

                <p className="mt-2 text-sm leading-6 text-[#817669]">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Нижний блок */}
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
              onClick={() => onOpenModal?.('rental', 'Большое мероприятие (20+ игр)')}
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
