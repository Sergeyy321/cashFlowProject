// ==========================================
// БЛОК 3: ПРЕИМУЩЕСТВА (BENEFITS)
// ==========================================
export function Benefits() {
  const items = [
    {
      title: 'Видеть возможности',
      desc: 'Поймете, как находить прибыльные сделки в недвижимости, бизнесе и акциях там, где другие видят только кризис и траты.',
      icon: '📈'
    },
    {
      title: 'Управлять рисками',
      desc: 'Научитесь балансировать между рискованными стартапами и надежными облигациями без риска потерять реальный капитал.',
      icon: '🛡️'
    },
    {
      title: 'Полезный нетворкинг',
      desc: 'За игровым столом собираются предприниматели, фрилансеры и инвесторы. Идеальное место для поиска партнеров в Польше.',
      icon: '🤝'
    }
  ];

  return (
    <section id="about" className="py-20 px-6 bg-zinc-950/40 border-y border-zinc-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 ">
          <h2 className="text-3xl font-extrabold text-white mb-4">Чему вы научитесь на тренинге</h2>
          <p className="text-zinc-400 max-w-xl text-center m-auto">Cashflow — это не просто монополия. Это детальная модель вашего финансового поведения в реальной жизни.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, idx) => (
            <div key={idx} className="p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 hover:border-lime-500/30 transition-all duration-300 flex flex-col items-start group hover:-translate-y-1 text-center">
              <div className="text-4xl mb-6 bg-zinc-950 p-4 rounded-xl border border-zinc-850 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-zinc-400 leading-relaxed text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
