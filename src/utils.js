export const getRandomArrayItem = (array) => {
  const randomIndex = getRandomInteger(0, array.length - 1);

  return array[randomIndex];
};

export const getRandomInteger = (min, max) => {
  // случайное число от min до (max+1)
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

export const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours());
  const minutes = castTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};

// Генерирует случайные дату и время

export const getRandomDate = () => {
  const targetDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * getRandomInteger(1, 10);

  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};

export const formatDate = (date) => {
  const dd = date.getDate();
  const mm = date.getMonth() + 1;
  const yy = date.getFullYear() % 100;

  return `${dd}/${mm}/${yy}`;
};

