
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

          <h2 className="font-serif text-4xl font-bold tracking-tight text-[#2d2924] sm:text-5xl lg:text-6xl">
            Аренда игр
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#71685d] sm:text-lg">
            Выберите количество игр и продолжительность аренды.
            <br className="hidden sm:block" />
            Создайте атмосферу, в которой хочется играть.
          </p>
        </div>

        {/* Переключатель дней */}
        <div className="mb-8 flex justify-center">
          <div className="inline-flex rounded-2xl border border-[#cdbb9f] bg-white/70 p-1.5 shadow-sm backdrop-blur">
            <button
              type="button"
              onClick={() => setPeriod(1)}
              className={`min-w-[130px] rounded-xl px-6 py-3.5 text-sm font-bold transition-all ${
                period === 1
                  ? 'bg-[#3d362e] text-[#f7f0e5] shadow-md'
                  : 'text-[#766b5e] hover:text-[#3d362e]'
              }`}
            >
              1 день
            </button>

            <button
              type="button"
              onClick={() => setPeriod(2)}
              className={`min-w-[130px] rounded-xl px-6 py-3.5 text-sm font-bold transition-all ${
                period === 2
                  ? 'bg-[#3d362e] text-[#f7f0e5] shadow-md'
                  : 'text-[#766b5e] hover:text-[#3d362e]'
              }`}
            >
              2 дня
            </button>
          </div>
        </div>

        {/* Время */}
        <div className="mb-10 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/60 px-5 py-2.5 text-sm text-[#756b5e] shadow-sm">
            <span>🕐</span>
            <span>
              <strong className="text-[#3d362e]">1 день</strong> — с 8:00 до 20:00
            </span>
          </div>
        </div>

        {/* Таблица */}
        <div className="hidden overflow-hidden rounded-[28px] border border-[#d8c9b2] bg-[#fffdf9] shadow-[0_20px_60px_rgba(75,58,38,0.08)] md:block">

          {/* Заголовок таблицы */}
          <div className="grid grid-cols-[1.5fr_1fr_1fr_150px] items-center border-b border-[#ded2c0] bg-[#eee4d4] px-7 py-5">
            <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#756653]">
              Количество игр
            </div>

            <div className="text-center text-xs font-bold uppercase tracking-[0.16em] text-[#756653]">
              1 день
            </div>

            <div className="text-center text-xs font-bold uppercase tracking-[0.16em] text-[#756653]">
              2 дня
            </div>

            <div />
          </div>

          {/* Строки */}
          {rentalPrices.map((item, index) => (
            <div
              key={item.id}
              className={`grid grid-cols-[1.5fr_1fr_1fr_150px] items-center px-7 py-5 transition-colors hover:bg-[#faf6ee] ${
                index !== rentalPrices.length - 1
                  ? 'border-b border-[#ebe2d5]'
                  : ''
              } ${
                item.popular
                  ? 'bg-[#f7f0e4]'
                  : ''
              }`}
            >
              {/* Название */}
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl text-sm font-black ${
                    item.popular
                      ? 'bg-[#3d362e] text-[#f5eadb]'
                      : 'bg-[#e8dcc9] text-[#5b4e3e]'
                  }`}
                >
                  {item.id === '20plus' ? '20+' : item.id}
                </div>

                <div>
                  <div className="font-bold text-[#302b26]">
                    {item.title}
                  </div>

                  {item.popular && (
                    <div className="mt-1 text-xs font-semibold text-[#96764d]">
                      Выгодный вариант для больших мероприятий
                    </div>
                  )}
                </div>
              </div>

              {/* 1 день */}
              <div
                className={`text-center text-xl font-black ${
                  period === 1
                    ? 'text-[#8b6d47]'
                    : 'text-[#a99b88]'
                }`}
              >
                {item.day1} zł
              </div>

              {/* 2 дня */}
              <div
                className={`text-center text-xl font-black ${
                  period === 2
                    ? 'text-[#8b6d47]'
                    : 'text-[#a99b88]'
                }`}
              >
                {item.day2} zł
              </div>

              {/* Кнопка */}
              <button
                type="button"
                onClick={() => handleBooking(item.title)}
                className="rounded-xl bg-[#3d362e] px-5 py-3 text-sm font-bold text-[#f7f0e5] transition-all hover:-translate-y-0.5 hover:bg-[#51473c] hover:shadow-lg"
              >
                Забронировать
              </button>
            </div>
          ))}

          {/* Mega Jenga */}
          <div className="grid grid-cols-[1.5fr_1fr_1fr_150px] items-center border-t border-[#d8c9b2] bg-[#e9dcc8]/40 px-7 py-5">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#c6ab84] text-xl">
                🧱
              </div>

              <div>
                <div className="font-bold text-[#302b26]">
                  Mega Jenga
                </div>

                <div className="mt-1 text-xs text-[#847665]">
                  Большая версия популярной игры
                </div>
              </div>
            </div>

            <div className="text-center text-xl font-black text-[#8b6d47]">
              200 zł
            </div>

            <div className="text-center text-xl font-black text-[#8b6d47]">
              300 zł
            </div>

            <button
              type="button"
              onClick={() => handleBooking('Mega Jenga')}
              className="rounded-xl bg-[#3d362e] px-5 py-3 text-sm font-bold text-[#f7f0e5] transition-all hover:-translate-y-0.5 hover:bg-[#51473c] hover:shadow-lg"
            >
              Забронировать
            </button>
          </div>
        </div>

        {/* Мобильная версия */}
        <div className="space-y-4 md:hidden">
          {rentalPrices.map((item) => {
            const price = period === 1 ? item.day1 : item.day2

            return (
              <div
                key={item.id}
                className={`rounded-2xl border p-5 shadow-sm ${
                  item.popular
                    ? 'border-[#c6ab84] bg-[#f0e5d4]'
                    : 'border-[#ded1bd] bg-[#fffdf9]'
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl text-xs font-black ${
                        item.popular
                          ? 'bg-[#3d362e] text-[#f7f0e5]'
                          : 'bg-[#e8dcc9] text-[#5b4e3e]'
                      }`}
                    >
                      {item.id === '20plus' ? '20+' : item.id}
                    </div>

                    <div>
                      <div className="font-bold text-[#302b26]">
                        {item.title}
                      </div>

                      {item.popular && (
                        <div className="mt-0.5 text-xs text-[#96764d]">
                          Выгодный вариант
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-black text-[#8b6d47]">
                      {price} zł
                    </div>

                    <div className="text-xs text-[#958979]">
                      {period === 1 ? 'за 1 день' : 'за 2 дня'}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleBooking(item.title)}
                  className="mt-5 w-full rounded-xl bg-[#3d362e] px-5 py-3.5 text-sm font-bold text-[#f7f0e5] transition-all hover:bg-[#51473c]"
                >
                  Забронировать
                </button>
              </div>
            )
          })}

          {/* Mega Jenga — мобильная */}
          <div className="rounded-2xl border border-[#cbb99e] bg-[#e9dcc8]/60 p-5 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#c6ab84] text-lg">
                  🧱
                </div>

                <div>
                  <div className="font-bold text-[#302b26]">
                    Mega Jenga
                  </div>

                  <div className="text-xs text-[#847665]">
                    Большая игра
                  </div>
                </div>
              </div>

              <div className="text-2xl font-black text-[#8b6d47]">
                {period === 1 ? 200 : 300} zł
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleBooking('Mega Jenga')}
              className="mt-5 w-full rounded-xl bg-[#3d362e] px-5 py-3.5 text-sm font-bold text-[#f7f0e5] transition-all hover:bg-[#51473c]"
            >
              Забронировать Mega Jenga
            </button>
          </div>
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

