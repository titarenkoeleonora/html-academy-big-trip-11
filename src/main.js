import {createCostTemplate} from "./components/cost.js";
import {createDayTemplate} from "./components/day.js";
import {createEventEditTemplate} from "./components/event-edit.js";
import {createEventsListTemplate} from "./components/events-list.js";
import {createFiltersTemplate} from "./components/filters.js";
import {createRoutePointsTemplate} from "./components/route-points.js";
import {createRouteTemplate} from "./components/route.js";
import {createSiteMenuTemplate} from "./components/site-menu.js";
import {createSortingTemplate} from "./components/sotring.js";
import {createDaysContainerTemplate} from "./components/trip-days.js";
import {createTripInfoTemplate} from "./components/trip-info.js";
import {tripPoint} from "./components/mock/route-point.js";

const POINTS_COUNT = 3;

const tripMainElement = document.querySelector(`.trip-main`);
const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
const tripControlsTitlesElement = tripControlsElement.querySelectorAll(`h2`);
const [firstTitleElement, secondTitleElement] = tripControlsTitlesElement;
const siteMainElement = document.querySelector(`.page-main`);
const tripEventsElement = siteMainElement.querySelector(`.trip-events`);

const render = (container, template, place = `beforeend`) => container.insertAdjacentHTML(place, template);

render(tripMainElement, createTripInfoTemplate(), `afterbegin`);

const tripInfoElement = tripMainElement.querySelector(`.trip-info`);

render(tripInfoElement, createRouteTemplate());
render(tripInfoElement, createCostTemplate());

render(firstTitleElement, createSiteMenuTemplate(), `afterend`);
render(secondTitleElement, createFiltersTemplate(), `afterend`);
render(tripEventsElement, createSortingTemplate());
render(tripEventsElement, createEventEditTemplate());
render(tripEventsElement, createDaysContainerTemplate());

const daysContainerElement = tripEventsElement.querySelector(`.trip-days`);

render(daysContainerElement, createDayTemplate());

const dayElement = daysContainerElement.querySelector(`.day`);

render(dayElement, createEventsListTemplate());

const eventsListElement = dayElement.querySelector(`.trip-events__list`);

const renderRoutePoints = (container, template, place) => {
  for (let i = 0; i < POINTS_COUNT; i++) {
    render(container, template, place);
  }
};

renderRoutePoints(eventsListElement, createRoutePointsTemplate(tripPoint()));
