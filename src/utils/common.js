const getRandomInteger = (max, min = 0) => {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomInteger(array.length - 1);

  return array[randomIndex];
};

const isFuture = (point) => point.dateFrom > Date.now();

const isPast = (point) => point.dateFrom < Date.now();

const getCapitalizedString = (string) => {
  if (!string) {
    return string;
  }

  return string[0].toUpperCase() + string.slice(1);
};

export {getRandomInteger, getRandomArrayItem, isFuture, isPast, getCapitalizedString};
