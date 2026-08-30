import fiveInARow from '../img/fiveInARow.jpg';
import django from '../img/django.jpg';
import balanceDisk from '../img/balance.jpg';
import aeroHockey from '../img/aeroHockey.jpg';
import elasticBall from '../img/elasticBall.jpg';
import memoryFortBoyard from '../img/memoryFortBoyard.jpg';
import magnets from '../img/magnets.jpg';
import kulbito from '../img/kulbito.jpg';
import plynko from '../img/plynko.jpg';

export const WOOD_GAMES_METADATA = [
  {
    id: 'fiveInARow',
    image: fiveInARow,
    isMegaJenga: false,
    categories: ['wooden'],
    purchasePriceEUR: 60,
    rentalPricePLN: 50,
  },
  {
    id: 'django',
    image: django,
    isMegaJenga: true,
    categories: ['wooden', 'exclusive'],
    purchasePriceEUR: 75,
    rentalPricePLN: 100, // counts as 2 games
  },
  {
    id: 'balanceDisk',
    image: balanceDisk,
    isMegaJenga: false,
    categories: ['wooden'],
    purchasePriceEUR: 60,
    rentalPricePLN: 50,
  },
  {
    id: 'aeroHockey',
    image: aeroHockey,
    isMegaJenga: false,
    categories: ['wooden'],
    purchasePriceEUR: 85,
    rentalPricePLN: 50,
  },
  {
    id: 'elasticBall',
    image: elasticBall,
    isMegaJenga: false,
    categories: ['wooden'],
    purchasePriceEUR: 60,
    rentalPricePLN: 50,
  },
  {
    id: 'memoryFortBoyard',
    image: memoryFortBoyard,
    isMegaJenga: false,
    categories: ['puzzles'],
    purchasePriceEUR: 60,
    rentalPricePLN: 50,
  },
  {
    id: 'magnets',
    image: magnets,
    isMegaJenga: false,
    categories: ['magnets', 'puzzles'],
    purchasePriceEUR: 45,
    rentalPricePLN: 50,
  },
  {
    id: 'kulbito',
    image: kulbito,
    isMegaJenga: false,
    categories: ['puzzles', 'exclusive'],
    purchasePriceEUR: 85,
    rentalPricePLN: 50,
  },
  {
    id: 'plynko',
    image: plynko,
    isMegaJenga: false,
    categories: ['exclusive'],
    purchasePriceEUR: 85,
    rentalPricePLN: 50,
  },
];
