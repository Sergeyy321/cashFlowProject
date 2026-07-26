import React, { useState, useEffect } from 'react';

export function AdminPanel({ isOpen, onClose, leads, onDeleteLead, onUpdateStatus, customPrices, onUpdatePrices }) {
  const [activeTab, setActiveTab] = useState('leads');
  const [priceForm, setPriceForm] = useState({ test: 120, investor: 200, combo: 350 });

  useEffect(() => {
    if (customPrices) {
      setPriceForm(customPrices);
    }
  }, [customPrices, isOpen]);

  if (!isOpen) return null;

  const handlePriceSave = (e) => {
    e.preventDefault();
    onUpdatePrices(priceForm);
    alert('Цены успешно сохранены и применены на сайте!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-stretch justify-end bg-zinc-950/80 backdrop-blur-sm">
      <div className="w-full max-w-4xl bg-zinc-900 border-l border-zinc-850 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
        <div>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-black text-white">⚙️ Панель Администратора</h2>
              <p className="text-xs text-zinc-500">Управление лидами и ценообразованием в реальном времени</p>
            </div>
            <button 
              onClick={onClose}
              className="px-4 py-2 bg-zinc-950 hover:bg-zinc-850 border border-zinc-850 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white"
            >
              Закрыть панель [✕]
            </button>
          </div>

          <div className="flex gap-2 border-b border-zinc-800 pb-4 mb-6">
            <button 
              onClick={() => setActiveTab('leads')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'leads' ? 'bg-lime-400 text-zinc-950' : 'text-zinc-400 hover:bg-zinc-850'
              }`}
            >
              📋 Лиды и Заявки ({leads.length})
            </button>
            <button 
              onClick={() => setActiveTab('prices')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'prices' ? 'bg-lime-400 text-zinc-950' : 'text-zinc-400 hover:bg-zinc-850'
              }`}
            >
              💰 Настройка цен
            </button>
          </div>

          {activeTab === 'leads' ? (
            <div className="space-y-4">
              {leads.length === 0 ? (
                <div className="text-center py-12 bg-zinc-955 rounded-2xl border border-zinc-850 text-zinc-500 text-sm">
                  Заявок пока нет. Сделайте тестовый заказ на сайте!
                </div>
              ) : (
                leads.map((lead) => (
                  <div key={lead.id} className="p-5 bg-zinc-955 rounded-xl border border-zinc-850 flex flex-col md:flex-row justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-white text-base">{lead.name}</span>
                        <span className="text-[10px] px-2 py-0.5 bg-zinc-850 text-zinc-400 rounded-full font-mono uppercase">
                          {lead.city}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 bg-emerald-950 text-emerald-400 rounded-full font-mono uppercase">
                          {lead.tier}
                        </span>
                      </div>
                      <div className="text-sm text-zinc-400">
                        📞 <span className="font-semibold text-white">{lead.phone}</span> 
                        <span className="text-zinc-500 text-xs ml-2">({lead.messenger})</span>
                      </div>
                      <div className="text-xs text-zinc-500">
                        Калькулятор: {lead.salary} PLN (ЗП) | {lead.passive} PLN (Пассивный) | {lead.expenses} PLN (Расходы)
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end md:self-center">
                      <select 
                        value={lead.status}
                        onChange={(e) => onUpdateStatus(lead.id, e.target.value)}
                        className="bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-zinc-300 focus:outline-none"
                      >
                        <option value="new">Новый</option>
                        <option value="in_progress">В работе</option>
                        <option value="confirmed">Подтвержден</option>
                      </select>
                      <button 
                        onClick={() => onDeleteLead(lead.id)}
                        className="px-3 py-1.5 bg-rose-950/20 text-rose-400 border border-rose-900/30 rounded-lg text-xs font-semibold hover:bg-rose-950"
                      >
                        Удалить
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            <form onSubmit={handlePriceSave} className="space-y-4 max-w-md bg-zinc-955 p-6 rounded-xl border border-zinc-850">
              <h3 className="text-sm font-bold text-white mb-4">Изменение стоимости тарифов (PLN)</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Тариф 'Тест-Драйв'</label>
                  <input 
                    type="number" required
                    value={priceForm.test}
                    onChange={(e) => setPriceForm({...priceForm, test: Number(e.target.value)})}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Тариф 'Инвестор'</label>
                  <input 
                    type="number" required
                    value={priceForm.investor}
                    onChange={(e) => setPriceForm({...priceForm, investor: Number(e.target.value)})}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Тариф 'Комбо на двоих'</label>
                  <input 
                    type="number" required
                    value={priceForm.combo}
                    onChange={(e) => setPriceForm({...priceForm, combo: Number(e.target.value)})}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm"
                  />
                </div>
              </div>
              <button 
                type="submit"
                className="w-full py-2.5 mt-4 bg-lime-400 text-zinc-950 font-black rounded-lg text-xs uppercase"
              >
                Сохранить и применить изменения
              </button>
            </form>
          )}
        </div>
        
        <div className="text-center text-[10px] text-zinc-600 border-t border-zinc-800 pt-4 mt-8">
          База данных Supabase готова к подключению. Локальный сеанс сохранен в LocalStorage.
        </div>
      </div>
    </div>
  );
}