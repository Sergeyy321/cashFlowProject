import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { WOOD_GAMES_METADATA } from '../data/woodGames';
import { Cart, Search, Xmark, DeliveryTruck, Package, Spark } from 'iconoir-react';

export function WoodIQSelling({ onOpenModal }) {
  const [selectedGame, setSelectedGame] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [detailsChessSize, setDetailsChessSize] = useState('25x50');
  const [detailsPuzzleSize, setDetailsPuzzleSize] = useState('a4');
  const [detailsPuzzleImage, setDetailsPuzzleImage] = useState(null);
  const { t, lang } = useLanguage();
  const { formatPrice, toEUR, rateInfo } = useCurrency();
  const ws = t.woodSelling;
  const { isInCart, toggleCart } = useCart();

  const handleOpenGameDetails = (game) => {
    setSelectedGame(game);
    if (game.id === 'woodPuzzle') {
      const meta = WOOD_GAMES_METADATA.find((m) => m.id === 'woodPuzzle');
      const sizeObj = meta?.puzzleSizes?.find((s) => s.id === detailsPuzzleSize) || meta?.puzzleSizes?.[0];
      setDetailsPuzzleImage(sizeObj?.image || game.image);
    } else {
      setDetailsPuzzleImage(null);
    }
  };

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
      <section id="wood-pricing" className="py-24 px-4 sm:px-6 bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
              <span className="inline-flex items-center text-[11px] font-semibold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3.5 py-1 rounded-full border border-amber-400/20">
                {ws.badge}
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {lang === 'pl' ? `NBP Live: ${rateInfo.formatted}` : lang === 'en' ? `NBP Live: ${rateInfo.formatted}` : `Курс NBP Live: ${rateInfo.formatted}`}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              {ws.title}
            </h2>

            <p className="max-w-2xl mx-auto text-zinc-400 text-sm sm:text-base leading-relaxed">
              {ws.subtitle}
            </p>
          </div>

          {/* Categories Filter */}
          <div className="flex items-center justify-center gap-2 sm:gap-2.5 flex-wrap mb-12">
            {categories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 sm:px-5 py-2 rounded-full font-medium text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
                  activeCategory === cat.key
                    ? 'bg-amber-400 text-zinc-950 font-bold shadow-sm'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Games Grid / Mobile Horizontal Scroll */}
          <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 overflow-x-auto sm:overflow-visible pb-4 sm:pb-0 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            {filteredGames.map((game, index) => {
              const inCart = isInCart(game.id || game.name);

              return (
                <div
                  key={game.id || index}
                  className="group relative flex-none w-[82vw] max-w-[320px] sm:w-auto h-[440px] overflow-hidden rounded-2xl border border-zinc-800/90 bg-zinc-900 hover:border-amber-400/40 transition-all duration-300 flex flex-col justify-end text-left shadow-sm snap-center"
                >
                  <img
                    src={game.image}
                    alt={game.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent pointer-events-none" />

                  {/* Top Bar Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
                    <span className="px-2.5 py-1 rounded-md bg-zinc-950/85 backdrop-blur-md border border-amber-400/30 text-amber-400 text-[10px] font-semibold uppercase tracking-wider shadow-sm pointer-events-auto">
                      {game.tag}
                    </span>

                    <div className="flex items-center gap-2 pointer-events-auto">
                      {/* Search / Zoom Preview Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedImage(game.image);
                        }}
                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-950/85 backdrop-blur-md border border-white/10 text-zinc-300 hover:text-white hover:border-white/20 transition-all cursor-pointer shadow-sm"
                        title={t.cart?.viewPhoto || 'Збільшити фото'}
                      >
                        <Search className="w-3.5 h-3.5" />
                      </button>

                      {/* Cart Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleCart(game);
                        }}
                        className={`flex h-8 w-8 items-center justify-center rounded-lg backdrop-blur-md border transition-all cursor-pointer shadow-sm ${
                          inCart
                            ? 'bg-amber-400 border-amber-400 text-zinc-950 font-bold'
                            : 'bg-zinc-950/85 border-white/10 text-zinc-300 hover:text-white hover:border-white/20'
                        }`}
                        title={inCart ? t.cart?.removeBtn : t.cart?.addToCart}
                      >
                        <Cart className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Card Content Area */}
                  <div className="relative p-5 z-10">
                    <h3 
                      onClick={() => handleOpenGameDetails(game)}
                      className="text-lg font-bold text-white mb-1.5 cursor-pointer hover:text-amber-400 transition-colors line-clamp-1"
                    >
                      {game.name}
                    </h3>

                    <div 
                      onClick={() => handleOpenGameDetails(game)}
                      className="cursor-pointer group/desc mb-3"
                    >
                      <p className="text-zinc-400 text-xs line-clamp-2 leading-relaxed group-hover/desc:text-zinc-300 transition-colors">
                        {game.description}
                      </p>
                      <span className="text-[11px] text-amber-400/90 font-medium group-hover/desc:text-amber-300 inline-flex items-center gap-1 mt-1">
                        {ws.details || 'Читати повний опис'} &rarr;
                      </span>
                    </div>

                    {/* Price and Badge Line */}
                    <div className="flex items-center justify-between text-xs py-2 px-3 rounded-xl bg-zinc-900/90 border border-zinc-800/80 mb-3.5">
                      <div className="flex items-center gap-2">
                        {game.sale ? (
                          <>
                            <span className="text-amber-400 font-semibold">{game.sale}</span>
                            {game.rental && <span className="text-zinc-600">•</span>}
                          </>
                        ) : null}
                        {game.rental && <span className="text-zinc-300">{game.rental}</span>}
                      </div>
                      {game.isMegaJenga && (
                        <span className="text-[10px] font-bold uppercase text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                          {t.cart?.megaJengaBadge || '🧱 = 2'}
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleOpenGameDetails(game)}
                        className="flex-1 py-2 px-3 rounded-xl bg-zinc-800 hover:bg-zinc-700/80 text-zinc-200 font-medium text-xs border border-zinc-700/60 transition cursor-pointer text-center"
                      >
                        {ws.details}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const isPuzzle = game.categories?.includes('puzzles');
                          if (!inCart) toggleCart(game);
                          const modalOpts = {};
                          if (game.id === 'chess') {
                            modalOpts.chessSize = detailsChessSize;
                          } else if (game.id === 'woodPuzzle') {
                            modalOpts.puzzleSize = detailsPuzzleSize;
                            modalOpts.puzzleImage = detailsPuzzleImage;
                          }
                          onOpenModal(isPuzzle ? 'purchase' : 'rental', game.name, modalOpts);
                        }}
                        className="flex-1 py-2 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs transition cursor-pointer text-center shadow-sm"
                      >
                        {game.categories?.includes('puzzles') ? ws.buyGame : ws.rentGame}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Info Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16">
            {ws.infoCards.map((card, i) => (
              <div key={i} className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700/60 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 mb-3.5">
                  {i === 0 ? (
                    <DeliveryTruck className="w-5 h-5" />
                  ) : i === 1 ? (
                    <Package className="w-5 h-5" />
                  ) : (
                    <Spark className="w-5 h-5" />
                  )}
                </div>
                <h4 className="text-white font-bold text-sm mb-1.5">{card.title}</h4>
                <p className="text-zinc-400 text-xs leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Modal: Full Game Details */}
        {selectedGame && (
          <div
            className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedGame(null)}
          >
            <div
              className="relative max-w-2xl w-full bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Photo Area */}
              {(() => {
                const puzzleMeta = selectedGame.id === 'woodPuzzle' ? WOOD_GAMES_METADATA.find(m => m.id === 'woodPuzzle') : null;
                const currentPuzzleSizeObj = puzzleMeta?.puzzleSizes?.find(s => s.id === detailsPuzzleSize);
                const activePhoto = (selectedGame.id === 'woodPuzzle' && (detailsPuzzleImage || currentPuzzleSizeObj?.image))
                  ? (detailsPuzzleImage || currentPuzzleSizeObj?.image)
                  : selectedGame.image;

                return (
                  <div 
                    className="relative h-64 sm:h-72 w-full shrink-0 group/modalimg cursor-pointer"
                    onClick={() => setSelectedImage(activePhoto)}
                    title="Натисніть для збільшення фото"
                  >
                    <img
                      src={activePhoto}
                      alt={selectedGame.name}
                      className="w-full h-full object-cover group-hover/modalimg:scale-102 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-black/30 pointer-events-none" />

                    {/* Search Hint */}
                    <div className="absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-950/80 border border-white/20 text-white text-xs backdrop-blur-md">
                      <Search className="w-3.5 h-3.5" />
                      <span className="text-[11px] font-medium">{t.cart?.viewPhoto || 'Powiększ zdjęcie'}</span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedGame(null);
                      }}
                      className="absolute top-4 right-4 w-9 h-9 rounded-full bg-zinc-950/80 text-zinc-300 border border-zinc-700/80 hover:border-zinc-500 hover:text-white transition-all flex items-center justify-center cursor-pointer shadow-lg z-20"
                    >
                      <Xmark className="w-4 h-4" />
                    </button>

                    <span className="absolute bottom-4 left-6 px-2.5 py-1 rounded-md bg-zinc-950/80 border border-amber-400/40 text-amber-400 text-xs font-semibold uppercase tracking-wider">
                      {selectedGame.tag}
                    </span>
                  </div>
                );
              })()}

              {/* Modal Body */}
              <div className="p-6 sm:p-8 overflow-y-auto">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    {selectedGame.name}
                  </h3>
                  <button
                    type="button"
                    onClick={() => toggleCart(selectedGame)}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer shadow-sm ${
                      isInCart(selectedGame.id || selectedGame.name)
                        ? 'bg-amber-400 text-zinc-950 font-bold'
                        : 'bg-zinc-800 text-zinc-300 border border-zinc-700 hover:text-white'
                    }`}
                  >
                    <Cart className="w-3.5 h-3.5" />
                    <span>{isInCart(selectedGame.id || selectedGame.name) ? t.cart?.inCart : t.cart?.addToCart}</span>
                  </button>
                </div>

                {/* Description & Rules */}
                <div className="bg-zinc-950/60 p-4 rounded-xl border border-zinc-800/80 mb-6">
                  <h4 className="text-xs uppercase font-semibold text-amber-400 tracking-wider mb-2">
                    {ws.rulesAndDescription || 'Опис та правила гри'}:
                  </h4>
                  <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                    {selectedGame.description}
                  </p>
                </div>

                {/* Chess Size Selector if Chess */}
                {selectedGame.id === 'chess' && (
                  <div className="p-3.5 rounded-xl bg-amber-400/10 border border-amber-400/30 mb-4">
                    <span className="block text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-2">
                      Оберіть розмір виробу / Wybierz rozmiar:
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setDetailsChessSize('25x50')}
                        className={`p-2.5 rounded-lg border text-xs font-bold transition flex flex-col items-center justify-center cursor-pointer ${
                          detailsChessSize === '25x50'
                            ? 'bg-amber-400 text-zinc-950 border-amber-400 shadow-sm'
                            : 'bg-zinc-950 text-zinc-300 border-zinc-800 hover:border-zinc-700'
                        }`}
                      >
                        <span>25×50 см</span>
                        <span className="text-[10px] opacity-80 mt-0.5">{formatPrice(730)}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setDetailsChessSize('30x60')}
                        className={`p-2.5 rounded-lg border text-xs font-bold transition flex flex-col items-center justify-center cursor-pointer ${
                          detailsChessSize === '30x60'
                            ? 'bg-amber-400 text-zinc-950 border-amber-400 shadow-sm'
                            : 'bg-zinc-950 text-zinc-300 border-zinc-800 hover:border-zinc-700'
                        }`}
                      >
                        <span>30×60 см</span>
                        <span className="text-[10px] opacity-80 mt-0.5">{formatPrice(950)}</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Puzzle Size & Artwork Selector */}
                {selectedGame.id === 'woodPuzzle' && (() => {
                  const puzzleMeta = WOOD_GAMES_METADATA.find(m => m.id === 'woodPuzzle');
                  const currentSizeObj = puzzleMeta?.puzzleSizes?.find(s => s.id === detailsPuzzleSize);
                  return (
                    <div className="p-3.5 sm:p-4 rounded-xl bg-amber-400/10 border border-amber-400/30 mb-4">
                      <div className="flex items-center justify-between mb-2.5">
                        <span className="block text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                          {lang === 'pl' ? 'Wybierz rozmiar i motyw puzzli:' : lang === 'en' ? 'Select puzzle size & artwork:' : "Оберіть розмір та картину пазла:"}
                        </span>
                        <span className="text-[11px] font-semibold text-amber-900 bg-amber-400/40 px-2.5 py-0.5 rounded-full">
                          {detailsPuzzleSize.toUpperCase()} — {formatPrice(detailsPuzzleSize === 'a1' ? 200 : detailsPuzzleSize === 'a3' ? 100 : 80)}
                        </span>
                      </div>

                      {/* 3 Size buttons: A4, A3, A1 */}
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        {puzzleMeta?.puzzleSizes?.map((sizeItem) => (
                          <button
                            key={sizeItem.id}
                            type="button"
                            onClick={() => {
                              setDetailsPuzzleSize(sizeItem.id);
                              setDetailsPuzzleImage(sizeItem.image);
                            }}
                            className={`p-2.5 rounded-lg border text-left transition flex flex-col justify-between cursor-pointer ${
                              detailsPuzzleSize === sizeItem.id
                                ? 'bg-amber-400 text-zinc-950 border-amber-400 shadow-sm font-bold'
                                : 'bg-zinc-950 text-zinc-300 border-zinc-800 hover:border-zinc-700'
                            }`}
                          >
                            <div>
                              <div className="text-xs font-bold">{sizeItem.label}</div>
                              <div className="text-[10px] opacity-75">{sizeItem.dimensions}</div>
                            </div>
                            <div className="mt-1 text-[11px] font-semibold">
                              {formatPrice(sizeItem.pricePLN)}
                            </div>
                          </button>
                        ))}
                      </div>

                      {/* Pattern Gallery for the selected size */}
                      {currentSizeObj?.gallery && currentSizeObj.gallery.length > 1 && (
                        <div>
                          <span className="block text-[10px] font-medium text-zinc-400 mb-1.5">
                            {lang === 'pl' ? 'Dostępne wzory w tym rozmiarze:' : lang === 'en' ? 'Available designs in this size:' : 'Доступні картини в цьому розмірі:'}
                          </span>
                          <div className="flex gap-2 overflow-x-auto pb-1">
                            {currentSizeObj.gallery.map((imgSrc, gIdx) => (
                              <button
                                key={gIdx}
                                type="button"
                                onClick={() => setDetailsPuzzleImage(imgSrc)}
                                className={`relative w-12 h-12 rounded-lg overflow-hidden border-2 transition shrink-0 cursor-pointer ${
                                  (detailsPuzzleImage || currentSizeObj.image) === imgSrc
                                    ? 'border-amber-400 scale-105 shadow-md'
                                    : 'border-zinc-700 opacity-60 hover:opacity-100'
                                }`}
                              >
                                <img src={imgSrc} alt="" className="w-full h-full object-cover" />
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()}

                {/* Pricing Grid */}
                <div className={`grid ${selectedGame.sale && selectedGame.rental ? 'grid-cols-2' : 'grid-cols-1'} gap-3 mb-6`}>
                  {selectedGame.sale && (
                    <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800">
                      <span className="block text-[10px] text-zinc-500 uppercase tracking-wider mb-0.5">{ws.purchase}</span>
                      <span className="text-amber-400 font-bold text-base sm:text-lg">
                        {selectedGame.id === 'chess'
                          ? detailsChessSize === '30x60'
                            ? formatPrice(950)
                            : formatPrice(730)
                          : selectedGame.id === 'woodPuzzle'
                          ? detailsPuzzleSize === 'a1'
                            ? formatPrice(200)
                            : detailsPuzzleSize === 'a3'
                            ? formatPrice(100)
                            : formatPrice(80)
                          : selectedGame.sale}
                      </span>
                    </div>
                  )}
                  {selectedGame.rental && (
                    <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800">
                      <span className="block text-[10px] text-zinc-500 uppercase tracking-wider mb-0.5">{ws.rental}</span>
                      <span className="text-white font-bold text-base sm:text-lg">{selectedGame.rental}</span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  {selectedGame.sale && (
                    <button
                      type="button"
                      onClick={() => {
                        const targetGame = selectedGame;
                        setSelectedGame(null);
                        if (!isInCart(targetGame.id || targetGame.name)) {
                          toggleCart(targetGame);
                        }
                        const modalOpts = {};
                        if (targetGame.id === 'chess') {
                          modalOpts.chessSize = detailsChessSize;
                        } else if (targetGame.id === 'woodPuzzle') {
                          modalOpts.puzzleSize = detailsPuzzleSize;
                          modalOpts.puzzleImage = detailsPuzzleImage;
                        }
                        onOpenModal('purchase', targetGame.name, modalOpts);
                      }}
                      className="flex-1 py-3 rounded-xl bg-amber-400 text-zinc-950 font-bold text-sm hover:bg-amber-300 transition cursor-pointer text-center shadow-sm"
                    >
                      {ws.buyGame}
                    </button>
                  )}
                  {selectedGame.rental && (
                    <button
                      type="button"
                      onClick={() => {
                        const targetGame = selectedGame;
                        setSelectedGame(null);
                        if (!isInCart(targetGame.id || targetGame.name)) {
                          toggleCart(targetGame);
                        }
                        onOpenModal('rental', targetGame.name);
                      }}
                      className={`flex-1 py-3 rounded-xl font-bold text-sm transition cursor-pointer text-center ${
                        selectedGame.sale
                          ? 'bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700'
                          : 'bg-amber-400 text-zinc-950 hover:bg-amber-300 shadow-sm'
                      }`}
                    >
                      {ws.rentGame}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Fullscreen Lightbox */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-[10000] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="relative max-w-5xl max-h-[90vh] bg-zinc-950 rounded-2xl p-2 border border-zinc-800 shadow-2xl flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt="Full preview"
                className="max-w-full max-h-[82vh] object-contain rounded-xl"
              />

              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-zinc-900 text-zinc-300 border border-zinc-700 hover:text-white hover:border-zinc-500 transition-all flex items-center justify-center cursor-pointer shadow-xl"
              >
                <Xmark className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
}