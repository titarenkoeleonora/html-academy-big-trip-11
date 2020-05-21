import {CITIES, typeRoutePointMap, TypeRoutePointIndex, TripDescriptions, Mode} from "../constants";
import {formatDate, formatTime} from "../utils/date-utils";
import AbstractSmartComponent from "./abstract-smart-component";
import {getRandomInteger} from "../utils/common";
import {descriptionsCount} from "./mock/route-point";
import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";
import {encode} from "he";

const createOptionsMarkup = (cities) => cities.map((city) => {
  return (
    `<option value="${city}"></option>`
  );
}).join(`\n`);

const createTypeMarkup = (types) => types.map((type) => {
  return (
    `<div class="event__type-item">
      <input id="event-type-${type.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
      <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type.toLowerCase()}-1">${type}</label>
    </div>`
  );
}).join(`\n`);

const createPhotosMarkup = (photos) => photos.map((photo) => {
  return (
    `<img class="event__photo" src="${photo}" alt="Event photo">`
  );
}).join(`\n`);

const createOfferMarkup = (offers) => offers.map((offer, index) => {
  return (
    `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${index + 1}" type="checkbox" name="event-offer-luggage" checked}>
    <label class="event__offer-label" for="event-offer-luggage-${index + 1}">
      <span class="event__offer-title">${offer.title}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
    </label>
  </div>`
  );
}).join(`\n`);

const createEdidtngMarkup = (isFavorite, offersMarkup, destination, photosMarkup) => {
  return (
    `<input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite ? `checked` : ``}>
      <label class="event__favorite-btn" for="event-favorite-1">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </label>

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
          ${offersMarkup}

        </div>
      </section>

      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${destination.description}</p>

        <div class="event__photos-container">
          <div class="event__photos-tape">
          <div class="event__photos-tape">
          ${photosMarkup}
        </div>
          </div>
        </div>
      </section>
    </section>
    </form>`
  );
};

