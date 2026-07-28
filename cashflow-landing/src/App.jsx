import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { doc, onSnapshot, db } from './firebase/FireBase';

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

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTier, setSelectedTier] = useState('general')

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

      <Header onOpenModal={() => setIsModalOpen(true)} />
      <Hero onOpenModal={() => setIsModalOpen(true)} />
      <GameProcess />
      <Benefits />
      <Quiz onOpenModal={() => setIsModalOpen(true)} />
      <FAQ />

      <SchedulePricing
        eventDetails={eventDetails}
        customPrices={prices}
        onOpenModal={handleOpenModal}
      />

      <AdminPanel
        eventDetails={eventDetails}
        prices={prices}
      />

      <Footer />

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedTier={selectedTier}
      />
    </div>
  )
}