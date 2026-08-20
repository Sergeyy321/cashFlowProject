import React, { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { doc, onSnapshot, db } from './firebase/FireBase'

import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Benefits } from './components/Benefits'
import { Quiz } from './components/Quiz'
import { FAQ } from './components/FAQ'
import { Footer } from './components/Footer'
import { BookingModal } from './components/BookingModal'
import { GameProcess } from './components/TimeLine'
import { SchedulePricing } from './components/Schedule'
import { AdminPanel } from './components/AdminPanel'

import { HeroWoodIQ } from './components/HeroWoodIQ'
import { WoodIQCatalog } from './components/WoodIQCatalog'
import { FAQGames } from './components/FAQGames'
import { WoodIQRentals } from './components/WoodIQRental'
import { WoodIQSelling } from './components/WoodIQSelling'
import { WoodIQOrderModal } from './components/WoodIQOrderModal'

import { ProductSwitcher } from './components/ProductSwitcher'


// ==========================================
// URL → PRODUCT
// ==========================================

const getPageFromPath = () => {
  const path = window.location.pathname.toLowerCase()

  if (path === '/cashflow' || path.startsWith('/cashflow/')) {
    return 'cashflow'
  }
  return 'woodiq'

}


// ==========================================
// APP
// ==========================================

export default function App() {

  const [isModalOpen, setIsModalOpen] = useState(false)

  const [selectedGame, setSelectedGame] = useState('')

  // Используется только для Cashflow
  const [selectedTier, setSelectedTier] = useState('general')

  // Определяем активный продукт из URL
  const [activePage, setActivePageState] = useState(getPageFromPath)


  // ==========================================
  // PRICES
  // ==========================================

  const [prices, setPrices] = useState({
    test: 120,
    combo: 150,
  })


  // ==========================================
  // EVENT
  // ==========================================

  const [eventDetails, setEventDetails] = useState({
    date: '27 lipca, 18:00',
    place: 'Business Hub Warsaw',
    spots: 6,
  })


  // ==========================================
  // FIREBASE
  // ==========================================

  useEffect(() => {

    const unsubscribe = onSnapshot(
      doc(db, 'settings', 'main'),
      (snap) => {

        if (snap.exists()) {

          const data = snap.data()

          if (data.prices) {
            setPrices(data.prices)
          }

          if (data.event) {
            setEventDetails(data.event)
          }

        }
      }
    )

    return () => unsubscribe()

  }, [])


  // ==========================================
  // CHANGE PRODUCT
  // ==========================================

  const setActivePage = (page) => {

    const newPath =
      page === 'cashflow'
        ? '/cashflow'
        : '/'


    // Меняем URL без перезагрузки
    window.history.pushState(
      {},
      '',
      newPath
    )


    // Меняем React state
    setActivePageState(page)


    // Закрываем открытые модалки
    setIsModalOpen(false)


    // Возвращаем пользователя наверх
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })

  }


  // ==========================================
  // BROWSER BACK / FORWARD
  // ==========================================

  useEffect(() => {

    const handlePopState = () => {

      const page = getPageFromPath()

      setActivePageState(page)

      setIsModalOpen(false)

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })

    }


    window.addEventListener(
      'popstate',
      handlePopState
    )


    return () => {

      window.removeEventListener(
        'popstate',
        handlePopState
      )

    }

  }, [])


  // ==========================================
  // OPEN MODAL
  // ==========================================

  /*
   * CASHFLOW:
   * handleOpenModal('test')
   * handleOpenModal('combo')
   *
   * WOODIQ:
   * handleOpenModal()
   * handleOpenModal('general', 'game-name')
   */

  const handleOpenModal = (
    tier = 'general',
    game = ''
  ) => {

    setSelectedTier(tier)

    setSelectedGame(game)

    setIsModalOpen(true)

  }


  // ==========================================
  // CLOSE MODAL
  // ==========================================

  const handleCloseModal = () => {

    setIsModalOpen(false)

  }


  // ==========================================
  // RENDER
  // ==========================================

  return (

    <div className="min-h-screen bg-zinc-950 text-zinc-100">

      <Toaster position="top-right" />


      {/* ======================================
          HEADER
      ====================================== */}

      <Header

        activePage={activePage}

        setActivePage={setActivePage}

        onOpenModal={() => {

          if (activePage === 'cashflow') {

            handleOpenModal('test')

          } else {

            handleOpenModal()

          }

        }}

      />


      {/* ======================================
          CASHFLOW
      ====================================== */}

      {activePage === 'cashflow' && (

        <>

          <Hero
            onOpenModal={() =>
              handleOpenModal('test')
            }
            setActivePage={setActivePage}
          />


          <SchedulePricing
            eventDetails={eventDetails}
            customPrices={prices}
            onOpenModal={handleOpenModal}
          />


          <Benefits />


          <GameProcess />


          <Quiz
            onOpenModal={() =>
              handleOpenModal('test')
            }
          />


          <FAQ />

        </>

      )}


      {/* ======================================
          WOODIQ
      ====================================== */}

      {activePage === 'woodiq' && (

        <>

          <HeroWoodIQ
            onOpenModal={handleOpenModal}
            setActivePage={setActivePage}
          />


          <WoodIQCatalog
            onOpenModal={handleOpenModal}
          />


          <FAQGames />


          <WoodIQSelling
            onOpenModal={handleOpenModal}
            customPrices={prices}
          />


          <WoodIQRentals
            onOpenModal={handleOpenModal}
          />

        </>

      )}


      {/* ======================================
          FOOTER
      ====================================== */}

      <Footer
        activePage={activePage}
      />


      {/* ======================================
          ADMIN
          Только Cashflow
      ====================================== */}

      {activePage === 'cashflow' && (
        <AdminPanel />
      )}


      {/* ======================================
          CASHFLOW MODAL
      ====================================== */}

      {activePage === 'cashflow' && (

        <BookingModal

          isOpen={isModalOpen}

          onClose={handleCloseModal}

          selectedTier={selectedTier}

          selectedGame={selectedGame}

        />

      )}


      {/* ======================================
          PRODUCT SWITCHER
      ====================================== */}

      <ProductSwitcher

        activePage={activePage}

        setActivePage={setActivePage}

      />


      {/* ======================================
          WOODIQ MODAL
      ====================================== */}

      {activePage === 'woodiq' && (

        <WoodIQOrderModal

          isOpen={isModalOpen}

          onClose={handleCloseModal}

        />

      )}

    </div>

  )

}