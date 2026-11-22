import fiveInARow from '../img/fiveInARow.jpg';
import django from '../img/django.jpg';
import balanceDisk from '../img/balance.jpg';
import aeroHockey from '../img/aeroHockey.jpg';
import elasticBall from '../img/elasticBall.jpg';
import kulbito from '../img/kulbito.jpg';
import magnets from '../img/magnets.jpg';

// Новые игры
import corridor from '../img/corridor.jpg';
import woodPuzzle from '../img/woodPuzzle.jpg';
import iqPuzzle from '../img/puzzle.jpg';
import tictactoe from '../img/tictactoe.jpg';
import towerOfStones from '../img/towerofstones.jpg';
import memory from '../img/memory.jpg';
import balanceTower from '../img/balanceTower.jpg';
import onTheBall from '../img/onTheBall.jpg';
import game21 from '../img/21.jpg';
import cheesebox from '../img/cheesebox.jpg';
import onTheHook from '../img/onTheHook.jpg';
import bolas from '../img/bolas.jpg';
import targetAndRings from '../img/targetAndRings.jpg';
import cornhole from '../img/cornhole.jpg';
import chess from '../img/chess.jpg';

// Пазлы из phot (размеры A1, A3, A4 с ценами 200, 100, 80 zł)
import puzzleMapUkraineA1 from '../img/phot/photo_4_2026-11-16_13-07-(a1)200.jpg';
import puzzleKyivA3 from '../img/phot/puzzle(a3)100.jpg';
import puzzleKyivA4 from '../img/phot/photo_7_2026-11-16_13-07-80.jpg';
import puzzleKhersonA3 from '../img/phot/photo_8_2026-11-16_13-07-100.jpg';
import puzzleKhersonA4 from '../img/phot/photo_9_2026-11-16_13-07-80.jpg';
import puzzleSaloA4 from '../img/phot/photo_2_2026-11-16_13-07-80.jpg';
import puzzleDerunyA4 from '../img/phot/photo_5_2026-11-16_13-07-80.jpg';
import puzzleWolfA4 from '../img/phot/puzzle(a4)80.jpg';

