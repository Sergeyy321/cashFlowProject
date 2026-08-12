import { useState } from 'react';

import fiveInARow from '../img/fiveInARow.jpg';
import django from '../img/django.jpg';
import balanceDisk from '../img/balance.jpg';
export function WoodIQCatalog({ onOpenModal }) {
  const [selectedImage, setSelectedImage] = useState(null);


  const games = [
    {
      name: 'Пять в ряд',
      desc: 'Большая деревянная версия классической игры. Соберите первым пять фишек подряд по горизонтали, вертикали или диагонали.',
      tag: 'Стратегия & Соревнование',
      image: fiveInARow,
    },
    {
      name: 'Большая Дженга',
      desc: 'Гигантская деревянная башня, в которой нужно вытаскивать бруски и аккуратно устанавливать их наверх, не разрушив конструкцию.',
      tag: 'Меткость & Веселье',
      image: django,
    },
    {
      name: 'Баланс Диск',
      desc: 'Удерживайте диск в равновесии и перемещайте элементы по поверхности, стараясь не допустить их падения.',
      tag: 'Баланс & Ловкость',
      image: balanceDisk,
    },
  ];


  return (
    <>
      <section id="wood-catalog" className="py-20 px-6 bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-extrabold text-white text-center mb-12">
            Популярные деревянные игры
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {games.map((g, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800 hover:border-amber-400/40 transition-all flex flex-col justify-between group hover:-translate-y-1 relative"
              >
                {/* Маленькая картинка */}
                <button
                  type="button"
                  onClick={() => setSelectedImage(g.image)}
                  className="absolute top-4 right-4 w-20 h-20 rounded-xl overflow-hidden border border-zinc-700 hover:border-amber-400 transition-all shadow-lg hover:scale-105"
                >
                  <img
                    src={g.image}
                    alt={g.name}
                    className="w-full h-full object-cover"
                  />

                  {/* Иконка увеличения */}
                  <div className="absolute inset-0 bg-black/20 hover:bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <span className="text-white text-xl">🔍</span>
                  </div>
                </button>

                <div className="pr-24">
                  {/* <div className="text-4xl mb-4">{g.icon}</div> */}

                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">
                    {g.tag}
                  </span>

                  <h3 className="text-xl font-bold text-white mt-4 mb-2">
                    {g.name}
                  </h3>

                  <p className="text-zinc-400 text-xs leading-relaxed mb-6">
                    {g.desc}
                  </p>
                </div>

                <button
                  onClick={() => onOpenModal('woodiq_rental')}
                  className="w-full py-2.5 bg-zinc-955 hover:bg-amber-400 hover:text-zinc-950 text-amber-400 font-bold rounded-xl text-xs border border-amber-400/30 transition-all"
                >
                  Забронировать игру
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Большое изображение */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-5xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Увеличенное изображение игры"
              className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl border border-zinc-700"
            />

            {/* Кнопка закрытия */}
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-zinc-900 text-white border border-zinc-700 hover:bg-amber-400 hover:text-zinc-950 transition-all text-xl"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
}