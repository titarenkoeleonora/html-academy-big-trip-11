import {createElement} from "../utils";

const createDaysContainerTemplate = () => `<ul class="trip-days"></ul>`;

export default class DaysComponent {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createDaysContainerTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
