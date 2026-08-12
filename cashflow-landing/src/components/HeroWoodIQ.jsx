export function HeroWoodIQ({ onOpenModal, setActivePage }) {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-amber-950/30 via-zinc-950 to-zinc-950 border-b border-amber-900/20">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-amber-950/40 border border-amber-800/50 px-4 py-2 rounded-full text-xs font-bold text-amber-400 mb-6">
          🪵 Премиальные Деревянные Игры & Эко-Аттракционы
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
          Эко-игры и гигантские головоломки для ваших <span className="text-amber-400">ивентов</span>
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
          Аренда рефлекторных деревянных аттракционов ручной работы для корпоративов, свадеб, фестивалей и семейных праздников.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => onOpenModal('woodiq_rental')}
            className="px-8 py-4 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold rounded-xl text-base shadow-[0_0_25px_rgba(251,191,36,0.25)] transition-all"
          >
            Заказать на мероприятие
          </button>
          <button
            onClick={() => setActivePage('cashflow')}
            className="px-8 py-4 bg-zinc-900 border border-zinc-800 hover:border-lime-400 text-zinc-300 font-semibold rounded-xl text-base transition-all"
          >
            💸 Перейти к Cashflow
          </button>
        </div>
      </div>
    </section>
  );
}