export function GameProcess() {
  const steps = [
    {
      time: "00:00 - 00:20",
      title: "Знакомство и сбор участников",
      desc: "Знакомимся за чашкой кофе, распределяем игровые роли, выбираем профессии (от дворника до топ-менеджера)."
    },
    {
      time: "00:20 - 01:50",
      title: "Первый круг «Крысиных бегов»",
      desc: "Учимся сводить баланс, инвестировать свободные средства в акции и недвижимость, проживать кризисы."
    },
    {
      time: "01:50 - 02:10",
      title: "Кофе-брейк и нетворкинг",
      desc: "Неформальное общение участников. Обсуждаем первые инсайты, обмениваемся контактами, ищем партнеров."
    },
    {
      time: "02:10 - 03:30",
      title: "Выход на Скоростную дорожку",
      desc: "Создаем пассивный доход, превышающий расходы. Покупаем крупные бизнесы и совершаем миллионные сделки."
    },
    {
      time: "03:30 - 04:00",
      title: "Финальный разбор стратегий",
      desc: "Каждый игрок получает индивидуальный разбор своих финансовых паттернов от сертифицированного ведущего."
    }
  ];

  return (
    <section id="process" className="py-24 px-6 bg-zinc-950">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-white mb-4">Как проходят 4 часа тренинга</h2>
          <p className="text-zinc-400 max-w-xl mx-auto">Полноценная симуляция вашей финансовой жизни, разбитая на комфортные этапы.</p>
        </div>

        <div className="relative border-l-2 border-emerald-500/20 ml-4 md:ml-32 space-y-12">
          {steps.map((step, idx) => (
            <div key={idx} className="relative pl-8 group">
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-zinc-950 
                              border-2 border-lime-400 group-hover:bg-lime-400 
                              transition-colors duration-300" />
              
              <div className="absolute -left-4 md:-left-32 top-0 hidden md:block w-24 text-right">
                <span className="text-xs font-bold text-lime-400 uppercase tracking-wider">{step.time}</span>
              </div>

              <div className="p-6 bg-zinc-900/40 border border-zinc-800/80 rounded-2xl 
                              group-hover:border-lime-500/20 transition-all duration-300">
                <span className="text-xs font-bold text-lime-400 uppercase tracking-wider block md:hidden mb-2">
                  {step.time}
                </span>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}