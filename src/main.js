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
import {getAllDates, datesArray, getUniqueDates} from "./components/points-in-days.js";
import {render} from "./utils.js";
import {RenderPosition} from "./components/constants.js";

const POINTS_COUNT = 10;
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
    container.replaceChild(EventEditComponent.getElement(), RoutePointsComponent.getElement());
  };

  const replaceEditFormToPoint = () => {
    container.replaceChild(RoutePointsComponent.getElement(), EventEditComponent.getElement());
  };

  const routePointComponent = new RoutePointsComponent(routePoint);

  const rollupButton = routePointComponent.getElement().querySelector(`.event__rollup-btn`);
  rollupButton.addEventListener(`click`, replacePointToEditForm);

  const eventEditComponent = new EventEditComponent(routePoint);
  const eventSaveButton = eventEditComponent.getElement().querySelector(`.event__save-btn`);
  const eventResetButton = eventEditComponent.getElement().querySelector(`.event__reset-btn`);

  eventSaveButton.addEventListener(`click`, replaceEditFormToPoint);
  eventResetButton.addEventListener(`click`, replaceEditFormToPoint);

  render(container, routePointComponent.getElement());
};

const tripInfoElement = new TripInfoComponent();

render(tripMainElement, tripInfoElement.getElement(), RenderPosition.AFTERBEGIN);

render(tripInfoElement.getElement(), new RouteComponent().getElement());
render(tripInfoElement.getElement(), new CostComponent().getElement());

// !!!!!!!!!!!!!!!!
render(firstTitleElement, new SiteMenuComponent().getElement(), RenderPosition.AFTEREND); // Эти два элемента ни в какую не хотят отрисовываться afterend
render(secondTitleElement, new FiltersComponent().getElement(), RenderPosition.AFTEREND); // сто раз перепроверила функцию отрисовки, правильность именования константы
// через консоль вывела каждый элемент и заголовок, и никак( а beforeend рендерятся...
// !!!!!!!!!!!!!!!!

render(tripEventsElement, new SortComponent().getElement());

const daysContainerElement = new DaysComponent();
render(tripEventsElement, daysContainerElement.getElement());

getAllDates(sortedTripPoints);

const tripEventsDates = datesArray;
const tripDays = getUniqueDates(tripEventsDates);

const eventsListElement = new EventsListComponent();

tripDays.map((day, index) => {
  render(daysContainerElement.getElement(), new DayComponent(day, index).getElement());
});

const dayContainerElement = new DayComponent();

// !!!!!!!!!!!!!!!!!!!
// Тут по моей логике должно все выводиться как надо, а оно рендерится только в консоли и в какой-то момент ломается((
// Не пойму, в чем беда. Вообще, кажется, что очень сильно намудрила в этой функции(( Как ее переписать так, чтобы
// больше не мучаться с ней?

const renderTripPointsInDays = () => {

  tripDays.forEach((day, index) => {
    const filterPoints = sortedTripPoints.filter((point) => {
      return point.dateFrom.toDateString() === day;
    });

    render(dayContainerElement.getElement(day, index), eventsListElement.getElement(index));
    renderPoints(eventsListElement.getElement(index), filterPoints[index]);
    console.log(dayContainerElement.getElement(day, index));
  });

  // Эксперименты с переписыванием функции, но ничего хорошего не получилось. Консоль вообще молчит и ничего не выводится.

  // tripDays.forEach((day, index) => {
  //   const date = new Date(day);

  //   sortedTripPoints.forEach((point) => {
  //     if (point.dateFrom.toDateString() === date.toDateString()) {
  //       render(dayContainerElement.getElement(index), eventsListElement.getElement(index));
  //       renderPoints(eventsListElement.getElement(index), point);
  //     }
  //   });
  // });
};

renderTripPointsInDays();
