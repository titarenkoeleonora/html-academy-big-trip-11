import {TRIP_POINT_TYPES, CITIES} from "../constants";
import {getRandomArrayItem, getRandomInteger, getRandomDate} from "../../utils";

const TripDescriptions = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`,
];

// const typeRoutePointMap = {
//   'Taxi': `to`,
//   'Bus': `to`,
//   'Train': `to`,
//   'Ship': `to`,
//   'Transport': `to`,
//   'Drive': `to`,
//   'Flight': `to`,
//   'Check': `in`,
//   'Sightseeing': `in`,
//   'Restaurant': `in`,
// };

const tripOffers = [{
  title: `Upgrade to a business class`,
  price: 150
}, {
  title: `Choose the radio station`,
  price: 50
}, {
  title: `Choose temperature`,
  price: 120
}, {
  title: `Drive quickly, I'm in a hurry`,
  price: 130
}, {
  title: `Drive slowly`,
  price: 70
}, {
  title: `Add luggage`,
  price: 30
}, {
  title: `Switch to comfort class`,
  price: 100
}, {
  title: `Choose seats`,
  price: 130
}, {
  title: `Add excursion`,
  price: 130
}];

const descriptionsCount = {
  MIN: 1,
  MAX: 3,
};

const picturesCount = {
  MIN: 1,
  MAX: 4,
};

const priceSize = {
  MIN: 10,
  MAX: 150,
};

// Генерирует случайное описание фото

// Shuffle array
const shuffledDescriptions = TripDescriptions.sort(() => 0.5 - Math.random());

// Get sub-array of first n elements after shuffled
let selectedDescriptions = shuffledDescriptions.slice(0, getRandomInteger(descriptionsCount.MIN, descriptionsCount.MAX)).join(` `);

// Генерирует случайные фото

const getRandomPictures = () => {
  const photosArray = [];
  const count = getRandomInteger(picturesCount.MIN, picturesCount.MAX);

  for (let i = 0; i < count; i++) {
    photosArray.push(`http://picsum.photos/248/152?r=${Math.random()}`);
  }
  return photosArray;
};

const getRandomOffers = () => {
  const offersArray = [];
  const count = getRandomInteger(0, 3);
  for (let i = 0; i < count; i++) {
    offersArray.push(getRandomArrayItem(tripOffers));
  }
  return offersArray;
};

const getTripPoint = () => {
  const isOfferAdded = Math.random() > 0.5 ? null : getRandomOffers();
  return {
    type: getRandomArrayItem(TRIP_POINT_TYPES),
    dateFrom: getRandomDate(),
    dateTo: getRandomDate(),
    destination: {
      name: getRandomArrayItem(CITIES),
      description: selectedDescriptions,
      pictures: getRandomPictures(),
    },
    basePrice: getRandomInteger(priceSize.MIN, priceSize.MAX),
    isFavorite: Math.random() > 0.5,
    offers: getRandomOffers(),
  };
};

export const generateTripPoints = (count) => {
  return new Array(count)
    .fill(``)
    .map(getTripPoint);
};

console.log(generateTripPoints());

