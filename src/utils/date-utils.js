import {Time} from "../constants";
import {getRandomInteger} from "./common";

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

const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

export const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours());
  const minutes = castTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};

export const getRandomDate = () => {
  const targetDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * getRandomInteger(10, 1);

  targetDate.setDate(targetDate.getDate() + diffValue);
  targetDate.setHours(targetDate.getHours() + diffValue);
  targetDate.setMinutes(targetDate.getMinutes() + diffValue);

  return targetDate;
};

export const formatDate = (date) => {
  const dd = (`0` + date.getDate()).slice(-2);
  const mm = (`0` + (date.getMonth() + 1)).slice(-2);
  const yy = date.getFullYear() % 100;

  return `${dd}/${mm}/${yy}`;
};

export const datesArray = [];

export const getAllDates = (defaultArray) => {
  defaultArray.forEach((element) => {
    return datesArray.push(element.dateFrom.toDateString());
  });
};

export const getUniqueDates = (array) => {
  return Array.from(new Set(array));
};
