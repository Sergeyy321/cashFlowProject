import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CashflowGallery } from './components/CashflowGallery';
import { Benefits } from './components/Benefits';
import { Quiz } from './components/Quiz';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { GameProcess } from './components/TimeLine';
import { SchedulePricing } from './components/Schedule';
import { HeroWoodIQ } from './components/HeroWoodIQ';
import { WoodIQCatalog } from './components/WoodIQCatalog';
import { FAQGames } from './components/FAQGames';
import { WoodIQRentals } from './components/WoodIQRental';
import { WoodIQSelling } from './components/WoodIQSelling';
import { WoodIQOrderModal } from './components/WoodIQOrderModal';
import { getSiteSettings } from './components/api/settings';
import { ProductSwitcher } from './components/ProductSwitcher';
import { useLanguage } from './i18n/LanguageContext';

// ==========================================
// URL → PRODUCT
// ==========================================
const getPageFromPath = () => {
  const path = window.location.pathname.toLowerCase();
  if (path === '/cashflow' || path.startsWith('/cashflow/')) {
    return 'cashflow';
  }
  return 'woodiq';
};

// ==========================================
// APP
// ==========================================
export default function App() {
  const { lang, t } = useLanguage();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState('');
  const [selectedTier, setSelectedTier] = useState('test');

  // Определяем активный продукт из URL
  const [activePage, setActivePageState] = useState(getPageFromPath);

  // ==========================================
  // PRICES
  // ==========================================
  const [prices, setPrices] = useState({
    test: 120,
    combo: 150,
  });

  // ==========================================
  // EVENT
  // ==========================================
  const [eventDetails, setEventDetails] = useState({
    date: '27 lipca, 18:00',
    place: 'Business Hub Warsaw',
    spots: 6,
  });

  // ==========================================
  // LOAD SETTINGS (Google Apps Script)
  // ==========================================
  useEffect(() => {
    async function loadSettings() {
      try {
        const data = await getSiteSettings();
        if (data.prices) setPrices(data.prices);
        if (data.event) {
          const dateFormatted =
            data.event.time && data.event.date && !data.event.date.includes(data.event.time)
              ? `${data.event.date}, ${data.event.time}`
              : data.event.date || 'Суббота, 18:00';

          setEventDetails({
            date: dateFormatted,
            place: data.event.place || 'Business Hub Warsaw',
            spots: data.event.spots,
          });
        }
      } catch (error) {
        console.error('Ошибка загрузки настроек:', error);
      }
    }

    loadSettings();
  }, []);

  // ==========================================
  // DYNAMIC SEO METADATA
  // ==========================================
  useEffect(() => {
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }

    if (activePage === 'cashflow') {
      const titles = {
        pl: 'CASHFLOW CLUB POLAND — Trening myślenia finansowego Roberta Kiyosakiego',
        uk: 'CASHFLOW CLUB POLAND — Тренінг фінансового мислення Роберта Кійосакі',
        en: 'CASHFLOW CLUB POLAND — Robert Kiyosaki Financial Mindset Training',
      };
      document.title = titles[lang] || titles.pl;
      metaDesc.setAttribute('content', t.heroCashflow.desc);
    } else {
      const titles = {
        pl: 'WOODIQ — Wynajem i sprzedaż drewnianych gier w Polsce',
        uk: 'WOODIQ — Оренда та продаж дерев’яних ігор у Польщі',
        en: 'WOODIQ — Premium Wooden Game Rentals & Sales in Poland',
      };
      document.title = titles[lang] || titles.pl;
      metaDesc.setAttribute('content', t.heroWoodIQ.desc);
    }
  }, [activePage, lang, t]);

  // ==========================================
  // CHANGE PRODUCT
  // ==========================================
  const setActivePage = (page) => {
    const newPath = page === 'cashflow' ? '/cashflow' : '/';

    window.history.pushState({}, '', newPath);
    setActivePageState(page);
    setIsModalOpen(false);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // ==========================================
  // BROWSER BACK / FORWARD
  // ==========================================
  useEffect(() => {
    const handlePopState = () => {
      const page = getPageFromPath();
      setActivePageState(page);
      setIsModalOpen(false);

      window.scrollTo({
        top: 0,
        behavior: 'instant',
      });
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // ==========================================
  // OPEN / CLOSE MODAL
  // ==========================================
  const handleOpenModal = (tier = 'general', game = '') => {
    setSelectedTier(tier);
    setSelectedGame(game);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // ==========================================
  // RENDER
  // ==========================================
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-between">
      <Toaster position="top-right" />

      {/* HEADER */}
      <Header
        activePage={activePage}
        setActivePage={setActivePage}
        onOpenCart={() => {
          handleOpenModal('rental');
        }}
        onOpenModal={() => {
          if (activePage === 'cashflow') {
            handleOpenModal('test');
          } else {
            handleOpenModal('rental');
          }
        }}
      />

      <main className="flex-1">
        {/* CASHFLOW */}
        {activePage === 'cashflow' && (
          <>
            <Hero onOpenModal={() => handleOpenModal('test')} />

            <CashflowGallery />

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
        )}

        {/* WOODIQ */}
        {activePage === 'woodiq' && (
          <>
            <HeroWoodIQ onOpenModal={handleOpenModal} />

            <WoodIQCatalog onOpenModal={handleOpenModal} />

            <FAQGames />

            <WoodIQSelling onOpenModal={handleOpenModal} />

            <WoodIQRentals onOpenModal={handleOpenModal} />
          </>
        )}
      </main>

      {/* FOOTER */}
      <Footer activePage={activePage} />

      {/* PRODUCT SWITCHER */}
      {!isModalOpen && (
        <ProductSwitcher
          activePage={activePage}
          setActivePage={setActivePage}
        />
      )}

      {/* CASHFLOW MODAL */}
      {activePage === 'cashflow' && (
        <BookingModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          selectedTier={selectedTier}
          customPrices={prices}
        />
      )}

      {/* WOODIQ MODAL */}
      {activePage === 'woodiq' && (
        <WoodIQOrderModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          selectedTier={selectedTier}
          selectedGame={selectedGame}
        />
      )}
    </div>
  );
}