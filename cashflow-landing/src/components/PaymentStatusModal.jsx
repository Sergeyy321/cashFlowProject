import React, { useEffect, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { Check, Xmark, WarningCircle, ArrowRight } from 'iconoir-react';

export function PaymentStatusModal() {
  const { lang } = useLanguage();
  const [modalState, setModalState] = useState(null); // 'success' | 'cancelled' | null
  const [orderId, setOrderId] = useState('');
  const [isMock, setIsMock] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const payment = params.get('payment');
    const order = params.get('order_id');
    const mock = params.get('mock') === 'true';

    if (payment === 'success') {
      setModalState('success');
      setOrderId(order || 'WOODIQ-ONLINE');
      setIsMock(mock);
    } else if (payment === 'cancelled') {
      setModalState('cancelled');
      setOrderId(order || '');
      setIsMock(mock);
    }
  }, []);

  const handleClose = () => {
    // Очищаем query параметры из URL без перезагрузки страницы
    const url = new URL(window.location.href);
    url.searchParams.delete('payment');
    url.searchParams.delete('order_id');
    url.searchParams.delete('session_id');
    url.searchParams.delete('mock');
    window.history.replaceState({}, '', url.pathname);
    setModalState(null);
  };

  if (!modalState) return null;

  const content = {
    pl: {
      successTitle: 'Płatność zakończona sukcesem!',
      successSubtitle: 'Dziękujemy za zamówienie gier WoodIQ. Rozpoczynamy przygotowanie Twojej przesyłki.',
      orderLabel: 'Numer zamówienia:',
      mockBadge: 'Tryb demonstracyjny architektury Stripe (BLIK / Karta)',
      closeBtn: 'Wróć do strony głównej',
      cancelTitle: 'Płatność została anulowana',
      cancelSubtitle: 'Środki nie zostały pobrane. Możesz spróbować ponownie lub skontaktować się z nami.',
      retryBtn: 'Spróbuj ponownie',
    },
    uk: {
      successTitle: 'Оплату успішно підтверджено!',
      successSubtitle: 'Дякуємо за покупку дерев’яних ігор WoodIQ. Ми вже готуємо ваше замовлення до відправки.',
      orderLabel: 'Номер замовлення:',
      mockBadge: 'Демо-режим архітектури Stripe (BLIK / Картка)',
      closeBtn: 'Повернутися на головну',
      cancelTitle: 'Оплату скасовано',
      cancelSubtitle: 'Кошти з вашого рахунку не списувалися. Ви можете повторити спробу в будь-який зручний момент.',
      retryBtn: 'Зрозуміло, закрити',
    },
    en: {
      successTitle: 'Payment Successful!',
      successSubtitle: 'Thank you for purchasing WoodIQ games. We are already preparing your order for shipping.',
      orderLabel: 'Order number:',
      mockBadge: 'Stripe Architecture Demo Mode (BLIK / Card)',
      closeBtn: 'Return to Homepage',
      cancelTitle: 'Payment Cancelled',
      cancelSubtitle: 'No funds were charged. You can try again whenever you are ready.',
      retryBtn: 'Close',
    },
  }[lang] || content.uk;

  const isSuccess = modalState === 'success';

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900 p-7 text-center shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Кнопка закрытия */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-full p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white transition cursor-pointer"
          aria-label="Close"
        >
          <Xmark className="w-5 h-5" />
        </button>

        {/* Иконка */}
        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full">
          {isSuccess ? (
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 ring-8 ring-emerald-500/10">
              <Check className="w-10 h-10" />
            </div>
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-amber-500/20 text-amber-400 ring-8 ring-amber-500/10">
              <WarningCircle className="w-10 h-10" />
            </div>
          )}
        </div>

        {/* Заголовок */}
        <h3 className="text-2xl font-black text-white">
          {isSuccess ? content.successTitle : content.cancelTitle}
        </h3>

        {/* Описание */}
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          {isSuccess ? content.successSubtitle : content.cancelSubtitle}
        </p>

        {/* Номер заказа */}
        {orderId && (
          <div className="mt-5 rounded-2xl border border-zinc-800 bg-zinc-950/60 p-3.5 text-xs">
            <span className="text-zinc-500">{content.orderLabel} </span>
            <span className="font-mono font-bold text-amber-400">{orderId}</span>
          </div>
        )}

        {/* Индикатор готовности архитектуры Stripe */}
        {isMock && (
          <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-[11px] font-medium text-amber-400">
            <span>✨</span>
            <span>{content.mockBadge}</span>
          </div>
        )}

        {/* Кнопка действия */}
        <button
          type="button"
          onClick={handleClose}
          className="mt-6 w-full rounded-2xl bg-amber-400 hover:bg-amber-300 px-6 py-3.5 text-sm font-bold text-zinc-950 transition-all cursor-pointer shadow-lg active:scale-[0.99]"
        >
          {isSuccess ? content.closeBtn : content.retryBtn}
        </button>
      </div>
    </div>
  );
}
