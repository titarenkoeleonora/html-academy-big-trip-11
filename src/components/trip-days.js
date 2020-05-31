import AbstractComponent from "./abstract-component";

const createDaysContainerTemplate = () => `<ul class="trip-days"></ul>`;

export default class Days extends AbstractComponent {
  getTemplate() {
    return createDaysContainerTemplate();
  }
}
