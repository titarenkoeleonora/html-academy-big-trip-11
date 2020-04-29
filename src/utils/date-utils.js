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
  const differenceInMS = end.getTime() - start.getTime();
  const differenceDays = Math.round(differenceInMS / Time.MS_IN_DAY);
  const differenceHours = Math.round((differenceInMS % Time.MS_IN_DAY) / Time.MS_IN_HOUR);
  const differenceMinutes = Math.round(((differenceInMS % Time.MS_IN_DAY) % Time.MS_IN_HOUR) / Time.MS_IN_MINUTE);

  const day = differenceDays > 0 ? differenceDays + `D` : ``;
  const hours = differenceHours > 0 ? differenceHours + `H ` : ``;
  const minutes = differenceMinutes > 0 ? differenceMinutes + `M ` : ``;

  return `${day} ${hours} ${minutes}`;
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
