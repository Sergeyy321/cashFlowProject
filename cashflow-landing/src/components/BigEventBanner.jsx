import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { Spark, Trophy, DeliveryTruck, ChatBubble } from 'iconoir-react';

export function BigEventBanner({ onOpenModal }) {
  const { t, lang } = useLanguage();
  const wr = t.woodRental || {};

  const bLoc = {
    pl: {
      badge: '20+ gier • Pod klucz • Duże wydarzenia',
      delivery: 'Dostawa i montaż',
      animators: 'Animatorzy i turnieje',
      custom: 'Indywidualna kalkulacja',
      modalTitle: 'Duże wydarzenie (20+ gier pod klucz)',
    },
    en: {
      badge: '20+ Games • Turnkey • Large Events',
      delivery: 'Delivery & Setup',
      animators: 'Hosts & Tournaments',
      custom: 'Custom Quote',
      modalTitle: 'Large Event (20+ games turnkey)',
    },
    uk: {
      badge: '20+ ігор • Під ключ • Масштабні події',
      delivery: 'Доставка та монтаж',
      animators: 'Аніматори та турніри',
      custom: 'Індивідуальний розрахунок',
      modalTitle: 'Велика подія (20+ ігор під ключ)',
    },
  }[lang] || {
    badge: '20+ ігор • Під ключ • Масштабні події',
    delivery: 'Доставка та монтаж',
    animators: 'Аніматори та турніри',
    custom: 'Індивідуальний розрахунок',
    modalTitle: 'Велика подія (20+ ігор під ключ)',
  };

  return (
    <section className="relative py-12 sm:py-16 px-4 sm:px-6 bg-zinc-950 border-b border-zinc-900 overflow-hidden">
      {/* Мягкое янтарное свечение на фоне */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="rounded-3xl border border-amber-400/30 bg-gradient-to-br from-zinc-900/90 via-zinc-900/70 to-zinc-950 p-6 sm:p-10 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative overflow-hidden">
          {/* Декоративная подсветка карточки */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              {/* Бейдж */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
                <Spark className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{bLoc.badge}</span>
              </div>

              {/* Заголовок */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-snug">
                {wr.bigEventTitle || 'Потрібні ігри для великої події?'}
              </h2>

              {/* Описание */}
              <p className="mt-3 text-sm sm:text-base text-zinc-300 leading-relaxed">
                {wr.bigEventDesc || 'Якщо вам потрібно 20 і більше ігор, доставка, монтаж або допомога аніматора — зв’яжіться з нами. Ми підготуємо пропозицію під вашу подію.'}
              </p>

              {/* Преимущества с иконками */}
              <div className="mt-6 flex flex-wrap gap-4 sm:gap-6 text-xs sm:text-sm font-semibold text-zinc-300">
                <div className="flex items-center gap-2">
                  <DeliveryTruck className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{bLoc.delivery}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{bLoc.animators}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ChatBubble className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{bLoc.custom}</span>
                </div>
              </div>
            </div>

            {/* Кнопки действия */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <button
                type="button"
                onClick={() => onOpenModal?.('turnkey', bLoc.modalTitle)}
                className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-extrabold text-sm sm:text-base bg-amber-400 hover:bg-amber-300 text-zinc-950 transition-all duration-300 shadow-[0_0_25px_rgba(251,191,36,0.3)] hover:shadow-[0_0_35px_rgba(251,191,36,0.45)] hover:-translate-y-0.5 cursor-pointer text-center"
              >
                {wr.getOfferBtn || 'Отримати пропозицію'}
              </button>

              <button
                type="button"
                onClick={() => onOpenModal?.('consultation')}
                className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold text-sm sm:text-base bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-amber-400/50 text-zinc-200 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 text-center"
              >
                <ChatBubble className="w-4 h-4 text-amber-400" />
                <span>{t.woodModal?.consultationBannerTitle || 'Безкоштовна консультація'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
