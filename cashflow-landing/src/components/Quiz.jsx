import React, { useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";

export function Quiz({ onOpenModal }) {
  const { t } = useLanguage();
  const qz = t.quiz;

  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswer = (points) => {
    setScore((prev) => prev + points);
    setStep((prev) => prev + 1);
  };

  const handleReset = () => {
    setStep(0);
    setScore(0);
  };

  const currentQuestion = qz.questions[step];

  return (
    <section id="quiz" className="py-24 px-6 bg-zinc-950/40 border-y border-zinc-900">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-white mb-3">{qz.title}</h2>
          <p className="text-zinc-400 text-sm">{qz.subtitle}</p>
        </div>

        <div className="bg-zinc-900/40 border border-zinc-800/85 rounded-2xl p-8 min-h-[350px] flex flex-col justify-between">
          {step < qz.questions.length ? (
            <div>
              <div className="flex justify-between items-center text-xs text-zinc-500 mb-4">
                <span>
                  {qz.questionLabel} {step + 1} {qz.of} {qz.questions.length}
                </span>
                <span className="text-lime-400 font-semibold">
                  {Math.round(((step + 1) / qz.questions.length) * 100)}%
                </span>
              </div>
              
              <div className="w-full h-1 bg-zinc-900 rounded-full mb-8 overflow-hidden">
                <div 
                  className="h-full bg-lime-400 transition-all duration-300"
                  style={{ width: `${((step + 1) / qz.questions.length) * 100}%` }}
                />
              </div>

              <h3 className="text-lg md:text-xl font-bold text-white mb-6 leading-snug">
                {currentQuestion.q}
              </h3>

              <div className="space-y-3">
                {currentQuestion.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(opt.points)}
                    className="w-full text-left p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 hover:border-lime-400 hover:bg-zinc-950 text-zinc-300 hover:text-white transition-all duration-300 text-sm font-medium flex items-center justify-between group"
                  >
                    <span>{opt.text}</span>
                    <span className="text-zinc-600 group-hover:text-lime-400 transition-colors">→</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-lime-400/10 border border-lime-400 flex items-center justify-center text-lime-400 text-3xl mx-auto mb-6">
                💡
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{qz.completedTitle}</h3>
              
              <div className="max-w-lg mx-auto mb-8">
                {score >= 7 ? (
                  <div className="space-y-2">
                    <p className="text-emerald-400 font-extrabold text-lg">{qz.levels.investor.label}</p>
                    <p className="text-zinc-400 text-sm leading-relaxed">{qz.levels.investor.desc}</p>
                  </div>
                ) : score >= 3 ? (
                  <div className="space-y-2">
                    <p className="text-lime-400 font-extrabold text-lg">{qz.levels.saver.label}</p>
                    <p className="text-zinc-400 text-sm leading-relaxed">{qz.levels.saver.desc}</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-rose-400 font-extrabold text-lg">{qz.levels.hostage.label}</p>
                    <p className="text-zinc-400 text-sm leading-relaxed">{qz.levels.hostage.desc}</p>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button 
                  onClick={handleReset}
                  className="px-6 py-3 bg-zinc-950 border border-zinc-800 hover:border-zinc-700 rounded-xl text-sm font-semibold text-zinc-400 hover:text-white transition-all duration-300"
                >
                  {qz.restart}
                </button>
                <button 
                  onClick={onOpenModal}
                  className="px-6 py-3 bg-lime-400 hover:bg-lime-300 text-zinc-950 font-bold rounded-xl text-sm transition-all duration-300"
                >
                  {qz.discuss}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}