import AbstractComponent from "./abstract-component";
import {MONTHS} from "../constants";

const createDayTemplate = (date, index) => {
  const dateValue = new Date(date);

  const day = dateValue.getDate();
  const month = dateValue.getMonth();
  const year = dateValue.getFullYear();
  index = index + 1;

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${index ? index : ``}</span>
          <time class="day__date" datetime="${year}-${month + 1}-${day}">${month ? MONTHS[month] : ``} ${day ? day : ``}</time>
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
