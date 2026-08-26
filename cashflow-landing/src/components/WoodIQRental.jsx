
import React, { useState } from 'react'

const rentalPrices = [
  {
    id: '1',
    title: '1 игра',
    day1: 50,
    day2: 100,
  },
  {
    id: '2',
    title: '2 игры',
    day1: 100,
    day2: 150,
  },
  {
    id: '3',
    title: '3 игры',
    day1: 150,
    day2: 200,
  },
  {
    id: '4',
    title: '4 игры',
    day1: 200,
    day2: 300,
  },
  {
    id: '5',
    title: '5 игр',
    day1: 250,
    day2: 400,
  },
  {
    id: '7',
    title: '7 игр',
    day1: 300,
    day2: 500,
  },
  {
    id: '10',
    title: '10 игр',
    day1: 400,
    day2: 600,
  },
  {
    id: '20plus',
    title: '20+ игр',
    day1: 1000,
    day2: 1500,
    popular: true,
  },
]

const additionalServices = [
  {
    title: 'Доставка и монтаж игр',
    price: '100 zł',
    description: 'Привезём, установим и подготовим игры',
    icon: '🚚',
  },
  {
    title: 'Услуги аниматора',
    price: '50 zł/час',
    description: 'Профессиональное сопровождение мероприятия',
    icon: '🎯',
  },
  {
    title: 'Аренда столиков',
    price: '25 zł/шт.',
    description: 'Удобные столики для размещения игр',
    icon: '🪑',
  },
  {
    title: 'Консультация',
    price: 'Бесплатно',
    description: 'Поможем подобрать игры под ваше мероприятие',
    icon: '💬',
  },
]

export function WoodIQRentals({ onOpenModal }) {
  const [period, setPeriod] = useState(1)
const [selectedGames, setSelectedGames] = useState('3')

const selectedPrice = rentalPrices.find(
  (item) => item.id === selectedGames
)
  const handleBooking = (title) => {
    onOpenModal?.(`Аренда — ${title}`)
  }

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
            WOOD IQ
          </div>

       

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#71685d] sm:text-lg">
            Выберите количество игр и продолжительность аренды.
            <br className="hidden sm:block" />
            Создайте атмосферу, в которой хочется играть.
          </p>
        </div>

        {/* Переключатель дней */}


        {/* Таблица */}
  {/* Компактный выбор аренды */}
<div className="mx-auto max-w-3xl">
  <div className="relative overflow-hidden rounded-[30px] border border-[#d8c9b2] bg-[#fffdf9] shadow-[0_25px_70px_rgba(75,58,38,0.12)]">

    {/* Декоративный верх */}
    <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#d8c2a3]/20 blur-3xl" />

    <div className="relative p-6 sm:p-8">

      {/* Период */}
      <div className="mb-7 flex items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.15em] text-[#96764d]">
            Период аренды
          </div>

          <div className="mt-1 text-sm text-[#756b5e]">
            Выберите продолжительность
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
              {days} {days === 1 ? 'день' : 'дня'}
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
            Количество игр
          </label>

          {selectedPrice?.popular && (
            <span className="rounded-full bg-[#e8dcc9] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#806747]">
              Выгодно
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
                Стоимость
              </div>

              <div className="text-xs text-[#b9aa96]">
                за {period === 1 ? '1 день' : '2 дня'}
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
            ✦ Оптимальный вариант для больших мероприятий
          </div>
        )}
      </div>

      {/* Информация */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-xs text-[#817669]">
        <span>🕐 8:00 — 20:00</span>
        <span>🎲 Большие деревянные игры</span>
        <span>🚚 Доставка доступна</span>
      </div>

      {/* Кнопка */}
      <button
        type="button"
        onClick={() =>
          handleBooking(selectedPrice?.title || 'Аренда игр')
        }
        className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl bg-[#3d362e] px-6 py-4 text-sm font-bold text-[#f7f0e5] transition-all hover:-translate-y-0.5 hover:bg-[#51473c] hover:shadow-xl"
      >
        <span>Забронировать</span>
        <span className="text-[#cdbb9f]">→</span>
      </button>

    </div>
  </div>

  {/* Mega Jenga — компактная дополнительная опция */}
  <button
    type="button"
    onClick={() => handleBooking('Mega Jenga')}
    className="group mt-4 flex w-full items-center justify-between rounded-2xl border border-[#d8c9b2] bg-[#e9dcc8]/50 px-5 py-4 text-left transition-all hover:border-[#b99a70] hover:bg-[#e9dcc8]"
  >
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#c6ab84] text-lg">
        🧱
      </div>

      <div>
        <div className="font-bold text-[#302b26]">
          Mega Jenga
        </div>

        <div className="text-xs text-[#847665]">
          200 zł / 300 zł
        </div>
      </div>
    </div>

    <span className="text-sm font-bold text-[#8b6d47] transition-transform group-hover:translate-x-1">
      Добавить →
    </span>
  </button>
</div>

        {/* Дополнительные услуги */}
        <div className="mt-20">
          <div className="mx-auto mb-9 max-w-2xl text-center">
            <div className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#96764d]">
              Дополнительно
            </div>

            <h3 className="font-serif text-3xl font-bold text-[#302b26] sm:text-4xl">
              Дополнительные услуги
            </h3>

            <p className="mt-3 text-[#756b5e]">
              Сделаем организацию вашего мероприятия максимально простой.
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
              Нужны игры для большого мероприятия?
            </h3>

            <p className="mt-4 leading-7 text-[#706557]">
              Если вам нужно 20 и более игр, доставка, монтаж или
              помощь аниматора — свяжитесь с нами. Мы подготовим
              предложение под ваше мероприятие.
            </p>

            <button
              type="button"
              onClick={() => onOpenModal?.('Аренда игр')}
              className="mt-7 rounded-xl bg-[#3d362e] px-7 py-3.5 font-bold text-[#f7f0e5] transition-all hover:-translate-y-0.5 hover:bg-[#51473c] hover:shadow-lg"
            >
              Получить предложение
            </button>
          </div>
        </div>

      </div>
    </section>
  )
}

