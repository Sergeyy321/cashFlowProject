// ==========================================
// БЛОК 2: ГЛАВНЫЙ ЭКРАН (HERO SECTION)
// ==========================================

import bgImage from '../img/photo_2026-01-16_14-33-51.jpg';
export function Hero({ onOpenModal }) {
  return (
    <section className="relative pt-16 pb-20 md:py-32 px-6 overflow-hidden">
    <img
    src={bgImage}
    alt="Финансовая игра"
    className="  absolute inset-0 
    w-full h-full 
    object-cover 
    scale-110
    object-center"
  />
<div className="absolute inset-0 bg-zinc-950/75" />
      {/* Мягкое неоновое свечение на фоне */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-lime-500/5 blur-[120px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-zinc-900 border border-emerald-900/50 px-4 py-2 rounded-full text-xs font-semibold text-lime-400 mb-8 shadow-inner">
          <span className="w-2 h-2 rounded-full bg-lime-400 animate-ping" />
          Интерактивный тренинг финансового мышления в Польше
        </div>
        
   <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.15]">
 {" "}
  <span className="bg-gradient-to-r from-lime-400 to-emerald-400 bg-clip-text text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
    Вырвись из финансовой рутины за 4 часа
  </span>{" "}
  игры
</h1>
        
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed text-center  ">
          Легендарный экономический симулятор Роберта Кийосаки. Прокачайте инвестиционное мышление, совершая рискованные сделки на бумаге, а не на реальных деньгах.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={onOpenModal}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-lime-400 to-emerald-400 text-zinc-950 font-bold rounded-xl hover:opacity-90 transition-all duration-300 shadow-[0_0_30px_rgba(163,230,53,0.25)] text-base mt-4 sm:mt-0"
          >
            Записаться на игру
          </button>
          {/* <a 
            href="#calculator"
            className="w-full sm:w-auto px-8 py-4 bg-zinc-900/80 hover:bg-zinc-900 border border-zinc-800 hover:border-lime-400/50 text-white font-semibold rounded-xl transition-all duration-300 text-base text-center"
          >
            Попробовать симулятор
          </a> */}
        </div>
      </div>
    </section>
  );
}
