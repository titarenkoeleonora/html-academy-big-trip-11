import {replace, render} from "../utils/render";
import {Key, RenderPosition} from "../constants";
import RoutePointsComponent from "../components/route-points";
import EventEditComponent from "../components/event-edit";
import DaysComponent from "../components/trip-days";
import {getAllDates, datesArray, getUniqueDates} from "../utils/date-utils";
import NoPointsComponent from "../components/no-points";
import SortComponent from "../components/sort";
import RouteComponent from "../components/route";
import DayComponent from "../components/day";
import EventsListComponent from "../components/events-list";
import {tripMainElement} from "../main";
import TripInfoComponent from "../components/trip-info";
import CostComponent from "../components/cost";

const renderPoints = (container, routePoint) => {
  const replacePointToEditForm = () => {
    replace(eventEditComponent, routePointComponent);
  };

  const replaceEditFormToPoint = () => {
    replace(routePointComponent, eventEditComponent);
  };

  const onEcsKeyDown = (evt) => {
    if (evt.key === Key.ESCAPE) {
      replaceEditFormToPoint();
      document.removeEventListener(`keydown`, onEcsKeyDown);
    }
  };

  const routePointComponent = new RoutePointsComponent(routePoint);

  routePointComponent.setClickHandler(() => {
    replacePointToEditForm();
    document.addEventListener(`keydown`, onEcsKeyDown);
  });

  const eventEditComponent = new EventEditComponent(routePoint);

  eventEditComponent.setSaveButtonHandler((evt) => {
    evt.preventDefault();
    replaceEditFormToPoint();
    document.removeEventListener(`keydown`, onEcsKeyDown);
  });

  eventEditComponent.setResetButtonHandler((evt) => {
    evt.preventDefault();
    replaceEditFormToPoint();
    document.removeEventListener(`keydown`, onEcsKeyDown);
  });

  render(container, routePointComponent);
};

export default class TripController {
  constructor(container) {
    this._container = container;

    this._tripInfoComponent = new TripInfoComponent();
    this._costComponent = new CostComponent();
    this._daysComponent = new DaysComponent();
    this._noPointsComponent = new NoPointsComponent();
    this._routeComponent = new RouteComponent();
    this._sortComponent = new SortComponent();
    this._eventsListComponent = new EventsListComponent();
  }

  render(points) {
    render(tripMainElement, this._tripInfoComponent, RenderPosition.AFTERBEGIN);

    render(this._tripInfoComponent.getElement(), this._costComponent);

    render(this._container, this._daysComponent);

    getAllDates(points);

    const tripEventsDates = datesArray;
    const tripDays = getUniqueDates(tripEventsDates);

    if (points.length === 0) {
      render(this._container, this._noPointsComponent);
      return;
    }

    let tripDayComponent = null;
    let dayDate = null;
    let dateTime = null;

    render(this._tripInfoComponent.getElement(), this._routeComponent, RenderPosition.AFTERBEGIN);
    render(this._container, this._sortComponent, RenderPosition.AFTERBEGIN);

    tripDays.map((day, index) => {
      tripDayComponent = new DayComponent(day, index);
      const eventsListElement = new EventsListComponent();

      render(this._daysComponent.getElement(), tripDayComponent);
      render(tripDayComponent.getElement(), eventsListElement);

      let tripDayEventsList = tripDayComponent.getElement().querySelector(`.trip-events__list`);
      dayDate = tripDayComponent.getElement().querySelector(`.day__date`);
      dateTime = new Date(dayDate.dateTime);

      for (const point of points) {
        if (point.dateFrom.toDateString() === dateTime.toDateString()) {
          renderPoints(tripDayEventsList, point);
        }
      }
    });
  }
}
