
import React, { useState } from 'react';
import { useEffect } from 'react';
export function BookingModal({ isOpen, onClose, selectedTier, defaultCity, instagramUsername = "cashflowkatowice" }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Warszawa');
  const [messenger, setMessenger] = useState('telegram');
  const [status, setStatus] = useState({ type: null, message: '' });
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setName('');
      setPhone('');
      setStatus({ type: null, message: '' });
      setCopied(false);
      if (defaultCity) {
        setCity(defaultCity);
      }
    }
  }, [isOpen, defaultCity]);

  if (!isOpen) return null;

  // Генерация текста записи специально для Instagram DM
  const generatedInstagramText = `
🔥 Хочу на CASHFLOW!
👤 Имя: ${name || 'Инвестор'}
📞 Связь: ${phone} (${messenger.toUpperCase()})
🇵🇱 Город: ${city}
🎟️ Тариф: ${selectedTier ? selectedTier.toUpperCase() : 'ОБЩИЙ'}

  `.trim();

  const handleCopyText = () => {
    navigator.clipboard.writeText(generatedInstagramText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: '' });

    // Имитация успешной отправки заявки
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Сохраняем локально (имитация отправки на бэкэнд)
    const savedLeads = JSON.parse(localStorage.getItem('cashflow_leads') || '[]');
    const newLead = {
      id: Date.now().toString(),
      name,
      phone,
      city,
      messenger,
      tier: selectedTier || 'general',
      status: 'new',
      created_at: new Date().toISOString()
    };
    localStorage.setItem('cashflow_leads', JSON.stringify([newLead, ...savedLeads]));

    setStatus({ 
      type: 'success', 
      message: 'Ваша заявка успешно зарегистрирована в системе!' 
    });
    setLoading(false);
  };

  const handleCloseAndReset = () => {
    setStatus({ type: null, message: '' });
    setName('');
    setPhone('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-zinc-900 border border-zinc-850 rounded-2xl p-8 shadow-[0_0_50px_rgba(0,0,0,0.7)] max-h-[90vh] overflow-y-auto">
        
        <button 
          onClick={handleCloseAndReset}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-zinc-950 border border-zinc-850 flex items-center justify-center text-zinc-400 hover:text-white hover:border-lime-400 transition-all duration-300"
        >
          ✕
        </button>

        {status.type === 'success' ? (
          <div className="text-center py-4">

            <h3 className="text-xl font-bold text-white mb-2">Успешное бронирование!</h3>
            <p className="text-zinc-400 text-xs mb-6 leading-relaxed">
              Заявка сохранена в базу. Чтобы подтвердить участие мгновенно и связаться с организатором, **скопируйте готовый шаблон для Instagram** и отправьте его нам в Direct:
            </p>

            {/* Блок сгенерированного текста для Instagram */}
            <div className="mb-6 p-4 bg-zinc-950 rounded-xl border border-zinc-850 text-left font-mono text-xs text-zinc-300 whitespace-pre-wrap relative group">
              {generatedInstagramText}
              <button 
                onClick={handleCopyText}
                className="absolute bottom-2 right-2 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-lime-400 rounded-lg text-[10px] font-bold border border-zinc-800 transition"
              >
                {copied ? 'Скопировано! ✅' : 'Скопировать 📋'}
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <a 
                href={`https://instagram.com/${instagramUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:opacity-90 text-white font-bold rounded-xl text-sm transition-all duration-300 flex items-center justify-center gap-2"
              >
                📸 Написать нам в Instagram
              </a>
              <button 
                onClick={handleCloseAndReset}
                className="w-full py-3 bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white rounded-xl text-sm font-semibold transition"
              >
                Закрыть окно
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h3 className="text-xl font-bold text-white mb-1">Забронировать место</h3>
            <p className="text-xs text-zinc-500 mb-6">Оставьте контакты, и мы свяжемся для согласования времени игры.</p>

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
                    <option value="instagram">Instagram DM</option>
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
                {loading ? 'Отправка...' : 'Зарегистрироваться'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
