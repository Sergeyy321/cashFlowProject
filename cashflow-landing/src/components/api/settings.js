const API_URL =import.meta.env.VITE_URL;


export async function getSiteSettings() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Ошибка загрузки настроек");
  }

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.error || "Не удалось получить настройки");
  }

  const s = data.settings;

  return {
    event: {
      city: s.event_city || "",
      date: s.event_date || "",
      time: s.event_time || "",
      place: s.event_place || "",
      spots: Number(s.event_spots || 0)
    },

    prices: {
      test: Number(s.price_test || 0),
      combo: Number(s.price_combo || 0)
    },

    siteTexts: {
      title: s.site_title || "",
      subtitle: s.site_subtitle || ""
    }
  };
}