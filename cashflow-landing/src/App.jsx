import React, { useState } from 'react';
import { useEffect } from 'react';
import { Header } from './components/Header';
import {Hero} from './components/Hero';
import {Benefits} from './components/Benefits';   
import { Quiz } from './components/Quiz';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { GameProcess } from './components/TimeLine';
import { AdminPanel } from './components/AdminPanel.';
import {SchedulePricing} from './components/SchedulePricing';
export default function App() {
const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState('general');
  const [leads, setLeads] = useState([]);
  const [prices, setPrices] = useState({ test: 100,  combo: 150 });
const [event, setEvent] = useState({
  city: "Warszawa",
  date: "27 lipca",
  time: "18:00",
  place: "Business Hub Warsaw",
  spots: 6,
});
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('admin') === 'true') {
      setIsAdminOpen(true);
    }

    const savedLeads = localStorage.getItem('cashflow_leads');
    if (savedLeads) {
      setLeads(JSON.parse(savedLeads));
    }

    const savedPrices = localStorage.getItem('cashflow_prices');
    if (savedPrices) {
      setPrices(JSON.parse(savedPrices));
    }
  }, []);

  const handleOpenModal = (tier = 'general') => {
    setSelectedTier(tier);
    setIsModalOpen(true);
  };

  const handleAddLead = (leadData) => {
    const newLead = {
      ...leadData,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      status: 'new'
    };
    const updated = [newLead, ...leads];
    setLeads(updated);
    localStorage.setItem('cashflow_leads', JSON.stringify(updated));
  };

  const handleDeleteLead = (id) => {
    const updated = leads.filter(l => l.id !== id);
    setLeads(updated);
    localStorage.setItem('cashflow_leads', JSON.stringify(updated));
  };

  const handleUpdateStatus = (id, status) => {
    const updated = leads.map(l => l.id === id ? { ...l, status } : l);
    setLeads(updated);
    localStorage.setItem('cashflow_leads', JSON.stringify(updated));
  };

  const handleUpdatePrices = (newPrices) => {
    setPrices(newPrices);
    localStorage.setItem('cashflow_prices', JSON.stringify(newPrices));
  };


  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-screen flex flex-col font-sans selection:bg-lime-400 selection:text-zinc-950">
      <Header onOpenModal={() => setIsModalOpen(true)} />
      <Hero onOpenModal={() => setIsModalOpen(true)} />
      <GameProcess />

    
      <Benefits />
      {/* <Calculator /> */}
      <Quiz onOpenModal={() => setIsModalOpen(true)} />
      <FAQ />
      <AdminPanel  isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        leads={leads}
        onDeleteLead={handleDeleteLead}
        onUpdateStatus={handleUpdateStatus}
        customPrices={prices}
        onUpdatePrices={handleUpdatePrices}/>
      <Footer />
      <BookingModal  isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
    
        selectedTier={selectedTier}
        onAddLead={handleAddLead} />
    </div>
  );
}