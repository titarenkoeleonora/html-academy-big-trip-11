import AbstractComponent from "./abstract-component";

const createEventsListTemplate = () => `<ul class="trip-events__list"></ul>`;

export default class EventsList extends AbstractComponent {
  getTemplate() {
    return createEventsListTemplate();
  }
}
