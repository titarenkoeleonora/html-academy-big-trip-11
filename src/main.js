import {createCostTemplate} from "./components/cost.js";
import {createDayTemplate} from "./components/day.js";
import {createEventEditTemplate} from "./components/event-edit.js";
import {createFiltersTemplate} from "./components/filters.js";
import {createRouteTemplate} from "./components/route.js";
import {createSiteMenuTemplate} from "./components/site-menu.js";
import {createSortingTemplate} from "./components/sotring.js";
import {createDaysContainerTemplate} from "./components/trip-days.js";
import {createTripInfoTemplate} from "./components/trip-info.js";
import {generateTripPoints} from "./components/mock/route-point.js";
import {getAllDates, datesArray, getUniqueDates, renderTripPointsInDays} from "./components/points-in-days.js";
import {render} from "./utils.js";

const POINTS_COUNT = 25;
const tripPoint = generateTripPoints(POINTS_COUNT);
const sortedTripPoints = tripPoint.sort((a, b) => a.dateFrom > b.dateFrom ? 1 : -1);

const siteMainElement = document.querySelector(`.page-main`);
const tripEventsElement = siteMainElement.querySelector(`.trip-events`);
const tripMainElement = document.querySelector(`.trip-main`);
const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
const tripControlsTitlesElement = tripControlsElement.querySelectorAll(`h2`);
const [firstTitleElement, secondTitleElement] = tripControlsTitlesElement;

render(tripMainElement, createTripInfoTemplate(), `afterbegin`);

const tripInfoElement = tripMainElement.querySelector(`.trip-info`);

render(tripInfoElement, createRouteTemplate());
render(tripInfoElement, createCostTemplate());


render(firstTitleElement, createSiteMenuTemplate(), `afterend`);
render(secondTitleElement, createFiltersTemplate(), `afterend`);
render(tripEventsElement, createSortingTemplate());

render(tripEventsElement, createEventEditTemplate(tripPoint[0]));

render(tripEventsElement, createDaysContainerTemplate());

const daysContainerElement = tripEventsElement.querySelector(`.trip-days`);

getAllDates(sortedTripPoints);

const tripEventsDates = datesArray;
const tripDays = getUniqueDates(tripEventsDates);

render(daysContainerElement, createDayTemplate(tripDays));

const daysListElement = document.querySelectorAll(`.day`);
const daysLists = Array.from(daysListElement);

renderTripPointsInDays(sortedTripPoints, tripDays, daysLists);
