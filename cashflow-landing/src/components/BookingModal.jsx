import React, { useEffect, useState, useRef } from "react";
import { useLanguage } from "../i18n/LanguageContext";

export function BookingModal({
  isOpen,
  onClose,
  defaultCity,
  selectedTier,
  customPrices,
  prices
}) {
  const { t } = useLanguage();
  const bm = t.bookingModal;

  const currentPrices = customPrices || prices || { test: 120, combo: 150 };

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+48 ");
  const [city, setCity] = useState(defaultCity || "Katowice");
  const [messengerPlatform, setMessengerPlatform] = useState("Telegram");
  const [messengerHandle, setMessengerHandle] = useState("");
  const [participants, setParticipants] = useState(selectedTier === "combo" ? 2 : 1);

  const [placesLeft, setPlacesLeft] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [status, setStatus] = useState({
    type: null,
    message: "",
  });
  const [loading, setLoading] = useState(false);

  // Ссылки для автоматической прокрутки и фокуса к ошибочному полю
  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const cityRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    setName("");
    setPhone("+48 ");
    setMessengerPlatform("Telegram");
    setMessengerHandle("");
    setParticipants(selectedTier === "combo" ? 2 : 1);
    setFieldErrors({});

    setStatus({
      type: null,
      message: "",
    });

    if (defaultCity) {
      setCity(defaultCity);
    }

    loadPlaces();
  }, [isOpen, defaultCity, selectedTier]);

  if (!isOpen) return null;

  async function loadPlaces() {
    try {
      const response = await fetch(import.meta.env.VITE_URL);
      const data = await response.json();
      if (data.success && typeof data.placesLeft === 'number') {
        setPlacesLeft(data.placesLeft);
      }
    } catch {
      // Игнорируем ошибку при фоновой загрузке
    }
  }

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

    if (numbers.length > 0) formatted += numbers.substring(0, 3);
    if (numbers.length > 3) formatted += " " + numbers.substring(3, 6);
    if (numbers.length > 6) formatted += " " + numbers.substring(6, 9);

    setPhone(formatted);
    if (fieldErrors.phone) {
      setFieldErrors((prev) => ({ ...prev, phone: "" }));
    }
  };

  const calculatePrice = () => {
    const singlePrice = Number(currentPrices.test) || 120;
    const doublePrice = Number(currentPrices.combo) || 150;
    return participants === 2 ? doublePrice : singlePrice;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    const digits = phone.replace(/\D/g, "");

    // 1. Проверка имени
    if (!name || name.trim().length < 2) {
      newErrors.name = bm.errorNameRequired || "Wprowadź swoje imię";
    }

    // 2. Проверка телефона
    if (digits.length !== 11) {
      newErrors.phone = bm.errorPhoneRequired || "Wprowadź 9 cyfr numeru (+48 XXX XXX XXX)";
    }

    // 3. Проверка города
    if (!city) {
      newErrors.city = bm.errorCityRequired || "Wybierz miasto";
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
      } else if (newErrors.city) {
        cityRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        cityRef.current?.focus();
      }
      return;
    }

    setFieldErrors({});

    if (placesLeft !== null && placesLeft <= 0) {
      setStatus({
        type: "error",
        message: bm.closedBtn,
      });
      return;
    }

    if (placesLeft !== null && participants > placesLeft) {
      setStatus({
        type: "error",
        message: bm.errorSpots.replace('{spots}', placesLeft),
      });
      return;
    }

    setLoading(true);
    setStatus({ type: null, message: "" });

    // Форматируем соцсеть с приставкой: "Telegram: @nickname" или "Instagram: @nickname"
    const fullMessenger = messengerHandle.trim()
      ? `${messengerPlatform}: ${messengerHandle.trim()}`
      : messengerPlatform;

    try {
      const formData = new URLSearchParams();
      formData.append("orderType", "cashflow");
      formData.append("name", name.trim());
      formData.append("phone", "+" + digits);
      formData.append("messenger", fullMessenger);
      formData.append("city", city);
      formData.append("tier", participants.toString());
      formData.append("price", calculatePrice().toString());

      const response = await fetch(import.meta.env.VITE_URL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Server error");
      }

      setStatus({
        type: "success",
        message: bm.successDesc,
      });

      setTimeout(() => {
        handleCloseAndReset();
      }, 3000);
    } catch {
      setStatus({
        type: "error",
        message: bm.errorGeneral,
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
      <div className="relative w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,0,0,0.7)] max-h-[90vh] overflow-y-auto">
        <button
          onClick={handleCloseAndReset}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-lime-400 transition cursor-pointer"
        >
          ✕
        </button>

        {status.type === "success" ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto rounded-full bg-lime-400/20 flex items-center justify-center mb-5">
              <span className="text-3xl">✅</span>
            </div>

            <h3 className="text-2xl font-bold text-white mb-3">
              {bm.successTitle}
            </h3>

            <p className="text-zinc-400 mb-6">
              {bm.successDesc}
            </p>

            <button
              onClick={handleCloseAndReset}
              className="w-full py-3 rounded-xl bg-lime-400 text-zinc-950 font-bold hover:opacity-90 transition cursor-pointer"
            >
              {bm.closeBtn}
            </button>
          </div>
        ) : (
          <>
            <h3 className="text-2xl font-bold text-white mb-2">
              {bm.title}
            </h3>

            <p className="text-zinc-500 text-sm mb-6">
              {bm.subtitle}
            </p>

            {placesLeft !== null && (
              <div
                className={`mb-5 rounded-xl p-4 border ${
                  placesLeft > 0
                    ? "border-lime-400/30 bg-lime-400/10"
                    : "border-red-500/30 bg-red-500/10"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-zinc-300">{bm.freeSpots}</span>
                  <span
                    className={`font-bold text-lg ${
                      placesLeft > 0 ? "text-lime-400" : "text-red-400"
                    }`}
                  >
                    {placesLeft}
                  </span>
                </div>
              </div>
            )}

            {status.type === "error" && (
              <div className="mb-4 rounded-xl bg-red-500/10 border border-red-500/30 p-3 text-red-300 text-sm">
                {status.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* ИМЯ */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs uppercase font-bold text-zinc-400">
                    {bm.nameLabel} <span className="text-rose-400">*</span>
                  </label>
                  {fieldErrors.name && (
                    <span className="text-xs font-bold text-rose-400 animate-bounce">
                      ⚠️ {fieldErrors.name}
                    </span>
                  )}
                </div>
                <input
                  ref={nameRef}
                  type="text"
                  maxLength={50}
                  placeholder={bm.namePlaceholder}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (fieldErrors.name) {
                      setFieldErrors((prev) => ({ ...prev, name: "" }));
                    }
                  }}
                  className={`w-full rounded-xl bg-zinc-950 px-4 py-3 text-white outline-none transition-all duration-200 ${
                    fieldErrors.name
                      ? "border-2 border-rose-500 bg-rose-950/20 shadow-[0_0_15px_rgba(244,63,94,0.25)]"
                      : "border border-zinc-800 focus:border-lime-400"
                  }`}
                />
              </div>

              {/* ТЕЛЕФОН */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs uppercase font-bold text-zinc-400">
                    {bm.phoneLabel} <span className="text-rose-400">*</span>
                  </label>
                  {fieldErrors.phone && (
                    <span className="text-xs font-bold text-rose-400 animate-bounce">
                      ⚠️ {fieldErrors.phone}
                    </span>
                  )}
                </div>
                <input
                  ref={phoneRef}
                  type="tel"
                  value={phone}
                  onChange={handlePhoneChange}
                  className={`w-full rounded-xl bg-zinc-950 px-4 py-3 text-white outline-none transition-all duration-200 ${
                    fieldErrors.phone
                      ? "border-2 border-rose-500 bg-rose-950/20 shadow-[0_0_15px_rgba(244,63,94,0.25)]"
                      : "border border-zinc-800 focus:border-lime-400"
                  }`}
                />
              </div>

              {/* МЕССЕНДЖЕР: ВЫБОР СОЦСЕТИ + НИК / НОМЕР */}
              <div>
                <label className="block text-xs uppercase font-bold text-zinc-400 mb-1.5">
                  {bm.contactLabel}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                  <select
                    value={messengerPlatform}
                    onChange={(e) => setMessengerPlatform(e.target.value)}
                    className="sm:col-span-2 rounded-xl bg-zinc-950 border border-zinc-800 px-3 py-3 text-white outline-none focus:border-lime-400 text-xs font-semibold cursor-pointer"
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
                        : bm.messengerHandlePlaceholder || '@username или номер'
                    }
                    className="sm:col-span-3 rounded-xl bg-zinc-950 border border-zinc-800 px-3.5 py-3 text-white outline-none focus:border-lime-400 text-sm"
                  />
                </div>
              </div>

              {/* ГОРОД */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs uppercase font-bold text-zinc-400">
                    {bm.cityLabel} <span className="text-rose-400">*</span>
                  </label>
                  {fieldErrors.city && (
                    <span className="text-xs font-bold text-rose-400 animate-bounce">
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
                      setFieldErrors((prev) => ({ ...prev, city: "" }));
                    }
                  }}
                  className={`w-full rounded-xl bg-zinc-950 px-3 py-3 text-white outline-none transition-all duration-200 cursor-pointer ${
                    fieldErrors.city
                      ? "border-2 border-rose-500 bg-rose-950/20"
                      : "border border-zinc-800 focus:border-lime-400"
                  }`}
                >
                  <option value="Katowice">Katowice</option>
                  <option value="Kraków">Kraków</option>
                  <option value="Wrocław">Wrocław</option>
                  <option value="Warszawa">Warszawa</option>
                </select>
              </div>

              {/* ВЫБОР ПЛАНА */}
              <div>
                <label className="block text-xs uppercase font-bold text-zinc-400 mb-1.5">
                  {bm.planLabel}
                </label>
                <select
                  value={participants}
                  onChange={(e) => setParticipants(Number(e.target.value))}
                  className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-3 py-3 text-white outline-none focus:border-lime-400 cursor-pointer"
                >
                  <option value={1}>
                    {bm.participant1} — {currentPrices.test || 120} zł
                  </option>
                  <option value={2}>
                    {bm.participant2} — {currentPrices.combo || 150} zł
                  </option>
                </select>
              </div>

              <div className="rounded-xl bg-zinc-950 border border-zinc-800 p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-zinc-400">{bm.participantsSummary}</span>
                  <span className="text-white font-bold">{participants}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-zinc-400">{bm.costSummary}</span>
                  <span className="text-lime-400 font-bold text-xl">
                    {calculatePrice()} zł
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={
                  loading || (placesLeft !== null && placesLeft <= 0)
                }
                className="w-full py-4 rounded-xl bg-lime-400 text-zinc-950 font-bold hover:opacity-90 disabled:opacity-50 transition shadow-lg cursor-pointer"
              >
                {loading
                  ? bm.sendingBtn
                  : placesLeft !== null && placesLeft <= 0
                  ? bm.closedBtn
                  : bm.submitBtn}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}