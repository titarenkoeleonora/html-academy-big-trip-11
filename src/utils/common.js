export const getRandomInteger = (max, min = 0) => {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

export const getRandomArrayItem = (array) => {
  const randomIndex = getRandomInteger(array.length - 1);

  return array[randomIndex];
};

export const isFuture = (point) => point.dateFrom > Date.now();

export const isPast = (point) => point.dateFrom < Date.now();
