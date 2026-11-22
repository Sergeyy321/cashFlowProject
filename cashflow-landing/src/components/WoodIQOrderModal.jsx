import React, { useEffect, useMemo, useState, useRef } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { WOOD_GAMES_METADATA } from '../data/woodGames';
import { validateBotSafety, recordSuccessfulSubmission } from '../utils/antiBot';
import { initiatePurchaseCheckout } from '../services/paymentService';
import {
  Cart,
  Spark,
  ChatBubble,
  DeliveryTruck,
  Box,
  Check,
  Search,
  Xmark,
  WarningCircle,
} from 'iconoir-react';

// Цены посуточной аренды
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

// Цены комплексного обслуживания "Под ключ" (1-й час, доп. час)
const turnkeyTiersPricing = {
  2: { firstHour: 200, nextHour: 100 },
  4: { firstHour: 300, nextHour: 150 },
  7: { firstHour: 400, nextHour: 200 },
  10: { firstHour: 500, nextHour: 250 },
  20: { firstHour: 1000, nextHour: 500 },
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

// Все названия игр строго на украинском для Google Таблицы
const UK_GAME_NAMES = {
  corridor: "Коридор",
  woodPuzzle: "Дерев'яні пазли",
  iqPuzzle: "IQ Puzzle",
  tictactoe: "Хрестики-нулики",
  towerOfStones: "Вежа з каменів",
  memory: "Меморі",
  balanceTower: "Вежі балансу",
  onTheBall: "На кілі (Галактика)",
  game21: "21",
  cheesebox: "Сирна дошка",
  onTheHook: "На гачку",
  bolas: "Болас (Літаючий гольф)",
  targetAndRings: "Мішень і кільця",
  cornhole: "Корнхол",
  chess: "Дерев'яні нарди та шахи 3 в 1",
  magnets: "Магніти",
  fiveInARow: "Чотири в ряд",
  django: "Велика Дженга",
  balanceDisk: "Баланс Диск",
  aeroHockey: "Аерохокей",
  elasticBall: "Еластик",
  kulbito: "Кульбіто",
  puzzleMapUkraineA1: "Пазл «Вишивана карта України» (A1)",
  puzzleKyivA3: "Пазл «Місто-герой Київ» (A3)",
  puzzleKyivA4: "Пазл «Місто-герой Київ» (A4)",
  puzzleKhersonA3: "Пазл «Місто-герой Херсон» (A3)",
  puzzleKhersonA4: "Пазл «Місто-герой Херсон» (A4)",
  puzzleSaloA4: "Пазл «Сало з часником» (A4)",
  puzzleDerunyA4: "Пазл «Деруни зі сметаною» (A4)",
  puzzleWolfA4: "Пазл «Етнічний Вовк» (A4)",
};

const UK_CITY_NAMES = {
  'Katowice': 'Катовіце',
  'Kraków': 'Краків',
  'Wrocław': 'Вроцлав',
  'Warszawa': 'Варшава',
  'Gdańsk': 'Гданськ',
  'Poznań': 'Познань',
  'Inne miasto / Other': 'Інше місто',
};

export function WoodIQOrderModal({
  isOpen,
  onClose,
  initialOrder,
  selectedTier,
  selectedGame,
}) {
  const { t, lang } = useLanguage();
  const { formatPrice, toEUR, rate } = useCurrency();
  const wm = t.woodModal;
  const ws = t.woodSelling;
  const wr = t.woodRental;
  const { cart, removeFromCart, addToCart, toggleCart, effectiveRentalGamesCount } = useCart();

  // Режим заказа: 'rental' (посуточная аренда), 'turnkey' (под ключ по часам), 'purchase' (покупка)
  const [type, setType] = useState('turnkey');
  const [city, setCity] = useState('Katowice');
  const [days, setDays] = useState(1);
  const [hours, setHours] = useState(2);
  const [delivery, setDelivery] = useState(false);
  const [chessSize, setChessSize] = useState('25x50'); // '25x50' | '30x60'
  const [puzzleSize, setPuzzleSize] = useState('a4'); // 'a4' | 'a3' | 'a1'
  const [puzzleImage, setPuzzleImage] = useState(null);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+48 ');
  const [messengerPlatform, setMessengerPlatform] = useState('Telegram');
  const [messengerHandle, setMessengerHandle] = useState('');
  const [comment, setComment] = useState('');

  // Anti-Bot & Anti-Spam state
  const [honeypot, setHoneypot] = useState('');
  const [openedAt, setOpenedAt] = useState(Date.now());

  const [previewImage, setPreviewImage] = useState(null);
  const [fallbackCount, setFallbackCount] = useState('4');

  const [fieldErrors, setFieldErrors] = useState({});
  const [status, setStatus] = useState({
    type: null,
    message: '',
  });

  const [loading, setLoading] = useState(false);

  // Ссылки для фокуса
  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const messengerRef = useRef(null);
  const cityRef = useRef(null);
  const gamesListRef = useRef(null);

  // Список всех игр
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

  // Проверяем, выбраны ли ТОЛЬКО пазлы (или модалка открыта конкретно для пазла)
  const isPuzzleOnly = useMemo(() => {
    const matched = allGames.find((g) => g.name === selectedGame || g.id === selectedGame);
    const matchedMeta = matched ? WOOD_GAMES_METADATA.find(m => m.id === matched.id) : null;
    const isSelectedPuzzle = matchedMeta?.categories?.includes('puzzles');

    if (cart.length > 0) {
      return cart.every((c) => {
        const meta = WOOD_GAMES_METADATA.find((m) => m.id === c.id);
        return meta?.categories?.includes('puzzles');
      });
    }

    return Boolean(isSelectedPuzzle);
  }, [allGames, selectedGame, cart]);

  useEffect(() => {
    if (!isOpen) return;

    setOpenedAt(Date.now());
    setHoneypot('');

    setName('');
    setPhone('+48 ');
    setMessengerPlatform('Telegram');
    setMessengerHandle('');
    setChessSize(initialOrder?.chessSize || '25x50');
    setPuzzleSize(initialOrder?.puzzleSize || 'a4');
    setPuzzleImage(initialOrder?.puzzleImage || null);
    setFieldErrors({});

    setStatus({
      type: null,
      message: '',
    });

    if (selectedTier === 'consultation' || initialOrder?.type === 'consultation') {
      setType('consultation');
    } else if (isPuzzleOnly || selectedTier === 'purchase' || initialOrder?.type === 'purchase') {
      setType('purchase');
    } else if (selectedTier === 'turnkey' || initialOrder?.type === 'turnkey') {
      setType('turnkey');
    } else {
      setType('rental');
    }

    setDays(initialOrder?.days || 1);
    setHours(initialOrder?.hours || 2);
    setDelivery(false);

    if (selectedGame) {
      const matched = allGames.find((g) => g.name === selectedGame || g.id === selectedGame);
      if (matched && !cart.some((c) => c.id === matched.id || c.name === matched.name)) {
        addToCart(matched);
      }
    }
  }, [isOpen, initialOrder, selectedTier, selectedGame, allGames, isPuzzleOnly]);

  // Если корзина стала содержать только пазлы, принудительно переключаем с аренды на покупку
  useEffect(() => {
    if (isPuzzleOnly && (type === 'rental' || type === 'turnkey')) {
      setType('purchase');
    }
  }, [isPuzzleOnly, type]);

  // Эффективное количество игр
  const calculatedRentalCount = cart.length > 0 ? effectiveRentalGamesCount : Number(fallbackCount) || 1;
  const calculatedPurchaseCount = cart.length > 0 ? cart.length : Number(fallbackCount) || 1;

  // Расчет стоимости
  const price = useMemo(() => {
    if (type === 'purchase') {
      // Если в корзине есть товары с фиксированной ценой (пазлы, шахматы с выбором размера):
      if (cart.length > 0) {
        let sum = 0;
        let hasCustomPrice = false;
        cart.forEach((c) => {
          const meta = WOOD_GAMES_METADATA.find((m) => m.id === c.id);
          if (c.id === 'chess') {
            sum += chessSize === '30x60' ? 950 : 730;
            hasCustomPrice = true;
          } else if (c.id === 'woodPuzzle') {
            sum += puzzleSize === 'a1' ? 200 : puzzleSize === 'a3' ? 100 : 80;
            hasCustomPrice = true;
          } else if (meta && meta.purchasePricePLN) {
            sum += meta.purchasePricePLN;
            hasCustomPrice = true;
          } else if (meta && meta.purchasePriceEUR) {
            sum += Math.round(meta.purchasePriceEUR * (rate || 4.4));
            hasCustomPrice = true;
          }
        });
        if (hasCustomPrice) return sum;
      }

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

    if (type === 'turnkey') {
      const count = calculatedRentalCount;
      let tier = turnkeyTiersPricing[2];
      if (count <= 2) tier = turnkeyTiersPricing[2];
      else if (count <= 4) tier = turnkeyTiersPricing[4];
      else if (count <= 7) tier = turnkeyTiersPricing[7];
      else if (count <= 10) tier = turnkeyTiersPricing[10];
      else tier = turnkeyTiersPricing[20];

      return tier.firstHour + Math.max(0, hours - 1) * tier.nextHour;
    }

    // Посуточная аренда
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
  }, [type, days, hours, calculatedRentalCount, calculatedPurchaseCount, cart, chessSize, puzzleSize]);

  const currencySymbol = 'zł';
  const deliveryPrice = type === 'rental' && delivery ? 100 : 0;
  const total = price + deliveryPrice;

  const handlePhoneChange = (e) => {
    let value = e.target.value;
    if (!value.startsWith('+48 ')) {
      value = '+48 ';
    }
    const numbers = value.replace('+48 ', '').replace(/\D/g, '').slice(0, 9);
    let formatted = '+48 ';
    if (numbers.length > 0) formatted += numbers.substring(0, 3);
    if (numbers.length > 3) formatted += ' ' + numbers.substring(3, 6);
    if (numbers.length > 6) formatted += ' ' + numbers.substring(6, 9);

    setPhone(formatted);
    if (fieldErrors.phone) {
      setFieldErrors((prev) => ({ ...prev, phone: '' }));
    }
  };

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

    // 3. Проверка соцсети / мессенджера (ОБЯЗАТЕЛЬНО)
    if (!messengerHandle || messengerHandle.trim().length < 2) {
      newErrors.messenger = wm.errorMessengerRequired || 'Вкажіть ваш нікнейм або номер соцмережі';
    }

    // 4. Проверка города (только для аренды и покупки)
    if (type !== 'consultation' && !city) {
      newErrors.city = wm.errorCityRequired || 'Wybierz miasto';
    }

    if (Object.keys(newErrors).length > 0) {
      setFieldErrors(newErrors);
      if (newErrors.name) {
        nameRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        nameRef.current?.focus();
      } else if (newErrors.phone) {
        phoneRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        phoneRef.current?.focus();
      } else if (newErrors.messenger) {
        messengerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        messengerRef.current?.focus();
      } else if (newErrors.city) {
        cityRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        cityRef.current?.focus();
      }
      return;
    }

    // 5. КОМПЛЕКСНАЯ ANTI-BOT ЗАЩИТА
    const botCheck = validateBotSafety({
      honeypotValue: honeypot,
      openedAt,
      name,
      phoneDigits: digits,
      messengerHandle,
    });

    if (botCheck.silentReject) {
      // Бот попался в скрытую ловушку (honeypot): имитируем успех, не отправляя спам в Google Таблицу
      setStatus({
        type: 'success',
        message: type === 'consultation'
          ? (wm.consultationSuccessDesc || "Найближчим часом менеджер зв'яжеться з вами.")
          : wm.successDesc,
      });
      setTimeout(() => {
        handleCloseAndReset();
      }, 2500);
      return;
    }

    if (botCheck.isBot && botCheck.error) {
      setStatus({
        type: 'error',
        message: botCheck.error,
      });
      return;
    }

    setFieldErrors({});
    setLoading(true);

    // ВСЕ ИГРЫ В ТАБЛИЦУ СТРОГО НА УКРАИНСКОМ ЯЗЫКЕ
    const gamesFormattedList =
      type === 'consultation'
        ? 'Запит на безкоштовну консультацію'
        : cart.length > 0
        ? cart
            .map((g) => {
              if (g.id === 'chess') {
                return `${UK_GAME_NAMES.chess || "Шахи та нарди 3 в 1"} (розмір: ${chessSize === '30x60' ? '30×60 см — 950 zł' : '25×50 см — 730 zł'})`;
              }
              if (g.id === 'woodPuzzle') {
                const sizeLabel = puzzleSize === 'a1' ? 'A1 (60×84 см) — 200 zł' : puzzleSize === 'a3' ? 'A3 (30×42 см) — 100 zł' : 'A4 (21×30 см) — 80 zł';
                return `${UK_GAME_NAMES.woodPuzzle || "Дерев'яні пазли"} (розмір: ${sizeLabel})`;
              }
              return `${UK_GAME_NAMES[g.id] || g.name}${g.isMegaJenga ? ' (Mega Jenga = 2 гри)' : ''}`;
            })
            .join('; ')
        : `${calculatedRentalCount} ігор`;

    const fullMessenger = `${messengerPlatform}: ${messengerHandle.trim()}`;

    // ДЕТАЛЬНЕ РОЗМЕЖУВАННЯ ФОРМАТУ ЗАМОВЛЕННЯ ДЛЯ GOOGLE ТАБЛИЦІ:
    let ukType = 'Купівля';
    let ukFormat = 'Купівля';
    let ukDuration = 'Назавжди';
    let ukDelivery = 'Ні';
    let numDays = 0;
    let numHours = 0;

    if (type === 'consultation') {
      ukType = 'Консультація';
      ukFormat = 'Безкоштовна консультація';
      ukDuration = '—';
      ukDelivery = 'Ні';
      numDays = 0;
      numHours = 0;
    } else if (type === 'turnkey') {
      ukType = 'Під ключ';
      ukFormat = 'Під ключ (погодинно)';
      ukDuration = `${hours} год.`;
      ukDelivery = 'Включено';
      numHours = hours;
      numDays = 0;
    } else if (type === 'rental') {
      ukType = 'Оренда';
      ukFormat = 'Звичайна оренда (подобово)';
      ukDuration = `${days} дн.`;
      ukDelivery = delivery ? 'Так (+100 zł)' : 'Ні';
      numDays = days;
      numHours = 0;
    }

    // Дополнительно дублируем понятную сводку в комментарий для удобства чтения в таблице
    const formatNote = type === 'consultation'
      ? `[БЕЗКОШТОВНА КОНСУЛЬТАЦІЯ]`
      : type === 'turnkey'
      ? `[ПІД КЛЮЧ: ${hours} год., все включено]`
      : type === 'rental'
      ? `[ЗВИЧАЙНА ОРЕНДА: ${days} дн., доставка: ${ukDelivery}]`
      : `[КУПІВЛЯ ІГОР]`;

    const fullComment = comment && comment.trim()
      ? `${formatNote} ${comment.trim()}`
      : formatNote;

    try {
      const formData = new URLSearchParams();
      formData.append('orderType', 'woodiq');
      formData.append('name', name.trim());
      formData.append('phone', '+' + digits);
      formData.append('messenger', fullMessenger);
      formData.append('city', (UK_CITY_NAMES[city] || city) || 'Warszawa');
      formData.append('type', ukType);
      formData.append('format', ukFormat);
      formData.append('rentalType', ukFormat);
      formData.append('duration', ukDuration);
      formData.append('currency', 'PLN');
      formData.append('games', gamesFormattedList);
      formData.append('days', numDays.toString()); // Строго ЧИСЛО (напр. 1, 2 или 0)
      formData.append('hours', numHours.toString()); // Строго ЧИСЛО (напр. 2, 3 или 0)
      formData.append('delivery', ukDelivery);
      formData.append('price', type === 'consultation' ? '0 zł' : `${price} ${currencySymbol}`);
      formData.append('deliveryPrice', type === 'rental' && delivery ? `${deliveryPrice} zł` : '0 zł');
      formData.append('total', type === 'consultation' ? '0 zł' : `${total} ${currencySymbol}`);
      formData.append('comment', fullComment);

      const url = import.meta.env.VITE_URL;

      // ========================================================
      // 1. ОНЛАЙН-ОПЛАТА STRIPE (ПОКУПКА, АРЕНДА, ОБСЛУЖИВАНИЕ ПОД КЛЮЧ)
      // ========================================================
      if (type !== 'consultation') {
        let checkoutItems = [];
        let orderTypeDesc = 'Замовлення WoodIQ';

        if (type === 'purchase') {
          orderTypeDesc = 'Купівля ігор WoodIQ';
          checkoutItems = cart.length > 0
            ? cart.map((item) => {
                const meta = WOOD_GAMES_METADATA.find((m) => m.id === item.id);
                let itemPrice = meta?.purchasePricePLN || (meta?.purchasePriceEUR ? Math.round(meta.purchasePriceEUR * (rate || 4.4)) : Math.round(price / (cart.length || 1)));
                let itemName = item.title || item.name || 'Дерев’яна гра WoodIQ';
                let itemImage = item.image || '';
                let itemDescription = 'Габарити посилки: стандартні • Gabaryt B';
                let itemGabaryt = 'Gabaryt B';

                if (item.id === 'chess') {
                  itemPrice = chessSize === '30x60' ? 950 : 730;
                  const sizeName = chessSize === '30x60' ? '30×60 см' : '25×50 см';
                  itemName = `Дерев'яні нарди та шахи 3 в 1 (${sizeName})`;
                  itemDescription = chessSize === '30x60'
                    ? 'Розміри: 30×60 см • Gabaryt C (InPost/Kurier) • Вага ~3.5 кг'
                    : 'Розміри: 25×50 см • Gabaryt B (InPost/Kurier) • Вага ~2.8 кг';
                  itemGabaryt = chessSize === '30x60' ? 'Gabaryt C' : 'Gabaryt B';
                } else if (item.id === 'woodPuzzle') {
                  itemPrice = puzzleSize === 'a1' ? 200 : puzzleSize === 'a3' ? 100 : 80;
                  const pSizeLabel = puzzleSize === 'a1' ? 'A1 (60×84 см)' : puzzleSize === 'a3' ? 'A3 (30×42 см)' : 'A4 (21×30 см)';
                  itemName = `Дерев'яні пазли (${pSizeLabel})`;
                  itemDescription = puzzleSize === 'a1'
                    ? 'Розміри: 60×84 см (A1) • Gabaryt B/C • Вага ~1.5 кг'
                    : puzzleSize === 'a3'
                    ? 'Розміри: 30×42 см (A3) • Gabaryt B • Вага ~0.8 кг'
                    : 'Розміри: 21×30 см (A4) • Gabaryt A • Вага ~0.5 кг';
                  itemGabaryt = puzzleSize === 'a1' ? 'Gabaryt C' : puzzleSize === 'a3' ? 'Gabaryt B' : 'Gabaryt A';
                  const pMeta = WOOD_GAMES_METADATA.find((m) => m.id === 'woodPuzzle');
                  const sObj = pMeta?.puzzleSizes?.find((s) => s.id === puzzleSize);
                  if (puzzleImage || sObj?.image) {
                    itemImage = puzzleImage || sObj.image;
                  }
                } else if (item.id === 'puzzleMapUkraineA1') {
                  itemDescription = 'Розміри: 60×84 см (A1) • Gabaryt C • Вага ~1.5 кг';
                  itemGabaryt = 'Gabaryt C';
                } else if (item.id?.includes('A3')) {
                  itemDescription = 'Формат A3 (30×42 см) • Gabaryt B • Вага ~0.8 кг';
                  itemGabaryt = 'Gabaryt B';
                } else if (item.id?.includes('A4')) {
                  itemDescription = 'Формат A4 (21×30 см) • Gabaryt A • Вага ~0.5 кг';
                  itemGabaryt = 'Gabaryt A';
                }

                return {
                  name: itemName,
                  quantity: 1,
                  price: itemPrice,
                  image: itemImage,
                  description: itemDescription,
                  dimensions: itemDescription,
                  gabaryt: itemGabaryt,
                };
              })
            : [{
                name: `${calculatedPurchaseCount} дерев'яних ігор WoodIQ`,
                quantity: 1,
                price: price,
                description: 'Габарити посилки стандартні',
                gabaryt: 'Gabaryt B',
              }];
        } else if (type === 'rental') {
          orderTypeDesc = `Оренда ігор (${days} дн.)`;
          const gamesSummary = cart.length > 0
            ? cart.map(g => UK_GAME_NAMES[g.id] || g.name).join(', ')
            : `${calculatedRentalCount} ігор`;

          checkoutItems = [
            {
              name: `Оренда дерев'яних ігор (${days === 1 ? wm.day1 : wm.day2})`,
              description: `Ігри: ${gamesSummary}. Місто: ${city}`,
              quantity: 1,
              price: price,
            },
            ...(delivery ? [{
              name: '🚚 Доставка та монтаж по місту',
              description: `Доставка та монтаж ігрової зони (${city})`,
              quantity: 1,
              price: deliveryPrice,
            }] : []),
          ];
        } else if (type === 'turnkey') {
          orderTypeDesc = `Обслуговування "Під ключ" (${hours} год.)`;
          const gamesSummary = cart.length > 0
            ? cart.map(g => UK_GAME_NAMES[g.id] || g.name).join(', ')
            : `${calculatedRentalCount} ігор`;

          checkoutItems = [
            {
              name: `Комплексне обслуговування "Під ключ" (${hours} год.)`,
              description: `Включено: аніматори, доставка, монтаж. Ігри: ${gamesSummary}. Місто: ${city}`,
              quantity: 1,
              price: total,
            },
          ];
        }

        const checkoutResult = await initiatePurchaseCheckout({
          name: name.trim(),
          phone: '+' + digits,
          messenger: fullMessenger,
          city: (UK_CITY_NAMES[city] || city) || 'Warszawa',
          comment: `[${orderTypeDesc}] ${fullComment}`,
          cartItems: checkoutItems,
          total,
          currency: currencySymbol,
          orderType: type === 'purchase' ? 'woodiq_purchase' : (type === 'turnkey' ? 'woodiq_turnkey' : 'woodiq_rental'),
        });

        if (!checkoutResult || !checkoutResult.success) {
          throw new Error(checkoutResult?.error || wm.errorGeneral || 'Не вдалося створити сесію оплати Stripe.');
        }

        // Резервне збереження в Google Таблицю
        try {
          formData.append('paymentStatus', checkoutResult.isMock ? '⏳ ОЧІКУЄ (MOCK STRIPE)' : '⏳ ОЧІКУЄ (STRIPE)');
          formData.append('orderId', checkoutResult.orderId || '');
          if (url) {
            await fetch(url, { method: 'POST', body: formData });
          }
        } catch (sheetErr) {
          console.warn('Backup save warning:', sheetErr);
        }

        recordSuccessfulSubmission();

        if (checkoutResult.isMock) {
          window.location.href = checkoutResult.mockCheckoutUrl;
          return;
        }

        const targetUrl = checkoutResult.checkoutUrl || checkoutResult.url;
        if (targetUrl) {
          window.location.href = targetUrl;
          return;
        }

        throw new Error('Платіжне посилання не отримано від Stripe.');
      } else {
        // Консультація — пряма відправка форми в Google Таблицю
        if (url) {
          const response = await fetch(url, {
            method: 'POST',
            body: formData,
          });
          if (!response.ok) {
            throw new Error('Server error');
          }
        }
        recordSuccessfulSubmission();
        setStatus({
          type: 'success',
          message: wm.consultationSuccessDesc || "Найближчим часом менеджер зв'яжеться з вами.",
        });
        setTimeout(() => {
          handleCloseAndReset();
        }, 3500);
      }
    } catch (err) {
      console.error(err);
      setStatus({
        type: 'error',
        message: err.message || wm.errorGeneral,
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
    setHoneypot('');
    setComment('');

    setType('turnkey');
    setDays(1);
    setHours(2);
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
            className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#3d362e] text-white transition hover:bg-[#51473c] cursor-pointer"
            aria-label={wm.closeBtn || 'Закрити'}
          >
            <Xmark className="w-5 h-5" />
          </button>

          <div className="p-6 sm:p-8">
            {status.type === 'success' ? (
              <div className="py-10 text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#c6ab84]/30">
                  <Check className="w-8 h-8 text-[#8b6d47]" />
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
                    <Cart className="w-3.5 h-3.5 text-[#806747]" />
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
                  {/* СКРЫТАЯ ЛОВУШКА ДЛЯ БОТОВ (HONEYPOT) */}
                  <input
                    type="text"
                    name="company_website_confirm"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="opacity-0 absolute -top-[9999px] left-[9999px] h-0 w-0 pointer-events-none"
                  />

                  {/* 4 ФОРМАТА ЗАКАЗА: ПОД КЛЮЧ / АРЕНДА / ПОКУПКА / КОНСУЛЬТАЦИЯ */}
                  <div>
                    <label className="mb-2 block text-sm font-bold">
                      {wm.formatLabel}
                    </label>

                    <div className={`grid ${isPuzzleOnly ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-4'} gap-2 sm:gap-2.5`}>
                      {!isPuzzleOnly && (
                        <>
                          <button
                            type="button"
                            onClick={() => {
                              setType('turnkey');
                              setDelivery(false);
                            }}
                            className={`rounded-2xl border p-3 sm:p-3.5 text-left transition cursor-pointer flex flex-col justify-between ${
                              type === 'turnkey'
                                ? 'border-[#3d362e] bg-[#3d362e] text-white shadow-md'
                                : 'border-[#d5c4aa] bg-white hover:border-[#b99a70]'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-sm sm:text-base font-black">
                                {wm.turnkeyOption || 'Під ключ'}
                              </span>
                              <span className="text-[10px] font-bold bg-amber-400 text-zinc-950 px-1.5 py-0.5 rounded">
                                Хіт
                              </span>
                            </div>
                            <div className="mt-1 text-[11px] opacity-80 leading-tight">
                              {wm.turnkeySub || 'З аніматорами'}
                            </div>
                          </button>

                          <button
                            type="button"
                            onClick={() => setType('rental')}
                            className={`rounded-2xl border p-3 sm:p-3.5 text-left transition cursor-pointer flex flex-col justify-between ${
                              type === 'rental'
                                ? 'border-[#3d362e] bg-[#3d362e] text-white shadow-md'
                                : 'border-[#d5c4aa] bg-white hover:border-[#b99a70]'
                            }`}
                          >
                            <div className="text-sm sm:text-base font-black">
                              {wm.rentalOption}
                            </div>
                            <div className="mt-1 text-[11px] opacity-80 leading-tight">
                              {wm.rentalSub}
                            </div>
                          </button>
                        </>
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          setType('purchase');
                          setDelivery(false);
                        }}
                        className={`rounded-2xl border p-3 sm:p-3.5 text-left transition cursor-pointer flex flex-col justify-between ${
                          type === 'purchase'
                            ? 'border-[#3d362e] bg-[#3d362e] text-white shadow-md'
                            : 'border-[#d5c4aa] bg-white hover:border-[#b99a70]'
                        }`}
                      >
                        <div className="text-sm sm:text-base font-black">
                          {wm.purchaseOption}
                        </div>
                        <div className="mt-1 text-[11px] opacity-80 leading-tight">
                          {wm.purchaseSub}
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setType('consultation');
                          setDelivery(false);
                        }}
                        className={`rounded-2xl border p-3 sm:p-3.5 text-left transition cursor-pointer flex flex-col justify-between ${
                          type === 'consultation'
                            ? 'border-[#3d362e] bg-[#3d362e] text-white shadow-md'
                            : 'border-[#d5c4aa] bg-white hover:border-[#b99a70]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm sm:text-base font-black">
                            {wm.consultationOption || 'Консультація'}
                          </span>
                          <span className="text-[10px] font-bold bg-emerald-600 text-white px-1.5 py-0.5 rounded">
                            0 zł (0 €)
                          </span>
                        </div>
                        <div className="mt-1 text-[11px] opacity-80 leading-tight">
                          {wm.consultationSub || 'Безкоштовно'}
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* БАННЕР БЕЗКОШТОВНОЇ КОНСУЛЬТАЦІЇ */}
                  {type === 'consultation' && (
                    <div className="p-4 sm:p-5 rounded-2xl bg-[#ede3d1] border border-[#d6c4aa] space-y-2">
                      <div className="font-extrabold text-[#3d362e] text-base flex items-center gap-2">
                        <ChatBubble className="w-4 h-4 text-emerald-700 shrink-0" />
                        <span>{wm.consultationBannerTitle || 'Безкоштовна консультація'}</span>
                        <span className="text-[10px] font-bold bg-emerald-600 text-white px-2 py-0.5 rounded-full">
                          0 zł
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#63513e] leading-relaxed">
                        {wm.consultationBannerDesc || "Заповніть ваші контакти — наш менеджер зв'яжеться з вами найближчим часом, проконсультує щодо вибору ігор та відповість на будь-які запитання."}
                      </p>
                    </div>
                  )}

                  {type !== 'consultation' && (
                    <>
                      {/* ПОДСКАЗКА ДЛЯ РЕЖИМА "ПОД КЛЮЧ" */}
                      {type === 'turnkey' && (
                        <div className="p-3.5 rounded-2xl bg-[#ede3d1] border border-[#d6c4aa] text-xs space-y-1.5">
                      <div className="font-bold text-[#3d362e] flex items-center gap-1.5">
                        <Spark className="w-4 h-4 text-[#8b6d47] shrink-0" />
                        <span>{wr.turnkeyBadge || 'Комплексне обслуговування "Під ключ"'}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 text-[11px] text-[#63513e]">
                        <span className="bg-white/80 px-2 py-0.5 rounded border border-[#dacab4]">
                          {wr.turnkeyRules?.jenga || '🧱 Велика Дженга = 2 гри'}
                        </span>
                        <span className="bg-white/80 px-2 py-0.5 rounded border border-[#dacab4]">
                          {wr.turnkeyRules?.iqPuzzle || '🧩 IQ Puzzle (5 шт.) = 1 гра'}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* СПИСОК ДОБАВЛЕННЫХ ИГР В КОРЗИНУ */}
                  <div ref={gamesListRef} className="rounded-2xl border border-[#d5c4aa] bg-[#fbf7f0] p-4 sm:p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Box className="w-4 h-4 text-[#8b6d47] shrink-0" />
                        <span className="text-sm font-bold text-[#302b26]">
                          {t.cart.selectedGames?.replace('{count}', cart.length.toString()) || `Вибрані ігри (${cart.length})`}
                        </span>
                      </div>

                      {(type === 'rental' || type === 'turnkey') && cart.length > 0 && (
                        <span className="text-xs font-bold text-[#8b6d47] bg-[#eee4d4] px-2.5 py-1 rounded-full">
                          {t.cart.totalEquivalent?.replace('{count}', calculatedRentalCount.toString()) || `Еквівалент: ${calculatedRentalCount} ігор`}
                        </span>
                      )}
                    </div>

                    {cart.length > 0 ? (
                      <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                        {cart.map((game) => {
                          const localized = allGames.find((ag) => ag.id === game.id);
                          const isChess = game.id === 'chess';
                          const isPuzzle = game.id === 'woodPuzzle';
                          const pMeta = WOOD_GAMES_METADATA.find((m) => m.id === 'woodPuzzle');
                          const sObj = pMeta?.puzzleSizes?.find((s) => s.id === puzzleSize);
                          const gameImage = isPuzzle && (puzzleImage || sObj?.image)
                            ? (puzzleImage || sObj.image)
                            : game.image;

                          const baseName = localized ? localized.name : game.name;
                          const displayName = (type === 'purchase' && isChess)
                            ? `${baseName} (${chessSize === '30x60' ? '30×60 см — 950 zł' : '25×50 см — 730 zł'})`
                            : (type === 'purchase' && isPuzzle)
                            ? `${baseName} (${puzzleSize.toUpperCase()} — ${puzzleSize === 'a1' ? '200 zł' : puzzleSize === 'a3' ? '100 zł' : '80 zł'})`
                            : baseName;
                          const displayTag = localized ? localized.tag : game.tag;

                          return (
                            <div
                              key={game.id || game.name}
                              className="flex items-center justify-between gap-3 p-3 rounded-xl bg-white border border-[#ded1bd] shadow-sm hover:border-[#b99a70] transition"
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <button
                                  type="button"
                                  onClick={() => setPreviewImage(gameImage)}
                                  className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-[#d8c9b2] group cursor-pointer"
                                  title={t.cart.viewPhoto}
                                >
                                  <img
                                    src={gameImage}
                                    alt={displayName}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                                  />
                                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs transition-opacity">
                                    <Search className="w-4 h-4 text-white" />
                                  </div>
                                </button>

                                <div className="min-w-0">
                                  <h4 className="font-bold text-sm text-[#302b26] truncate">
                                    {displayName}
                                  </h4>
                                  <div className="flex items-center gap-2 text-xs text-[#806f5c]">
                                    <span>{displayTag || 'Дерев’яна гра'}</span>
                                    {game.isMegaJenga && (
                                      <span className="font-bold text-[#b45309] bg-[#fef3c7] px-1.5 py-0.5 rounded text-[10px]">
                                        {t.cart.megaJengaBadge || '🧱 = 2'}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={() => removeFromCart(game.id || game.name)}
                                className="shrink-0 p-2 rounded-lg text-zinc-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                                title={t.cart.removeBtn}
                              >
                                <Xmark className="w-4 h-4" />
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="py-4 text-center">
                        <p className="text-xs text-[#8b765e] mb-2">
                          {t.cart.emptyDesc}
                        </p>
                      </div>
                    )}

                    {/* Быстрое добавление других игр */}
                    <div className="mt-3 pt-3 border-t border-[#ded1bd]">
                      <div className="text-xs font-bold text-[#806f5c] mb-2">
                        + {t.cart.addToCart || 'Додати ігри до замовлення'}:
                      </div>
                      <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto">
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

                  {/* ВЫБОР РАЗМЕРА ШАХМАТ ПРИ ПОКУПКЕ */}
                  {type === 'purchase' && (cart.some(c => c.id === 'chess') || selectedGame === 'chess' || allGames.find(g => g.name === selectedGame)?.id === 'chess') && (
                    <div className="rounded-2xl border border-amber-400/40 bg-amber-400/10 p-4 sm:p-5">
                      <div className="flex items-center justify-between mb-2.5">
                        <span className="text-xs font-bold text-[#302b26] uppercase tracking-wide">
                          {lang === 'pl' ? 'Wybierz rozmiar szachów:' : lang === 'en' ? 'Select chess size:' : 'Оберіть розмір шахів:'}
                        </span>
                        <span className="text-[11px] font-semibold text-amber-900 bg-amber-400/30 px-2.5 py-0.5 rounded-full">
                          {chessSize === '30x60' ? '30×60 см — 950 zł' : '25×50 см — 730 zł'}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2.5">
                        <button
                          type="button"
                          onClick={() => setChessSize('25x50')}
                          className={`p-3 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                            chessSize === '25x50'
                              ? 'bg-[#3d362e] text-white border-[#3d362e] shadow-md ring-2 ring-amber-400/50'
                              : 'bg-white text-[#3d362e] border-[#ded1bd] hover:border-[#b99a70]'
                          }`}
                        >
                          <div className="text-sm font-bold">25×50 см</div>
                          <div className="mt-1 text-xs opacity-90 font-medium">{formatPrice(730)}</div>
                        </button>
                        <button
                          type="button"
                          onClick={() => setChessSize('30x60')}
                          className={`p-3 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                            chessSize === '30x60'
                              ? 'bg-[#3d362e] text-white border-[#3d362e] shadow-md ring-2 ring-amber-400/50'
                              : 'bg-white text-[#3d362e] border-[#ded1bd] hover:border-[#b99a70]'
                          }`}
                        >
                          <div className="text-sm font-bold">30×60 см</div>
                          <div className="mt-1 text-xs opacity-90 font-medium">{formatPrice(950)}</div>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* ВЫБОР РАЗМЕРА И КАРТИНКИ ПАЗЛОВ ПРИ ПОКУПКЕ */}
                  {type === 'purchase' && (cart.some(c => c.id === 'woodPuzzle') || selectedGame === 'woodPuzzle' || allGames.find(g => g.name === selectedGame)?.id === 'woodPuzzle') && (() => {
                    const pMeta = WOOD_GAMES_METADATA.find(m => m.id === 'woodPuzzle');
                    const sObj = pMeta?.puzzleSizes?.find(s => s.id === puzzleSize);
                    const currentImg = puzzleImage || sObj?.image;

                    return (
                      <div className="rounded-2xl border border-amber-400/40 bg-amber-400/10 p-4 sm:p-5">
                        <div className="flex items-center justify-between mb-2.5">
                          <span className="text-xs font-bold text-[#302b26] uppercase tracking-wide">
                            {lang === 'pl' ? 'Wybierz rozmiar drewnianych puzzli:' : lang === 'en' ? 'Select puzzle size:' : "Оберіть розмір дерев'яних пазлів:"}
                          </span>
                          <span className="text-[11px] font-semibold text-amber-900 bg-amber-400/30 px-2.5 py-0.5 rounded-full">
                            {puzzleSize.toUpperCase()} — {formatPrice(puzzleSize === 'a1' ? 200 : puzzleSize === 'a3' ? 100 : 80)}
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 sm:gap-2.5 mb-3">
                          <button
                            type="button"
                            onClick={() => {
                              setPuzzleSize('a4');
                              const s = pMeta?.puzzleSizes?.find(x => x.id === 'a4');
                              if (s?.image) setPuzzleImage(s.image);
                            }}
                            className={`p-2.5 sm:p-3 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                              puzzleSize === 'a4'
                                ? 'bg-[#3d362e] text-white border-[#3d362e] shadow-md ring-2 ring-amber-400/50'
                                : 'bg-white text-[#3d362e] border-[#ded1bd] hover:border-[#b99a70]'
                            }`}
                          >
                            <div className="text-xs sm:text-sm font-bold">A4</div>
                            <div className="text-[10px] opacity-75">21×30 см</div>
                            <div className="mt-1 text-xs opacity-90 font-medium">{formatPrice(80)}</div>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setPuzzleSize('a3');
                              const s = pMeta?.puzzleSizes?.find(x => x.id === 'a3');
                              if (s?.image) setPuzzleImage(s.image);
                            }}
                            className={`p-2.5 sm:p-3 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                              puzzleSize === 'a3'
                                ? 'bg-[#3d362e] text-white border-[#3d362e] shadow-md ring-2 ring-amber-400/50'
                                : 'bg-white text-[#3d362e] border-[#ded1bd] hover:border-[#b99a70]'
                            }`}
                          >
                            <div className="text-xs sm:text-sm font-bold">A3</div>
                            <div className="text-[10px] opacity-75">30×42 см</div>
                            <div className="mt-1 text-xs opacity-90 font-medium">{formatPrice(100)}</div>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setPuzzleSize('a1');
                              const s = pMeta?.puzzleSizes?.find(x => x.id === 'a1');
                              if (s?.image) setPuzzleImage(s.image);
                            }}
                            className={`p-2.5 sm:p-3 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                              puzzleSize === 'a1'
                                ? 'bg-[#3d362e] text-white border-[#3d362e] shadow-md ring-2 ring-amber-400/50'
                                : 'bg-white text-[#3d362e] border-[#ded1bd] hover:border-[#b99a70]'
                            }`}
                          >
                            <div className="text-xs sm:text-sm font-bold">A1</div>
                            <div className="text-[10px] opacity-75">60×84 см</div>
                            <div className="mt-1 text-xs opacity-90 font-medium">{formatPrice(200)}</div>
                          </button>
                        </div>

                        {/* Preview and pattern gallery */}
                        <div className="flex items-center gap-3 pt-2.5 border-t border-amber-400/20">
                          {currentImg && (
                            <img
                              src={currentImg}
                              alt="Puzzle Preview"
                              onClick={() => setPreviewImage(currentImg)}
                              className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-lg border border-amber-400/40 cursor-pointer shadow-sm hover:scale-105 transition-transform"
                              title={t.cart?.viewPhoto || 'Збільшити фото'}
                            />
                          )}
                          <div className="text-xs text-[#302b26] min-w-0 flex-1">
                            <span className="font-bold block truncate">
                              {puzzleSize === 'a1'
                                ? '«Вишивана карта України» (A1)'
                                : puzzleSize === 'a3'
                                ? '«Місто-герой Київ / Херсон» (A3)'
                                : '«Етнічний Вовк / Київ / Херсон» (A4)'}
                            </span>
                            <span className="text-[11px] opacity-80 block">
                              {formatPrice(puzzleSize === 'a1' ? 200 : puzzleSize === 'a3' ? 100 : 80)}
                            </span>
                            {sObj?.gallery && sObj.gallery.length > 1 && (
                              <div className="flex gap-1.5 mt-1.5 overflow-x-auto pb-0.5">
                                {sObj.gallery.map((gImg, gIdx) => (
                                  <button
                                    key={gIdx}
                                    type="button"
                                    onClick={() => setPuzzleImage(gImg)}
                                    className={`w-7 h-7 rounded border overflow-hidden cursor-pointer transition shrink-0 ${
                                      (puzzleImage || sObj.image) === gImg
                                        ? 'border-amber-600 ring-2 ring-amber-500/50'
                                        : 'border-zinc-300 opacity-60 hover:opacity-100'
                                    }`}
                                  >
                                    <img src={gImg} alt="" className="w-full h-full object-cover" />
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  {/* ВЫБОР ДЛИТЕЛЬНОСТИ: ЧАСЫ (ДЛЯ ПОД КЛЮЧ) ИЛИ ДНИ (ДЛЯ АРЕНДЫ) */}
                  {type === 'turnkey' && (
                    <div>
                      <label className="mb-2 block text-sm font-bold">
                        {wm.hoursLabel || 'Тривалість заходу'}
                      </label>
                      <div className="grid grid-cols-5 gap-2">
                        {[1, 2, 3, 4, 5].map((h) => (
                          <button
                            key={h}
                            type="button"
                            onClick={() => setHours(h)}
                            className={`rounded-xl border py-3 text-xs sm:text-sm font-bold cursor-pointer transition ${
                              hours === h
                                ? 'border-[#3d362e] bg-[#3d362e] text-white shadow-sm'
                                : 'border-[#d5c4aa] bg-white hover:border-[#b99a70]'
                            }`}
                          >
                            {h} {wr.hourUnit || 'год.'}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

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

                  {/* ДОСТАВКА (ТОЛЬКО ДЛЯ ПОСУТОЧНОЙ АРЕНДЫ) */}
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
                          +{formatPrice(100)}
                        </div>
                      </div>
                    </label>
                  )}

                  {/* ГОРОД */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-bold">
                        {wm.cityLabel} <span className="text-red-500">*</span>
                      </label>
                      {fieldErrors.city && (
                        <span className="text-xs font-bold text-red-600 animate-bounce flex items-center gap-1">
                          <WarningCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{fieldErrors.city}</span>
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
                </>
              )}

              {/* КОНТАКТЫ (ИМЯ + ТЕЛЕФОН) */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-bold">
                          {wm.nameLabel} <span className="text-red-500">*</span>
                        </label>
                        {fieldErrors.name && (
                          <span className="text-xs font-bold text-red-600 animate-bounce flex items-center gap-1">
                            <WarningCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>{fieldErrors.name}</span>
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
                          <span className="text-xs font-bold text-red-600 animate-bounce flex items-center gap-1">
                            <WarningCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>{fieldErrors.phone}</span>
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

                  {/* МЕССЕНДЖЕР: ВЫБОР СОЦСЕТИ + НИК / НОМЕР (ОБЯЗАТЕЛЬНО) */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-bold">
                        {wm.messengerLabel} <span className="text-red-500">*</span>
                      </label>
                      {fieldErrors.messenger && (
                        <span className="text-xs font-bold text-red-600 animate-bounce flex items-center gap-1">
                          <WarningCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{fieldErrors.messenger}</span>
                        </span>
                      )}
                    </div>
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
                        <option value={lang === 'pl' ? 'Telefon' : lang === 'en' ? 'Phone call' : 'Дзвінок'}>
                          {lang === 'pl' ? 'Telefon (rozmowa)' : lang === 'en' ? 'Phone call' : 'Дзвінок'}
                        </option>
                      </select>

                      <input
                        ref={messengerRef}
                        type="text"
                        value={messengerHandle}
                        onChange={(e) => {
                          setMessengerHandle(e.target.value);
                          if (fieldErrors.messenger) {
                            setFieldErrors((prev) => ({ ...prev, messenger: '' }));
                          }
                        }}
                        placeholder={
                          messengerPlatform === 'Instagram'
                            ? '@instagram_nick'
                            : messengerPlatform === 'Telegram'
                            ? '@telegram_nick'
                            : (messengerPlatform === 'Telefon' || messengerPlatform === 'Дзвінок' || messengerPlatform === 'Phone call' || messengerPlatform === 'Звонок')
                            ? (lang === 'pl' ? 'Wygodna godzina na telefon' : lang === 'en' ? 'Preferred call time' : 'Зручний час дзвінка')
                            : wm.messengerHandlePlaceholder || (lang === 'pl' ? '@nick lub numer' : '@username або номер')
                        }
                        className={`sm:col-span-3 rounded-xl bg-white px-4 py-3.5 outline-none text-sm transition-all ${
                          fieldErrors.messenger
                            ? 'border-2 border-red-500 bg-red-50/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]'
                            : 'border border-[#d5c4aa] focus:border-[#96764d]'
                        }`}
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
                      rows={2}
                      placeholder={wm.commentPlaceholder}
                      className="w-full resize-none rounded-xl border border-[#d5c4aa] bg-white px-4 py-3 outline-none focus:border-[#96764d]"
                    />
                  </div>

                  {/* ИТОГОВЫЙ БЛОК */}
                  {type !== 'consultation' ? (
                    <div className="rounded-2xl bg-[#3d362e] p-5 text-[#f7f0e5]">
                      <div className="flex justify-between text-sm text-[#d7cabb]">
                        <span>
                          {type === 'turnkey'
                            ? (wm.turnkeyOption || 'Під ключ')
                            : type === 'rental'
                            ? wm.rentalOption
                            : wm.purchaseOption}
                        </span>
                        <span className="font-bold">
                          {cart.length > 0 ? `${cart.length} ігор` : `${calculatedRentalCount} ігор`}
                        </span>
                      </div>

                      {type === 'turnkey' && (
                        <div className="mt-2 flex justify-between text-sm text-[#d7cabb]">
                          <span>{wm.summaryDuration}</span>
                          <span>{hours} {wr.hourUnit || 'год.'}</span>
                        </div>
                      )}

                      {type === 'rental' && (
                        <div className="mt-2 flex justify-between text-sm text-[#d7cabb]">
                          <span>{wm.summaryDuration}</span>
                          <span>{days === 1 ? wm.day1 : wm.day2}</span>
                        </div>
                      )}

                      <div className="mt-2 flex justify-between text-sm text-[#d7cabb]">
                        <span>{wm.summaryPrice}</span>
                        <span>{price} {currencySymbol} <span className="opacity-80 text-xs font-normal">(~{toEUR(price)} €)</span></span>
                      </div>

                      {type === 'rental' && delivery && (
                        <div className="mt-2 flex justify-between text-sm text-[#d7cabb]">
                          <span>{wm.summaryDelivery}</span>
                          <span>{deliveryPrice} zł <span className="opacity-80 text-xs font-normal">(~{toEUR(deliveryPrice)} €)</span></span>
                        </div>
                      )}

                      <div className="my-4 border-t border-white/10" />

                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold">
                          {wm.summaryTotal}
                        </span>
                        <div className="text-right">
                          <span className="text-3xl font-black text-amber-400">
                            {total} {currencySymbol}
                          </span>
                          <span className="block text-xs font-bold text-amber-400/80">
                            (~{toEUR(total)} €)
                          </span>
                        </div>
                      </div>

                      {/* Уведомление о выборе доставки при покупке */}
                      {type === 'purchase' && (
                        <div className="mt-3.5 p-3 rounded-xl bg-amber-400/15 border border-amber-400/30 text-xs text-amber-200/95 flex items-start gap-2.5">
                          <span className="text-lg leading-none shrink-0">📦</span>
                          <div className="leading-relaxed">
                            <span className="font-bold block text-white mb-0.5">
                              {lang === 'pl' ? 'Wysyłka pocztowa (InPost / Kurier):' : lang === 'en' ? 'Postal Shipping (InPost / Courier):' : 'Поштова доставка (InPost / Кур’єр):'}
                            </span>
                            <span>
                              {lang === 'pl'
                                ? 'Paczkomat InPost (19 zł) lub Kurier DPD (25 zł) oraz wpisanie adresu / kodu paczkomatu nastąpi na kolejnym kroku w Stripe.'
                                : lang === 'en'
                                ? 'InPost Locker (19 zł) or DPD Courier (25 zł) and your delivery address / locker code will be selected on the next Stripe step.'
                                : 'Paczkomat InPost (19 zł) або Кур’єр DPD (25 zł) разом із адресою / номером пачкомату обирається на наступному кроці у Stripe.'}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* ПЛАТЕЖНЫЕ МЕТОДЫ ДЛЯ ВСЕХ ПЛАТНЫХ ФОРМАТОВ (BLIK, КАРТЫ, STRIPE) */}
                      {type !== 'consultation' && (
                        <div className="mt-4 pt-3.5 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs text-[#d7cabb]">
                          <div className="flex items-center gap-1.5 font-medium">
                            <span className="text-amber-400">🔒</span>
                            <span>{lang === 'pl' ? 'Bezpieczna płatność Stripe' : lang === 'en' ? 'Secure Stripe Payment' : 'Безпечна онлайн-оплата'}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="px-1.5 py-0.5 rounded bg-zinc-950 font-black text-[10px] tracking-wider text-amber-400 border border-zinc-700">BLIK</span>
                            <span className="px-1.5 py-0.5 rounded bg-white text-zinc-900 font-bold text-[10px]">Pay</span>
                            <span className="px-1.5 py-0.5 rounded bg-white text-zinc-900 font-bold text-[10px]">GPay</span>
                            <span className="px-1.5 py-0.5 rounded bg-white/20 text-white font-medium text-[10px]">Card</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="rounded-2xl bg-[#3d362e] p-5 text-[#f7f0e5] flex items-center justify-between">
                      <div>
                        <div className="font-extrabold text-base text-white flex items-center gap-2">
                          <ChatBubble className="w-5 h-5 text-emerald-400 shrink-0" />
                          <span>{wm.consultationBannerTitle || 'Безкоштовна консультація'}</span>
                        </div>
                        <div className="mt-1 text-xs text-[#d7cabb]">
                          {wm.consultationSuccessDesc || "Менеджер зв'яжеться з вами найближчим часом"}
                        </div>
                      </div>
                      <span className="text-3xl font-black text-emerald-400">
                        0 zł (0 €)
                      </span>
                    </div>
                  )}

                  {/* КНОПКА ОТПРАВКИ */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 px-6 py-4 font-black text-sm transition-all disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer shadow-lg flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      wm.sendingBtn
                    ) : type === 'consultation' ? (
                      wm.consultationSubmitBtn || 'Замовити безкоштовну консультацію'
                    ) : type === 'purchase' ? (
                      <>
                        <span>🔒</span>
                        <span>
                          {lang === 'pl'
                            ? `Przejdź do kasy: ${total} zł + dostawa (Stripe)`
                            : lang === 'en'
                            ? `Proceed to Checkout: ${total} zł + shipping (Stripe)`
                            : `Перейти до оплати: ${total} zł + доставка (Stripe)`}
                        </span>
                      </>
                    ) : (
                      <>
                        <span>🔒</span>
                        <span>
                          {lang === 'pl'
                            ? `Zapłać teraz ${total} zł (BLIK / Karta)`
                            : lang === 'en'
                            ? `Pay now ${total} zł (BLIK / Card)`
                            : `Сплатити зараз ${total} zł (BLIK / Картка)`}
                        </span>
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Просмотр фото из корзины */}
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
              className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-zinc-900 text-white border border-zinc-700 hover:bg-amber-400 hover:text-zinc-950 transition-all flex items-center justify-center cursor-pointer shadow-lg"
              aria-label="Close preview"
            >
              <Xmark className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}