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
import {RenderPosition, Key} from "./constants.js";
import NoPointsComponent from "./components/no-points.js";
import {getAllDates, datesArray, getUniqueDates} from "./utils/date-utils.js";
import {render, replace} from "./utils/render.js";

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

const tripInfoElement = new TripInfoComponent();

render(tripMainElement, tripInfoElement, RenderPosition.AFTERBEGIN);

render(tripInfoElement.getElement(), new CostComponent());

render(firstTitleElement, new SiteMenuComponent(), RenderPosition.AFTEREND);
render(secondTitleElement, new FiltersComponent(), RenderPosition.AFTEREND);

const daysContainerElement = new DaysComponent();
render(tripEventsElement, daysContainerElement);

getAllDates(sortedTripPoints);

const tripEventsDates = datesArray;
const tripDays = getUniqueDates(tripEventsDates);

const renderTripDays = () => {

  if (sortedTripPoints.length === 0) {
    render(tripEventsElement, new NoPointsComponent());
    return;
  }

  let tripDayComponent = null;
  let dayDate = null;
  let dateTime = null;

  render(tripInfoElement.getElement(), new RouteComponent(), RenderPosition.AFTERBEGIN);
  render(tripEventsElement, new SortComponent(), RenderPosition.AFTERBEGIN);

  tripDays.map((day, index) => {
    tripDayComponent = new DayComponent(day, index);
    const eventsListElement = new EventsListComponent();

    render(daysContainerElement.getElement(), tripDayComponent);
    render(tripDayComponent.getElement(), eventsListElement);

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
