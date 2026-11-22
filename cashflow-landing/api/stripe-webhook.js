/**
 * =========================================================================
 * STRIPE WEBHOOK HANDLER: Обработка подтверждений оплаты от Stripe
 * =========================================================================
 * Данный эндпоинт слушает события Stripe (checkout.session.completed).
 * При успешной оплате:
 * 1. Извлекает адрес доставки, номер пачкомата InPost, телефон и габариты товаров.
 * 2. Автоматически передает эти данные в Google Таблицу и отправляет email.
 */
import Stripe from 'stripe';

export default async function handler(req, res) {
  // Помощники для совместимости с Vercel / Express / Vite
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

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecretKey) {
    return res.status(500).json({ message: 'STRIPE_SECRET_KEY is not configured' });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  try {
    const stripe = new Stripe(stripeSecretKey);
    let event;

    // Валидация подписи (если задан webhookSecret и доступен rawBody)
    if (webhookSecret && req.headers['stripe-signature'] && req.rawBody) {
      event = stripe.webhooks.constructEvent(
        req.rawBody,
        req.headers['stripe-signature'],
        webhookSecret
      );
    } else {
      event = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body;
    }

    if (!event || !event.type) {
      return res.status(400).json({ error: 'Некорректное тело события' });
    }

    console.info(`🔔 [Stripe Webhook] Получено событие: ${event.type}`);

    // Обработка успешного завершения оплаты
    if (event.type === 'checkout.session.completed') {
      const session = event.data?.object || {};
      const metadata = session.metadata || {};

      const orderId = metadata.orderId || `STRIPE-${session.id.slice(-8)}`;
      const orderType = metadata.orderType || 'woodiq_purchase';

      // 1. Клиентские контакты
      const customerName =
        session.shipping_details?.name ||
        session.customer_details?.name ||
        metadata.customerName ||
        'Клиент Stripe';

      const customerPhone =
        session.customer_details?.phone ||
        metadata.customerPhone ||
        '';

      const customerEmail =
        session.customer_details?.email ||
        session.customer_email ||
        '';

      const messenger = metadata.customerMessenger || '';
      const city =
        session.shipping_details?.address?.city ||
        metadata.city ||
        'Warszawa';

      // 2. Полный адрес доставки (для курьера / почты)
      const addr = session.shipping_details?.address || {};
      const addressParts = [
        addr.country ? `[${addr.country}]` : '',
        addr.postal_code || '',
        addr.city || '',
        addr.line1 || '',
        addr.line2 || '',
      ].filter(Boolean);
      const formattedAddress = addressParts.join(' ');

      // 3. Код пачкомата InPost (из кастомного поля формы)
      const paczkomatField = session.custom_fields?.find(
        (f) => f.key === 'paczkomat_code'
      );
      const paczkomatCode = paczkomatField?.text?.value || '';

      // 4. Стоимость и тариф доставки
      const shippingAmount = session.shipping_cost?.amount_total
        ? `${(session.shipping_cost.amount_total / 100).toFixed(2)} zł`
        : '0 zł';

      const totalPaid = `${(session.amount_total / 100).toFixed(2)} ${(session.currency || 'pln').toUpperCase()}`;
      const itemsList = metadata.itemsSizesAndDimensions || 'Товары WoodIQ';

      console.info(`✅ [Stripe Webhook] Оплата подтверждена для заказа #${orderId}:`, {
        orderId,
        totalPaid,
        customerName,
        customerPhone,
        paczkomatCode,
        formattedAddress,
        itemsList,
      });

      // 5. Отправка подтвержденных данных в Google Таблицу (Apps Script)
      const googleScriptUrl = process.env.VITE_URL;
      if (googleScriptUrl) {
        try {
          const formData = new URLSearchParams();
          formData.append('orderType', orderType.startsWith('woodiq') ? 'woodiq' : 'cashflow');
          formData.append('orderId', orderId);
          formData.append('stripeSessionId', session.id);
          formData.append('paymentStatus', '✅ ОПЛАЧЕНО (STRIPE)');
          formData.append('name', customerName);
          formData.append('phone', customerPhone);
          formData.append('email', customerEmail);
          formData.append('messenger', messenger || customerEmail || 'Stripe Checkout');
          formData.append('city', city);
          formData.append('type', orderType === 'woodiq_purchase' ? 'Купівля' : 'Оренда');
          formData.append('format', 'Онлайн-оплата (Stripe)');
          formData.append('games', itemsList);
          formData.append('address', formattedAddress || 'Адрес не указан');
          formData.append('paczkomat', paczkomatCode || '—');
          formData.append('delivery', paczkomatCode ? `Paczkomat: ${paczkomatCode}` : (formattedAddress ? `Кур'єр: ${formattedAddress}` : 'Включено'));
          formData.append('shippingCost', shippingAmount);
          formData.append('price', totalPaid);
          formData.append('total', totalPaid);

          const fullShippingNote = paczkomatCode 
            ? `[Paczkomat: ${paczkomatCode}] Адрес: ${formattedAddress}`
            : `Адрес доставки: ${formattedAddress}`;
          formData.append('comment', `[ОПЛАЧЕНО STRIPE #${orderId}] ${fullShippingNote} ${metadata.comment ? '• ' + metadata.comment : ''}`);

          await fetch(googleScriptUrl, {
            method: 'POST',
            body: formData,
          });

          console.info(`📊 [Stripe Webhook] Заказ #${orderId} успешно сохранен в Google Таблицу.`);
        } catch (gasErr) {
          console.error('❌ Ошибка отправки вебхука в Google Apps Script:', gasErr);
        }
      }
    }

    return res.status(200).json({ received: true });
  } catch (err) {
    console.error('❌ [Stripe Webhook Error]:', err.message);
    return res.status(400).json({ error: `Webhook Error: ${err.message}` });
  }
}
