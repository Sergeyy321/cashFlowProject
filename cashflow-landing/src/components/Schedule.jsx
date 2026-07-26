export function ScheduleSection({ schedule, onOpenModal }) {
  return (
    <section id="schedule" className="py-20 px-6 bg-zinc-950/20 border-t border-zinc-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-lime-400 text-xs font-bold uppercase tracking-widest bg-lime-400/10 px-3 py-1.5 rounded-full">
            Расписание игр в Польше
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-4 mb-4">Ближайшие столы в твоем городе</h2>
          <p className="text-zinc-400 max-w-xl mx-auto text-sm md:text-base">
            Выберите удобную дату и забронируйте место. Количество участников за одним столом строго ограничено (до 6-8 человек).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {schedule.map((item) => (
            <div key={item.id} className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 hover:border-lime-500/30 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs px-2.5 py-1 bg-zinc-950 text-lime-400 rounded-lg font-mono font-bold uppercase tracking-wider border border-zinc-850">
                    {item.city}
                  </span>
                  <span className="text-xs text-zinc-500 font-semibold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Мест: {item.spots}
                  </span>
                </div>
                
                <h3 className="text-xl font-extrabold text-white mb-2 tracking-tight">
                  {item.date}
                </h3>
                
                <p className="text-zinc-400 text-xs leading-relaxed mb-6">
                  📍 {item.place}
                </p>
              </div>

              <button 
                onClick={() => onOpenModal('general', item.city)}
                className="w-full py-2.5 bg-zinc-950 hover:bg-lime-400 text-zinc-300 hover:text-zinc-950 font-bold rounded-xl text-xs border border-zinc-800 hover:border-lime-400 transition-all duration-300 uppercase tracking-wider"
              >
                Занять место
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}