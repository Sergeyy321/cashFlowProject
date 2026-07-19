
import React, { useState } from 'react';

export function BookingModal({ isOpen, onClose, calculatorState }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Warszawa');
  const [messenger, setMessenger] = useState('telegram');
  const [status, setStatus] = useState({ type: null, message: '' });
  const [loading, setLoading] = useState(false);
  const CheckIcon = () => (
      <svg className="w-16 h-16 text-emerald-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );

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