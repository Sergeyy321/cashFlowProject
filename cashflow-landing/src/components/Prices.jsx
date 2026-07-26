export function SchedulePricing({
  event,
  prices,
  onOpenModal
}) {
  const tiers = [
    {
      id: "test",
      title: "Тест-Драйв",
      subtitle: "Идеально для первого знакомства",
      price: prices.test,
      features: [
        "Участие в игре (4 часа)",
        "Обучение правилам",
        "Место за игровым столом",
        "Чай, кофе и печенье",
        "Разбор стратегий"
      ]
    },
    {
      id: "combo",
      title: "Комбо на двоих",
      subtitle: "Для друзей и пар",
      price: prices.combo,
      features: [
        "2 билета",
        "Экономия 50 PLN",
        "Места рядом"
      ]
    }
  ];

  return (
    <section
      id="booking"
      className="py-24 px-6 bg-zinc-950 border-t border-zinc-900"
    >
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-16">
          <span className="text-lime-400 text-xs font-bold uppercase tracking-widest bg-lime-400/10 px-3 py-1.5 rounded-full">
            Ближайшая игра
          </span>

          <h2 className="text-4xl font-extrabold text-white mt-4">
            Расписание и стоимость
          </h2>

          <p className="text-zinc-400 mt-4 max-w-xl mx-auto">
            Забронируйте место на ближайшую игру Cashflow.
          </p>
        </div>

        <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-8 mb-10">

          <div className="flex flex-wrap gap-4 justify-between items-start">

            <div>

              <span className="inline-block bg-lime-400/10 text-lime-400 px-3 py-1 rounded-full text-sm font-bold">
                {event.city}
              </span>

              <h3 className="text-3xl font-bold text-white mt-4">
                {event.date}
              </h3>

              <p className="text-zinc-400 mt-2">
                🕒 {event.time}
              </p>

              <p className="text-zinc-400">
                📍 {event.place}
              </p>

            </div>

            <div className="text-right">

              <div className="text-emerald-400 font-bold">
                ● Осталось {event.spots} мест
              </div>

            </div>

          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">

          {tiers.map((tier) => (
            <div
              key={tier.id}
              className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-8 flex flex-col"
            >

              <h3 className="text-2xl font-bold text-white">
                {tier.title}
              </h3>

              <p className="text-zinc-500 text-sm mt-2">
                {tier.subtitle}
              </p>

              <div className="text-5xl font-extrabold text-white mt-8">
                {tier.price}
                <span className="text-lg text-zinc-500 ml-2">
                  PLN
                </span>
              </div>

              <ul className="space-y-3 my-8 flex-1">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex gap-2 text-zinc-300"
                  >
                    <span className="text-emerald-400">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => onOpenModal(tier.id)}
                className="w-full py-4 rounded-xl bg-lime-400 text-zinc-950 font-bold hover:bg-lime-300 transition"
              >
                Забронировать
              </button>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}