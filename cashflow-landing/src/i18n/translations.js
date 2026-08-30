export const languages = [
  { code: 'pl', label: 'PL', name: 'Polski' },
  { code: 'uk', label: 'UA', name: 'Українська' },
  { code: 'en', label: 'EN', name: 'English' },
];

export const translations = {
  pl: {
    // HEADER
    header: {
      cashflowClub: 'CASHFLOW',
      cashflowClubSub: 'CLUB',
      woodiq: 'WOOD',
      woodiqSub: 'IQ',
      schedule: 'Najbliższa gra',
      about: 'O treningu',
      process: 'Przebieg',
      quiz: 'Test IQ',
      woodCatalog: 'Katalog gier',
      woodPricing: 'Kupno',
      woodRental: 'Wynajem',
      faq: 'FAQ',
      bookSpot: 'Zarezerwuj miejsce',
      orderGames: 'Zamów gry',
    },

    // HERO CASHFLOW
    heroCashflow: {
      badge: 'Interaktywny trening myślenia finansowego w Polsce',
      title1: 'Wyrwij się z finansowej rutyny w ',
      titleHighlight: '4 godziny',
      title2: ' gry',
      desc: 'Legendarny symulator ekonomiczny Roberta Kiyosakiego. Rozwiń myślenie inwestycyjne, zawierając ryzykowne transakcje na papierze, a nie za prawdziwe pieniądze.',
      cta: 'Zapisz się na grę',
    },

    // SCHEDULE CASHFLOW
    schedule: {
      badge: '⚡ Najbliższe spotkanie',
      defaultDate: 'Sobota, 18:00',
      defaultPlace: 'Adres do potwierdzenia',
      spotsLeft: 'Pozostało wolnych miejsc:',
      sectionTitle: 'Wybierz format udziału',
      sectionSubtitle: 'Zarezerwuj miejsce już teraz — liczba uczestników przy stole jest ściśle ograniczona.',
      swipeHint: 'Przesuń w prawo',
      popularBadge: 'Najpopularniejszy',
      currency: 'PLN',
      tiers: {
        test: {
          title: 'Test-Drive',
          subtitle: 'Jedno indywidualne miejsce przy stole gry',
          cta: 'Zarezerwuj 1 miejsce',
          features: [
            'Udział w grze (4 godziny)',
            'Nauka zasad od podstaw (20 min)',
            'Kawa, herbata i poczęstunek na przerwie',
            'Indywidualna analiza strategii finansowych',
          ],
        },
        combo: {
          title: 'Kombo dla dwojga',
          subtitle: 'Specjalna cena dla par lub przyjaciół',
          cta: 'Zarezerwuj 2 miejsca',
          features: [
            '2 bilety na jedną grę',
            'Zniżka w porównaniu z pojedynczym biletem',
            'Gwarantowane miejsca obok siebie',
            'Wspólna analiza strategii partnerskich',
          ],
        },
      },
    },

    // BENEFITS CASHFLOW
    benefits: {
      title: 'Czego nauczysz się na treningu',
      subtitle: 'Cashflow to nie tylko gra planszowa. To szczegółowy model Twoich zachowań finansowych w prawdziwym życiu.',
      items: [
        {
          title: 'Dostrzegać szanse',
          desc: 'Zrozumiesz, jak znajdować zyskowne okazje w nieruchomościach, biznesie i akcjach tam, gdzie inni widzą tylko kryzys i wydatki.',
        },
        {
          title: 'Zarządzać ryzykiem',
          desc: 'Nauczysz się balansować między ryzykownymi start-upami a bezpiecznymi obligacjami bez ryzyka utraty realnego kapitału.',
        },
        {
          title: 'Wartościowy networking',
          desc: 'Przy stole gromadzą się przedsiębiorcy, freelancerzy i inwestorzy. Idealne miejsce do nawiązania kontaktów w Polsce.',
        },
      ],
    },

    // TIMELINE CASHFLOW
    timeline: {
      title: 'Jak przebiegają 4 godziny treningu',
      subtitle: 'Pełna symulacja Twojego życia finansowego, podzielona na komfortowe etapy.',
      steps: [
        {
          time: '15 min',
          title: 'Powitanie i zbiórka uczestników',
          desc: 'Poznajemy się przy filiżance kawy i omawiamy cele spotkania.',
        },
        {
          time: '90 - 100 min',
          title: 'Pierwsza część gry',
          desc: 'Uczymy się bilansować budżet, inwestować wolne środki w akcje i nieruchomości, radzić sobie z kryzysami.',
        },
        {
          time: '10 - 15 min',
          title: 'Przerwa kawowa i networking',
          desc: 'Nieformalne rozmowy, wymiana pierwszych wniosków i kontaktów biznesowych.',
        },
        {
          time: '90 - 100 min',
          title: 'Druga część gry',
          desc: 'Budujemy dochód pasywny przewyższający koszty. Kupujemy duże biznesy i zawieramy milionowe transakcje.',
        },
        {
          time: '15 - 20 min',
          title: 'Podsumowanie i analiza wzorców',
          desc: 'Każdy gracz otrzymuje indywidualną analizę swoich wzorców finansowych od prowadzącego.',
        },
      ],
    },

    // QUIZ CASHFLOW
    quiz: {
      title: 'Sprawdź swój poziom IQ finansowego',
      subtitle: 'Tylko 3 krótkie pytania pomogą zrozumieć, gdzie tracisz pieniądze.',
      questionLabel: 'Pytanie',
      of: 'z',
      completedTitle: 'Test ukończony!',
      levels: {
        investor: {
          label: 'Poziom: Pragmatyczny Inwestor',
          desc: 'Świetnie rozumiesz podstawowe prawa przepływu pieniędzy. Na grze Cashflow utrwalisz ten sukces w trudnych negocjacjach i złożonych transakcjach.',
        },
        saver: {
          label: 'Poziom: Rozsądny Oszczędzający',
          desc: 'Umiesz unikać zbędnych wydatków, ale Twoje pieniądze wciąż leżą bezczynnie lub tracą na wartości przez inflację. Gra pokaże, jak zaprząc kapitał do pracy.',
        },
        hostage: {
          label: 'Poziom: Zakładnik systemu finansowego',
          desc: 'Żyjesz z dnia na dzień, a każda nieprzewidziana sytuacja grozi długami. Warto jak najszybciej przećwiczyć nowe nawyki na bezpiecznym symulatorze.',
        },
      },
      restart: 'Rozwiąż ponownie',
      discuss: 'Porozmawiajmy na żywo na grze',
      questions: [
        {
          q: 'Jaka część Twoich dochodów trafia co miesiąc na inwestycje lub oszczędności?',
          options: [
            { text: 'Wydaję absolutnie wszystko, czasem biorę raty/pożyczki', points: 0 },
            { text: 'Odkładam to, co zostanie, ale bez stałego systemu', points: 1 },
            { text: 'Regularnie inwestuję co najmniej 10-20% dochodów', points: 3 },
          ],
        },
        {
          q: 'Gdybyś jutro stracił główne źródło dochodu, jak długo dasz radę przeżyć?',
          options: [
            { text: 'Mniej niż 2-3 tygodnie, prawie nie mam oszczędności', points: 0 },
            { text: 'Od 1 do 3 miesięcy w trybie ścisłego oszczędzania', points: 1 },
            { text: 'Ponad 6 miesięcy dzięki poduszce finansowej', points: 3 },
          ],
        },
        {
          q: 'Jaki jest Twój główny cel przy zakupach na raty lub kredyt?',
          options: [
            { text: 'Zakup nowego sprzętu, ubrań, wakacji dla siebie', points: 0 },
            { text: 'Sytuacje awaryjne (zdrowie, naprawa auta)', points: 1 },
            { text: 'Zakup narzędzi, auta dostawczego lub aktywów dla firmy', points: 3 },
          ],
        },
      ],
    },

    // FAQ CASHFLOW
    faq: {
      badge: 'FAQ',
      title: 'Najczęściej zadawane pytania',
      swipeHint: 'Przesuń w prawo',
      items: [
        {
          q: 'Czy potrzebuję wcześniejszej wiedzy ekonomicznej?',
          a: 'Absolutnie nie! Prowadzący tłumaczy zasady w 15-20 minut przed rozpoczęciem partii, rozdaje formularze i wspiera uczestników przez całą grę. 80% osób gra po raz pierwszy.',
        },
        {
          q: 'Gdzie i kiedy odbywają się spotkania?',
          a: 'Gry organizujemy w Katowicach, Krakowie, Wrocławiu, Warszawie i innych miastach w przytulnych kawiarniach i przestrzeniach coworkingowych. Dokładny harmonogram przesyłamy indywidualnie.',
        },
        {
          q: 'Ile trwa sesja gry?',
          a: 'Średnio 4-5 godzin: 20 minut teorii i zasad, 3-4 godziny czystej gry oraz 40 minut finałowego podsumowania, analizy zachowań i networkingu.',
        },
      ],
    },

    // HERO WOODIQ
    heroWoodIQ: {
      badge: '🪵 Drewniane gry premium na wydarzenia',
      title: 'Eko-gry i niezwykłe łamigłówki na Twoje wydarzenia',
      desc: 'Wynajem ręcznie wykonanych drewnianych gier na imprezy firmowe, wesela, festiwale i spotkania rodzinne.',
      cta: 'Zamów na wydarzenie',
      handmade: 'Ręcznie wykonane drewniane gry',
    },

    // WOODIQ CATALOG
    woodCatalog: {
      title: 'Popularne drewniane gry',
      bookGame: 'Zarezerwuj grę',
      games: {
        fiveInARow: {
          name: 'Cztery w rzędzie',
          desc: 'Wielka drewniana wersja klasycznej gry. Ułóż jako pierwszy 4 krążki w jednej linii pionowo, poziomo lub po skosie.',
          tag: 'Strategia & Rywalizacja',
        },
        django: {
          name: 'Wielka Jenga',
          desc: 'Gigantyczna drewniana wieża, z której ostrożnie wyciąga się klocki i układa na szczycie, nie dopuszczając do jej zawalenia.',
          tag: 'Zręczność & Zabawa',
        },
        balance: {
          name: 'Dysk Równowagi',
          desc: 'Utrzymaj dysk w balansie i przesuwaj elementy po powierzchni, starając się nie dopuścić do ich upadku.',
          tag: 'Balans & Precyzja',
        },
      },
    },

    // WOODIQ SELLING & CATALOG
    woodSelling: {
      badge: 'WoodIQ Katalog',
      title: 'Kupno i wynajem drewnianych gier',
      subtitle: 'Wielkie drewniane gry rękodzielnicze na imprezy firmowe, wesela, festiwale lub do prywatnej kolekcji.',
      details: 'Szczegóły',
      buyGame: 'Kup grę',
      rentGame: 'Wynajmij',
      purchase: 'Kupno',
      rental: 'Wynajem',
      categories: {
        all: 'Wszystkie',
        puzzles: '🧩 Łamigłówki',
        wooden: '🪵 Gry drewniane',
        exclusive: '✨ Ekskluzywne',
        magnets: '🧲 Magnesy',
      },
      infoCards: [
        {
          icon: '🚚',
          title: 'Dostawa',
          desc: 'Dowieziemy gry bezpośrednio na Twoje wydarzenie w dowolnym mieście w Polsce.',
        },
        {
          icon: '📦',
          title: 'Wszystko w zestawie',
          desc: 'Wszystkie elementy gry, zasady i akcesoria wchodzą w skład zestawu.',
        },
        {
          icon: '🎉',
          title: 'Na każde wydarzenie',
          desc: 'Idealne na integracje, wesela, urodziny, targi i festiwale.',
        },
      ],
      games: [
        {
          name: 'Cztery w rzędzie',
          description: 'Duża drewniana wersja klasycznej gry logicznej. Świetna na turnieje i imprezy integracyjne.',
          tag: 'Strategia',
          rental: '50 zł/dzień',
          sale: 'od 60 €',
        },
        {
          name: 'Wielka Jenga',
          description: 'Gigantyczna wieża z klocków z litego drewna. Im wyższa wieża, tym większe emocje!',
          tag: 'Zabawa',
          rental: '50 zł/dzień',
          sale: 'od 75 €',
        },
        {
          name: 'Dysk Równowagi',
          description: 'Gra sprawdzająca zręczność i opanowanie. Utrzymaj elementy na ruchomym dysku.',
          tag: 'Zręczność',
          rental: '50 zł/dzień',
          sale: 'od 60 €',
        },
        {
          name: 'Cymbergaj / Air Hockey',
          description: 'Dynamiczna gra dla dwóch graczy. Liczy się refleks, szybkość i celność.',
          tag: 'Rywalizacja',
          rental: '50 zł/dzień',
          sale: 'od 85 €',
        },
        {
          name: 'Elastik',
          description: 'Szybka gra zręcznościowa na gumkach. Wystrzel wszystkie krążki na pole przeciwnika.',
          tag: 'Refleks',
          rental: '50 zł/dzień',
          sale: 'od 60 €',
        },
        {
          name: 'Memory Fort Boyard',
          description: 'Wielka wersja gry pamięciowej w klimacie Fort Boyard. Znajdź pasujące pary.',
          tag: 'Pamięć',
          rental: '50 zł/dzień',
          sale: 'od 60 €',
        },
        {
          name: 'Magnesy',
          description: 'Wciągająca gra ze strategicznym rozmieszczaniem kulek magnetycznych.',
          tag: 'Strategia',
          rental: '50 zł/dzień',
          sale: 'od 45 €',
        },
        {
          name: 'Kulbito',
          description: 'Nietypowa gra balansowa, w której precyzyjnie prowadzisz kulki do celu.',
          tag: 'Precyzja',
          rental: '50 zł/dzień',
          sale: 'od 85 €',
        },
        {
          name: 'Plinko',
          description: 'Wielka tablica Plinko. Wpuść kulkę i patrz, jak odbija się w drodze do punktowanych pól.',
          tag: 'Zabawa',
          rental: '50 zł/dzień',
          sale: 'od 85 €',
        },
      ],
    },

    // WOODIQ RENTAL
    woodRental: {
      badge: 'WOOD IQ',
      subtitle: 'Wybierz liczbę gier i czas wynajmu. Stwórz niezapomnianą atmosferę.',
      rentalPeriod: 'Okres wynajmu',
      selectDuration: 'Wybierz czas trwania',
      day1: '1 dzień',
      day2: '2 dni',
      gamesCount: 'Liczba gier',
      profitable: 'Warto',
      cost: 'Koszt',
      forPeriod: 'za',
      hint: '✦ Optymalny wariant na większe wydarzenia',
      infoDelivery: 'Dostawa dostępna',
      infoGames: 'Duże drewniane gry',
      infoHours: '8:00 — 20:00',
      bookBtn: 'Zarezerwuj',
      megaJengaTitle: 'Mega Jenga',
      megaJengaPrice: '100 zł / 150 zł',
      megaJengaDesc: 'Gigantyczna wieża — w wynajmie liczy się jak 2 gry',
      addOption: 'Wybierz →',
      chooseBtn: 'Wybierz',
      selectedBtn: '✓ Wybrano',
      additionalTitle: 'Dodatkowe usługi',
      additionalSubtitle: 'Zadbamy o to, by organizacja przebiegła bezproblemowo.',
      bigEventTitle: 'Potrzebujesz gier na duże wydarzenie?',
      bigEventDesc: 'Jeśli potrzebujesz 20 i więcej gier, transportu, montażu lub animatora — skontaktuj się z nami. Przygotujemy indywidualną ofertę.',
      getOfferBtn: 'Otrzymaj ofertę',
      services: [
        {
          title: 'Dostawa i montaż gier',
          price: '100 zł',
          description: 'Przywieziemy, rozstawimy i przygotujemy gry do zabawy',
          icon: '🚚',
        },
        {
          title: 'Usługa animatora',
          price: '50 zł/godz.',
          description: 'Profesjonalne prowadzenie rozgrywek i turniejów',
          icon: '🎯',
        },
        {
          title: 'Wynajem stolików',
          price: '25 zł/szt.',
          description: 'Wygodne stoliki dopasowane do gier',
          icon: '🪑',
        },
        {
          title: 'Konsultacja',
          price: 'Bezpłatnie',
          description: 'Pomożemy dobrać gry pod charakter Twojego eventu',
          icon: '💬',
        },
      ],
      megaJengaNote: '🧱 Mega Jenga to gigantyczna wieża z drewna — w kalkulatorze wynajmu liczy się jako 2 gry (100 zł / 1 dzień, 150 zł / 2 dni).',
      rentalTiers: [
        { id: '1', title: '1 gra', day1: 50, day2: 100 },
        { id: 'megajenga', title: 'Mega Jenga (liczy się jako 2 gry)', day1: 100, day2: 150 },
        { id: '2', title: '2 gry', day1: 100, day2: 150 },
        { id: '3', title: '3 gry', day1: 150, day2: 200 },
        { id: '4', title: '4 gry', day1: 200, day2: 300 },
        { id: '5', title: '5 gier', day1: 250, day2: 400 },
        { id: '7', title: '7 gier', day1: 300, day2: 500 },
        { id: '10', title: '10 gier', day1: 400, day2: 600 },
        { id: '20plus', title: '20+ gier', day1: 1000, day2: 1500, popular: true },
      ],
    },

    // WOODIQ FAQ
    woodFaq: {
      badge: 'FAQ',
      title: 'Odpowiedzi na częste pytania',
      swipeHint: 'Przesuń w prawo',
      items: [
        {
          q: 'Jakie drewniane gry można wynająć?',
          a: 'W ofercie mamy wielkie gry zręcznościowe, logiczne i turniejowe na wesela, integracje i festiwale. Możesz wybrać pojedyncze gry lub skomponować zestaw.',
        },
        {
          q: 'Czy można kupić gry na własność lub na prezent?',
          a: 'Tak! Wszystkie gry wykonujemy ręcznie z litego drewna i są dostępne także w sprzedaży detalicznej i hurtowej w cenach w EUR.',
        },
        {
          q: 'Jak zarezerwować lub kupić gry?',
          a: 'Wybierz interesujący format w formularzu lub skontaktuj się z nami. Ustalimy dostępność, termin dostawy i dogodne warunki.',
        },
      ],
    },

    // PRODUCT SWITCHER
    switcher: {
      anotherProduct: 'Kolejny produkt',
      weAlsoHave: 'Mamy również',
      woodiqTitle: 'WOODIQ',
      woodiqDesc: 'Drewniane gry na imprezy i do domu',
      cashflowTitle: 'CASHFLOW CLUB',
      cashflowDesc: 'Finansowa gra-trening',
    },

    // FOOTER
    footer: {
      cashflowRights: '© 2026 Cashflow Club. Wszelkie prawa zastrzeżone.',
      woodiqRights: '© 2026 WoodIQ. Wszelkie prawa zastrzeżone.',
    },

    // KOSZYK / CART
    cart: {
      title: 'Koszyk gier',
      badge: 'Wybrane gry',
      emptyTitle: 'Twój koszyk jest pusty',
      emptyDesc: 'Kliknij ikonę koszyka 🛒 na grach w katalogu, aby dodać je do zamówienia.',
      countGames: '{count} gier',
      selectedGames: 'Wybrane gry ({count})',
      megaJengaTwoGames: '🧱 Liczy się jak 2 gry w wynajmie',
      removeBtn: 'Usuń',
      orderRentalBtn: 'Zarezerwuj wynajem',
      orderPurchaseBtn: 'Kup wybrane gry',
      viewPhoto: 'Powiększ zdjęcie',
      addToCart: 'Dodaj do koszyka',
      inCart: 'W koszyku',
      totalEquivalent: 'Łączny ekwiwalent: {count} gier',
      selectedCount: 'Liczba gier: {count}',
    },

    // BOOKING MODAL (CASHFLOW)
    bookingModal: {
      title: 'Zarezerwuj miejsce',
      subtitle: 'Wypełnij formularz, a skontaktujemy się z Tobą.',
      freeSpots: 'Wolnych miejsc',
      nameLabel: 'Imię',
      namePlaceholder: 'Jan',
      phoneLabel: 'Telefon',
      contactLabel: 'Komunikator / Kontakt',
      messengerHandleLabel: 'Nick w aplikacji',
      messengerHandlePlaceholder: '@username lub numer',
      cityLabel: 'Miasto',
      planLabel: 'Wybór planu',
      participant1: '1 uczestnik',
      participant2: '2 uczestników (z osobą towarzyszącą)',
      participantsSummary: 'Uczestnicy',
      costSummary: 'Koszt',
      submitBtn: 'Zarezerwuj',
      sendingBtn: 'Wysyłanie...',
      closedBtn: 'Rejestracja zamknięta',
      successTitle: 'Zgłoszenie wysłane',
      successDesc: 'Dziękujemy! Skontaktujemy się wkrótce, aby potwierdzić Twój udział.',
      closeBtn: 'Zamknij',
      errorNameRequired: 'Wprowadź swoje imię',
      errorPhoneRequired: 'Wprowadź poprawny 9-cyfrowy numer telefonu',
      errorCityRequired: 'Wybierz miasto',
      errorPhone: 'Wprowadź poprawny polski numer telefonu (+48).',
      errorSpots: 'Pozostało tylko {spots} miejsc.',
      errorGeneral: 'Nie udało się wysłać zgłoszenia.',
    },

    // WOODIQ ORDER MODAL
    woodModal: {
      badge: 'WOOD IQ Zamów gry',
      subtitle: 'Wybierz format, liczbę gier i miasto. Wynajem rozliczany w PLN (zł), zakup w EUR (€).',
      formatLabel: 'Format zamówienia',
      rentalOption: 'Wynajem',
      rentalSub: 'Na wydarzenie (PLN)',
      purchaseOption: 'Kupno',
      purchaseSub: 'Gry na stałe (EUR)',
      cityLabel: 'Miasto',
      gamesCountLabel: 'Liczba gier',
      durationLabel: 'Czas wynajmu',
      day1: '1 dzień',
      day2: '2 dni',
      deliveryLabel: '🚚 Dostawa i montaż',
      deliverySub: 'Dowieziemy, zmontujemy i przygotujemy gry',
      nameLabel: 'Imię',
      namePlaceholder: 'Jan',
      phoneLabel: 'Telefon',
      messengerLabel: 'Komunikator / Kontakt',
      messengerHandleLabel: 'Nick w aplikacji',
      messengerHandlePlaceholder: '@username lub numer',
      commentLabel: 'Komentarz',
      commentPlaceholder: 'Data wydarzenia, adres, dodatkowe życzenia...',
      summaryFormat: 'Format',
      summaryGames: 'Liczba gier',
      summaryDuration: 'Czas',
      summaryPrice: 'Gry',
      summaryDelivery: 'Dostawa',
      summaryTotal: 'Łącznie',
      submitBtn: 'Wyślij zgłoszenie',
      sendingBtn: 'Wysyłanie...',
      successTitle: 'Zgłoszenie wysłane',
      successDesc: 'Dziękujemy! Otrzymaliśmy Twoje zgłoszenie. Skontaktujemy się wkrótce, aby potwierdzić szczegóły.',
      closeBtn: 'Zamknij',
      errorNameRequired: 'Wprowadź swoje imię',
      errorPhoneRequired: 'Wprowadź poprawny 9-cyfrowy numer telefonu',
      errorCityRequired: 'Wybierz miasto',
      errorGamesRequired: 'Wybierz liczbę gier',
      errorPhone: 'Wprowadź poprawny polski numer telefonu (+48).',
      errorCity: 'Wybierz miasto.',
      errorGames: 'Wybierz liczbę gier.',
      errorGeneral: 'Nie udało się wysłać zgłoszenia.',
    },
  },

  uk: {
    // HEADER
    header: {
      cashflowClub: 'CASHFLOW',
      cashflowClubSub: 'CLUB',
      woodiq: 'WOOD',
      woodiqSub: 'IQ',
      schedule: 'Найближча гра',
      about: 'Про тренінг',
      process: 'Процес',
      quiz: 'Тест IQ',
      woodCatalog: 'Каталог ігор',
      woodPricing: 'Купівля',
      woodRental: 'Оренда',
      faq: 'FAQ',
      bookSpot: 'Забронювати місце',
      orderGames: 'Замовити ігри',
    },

    // HERO CASHFLOW
    heroCashflow: {
      badge: 'Інтерактивний тренінг фінансового мислення в Польщі',
      title1: 'Вирвись із фінансової рутини за ',
      titleHighlight: '4 години',
      title2: ' гри',
      desc: 'Легендарний економічний симулятор Роберта Кійосакі. Прокачайте інвестиційне мислення, укладаючи ризиковані угоди на папері, а не на реальних грошах.',
      cta: 'Записатися на гру',
    },

    // SCHEDULE CASHFLOW
    schedule: {
      badge: '⚡ Найближча зустріч',
      defaultDate: 'Субота, 18:00',
      defaultPlace: 'Адреса уточнюється',
      spotsLeft: 'Залишилося вільних місць:',
      sectionTitle: 'Оберіть формат участі',
      sectionSubtitle: 'Забронюйте місце просто зараз — кількість учасників за столом суворо обмежена.',
      swipeHint: 'Свайпніть вправо',
      popularBadge: 'Найпопулярніший',
      currency: 'PLN',
      tiers: {
        test: {
          title: 'Тест-Драйв',
          subtitle: 'Одне індивідуальне місце за ігровим столом',
          cta: 'Забронювати 1 місце',
          features: [
            'Участь у грі (4 години)',
            'Навчання правилам з нуля (20 хв)',
            'Кава, чай та частування на перерві',
            'Індивідуальний розбір фінансових стратегій',
          ],
        },
        combo: {
          title: 'Комбо на двох',
          subtitle: 'Спеціальна ціна для пар або друзів',
          cta: 'Забронювати 2 місця',
          features: [
            '2 квитки на одну гру',
            'Знижка порівняно з одиночним записом',
            'Гарантовані сусідні місця за столом',
            'Спільний розбір партнерських стратегій',
          ],
        },
      },
    },

    // BENEFITS CASHFLOW
    benefits: {
      title: 'Чого ви навчитеся на тренінгу',
      subtitle: 'Cashflow — це не просто монополія. Це детальна модель вашої фінансової поведінки в реальному житті.',
      items: [
        {
          title: 'Бачити можливості',
          desc: 'Зрозумієте, як знаходити прибуткові угоди в нерухомості, бізнесі та акціях там, де інші бачать лише кризу та витрати.',
        },
        {
          title: 'Керувати ризиками',
          desc: 'Навчитеся балансувати між ризикованими стартапами та надійними облігаціями без ризику втратити реальний капітал.',
        },
        {
          title: 'Корисний нетворкінг',
          desc: 'За столом збираються підприємці, фрилансери та інвестори. Ідеальне місце для пошуку партнерів у Польщі.',
        },
      ],
    },

    // TIMELINE CASHFLOW
    timeline: {
      title: 'Як проходять 4 години тренінгу',
      subtitle: 'Повноцінна симуляція вашого фінансового життя, розбита на комфортні етапи.',
      steps: [
        {
          time: '15 хв',
          title: 'Знайомство та збір учасників',
          desc: 'Знайомимося за чашкою кави та обговорюємо цілі гри.',
        },
        {
          time: '90 - 100 хв',
          title: 'Перша частина гри',
          desc: 'Вчимося зводити баланс, інвестувати вільні кошти в акції та нерухомість, проходити кризи.',
        },
        {
          time: '10 - 15 хв',
          title: 'Кава-брейк та нетворкінг',
          desc: 'Неформальне спілкування, обмін першими інсайтами та контактами.',
        },
        {
          time: '90 - 100 хв',
          title: 'Друга частина гри',
          desc: 'Створюємо пасивний дохід, що перевищує витрати. Купуємо великі бізнеси та укладаємо мільйонні угоди.',
        },
        {
          time: '15 - 20 хв',
          title: 'Підбиття підсумків та аналіз патернів',
          desc: 'Кожен гравець отримує індивідуальний розбір своїх фінансових патернів від ведучого.',
        },
      ],
    },

    // QUIZ CASHFLOW
    quiz: {
      title: 'Визначте свій рівень фінансового IQ',
      subtitle: 'Лише 3 короткі запитання допоможуть зрозуміти, де ви втрачаєте гроші.',
      questionLabel: 'Запитання',
      of: 'з',
      completedTitle: 'Тест завершено!',
      levels: {
        investor: {
          label: 'Рівень: Прагматичний Інвестор',
          desc: 'Ви чудово розумієте базові закони руху грошей. На грі Cashflow ви зможете закріпити цей успіх у складних переговорах та угодах.',
        },
        saver: {
          label: 'Рівень: Розважливий Накопичувач',
          desc: 'Ви вмієте уникати зайвих витрат, але ваші гроші все ще лежать без діла або знецінюються інфляцією. Гра покаже, як змусити капітал працювати.',
        },
        hostage: {
          label: 'Рівень: Заручник фінансової системи',
          desc: 'Ви живете одним днем, і будь-який форс-мажор загрожує боргами. Варто якнайшвидше переналаштувати звички на безпечному симуляторі.',
        },
      },
      restart: 'Пройти ще раз',
      discuss: 'Обговорити на грі наживо',
      questions: [
        {
          q: 'Яка частка ваших доходів щомісяця йде на інвестиції або заощадження?',
          options: [
            { text: 'Витрачаю абсолютно все, іноді беру розстрочки чи кредити', points: 0 },
            { text: 'Відкладаю залишки, але без чіткої системи', points: 1 },
            { text: 'Стабільно інвестую не менше 10-20% доходів', points: 3 },
          ],
        },
        {
          q: 'Якщо завтра ви втратите основне джерело доходу, як довго ви зможете прожити?',
          options: [
            { text: 'Менше 2-3 тижнів, заощаджень практично немає', points: 0 },
            { text: 'Від 1 до 3 місяців у режимі жорсткої економії', points: 1 },
            { text: 'Понад 6 місяців завдяки сформованій фінансовій подушці', points: 3 },
          ],
        },
        {
          q: 'Яка ваша основна мета при покупках у кредит або на виплат?',
          options: [
            { text: 'Купівля нової техніки, одягу, відпочинку для себе', points: 0 },
            { text: 'Крайні життєві ситуації (здоров’я, ремонт авто)', points: 1 },
            { text: 'Купівля інструментів, комерційного авто чи активів для справи', points: 3 },
          ],
        },
      ],
    },

    // FAQ CASHFLOW
    faq: {
      badge: 'FAQ',
      title: 'Відповіді на популярні запитання',
      swipeHint: 'Свайпніть вправо',
      items: [
        {
          q: 'Чи потрібні глибокі знання в економіці перед початком?',
          a: 'Абсолютно ні! Ведучий пояснює правила за 15-20 хвилин до початку, видає бланки та супроводжує підказками всю гру. 80% учасників грають уперше.',
        },
        {
          q: 'Де і коли проходять ігри?',
          a: 'Ігри організуються в затишних просторах і коворкінгах у Катовіцах, Кракові, Вроцлаві, Варшаві та інших містах. Точний розклад ми надсилаємо індивідуально.',
        },
        {
          q: 'Скільки триває ігрова сесія?',
          a: 'У середньому 4-5 годин: 20 хвилин теорії та правил, 3-4 години чистої гри та 40 хвилин фінального розбору патернів поведінки і нетворкінгу.',
        },
      ],
    },

    // HERO WOODIQ
    heroWoodIQ: {
      badge: '🪵 Преміальні дерев’яні ігри на заходи',
      title: 'Еко-ігри та незвичайні головоломки для ваших івентів',
      desc: 'Оренда дерев’яних ігор ручної роботи для корпоративів, весіль, фестивалів та сімейних свят.',
      cta: 'Замовити на подію',
      handmade: 'Дерев’яні ігри ручної роботи',
    },

    // WOODIQ CATALOG
    woodCatalog: {
      title: 'Популярні дерев’яні ігри',
      bookGame: 'Забронювати гру',
      games: {
        fiveInARow: {
          name: 'Чотири в ряд',
          desc: 'Велика дерев’яна версія класичної гри. Зберіть першим 4 фішки поспіль по горизонталі, вертикалі чи діагоналі.',
          tag: 'Стратегія & Змагання',
        },
        django: {
          name: 'Велика Дженга',
          desc: 'Гігантська дерев’яна вежа, з якої потрібно обережно витягати бруски і ставити нагору, не зруйнувавши конструкцію.',
          tag: 'Влучність & Веселощі',
        },
        balance: {
          name: 'Баланс Диск',
          desc: 'Утримуйте диск у рівновазі та переміщуйте елементи по поверхні, намагаючись не допустити їх падіння.',
          tag: 'Баланс & Спритність',
        },
      },
    },

    // WOODIQ SELLING & CATALOG
    woodSelling: {
      badge: 'WoodIQ Каталог',
      title: 'Купівля та оренда дерев’яних ігор',
      subtitle: 'Великі дерев’яні ігри ручної роботи для корпоративів, свят, весіль, фестивалів або у приватну колекцію.',
      details: 'Детальніше',
      buyGame: 'Купити гру',
      rentGame: 'Орендувати',
      purchase: 'Купівля',
      rental: 'Оренда',
      categories: {
        all: 'Всі',
        puzzles: '🧩 Головоломки',
        wooden: '🪵 Дерев’яні ігри',
        exclusive: '✨ Ексклюзивні',
        magnets: '🧲 Магніти',
      },
      infoCards: [
        {
          icon: '🚚',
          title: 'Доставка',
          desc: 'Привеземо ігри безпосередньо на вашу подію в будь-яке місто Польщі.',
        },
        {
          icon: '📦',
          title: 'Усе в комплекті',
          desc: 'Усі ігрові елементи, правила та аксесуари входять до комплекту.',
        },
        {
          icon: '🎉',
          title: 'Для будь-яких подій',
          desc: 'Підійдуть для корпоративів, весіль, свят, виставок та фестивалів.',
        },
      ],
      games: [
        {
          name: 'Чотири в ряд',
          description: 'Велика дерев’яна версія класичної гри. Чудовий варіант для турнірів та корпоративів.',
          tag: 'Стратегія',
          rental: '50 zł/день',
          sale: 'від 60 €',
        },
        {
          name: 'Велика Дженга',
          description: 'Гігантська дерев’яна вежа для веселих змагань. Що вища вежа — то більше емоцій!',
          tag: 'Веселощі',
          rental: '50 zł/день',
          sale: 'від 75 €',
        },
        {
          name: 'Баланс Диск',
          description: 'Гра на спритність і концентрацію. Утримуйте баланс рухомого диска.',
          tag: 'Спритність',
          rental: '50 zł/день',
          sale: 'від 60 €',
        },
        {
          name: 'Аерохокей',
          description: 'Динамічна дерев’яна гра для двох. Змагайтеся у швидкості, реакції та точності.',
          tag: 'Змагання',
          rental: '50 zł/день',
          sale: 'від 85 €',
        },
        {
          name: 'Еластик',
          description: 'Швидка гра на реакцію та координацію. Запустіть усі фішки на поле суперника.',
          tag: 'Реакція',
          rental: '50 zł/день',
          sale: 'від 60 €',
        },
        {
          name: 'Меморі Форт Боярд',
          description: 'Велика версія гри на пам’ять у стилі Форт Боярд. Знаходьте однакові пари.',
          tag: 'Пам’ять',
          rental: '50 zł/день',
          sale: 'від 60 €',
        },
        {
          name: 'Магніти',
          description: 'Захоплива настільна гра з магнітними елементами та стратегічним розрахунком.',
          tag: 'Стратегія',
          rental: '50 zł/день',
          sale: 'від 45 €',
        },
        {
          name: 'Кульбіто',
          description: 'Незвичайна дерев’яна гра, де ви плавно координуєте рух кульок до лунок.',
          tag: 'Спритність',
          rental: '50 zł/день',
          sale: 'від 85 €',
        },
        {
          name: 'Плінко',
          description: 'Велика дошка Плінко. Запускайте кульку зверху і набирайте максимальні бали.',
          tag: 'Веселощі',
          rental: '50 zł/день',
          sale: 'від 85 €',
        },
      ],
    },

    // WOODIQ RENTAL
    woodRental: {
      badge: 'WOOD IQ',
      subtitle: 'Оберіть кількість ігор та тривалість оренди. Створіть незабутню атмосферу.',
      rentalPeriod: 'Період оренди',
      selectDuration: 'Оберіть тривалість',
      day1: '1 день',
      day2: '2 дні',
      gamesCount: 'Кількість ігор',
      profitable: 'Вигідно',
      cost: 'Вартість',
      forPeriod: 'за',
      hint: '✦ Оптимальний варіант для великих подій',
      infoDelivery: 'Доставка доступна',
      infoGames: 'Великі дерев’яні ігри',
      infoHours: '8:00 — 20:00',
      bookBtn: 'Забронювати',
      megaJengaTitle: 'Mega Jenga',
      megaJengaPrice: '100 zł / 150 zł',
      megaJengaDesc: 'Гігантська вежа — в оренді рахується як 2 гри',
      addOption: 'Обрати →',
      chooseBtn: 'Обрати',
      selectedBtn: '✓ Обрано',
      additionalTitle: 'Додаткові послуги',
      additionalSubtitle: 'Зробимо організацію вашої події максимально простою.',
      bigEventTitle: 'Потрібні ігри для великої події?',
      bigEventDesc: 'Якщо вам потрібно 20 і більше ігор, доставка, монтаж або допомога аніматора — зв’яжіться з нами. Ми підготуємо пропозицію під вашу подію.',
      getOfferBtn: 'Отримати пропозицію',
      services: [
        {
          title: 'Доставка та монтаж ігор',
          price: '100 zł',
          description: 'Привеземо, встановимо та підготуємо ігри до початку свята',
          icon: '🚚',
        },
        {
          title: 'Послуги аніматора',
          price: '50 zł/год',
          description: 'Професійний супровід та проведення турнірів',
          icon: '🎯',
        },
        {
          title: 'Оренда столиків',
          price: '25 zł/шт.',
          description: 'Зручні столики для комфортного розміщення ігор',
          icon: '🪑',
        },
        {
          title: 'Консультація',
          price: 'Безкоштовно',
          description: 'Допоможемо підібрати ігри під формат та гостей вашого заходу',
          icon: '💬',
        },
      ],
      megaJengaNote: '🧱 Mega Jenga — гігантська дерев’яна вежа, в оренду рахується як 2 стандартні гри (100 zł / 1 день, 150 zł / 2 дні).',
      rentalTiers: [
        { id: '1', title: '1 гра', day1: 50, day2: 100 },
        { id: 'megajenga', title: 'Mega Jenga (рахується як 2 гри)', day1: 100, day2: 150 },
        { id: '2', title: '2 гри', day1: 100, day2: 150 },
        { id: '3', title: '3 гри', day1: 150, day2: 200 },
        { id: '4', title: '4 гри', day1: 200, day2: 300 },
        { id: '5', title: '5 ігор', day1: 250, day2: 400 },
        { id: '7', title: '7 ігор', day1: 300, day2: 500 },
        { id: '10', title: '10 ігор', day1: 400, day2: 600 },
        { id: '20plus', title: '20+ ігор', day1: 1000, day2: 1500, popular: true },
      ],
    },

    // WOODIQ FAQ
    woodFaq: {
      badge: 'FAQ',
      title: 'Відповіді на поширені запитання',
      swipeHint: 'Свайпніть вправо',
      items: [
        {
          q: 'Які дерев’яні ігри можна орендувати?',
          a: 'У каталозі представлені різноманітні ігри для корпоративів, весіль, вечірок та фестивалів. Ви можете обрати окремі ігри або зібрати індивідуальний сет.',
        },
        {
          q: 'Чи можна придбати ігри у власність або на подарунок?',
          a: 'Так! Усі ігри ми виготовляємо власноруч із натурального дерева, і вони доступні для покупки в EUR (€).',
        },
        {
          q: 'Як оформити оренду чи покупку?',
          a: 'Оберіть бажані ігри у формі або напишіть нам. Ми уточнимо наявність, дату доставки та зручні умови.',
        },
      ],
    },

    // PRODUCT SWITCHER
    switcher: {
      anotherProduct: 'Ще один продукт',
      weAlsoHave: 'Також у нас є',
      woodiqTitle: 'WOODIQ',
      woodiqDesc: 'Дерев’яні ігри для подій та дому',
      cashflowTitle: 'CASHFLOW CLUB',
      cashflowDesc: 'Фінансова гра-тренінг',
    },

    // FOOTER
    footer: {
      cashflowRights: '© 2026 Cashflow Club. Усі права захищені.',
      woodiqRights: '© 2026 WoodIQ. Усі права захищені.',
    },

    // KOSZYK / CART
    cart: {
      title: 'Кошик ігор',
      badge: 'Обрані ігри',
      emptyTitle: 'Ваш кошик порожній',
      emptyDesc: 'Натисніть на іконку кошика 🛒 біля ігор у каталозі, щоб додати їх до замовлення.',
      countGames: '{count} ігор',
      selectedGames: 'Обрані ігри ({count})',
      megaJengaTwoGames: '🧱 Рахується як 2 гри в оренді',
      removeBtn: 'Видалити',
      orderRentalBtn: 'Оформити оренду',
      orderPurchaseBtn: 'Купити обрані ігри',
      viewPhoto: 'Переглянути фото',
      addToCart: 'Додати в кошик',
      inCart: 'У кошику',
      totalEquivalent: 'Загальний еквівалент: {count} ігор',
      selectedCount: 'Кількість ігор: {count}',
    },

    // BOOKING MODAL (CASHFLOW)
    bookingModal: {
      title: 'Забронювати місце',
      subtitle: 'Заповніть форму, і ми зв’яжемося з вами.',
      freeSpots: 'Вільних місць',
      nameLabel: 'Ім’я',
      namePlaceholder: 'Олександр',
      phoneLabel: 'Телефон',
      contactLabel: 'Месенджер / Зв’язок',
      messengerHandleLabel: 'Нікнейм у соцмережі',
      messengerHandlePlaceholder: '@username або номер',
      cityLabel: 'Місто',
      planLabel: 'Вибір плану',
      participant1: '1 учасник',
      participant2: '2 учасники (з другом)',
      participantsSummary: 'Учасники',
      costSummary: 'Вартість',
      submitBtn: 'Забронювати',
      sendingBtn: 'Надсилання...',
      closedBtn: 'Реєстрація закрита',
      successTitle: 'Заявку надіслано',
      successDesc: 'Дякуємо! Ми зв’яжемося з вами найближчим часом для підтвердження участі.',
      closeBtn: 'Закрити',
      errorNameRequired: 'Будь ласка, введіть ваше ім’я',
      errorPhoneRequired: 'Введіть 9 цифр номера (+48 XXX XXX XXX)',
      errorCityRequired: 'Будь ласка, оберіть місто',
      errorPhone: 'Введіть коректний польський номер телефону (+48).',
      errorSpots: 'Залишилося тільки {spots} місць.',
      errorGeneral: 'Не вдалося надіслати заявку.',
    },

    // WOODIQ ORDER MODAL
    woodModal: {
      badge: 'WOOD IQ Замовити ігри',
      subtitle: 'Оберіть формат, кількість ігор та місто. Оренда розраховується в PLN (zł), купівля в EUR (€).',
      formatLabel: 'Формат замовлення',
      rentalOption: 'Оренда',
      rentalSub: 'На захід (PLN)',
      purchaseOption: 'Купівля',
      purchaseSub: 'Ігри назавжди (EUR)',
      cityLabel: 'Місто',
      gamesCountLabel: 'Кількість ігор',
      durationLabel: 'Термін оренди',
      day1: '1 день',
      day2: '2 дні',
      deliveryLabel: '🚚 Доставка та монтаж',
      deliverySub: 'Привеземо, встановимо та підготуємо ігри',
      nameLabel: 'Ім’я',
      namePlaceholder: 'Олександр',
      phoneLabel: 'Телефон',
      messengerLabel: 'Месенджер / Зв’язок',
      messengerHandleLabel: 'Нікнейм у соцмережі',
      messengerHandlePlaceholder: '@username або номер',
      commentLabel: 'Коментар',
      commentPlaceholder: 'Дата події, адреса, додаткові побажання...',
      summaryFormat: 'Формат',
      summaryGames: 'Кількість ігор',
      summaryDuration: 'Термін',
      summaryPrice: 'Ігри',
      summaryDelivery: 'Доставка',
      summaryTotal: 'Разом',
      submitBtn: 'Надіслати заявку',
      sendingBtn: 'Надсилання...',
      successTitle: 'Заявку надіслано',
      successDesc: 'Дякуємо! Ми отримали вашу заявку і незабаром зв’яжемося з вами для узгодження деталей.',
      closeBtn: 'Закрити',
      errorNameRequired: 'Будь ласка, введіть ваше ім’я',
      errorPhoneRequired: 'Введіть 9 цифр номера (+48 XXX XXX XXX)',
      errorCityRequired: 'Будь ласка, оберіть місто',
      errorGamesRequired: 'Будь ласка, оберіть кількість ігор',
      errorPhone: 'Введіть коректний польський номер телефону (+48).',
      errorCity: 'Оберіть місто.',
      errorGames: 'Оберіть кількість ігор.',
      errorGeneral: 'Не вдалося надіслати заявку.',
    },
  },

  en: {
    // HEADER
    header: {
      cashflowClub: 'CASHFLOW',
      cashflowClubSub: 'CLUB',
      woodiq: 'WOOD',
      woodiqSub: 'IQ',
      schedule: 'Upcoming Game',
      about: 'About Training',
      process: 'Process',
      quiz: 'IQ Test',
      woodCatalog: 'Games Catalog',
      woodPricing: 'Purchase',
      woodRental: 'Rental',
      faq: 'FAQ',
      bookSpot: 'Book a Spot',
      orderGames: 'Order Games',
    },

    // HERO CASHFLOW
    heroCashflow: {
      badge: 'Interactive Financial Mindset Training in Poland',
      title1: 'Break out of the financial rat race in ',
      titleHighlight: '4 hours',
      title2: ' of gameplay',
      desc: 'Robert Kiyosaki’s legendary economic simulator. Build your investment mindset by executing high-stakes deals on paper rather than risking real capital.',
      cta: 'Join the Game',
    },

    // SCHEDULE CASHFLOW
    schedule: {
      badge: '⚡ Upcoming Event',
      defaultDate: 'Saturday, 18:00',
      defaultPlace: 'Location to be confirmed',
      spotsLeft: 'Available spots remaining:',
      sectionTitle: 'Select Participation Format',
      sectionSubtitle: 'Reserve your seat now — the number of players per table is strictly limited.',
      swipeHint: 'Swipe right',
      popularBadge: 'Most Popular',
      currency: 'PLN',
      tiers: {
        test: {
          title: 'Test-Drive',
          subtitle: 'One individual seat at the gaming table',
          cta: 'Book 1 Spot',
          features: [
            'Participation in the game (4 hours)',
            'Step-by-step rules tutorial (20 min)',
            'Coffee, tea and snacks during break',
            'Individual review of your financial strategies',
          ],
        },
        combo: {
          title: 'Combo for Two',
          subtitle: 'Special discounted price for couples or friends',
          cta: 'Book 2 Spots',
          features: [
            '2 tickets for one game session',
            'Discount compared to individual booking',
            'Guaranteed adjacent seats at the table',
            'Joint analysis of partner strategies',
          ],
        },
      },
    },

    // BENEFITS CASHFLOW
    benefits: {
      title: 'What You Will Learn',
      subtitle: 'Cashflow is far more than just Monopoly. It is an accurate simulation of your real-life financial behavior.',
      items: [
        {
          title: 'Spotting Opportunities',
          desc: 'Learn how to identify profitable deals in real estate, business, and stocks where others only see crises and expenses.',
        },
        {
          title: 'Risk Management',
          desc: 'Master balancing high-yield startups with secure bonds without putting your real hard-earned capital at risk.',
        },
        {
          title: 'Valuable Networking',
          desc: 'Entrepreneurs, freelancers, and investors gather around the table. The ideal setting to meet business partners in Poland.',
        },
      ],
    },

    // TIMELINE CASHFLOW
    timeline: {
      title: 'How the 4-Hour Session Unfolds',
      subtitle: 'A full-fledged simulation of your financial life divided into comfortable stages.',
      steps: [
        {
          time: '15 min',
          title: 'Welcome & Gathering',
          desc: 'Meeting fellow participants over a cup of coffee and defining session goals.',
        },
        {
          time: '90 - 100 min',
          title: 'First Half of the Game',
          desc: 'Balancing financial sheets, investing surplus cash in stocks & real estate, navigating economic downturns.',
        },
        {
          time: '10 - 15 min',
          title: 'Coffee Break & Networking',
          desc: 'Informal discussions, exchanging first impressions and contact details.',
        },
        {
          time: '90 - 100 min',
          title: 'Second Half of the Game',
          desc: 'Generating passive income that exceeds expenses. Acquiring major businesses and executing multi-million deals.',
        },
        {
          time: '15 - 20 min',
          title: 'Debrief & Financial Pattern Review',
          desc: 'Every player receives personalized feedback on their behavioral financial patterns from the host.',
        },
      ],
    },

    // QUIZ CASHFLOW
    quiz: {
      title: 'Test Your Financial IQ Level',
      subtitle: 'Just 3 quick questions to help identify where you might be leaking money.',
      questionLabel: 'Question',
      of: 'of',
      completedTitle: 'Quiz Completed!',
      levels: {
        investor: {
          label: 'Level: Pragmatic Investor',
          desc: 'You understand the fundamental laws of money velocity and cash flow. In Cashflow, you will solidify this skill in tough negotiations.',
        },
        saver: {
          label: 'Level: Sensible Saver',
          desc: 'You know how to avoid waste, but your money is still sitting idle or being eroded by inflation. The game shows how to put capital to work.',
        },
        hostage: {
          label: 'Level: Hostage of the System',
          desc: 'Living paycheck to paycheck leaves you vulnerable to unforeseen emergencies. It is time to recalibrate your financial habits on a safe simulator.',
        },
      },
      restart: 'Retake Quiz',
      discuss: 'Discuss Live at the Game',
      questions: [
        {
          q: 'What percentage of your income goes towards investments or savings each month?',
          options: [
            { text: 'I spend everything, sometimes relying on installment loans', points: 0 },
            { text: 'I save whatever is left over, without a systematic plan', points: 1 },
            { text: 'I consistently invest at least 10-20% of my earnings', points: 3 },
          ],
        },
        {
          q: 'If you were to lose your primary income tomorrow, how long could you sustain yourself?',
          options: [
            { text: 'Less than 2-3 weeks, I have virtually no savings', points: 0 },
            { text: '1 to 3 months under strict budget discipline', points: 1 },
            { text: 'Over 6 months thanks to an established emergency fund', points: 3 },
          ],
        },
        {
          q: 'What is your primary motive when buying on credit or installment plans?',
          options: [
            { text: 'Personal gadgets, clothing, or vacations', points: 0 },
            { text: 'Critical life emergencies (health, urgent car repair)', points: 1 },
            { text: 'Income-generating tools, business vehicles, or commercial assets', points: 3 },
          ],
        },
      ],
    },

    // FAQ CASHFLOW
    faq: {
      badge: 'FAQ',
      title: 'Frequently Asked Questions',
      swipeHint: 'Swipe right',
      items: [
        {
          q: 'Do I need prior economics knowledge?',
          a: 'Not at all! The host explains all rules in 15-20 minutes before the session, provides balance sheets, and guides you throughout. 80% of players are first-timers.',
        },
        {
          q: 'Where and when do the games take place?',
          a: 'Sessions are hosted in Katowice, Kraków, Wrocław, Warsaw, and other cities in cozy venues and coworking spaces. Exact schedules are sent individually.',
        },
        {
          q: 'How long does a session last?',
          a: 'Around 4-5 hours on average: 20 min rules breakdown, 3-4 hours of gameplay, and 40 min final debrief with networking.',
        },
      ],
    },

    // HERO WOODIQ
    heroWoodIQ: {
      badge: '🪵 Premium Wooden Games for Events',
      title: 'Eco-Games & Unique Puzzles for Your Events',
      desc: 'Handcrafted wooden game rentals for corporate retreats, weddings, festivals, and family celebrations.',
      cta: 'Book for an Event',
      handmade: 'Handcrafted wooden games',
    },

    // WOODIQ CATALOG
    woodCatalog: {
      title: 'Popular Wooden Games',
      bookGame: 'Book This Game',
      games: {
        fiveInARow: {
          name: 'Four in a Row',
          desc: 'Giant wooden edition of the classic game. Be the first to align 4 tokens horizontally, vertically, or diagonally.',
          tag: 'Strategy & Challenge',
        },
        django: {
          name: 'Giant Jenga',
          desc: 'Towering wooden block tower where players carefully pull blocks and restack them on top without causing a collapse.',
          tag: 'Skill & Fun',
        },
        balance: {
          name: 'Balance Disk',
          desc: 'Maintain disk equilibrium while maneuvering elements across the surface without letting them drop.',
          tag: 'Balance & Agility',
        },
      },
    },

    // WOODIQ SELLING & CATALOG
    woodSelling: {
      badge: 'WoodIQ Catalog',
      title: 'Purchase & Rental of Wooden Games',
      subtitle: 'Giant handcrafted wooden games for corporate events, weddings, festivals, or private collections.',
      details: 'View Details',
      buyGame: 'Buy Game',
      rentGame: 'Rent Game',
      purchase: 'Purchase',
      rental: 'Rental',
      categories: {
        all: 'All',
        puzzles: '🧩 Puzzles',
        wooden: '🪵 Wooden Games',
        exclusive: '✨ Exclusive',
        magnets: '🧲 Magnets',
      },
      infoCards: [
        {
          icon: '🚚',
          title: 'Delivery',
          desc: 'We deliver games directly to your event venue anywhere in Poland.',
        },
        {
          icon: '📦',
          title: 'All-Inclusive',
          desc: 'All playing pieces, instruction cards, and accessories are included.',
        },
        {
          icon: '🎉',
          title: 'For Any Occasion',
          desc: 'Perfect for corporate team buildings, weddings, parties, and festivals.',
        },
      ],
      games: [
        {
          name: 'Four in a Row',
          description: 'Large wooden edition of the classic strategy game. Great for tournament competitions.',
          tag: 'Strategy',
          rental: '50 zł/day',
          sale: 'from 60 €',
        },
        {
          name: 'Giant Jenga',
          description: 'Huge solid-wood block tower for hilarious competition. The higher it gets, the greater the thrill!',
          tag: 'Fun',
          rental: '50 zł/day',
          sale: 'from 75 €',
        },
        {
          name: 'Balance Disk',
          description: 'Test your agility and focus by keeping pieces balanced on a tilting wooden disk.',
          tag: 'Agility',
          rental: '50 zł/day',
          sale: 'from 60 €',
        },
        {
          name: 'Air Hockey',
          description: 'Fast-paced tabletop wooden air hockey for 2 players. Demands quick reflexes and precision.',
          tag: 'Competition',
          rental: '50 zł/day',
          sale: 'from 85 €',
        },
        {
          name: 'Elastic / Sling Puck',
          description: 'High-speed puck-slinging action. Shoot all your pucks into the opponent’s territory to win.',
          tag: 'Reflexes',
          rental: '50 zł/day',
          sale: 'from 60 €',
        },
        {
          name: 'Memory Fort Boyard',
          description: 'Giant memory challenge inspired by Fort Boyard. Find matching symbol pairs.',
          tag: 'Memory',
          rental: '50 zł/day',
          sale: 'from 60 €',
        },
        {
          name: 'Magnets',
          description: 'Captivating magnetic strategy game requiring tactical placement and steady hands.',
          tag: 'Strategy',
          rental: '50 zł/day',
          sale: 'from 45 €',
        },
        {
          name: 'Culbuto',
          description: 'Skillful balance game where you guide rolling spheres toward target scoring holes.',
          tag: 'Precision',
          rental: '50 zł/day',
          sale: 'from 85 €',
        },
        {
          name: 'Plinko',
          description: 'Giant Plinko drop board. Drop the ball from the top and watch it bounce to high-score slots.',
          tag: 'Fun',
          rental: '50 zł/day',
          sale: 'from 85 €',
        },
      ],
    },

    // WOODIQ RENTAL
    woodRental: {
      badge: 'WOOD IQ',
      subtitle: 'Choose your desired number of games and rental duration. Create an unforgettable event atmosphere.',
      rentalPeriod: 'Rental Period',
      selectDuration: 'Select duration',
      day1: '1 day',
      day2: '2 days',
      gamesCount: 'Number of Games',
      profitable: 'Best Value',
      cost: 'Price',
      forPeriod: 'for',
      hint: '✦ Optimal choice for larger gatherings and parties',
      infoDelivery: 'Delivery available',
      infoGames: 'Giant wooden games',
      infoHours: '8:00 AM — 8:00 PM',
      bookBtn: 'Book Now',
      megaJengaTitle: 'Mega Jenga',
      megaJengaPrice: '100 zł / 150 zł',
      megaJengaDesc: 'Giant wooden tower — in rental counts as 2 games',
      addOption: 'Select →',
      chooseBtn: 'Select',
      selectedBtn: '✓ Selected',
      additionalTitle: 'Additional Services',
      additionalSubtitle: 'We make event planning completely hassle-free.',
      bigEventTitle: 'Need Games for a Large Event?',
      bigEventDesc: 'If you need 20+ games, transportation, setup, or professional host assistance — reach out to us for a custom quote.',
      getOfferBtn: 'Get a Quote',
      services: [
        {
          title: 'Delivery & Setup',
          price: '100 zł',
          description: 'We deliver, assemble, and prep all games before your guests arrive',
          icon: '🚚',
        },
        {
          title: 'Event Animator',
          price: '50 zł/hr',
          description: 'Professional facilitation of games and tournament organization',
          icon: '🎯',
        },
        {
          title: 'Table Rental',
          price: '25 zł/ea',
          description: 'Convenient tables sized specifically for tabletop game setups',
          icon: '🪑',
        },
        {
          title: 'Consultation',
          price: 'Free',
          description: 'We help you choose the best game mix for your specific event style',
          icon: '💬',
        },
      ],
      megaJengaNote: '🧱 Mega Jenga is a giant wooden tower — in rental it counts as 2 standard games (100 zł / 1 day, 150 zł / 2 days).',
      rentalTiers: [
        { id: '1', title: '1 standard game', day1: 50, day2: 100 },
        { id: 'megajenga', title: 'Mega Jenga (counts as 2 games)', day1: 100, day2: 150 },
        { id: '2', title: '2 games', day1: 100, day2: 150 },
        { id: '3', title: '3 games', day1: 150, day2: 200 },
        { id: '4', title: '4 games', day1: 200, day2: 300 },
        { id: '5', title: '5 games', day1: 250, day2: 400 },
        { id: '7', title: '7 games', day1: 300, day2: 500 },
        { id: '10', title: '10 games', day1: 400, day2: 600 },
        { id: '20plus', title: '20+ games', day1: 1000, day2: 1500, popular: true },
      ],
    },

    // WOODIQ FAQ
    woodFaq: {
      badge: 'FAQ',
      title: 'Frequently Asked Questions',
      swipeHint: 'Swipe right',
      items: [
        {
          q: 'What types of wooden games are available for rent?',
          a: 'Our collection includes giant dexterity, strategy, and party games suitable for weddings, corporate events, and festivals. You can rent single games or complete packages.',
        },
        {
          q: 'Can I purchase games for personal use or gifts?',
          a: 'Yes! All our games are handcrafted from natural solid wood and available for purchase in EUR (€).',
        },
        {
          q: 'How do I place an order or booking?',
          a: 'Select your preferred games in the form or contact us directly. We will confirm availability, dates, and delivery terms.',
        },
      ],
    },

    // PRODUCT SWITCHER
    switcher: {
      anotherProduct: 'Explore also',
      weAlsoHave: 'We also offer',
      woodiqTitle: 'WOODIQ',
      woodiqDesc: 'Wooden games for events & home',
      cashflowTitle: 'CASHFLOW CLUB',
      cashflowDesc: 'Financial simulation training',
    },

    // FOOTER
    footer: {
      cashflowRights: '© 2026 Cashflow Club. All rights reserved.',
      woodiqRights: '© 2026 WoodIQ. All rights reserved.',
    },

    // KOSZYK / CART
    cart: {
      title: 'Games Cart',
      badge: 'Selected Games',
      emptyTitle: 'Your cart is empty',
      emptyDesc: 'Click the cart icon 🛒 on games in the catalog to add them to your order.',
      countGames: '{count} games',
      selectedGames: 'Selected games ({count})',
      megaJengaTwoGames: '🧱 Counts as 2 games in rental',
      removeBtn: 'Remove',
      orderRentalBtn: 'Book Rental',
      orderPurchaseBtn: 'Purchase Games',
      viewPhoto: 'Preview photo',
      addToCart: 'Add to cart',
      inCart: 'In cart',
      totalEquivalent: 'Total equivalent: {count} games',
      selectedCount: 'Games count: {count}',
    },

    // BOOKING MODAL (CASHFLOW)
    bookingModal: {
      title: 'Book a Spot',
      subtitle: 'Fill out the form and we will get in touch with you.',
      freeSpots: 'Available spots',
      nameLabel: 'Name',
      namePlaceholder: 'Alexander',
      phoneLabel: 'Phone number',
      contactLabel: 'Preferred Messenger',
      messengerHandleLabel: 'Username / Handle',
      messengerHandlePlaceholder: '@username or number',
      cityLabel: 'City',
      planLabel: 'Plan Selection',
      participant1: '1 participant',
      participant2: '2 participants (with a friend)',
      participantsSummary: 'Participants',
      costSummary: 'Total Cost',
      submitBtn: 'Confirm Booking',
      sendingBtn: 'Sending...',
      closedBtn: 'Registration Closed',
      successTitle: 'Booking Submitted',
      successDesc: 'Thank you! We will reach out shortly to confirm your reservation details.',
      closeBtn: 'Close',
      errorNameRequired: 'Please enter your name',
      errorPhoneRequired: 'Please enter a valid 9-digit phone number',
      errorCityRequired: 'Please select a city',
      errorPhone: 'Please enter a valid Polish phone number (+48).',
      errorSpots: 'Only {spots} spots remaining.',
      errorGeneral: 'Failed to submit booking.',
    },

    // WOODIQ ORDER MODAL
    woodModal: {
      badge: 'WOOD IQ Order Games',
      subtitle: 'Select format, quantity, and city. Rentals calculated in PLN (zł), purchases in EUR (€).',
      formatLabel: 'Order Format',
      rentalOption: 'Rental',
      rentalSub: 'For an event (PLN)',
      purchaseOption: 'Purchase',
      purchaseSub: 'Own forever (EUR)',
      cityLabel: 'City',
      gamesCountLabel: 'Number of Games',
      durationLabel: 'Rental Duration',
      day1: '1 day',
      day2: '2 days',
      deliveryLabel: '🚚 Delivery & Assembly',
      deliverySub: 'We deliver, setup, and prepare games',
      nameLabel: 'Name',
      namePlaceholder: 'Alexander',
      phoneLabel: 'Phone number',
      messengerLabel: 'Messenger',
      messengerHandleLabel: 'Username / Handle',
      messengerHandlePlaceholder: '@username or number',
      commentLabel: 'Comment',
      commentPlaceholder: 'Event date, address, special requirements...',
      summaryFormat: 'Format',
      summaryGames: 'Games',
      summaryDuration: 'Duration',
      summaryPrice: 'Games Price',
      summaryDelivery: 'Delivery',
      summaryTotal: 'Total',
      submitBtn: 'Submit Order',
      sendingBtn: 'Sending...',
      successTitle: 'Order Received',
      successDesc: 'Thank you! We received your request and will contact you shortly to finalize details.',
      closeBtn: 'Close',
      errorNameRequired: 'Please enter your name',
      errorPhoneRequired: 'Please enter a valid 9-digit phone number',
      errorCityRequired: 'Please select a city',
      errorGamesRequired: 'Please select number of games',
      errorPhone: 'Please enter a valid Polish phone number (+48).',
      errorCity: 'Please select a city.',
      errorGames: 'Please select number of games.',
      errorGeneral: 'Failed to submit order.',
    },
  },
};
