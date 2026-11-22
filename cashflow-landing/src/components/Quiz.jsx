import React, { useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import { Spark, ArrowRight, Refresh } from "iconoir-react";

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
    <section id="quiz" className="py-20 sm:py-24 px-4 sm:px-6 bg-zinc-950 border-b border-zinc-900">
      <div className="max-w-2xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10 max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-2 tracking-tight">
            {qz.title}
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            {qz.subtitle}
          </p>
        </div>

        {/* Quiz Container */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 min-h-[340px] flex flex-col justify-between shadow-xs">
          {step < qz.questions.length ? (
            <div>
              {/* Progress */}
              <div className="flex justify-between items-center text-xs font-semibold text-zinc-500 mb-3">
                <span>
                  {qz.questionLabel} {step + 1} {qz.of} {qz.questions.length}
                </span>
                <span className="text-lime-400">
                  {Math.round(((step + 1) / qz.questions.length) * 100)}%
                </span>
              </div>
              
              <div className="w-full h-1.5 bg-zinc-950 rounded-full mb-6 sm:mb-8 overflow-hidden">
                <div 
                  className="h-full bg-lime-400 transition-all duration-300"
                  style={{ width: `${((step + 1) / qz.questions.length) * 100}%` }}
                />
              </div>

              {/* Question */}
              <h3 className="text-base sm:text-lg font-bold text-white mb-5 leading-snug">
                {currentQuestion.q}
              </h3>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQuestion.options.map((opt, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleAnswer(opt.points)}
                    className="w-full text-left p-3.5 sm:p-4 rounded-xl bg-zinc-950/70 border border-zinc-800 hover:border-lime-400/80 text-zinc-300 hover:text-white transition-all text-xs sm:text-sm font-medium flex items-center justify-between group cursor-pointer"
                  >
                    <span className="pr-4 leading-relaxed">{opt.text}</span>
                    <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-lime-400 transition-colors shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-6 sm:py-8">
              <div className="w-12 h-12 rounded-xl bg-lime-400/10 border border-lime-400/30 flex items-center justify-center text-lime-400 mx-auto mb-5">
                <Spark className="w-6 h-6 text-lime-400" />
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 tracking-tight">
                {qz.completedTitle}
              </h3>
              
              <div className="max-w-md mx-auto mb-8 p-4 rounded-xl bg-zinc-950/60 border border-zinc-800 text-left">
                {score >= 7 ? (
                  <div className="space-y-1.5">
                    <p className="text-emerald-400 font-bold text-sm uppercase tracking-wider">
                      {qz.levels.investor.label}
                    </p>
                    <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                      {qz.levels.investor.desc}
                    </p>
                  </div>
                ) : score >= 3 ? (
                  <div className="space-y-1.5">
                    <p className="text-lime-400 font-bold text-sm uppercase tracking-wider">
                      {qz.levels.saver.label}
                    </p>
                    <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                      {qz.levels.saver.desc}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <p className="text-rose-400 font-bold text-sm uppercase tracking-wider">
                      {qz.levels.hostage.label}
                    </p>
                    <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                      {qz.levels.hostage.desc}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
                <button 
                  type="button"
                  onClick={handleReset}
                  className="px-5 py-3 bg-zinc-950 border border-zinc-800 hover:border-zinc-700 rounded-xl text-xs sm:text-sm font-semibold text-zinc-400 hover:text-white transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Refresh className="w-4 h-4" />
                  <span>{qz.restart}</span>
                </button>
                <button 
                  type="button"
                  onClick={onOpenModal}
                  className="px-6 py-3 bg-lime-400 hover:bg-lime-300 text-zinc-950 font-bold rounded-xl text-xs sm:text-sm transition-colors cursor-pointer shadow-sm"
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