const createEventEditTemplate = (tripPoint, mode) => {
  const {type, dateFrom, dateTo, destination, offers, basePrice, isFavorite} = tripPoint;

  const tripPointTypesTo = (Object.keys(typeRoutePointMap).slice(TypeRoutePointIndex.MIN_ACTIONS_INDEX, TypeRoutePointIndex.MAX_ACTIONS_INDEX));
  const tripPointTypesIn = (Object.keys(typeRoutePointMap).slice(TypeRoutePointIndex.MAX_ACTIONS_INDEX, TypeRoutePointIndex.MAX_ACTIVITY_INDEX));

  const typeTransferMarkup = createTypeMarkup(tripPointTypesTo);
  const typeActivityMarkup = createTypeMarkup(tripPointTypesIn);
  const photosMarkup = destination.pictures ? createPhotosMarkup(destination.pictures) : ``;
  const offersMarkup = offers ? createOfferMarkup(offers, Math.random() > 0.5) : ``;
  const optionMarkup = createOptionsMarkup(CITIES);

  const resetButtonMode = (mode === Mode.ADDING ? `Cancel` : `Delete`);
  const edidtngMarkup = (mode === Mode.ADDING ? `` : createEdidtngMarkup(isFavorite, offersMarkup, destination, photosMarkup));

  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Transfer</legend>
            ${typeTransferMarkup}
          </fieldset>

          <fieldset class="event__type-group">
            <legend class="visually-hidden">Activity</legend>
            ${typeActivityMarkup}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
        ${type} ${typeRoutePointMap[type]}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
        <datalist id="destination-list-1">
        ${optionMarkup}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">
          From
        </label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formatDate(dateFrom)} ${formatTime(dateFrom)}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">
          To
        </label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formatDate(dateTo)} ${formatTime(dateTo)}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">${resetButtonMode}</button>

      ${edidtngMarkup}`
  );
};

export default class EventEditComponent extends AbstractSmartComponent {
  constructor(eventEdit, mode) {
    super();

    this._eventEdit = eventEdit;
    this._eventDestination = this._eventEdit.destination;
    this._flatpickr = null;
    this._resetButtonClickHandler = null;
    this._mode = mode;

    this._parseFormData = this._parseFormData.bind(this);
    this._applyFlatpickr();
    this._subscribeOnEvents();
  }

  getTemplate() {
    return createEventEditTemplate(this._eventEdit, this._mode);
  }

  removeElement() {
    if (this._flatpickr) {
      this._flatpickr.destroy();
      this._flatpickr = null;
    }

    super.removeElement();
  }

  recoveryListeners() {
    this.setSaveButtonHandler(this._submitHandler);
    this.setResetButtonHandler(this._resetButtonClickHandler);
    this.setClickHandler(this._setClickHandler);
    if (this._mode !== Mode.ADDING) {
      this.setFavoritesButtonClickHandler(this._favoriteButtonHandler);
    }

    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();
    this._applyFlatpickr();
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.event__type-list`).addEventListener(`change`, (evt) => {
      this._eventEdit.type = evt.target.value;
      this.rerender();
    });

    element.querySelector(`.event__input--destination`).addEventListener(`change`, (evt) => {
      evt.preventDefault();

      this._eventDestination.name = evt.target.value;
      this._eventDestination.description = TripDescriptions.slice(0, getRandomInteger(descriptionsCount.MAX, descriptionsCount.MIN)).join(` `);

      this.rerender();
    });
  }

  getData() {
    const form = this.getElement();
    const formData = new FormData(form);

    return this._parseFormData(formData);
  }

  _parseFormData(formData) {
    let description = null;
    let pictures = null;
    let offers = null;
    const start = this._eventEdit.dateFrom;
    const end = this._eventEdit.dateTo;
    if (this._mode !== Mode.ADDING) {
      description = document.querySelector(`.event__destination-description`).textContent;
      pictures = [...document.querySelectorAll(`.event__photo`)];
      offers = [...document.querySelectorAll(`.event__offer-selector`)];

      pictures = pictures.map((photo) => photo.src);
      offers = offers.map((offer) => {
        return {
          title: offer.querySelector(`.event__offer-title`).textContent,
          price: offer.querySelector(`.event__offer-price`).textContent
        };
      });
    }

    return {
      id: String(new Date() + Math.random()),
      type: this._eventEdit.type,
      dateFrom: start ? start : null,
      dateTo: end ? end : null,
      destination: {
        name: encode(formData.get(`event-destination`)),
        description,
        pictures,
      },
      basePrice: parseInt(encode(formData.get(`event-price`)), 10),
      offers,
    };
  }

  setSaveButtonHandler(handler) {
    this.getElement().addEventListener(`submit`, handler);

    this._submitHandler = handler;
  }

  setResetButtonHandler(handler) {
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, handler);

    this._resetButtonClickHandler = handler;
  }

  setClickHandler(handler) {
    if (this._mode !== Mode.ADDING) {
      this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, handler);

      this._setClickHandler = handler;
    }
  }

  setFavoritesButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__favorite-btn`).addEventListener(`click`, handler);

    this._favoriteButtonHandler = handler;
  }

  _destroyFlatpickr() {
    this._flatpickr.destroy();
    this._flatpickr = null;
  }

  _applyFlatpickr() {
    const startTime = this.getElement().querySelector(`#event-start-time-1`);
    const endTime = this.getElement().querySelector(`#event-end-time-1`);

    if (this._flatpickr) {
      this._destroyFlatpickr();
    }

    this._flatpickr = flatpickr(startTime, {
      altInput: true,
      altFormat: `d/m/y H:i`,
      defaultDate: this._eventEdit.dateFrom || ``,
    });

    this._flatpickr = flatpickr(endTime, {
      altInput: true,
      altFormat: `d/m/y H:i`,
      defaultDate: this._eventEdit.dateTo || ``,
    });
  }
}
