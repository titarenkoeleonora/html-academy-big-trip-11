import FilterController from "./controllers/filter-controller.js";
import PointsModel from "./models/points-model.js";
import SiteMenuComponent, {MenuItem} from "./components/site-menu.js";
import StatisticsComponent from "./components/statistics.js";
import TripController from "./controllers/trip-controller.js";
import {RenderPosition} from "./constants.js";
import {render} from "./utils/render.js";
import API from "./api.js";

const AUTHORIZATION = `Basic dscsknd02ur943jskdv`;

const api = new API(AUTHORIZATION);

const pageBodyContainer = document.querySelector(`main .page-body__container`);
const siteMainElement = document.querySelector(`.page-main`);
const tripEventsElement = siteMainElement.querySelector(`.trip-events`);
const tripMainElement = document.querySelector(`.trip-main`);
const newEventButtonElement = tripMainElement.querySelector(`.trip-main__event-add-btn`);
const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
const tripControlsTitlesElement = tripControlsElement.querySelectorAll(`h2`);
const [firstTitleElement, secondTitleElement] = tripControlsTitlesElement;

const pointsModel = new PointsModel();
const siteMenuComponent = new SiteMenuComponent();
const filterController = new FilterController(secondTitleElement, pointsModel);
const tripController = new TripController(tripEventsElement, pointsModel, api);
const statisticsComponent = new StatisticsComponent(pointsModel);

render(firstTitleElement, siteMenuComponent, RenderPosition.AFTEREND);
filterController.render();
render(pageBodyContainer, statisticsComponent);
statisticsComponent.hide();

newEventButtonElement.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  newEventButtonElement.disabled = `disabled`;
  filterController.setDefaultView();
  tripController.createPoint();
});

siteMenuComponent.tableChangeHandler(() => {
  siteMenuComponent.setActiveItem(MenuItem.TABLE);
  statisticsComponent.hide();
  tripController.show();
});

siteMenuComponent.statisticChangeHandler(() => {
  siteMenuComponent.setActiveItem(MenuItem.STATISTICS);
  tripController.hide();
  statisticsComponent.show();
});

api.getOffers()
.then((offers) => {
  pointsModel.setOffers(offers);
});

api.getDestinations()
.then((destinations) => {
  pointsModel.setDestinations(destinations);
});

api.getPoints()
.then((points) => {
  pointsModel.setPoints(points);
  tripController.render();
});

export {tripMainElement, newEventButtonElement};
