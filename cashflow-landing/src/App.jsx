import React, { useState } from 'react';

import { Header } from './components/Header';
import {Hero} from './components/Hero';
import {Benefits} from './components/Benefits';   
import { Calculator } from './components/InterectiveCalculator';
import { Quiz } from './components/Quiz';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';


export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-screen flex flex-col font-sans selection:bg-lime-400 selection:text-zinc-950">
      <Header onOpenModal={() => setIsModalOpen(true)} />
      <Hero onOpenModal={() => setIsModalOpen(true)} />
      <Benefits />
      {/* <Calculator /> */}
      <Quiz onOpenModal={() => setIsModalOpen(true)} />
      <FAQ />
      <Footer />
      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}