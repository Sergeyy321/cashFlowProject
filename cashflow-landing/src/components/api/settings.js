const API_URL = import.meta.env.VITE_URL;

export async function getSiteSettings() {
  if (!API_URL) {
    return {
      placesLeft: 6,
      event: {
        city: "Warszawa",
        date: "Суббота",
        time: "18:00",
        place: "Business Hub Warsaw",
        spots: 6,
      },
      prices: {
        test: 120,
        combo: 150,
      },
      siteTexts: {
        title: "Cashflow Club Poland",
        subtitle: "Финансовая игра-тренинг",
      },
    };
  }

  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Ошибка загрузки настроек");
  }

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.error || "Не удалось получить настройки");
  }

  const s = data.settings || {};
  const remainingSpots =
    typeof data.placesLeft === "number"
      ? data.placesLeft
      : Number(s.event_spots || 6);

  return {
    placesLeft: remainingSpots,
    event: {
      city: s.event_city || "",
      date: s.event_date || "",
      time: s.event_time || "",
      place: s.event_place || "",
      spots: remainingSpots,
    },

    prices: {
      test: Number(s.price_test || 120),
      combo: Number(s.price_combo || 150),
    },

    siteTexts: {
      title: s.site_title || "",
      subtitle: s.site_subtitle || "",
    },
  };
}