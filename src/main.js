import FiltersComponent from "./components/filters.js";
import SiteMenuComponent from "./components/site-menu.js";
import {generateTripPoints} from "./components/mock/route-point.js";
import {RenderPosition} from "./constants.js";
import {render} from "./utils/render.js";
import TripController from "./controllers/trip-controller.js";

const POINTS_COUNT = 25;

const siteMainElement = document.querySelector(`.page-main`);
const tripEventsElement = siteMainElement.querySelector(`.trip-events`);
export const tripMainElement = document.querySelector(`.trip-main`);

const tripPoint = generateTripPoints(POINTS_COUNT);
export const sortedTripPoints = tripPoint.sort((a, b) => a.dateFrom > b.dateFrom ? 1 : -1);

const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
const tripControlsTitlesElement = tripControlsElement.querySelectorAll(`h2`);
const [firstTitleElement, secondTitleElement] = tripControlsTitlesElement;

render(firstTitleElement, new SiteMenuComponent(), RenderPosition.AFTEREND);
render(secondTitleElement, new FiltersComponent(), RenderPosition.AFTEREND);

const tripController = new TripController(tripEventsElement);
tripController.render(sortedTripPoints);
