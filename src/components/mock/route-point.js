import {CITIES, typeRoutePointMap} from "../constants";
import {getRandomArrayItem, getRandomInteger} from "../../utils";
import {startDate, endDate} from "../date-generation";

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
  MIN: 100,
  MAX: 1000,
};

const offersCount = {
  MIN: 0,
  MAX: 5,
};

export const getRandomTripType = () => getRandomArrayItem(Object.keys(typeRoutePointMap));

// Генерирует случайное описание фото

const shuffledDescriptions = TripDescriptions.sort(() => 0.5 - Math.random());

let selectedDescriptions = shuffledDescriptions.slice(0, getRandomInteger(descriptionsCount.MIN, descriptionsCount.MAX)).join(` `);

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
  const count = getRandomInteger(offersCount.MIN, offersCount.MAX);
  for (let i = 0; i < count; i++) {
    offersArray.push(getRandomArrayItem(tripOffers));
  }
  return offersArray;
};

export const getTripPoint = () => {
  const start = startDate();
  const end = endDate(start);

  return {
    type: getRandomTripType(),
    dateFrom: start,
    dateTo: end,
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

