import {getRandomInteger, getRandomDate} from "../utils";
import {Time} from "./constants";

const MAX_COUNT_DAYS_DIFFERENCE = 1;

export const getStartDate = () => getRandomDate();

export const getEndDate = (date) => {
  const targetDate = new Date(date);

  targetDate.setDate(targetDate.getDate() + getRandomInteger(MAX_COUNT_DAYS_DIFFERENCE));
  targetDate.setHours(targetDate.getHours() + getRandomInteger(Time.HOURS_IN_DAY));
  targetDate.setMinutes(targetDate.getMinutes() + getRandomInteger(Time.MINUTES_IN_HOUR));
  return targetDate;
};

export const getTimeDifference = (start, end) => {
  const randomDifferenceMinutes = ((end - start) / Time.HOURS_IN_MS_COEFFICIENT) * Time.MINUTES_IN_HOUR;
  const days = Math.floor((randomDifferenceMinutes / Time.MINUTES_IN_HOUR) / Time.HOURS_IN_DAY);
  const hours = (days * Time.HOURS_IN_DAY) - Time.HOURS_IN_DAY;
  let difference = null;

  if (randomDifferenceMinutes >= Time.MINUTES_IN_DAY) {
    if (hours > 0) {
      difference = `${days + `D`} ${hours + `H`} ${Math.floor(randomDifferenceMinutes % Time.MINUTES_IN_HOUR) + `M`}`;
      return difference;
    } else {
      difference = `${days + `D`} ${Math.floor(randomDifferenceMinutes % Time.MINUTES_IN_HOUR) + `M`}`;
      return difference;
    }
  } else if (randomDifferenceMinutes <= Time.MINUTES_IN_HOUR) {
    difference = Math.floor(randomDifferenceMinutes) + `M`;
    return difference;
  } else if (randomDifferenceMinutes <= Time.MINUTES_IN_DAY) {
    difference = `${Math.floor(randomDifferenceMinutes / Time.MINUTES_IN_HOUR) + `H`} ${Math.floor(randomDifferenceMinutes % Time.MINUTES_IN_HOUR) + `M`}`;
    return difference;
  } else if (randomDifferenceMinutes % Time.MINUTES_IN_HOUR === 0) {
    difference = Math.floor(randomDifferenceMinutes) / Time.MINUTES_IN_HOUR + `H`;
    return difference;
  }
  return difference;
};
