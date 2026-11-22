/**
 * =========================================================================
 * STRIPE SERVERLESS API: Создание сессии оплаты (Checkout Session)
 * =========================================================================
 * Данный файл работает как на Vercel / Netlify / Node.js, так и локально в Vite.
 */
import Stripe from 'stripe';

export default async function handler(req, res) {
  // Помощники для совместимости с Vercel / Express / Vite Dev Middleware
  if (!res.status) {
    res.status = (code) => {
      res.statusCode = code;
      return res;
    };
  }
  if (!res.json) {
    res.json = (data) => {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(data));
      return res;
    };
  }

  // Разрешаем только POST запросы
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Проверка наличия ключа Stripe
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecretKey) {
    return res.status(500).json({
      message: 'STRIPE_SECRET_KEY не настроен в переменных окружения (.env).',
    });
  }

  try {
    const stripe = new Stripe(stripeSecretKey);

    const payload = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const {
      orderId,
      orderType = 'woodiq_purchase',
      customer = {},
      items = [],
      totalAmount,
      currency = 'pln',
      comment = '',
      successUrl,
      cancelUrl,
    } = payload;

    if (!items || items.length === 0 || !totalAmount) {
      return res.status(400).json({ message: 'Некорректный состав заказа или пустая сумма.' });
    }

    const stripeCurrency = (currency || 'pln').toLowerCase();

    // 1. Формируем line_items для Stripe Checkout
    const lineItems = items.map((item) => {
      const unitAmountInCents = Math.round(Number(item.price) * 100);

      // Stripe строго требует абсолютные публичные HTTPS URL для изображений (https://).
      // Локальные относительные пути (/assets/...) или http:// вызывают ошибку Stripe "Not a valid URL".
      const isAbsolutePublicUrl =
        typeof item.image === 'string' &&
        item.image.startsWith('https://') &&
        !item.image.includes('localhost') &&
        !item.image.includes('127.0.0.1');

      return {
        price_data: {
          currency: stripeCurrency,
          product_data: {
            name: item.name || 'Дерев’яна гра WoodIQ',
            description: item.description || `Замовлення #${orderId}`,
            ...(isAbsolutePublicUrl ? { images: [item.image] } : {}),
          },
          unit_amount: unitAmountInCents,
        },
        quantity: Number(item.quantity) || 1,
      };
    });

    const isPurchase = orderType === 'woodiq_purchase';

    // Опции почтовой доставки для покупки изделий (Paczkomat InPost, Kurier DPD, Międzynarodowa)
    const shippingOptions = isPurchase
      ? [
          {
            shipping_rate_data: {
              type: 'fixed_amount',
              fixed_amount: { amount: 1900, currency: stripeCurrency },
              display_name: 'Paczkomat InPost / Kurier InPost (Polska)',
              delivery_estimate: {
                minimum: { unit: 'business_day', value: 1 },
                maximum: { unit: 'business_day', value: 2 },
              },
            },
          },
          {
            shipping_rate_data: {
              type: 'fixed_amount',
              fixed_amount: { amount: 2500, currency: stripeCurrency },
              display_name: 'Kurier DPD / DHL (Polska)',
              delivery_estimate: {
                minimum: { unit: 'business_day', value: 1 },
                maximum: { unit: 'business_day', value: 2 },
              },
            },
          },
          {
            shipping_rate_data: {
              type: 'fixed_amount',
              fixed_amount: { amount: 6000, currency: stripeCurrency },
              display_name: 'Wysyłka międzynarodowa (UE / UA)',
              delivery_estimate: {
                minimum: { unit: 'business_day', value: 3 },
                maximum: { unit: 'business_day', value: 7 },
              },
            },
          },
        ]
      : undefined;

    // Сбор почтового адреса доставки покупателя
    const shippingAddressCollection = isPurchase
      ? {
          allowed_countries: [
            'PL', 'UA', 'DE', 'CZ', 'SK', 'AT', 'LT', 'LV', 'EE', 'FR', 'IT', 'ES', 'NL', 'BE', 'GB',
          ],
        }
      : undefined;

    // Дополнительное поле для ввода кода Paczkomat InPost (например WAW01M)
    const customFields = isPurchase
      ? [
          {
            key: 'paczkomat_code',
            label: {
              type: 'custom',
              custom: 'Numer Paczkomatu InPost (np. WAW01M) lub uwagi',
            },
            type: 'text',
            optional: true,
          },
        ]
      : undefined;

    // 2. Создаем сессию оплаты в Stripe (Dynamic Payment Methods: BLIK, Apple Pay, Google Pay, Cards + Shipping)
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      customer_email: customer.email || undefined,
      phone_number_collection: {
        enabled: true,
      },
      shipping_address_collection: shippingAddressCollection,
      shipping_options: shippingOptions,
      custom_fields: customFields,
      metadata: {
        orderId: String(orderId || ''),
        orderType: String(orderType || ''),
        customerName: String(customer.name || ''),
        customerPhone: String(customer.phone || ''),
        customerMessenger: String(customer.messenger || ''),
        city: String(customer.city || 'Warszawa'),
        comment: String(comment || ''),
        itemsSizesAndDimensions: String(
          items.map((i) => `${i.name} [${i.description || i.dimensions || ''}]`).join('; ')
        ).slice(0, 500),
      },
      success_url: successUrl || `${req.headers.origin || 'http://localhost:5173'}/?payment=success&order_id=${orderId}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${req.headers.origin || 'http://localhost:5173'}/?payment=cancelled&order_id=${orderId}`,
      locale: 'pl', // Интерфейс оплаты на польском языке
    });

    return res.status(200).json({
      success: true,
      checkoutUrl: session.url,
      sessionId: session.id,
    });
  } catch (error) {
    console.error('Ошибка в Stripe Checkout Handler:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Внутренняя ошибка создания сессии Stripe',
    });
  }
}
