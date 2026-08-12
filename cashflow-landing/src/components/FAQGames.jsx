export function FAQGames() {
  const faqs = [
{
  q: 'Какие деревянные игры можно арендовать?',
  a: 'В каталоге представлены разные деревянные игры для мероприятий, корпоративов, свадеб, вечеринок и семейного отдыха. Вы можете выбрать отдельную игру или собрать комплект из нескольких игр.'
},
{
  q: 'Можно ли купить деревянные игры для себя или в подарок?',
  a: 'Да! Деревянные игры доступны не только в аренду, но и для покупки.'
},
{
  q: 'Как оформить аренду или покупку деревянных игр?',
  a: 'Выберите интересующие игры в каталоге и свяжитесь с нами. Мы расскажем о наличии, стоимости, сроках аренды или покупки, а также согласуем удобные условия получения и возврата.'
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