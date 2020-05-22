import {isFuture, isPast} from "./common";
import {FilterType} from "../constants";

const getEverythingPoints = (points) => points;

const getFuturePoints = (points) => points.filter((point) => isFuture(point));

const getPastPoints = (points) => points.filter((point) => isPast(point));

export const getPointsByFilter = (points, filterType) => {
  switch (filterType) {
    case FilterType.EVERYTHING:
      return getEverythingPoints(points);
    case FilterType.FUTURE:
      return getFuturePoints(points);
    case FilterType.PAST:
      return getPastPoints(points);
  }

  return points;
};
