import { useState } from 'react';

import fiveInARow from '../img/fiveInARow.jpg';
import django from '../img/django.jpg';
import balanceDisk from '../img/balance.jpg';

export function WoodIQRentals({ onOpenModal }) {
  const [selectedGame, setSelectedGame] = useState(null);

  const rentals = [
    {
      name: 'Пять в ряд',
      description:
        'Большая деревянная версия классической игры. Отличный вариант для соревнований на мероприятии, корпоративе или празднике.',
      image: fiveInARow,
      price: 'от 1 5 ',
      tag: 'Стратегия',
      features: ['Большое игровое поле', 'Комплект фишек', 'Подходит для 2 игроков'],
    },
    {
      name: 'Большая Дженга',
      description:
        'Гигантская деревянная башня для весёлых соревнований. Чем выше башня — тем сложнее сделать следующий ход.',
      image: django,
      price: 'от 2 00',
      tag: 'Веселье',
      features: ['Большие деревянные бруски', 'Устойчивая конструкция', 'Для компании'],
    },
    {
      name: 'Баланс Диск',
      description:
        'Игра на ловкость и концентрацию. Участникам необходимо удержать элементы на диске и не допустить их падения.',
      image: balanceDisk,
      price: 'от 1 50₽',
      tag: 'Ловкость',
      features: ['Деревянный диск', 'Набор элементов', 'Подходит для соревнований'],
    },
  ];

  return (
    <section
      id="wood-rentals"
      className="py-20 px-6 bg-zinc-950"
    >
      <div className="max-w-6xl mx-auto">

        {/* Заголовок */}
        <div className="text-center mb-14">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-amber-400 mb-3">
            WoodIQ
          </span>

          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Аренда деревянных игр
          </h2>

          <p className="max-w-2xl mx-auto text-zinc-400 text-sm leading-relaxed">
            Большие деревянные игры для корпоративов, праздников,
            свадеб, фестивалей и других мероприятий.
          </p>
        </div>

        {/* Карточки */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {rentals.map((game, index) => (
            <div
              key={index}
              className="group overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-amber-400/50 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Картинка */}
              <button
                type="button"
                onClick={() => setSelectedGame(game)}
                className="relative block w-full h-56 overflow-hidden"
              >
                <img
                  src={game.image}
                  alt={game.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all" />

                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-zinc-950/80 border border-amber-400/30 text-amber-400 text-[10px] font-bold uppercase tracking-wider">
                  {game.tag}
                </span>

                <span className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-zinc-950/80 border border-zinc-700 flex items-center justify-center text-white">
                  🔍
                </span>
              </button>

              {/* Информация */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">
                  {game.name}
                </h3>

                <p className="text-zinc-400 text-xs leading-relaxed mb-5">
                  {game.description}
                </p>

                {/* Что входит */}
                <div className="mb-6">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-3">
                    В комплекте
                  </p>

                  <div className="space-y-2">
                    {game.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center gap-2 text-xs text-zinc-300"
                      >
                        <span className="text-amber-400">✓</span>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Цена */}
                <div className="flex items-end justify-between mb-5">
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase tracking-wider">
                      Аренда
                    </span>

                    <div className="text-xl font-extrabold text-white">
                      {game.price}
                    </div>
                  </div>

                  <span className="text-xs text-zinc-500">
                    / сутки
                  </span>
                </div>

                {/* Кнопка */}
                <button
                  type="button"
                  onClick={() => onOpenModal('woodiq_rental')}
                  className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold rounded-xl text-xs transition-all"
                >
                  Забронировать
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Дополнительная информация */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800">
            <div className="text-2xl mb-3">🚚</div>

            <h4 className="text-white font-bold text-sm mb-1">
              Доставка
            </h4>

            <p className="text-zinc-500 text-xs leading-relaxed">
              Привезём игры непосредственно на ваше мероприятие.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800">
            <div className="text-2xl mb-3">📦</div>

            <h4 className="text-white font-bold text-sm mb-1">
              Всё необходимое
            </h4>

            <p className="text-zinc-500 text-xs leading-relaxed">
              Все игровые элементы входят в комплект аренды.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800">
            <div className="text-2xl mb-3">🎉</div>

            <h4 className="text-white font-bold text-sm mb-1">
              Для мероприятий
            </h4>

            <p className="text-zinc-500 text-xs leading-relaxed">
              Подойдут для корпоративов, свадеб, праздников и фестивалей.
            </p>
          </div>
        </div>
      </div>

      {/* Просмотр изображения */}
      {selectedGame && (
        <div
          className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setSelectedGame(null)}
        >
          <div
            className="relative max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedGame.image}
              alt={selectedGame.name}
              className="w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl border border-zinc-700"
            />

            <button
              type="button"
              onClick={() => setSelectedGame(null)}
              className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-zinc-900 text-white border border-zinc-700 hover:bg-amber-400 hover:text-zinc-950 transition-all text-xl"
            >
              ×
            </button>

            <div className="absolute bottom-4 left-4 px-4 py-2 rounded-xl bg-zinc-950/80 backdrop-blur-sm border border-zinc-700">
              <p className="text-white font-bold text-sm">
                {selectedGame.name}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}