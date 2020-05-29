import {typeRoutePointMap, TypeRoutePointIndex, Mode} from "../constants";
import {formatDate, formatTime} from "../utils/date-utils";
import AbstractSmartComponent from "./abstract-smart-component";
import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";
import {getCapitalizedString} from "../utils/common";
import {encode} from "he";
import moment from 'moment';

const isOfferChecked = (offer, checkedOffers) => {
  let isChecked = false;

  checkedOffers.forEach((checkedOffer) => {
    if (offer.title === checkedOffer.title) {
      isChecked = true;
    }
  });

  return isChecked;
};

const createOptionsMarkup = (cities) => cities.map((city) => {
  return (
    `<option value="${city.name}"></option>`
  );
}).join(`\n`);

const createTypeMarkup = (types) => types.map((type) => {
  return (
    `<div class="event__type-item">
      <input id="event-type-${type.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
      <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type.toLowerCase()}-1">${getCapitalizedString(type)}</label>
    </div>`
  );
}).join(`\n`);

const createPhotosMarkup = (photos) => photos.map((photo) => {
  return (
    `<img class="event__photo" src="${photo.src}" alt="${photo.description}">`
  );
}).join(`\n`);

const createOfferMarkup = (offersByType, checkedOffers) => offersByType.map((offer, index) => {
  const isChecked = isOfferChecked(offer, checkedOffers);

  return (
    `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.title}-${index + 1}" type="checkbox" name="event-offer-${offer.title}" data-id="${index}" ${isChecked ? `checked` : ``}>
    <label class="event__offer-label" for="event-offer-${offer.title}-${index + 1}">
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

const createEventEditTemplate = (tripPoint, mode, options = {}) => {
  const {dateFrom, dateTo, basePrice, isFavorite} = tripPoint;
  const {type, offersByType, checkedOffers, destination, allDestinations} = options;
  const tripPointTypesTo = (Object.keys(typeRoutePointMap).slice(TypeRoutePointIndex.MIN_ACTIONS_INDEX, TypeRoutePointIndex.MAX_ACTIONS_INDEX));
  const tripPointTypesIn = (Object.keys(typeRoutePointMap).slice(TypeRoutePointIndex.MAX_ACTIONS_INDEX, TypeRoutePointIndex.MAX_ACTIVITY_INDEX));

  const typeTransferMarkup = createTypeMarkup(tripPointTypesTo);
  const typeActivityMarkup = createTypeMarkup(tripPointTypesIn);
  const photosMarkup = destination.pictures ? createPhotosMarkup(destination.pictures) : ``;
  const offersMarkup = offersByType && mode !== Mode.ADDING ? createOfferMarkup(offersByType, checkedOffers) : ``;
  const optionMarkup = createOptionsMarkup(allDestinations);

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
        ${typeRoutePointMap[type]}
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
  constructor(eventEdit, mode, offers, destinations) {
    super();

    this._eventEdit = eventEdit;
    this._eventDestination = this._eventEdit.destination;
    this._flatpickr = null;
    this._resetButtonClickHandler = null;
    this._mode = mode;

    this._allOffers = offers;
    this._allDestinations = destinations;
    this._offers = [...document.querySelectorAll(`.event__offer-checkbox`)];
    this._offersByType = this._getOffersByType(this._allOffers, this._eventEdit.type);

    this._applyFlatpickr();
    this._subscribeOnEvents();
  }

  getTemplate() {

    return createEventEditTemplate(this._eventEdit, this._mode, {
      type: this._eventEdit.type,
      offersByType: this._getOffersByType(this._allOffers, this._eventEdit.type),
      checkedOffers: this._eventEdit.checkedOffers,
      destination: this._eventEdit.destination,
      allDestinations: this._allDestinations,
    });
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

    this._applyFlatpickr();
    this._subscribeOnEvents();
  }

  rerender() {
    this._applyFlatpickr();
    super.rerender();
  }


  getData() {
    const id = this._eventEdit.id;
    const type = this._eventEdit.type;
    const dateFrom = new Date(moment(this._eventEdit.dateFrom, `DD/MM/YY HH:mm`).format());
    const dateTo = new Date(moment(this._eventEdit.dateTo, `DD/MM/YY HH:mm`).format());

    this._eventEdit = {
      id,
      type,
      dateFrom,
      dateTo,
      destination: this._eventEdit.destination,
      basePrice: parseInt(this._eventEdit.basePrice, 10),
      checkedOffers: this._eventEdit.checkedOffers,
      isFavorite: this._mode === Mode.EDIT ? this._eventEdit.isFavorite : false,
    };

    return this._eventEdit;
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
      dateFormat: `d/m/y H:i`,
      altFormat: `d/m/y H:i`,
      defaultDate: this._eventEdit.dateFrom || ``,
      minDate: this._eventEdit.dateFrom,
      [`time_24hr`]: true,
      enableTime: true,
    });

    this._flatpickr = flatpickr(endTime, {
      altInput: true,
      dateFormat: `d/m/y H:i`,
      altFormat: `d/m/y H:i`,
      defaultDate: this._eventEdit.dateTo || ``,
      minDate: this._eventEdit.dateFrom,
      [`time_24hr`]: true,
      enableTime: true,
    });
  }

  _subscribeOnEvents() {
    const element = this.getElement();
    const offersCheckbox = element.querySelector(`.event__available-offers`);
    const destinationElement = element.querySelector(`.event__input--destination`);
    const priceElement = element.querySelector(`.event__input--price`);
    const startTimeElement = element.querySelector(`[name="event-start-time"]`);
    const endTimeElement = element.querySelector(`[name="event-end-time"]`);

    element.querySelector(`.event__type-list`).addEventListener(`change`, (evt) => {
      this._eventEdit.type = evt.target.value;
      this._eventEdit.checkedOffers = [];
      this._offersByType = this._getOffersByType(this._allOffers, this._eventEdit.type);

      this.rerender();
    });

    destinationElement.addEventListener(`change`, () => {
      this._eventDestination.name = destinationElement.value;

      const index = this._allDestinations.map((destination) => destination.name).indexOf(this._eventDestination.name);

      if (index === -1) {
        return;
      }

      this._eventEdit.destination = this._allDestinations[index];
      this.rerender();
    });

    startTimeElement.addEventListener(`change`, () => {
      this._eventEdit.dateFrom = encode(startTimeElement.value);
    });

    endTimeElement.addEventListener(`change`, () => {
      this._eventEdit.dateTo = encode(endTimeElement.value);
    });

    priceElement.addEventListener(`input`, () => {
      this._eventEdit.basePrice = priceElement.value;
      this.rerender();
    });

    if (offersCheckbox) {
      offersCheckbox.addEventListener(`click`, (evt) => {
        this._offersByType = this._getOffersByType(this._allOffers, this._eventEdit.type);
        const index = evt.target.dataset.id;
        const checkedOffer = this._offersByType[index];

        if (evt.target.checked) {
          this._eventEdit.checkedOffers.push(checkedOffer);
        } else {
          if (checkedOffer) {
            this._eventEdit.checkedOffers = this._eventEdit.checkedOffers.filter((item) => item.title !== checkedOffer.title);
          }
        }
      });
    }
  }

  _getOffersByType(offers, type) {
    const index = offers.findIndex((offer) => offer.type === type.toLowerCase());

    return offers[index].offers;
  }
}
