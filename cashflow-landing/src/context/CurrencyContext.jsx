import React, { createContext, useContext, useEffect, useState } from 'react';
import { getLiveExchangeRate, convertPLNtoEUR, formatDualPrice } from '../services/currencyService';

const CurrencyContext = createContext(null);

export function CurrencyProvider({ children }) {
  const [rateInfo, setRateInfo] = useState({
    rate: 4.40,
    roundedRate: 4.40,
    date: '',
    source: 'NBP',
    formatted: '1 € = 4.40 zł',
  });

  useEffect(() => {
    let mounted = true;
    getLiveExchangeRate().then((info) => {
      if (mounted && info) {
        setRateInfo(info);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const formatPrice = (plnAmount) => {
    return formatDualPrice(plnAmount, rateInfo.rate);
  };

  const toEUR = (plnAmount) => {
    return convertPLNtoEUR(plnAmount, rateInfo.rate);
  };

  return (
    <CurrencyContext.Provider
      value={{
        rate: rateInfo.rate,
        rateInfo,
        formatPrice,
        toEUR,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    // Безопасный fallback, если компонент вне провайдера
    return {
      rate: 4.40,
      rateInfo: { rate: 4.40, formatted: '1 € = 4.40 zł' },
      formatPrice: (p) => formatDualPrice(p, 4.40),
      toEUR: (p) => convertPLNtoEUR(p, 4.40),
    };
  }
  return context;
}
