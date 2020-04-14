import {getRandomInteger, getRandomDate} from "../utils";
import {HOURS_IN_MS_COEFFICIENT, MINUTES_IN_DAY, HOURS_IN_DAY, MINUTES_IN_HOUR} from "./constants";

const MAX_COUNT_DAYS_DIFFERENCE = 1;

export const startDate = () => getRandomDate();

export const endDate = (date) => {
  const targetDate = new Date(date);

  targetDate.setDate(targetDate.getDate() + getRandomInteger(0, MAX_COUNT_DAYS_DIFFERENCE));
  targetDate.setHours(targetDate.getHours() + getRandomInteger(0, HOURS_IN_DAY));
  targetDate.setMinutes(targetDate.getMinutes() + getRandomInteger(0, MINUTES_IN_HOUR));
  return targetDate;
};

export const getTimeDifference = (start, end) => {
  const randomDifferenceMinutes = ((end - start) / HOURS_IN_MS_COEFFICIENT) * MINUTES_IN_HOUR;
  const days = Math.floor((randomDifferenceMinutes / MINUTES_IN_HOUR) / HOURS_IN_DAY);
  const hours = (days * HOURS_IN_DAY) - HOURS_IN_DAY;
  let difference = null;

  if (randomDifferenceMinutes >= MINUTES_IN_DAY) {
    if (hours > 0) {
      difference = `${days + `D`} ${hours + `H`} ${Math.floor(randomDifferenceMinutes % MINUTES_IN_HOUR) + `M`}`;
      return difference;
    } else {
      difference = `${days + `D`} ${Math.floor(randomDifferenceMinutes % MINUTES_IN_HOUR) + `M`}`;
      return difference;
    }
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
