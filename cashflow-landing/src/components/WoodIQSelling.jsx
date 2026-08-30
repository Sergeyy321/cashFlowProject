import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useCart } from '../context/CartContext';
import { WOOD_GAMES_METADATA } from '../data/woodGames';

export function WoodIQSelling({ onOpenModal }) {
  const [selectedGame, setSelectedGame] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const { t } = useLanguage();
  const ws = t.woodSelling;
  const { isInCart, toggleCart } = useCart();

  const gamesList = ws.games.map((g, idx) => {
    const meta = WOOD_GAMES_METADATA[idx] || WOOD_GAMES_METADATA[0];
    return {
      id: meta.id,
      name: g.name,
      description: g.description,
      tag: g.tag,
      image: meta.image,
      isMegaJenga: meta.isMegaJenga,
      categories: meta.categories || ['wooden'],
      rental: g.rental,
      sale: g.sale,
    };
  });

  const categories = [
    { key: 'all', label: ws.categories?.all || 'Все' },
    { key: 'puzzles', label: ws.categories?.puzzles || '🧩 Головоломки' },
    { key: 'wooden', label: ws.categories?.wooden || '🪵 Деревянные игры' },
    { key: 'exclusive', label: ws.categories?.exclusive || '✨ Эксклюзивные' },
    { key: 'magnets', label: ws.categories?.magnets || '🧲 Магниты' },
  ];

  const filteredGames = gamesList.filter((game) => {
    if (activeCategory === 'all') return true;
    return game.categories?.includes(activeCategory);
  });

  return (
    <>
      <section id="wood-pricing" className="py-20 px-4 sm:px-6 bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          {/* Заголовок */}
          <div className="text-center mb-10">
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-amber-400 mb-3 bg-amber-400/10 px-3.5 py-1.5 rounded-full border border-amber-400/20">
              {ws.badge}
            </span>

            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              {ws.title}
            </h2>

            <p className="max-w-2xl mx-auto text-zinc-400 text-sm leading-relaxed">
              {ws.subtitle}
            </p>
          </div>

          {/* 4 Раздела / Категории */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-10">
            {categories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 sm:px-5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
                  activeCategory === cat.key
                    ? 'bg-amber-400 text-zinc-950 shadow-[0_0_20px_rgba(251,191,36,0.25)] scale-105'
                    : 'bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Галерея игр: ряд с горизонтальным скроллом на телефоне, сетка на десктопе */}
          <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 overflow-x-auto sm:overflow-visible pb-4 sm:pb-0 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            {filteredGames.map((game, index) => {
              const inCart = isInCart(game.id || game.name);

              return (
                <div
                  key={game.id || index}
                  className="group relative flex-none w-[82vw] max-w-[300px] sm:w-auto h-[420px] overflow-hidden rounded-3xl border border-zinc-800 hover:border-amber-400/60 transition-all duration-300 flex flex-col justify-end text-left shadow-lg bg-zinc-900 snap-center"
                >
                  <img
                    src={game.image}
                    alt={game.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Затемнение */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />

                  {/* Категория */}
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-zinc-950/80 border border-amber-400/30 text-amber-400 text-[10px] font-bold uppercase tracking-wider">
                    {game.tag}
                  </span>

                  {/* Кнопка Корзины */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleCart(game);
                    }}
                    className={`absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-md transition-all duration-300 cursor-pointer shadow-md ${
                      inCart
                        ? 'bg-amber-400 text-zinc-950 scale-105 shadow-amber-400/30'
                        : 'bg-black/65 text-zinc-300 hover:scale-110 hover:text-white'
                    }`}
                    title={inCart ? t.cart.removeBtn : t.cart.addToCart}
                  >
                    <span className="text-base leading-none">
                      🛒
                    </span>
                  </button>

                  {/* Кнопка быстрого просмотра фото на карточке */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage(game.image);
                    }}
                    className="absolute top-16 left-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-950/85 border border-white/10 text-white text-xs backdrop-blur-md hover:bg-zinc-900 hover:scale-105 transition-all cursor-pointer shadow-md"
                    title={t.cart.viewPhoto || 'Розгорнути фото'}
                  >
                    <span>🔍</span>
                    <span className="text-[10px] font-semibold">{t.cart.viewPhoto || 'Розгорнути фото'}</span>
                  </button>

                  {/* Название и кликабельное описание */}
                  <div className="relative p-6">
                    <h3 
                      onClick={() => setSelectedGame(game)}
                      className="text-xl font-bold text-white mb-1.5 cursor-pointer hover:text-amber-400 transition-colors"
                    >
                      {game.name}
                    </h3>

                    <div 
                      onClick={() => setSelectedGame(game)}
                      className="cursor-pointer group/desc mb-3"
                    >
                      <p className="text-zinc-400 text-xs line-clamp-2 leading-relaxed group-hover/desc:text-zinc-200 transition-colors">
                        {game.description}
                      </p>
                      <span className="text-[11px] text-amber-400/90 font-semibold group-hover/desc:text-amber-300 flex items-center gap-1 mt-1">
                        {ws.details || 'Читати повний опис'} &rarr;
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-zinc-300 mb-4">
                      <span className="text-amber-400 font-semibold">{game.sale}</span>
                      <span className="text-zinc-500">•</span>
                      <span>{game.rental}</span>
                      {game.isMegaJenga && (
                        <span className="ml-auto text-[10px] font-black uppercase text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                          {t.cart.megaJengaBadge || '🧱 = 2'}
                        </span>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedGame(game)}
                        className="flex-1 py-2 px-3 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-white font-bold text-xs border border-zinc-700 transition cursor-pointer"
                      >
                        {ws.details}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (!inCart) toggleCart(game);
                          onOpenModal('rental', game.name);
                        }}
                        className="flex-1 py-2 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs transition cursor-pointer shadow"
                      >
                        {ws.rentGame}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Дополнительная информация */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-14">
            {ws.infoCards.map((card, i) => (
              <div key={i} className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                <div className="text-2xl mb-3">{card.icon}</div>
                <h4 className="text-white font-bold text-sm mb-1">{card.title}</h4>
                <p className="text-zinc-500 text-xs leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Модальное окно с полным описанием и параметрами игры */}
        {selectedGame && (
          <div
            className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedGame(null)}
          >
            <div
              className="relative max-w-2xl w-full bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl max-h-[92vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Фото с кнопкой полноэкранного зума */}
              <div 
                className="relative h-64 sm:h-80 w-full shrink-0 group/modalimg cursor-pointer"
                onClick={() => setSelectedImage(selectedGame.image)}
                title="Натисніть для збільшення фото"
              >
                <img
                  src={selectedGame.image}
                  alt={selectedGame.name}
                  className="w-full h-full object-cover group-hover/modalimg:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-black/40 pointer-events-none" />

                {/* Подсказка увеличения фото */}
                <div className="absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-950/80 border border-white/20 text-white text-xs backdrop-blur-md">
                  <span>🔍</span>
                  <span className="text-[11px] font-semibold">{t.cart.viewPhoto || 'Powiększ zdjęcie'}</span>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedGame(null);
                  }}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-zinc-900/90 text-white border border-zinc-700 hover:bg-amber-400 hover:text-zinc-950 transition-all text-xl flex items-center justify-center cursor-pointer shadow-lg z-20"
                >
                  &times;
                </button>

                <span className="absolute bottom-4 left-6 px-3 py-1 rounded-full bg-zinc-950/80 border border-amber-400/40 text-amber-400 text-xs font-bold uppercase tracking-wider">
                  {selectedGame.tag}
                </span>
              </div>

              {/* Тело модалки с полным описанием */}
              <div className="p-6 sm:p-8 overflow-y-auto">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    {selectedGame.name}
                  </h3>
                  <button
                    type="button"
                    onClick={() => toggleCart(selectedGame)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer shadow-sm ${
                      isInCart(selectedGame.id || selectedGame.name)
                        ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                        : 'bg-zinc-800 text-zinc-300 border border-zinc-700 hover:text-white'
                    }`}
                  >
                    <span>🛒</span>
                    <span>{isInCart(selectedGame.id || selectedGame.name) ? t.cart.inCart : t.cart.addToCart}</span>
                  </button>
                </div>

                {/* Полный текст описания */}
                <div className="bg-zinc-950/60 p-4 rounded-2xl border border-zinc-800/80 mb-6">
                  <h4 className="text-xs uppercase font-bold text-amber-400 tracking-wider mb-2">
                    {ws.rulesAndDescription || 'Опис та правила гри'}:
                  </h4>
                  <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-line">
                    {selectedGame.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800">
                    <span className="block text-[11px] text-zinc-500 uppercase tracking-wider">{ws.purchase}</span>
                    <span className="text-amber-400 font-bold text-base sm:text-lg">{selectedGame.sale}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800">
                    <span className="block text-[11px] text-zinc-500 uppercase tracking-wider">{ws.rental}</span>
                    <span className="text-white font-bold text-base sm:text-lg">{selectedGame.rental}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedGame(null);
                      if (!isInCart(selectedGame.id || selectedGame.name)) {
                        toggleCart(selectedGame);
                      }
                      onOpenModal('purchase', selectedGame.name);
                    }}
                    className="flex-1 py-3.5 rounded-xl bg-amber-400 text-zinc-950 font-bold text-sm hover:bg-amber-300 transition cursor-pointer shadow-md"
                  >
                    {ws.buyGame}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedGame(null);
                      if (!isInCart(selectedGame.id || selectedGame.name)) {
                        toggleCart(selectedGame);
                      }
                      onOpenModal('rental', selectedGame.name);
                    }}
                    className="flex-1 py-3.5 rounded-xl bg-zinc-800 text-white font-bold text-sm hover:bg-zinc-700 border border-zinc-700 transition cursor-pointer"
                  >
                    {ws.rentGame}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Полноэкранный просмотр фото (Лайтбокс) */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-[10000] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="relative max-w-5xl max-h-[90vh] bg-zinc-950 rounded-3xl p-2 border border-zinc-700 shadow-2xl flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt="Full preview"
                className="max-w-full max-h-[82vh] object-contain rounded-2xl"
              />

              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="absolute -top-3 -right-3 w-11 h-11 rounded-full bg-zinc-900 text-white border border-zinc-700 hover:bg-amber-400 hover:text-zinc-950 transition-all text-2xl flex items-center justify-center cursor-pointer shadow-2xl"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
}