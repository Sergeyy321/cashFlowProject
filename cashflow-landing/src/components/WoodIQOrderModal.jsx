import React, { useEffect, useMemo, useState, useRef } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useCart } from '../context/CartContext';
import { WOOD_GAMES_METADATA } from '../data/woodGames';

const rentalTiersPricing = {
  1: { day1: 50, day2: 100 },
  2: { day1: 100, day2: 150 },
  3: { day1: 150, day2: 200 },
  4: { day1: 200, day2: 300 },
  5: { day1: 250, day2: 400 },
  7: { day1: 300, day2: 500 },
  10: { day1: 400, day2: 600 },
  20: { day1: 1000, day2: 1500 },
};

// Цены покупки в EUR (€)
const purchaseTiersPricing = {
  1: 60,
  2: 110,
  3: 160,
  4: 200,
  5: 240,
  7: 310,
  10: 420,
  20: 750,
};

const cities = [
  'Katowice',
  'Kraków',
  'Wrocław',
  'Warszawa',
  'Gdańsk',
  'Poznań',
  'Inne miasto / Other',
];

export function WoodIQOrderModal({
  isOpen,
  onClose,
  initialOrder,
  selectedTier,
  selectedGame,
}) {
  const { t } = useLanguage();
  const wm = t.woodModal;
  const ws = t.woodSelling;
  const { cart, removeFromCart, addToCart, toggleCart, effectiveRentalGamesCount } = useCart();

  const [type, setType] = useState('rental');
  const [city, setCity] = useState('Katowice');
  const [days, setDays] = useState(1);
  const [delivery, setDelivery] = useState(false);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+48 ');
  const [messengerPlatform, setMessengerPlatform] = useState('Telegram');
  const [messengerHandle, setMessengerHandle] = useState('');
  const [comment, setComment] = useState('');

  const [previewImage, setPreviewImage] = useState(null);
  const [fallbackCount, setFallbackCount] = useState('3');

  const [fieldErrors, setFieldErrors] = useState({});
  const [status, setStatus] = useState({
    type: null,
    message: '',
  });

  const [loading, setLoading] = useState(false);

  // Ссылки для плавной прокрутки и фокуса к проблемному полю
  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const cityRef = useRef(null);
  const gamesListRef = useRef(null);

  // Список всех 9 игр для быстрого добавления
  const allGames = useMemo(() => {
    return ws.games.map((g, idx) => {
      const meta = WOOD_GAMES_METADATA[idx] || WOOD_GAMES_METADATA[0];
      return {
        id: meta.id,
        name: g.name,
        image: meta.image,
        isMegaJenga: meta.isMegaJenga,
        tag: g.tag,
        rental: g.rental,
        sale: g.sale,
        purchasePriceEUR: meta.purchasePriceEUR,
      };
    });
  }, [ws.games]);

  /*
   * При открытии формы
   */
  useEffect(() => {
    if (!isOpen) return;

    setName('');
    setPhone('+48 ');
    setMessengerPlatform('Telegram');
    setMessengerHandle('');
    setFieldErrors({});

    setStatus({
      type: null,
      message: '',
    });

    const isPurchase = selectedTier === 'purchase' || initialOrder?.type === 'purchase';
    setType(isPurchase ? 'purchase' : 'rental');

    setDays(initialOrder?.days || 1);
    setDelivery(false);

    // Если при открытии передана конкретная игра и корзина пуста — добавим ее в корзину
    if (selectedGame) {
      const matched = allGames.find((g) => g.name === selectedGame || g.id === selectedGame);
      if (matched && !cart.some((c) => c.id === matched.id || c.name === matched.name)) {
        addToCart(matched);
      }
    }
  }, [isOpen, initialOrder, selectedTier, selectedGame, allGames]);

  /*
   * Расчёт цены на основе выбранных игр
   */
  const calculatedRentalCount = cart.length > 0 ? effectiveRentalGamesCount : Number(fallbackCount) || 1;
  const calculatedPurchaseCount = cart.length > 0 ? cart.length : Number(fallbackCount) || 1;

  const price = useMemo(() => {
    if (type === 'purchase') {
      const count = calculatedPurchaseCount;
      if (count <= 1) return purchaseTiersPricing[1];
      if (count <= 2) return purchaseTiersPricing[2];
      if (count <= 3) return purchaseTiersPricing[3];
      if (count <= 4) return purchaseTiersPricing[4];
      if (count <= 5) return purchaseTiersPricing[5];
      if (count <= 7) return purchaseTiersPricing[7];
      if (count <= 10) return purchaseTiersPricing[10];
      return purchaseTiersPricing[20];
    }

    // Аренда
    const count = calculatedRentalCount;
    const dayKey = days === 1 ? 'day1' : 'day2';
    if (count <= 1) return rentalTiersPricing[1][dayKey];
    if (count <= 2) return rentalTiersPricing[2][dayKey];
    if (count <= 3) return rentalTiersPricing[3][dayKey];
    if (count <= 4) return rentalTiersPricing[4][dayKey];
    if (count <= 5) return rentalTiersPricing[5][dayKey];
    if (count <= 7) return rentalTiersPricing[7][dayKey];
    if (count <= 10) return rentalTiersPricing[10][dayKey];
    return rentalTiersPricing[20][dayKey];
  }, [type, days, calculatedRentalCount, calculatedPurchaseCount]);

  const currencySymbol = type === 'purchase' ? '€' : 'zł';
  const deliveryPrice = type === 'rental' && delivery ? 100 : 0;
  const total = price + deliveryPrice;

  /*
   * Телефон
   */
  const handlePhoneChange = (e) => {
    let value = e.target.value;

    if (!value.startsWith('+48 ')) {
      value = '+48 ';
    }

    const numbers = value
      .replace('+48 ', '')
      .replace(/\D/g, '')
      .slice(0, 9);

    let formatted = '+48 ';

    if (numbers.length > 0) formatted += numbers.substring(0, 3);
    if (numbers.length > 3) formatted += ' ' + numbers.substring(3, 6);
    if (numbers.length > 6) formatted += ' ' + numbers.substring(6, 9);

    setPhone(formatted);
    if (fieldErrors.phone) {
      setFieldErrors((prev) => ({ ...prev, phone: '' }));
    }
  };

  /*
   * Отправка
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    const digits = phone.replace(/\D/g, '');

    // 1. Проверка имени
    if (!name || name.trim().length < 2) {
      newErrors.name = wm.errorNameRequired || 'Wprowadź swoje imię';
    }

    // 2. Проверка телефона
    if (digits.length !== 11) {
      newErrors.phone = wm.errorPhoneRequired || 'Wprowadź 9 cyfr numeru (+48 XXX XXX XXX)';
    }

    // 3. Проверка города
    if (!city) {
      newErrors.city = wm.errorCityRequired || 'Wybierz miasto';
    }

    // Если есть ошибки — плавно прокручиваем к первой ошибке
    if (Object.keys(newErrors).length > 0) {
      setFieldErrors(newErrors);

      if (newErrors.name) {
        nameRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        nameRef.current?.focus();
      } else if (newErrors.phone) {
        phoneRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        phoneRef.current?.focus();
      } else if (newErrors.city) {
        cityRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        cityRef.current?.focus();
      }
      return;
    }

    setFieldErrors({});
    setLoading(true);

    const gamesFormattedList =
      cart.length > 0
        ? cart
            .map((g) => `${g.name}${g.isMegaJenga ? ' (Mega Jenga = 2 игры)' : ''}`)
            .join('; ')
        : `${calculatedRentalCount} игр(ы)`;

    // Форматируем соцсеть с приставкой: "Telegram: @nickname" или "Instagram: @nickname"
    const fullMessenger = messengerHandle.trim()
      ? `${messengerPlatform}: ${messengerHandle.trim()}`
      : messengerPlatform;

    try {
      const formData = new URLSearchParams();
      formData.append('orderType', 'woodiq');
      formData.append('name', name.trim());
      formData.append('phone', '+' + digits);
      formData.append('messenger', fullMessenger);
      formData.append('city', city);
      formData.append('type', type);
      formData.append('currency', type === 'purchase' ? 'EUR' : 'PLN');
      formData.append('games', gamesFormattedList);
      formData.append('days', type === 'rental' ? days.toString() : '0');
      formData.append('delivery', type === 'rental' && delivery ? 'true' : 'false');
      formData.append('price', `${price} ${currencySymbol}`);
      formData.append('deliveryPrice', type === 'rental' ? `${deliveryPrice} zł` : '0');
      formData.append('total', `${total} ${currencySymbol}`);
      formData.append('comment', comment);

      const url = import.meta.env.VITE_URL;
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Server error');
      }

      setStatus({
        type: 'success',
        message: wm.successDesc,
      });

      setTimeout(() => {
        handleCloseAndReset();
      }, 3000);
    } catch (err) {
      console.error(err);
      setStatus({
        type: 'error',
        message: wm.errorGeneral,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseAndReset = () => {
    setStatus({
      type: null,
      message: '',
    });
    setFieldErrors({});

    setName('');
    setPhone('+48 ');
    setMessengerHandle('');
    setComment('');

    setType('rental');
    setDays(1);
    setDelivery(false);

    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-3 sm:p-4 backdrop-blur-sm"
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) {
            handleCloseAndReset();
          }
        }}
      >
        <div className="relative max-h-[95vh] w-full max-w-2xl overflow-y-auto rounded-[28px] bg-[#f5efe4] text-[#302b26] shadow-2xl">
          {/* CLOSE BUTTON */}
          <button
            type="button"
            onClick={handleCloseAndReset}
            className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#3d362e] text-xl text-white transition hover:bg-[#51473c] cursor-pointer"
          >
            ×
          </button>

          <div className="p-6 sm:p-8">
            {status.type === 'success' ? (
              <div className="py-10 text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#c6ab84]/30 text-3xl">
                  ✅
                </div>

                <h3 className="text-2xl font-bold">
                  {wm.successTitle}
                </h3>

                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#756b5e]">
                  {wm.successDesc}
                </p>

                <button
                  type="button"
                  onClick={handleCloseAndReset}
                  className="mt-7 w-full rounded-xl bg-[#3d362e] px-6 py-3.5 font-bold text-[#f7f0e5] transition hover:bg-[#51473c] cursor-pointer"
                >
                  {wm.closeBtn}
                </button>
              </div>
            ) : (
              <>
                {/* HEADER */}
                <div className="mb-6 pr-12">
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[#b99a70]/40 bg-white/60 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#806747]">
                    <span>🛒</span>
                    <span>{wm.badge}</span>
                  </div>

                  <p className="mt-2 text-sm leading-6 text-[#756b5e]">
                    {wm.subtitle}
                  </p>
                </div>

                {/* ERROR */}
                {status.type === 'error' && (
                  <div className="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-700">
                    {status.message}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  {/* АРЕНДА / ПОКУПКА */}
                  <div>
                    <label className="mb-2 block text-sm font-bold">
                      {wm.formatLabel}
                    </label>

                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setType('rental')}
                        className={`rounded-2xl border px-5 py-4 text-left transition cursor-pointer ${
                          type === 'rental'
                            ? 'border-[#3d362e] bg-[#3d362e] text-white shadow-md'
                            : 'border-[#d5c4aa] bg-white hover:border-[#b99a70]'
                        }`}
                      >
                        <div className="text-lg font-black">
                          {wm.rentalOption}
                        </div>
                        <div className="mt-1 text-xs opacity-75">
                          {wm.rentalSub}
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setType('purchase');
                          setDelivery(false);
                        }}
                        className={`rounded-2xl border px-5 py-4 text-left transition cursor-pointer ${
                          type === 'purchase'
                            ? 'border-[#3d362e] bg-[#3d362e] text-white shadow-md'
                            : 'border-[#d5c4aa] bg-white hover:border-[#b99a70]'
                        }`}
                      >
                        <div className="text-lg font-black">
                          {wm.purchaseOption}
                        </div>
                        <div className="mt-1 text-xs opacity-75">
                          {wm.purchaseSub}
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* СПИСОК ДОБАВЛЕННЫХ ИГР В КОРЗИНУ */}
                  <div ref={gamesListRef} className="rounded-2xl border border-[#d5c4aa] bg-[#fbf7f0] p-4 sm:p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-base">🎲</span>
                        <span className="text-sm font-bold text-[#302b26]">
                          {t.cart.selectedGames?.replace('{count}', cart.length.toString()) || `Выбранные игры (${cart.length})`}
                        </span>
                      </div>

                      {type === 'rental' && cart.length > 0 && (
                        <span className="text-xs font-bold text-[#8b6d47] bg-[#eee4d4] px-2.5 py-1 rounded-full">
                          {t.cart.totalEquivalent?.replace('{count}', calculatedRentalCount.toString()) || `Эквивалент: ${calculatedRentalCount} игр`}
                        </span>
                      )}
                    </div>

                    {cart.length > 0 ? (
                      <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
                        {cart.map((game) => (
                          <div
                            key={game.id || game.name}
                            className="flex items-center justify-between gap-3 p-3 rounded-xl bg-white border border-[#ded1bd] shadow-sm hover:border-[#b99a70] transition"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              {/* Картинка с возможностью кликнуть и посмотреть */}
                              <button
                                type="button"
                                onClick={() => setPreviewImage(game.image)}
                                className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-[#d8c9b2] group cursor-pointer"
                                title={t.cart.viewPhoto}
                              >
                                <img
                                  src={game.image}
                                  alt={game.name}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                                />
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs transition-opacity">
                                  🔍
                                </div>
                              </button>

                              <div className="min-w-0">
                                <h4 className="font-bold text-sm text-[#302b26] truncate">
                                  {game.name}
                                </h4>
                                <div className="flex items-center gap-2 text-xs text-[#806f5c]">
                                  <span>{game.tag || 'Деревянная игра'}</span>
                                  {game.isMegaJenga && (
                                    <span className="font-bold text-[#b45309] bg-[#fef3c7] px-1.5 py-0.5 rounded text-[10px]">
                                      {t.cart.megaJengaTwoGames || '🧱 2 игры'}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Кнопка удалить из корзины */}
                            <button
                              type="button"
                              onClick={() => removeFromCart(game.id || game.name)}
                              className="shrink-0 p-2 rounded-lg text-zinc-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                              title={t.cart.removeBtn}
                            >
                              <span className="text-base leading-none">✕</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-5 text-center">
                        <p className="text-xs text-[#8b765e] mb-3">
                          {t.cart.emptyDesc}
                        </p>
                      </div>
                    )}

                    {/* Быстрое добавление других игр из каталога */}
                    <div className="mt-4 pt-3 border-t border-[#ded1bd]">
                      <div className="text-xs font-bold text-[#806f5c] mb-2">
                        + {t.cart.addToCart || 'Добавить игры в заказ'}:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {allGames.map((g) => {
                          const inCart = cart.some((c) => c.id === g.id || c.name === g.name);
                          return (
                            <button
                              key={g.id}
                              type="button"
                              onClick={() => toggleCart(g)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                                inCart
                                  ? 'bg-[#3d362e] text-white shadow-sm'
                                  : 'bg-white border border-[#ded1bd] text-[#554a3e] hover:border-[#b99a70]'
                              }`}
                            >
                              {inCart ? '✓ ' : '+ '} {g.name}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* ГОРОД */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-bold">
                        {wm.cityLabel} <span className="text-red-500">*</span>
                      </label>
                      {fieldErrors.city && (
                        <span className="text-xs font-bold text-red-600 animate-bounce">
                          ⚠️ {fieldErrors.city}
                        </span>
                      )}
                    </div>

                    <select
                      ref={cityRef}
                      value={city}
                      onChange={(e) => {
                        setCity(e.target.value);
                        if (fieldErrors.city) {
                          setFieldErrors((prev) => ({ ...prev, city: '' }));
                        }
                      }}
                      className={`w-full rounded-xl bg-white px-4 py-3.5 outline-none transition-all cursor-pointer ${
                        fieldErrors.city
                          ? 'border-2 border-red-500 bg-red-50/50'
                          : 'border border-[#d5c4aa] focus:border-[#96764d]'
                      }`}
                    >
                      {cities.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* ДНИ (ТОЛЬКО ДЛЯ АРЕНДЫ) */}
                  {type === 'rental' && (
                    <div>
                      <label className="mb-2 block text-sm font-bold">
                        {wm.durationLabel}
                      </label>

                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setDays(1)}
                          className={`rounded-xl border px-4 py-3.5 font-bold cursor-pointer transition ${
                            days === 1
                              ? 'border-[#3d362e] bg-[#3d362e] text-white shadow-sm'
                              : 'border-[#d5c4aa] bg-white hover:border-[#b99a70]'
                          }`}
                        >
                          {wm.day1}
                        </button>

                        <button
                          type="button"
                          onClick={() => setDays(2)}
                          className={`rounded-xl border px-4 py-3.5 font-bold cursor-pointer transition ${
                            days === 2
                              ? 'border-[#3d362e] bg-[#3d362e] text-white shadow-sm'
                              : 'border-[#d5c4aa] bg-white hover:border-[#b99a70]'
                          }`}
                        >
                          {wm.day2}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* ДОСТАВКА (ТОЛЬКО ДЛЯ АРЕНДЫ) */}
                  {type === 'rental' && (
                    <label className="flex cursor-pointer gap-3 rounded-2xl border border-[#d5c4aa] bg-white p-4 hover:border-[#b99a70] transition">
                      <input
                        type="checkbox"
                        checked={delivery}
                        onChange={(e) => setDelivery(e.target.checked)}
                        className="mt-1 h-5 w-5 accent-[#3d362e] cursor-pointer"
                      />
                      <div>
                        <div className="font-bold">
                          {wm.deliveryLabel}
                        </div>
                        <div className="mt-1 text-sm text-[#817669]">
                          {wm.deliverySub}
                        </div>
                        <div className="mt-1 font-bold text-[#8b6d47]">
                          +100 zł
                        </div>
                      </div>
                    </label>
                  )}

                  {/* КОНТАКТЫ (ИМЯ + ТЕЛЕФОН) */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-bold">
                          {wm.nameLabel} <span className="text-red-500">*</span>
                        </label>
                        {fieldErrors.name && (
                          <span className="text-xs font-bold text-red-600 animate-bounce">
                            ⚠️ {fieldErrors.name}
                          </span>
                        )}
                      </div>
                      <input
                        ref={nameRef}
                        value={name}
                        maxLength={50}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (fieldErrors.name) {
                            setFieldErrors((prev) => ({ ...prev, name: '' }));
                          }
                        }}
                        placeholder={wm.namePlaceholder}
                        className={`w-full rounded-xl bg-white px-4 py-3.5 outline-none transition-all ${
                          fieldErrors.name
                            ? 'border-2 border-red-500 bg-red-50/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]'
                            : 'border border-[#d5c4aa] focus:border-[#96764d]'
                        }`}
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-bold">
                          {wm.phoneLabel} <span className="text-red-500">*</span>
                        </label>
                        {fieldErrors.phone && (
                          <span className="text-xs font-bold text-red-600 animate-bounce">
                            ⚠️ {fieldErrors.phone}
                          </span>
                        )}
                      </div>
                      <input
                        ref={phoneRef}
                        type="tel"
                        value={phone}
                        onChange={handlePhoneChange}
                        className={`w-full rounded-xl bg-white px-4 py-3.5 outline-none transition-all ${
                          fieldErrors.phone
                            ? 'border-2 border-red-500 bg-red-50/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]'
                            : 'border border-[#d5c4aa] focus:border-[#96764d]'
                        }`}
                      />
                    </div>
                  </div>

                  {/* МЕССЕНДЖЕР: ВЫБОР СОЦСЕТИ + НИК / НОМЕР */}
                  <div>
                    <label className="mb-2 block text-sm font-bold">
                      {wm.messengerLabel}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                      <select
                        value={messengerPlatform}
                        onChange={(e) => setMessengerPlatform(e.target.value)}
                        className="sm:col-span-2 rounded-xl border border-[#d5c4aa] bg-white px-3.5 py-3.5 outline-none font-semibold text-sm cursor-pointer"
                      >
                        <option value="Telegram">Telegram</option>
                        <option value="Instagram">Instagram</option>
                        <option value="WhatsApp">WhatsApp</option>
                        <option value="Viber">Viber</option>
                        <option value="Звонок">Звонок / Call</option>
                      </select>

                      <input
                        type="text"
                        value={messengerHandle}
                        onChange={(e) => setMessengerHandle(e.target.value)}
                        placeholder={
                          messengerPlatform === 'Instagram'
                            ? '@instagram_nick'
                            : messengerPlatform === 'Telegram'
                            ? '@telegram_nick'
                            : wm.messengerHandlePlaceholder || '@username или номер'
                        }
                        className="sm:col-span-3 rounded-xl border border-[#d5c4aa] bg-white px-4 py-3.5 outline-none focus:border-[#96764d] text-sm"
                      />
                    </div>
                  </div>

                  {/* КОММЕНТАРИЙ */}
                  <div>
                    <label className="mb-2 block text-sm font-bold">
                      {wm.commentLabel}
                    </label>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      rows={3}
                      placeholder={wm.commentPlaceholder}
                      className="w-full resize-none rounded-xl border border-[#d5c4aa] bg-white px-4 py-3.5 outline-none focus:border-[#96764d]"
                    />
                  </div>

                  {/* ИТОГОВЫЙ БЛОК */}
                  <div className="rounded-2xl bg-[#3d362e] p-5 text-[#f7f0e5]">
                    <div className="flex justify-between text-sm text-[#d7cabb]">
                      <span>
                        {type === 'rental' ? wm.rentalOption : wm.purchaseOption}
                      </span>
                      <span className="font-bold">
                        {cart.length > 0 ? `${cart.length} игр(ы)` : `${calculatedRentalCount} игр`}
                      </span>
                    </div>

                    {type === 'rental' && (
                      <div className="mt-2 flex justify-between text-sm text-[#d7cabb]">
                        <span>{wm.summaryDuration}</span>
                        <span>{days === 1 ? wm.day1 : wm.day2}</span>
                      </div>
                    )}

                    <div className="mt-2 flex justify-between text-sm text-[#d7cabb]">
                      <span>{wm.summaryPrice}</span>
                      <span>{price} {currencySymbol}</span>
                    </div>

                    {type === 'rental' && delivery && (
                      <div className="mt-2 flex justify-between text-sm text-[#d7cabb]">
                        <span>{wm.summaryDelivery}</span>
                        <span>{deliveryPrice} zł</span>
                      </div>
                    )}

                    <div className="my-4 border-t border-white/10" />

                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold">
                        {wm.summaryTotal}
                      </span>
                      <span className="text-3xl font-black text-[#c6ab84]">
                        {total} {currencySymbol}
                      </span>
                    </div>
                  </div>

                  {/* КНОПКА ОТПРАВКИ */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl bg-[#3d362e] px-6 py-4 font-bold text-[#f7f0e5] transition hover:bg-[#51473c] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer shadow-lg"
                  >
                    {loading ? wm.sendingBtn : wm.submitBtn}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Полноэкранный просмотр изображения из корзины */}
      {previewImage && (
        <div
          className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-zinc-900 rounded-3xl p-2 border border-zinc-700 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={previewImage}
              alt="Preview"
              className="max-w-full max-h-[80vh] object-contain rounded-2xl"
            />
            <button
              type="button"
              onClick={() => setPreviewImage(null)}
              className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-zinc-900 text-white border border-zinc-700 hover:bg-rose-500 transition-all text-xl flex items-center justify-center cursor-pointer shadow-lg"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}