export function FAQ() {
  const faqs = [
    {
      q: 'Нужны ли глубокие знания в экономике перед стартом?',
      a: 'Абсолютно нет! Ведущий объясняет правила за 15-20 минут до начала партии, выдает бланки и наводящими вопросами сопровождает вас во время всей игры. 80% игроков приходят впервые.'
    },
    {
      q: 'Где и когда собираются игровые столы?',
      a: 'Игры проводятся в разные дни в ресторане или уютных коворкингах в Катовицах, Хожуве,  и других городах. Точное расписание мы присылаем индивидуально.'
    },
    {
      q: 'Сколько длится игровая сессия?',
      a: 'В среднем 4-5 часов: 20 минут теории и разбор правил, 3-4 часа чистой игры и 40 минут финального подведения итогов, разбора вашего поведения и нетворкинг.'
    }
  ];

  return (
    <section id="faq" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-extrabold text-white text-center mb-12">Ответы на популярные вопросы</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-6 bg-zinc-900/40 border border-zinc-800/80 rounded-2xl">
              <h3 className="text-base font-bold text-white mb-2">{faq.q}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}