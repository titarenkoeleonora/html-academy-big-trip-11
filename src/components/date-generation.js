import {getRandomInteger, getRandomDate} from "../utils";
import {HOURS_IN_MS_COEFFICIENT, MINUTES_IN_DAY, HOURS_IN_DAY, MINUTES_IN_HOUR} from "./constants";

export const getRandomMillisecondsCount = () => (getRandomInteger(10, MINUTES_IN_HOUR) * getRandomInteger(1, 5)) * getRandomInteger(1, 10);

const сonvertToMinutes = (timeInMilliseconds) => Math.floor(timeInMilliseconds * HOURS_IN_MS_COEFFICIENT) / MINUTES_IN_HOUR;

export const startDate = () => getRandomDate();

export const endDate = (date) => {
  const randomMillisecondsCount = getRandomMillisecondsCount();
  return new Date(Date.parse(date) + Math.floor(сonvertToMinutes(randomMillisecondsCount)));
};

export const getTimeDifference = (start, end) => {
  const randomDifferenceMinutes = ((end - start) / HOURS_IN_MS_COEFFICIENT) * MINUTES_IN_HOUR;
  const days = Math.floor((randomDifferenceMinutes / MINUTES_IN_HOUR) / HOURS_IN_DAY);
  const hours = (days * HOURS_IN_DAY) - HOURS_IN_DAY;
  let difference = null;

  if (randomDifferenceMinutes >= MINUTES_IN_DAY) {
    difference = `${days + `D`} ${hours + `H`} ${Math.floor(randomDifferenceMinutes % MINUTES_IN_HOUR) + `M`}`;
    return difference;
  } else if (randomDifferenceMinutes <= MINUTES_IN_HOUR) {
    difference = Math.floor(randomDifferenceMinutes) + `M`;
    return difference;
  } else if (randomDifferenceMinutes <= MINUTES_IN_DAY) {
    difference = `${Math.floor(randomDifferenceMinutes / MINUTES_IN_HOUR) + `H`} ${Math.floor(randomDifferenceMinutes % MINUTES_IN_HOUR) + `M`}`;
    return difference;
  } else if (randomDifferenceMinutes % MINUTES_IN_HOUR === 0) {
    difference = Math.floor(randomDifferenceMinutes) / MINUTES_IN_HOUR + `H`;
    return difference;
  }
  return difference;
};
