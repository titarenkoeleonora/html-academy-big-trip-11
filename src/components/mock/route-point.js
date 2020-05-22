import {CITIES, typeRoutePointMap, tripOffers} from "../../constants";
import {getStartDate, getEndDate} from "../../utils/date-utils";
import {getRandomArrayItem, getRandomInteger} from "../../utils/common";

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

export const descriptionsCount = {
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

let selectedDescriptions = shuffledDescriptions.slice(0, getRandomInteger(descriptionsCount.MAX, descriptionsCount.MIN)).join(` `);

const getRandomPictures = () => {
  const photosArray = [];
  const count = getRandomInteger(picturesCount.MAX, picturesCount.MIN);

  for (let i = 0; i < count; i++) {
    photosArray.push(`http://picsum.photos/248/152?r=${Math.random()}`);
  }
  return photosArray;
};

const getRandomOffers = (offers) => {
  const offersArray = [];
  const count = getRandomInteger(offersCount.MAX);

  for (let i = 0; i < count; i++) {
    const offer = getRandomArrayItem(offers);
    if (offersArray.indexOf(offer) === -1) {
      offersArray.push(offer);
      offer.checked = Math.random() > 0.5;
    }
  }


  return offersArray;
};

export const getTripPoint = () => {
  const pointType = getRandomTripType();
  const start = getStartDate();
  const end = getEndDate(start);
  const allOffers = getRandomOffers(tripOffers[pointType.toLowerCase()]);

  return {
    id: String(new Date() + Math.random()),
    type: pointType,
    dateFrom: start,
    dateTo: end,
    destination: {
      name: getRandomArrayItem(CITIES),
      description: selectedDescriptions,
      pictures: getRandomPictures(),
    },
    basePrice: getRandomInteger(priceSize.MAX, priceSize.MIN),
    isFavorite: Math.random() > 0.5,
    offers: allOffers,
  };
};

export const generateTripPoints = (count) => {
  return new Array(count)
    .fill(``)
    .map(getTripPoint);
};
