import {Time} from "../constants";
import moment from "moment";

const MIN_NUMBER_WITHOUT_NULL = 10;

const createNullInDate = (value) => {
  return value < MIN_NUMBER_WITHOUT_NULL ? `0${value}` : value;
};

const getTimeDifference = (start, end) => {
  const differenceInMS = end.getTime() - start.getTime();
  const differenceDays = Math.round(differenceInMS / Time.MS_IN_DAY);
  const differenceHours = Math.round((differenceInMS % Time.MS_IN_DAY) / Time.MS_IN_HOUR);
  const differenceMinutes = Math.round(((differenceInMS % Time.MS_IN_DAY) % Time.MS_IN_HOUR) / Time.MS_IN_MINUTE);

  const day = differenceDays > 0 ? createNullInDate(differenceDays) + `D` : ``;
  const hours = differenceHours > 0 ? createNullInDate(differenceHours) + `H ` : ``;
  const minutes = differenceMinutes > 0 ? createNullInDate(differenceMinutes) + `M ` : ``;

  return `${day} ${hours} ${minutes}`;
};

const formatTime = (date) => moment(date).format(`HH:mm`);

const formatDate = (date) => moment(date).format(`DD/MM/YY`);

const getAllDates = (defaultArray, datesArray) => {
  const sortedArray = defaultArray.sort((a, b) => a.dateFrom > b.dateFrom ? 1 : -1);
  sortedArray.forEach((element) => {
    return datesArray.push(element.dateFrom.toDateString());
  });
};

const getUniqueDates = (array) => {
  return Array.from(new Set(array));
};

const formatDateToDefault = (date) => {
  moment.defaultFormat = `DD.MM.YYYY HH:mm`;
  return moment(date, moment.defaultFormat).toDate();
};

export {getTimeDifference, formatTime, formatDate, getAllDates, getUniqueDates, formatDateToDefault};
