import React from 'react';
import heroVideo from '../videos/video_2026-08-13_10-16-00.mp4';
import { useLanguage } from '../i18n/LanguageContext';
import { ChatBubble } from 'iconoir-react';

export function HeroWoodIQ({ onOpenModal }) {
  const { t } = useLanguage();
  const hw = t.heroWoodIQ;

  return (
    <section className="relative isolate min-h-[700px] overflow-hidden border-b border-amber-900/20">
      {/* ВИДЕО НА ФОНЕ */}
      <video
        className="absolute inset-0 z-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* ЗАТЕМНЕНИЕ */}
      <div className="absolute inset-0 z-10 bg-black/50" />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-amber-950/30 via-zinc-950/40 to-zinc-950/95" />

      {/* КОНТЕНТ */}
      <div className="relative z-20 flex min-h-[700px] items-center px-6 py-24">
        <div className="mx-auto w-full max-w-4xl text-center">
          {/* Бейдж */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-black/40 px-4 py-2 text-xs font-bold text-amber-300 shadow-lg backdrop-blur-md">
            {hw.badge}
          </div>

          {/* Заголовок */}
          <h1 className="mb-4 text-4xl font-black leading-tight tracking-tight text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] md:text-6xl lg:text-7xl">
            <span className="text-amber-300">
              {hw.title}
            </span>
          </h1>

          {/* Соцмережі */}
          <div className="mb-6 flex items-center justify-center gap-3">
            <a
              href="https://t.me/CashFlow_Katowice"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              title="Telegram"
              className="group inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-black/40 px-4 py-2 text-xs sm:text-sm font-bold text-zinc-300 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-400 hover:text-amber-300 hover:bg-black/60 cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current text-sky-400 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
              </svg>
              <span>Telegram</span>
            </a>

            <a
              href="https://www.instagram.com/woodiq.pl/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              title="Instagram"
              className="group inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-black/40 px-4 py-2 text-xs sm:text-sm font-bold text-zinc-300 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-400 hover:text-amber-300 hover:bg-black/60 cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current text-pink-400 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <span>Instagram</span>
            </a>
          </div>

          {/* Описание */}
          <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-white drop-shadow-[0_3px_12px_rgba(0,0,0,0.9)] md:text-xl">
            {hw.desc}
          </p>

          {/* Кнопки действия */}
          <div className="flex flex-col justify-center gap-3 sm:gap-4 sm:flex-row">
            <button
              type="button"
              onClick={() => onOpenModal('rental')}
              className="rounded-xl bg-amber-400 px-8 py-4 text-base font-bold text-zinc-950 shadow-[0_0_30px_rgba(251,191,36,0.3)] transition-all duration-300 hover:-translate-y-1 hover:bg-amber-300 hover:shadow-[0_0_40px_rgba(251,191,36,0.45)] cursor-pointer"
            >
              {hw.cta}
            </button>
            <button
              type="button"
              onClick={() => onOpenModal('consultation')}
              className="rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-amber-400/40 px-8 py-4 text-base font-bold text-white transition-all duration-300 hover:-translate-y-1 cursor-pointer backdrop-blur-md shadow-lg flex items-center justify-center gap-2"
            >
              <ChatBubble className="w-5 h-5 text-amber-400 shrink-0" />
              <span>{t.woodModal?.consultationBannerTitle || 'Безкоштовна консультація'}</span>
            </button>
          </div>

          {/* Нижняя подпись */}
          <div className="mt-10 flex items-center justify-center gap-2 text-sm text-white/70">
            <span className="h-2 w-2 animate-pulse rounded-full bg-amber-300" />
            <span>{hw.handmade}</span>
          </div>
        </div>
      </div>

      {/* Плавный переход */}
      <div className="absolute bottom-0 left-0 right-0 z-20 h-32 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />
    </section>
  );
}