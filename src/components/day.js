import {MONTHS} from "./constants";

export const createDayTemplate = (dates) => {
  return dates.map((date, index) => {
    const dateValue = new Date(date);

    const day = dateValue.getDate();
    const month = dateValue.getMonth();
    const year = dateValue.getYear();

    return (
      ` <li class="trip-days__item  day">
          <div class="day__info">
            <span class="day__counter">${index + 1}</span>
            <time class="day__date" datetime="${year}-${month + 1}-${day}">${MONTHS[month]} ${day}</time>
          </div>
        </li>`
    );
  }).join(`\n`);
};