export const WOOD_GAMES_METADATA = [
  // 1. КОРИДОР
  {
    id: 'corridor',
    image: corridor,
    isMegaJenga: false,
    categories: ['wooden'],
    purchasePriceEUR: 59,
    rentalPricePLN: 50,
  },
  // 2. ДЕРЕВ'ЯНІ ПАЗЛИ (В Головоломках)
  {
    id: 'woodPuzzle',
    image: woodPuzzle,
    isMegaJenga: false,
    categories: ['puzzles'],
    purchasePriceEUR: 19,
    purchasePricePLN: 80,
    puzzleSizes: [
      {
        id: 'a4',
        label: 'A4',
        dimensions: '21×30 см',
        pricePLN: 80,
        priceEUR: 19,
        image: puzzleWolfA4,
        gallery: [puzzleWolfA4, puzzleKyivA4, puzzleKhersonA4, puzzleSaloA4, puzzleDerunyA4],
        title: 'Пазл A4 (80 zł)',
      },
      {
        id: 'a3',
        label: 'A3',
        dimensions: '30×42 см',
        pricePLN: 100,
        priceEUR: 23,
        image: puzzleKyivA3,
        gallery: [puzzleKyivA3, puzzleKhersonA3],
        title: 'Пазл A3 (100 zł)',
      },
      {
        id: 'a1',
        label: 'A1',
        dimensions: '60×84 см',
        pricePLN: 200,
        priceEUR: 47,
        image: puzzleMapUkraineA1,
        gallery: [puzzleMapUkraineA1],
        title: 'Пазл «Вишивана карта України» A1 (200 zł)',
      },
    ],
    rentalPricePLN: null,
  },
  // 3. IQ PUZZLE (В Головоломках)
  {
    id: 'iqPuzzle',
    image: iqPuzzle,
    isMegaJenga: false,
    categories: ['puzzles'],
    purchasePriceEUR: 5,
    purchasePricePLN: 22,
    rentalPricePLN: null,
  },
  // 4. ХРЕСТИКИ НУЛИКИ
  {
    id: 'tictactoe',
    image: tictactoe,
    isMegaJenga: false,
    categories: ['wooden'],
    purchasePriceEUR: 59,
    rentalPricePLN: 50,
  },
  // 5. ВЕЖА З КАМЕНІВ (TOWER OF STONES)
  {
    id: 'towerOfStones',
    image: towerOfStones,
    isMegaJenga: false,
    categories: ['wooden'],
    purchasePriceEUR: 39,
    rentalPricePLN: 50,
  },
  // 6. МЕМОРІ
  {
    id: 'memory',
    image: memory,
    isMegaJenga: false,
    categories: ['wooden'],
    purchasePriceEUR: 59,
    rentalPricePLN: 50,
  },
  // 7. ВЕЖІ БАЛАНСУ
  {
    id: 'balanceTower',
    image: balanceTower,
    isMegaJenga: false,
    categories: ['wooden'],
    purchasePriceEUR: 89,
    rentalPricePLN: 50,
  },
  // 8. НА КІЛІ (ГАЛАКТИКА)
  {
    id: 'onTheBall',
    image: onTheBall,
    isMegaJenga: false,
    categories: ['wooden'],
    purchasePriceEUR: 89,
    rentalPricePLN: 50,
  },
  // 9. 21
  {
    id: 'game21',
    image: game21,
    isMegaJenga: false,
    categories: ['wooden'],
    purchasePriceEUR: 59,
    rentalPricePLN: 50,
  },
  // 10. СИРНА ДОШКА
  {
    id: 'cheesebox',
    image: cheesebox,
    isMegaJenga: false,
    categories: ['wooden'],
    purchasePriceEUR: 119,
    rentalPricePLN: 50,
  },
  // 11. НА ГАЧКУ
  {
    id: 'onTheHook',
    image: onTheHook,
    isMegaJenga: false,
    categories: ['wooden'],
    purchasePriceEUR: 49,
    rentalPricePLN: 50,
  },
  // 12. БОЛАС (ЛІТАЮЧИЙ ГОЛЬФ)
  {
    id: 'bolas',
    image: bolas,
    isMegaJenga: false,
    categories: ['wooden'],
    purchasePriceEUR: 69,
    rentalPricePLN: 50,
  },
  // 13. МІШЕНЬ І КІЛЬЦЯ
  {
    id: 'targetAndRings',
    image: targetAndRings,
    isMegaJenga: false,
    categories: ['wooden'],
    purchasePriceEUR: 69,
    rentalPricePLN: 50,
  },
  // 14. КОРНХОЛ
  {
    id: 'cornhole',
    image: cornhole,
    isMegaJenga: false,
    categories: ['wooden'],
    purchasePriceEUR: 89,
    rentalPricePLN: 50,
  },
  // 15. ДЕРЕВ'ЯНІ ШАХИ ТА НАРДИ 3 В 1
  {
    id: 'chess',
    image: chess,
    isMegaJenga: false,
    categories: ['exclusive'],
    purchasePriceEUR: 170,
    purchasePricePLN: 730,
    chessSizes: [
      { id: '25x50', label: '25×50 см', priceEUR: 170, pricePLN: 730 },
      { id: '30x60', label: '30×60 см', priceEUR: 220, pricePLN: 950 },
    ],
    rentalPricePLN: 100,
  },
  // 16. МАГНІТИ
  {
    id: 'magnets',
    image: magnets,
    isMegaJenga: false,
    categories: ['magnets'],
    purchasePriceEUR: 15,
    rentalPricePLN: 50,
  },
  // 17. ЧОТИРИ В РЯД
  {
    id: 'fiveInARow',
    image: fiveInARow,
    isMegaJenga: false,
    categories: ['wooden'],
    purchasePriceEUR: 60,
    rentalPricePLN: 50,
  },
  // 18. MEGA JENGA (В ексклюзивах та дерев'яних)
  {
    id: 'django',
    image: django,
    isMegaJenga: true,
    categories: ['exclusive', 'wooden'],
    purchasePriceEUR: null,
    rentalPricePLN: 100, // counts as 2 games
  },
  // 19. БАЛАНС ДИСК
  {
    id: 'balanceDisk',
    image: balanceDisk,
    isMegaJenga: false,
    categories: ['wooden'],
    purchasePriceEUR: 60,
    rentalPricePLN: 50,
  },
  // 20. АЕРОХОКЕЙ
  {
    id: 'aeroHockey',
    image: aeroHockey,
    isMegaJenga: false,
    categories: ['wooden'],
    purchasePriceEUR: 85,
    rentalPricePLN: 50,
  },
  // 21. ЕЛАСТИК
  {
    id: 'elasticBall',
    image: elasticBall,
    isMegaJenga: false,
    categories: ['wooden'],
    purchasePriceEUR: 60,
    rentalPricePLN: 50,
  },
  // 22. КУЛЬБІТО
  {
    id: 'kulbito',
    image: kulbito,
    isMegaJenga: false,
    categories: ['wooden'],
    purchasePriceEUR: 85,
    rentalPricePLN: 50,
  },
  // 23. ДЕРЕВ'ЯНИЙ ПАЗЛ «ВИШИВАНА КАРТА УКРАЇНИ» (A1)
  {
    id: 'puzzleMapUkraineA1',
    image: puzzleMapUkraineA1,
    isMegaJenga: false,
    categories: ['puzzles'],
    purchasePriceEUR: 47,
    purchasePricePLN: 200,
    rentalPricePLN: null,
  },
  // 24. ДЕРЕВ'ЯНИЙ ПАЗЛ «МІСТО-ГЕРОЙ КИЇВ» (A3)
  {
    id: 'puzzleKyivA3',
    image: puzzleKyivA3,
    isMegaJenga: false,
    categories: ['puzzles'],
    purchasePriceEUR: 23,
    purchasePricePLN: 100,
    rentalPricePLN: null,
  },
  // 25. ДЕРЕВ'ЯНИЙ ПАЗЛ «МІСТО-ГЕРОЙ КИЇВ» (A4)
  {
    id: 'puzzleKyivA4',
    image: puzzleKyivA4,
    isMegaJenga: false,
    categories: ['puzzles'],
    purchasePriceEUR: 19,
    purchasePricePLN: 80,
    rentalPricePLN: null,
  },
  // 26. ДЕРЕВ'ЯНИЙ ПАЗЛ «МІСТО-ГЕРОЙ ХЕРСОН» (A3)
  {
    id: 'puzzleKhersonA3',
    image: puzzleKhersonA3,
    isMegaJenga: false,
    categories: ['puzzles'],
    purchasePriceEUR: 23,
    purchasePricePLN: 100,
    rentalPricePLN: null,
  },
  // 27. ДЕРЕВ'ЯНИЙ ПАЗЛ «МІСТО-ГЕРОЙ ХЕРСОН» (A4)
  {
    id: 'puzzleKhersonA4',
    image: puzzleKhersonA4,
    isMegaJenga: false,
    categories: ['puzzles'],
    purchasePriceEUR: 19,
    purchasePricePLN: 80,
    rentalPricePLN: null,
  },
  // 28. ДЕРЕВ'ЯНИЙ ПАЗЛ «САЛО З ЧАСНИКОМ» (A4)
  {
    id: 'puzzleSaloA4',
    image: puzzleSaloA4,
    isMegaJenga: false,
    categories: ['puzzles'],
    purchasePriceEUR: 19,
    purchasePricePLN: 80,
    rentalPricePLN: null,
  },
  // 29. ДЕРЕВ'ЯНИЙ ПАЗЛ «ДЕРУНИ ЗІ СМЕТАНОЮ» (A4)
  {
    id: 'puzzleDerunyA4',
    image: puzzleDerunyA4,
    isMegaJenga: false,
    categories: ['puzzles'],
    purchasePriceEUR: 19,
    purchasePricePLN: 80,
    rentalPricePLN: null,
  },
  // 30. ФІГУРНИЙ ДЕРЕВ'ЯНИЙ ПАЗЛ «ЕТНІЧНИЙ ВОВК» (A4)
  {
    id: 'puzzleWolfA4',
    image: puzzleWolfA4,
    isMegaJenga: false,
    categories: ['puzzles'],
    purchasePriceEUR: 19,
    purchasePricePLN: 80,
    rentalPricePLN: null,
  },
];
