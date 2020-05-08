import {render} from "../utils/render";
import {RenderPosition} from "../constants";
import DaysComponent from "../components/trip-days";
import {getAllDates, datesArray, getUniqueDates} from "../utils/date-utils";
import NoPointsComponent from "../components/no-points";
import SortComponent, {SortType} from "../components/sort";
import RouteComponent from "../components/route";
import DayComponent from "../components/day";
import EventsListComponent from "../components/events-list";
import {tripMainElement} from "../main";
import TripInfoComponent from "../components/trip-info";
import CostComponent from "../components/cost";
import PointController from "./point-controller";

const renderPoints = (tripEventsList, point, onDataChange, onViewChange) => {
  const pointController = new PointController(tripEventsList, onDataChange, onViewChange);
  pointController.render(point);

  return pointController;
};

const getSortedPoints = (points, sortType) => {
  let sortedPoints = [];
  const showingPoints = points.slice();

  switch (sortType) {
    case SortType.DEFAULT:
      sortedPoints = showingPoints;
      break;
    case SortType.TIME:
      sortedPoints = showingPoints.sort((a, b) => (b.dateTo - b.dateFrom) - (a.dateTo - a.dateFrom));
      break;
    case SortType.PRICE:
      sortedPoints = showingPoints.sort((a, b) => b.basePrice - a.basePrice);
      break;
  }

  return sortedPoints.slice();
};

export default class TripController {
  constructor(container) {
    this._container = container;

    this._points = [];
    this._pointControllers = [];

    this._tripInfoComponent = new TripInfoComponent();
    this._costComponent = new CostComponent();
    this._daysComponent = new DaysComponent();
    this._dayComponent = new DayComponent();
    this._noPointsComponent = new NoPointsComponent();
    this._routeComponent = new RouteComponent();
    this._sortComponent = new SortComponent();
    this._eventsListComponent = new EventsListComponent();

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._sortComponent.setSortTypeHandler(this._onSortTypeChange);

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
  }

  render(points) {
    this._points = points;

    render(tripMainElement, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
    render(this._tripInfoComponent.getElement(), this._costComponent);
    render(this._container, this._daysComponent);

    if (this._points.length === 0) {
      render(this._container, this._noPointsComponent);
      return;
    }

    this._renderTripDays();
  }

  _renderTripDays() {
    getAllDates(this._points);

    render(this._tripInfoComponent.getElement(), this._routeComponent, RenderPosition.AFTERBEGIN);
    render(this._container, this._sortComponent, RenderPosition.AFTERBEGIN);

    const tripEventsDates = datesArray;
    const tripDays = getUniqueDates(tripEventsDates);

    let tripDayComponent = null;
    let dayDate = null;
    let dateTime = null;

    tripDays.map((day, index) => {
      tripDayComponent = new DayComponent(day, index);
      const eventsListElement = new EventsListComponent();

      render(this._daysComponent.getElement(), tripDayComponent);
      render(tripDayComponent.getElement(), eventsListElement);

      let tripDayEventsList = tripDayComponent.getElement().querySelector(`.trip-events__list`);
      dayDate = tripDayComponent.getElement().querySelector(`.day__date`);
      dateTime = new Date(dayDate.dateTime);

      for (const point of this._points) {
        if (point.dateFrom.toDateString() === dateTime.toDateString()) {
          const newPoints = renderPoints(tripDayEventsList, point, this._onDataChange, this._onViewChange);
          this._pointControllers = this._pointControllers.concat(newPoints);
        }
      }
    });
  }

  _onDataChange(pointController, oldData, newData) {
    const index = this._points.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._points = [].concat(this._points.slice(0, index), newData, this._points.slice(index + 1));

    pointController.render(this._points[index]);
  }

  _onViewChange() {
    this._pointControllers.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    const sortedPoints = getSortedPoints(this._points, sortType);

    this._daysComponent.getElement().innerHTML = ``;
    this._eventsListComponent.getElement().innerHTML = ``;

    if (sortType === SortType.DEFAULT) {
      this._renderTripDays();
    } else {
      render(this._daysComponent.getElement(), this._dayComponent);
      render(this._dayComponent.getElement(), this._eventsListComponent);

      for (const point of sortedPoints) {
        renderPoints(this._eventsListComponent.getElement(), point);
      }
    }
  }
}
