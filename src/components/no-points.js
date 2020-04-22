import {createElement} from "../utils";

const createNoPointsTemplate = () => `<p class="trip-events__msg">Click New Event to create your first point</p>`;

export default class NoPointsComponent {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createNoPointsTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElemenet() {
    this._element = null;
  }
}
