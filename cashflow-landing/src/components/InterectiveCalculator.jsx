import React, { useState } from "react";

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
