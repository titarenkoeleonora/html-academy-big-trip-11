import {createEventsListTemplate} from "./events-list";
import {createRoutePointsTemplate} from "./route-points";
import {render} from "../utils";

export const datesArray = [];

export const getAllDates = (defaultArray) => {
  defaultArray.forEach((element) => {
    return datesArray.push(element.dateFrom.toDateString());
  });
};

export const getUniqueDates = (array) => {
  return Array.from(new Set(array));
};

const renderSortedTripPoints = (tripPoints, index) => {
  const eventsListElement = document.querySelectorAll(`.trip-events__list`);
  const eventContainers = Array.from(eventsListElement);

  tripPoints.forEach((event) => render(eventContainers[index], createRoutePointsTemplate(event)));
};

export const renderTripPointsInDays = (pointsArray, daysArray, template) => {
  daysArray.forEach((day, index) => {
    const filterPoints = pointsArray.filter((point) => {
      return point.dateFrom.toDateString() === day;
    });

    render(template[index], createEventsListTemplate());
    renderSortedTripPoints(filterPoints, index);
  });
};
