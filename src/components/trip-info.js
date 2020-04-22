import AbstractComponent from "./abstract-component";

const createTripInfoTemplate = () => `<section class="trip-main__trip-info  trip-info"></section>`;

export default class TripInfoComponent extends AbstractComponent {
  getTemplate() {
    return createTripInfoTemplate();
  }
}
