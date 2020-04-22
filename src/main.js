import CostComponent from "./components/cost.js";
import DayComponent from "./components/day.js";
import EventEditComponent from "./components/event-edit.js";
import EventsListComponent from "./components/events-list.js";
import FiltersComponent from "./components/filters.js";
import RouteComponent from "./components/route.js";
import RoutePointsComponent from "./components/route-points.js";
import SiteMenuComponent from "./components/site-menu.js";
import SortComponent from "./components/sort.js";
import DaysComponent from "./components/trip-days.js";
import TripInfoComponent from "./components/trip-info.js";
import {generateTripPoints} from "./components/mock/route-point.js";
import {render, getAllDates, datesArray, getUniqueDates} from "./utils.js";
import {RenderPosition, Key} from "./components/constants.js";
import NoPointsComponent from "./components/no-points.js";

const POINTS_COUNT = 25;
const tripPoint = generateTripPoints(POINTS_COUNT);
const sortedTripPoints = tripPoint.sort((a, b) => a.dateFrom > b.dateFrom ? 1 : -1);

const siteMainElement = document.querySelector(`.page-main`);
const tripEventsElement = siteMainElement.querySelector(`.trip-events`);
const tripMainElement = document.querySelector(`.trip-main`);
const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
const tripControlsTitlesElement = tripControlsElement.querySelectorAll(`h2`);
const [firstTitleElement, secondTitleElement] = tripControlsTitlesElement;

const renderPoints = (container, routePoint) => {
  const replacePointToEditForm = () => {
    container.replaceChild(eventEditComponent.getElement(), routePointComponent.getElement());
  };

  const replaceEditFormToPoint = () => {
    container.replaceChild(routePointComponent.getElement(), eventEditComponent.getElement());
  };

  const onEcsKeyDown = (evt) => {
    if (evt.key === Key.ESCAPE) {
      replaceEditFormToPoint();
      document.removeEventListener(`keydown`, onEcsKeyDown);
    }
  };

  const routePointComponent = new RoutePointsComponent(routePoint);
  const rollupButton = routePointComponent.getElement().querySelector(`.event__rollup-btn`);
  rollupButton.addEventListener(`click`, () => {
    replacePointToEditForm();
    document.addEventListener(`keydown`, onEcsKeyDown);
  });

  const eventEditComponent = new EventEditComponent(routePoint);
  const eventSaveButton = eventEditComponent.getElement().querySelector(`.event__save-btn`);
  const eventResetButton = eventEditComponent.getElement().querySelector(`.event__reset-btn`);

  eventSaveButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    replaceEditFormToPoint();
    document.removeEventListener(`keydown`, onEcsKeyDown);
  });

  eventResetButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    replaceEditFormToPoint();
    document.removeEventListener(`keydown`, onEcsKeyDown);
  });

  render(container, routePointComponent.getElement());
};

const tripInfoElement = new TripInfoComponent();

render(tripMainElement, tripInfoElement.getElement(), RenderPosition.AFTERBEGIN);

render(tripInfoElement.getElement(), new CostComponent().getElement());

render(firstTitleElement, new SiteMenuComponent().getElement(), RenderPosition.AFTEREND);
render(secondTitleElement, new FiltersComponent().getElement(), RenderPosition.AFTEREND);

const daysContainerElement = new DaysComponent();
render(tripEventsElement, daysContainerElement.getElement());

getAllDates(sortedTripPoints);

const tripEventsDates = datesArray;
const tripDays = getUniqueDates(tripEventsDates);

const renderTripDays = () => {

  if (sortedTripPoints.length === 0) {
    render(tripEventsElement, new NoPointsComponent().getElement());
    return;
  }

  let tripDayComponent = null;
  let dayDate = null;
  let dateTime = null;

  render(tripInfoElement.getElement(), new RouteComponent().getElement(), RenderPosition.AFTERBEGIN);
  render(tripEventsElement, new SortComponent().getElement(), RenderPosition.AFTERBEGIN);

  tripDays.map((day, index) => {
    tripDayComponent = new DayComponent(day, index);
    const eventsListElement = new EventsListComponent();

    render(daysContainerElement.getElement(), tripDayComponent.getElement());
    render(tripDayComponent.getElement(), eventsListElement.getElement());

    let tripDayEventsList = tripDayComponent.getElement().querySelector(`.trip-events__list`);
    dayDate = tripDayComponent.getElement().querySelector(`.day__date`);
    dateTime = new Date(dayDate.dateTime);

    for (const point of sortedTripPoints) {
      if (point.dateFrom.toDateString() === dateTime.toDateString()) {
        renderPoints(tripDayEventsList, point);
      }
    }
  });
};

renderTripDays();
