import {MONTHS} from "./constants";
import AbstractComponent from "./abstract-component";

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

export default class DayComponent extends AbstractComponent {
  constructor(day, index) {
    super();

    this._day = day;
    this._index = index;
  }

  getTemplate() {
    return createDayTemplate(this._day, this._index);
  }
}
