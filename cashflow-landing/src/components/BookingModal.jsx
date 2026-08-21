import React, { useState, useEffect } from "react";

export function BookingModal({
  isOpen,
  onClose,
  selectedTier,
  defaultCity,
}) {
  const MAX_PARTICIPANTS = 8;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+48 ");
  const [city, setCity] = useState("Katowice");
  const [messenger, setMessenger] = useState("telegram");
  const [participants, setParticipants] = useState(1);

  const [placesLeft, setPlacesLeft] = useState(null);

  const [status, setStatus] = useState({
    type: null,
    message: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    setName("");
    setPhone("+48 ");
    setParticipants(1);

    setStatus({
      type: null,
      message: "",
    });

    if (defaultCity) {
      setCity(defaultCity);
    }

    loadPlaces();
  }, [isOpen, defaultCity]);

  if (!isOpen) return null;

  async function loadPlaces() {
    try {
      const response = await fetch(
       import.meta.env.VITE_URL
      );

      const data = await response.json();

      if (typeof data.placesLeft === "number") {
        setPlacesLeft(data.placesLeft);
      }
    } catch (err) {
      console.error(err);
    }
  }
const calculatePrice = () => {
  if (participants === 1) {
    return 100;
  }

  return 150;
};
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

    if (numbers.length > 0)
      formatted += numbers.substring(0, 3);

    if (numbers.length > 3)
      formatted += " " + numbers.substring(3, 6);

    if (numbers.length > 6)
      formatted += " " + numbers.substring(6, 9);

    setPhone(formatted);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const digits = phone.replace(/\D/g, "");

    if (digits.length !== 11) {
      setStatus({
        type: "error",
        message: "Введите корректный польский номер телефона.",
      });

      return;
    }

    if (placesLeft !== null && participants > placesLeft) {
      setStatus({
        type: "error",
        message: `Осталось только ${placesLeft} мест.`,
      });

      return;
    }

    setLoading(true);

    try {
      const formData = new URLSearchParams();

      formData.append("name", name);

      formData.append(
        "phone",
        "+" + digits
      );

      formData.append(
        "messenger",
        messenger
      );

      formData.append(
        "city",
        city
      );

formData.append(
  "tier",
  participants === 1
    ? "1"
    : "2"
);

      formData.append(
        "participants",
        participants
      );

    const url = import.meta.env.VITE_URL;

const response = await fetch(url, {
  method: "POST",
  body: formData,
});

      if (!response.ok) {
        throw new Error("Ошибка сервера");
      }

      setStatus({
        type: "success",
        message: "Заявка успешно отправлена.",
      });

      loadPlaces();

      setTimeout(() => {
        handleCloseAndReset();
      }, 3000);

    } catch (err) {

      console.error(err);

      setStatus({
        type: "error",
        message: "Не удалось отправить заявку.",
      });

    } finally {

      setLoading(false);

    }
  };

  const handleCloseAndReset = () => {
    setStatus({
      type: null,
      message: "",
    });

    setName("");
    setPhone("+48 ");
    setParticipants(1);

    onClose();
  };
    return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-[0_0_50px_rgba(0,0,0,0.7)] max-h-[90vh] overflow-y-auto">

        <button
          onClick={handleCloseAndReset}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-lime-400 transition"
        >
          ✕
        </button>

        {status.type === "success" ? (
          <div className="text-center py-8">

            <div className="w-16 h-16 mx-auto rounded-full bg-lime-400/20 flex items-center justify-center mb-5">
              <span className="text-3xl">✅</span>
            </div>

            <h3 className="text-2xl font-bold text-white mb-3">
              Заявка отправлена
            </h3>

            <p className="text-zinc-400 mb-6">
              Спасибо! Мы свяжемся с вами в ближайшее время для подтверждения участия.
            </p>

            <button
              onClick={handleCloseAndReset}
              className="w-full py-3 rounded-xl bg-lime-400 text-zinc-950 font-bold hover:opacity-90 transition"
            >
              Закрыть
            </button>

          </div>
        ) : (
          <>
            <h3 className="text-2xl font-bold text-white mb-2">
              Забронировать место
            </h3>

            <p className="text-zinc-500 text-sm mb-6">
              Заполните форму, и мы свяжемся с вами.
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
                  <span className="text-zinc-300">
                    Свободных мест
                  </span>

                  <span
                    className={`font-bold text-lg ${
                      placesLeft > 0
                        ? "text-lime-400"
                        : "text-red-400"
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

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >

              <div>
                <label className="block text-xs uppercase text-zinc-500 mb-2">
                  Имя
                </label>

                <input
                  required
                  value={name}
                  maxLength={50}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Александр"
                  className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-4 py-3 text-white outline-none focus:border-lime-400"
                />
              </div>

              <div>
                <label className="block text-xs uppercase text-zinc-500 mb-2">
                  Телефон
                </label>

                <input
                  type="tel"
                  value={phone}
                  onChange={handlePhoneChange}
                  className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-4 py-3 text-white outline-none focus:border-lime-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">

                <div>
                  <label className="block text-xs uppercase text-zinc-500 mb-2">
                    Связь
                  </label>

                  <select
                    value={messenger}
                    onChange={(e) => setMessenger(e.target.value)}
                    className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-3 py-3 text-white"
                  >
                    <option value="telegram">Telegram</option>
                    <option value="instagram">Instagram</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="call">Звонок</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase text-zinc-500 mb-2">
                    Город
                  </label>

                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-3 py-3 text-white"
                  >
                    <option value="Katowice">
                      Katowice
                    </option>

                    <option value="Kraków">
                      Kraków
                    </option>

                    <option value="Wrocław">
                      Wrocław
                    </option>
                  </select>
                </div>

              </div>

              <div>
                <label className="block text-xs uppercase text-zinc-500 mb-2">
                  Выбор плана
                </label>
            <select
  value={participants}
  onChange={(e)=>setParticipants(Number(e.target.value))}
  className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-3 py-3 text-white"
>

  <option value={1}>
    1 участник — 100 zł
  </option>

  <option value={2}>
    2 участника (с другом) — 150 zł
  </option>

                  {/* {Array.from(
                    { length: MAX_PARTICIPANTS },
                    (_, i) => (
                      <option
                      key={i + 1}
                      value={i + 1}
                      >
                      {i + 1} {i === 0 ? "участник" : "участников"}
                      </option>
                      )
                      )}
                      </select>
              </div> */}
</select>
                      </div>
<div className="rounded-xl bg-zinc-950 border border-zinc-800 p-4">
  <div className="flex justify-between mb-2">
    <span className="text-zinc-400">
      Участники
    </span>

    <span className="text-white font-bold">
      {participants}
    </span>
  </div>


  <div className="flex justify-between">

    <span className="text-zinc-400">
      Стоимость
    </span>

    <span className="text-lime-400 font-bold text-xl">
      {calculatePrice()} zł
    </span>


  </div>

</div>
              <button
                type="submit"
                disabled={
                  loading ||
                  (placesLeft !== null &&
                    placesLeft <= 0)
                }
                className="w-full py-4 rounded-xl bg-gradient-to-r from-lime-400 to-emerald-400 text-zinc-950 font-bold uppercase disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {loading
                  ? "Отправка..."
                  : placesLeft === 0
                  ? "Регистрация закрыта"
                  : "Забронировать"}
              </button>

            </form>
          </>
        )}
      </div>
    </div>
  );
}