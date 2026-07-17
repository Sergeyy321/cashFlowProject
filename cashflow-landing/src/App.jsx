import React, { useState } from 'react';

// ==========================================
// ВСПОМОГАТЕЛЬНЫЕ ИКОНКИ (SVG)
// ==========================================
const CheckIcon = () => (
  <svg className="w-16 h-16 text-emerald-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// ==========================================
// БЛОК 1: ШАПКА САЙТА (HEADER)
// ==========================================
export function Header({ onOpenModal }) {
  return (
    <header className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-md border-b border-emerald-950/30">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-lime-400 flex items-center justify-center text-zinc-950 font-extrabold text-xl shadow-[0_0_15px_rgba(163,230,53,0.3)]">
            $
          </div>
          <span className="font-bold text-xl tracking-tight text-white">
            CASHFLOW <span className="text-lime-400">CLUB</span>
          </span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <a href="#about" className="hover:text-lime-400 transition-colors">Об игре</a>
          <a href="#calculator" className="hover:text-lime-400 transition-colors">Симулятор</a>
          <a href="#quiz" className="hover:text-lime-400 transition-colors">Тест IQ</a>
          <a href="#faq" className="hover:text-lime-400 transition-colors">FAQ</a>
        </nav>
        
        <button 
          onClick={onOpenModal}
          className="px-5 py-2.5 bg-lime-400 text-zinc-950 font-bold rounded-xl hover:bg-lime-300 transition-all duration-300 text-sm shadow-[0_0_20px_rgba(163,230,53,0.15)]"
        >
          Занять стол
        </button>
      </div>
    </header>
  );
}

// ==========================================
// БЛОК 2: ГЛАВНЫЙ ЭКРАН (HERO SECTION)
// ==========================================
export function Hero({ onOpenModal }) {
  return (
    <section className="relative pt-16 pb-20 md:py-32 px-6 overflow-hidden">
      {/* Мягкое неоновое свечение на фоне */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-lime-500/5 blur-[120px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-zinc-900 border border-emerald-900/50 px-4 py-2 rounded-full text-xs font-semibold text-lime-400 mb-8 shadow-inner">
          <span className="w-2 h-2 rounded-full bg-lime-400 animate-ping" />
          Интерактивный тренинг финансового мышления в Польше
        </div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.15]">
          Вырвись из финансовой рутины за <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-400">4 часа</span> игры
        </h1>
        
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Легендарный экономический симулятор Роберта Кийосаки. Прокачайте инвестиционное мышление, совершая рискованные сделки на бумаге, а не на реальных деньгах.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={onOpenModal}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-lime-400 to-emerald-400 text-zinc-950 font-bold rounded-xl hover:opacity-90 transition-all duration-300 shadow-[0_0_30px_rgba(163,230,53,0.25)] text-base"
          >
            Записаться на тест-драйв
          </button>
          <a 
            href="#calculator"
            className="w-full sm:w-auto px-8 py-4 bg-zinc-900/80 hover:bg-zinc-900 border border-zinc-800 hover:border-lime-400/50 text-white font-semibold rounded-xl transition-all duration-300 text-base text-center"
          >
            Попробовать симулятор
          </a>
        </div>
      </div>
    </section>
  );
}

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
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-white mb-4">Чему вы научитесь на тренинге</h2>
          <p className="text-zinc-400 max-w-xl mx-auto">Cashflow — это не просто монополия. Это детальная модель вашего финансового поведения в реальной жизни.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, idx) => (
            <div key={idx} className="p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 hover:border-lime-500/30 transition-all duration-300 flex flex-col items-start group hover:-translate-y-1">
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

// ==========================================
// БЛОК 4: ИНТЕРАКТИВНЫЙ КАЛЬКУЛЯТОР
// ==========================================
export function Calculator() {
  const [salary, setSalary] = useState(6000);
  const [passive, setPassive] = useState(800);
  const [expenses, setExpenses] = useState(4500);

  const totalIncome = salary + passive;
  const cashFlow = totalIncome - expenses;
  const progressPercent = Math.min(100, Math.round((passive / expenses) * 100));
  const isWinner = passive > expenses;

  return (
    <section id="calculator" className="py-24 px-6 relative">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-white mb-4">Живой симулятор «Крысиных бегов»</h2>
          <p className="text-zinc-400 max-w-xl mx-auto">
            Ваша главная цель в игре — сделать так, чтобы ваш <span className="text-emerald-400 font-semibold">пассивный доход</span> полностью покрывал ваши <span className="text-red-400 font-semibold">расходы</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Настройки параметров (Слайдеры) */}
          <div className="lg:col-span-7 p-8 bg-zinc-900/60 border border-zinc-800/85 rounded-2xl flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-zinc-300">Активный доход (Зарплата)</span>
                  <span className="text-lime-400 font-bold text-lg">{salary.toLocaleString()} PLN</span>
                </div>
                <input 
                  type="range" min="2000" max="25000" step="500" value={salary} 
                  onChange={(e) => setSalary(Number(e.target.value))}
                  className="w-full accent-lime-400 h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-zinc-300">Пассивный доход (Инвестиции)</span>
                  <span className="text-emerald-400 font-bold text-lg">{passive.toLocaleString()} PLN</span>
                </div>
                <input 
                  type="range" min="0" max="15000" step="100" value={passive} 
                  onChange={(e) => setPassive(Number(e.target.value))}
                  className="w-full accent-emerald-400 h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-zinc-300">Ежемесячные расходы</span>
                  <span className="text-rose-400 font-bold text-lg">{expenses.toLocaleString()} PLN</span>
                </div>
                <input 
                  type="range" min="1500" max="15000" step="100" value={expenses} 
                  onChange={(e) => setExpenses(Number(e.target.value))}
                  className="w-full accent-rose-400 h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800 text-xs text-zinc-500 leading-relaxed">
              * Слайдеры имитируют игровые карточки: «Крупные сделки» увеличивают пассивный доход, а карточки «Ребенок» или «Увольнение» увеличивают ваши расходы или срезают активный кэш.
            </div>
          </div>

          {/* Результаты анализа (Информационная панель) */}
          <div className={`lg:col-span-5 p-8 rounded-2xl border transition-all duration-500 flex flex-col justify-between ${
            isWinner 
              ? 'bg-emerald-950/10 border-emerald-500/40 shadow-[0_0_40px_rgba(16,185,129,0.08)]' 
              : 'bg-zinc-900/60 border-zinc-800/85'
          }`}>
            <div>
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                📊 Ваше финансовое состояние
              </h3>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-zinc-950/60 p-4 rounded-xl border border-zinc-800/80">
                  <span className="block text-[10px] text-zinc-500 uppercase tracking-wider font-semibold mb-1">Свободный кэш</span>
                  <span className={`text-lg font-bold ${cashFlow >= 0 ? 'text-lime-400' : 'text-rose-400'}`}>
                    {cashFlow.toLocaleString()} PLN
                  </span>
                </div>
                <div className="bg-zinc-950/60 p-4 rounded-xl border border-zinc-800/80">
                  <span className="block text-[10px] text-zinc-500 uppercase tracking-wider font-semibold mb-1">Общий доход</span>
                  <span className="text-lg font-bold text-white">{totalIncome.toLocaleString()} PLN</span>
                </div>
              </div>

              {/* Индикатор прогресса */}
              <div className="mb-6">
                <div className="flex justify-between text-xs font-semibold mb-2">
                  <span className="text-zinc-400">Покрытие расходов:</span>
                  <span className="text-lime-400">{progressPercent}%</span>
                </div>
                <div className="w-full h-3 bg-zinc-955 border border-zinc-850 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-lime-400 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Выводы */}
            <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-850">
              {isWinner ? (
                <div className="text-emerald-400 text-sm font-semibold flex items-start gap-2">
                  <span>🏆</span>
                  <div>
                    <p className="font-bold text-white mb-1">Победа в первом круге!</p>
                    <p className="text-zinc-400 text-xs font-normal">Ваш пассивный доход превысил расходы. Вы вырвались на Скоростную дорожку, где делаются миллионные инвестиции!</p>
                  </div>
                </div>
              ) : (
                <div className="text-zinc-400 text-xs flex items-start gap-2 leading-relaxed">
                  <span className="text-lime-400">ℹ️</span>
                  <span>Вы застряли в бесконечном круге «Крысиных бегов». Чтобы выйти из него, используйте свободный кэш для покупки активов, приносящих пассивный доход.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// БЛОК 5: ТЕСТ НА ФИНАНСОВЫЙ IQ (QUIZ)
// ==========================================
export function Quiz({ onOpenModal }) {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);

  const questions = [
    {
      q: 'Какая доля ваших доходов уходит на инвестиции или накопления каждый месяц?',
      options: [
        { text: 'Трачу абсолютно всё, иногда ухожу в долги/рассрочки', points: 0 },
        { text: 'Откладываю остатки, но без четкой системы', points: 1 },
        { text: 'Стабильно инвестирую не менее 10-20% доходов', points: 3 }
      ]
    },
    {
      q: 'Если завтра вы потеряете основной источник дохода, как долго вы проживете?',
      options: [
        { text: 'Меньше 2-3 недель, сбережений практически нет', points: 0 },
        { text: 'От 1 до 3 месяцев в режиме жесткой экономии', points: 1 },
        { text: 'Более 6 месяцев за счет сформированной подушки безопасности', points: 3 }
      ]
    },
    {
      q: 'Какова ваша основная цель при покупке вещей в рассрочку или кредит?',
      options: [
        { text: 'Покупка новой техники, одежды, отпуска для себя', points: 0 },
        { text: 'Крайние жизненные ситуации (здоровье, ремонт машины)', points: 1 },
        { text: 'Покупка инструментов, коммерческого авто или активов для бизнеса', points: 3 }
      ]
    }
  ];

  const handleAnswer = (points) => {
    setScore(prev => prev + points);
    setStep(prev => prev + 1);
  };

  const handleReset = () => {
    setStep(0);
    setScore(0);
  };

  return (
    <section id="quiz" className="py-24 px-6 bg-zinc-950/40 border-y border-zinc-900">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-white mb-3">Определите свой уровень финансового IQ</h2>
          <p className="text-zinc-400 text-sm">Всего 3 коротких вопроса помогут понять, где вы теряете деньги.</p>
        </div>

        <div className="bg-zinc-900/40 border border-zinc-800/85 rounded-2xl p-8 min-h-[350px] flex flex-col justify-between">
          {step < questions.length ? (
            <div>
              <div className="flex justify-between items-center text-xs text-zinc-500 mb-4">
                <span>Вопрос {step + 1} из {questions.length}</span>
                <span className="text-lime-400 font-semibold">{Math.round(((step + 1) / questions.length) * 100)}%</span>
              </div>
              
              <div className="w-full h-1 bg-zinc-955 rounded-full mb-8 overflow-hidden">
                <div 
                  className="h-full bg-lime-400 transition-all duration-300"
                  style={{ width: `${((step + 1) / questions.length) * 100}%` }}
                />
              </div>

              <h3 className="text-lg md:text-xl font-bold text-white mb-6 leading-snug">
                {questions[step].q}
              </h3>

              <div className="space-y-3">
                {questions[step].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(opt.points)}
                    className="w-full text-left p-4 rounded-xl bg-zinc-950/80 border border-zinc-850 hover:border-lime-400 hover:bg-zinc-950 text-zinc-300 hover:text-white transition-all duration-300 text-sm font-medium flex items-center justify-between group"
                  >
                    <span>{opt.text}</span>
                    <span className="text-zinc-650 group-hover:text-lime-400 transition-colors">→</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-lime-400/10 border border-lime-400 flex items-center justify-center text-lime-400 text-3xl mx-auto mb-6">
                💡
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Тест завершен!</h3>
              
              <div className="max-w-lg mx-auto mb-8">
                {score >= 7 ? (
                  <div className="space-y-2">
                    <p className="text-emerald-400 font-extrabold text-lg">Уровень: Прагматичный Инвестор</p>
                    <p className="text-zinc-400 text-sm leading-relaxed">Вы отлично понимаете базовые законы движения денег. На игре Cashflow вы сможете закрепить этот успех в жестких переговорах и сложных сделках.</p>
                  </div>
                ) : score >= 3 ? (
                  <div className="space-y-2">
                    <p className="text-lime-400 font-extrabold text-lg">Уровень: Разумный Накопитель</p>
                    <p className="text-zinc-400 text-sm leading-relaxed">Вы умеете избегать лишних трат, но ваши деньги все еще лежат мертвым грузом или съедаются инфляцией. Игра покажет, как заставить капитал работать.</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-rose-400 font-extrabold text-lg">Уровень: Заложник финансовой системы</p>
                    <p className="text-zinc-400 text-sm leading-relaxed">Вы живете одним днем, и любой форс-мажор грозит долгами. Вам срочно нужно перестроить логику финансового поведения на безопасном тренажере.</p>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button 
                  onClick={handleReset}
                  className="px-6 py-3 bg-zinc-950 border border-zinc-800 hover:border-zinc-700 rounded-xl text-sm font-semibold text-zinc-400 hover:text-white transition-all duration-300"
                >
                  Пройти еще раз
                </button>
                <button 
                  onClick={onOpenModal}
                  className="px-6 py-3 bg-lime-400 hover:bg-lime-300 text-zinc-950 font-bold rounded-xl text-sm transition-all duration-300"
                >
                  Обсудить на игре вживую
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// БЛОК 6: ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ (FAQ)
// ==========================================
export function FAQ() {
  const faqs = [
    {
      q: 'Нужны ли глубокие знания в экономике перед стартом?',
      a: 'Абсолютно нет! Ведущий объясняет правила за 15-20 минут до начала партии, выдает бланки и наводящими вопросами сопровождает вас во время всей игры. 80% игроков приходят впервые.'
    },
    {
      q: 'Где и когда собираются игровые столы?',
      a: 'Игры проводятся по выходным в арендованных конференц-залах или уютных коворкингах в Варшаве, Кракове, Вроцлаве и Гданьске. Точное расписание мы присылаем индивидуально.'
    },
    {
      q: 'Сколько длится игровая сессия?',
      a: 'В среднем 4 часа: 20 минут теории и разбор правил, 3 часа чистой игры и 40 минут финального подведения итогов, разбора ваших жизненных паттернов поведения и нетворкинга.'
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

// ==========================================
// БЛОК 7: ПОДВАЛ САЙТА (FOOTER)
// ==========================================
export function Footer() {
  return (
    <footer className="mt-auto py-12 px-6 bg-zinc-955 border-t border-zinc-900/60 text-center text-sm text-zinc-500">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-lime-400 flex items-center justify-center text-zinc-950 font-black text-sm">
            $
          </div>
          <span className="font-bold text-base tracking-tight text-white">CASHFLOW CLUB POLAND</span>
        </div>
        <p className="text-xs text-zinc-600">
          © 2026 Cashflow Club. Образовательный проект. Все права защищены.
        </p>
        <div className="flex gap-4 text-xs font-semibold text-zinc-400">
          <span className="hover:text-lime-400 cursor-pointer">Telegram</span>
          <span className="hover:text-lime-400 cursor-pointer">Instagram</span>
        </div>
      </div>
    </footer>
  );
}

// ==========================================
// БЛОК 8: ОКНО ЗАПИСИ (BOOKING MODAL)
// ==========================================
export function BookingModal({ isOpen, onClose, calculatorState }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Warszawa');
  const [messenger, setMessenger] = useState('telegram');
  const [status, setStatus] = useState({ type: null, message: '' });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: '' });

    // ТОКЕН и CHAT_ID из шага настройки Telegram
    const TELEGRAM_BOT_TOKEN = "ВАШ_ТОКЕН_БОТА"; 
    const TELEGRAM_CHAT_ID = "ВАШ_CHAT_ID"; 

    const messageText = `
🔔 *Новая запись на Cashflow!*
👤 *Имя:* ${name}
📞 *Телефон:* ${phone}
💬 *Связь:* ${messenger}
🇵🇱 *Город:* ${city}
📊 *Данные калькулятора:*
- Активный доход: ${calculatorState?.salary || 6000} PLN
- Пассивный доход: ${calculatorState?.passive || 800} PLN
- Расходы: ${calculatorState?.expenses || 4500} PLN
    `.trim();

    try {
      if (TELEGRAM_BOT_TOKEN !== "ВАШ_ТОКЕН_БОТА") {
        const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: messageText,
            parse_mode: 'Markdown'
          })
        });

        if (!response.ok) throw new Error('Ошибка Telegram API');
      } else {
        // Симуляция успешной отправки для теста
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log('Данные формы успешно сохранены локально:', { name, phone, city, messenger });
      }

      setStatus({ 
        type: 'success', 
        message: 'Спасибо! Ваша заявка принята. Организатор свяжется с вами в течение получаса.' 
      });
    } catch (err) {
      setStatus({ 
        type: 'error', 
        message: 'Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз.' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseAndReset = () => {
    setStatus({ type: null, message: '' });
    setName('');
    setPhone('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-zinc-900 border border-zinc-850 rounded-2xl p-8 shadow-[0_0_50px_rgba(0,0,0,0.7)]">
        
        {/* Кнопка закрытия */}
        <button 
          onClick={handleCloseAndReset}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-zinc-950 border border-zinc-850 flex items-center justify-center text-zinc-400 hover:text-white hover:border-lime-400 transition-all duration-300"
        >
          ✕
        </button>

        {status.type === 'success' ? (
          <div className="text-center py-6">
            <CheckIcon />
            <h3 className="text-xl font-bold text-white mb-2">Успешное бронирование</h3>
            <p className="text-zinc-400 text-sm mb-6 leading-relaxed">{status.message}</p>
            <button 
              onClick={handleCloseAndReset}
              className="w-full py-3 bg-zinc-950 border border-zinc-800 hover:border-lime-400 text-white rounded-xl text-sm font-semibold transition-all duration-300"
            >
              Закрыть
            </button>
          </div>
        ) : (
          <div>
            <h3 className="text-xl font-bold text-white mb-1">Забронировать место</h3>
            <p className="text-xs text-zinc-500 mb-6">Оставьте контакты, и мы свяжемся для согласования времени игры.</p>

            {status.type === 'error' && (
              <div className="p-3 mb-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-400 font-medium">
                {status.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase font-bold text-zinc-500 mb-1.5 tracking-wider">Ваше имя</label>
                <input 
                  type="text" required placeholder="Александр"
                  value={name} onChange={(e) => setName(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-850 focus:border-lime-400 rounded-xl px-4 py-3 text-white placeholder-zinc-750 text-sm focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-zinc-500 mb-1.5 tracking-wider">Телефон / Мессенджер</label>
                <input 
                  type="tel" required placeholder="+48 123 456 789"
                  value={phone} onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-850 focus:border-lime-400 rounded-xl px-4 py-3 text-white placeholder-zinc-750 text-sm focus:outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-zinc-500 mb-1.5 tracking-wider">Связь</label>
                  <select 
                    value={messenger} onChange={(e) => setMessenger(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-850 focus:border-lime-400 rounded-xl px-3 py-3 text-white text-sm focus:outline-none cursor-pointer"
                  >
                    <option value="telegram">Telegram</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="call">Звонок</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-zinc-500 mb-1.5 tracking-wider">Город</label>
                  <select 
                    value={city} onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-850 focus:border-lime-400 rounded-xl px-3 py-3 text-white text-sm focus:outline-none cursor-pointer"
                  >
                    <option value="Warszawa">Warszawa</option>
                    <option value="Kraków">Kraków</option>
                    <option value="Wrocław">Wrocław</option>
                    <option value="Gdańsk">Gdańsk</option>
                  </select>
                </div>
              </div>

              <button 
                type="submit" disabled={loading}
                className="w-full py-3.5 mt-4 bg-gradient-to-r from-lime-400 to-emerald-400 text-zinc-950 font-bold rounded-xl hover:opacity-90 transition-all duration-300 text-sm uppercase tracking-wider shadow-[0_0_20px_rgba(163,230,53,0.15)]"
              >
                {loading ? 'Отправка...' : 'Отправить запрос'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// ГЛАВНЫЙ СБОРОЧНЫЙ КОМПОНЕНТ ПРИЛОЖЕНИЯ (APP)
// ==========================================
export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-screen flex flex-col font-sans selection:bg-lime-400 selection:text-zinc-950">
      <Header onOpenModal={() => setIsModalOpen(true)} />
      <Hero onOpenModal={() => setIsModalOpen(true)} />
      <Benefits />
      <Calculator />
      <Quiz onOpenModal={() => setIsModalOpen(true)} />
      <FAQ />
      <Footer />
      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}