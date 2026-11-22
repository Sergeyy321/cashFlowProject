import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useCart } from '../context/CartContext';
import { WOOD_GAMES_METADATA } from '../data/woodGames';
import { Cart, Search, Xmark } from 'iconoir-react';

export function WoodIQCatalog({ onOpenModal }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const { t } = useLanguage();
  const wc = t.woodCatalog;
  const ws = t.woodSelling;
  const { isInCart, toggleCart } = useCart();

  // 3 popular games: Велика Дженга, Хрестики-нулики, Чотири в ряд
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
      <section id="wood-catalog" className="py-20 sm:py-24 px-4 sm:px-6 bg-zinc-950 border-b border-zinc-900">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-14 max-w-2xl mx-auto">
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-amber-400 mb-3 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
              {wc.badge || 'WOOD IQ'}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              {wc.title}
            </h2>
            <p className="mt-3 text-zinc-400 text-sm sm:text-base leading-relaxed">
              {wc.subtitle}
            </p>
          </div>

          {/* Top 3 Games Grid */}
          <div className="flex sm:grid sm:grid-cols-3 gap-5 sm:gap-6 overflow-x-auto sm:overflow-visible pb-4 sm:pb-0 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            {popularGames.map((g) => {
              const inCart = isInCart(g.id || g.name);

              return (
                <article
                  key={g.id}
                  className="group relative flex-none w-[84vw] max-w-[320px] sm:w-auto rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all duration-200 flex flex-col justify-between overflow-hidden snap-center"
                >
                  <div>
                    {/* Image Area */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-950">
                      <img
                        src={g.image}
                        alt={g.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent pointer-events-none" />

                      {/* Cart Toggle Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleCart(g);
                        }}
                        className={`absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-lg border transition-colors cursor-pointer ${
                          inCart
                            ? 'bg-amber-400 text-zinc-950 border-amber-400'
                            : 'bg-zinc-950/80 border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700'
                        }`}
                        title={inCart ? t.cart.removeBtn : t.cart.addToCart}
                      >
                        <Cart className="w-4 h-4" />
                      </button>

                      {/* Preview Photo Button */}
                      <button
                        type="button"
                        onClick={() => setSelectedImage(g.image)}
                        className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-950/80 border border-zinc-800 text-zinc-300 text-xs hover:text-white transition-colors cursor-pointer"
                      >
                        <Search className="w-3.5 h-3.5 text-zinc-400" />
                        <span className="text-[11px] font-medium">{t.cart.viewPhoto}</span>
                      </button>

                      {/* Mega Jenga Tag */}
                      {g.isMegaJenga && (
                        <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-amber-400 text-zinc-950 font-bold text-[10px] uppercase tracking-wider">
                          2x
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="mb-2 flex items-center justify-between gap-2">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-400">
                          {g.tag}
                        </span>
                        <span className="text-xs text-zinc-300 font-semibold">
                          {g.rental}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-amber-400 transition-colors">
                        {g.name}
                      </h3>

                      <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed line-clamp-2">
                        {g.desc}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-5 pt-0 flex gap-2">
                    <button
                      type="button"
                      onClick={() => toggleCart(g)}
                      className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-semibold border transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                        inCart
                          ? 'bg-amber-400/10 border-amber-400/40 text-amber-300'
                          : 'bg-zinc-800 text-zinc-300 hover:text-white border-zinc-700/80 hover:bg-zinc-750'
                      }`}
                    >
                      <Cart className="w-3.5 h-3.5" />
                      <span>{inCart ? t.cart.inCart : t.cart.addToCart}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (!inCart) toggleCart(g);
                        onOpenModal('rental', g.name);
                      }}
                      className="py-2.5 px-4 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold rounded-lg text-xs transition-colors cursor-pointer shadow-xs"
                    >
                      {wc.bookGame || 'Замовити'}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Image Preview Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-3xl max-h-[85vh] bg-zinc-900 rounded-2xl p-2 border border-zinc-800 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Game Preview"
              className="max-w-full max-h-[75vh] object-contain rounded-xl"
            />
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-zinc-800 text-white border border-zinc-700 hover:bg-amber-400 hover:text-zinc-950 transition-colors flex items-center justify-center cursor-pointer shadow-sm"
              aria-label="Close"
            >
              <Xmark className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}