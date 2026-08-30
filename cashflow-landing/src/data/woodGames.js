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
    purchasePriceEUR: 13,
    rentalPricePLN: 50,
  },
  // 3. IQ PUZZLE (В Головоломках)
  {
    id: 'iqPuzzle',
    image: iqPuzzle,
    isMegaJenga: false,
    categories: ['puzzles'],
    purchasePriceEUR: 5,
    rentalPricePLN: 50,
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
    purchasePriceEUR: 75,
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
];
