import {CITIES, TRIP_POINT_TYPES} from "../constants";

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
//   'taxi': `Taxi to`,
//   'bus': `Bus to`,
//   'train': `Train to`,
//   'ship': `Ship to`,
//   'transport': `Transport to`,
//   'drive': `Drive to`,
//   'flight': `Flight to`,
//   'check': `Check-in in`,
//   'sightseeing': `Sightseeing in`,
//   'restaurant': `Restaurant in`,
// };

const descriptionsCount = {
  MIN: 1,
  MAX: 3,
};

const picturesCount = {
  MIN: 1,
  MAX: 5,
};

const priceSize = {
  MIN: 10,
  MAX: 150,
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomInteger(0, array.length);

  return array[randomIndex];
};

const getRandomInteger = (min, max) => {
  // случайное число от min до (max+1)
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

// Генерирует случайное описание фото

// Shuffle array
const shuffledDescriptions = TripDescriptions.sort(() => 0.5 - Math.random());

// Get sub-array of first n elements after shuffled
let selectedDescriptions = shuffledDescriptions.slice(0, getRandomInteger(descriptionsCount.MIN, descriptionsCount.MAX)).join(` `);

// Генерирует случайные дату и время

const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

const formatTime = () => {
  const hours = castTimeFormat(new Date().getHours() % 12);
  const minutes = castTimeFormat(new Date().getMinutes());

  return `${hours}:${minutes}`;
};

const getRandomDate = () => {
  const targetDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * getRandomInteger(1, 10);

  const dd = targetDate.getDate() + diffValue;
  const mm = targetDate.getMonth() + 1;
  const yy = targetDate.getFullYear() % 100;

  return `${dd}/${mm}/${yy}`;
};

// Генерирует случайные фото

const getRandomPictures = () => {
  const photosArray = [];
  const count = getRandomInteger(picturesCount.MIN, picturesCount.MAX);

  for (let i = 0; i < count; i++) {
    photosArray.push({
      src: `http://picsum.photos/248/152?r=${Math.random()}`,
    });
  }
  return photosArray;
};

const generateTripPoint = () => {
  return {
    type: getRandomArrayItem(TRIP_POINT_TYPES),
    dateFrom: `${getRandomDate()} ${formatTime()}`,
    dateTo: `${getRandomDate()} ${formatTime()}`,
    destination: {
      name: getRandomArrayItem(CITIES),
      description: selectedDescriptions,
      pictures: getRandomPictures(),
    },
    basePrice: getRandomInteger(priceSize.MIN, priceSize.MAX),
    isFavorite: Math.random() > 0.5,
    offers: [],
  };
};
