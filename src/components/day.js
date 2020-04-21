import {MONTHS} from "./constants";
import {createElement} from "../utils";

const createDayTemplate = (date, index) => {
  const dateValue = new Date(date);

  const day = dateValue.getDate();
  const month = dateValue.getMonth();
  const year = dateValue.getFullYear();

  return (
    `<li class="trip-days__item  day">
          <div class="day__info">
            <span class="day__counter">${index + 1}</span>
            <time class="day__date" datetime="${year}-${month + 1}-${day}">${MONTHS[month]} ${day}</time>
          </div>
        </li>`
  );
};

export default class DayComponent {
  constructor(day, index) {
    this._day = day;
    this._index = index;
    this._element = null;
  }

  getTemplate() {
    return createDayTemplate(this._day, this._index);
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
