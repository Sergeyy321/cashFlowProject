import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { doc, onSnapshot, db } from './firebase/FireBase';
import { WoodIQRentals } from './components/WoodIQRentals';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Benefits } from './components/Benefits';
import { Quiz } from './components/Quiz';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { GameProcess } from './components/TimeLine';
import { SchedulePricing } from './components/Schedule';
import { AdminPanel } from './components/AdminPanel';
import { HeroWoodIQ } from './components/HeroWoodIQ';
import { WoodIQCatalog } from './components/WoodIQCatalog';
import { FAQGames } from './components/FAQGames';
export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTier, setSelectedTier] = useState('general')
  const [activePage, setActivePage] = useState('cashflow');
  const [prices, setPrices] = useState({ test: 120, combo: 150 })
  const [eventDetails, setEventDetails] = useState({
    date: '27 lipca, 18:00',
    place: 'Business Hub Warsaw',
    spots: 6
  })

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'settings', 'main'), (snap) => {
      if (snap.exists()) {
        const data = snap.data()
        setPrices(data.prices)
        setEventDetails(data.event)
      }
    })

    return () => unsubscribe()
  }, [])

  const handleOpenModal = (tier = 'general') => {
    setSelectedTier(tier)
    setIsModalOpen(true)
  }

  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-screen">
    
      <Toaster position="top-right" />
          <Header 
        activePage={activePage} 
        setActivePage={setActivePage} 
        onOpenModal={() => handleOpenModal(activePage === 'woodiq' ? 'woodiq_rental' : 'test')} 
      />
      {activePage === 'cashflow' ? (
        <>
          <Hero
            onOpenModal={() => handleOpenModal('test')}
    
            setActivePage={setActivePage}
          />
          <SchedulePricing
            eventDetails={eventDetails}
            customPrices={prices}
            onOpenModal={handleOpenModal}
          />
          <Benefits />
          <GameProcess />
     
          <Quiz onOpenModal={() => handleOpenModal('test')} />
            <FAQ />
        </>
      ) : (
        <>
          <HeroWoodIQ onOpenModal={handleOpenModal} setActivePage={setActivePage} />
            <WoodIQCatalog onOpenModal={handleOpenModal} />
                <FAQGames />
          <WoodIQRentals onOpenModal={handleOpenModal} customPrices={prices} />
        </>
      )}
      <Footer activePage={activePage} />
      {activePage === 'cashflow' && <AdminPanel />}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedTier={selectedTier}
      />
    </div>
  )
}