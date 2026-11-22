/**
 * =========================================================================
 * CURRENCY SERVICE: Динамический курс валют (PLN <-> EUR)
 * =========================================================================
 * Источник: Официальный API Национального Банка Польши (Narodowy Bank Polski - NBP).
 * Официальный, бесплатный, без необходимости API-ключей.
 * Обновляется банком каждый рабочий день около 12:00 по варшавскому времени.
 */

const NBP_API_URL = 'https://api.nbp.pl/api/exchangerates/rates/a/eur/?format=json';
const CACHE_KEY = 'nbp_eur_pln_rate_v1';
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 час кэша в браузере

// Резервный курс по умолчанию, если нет интернета
const FALLBACK_EUR_RATE = 4.35;

let memoryRate = null;
let lastFetchTime = 0;

/**
 * Получить актуальный официальный курс EUR/PLN из NBP
 * @returns {Promise<{ rate: number, date: string, source: string, formatted: string }>}
 */
export async function getLiveExchangeRate() {
  const now = Date.now();

  // 1. Проверяем память
  if (memoryRate && now - lastFetchTime < CACHE_TTL_MS) {
    return memoryRate;
  }

  // 2. Проверяем localStorage
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (now - parsed.timestamp < CACHE_TTL_MS && parsed.rate > 3.0 && parsed.rate < 6.0) {
        memoryRate = parsed.data;
        lastFetchTime = parsed.timestamp;
        return memoryRate;
      }
    }
  } catch (e) {
    // игнорируем ошибку чтения storage
  }

  // 3. Запрашиваем свежий курс у Narodowy Bank Polski
  try {
    const response = await fetch(NBP_API_URL, {
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`NBP API error: ${response.status}`);
    }

    const data = await response.json();
    const midRate = data?.rates?.[0]?.mid;
    const effectiveDate = data?.rates?.[0]?.effectiveDate || new Date().toISOString().slice(0, 10);

    if (typeof midRate === 'number' && midRate > 3.0 && midRate < 6.0) {
      const result = {
        rate: midRate,
        roundedRate: Math.round(midRate * 100) / 100,
        date: effectiveDate,
        source: 'Narodowy Bank Polski (NBP)',
        formatted: `1 € = ${midRate.toFixed(2)} zł`,
      };

      memoryRate = result;
      lastFetchTime = now;

      try {
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ timestamp: now, data: result })
        );
      } catch (e) {}

      return result;
    }
  } catch (err) {
    console.warn('⚠️ [CurrencyService] Не удалось получить курс NBP, используем резервный:', err.message);
  }

  // 4. Fallback если API недоступно
  const fallbackResult = {
    rate: FALLBACK_EUR_RATE,
    roundedRate: FALLBACK_EUR_RATE,
    date: new Date().toISOString().slice(0, 10),
    source: 'Fallback',
    formatted: `1 € = ${FALLBACK_EUR_RATE.toFixed(2)} zł`,
  };

  memoryRate = fallbackResult;
  return fallbackResult;
}

/**
 * Конвертация PLN в EUR по живому курсу
 * @param {number|string} plnAmount Сумма в злотых
 * @param {number|object} [customRate] Опциональный курс или объект курса
 * @returns {number} Округленная сумма в EUR
 */
export function convertPLNtoEUR(plnAmount, customRate) {
  let rate = customRate;
  if (typeof customRate === 'object' && customRate !== null) {
    rate = customRate.rate || customRate.roundedRate;
  }
  rate = Number(rate) || memoryRate?.rate || FALLBACK_EUR_RATE;

  const cleanNum = typeof plnAmount === 'string'
    ? parseFloat(plnAmount.replace(/[^\d.,]/g, '').replace(',', '.'))
    : Number(plnAmount);

  if (!cleanNum || isNaN(cleanNum)) return 0;
  return Math.round(cleanNum / rate);
}

/**
 * Форматирование двойной цены: "950 zł (~216 €)"
 * @param {number|string} plnAmount
 * @param {number|object} [customRate]
 * @returns {string}
 */
export function formatDualPrice(plnAmount, customRate) {
  const cleanNum = typeof plnAmount === 'string'
    ? parseFloat(plnAmount.replace(/[^\d.,]/g, '').replace(',', '.'))
    : Number(plnAmount);
  const num = isNaN(cleanNum) ? 0 : cleanNum;
  const eur = convertPLNtoEUR(num, customRate);
  return `${num} zł (~${eur} €)`;
}
