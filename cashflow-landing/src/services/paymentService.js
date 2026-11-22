/**
 * =========================================================================
 * PAYMENT SERVICE (Stripe Architecture Ready)
 * =========================================================================
 * Модуль для управления платежами через Stripe (BLIK, Apple Pay, Google Pay, Карты).
 * 
 * РЕЖИМЫ РАБОТЫ:
 * 1. MOCK / PREVIEW (пока не подключен бэкенд):
 *    - Валидирует заказ, логирует payload в консоль.
 *    - Эмулирует переход на оплату или сразу открывает модалку успешного платежа.
 * 2. LIVE / TEST API (когда добавлен STRIPE_SECRET_KEY):
 *    - Делает запрос на /api/create-checkout-session.
 *    - Выполняет редирект на защищенную платежную страницу Stripe Checkout.
 */

export const STRIPE_CONFIG = {
  // Флаг активации реального Stripe (включите true, когда добавлены ключи)
  isEnabled: import.meta.env.VITE_STRIPE_ENABLED === 'true',
  
  // URL эндпоинта создания сессии (по умолчанию локальная serverless функция /api)
  apiUrl: import.meta.env.VITE_PAYMENT_API_URL || '/api/create-checkout-session',
  
  // Валюта по умолчанию для Польши (PLN поддерживает BLIK, Przelewy24, Apple Pay, Карты)
  defaultCurrency: 'pln',
};

/**
 * Инициация процесса оплаты покупки игр
 * @param {Object} orderData - Данные заказа из WoodIQOrderModal
 * @returns {Promise<{ success: boolean, checkoutUrl?: string, error?: string }>}
 */
export async function initiatePurchaseCheckout(orderData) {
  const {
    name,
    phone,
    messenger,
    city,
    comment,
    cartItems = [],
    total,
    currency = 'zł',
    orderType = 'woodiq_purchase',
  } = orderData;

  // Форматируем валюту для Stripe (pln или eur)
  const stripeCurrency = currency === '€' || currency === 'EUR' ? 'eur' : 'pln';

  // Генерируем уникальный номер заказа для трекинга
  const orderId = `WOODIQ-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

  // Собираем стандартизированный payload для Stripe Checkout
  const checkoutPayload = {
    orderId,
    orderType,
    customer: {
      name: (name || '').trim(),
      phone: (phone || '').trim(),
      messenger: (messenger || '').trim(),
      city: (city || 'Warszawa').trim(),
    },
    items: cartItems.map((item) => ({
      name: item.title || item.name || 'Дерев’яна гра WoodIQ',
      quantity: item.quantity || 1,
      price: item.price || 0,
      image: item.image || '',
      description: item.description || item.dimensions || '',
      dimensions: item.dimensions || '',
      gabaryt: item.gabaryt || '',
    })),
    totalAmount: Number(total) || 0,
    currency: stripeCurrency,
    comment: (comment || '').trim(),
    successUrl: `${window.location.origin}/?payment=success&order_id=${orderId}&session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: `${window.location.origin}/?payment=cancelled&order_id=${orderId}`,
  };

  // 1. ЕСЛИ РЕАЛЬНЫЙ STRIPE ЕЩЕ НЕ ПОДКЛЮЧЕН (Режим готовности / архитектурная эмуляция)
  if (!STRIPE_CONFIG.isEnabled) {
    console.info('💳 [PaymentService] Stripe готов к подключению! Текущий payload заказа:', checkoutPayload);

    // Имитируем сетевую задержку создания сессии (1 сек)
    await new Promise((resolve) => setTimeout(resolve, 800));

    return {
      success: true,
      isMock: true,
      orderId,
      mockCheckoutUrl: `${window.location.origin}/?payment=success&order_id=${orderId}&mock=true`,
      message: 'Архитектура оплаты активна (режим симуляции). Включите VITE_STRIPE_ENABLED=true для боевого режима.',
    };
  }

  // 2. БОЕВОЙ / ТЕСТОВЫЙ РЕЖИМ STRIPE (когда добавлен бэкенд /api/create-checkout-session)
  try {
    const response = await fetch(STRIPE_CONFIG.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(checkoutPayload),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.message || `Ошибка сервера платежей (HTTP ${response.status})`);
    }

    const data = await response.json();
    if (!data.checkoutUrl) {
      throw new Error('Сервер платежей не вернул ссылку на оплату.');
    }

    return {
      success: true,
      isMock: false,
      orderId,
      checkoutUrl: data.checkoutUrl,
      url: data.checkoutUrl,
    };
  } catch (error) {
    console.error('❌ [PaymentService] Ошибка создания платежной сессии:', error);
    return {
      success: false,
      error: `[Stripe API]: ${error.message || 'Не удалось связаться с сервером платежей'}`,
    };
  }
}
