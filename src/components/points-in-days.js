import RoutePointsComponent from "./route-points";
import {render} from "../utils";
import EventsListComponent from "./events-list";

export const datesArray = [];

export const getAllDates = (defaultArray) => {
  defaultArray.forEach((element) => {
    return datesArray.push(element.dateFrom.toDateString());
  });
};

export const getUniqueDates = (array) => {
  return Array.from(new Set(array));
};

export const renderSortedTripPoints = (tripPoints, index) => tripPoints.forEach((point) => render(new EventsListComponent(index).getElement(), new RoutePointsComponent(point).getElement()));


