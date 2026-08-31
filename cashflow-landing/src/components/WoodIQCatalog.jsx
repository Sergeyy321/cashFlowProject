import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useCart } from '../context/CartContext';
import { WOOD_GAMES_METADATA } from '../data/woodGames';

export function WoodIQCatalog({ onOpenModal }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const { t } = useLanguage();
  const wc = t.woodCatalog;
  const ws = t.woodSelling;
  const { isInCart, toggleCart } = useCart();

  // 3 выбранные популярные игры: Велика Дженга, Хрестики-нулики, Чотири в ряд
  const popularIds = ['django', 'tictactoe', 'fiveInARow'];

  const popularGames = popularIds.map((id) => {
    const metaIndex = WOOD_GAMES_METADATA.findIndex((m) => m.id === id);
    const meta = WOOD_GAMES_METADATA[metaIndex] || WOOD_GAMES_METADATA[0];
    const g = ws.games[metaIndex] || ws.games[0];
    return {
      id: meta.id,
      name: g.name,
      desc: g.description,
      tag: g.tag,
      image: meta.image,
      isMegaJenga: meta.isMegaJenga,
      rental: g.rental,
      sale: g.sale,
    };
  });

  return (
    <>
      <section id="wood-catalog" className="py-20 px-4 sm:px-6 bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          {/* Заголовок */}
          <div className="text-center mb-12">
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-amber-400 mb-3 bg-amber-400/10 px-3.5 py-1.5 rounded-full border border-amber-400/20">
              {wc.badge || 'WOOD IQ'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              {wc.title}
            </h2>
            <p className="mt-3 text-zinc-400 text-sm max-w-xl mx-auto">
              {wc.subtitle || 'Хиты деревянных игр для ваших мероприятий и праздников.'}
            </p>
          </div>

          {/* Галерея ТОП-3 популярных игр: ряд со скроллом на мобильном, сетка на десктопе */}
          <div className="flex sm:grid sm:grid-cols-3 gap-4 sm:gap-6 overflow-x-auto sm:overflow-visible pb-4 sm:pb-0 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            {popularGames.map((g) => {
              const inCart = isInCart(g.id || g.name);

              return (
                <div
                  key={g.id}
                  className="group relative flex-none w-[82vw] max-w-[300px] sm:w-auto p-[1px] rounded-3xl bg-gradient-to-br from-amber-400/40 via-amber-500/10 to-zinc-800 shadow-[0_15px_40px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(245,158,11,0.12)] flex flex-col snap-center"
                >
                  <div className="relative h-full rounded-[23px] bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 p-6 flex flex-col justify-between overflow-hidden">
                    {/* Декоративное свечение */}
                    <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />

                    <div>
                      {/* Картинка + Кнопка Корзины */}
                      <div className="relative w-full h-56 mb-5 rounded-2xl overflow-hidden border border-zinc-700/80 group/image">
                        <img
                          src={g.image}
                          alt={g.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover/image:scale-105"
                        />

                        {/* Затемнение */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />

                        {/* Кнопка Корзины */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleCart(g);
                          }}
                          className={`absolute top-3 right-3 z-10 flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-md transition-all duration-300 shadow-lg cursor-pointer ${
                            inCart
                              ? 'bg-amber-400 text-zinc-950 scale-105 shadow-amber-400/30'
                              : 'bg-black/65 text-zinc-300 hover:scale-110 hover:text-white hover:bg-black/85'
                          }`}
                          title={inCart ? t.cart.removeBtn : t.cart.addToCart}
                        >
                          <span className="text-base leading-none">
                            🛒
                          </span>
                        </button>

                        {/* Кнопка просмотра фото */}
                        <button
                          type="button"
                          onClick={() => setSelectedImage(g.image)}
                          className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-950/80 border border-white/10 text-white text-xs backdrop-blur hover:bg-zinc-900 transition cursor-pointer"
                        >
                          <span>🔍</span>
                          <span className="text-[11px] font-medium">{t.cart.viewPhoto}</span>
                        </button>

                        {/* Бейдж Mega Jenga */}
                        {g.isMegaJenga && (
                          <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-amber-400 text-zinc-950 font-black text-[10px] uppercase shadow">
                            {t.cart.megaJengaBadge || '🧱 = 2'}
                          </div>
                        )}
                      </div>

                      {/* Категория и Название */}
                      <div className="mb-3 flex items-center justify-between">
                        <span className="inline-flex text-[10px] font-bold uppercase tracking-[0.12em] text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                          {g.tag}
                        </span>

                        <span className="text-xs text-zinc-400 font-semibold">
                          {g.rental}
                        </span>
                      </div>

                      <h3 className="text-xl font-extrabold text-white mb-2">
                        {g.name}
                      </h3>

                      <p className="text-zinc-400 text-xs leading-5 mb-5 line-clamp-3">
                        {g.desc}
                      </p>
                    </div>

                    {/* Кнопки действий */}
                    <div className="flex gap-2 pt-2 border-t border-zinc-800/80">
                      <button
                        type="button"
                        onClick={() => toggleCart(g)}
                        className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${
                          inCart
                            ? 'bg-amber-400/20 border border-amber-400/50 text-amber-300 hover:bg-amber-400/30'
                            : 'bg-zinc-800/80 border border-zinc-700 hover:border-amber-400/50 text-zinc-200 hover:text-white'
                        }`}
                      >
                        <span>🛒</span>
                        <span>{inCart ? t.cart.inCart : t.cart.addToCart}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (!inCart) toggleCart(g);
                          onOpenModal('rental', g.name);
                        }}
                        className="py-2.5 px-4 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold rounded-xl text-xs transition-all duration-200 shadow-md cursor-pointer"
                      >
                        {wc.bookGame || 'Заказать'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Полноэкранный просмотр изображения */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-zinc-900 rounded-3xl p-2 border border-zinc-700 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Game Full Preview"
              className="max-w-full max-h-[80vh] object-contain rounded-2xl"
            />

            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-zinc-900 text-white border border-zinc-700 hover:bg-amber-400 hover:text-zinc-950 transition-all text-xl flex items-center justify-center cursor-pointer shadow-lg"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}