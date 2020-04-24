import AbstractComponent from "./abstract-component";

const createDaysContainerTemplate = () => `<ul class="trip-days"></ul>`;

export default class DaysComponent extends AbstractComponent {
  getTemplate() {
    return createDaysContainerTemplate();
  }
}
