import React, { useState } from "react";
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