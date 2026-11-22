import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import { validateBotSafety, recordSuccessfulSubmission } from "../utils/antiBot";
import { initiatePurchaseCheckout, STRIPE_CONFIG } from "../services/paymentService";
import { Xmark, Check, NavArrowDown } from "iconoir-react";

const cities = [
  "Katowice",
  "Kraków",
  "Wrocław",
  "Warszawa",
  "Gdańsk",
  "Poznań",
  "Inne miasto / Other",
];

const UK_CITY_NAMES = {
  'Katowice': 'Катовіце',
  'Kraków': 'Краків',
  'Wrocław': 'Вроцлав',
  'Warszawa': 'Варшава',
  'Gdańsk': 'Гданськ',
  'Poznań': 'Познань',
  'Inne miasto / Other': 'Інше місто',
};

export function BookingModal({
  isOpen,
  onClose,
  initialParticipants = 1,
  selectedTier = 'test',
  customPrices,
}) {
  const { t, lang } = useLanguage();
  const bm = t.bookingModal || {};

  const singlePrice = customPrices?.test || 120;
  const doublePrice = customPrices?.combo || 200;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+48 ");
  const [messengerPlatform, setMessengerPlatform] = useState("Telegram");
  const [messengerHandle, setMessengerHandle] = useState("");
  const [city, setCity] = useState("Katowice");
  const [participants, setParticipants] = useState(initialParticipants);
  const [loading, setLoading] = useState(false);
  const [placesLeft, setPlacesLeft] = useState(null);

  // Anti-Bot & Anti-Spam state
  const [honeypot, setHoneypot] = useState("");
  const [openedAt, setOpenedAt] = useState(Date.now());

  // Ошибки полей
  const [fieldErrors, setFieldErrors] = useState({});

  const [status, setStatus] = useState({
    type: null,
    message: "",
  });

  // Ссылки для плавной прокрутки и фокуса к проблемному полю
  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const messengerRef = useRef(null);
  const cityRef = useRef(null);

  // Загрузка оставшихся мест и фиксация времени открытия формы
  useEffect(() => {
    if (!isOpen) return;

    setOpenedAt(Date.now());
    setHoneypot("");
    setStatus({ type: null, message: "" });
    setFieldErrors({});

    if (selectedTier === 'combo') {
      setParticipants(2);
    } else {
      setParticipants(initialParticipants || 1);
    }

    fetch(`${import.meta.env.VITE_URL}?action=getPlaces`)
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.placesLeft === "number") {
          setPlacesLeft(data.placesLeft);
        }
      })
      .catch((err) => {
        console.error("Ошибка при получении мест:", err);
      });
  }, [isOpen, selectedTier, initialParticipants]);

  if (!isOpen) return null;

  // Форматирование телефона польского стандарта (+48 XXX XXX XXX)
  const handlePhoneChange = (e) => {
    let value = e.target.value;

    if (!value.startsWith("+48 ")) {
      value = "+48 ";
    }

    const numbers = value
      .replace("+48 ", "")
      .replace(/\D/g, "")
      .slice(0, 9);

    let formatted = "+48 ";

    if (numbers.length > 0) {
      formatted += numbers.substring(0, 3);
    }
    if (numbers.length > 3) {
      formatted += " " + numbers.substring(3, 6);
    }
    if (numbers.length > 6) {
      formatted += " " + numbers.substring(6, 9);
    }

    setPhone(formatted);
    if (fieldErrors.phone) {
      setFieldErrors((prev) => ({ ...prev, phone: "" }));
    }
  };

  const calculatePrice = () => {
    return participants === 2 ? doublePrice : singlePrice;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    const digits = phone.replace(/\D/g, "");

    // 1. Проверка имени
    if (!name || name.trim().length < 2) {
      newErrors.name = bm.errorNameRequired || "Введіть ваше ім’я";
    }

    // 2. Проверка телефона
    if (digits.length !== 11) {
      newErrors.phone = bm.errorPhoneRequired || "Введіть 9 цифр номера (+48 XXX XXX XXX)";
    }

    // 3. Проверка соцсети / мессенджера (ОБЯЗАТЕЛЬНО)
    if (!messengerHandle || messengerHandle.trim().length < 2) {
      newErrors.messenger = bm.errorMessengerRequired || "Вкажіть ваш нікнейм або номер соцмережі";
    }

    // 4. Проверка города
    if (!city) {
      newErrors.city = bm.errorCityRequired || "Оберіть місто";
    }

    // Если есть ошибки — плавно прокручиваем к первой ошибке и ставим фокус
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
      // Бот попался в скрытую ловушку (honeypot): имитируем успех, не засоряя Google Таблицу
      setStatus({
        type: "success",
        message: bm.successDesc || "Заявку надіслано!",
      });
      setTimeout(() => {
        handleCloseAndReset();
      }, 2500);
      return;
    }

    if (botCheck.isBot && botCheck.error) {
      setStatus({
        type: "error",
        message: botCheck.error,
      });
      return;
    }

    setFieldErrors({});

    if (placesLeft !== null && placesLeft <= 0) {
      setStatus({
        type: "error",
        message: bm.closedBtn || "Місць немає",
      });
      return;
    }

    if (placesLeft !== null && participants > placesLeft) {
      setStatus({
        type: "error",
        message: (bm.errorSpots || 'Залишилося лише {spots} місць').replace('{spots}', placesLeft.toString()),
      });
      return;
    }

    setLoading(true);
    setStatus({ type: null, message: "" });

    // Форматируем соцсеть с приставкой: "Telegram: @nickname"
    const fullMessenger = `${messengerPlatform}: ${messengerHandle.trim()}`;

    try {
      const formData = new URLSearchParams();
      formData.append("orderType", "cashflow");
      formData.append("name", name.trim());
      formData.append("phone", "+" + digits);
      formData.append("messenger", fullMessenger);
      formData.append("city", UK_CITY_NAMES[city] || city);
      formData.append("tier", participants === 2 ? "2 учасники" : "1 учасник");
      formData.append("type", participants === 2 ? "2 учасники" : "1 учасник");
      formData.append("participants", participants.toString());
      formData.append("price", `${calculatePrice()} zł`);

      // 1. ЕСЛИ STRIPE АКТИВЕН — ОНЛАЙН-ОПЛАТА БИЛЕТОВ (BLIK / КАРТА)
      if (STRIPE_CONFIG.isEnabled) {
        const ticketPrice = calculatePrice();
        const checkoutItems = [
          {
            name: `Квиток на гру Cashflow (${UK_CITY_NAMES[city] || city})`,
            description: `${participants === 2 ? '2 учасники (Комбо)' : '1 учасник'}. Тренінг Robert Kiyosaki`,
            quantity: 1,
            price: ticketPrice,
          },
        ];

        const checkoutResult = await initiatePurchaseCheckout({
          name: name.trim(),
          phone: "+" + digits,
          messenger: fullMessenger,
          city: UK_CITY_NAMES[city] || city,
          comment: `[Cashflow Club] ${participants === 2 ? '2 учасники' : '1 учасник'}`,
          cartItems: checkoutItems,
          total: ticketPrice,
          currency: 'zł',
        });

        // Резервное сохранение в Google Таблицу
        try {
          formData.append('paymentStatus', checkoutResult.isMock ? '⏳ ОЖИДАЕТ (MOCK STRIPE)' : '⏳ ОЖИДАЕТ (STRIPE)');
          formData.append('orderId', checkoutResult.orderId || '');
          if (import.meta.env.VITE_URL) {
            await fetch(import.meta.env.VITE_URL, { method: "POST", body: formData });
          }
        } catch (sheetErr) {
          console.warn("Backup save warning:", sheetErr);
        }

        recordSuccessfulSubmission();

        if (checkoutResult.isMock) {
          window.location.href = checkoutResult.mockCheckoutUrl;
          return;
        } else if (checkoutResult.checkoutUrl || checkoutResult.url) {
          window.location.href = checkoutResult.checkoutUrl || checkoutResult.url;
          return;
        } else {
          throw new Error(checkoutResult.error || "Помилка ініціалізації оплати");
        }
      }

      // 2. ЕСЛИ STRIPE ОТКЛЮЧЕН — ОБЫЧНАЯ РЕГИСТРАЦИЯ В GOOGLE ТАБЛИЦУ
      try {
        const response = await fetch(import.meta.env.VITE_URL, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
      } catch (sheetErr) {
        throw new Error(`[Google Таблиця]: ${sheetErr.message}`);
      }

      // Фиксируем успешную отправку для rate-limiter
      recordSuccessfulSubmission();

      setStatus({
        type: "success",
        message: bm.successDesc || "Заявку надіслано!",
      });

      setTimeout(() => {
        handleCloseAndReset();
      }, 3000);
    } catch (err) {
      console.error('Booking submission error:', err);
      const specificError = err?.message && err?.message !== 'Server error' ? `: ${err.message}` : '';
      setStatus({
        type: "error",
        message: `${bm.errorGeneral || "Помилка відправки"}${specificError}`,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseAndReset = () => {
    setStatus({ type: null, message: "" });
    setFieldErrors({});
    setName("");
    setPhone("+48 ");
    setMessengerHandle("");
    setHoneypot("");
    setParticipants(1);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          handleCloseAndReset();
        }
      }}
    >
      <div className="relative w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={handleCloseAndReset}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-700 transition cursor-pointer"
        >
          <Xmark className="w-4 h-4" />
        </button>

        {status.type === "success" ? (
          <div className="text-center py-8">
            <div className="w-14 h-14 mx-auto rounded-full bg-lime-400/10 border border-lime-400/20 flex items-center justify-center mb-5">
              <Check className="w-7 h-7 text-lime-400" />
            </div>

            <h3 className="text-2xl font-bold text-white mb-3">
              {bm.successTitle || "Заявку надіслано!"}
            </h3>

            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              {bm.successDesc || "Дякуємо! Ми зв'яжемося з вами найближчим часом."}
            </p>

            <button
              type="button"
              onClick={handleCloseAndReset}
              className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-xl transition cursor-pointer"
            >
              {bm.closeBtn || "Закрити"}
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6 pr-8">
              <h3 className="text-2xl font-bold text-white mb-1">
                {bm.title || "Забронювати місце"}
              </h3>
              <p className="text-zinc-400 text-sm">
                {bm.subtitle || "Заповніть форму, і ми зв’яжемося з вами."}
              </p>

              {placesLeft !== null && (
                <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-950 border border-zinc-800 text-xs">
                  <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
                  <span className="text-zinc-400">{bm.freeSpots || "Вільних місць"}:</span>
                  <span className="font-bold text-lime-400">{placesLeft}</span>
                </div>
              )}
            </div>

            {status.type === "error" && (
              <div className="mb-6 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm flex items-center gap-2">
                <span>⚠️</span>
                <span>{status.message}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* СКРЫТАЯ ЛОВУШКА ДЛЯ БОТОВ (HONEYPOT) */}
              <input
                type="text"
                name="website_contact_confirm"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="opacity-0 absolute -top-[9999px] left-[9999px] h-0 w-0 pointer-events-none"
              />

              {/* ВЫБОР ПЛАНА */}
              <div>
                <label className="block text-xs uppercase font-bold text-zinc-400 mb-1.5">
                  {bm.planLabel || "Вибір плану"}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setParticipants(1)}
                    className={`py-3 px-3 rounded-xl border text-left transition cursor-pointer ${
                      participants === 1
                        ? "bg-lime-400/10 border-lime-400/60 text-white"
                        : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700"
                    }`}
                  >
                    <div className="font-bold text-sm leading-tight mb-1">{bm.participant1 || "1 учасник"}</div>
                    <div className="text-xs text-lime-400 font-extrabold">{singlePrice} zł</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setParticipants(2)}
                    className={`py-3 px-3 rounded-xl border text-left transition cursor-pointer ${
                      participants === 2
                        ? "bg-lime-400/10 border-lime-400/60 text-white"
                        : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700"
                    }`}
                  >
                    <div className="font-bold text-sm leading-tight mb-1">{bm.participant2 || "2 учасники"}</div>
                    <div className="text-xs text-lime-400 font-extrabold">{doublePrice} zł</div>
                  </button>
                </div>
              </div>

              {/* ИМЯ */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs uppercase font-bold text-zinc-400">
                    {bm.nameLabel || "Ім'я"} <span className="text-rose-400">*</span>
                  </label>
                  {fieldErrors.name && (
                    <span className="text-[11px] font-medium text-rose-400">
                      {fieldErrors.name}
                    </span>
                  )}
                </div>
                <input
                  ref={nameRef}
                  type="text"
                  value={name}
                  maxLength={50}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (fieldErrors.name) {
                      setFieldErrors((prev) => ({ ...prev, name: "" }));
                    }
                  }}
                  placeholder={bm.namePlaceholder || "Олександр"}
                  className={`w-full rounded-xl bg-zinc-950 px-4 py-3 text-white outline-none transition-all duration-150 ${
                    fieldErrors.name
                      ? "border border-rose-500 bg-rose-500/5 focus:ring-1 focus:ring-rose-500"
                      : "border border-zinc-800 focus:border-lime-400/60 focus:ring-1 focus:ring-lime-400/20"
                  }`}
                />
              </div>

              {/* ТЕЛЕФОН */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs uppercase font-bold text-zinc-400">
                    {bm.phoneLabel || "Телефон"} <span className="text-rose-400">*</span>
                  </label>
                  {fieldErrors.phone && (
                    <span className="text-[11px] font-medium text-rose-400">
                      {fieldErrors.phone}
                    </span>
                  )}
                </div>
                <input
                  ref={phoneRef}
                  type="tel"
                  value={phone}
                  onChange={handlePhoneChange}
                  className={`w-full rounded-xl bg-zinc-950 px-4 py-3 text-white outline-none transition-all duration-150 ${
                    fieldErrors.phone
                      ? "border border-rose-500 bg-rose-500/5 focus:ring-1 focus:ring-rose-500"
                      : "border border-zinc-800 focus:border-lime-400/60 focus:ring-1 focus:ring-lime-400/20"
                  }`}
                />
              </div>

              {/* МЕССЕНДЖЕР: ВЫБОР СОЦСЕТИ + НИК / НОМЕР (ОБЯЗАТЕЛЬНО) */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs uppercase font-bold text-zinc-400">
                    {bm.contactLabel || "Месенджер"} <span className="text-rose-400">*</span>
                  </label>
                  {fieldErrors.messenger && (
                    <span className="text-[11px] font-medium text-rose-400">
                      {fieldErrors.messenger}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                  <div className="sm:col-span-2 relative">
                    <select
                      value={messengerPlatform}
                      onChange={(e) => setMessengerPlatform(e.target.value)}
                      className="w-full appearance-none rounded-xl bg-zinc-950 border border-zinc-800 px-3 py-3 pr-8 text-white outline-none focus:border-lime-400/60 text-xs font-semibold cursor-pointer"
                    >
                      <option value="Telegram">Telegram</option>
                      <option value="Instagram">Instagram</option>
                      <option value="WhatsApp">WhatsApp</option>
                      <option value="Viber">Viber</option>
                      <option value={lang === 'pl' ? 'Telefon' : lang === 'en' ? 'Phone call' : 'Дзвінок'}>
                        {lang === 'pl' ? 'Telefon (rozmowa)' : lang === 'en' ? 'Phone call' : 'Дзвінок'}
                      </option>
                    </select>
                    <NavArrowDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 w-3.5 h-3.5" />
                  </div>

                  <input
                    ref={messengerRef}
                    type="text"
                    value={messengerHandle}
                    onChange={(e) => {
                      setMessengerHandle(e.target.value);
                      if (fieldErrors.messenger) {
                        setFieldErrors((prev) => ({ ...prev, messenger: "" }));
                      }
                    }}
                    placeholder={
                      messengerPlatform === 'Instagram'
                        ? '@instagram_nick'
                        : messengerPlatform === 'Telegram'
                        ? '@telegram_nick'
                        : (messengerPlatform === 'Telefon' || messengerPlatform === 'Дзвінок' || messengerPlatform === 'Phone call' || messengerPlatform === 'Звонок')
                        ? (lang === 'pl' ? 'Wygodna godzina na telefon' : lang === 'en' ? 'Preferred call time' : 'Зручний час дзвінка')
                        : bm.messengerHandlePlaceholder || (lang === 'pl' ? '@nick lub numer' : '@username або номер')
                    }
                    className={`sm:col-span-3 rounded-xl bg-zinc-950 px-3.5 py-3 text-white outline-none text-sm transition-all duration-150 ${
                      fieldErrors.messenger
                        ? "border border-rose-500 bg-rose-500/5 focus:ring-1 focus:ring-rose-500"
                        : "border border-zinc-800 focus:border-lime-400/60 focus:ring-1 focus:ring-lime-400/20"
                    }`}
                  />
                </div>
              </div>

              {/* ГОРОД */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs uppercase font-bold text-zinc-400">
                    {bm.cityLabel || "Місто"} <span className="text-rose-400">*</span>
                  </label>
                  {fieldErrors.city && (
                    <span className="text-[11px] font-medium text-rose-400">
                      {fieldErrors.city}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <select
                    ref={cityRef}
                    value={city}
                    onChange={(e) => {
                      setCity(e.target.value);
                      if (fieldErrors.city) {
                        setFieldErrors((prev) => ({ ...prev, city: "" }));
                      }
                    }}
                    className={`w-full appearance-none rounded-xl bg-zinc-950 px-4 py-3 pr-10 text-white outline-none transition-all duration-150 cursor-pointer ${
                      fieldErrors.city
                        ? "border border-rose-500 bg-rose-500/5"
                        : "border border-zinc-800 focus:border-lime-400/60 focus:ring-1 focus:ring-lime-400/20"
                    }`}
                  >
                    {cities.map((c) => (
                      <option key={c} value={c} className="bg-zinc-900 text-white">
                        {c}
                      </option>
                    ))}
                  </select>
                  <NavArrowDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4" />
                </div>
              </div>

              {/* ИТОГОВАЯ СТОИМОСТЬ */}
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-xs text-zinc-400 block">{bm.participantsSummary || "Учасники"}</span>
                    <span className="text-sm font-bold text-white">
                      {participants === 2 ? (bm.participant2 || "2 учасники") : (bm.participant1 || "1 учасник")}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-zinc-400 block">{bm.costSummary || "Вартість"}</span>
                    <span className="text-xl font-bold text-lime-400">
                      {calculatePrice()} zł
                    </span>
                  </div>
                </div>

                {/* ПЛАТЕЖНЫЕ МЕТОДЫ (BLIK, КАРТЫ, STRIPE) */}
                {STRIPE_CONFIG.isEnabled && (
                  <div className="mt-3 pt-3 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-400">
                    <div className="flex items-center gap-1.5 font-medium">
                      <span className="text-lime-400">🔒</span>
                      <span>{lang === 'pl' ? 'Bezpieczna płatność Stripe' : lang === 'en' ? 'Secure Stripe Payment' : 'Безпечна онлайн-оплата'}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="px-1.5 py-0.5 rounded bg-zinc-900 font-black text-[10px] tracking-wider text-lime-400 border border-zinc-700">BLIK</span>
                      <span className="px-1.5 py-0.5 rounded bg-white text-zinc-900 font-bold text-[10px]">Pay</span>
                      <span className="px-1.5 py-0.5 rounded bg-white text-zinc-900 font-bold text-[10px]">GPay</span>
                      <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-white font-medium text-[10px]">Card</span>
                    </div>
                  </div>
                )}
              </div>

              {/* КНОПКА ОТПРАВКИ */}
              <button
                type="submit"
                disabled={loading || (placesLeft !== null && placesLeft <= 0)}
                className="w-full py-3.5 bg-lime-400 hover:bg-lime-300 disabled:bg-zinc-800 disabled:text-zinc-600 disabled:cursor-not-allowed text-zinc-950 font-bold rounded-xl transition duration-150 shadow-sm cursor-pointer active:scale-[0.99] flex items-center justify-center gap-2"
              >
                {loading
                  ? (bm.sendingBtn || "Надсилання...")
                  : placesLeft !== null && placesLeft <= 0
                  ? (bm.closedBtn || "Реєстрація закрита")
                  : STRIPE_CONFIG.isEnabled
                  ? (
                    <>
                      <span>🔒</span>
                      <span>
                        {lang === 'pl'
                          ? 'Opłać bilet online (BLIK / Karta)'
                          : lang === 'en'
                          ? 'Pay Ticket Online (BLIK / Card)'
                          : 'Оплатити квиток онлайн (BLIK / Картка)'}
                      </span>
                    </>
                  )
                  : (bm.submitBtn || "Забронювати")}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}