import RoutePointsComponent from "../components/route-points";
import EventEditComponent from "../components/event-edit";
import {replace, render, remove} from "../utils/render";
import {Key, Mode, RenderPosition} from "../constants";
// import {encode} from "he";
import PointModel from "../models/point-model";

// export const getOffersByType = (offers, type) => {
//   const index = offers.findIndex((offer) => offer.type === type);

//   return offers[index].offers;
// };

export const EmptyPoint = {
  id: ``,
  type: `Taxi`,
  dateFrom: new Date(),
  dateTo: new Date(),
  destination: {
    name: ``,
    description: ``,
    pictures: [],
  },
  basePrice: 0,
  isFavorite: false,
  offers: [],
};

// const parseFormData = (formData, id, destinations, offers) => {
//   const type = formData.get(`event-type`);
//   const city = encode(formData.get(`event-destination`));
//   const dateFrom = formData.get(`event-start-time`);
//   const dateTo = formData.get(`event-end-time`);
//   const pointOffers = formData.getAll(`event-offer`);
//   const isFavorite = formData.get(`event-favorite`);

//   const destination = destinations.find((item) => {
//     return city === item.name;
//   });

//   console.log(type, pointOffers);

//   const offersByType = getOffersByType(offers, type);
//   const checkedOffers = offersByType.filter((offer) => pointOffers.includes(offer.title));

//   return new PointModel({
//     id,
//     type,
//     'date_from': dateFrom ? new Date(dateFrom) : null,
//     'date_to': dateTo ? new Date(dateTo) : null,
//     'base_price': parseInt(encode(formData.get(`event-price`)), 10),
//     'destination': {
//       'name': destination.name,
//       'description': destination.description,
//       'pictures': destination.pictures.map((picture) => {
//         return {
//           src: picture.src,
//           description: picture.description,
//         };
//       })
//     },
//     'offers': checkedOffers,
//     'is_favorite': isFavorite,
//   });
// };

export default class PointController {
  constructor(container, dataChangeHandler, viewChangeHandler, destinations, offers) {
    this._container = container;

    this._offers = offers;
    this._destinations = destinations;

    this._mode = Mode.DEFAULT;
    this._dataChangeHandler = dataChangeHandler;
    this._viewChangeHandler = viewChangeHandler;
    this._routePointComponent = null;
    this._eventEditComponent = null;

    this._ecsKeyDownClickHandler = this._ecsKeyDownClickHandler.bind(this);
    this._submitButtonClickHandler = this._submitButtonClickHandler.bind(this);
    this._buttonClickHandler = this._buttonClickHandler.bind(this);
    this._favoritesButtonClickHandler = this._favoritesButtonClickHandler.bind(this);
    this._rollupButtonClickHandler = this._rollupButtonClickHandler.bind(this);
  }

  render(point, mode) {
    const oldRoutePointComponent = this._routePointComponent;
    const oldEventEditComponent = this._eventEditComponent;
    this._point = point;
    this._mode = mode;

    this._routePointComponent = new RoutePointsComponent(point);
    this._eventEditComponent = new EventEditComponent(point, mode, this._offers, this._destinations);

    this._routePointComponent.setClickHandler(this._rollupButtonClickHandler);
    this._eventEditComponent.setSaveButtonHandler(this._submitButtonClickHandler);
    this._eventEditComponent.setResetButtonHandler(this._buttonClickHandler);
    this._eventEditComponent.setClickHandler(this._buttonClickHandler);

    if (this._mode !== Mode.ADDING) {
      this._eventEditComponent.setFavoritesButtonClickHandler(this._favoritesButtonClickHandler);
    }

    this._eventEditComponent.setResetButtonHandler(() => this._dataChangeHandler(this, point, null));

    switch (mode) {
      case Mode.DEFAULT:
        if (oldEventEditComponent && oldRoutePointComponent) {
          replace(this._routePointComponent, oldRoutePointComponent);
          replace(this._eventEditComponent, oldEventEditComponent);
          this._replaceEditFormToPoint();
        } else {
          render(this._container, this._routePointComponent);
        }
        break;
      case Mode.ADDING:
        if (oldEventEditComponent && oldRoutePointComponent) {
          remove(oldRoutePointComponent);
          remove(oldEventEditComponent);
        }
        document.addEventListener(`keydown`, this._ecsKeyDownClickHandler);
        render(this._container, this._eventEditComponent, RenderPosition.AFTERBEGIN);
        break;
    }
  }

  destroy() {
    remove(this._eventEditComponent);
    remove(this._routePointComponent);
    document.removeEventListener(`keydown`, this._ecsKeyDownClickHandler);
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditFormToPoint();
    }
  }

  _replacePointToEditForm() {
    this._viewChangeHandler();
    this._mode = Mode.EDIT;
    replace(this._eventEditComponent, this._routePointComponent);
  }

  _replaceEditFormToPoint() {
    this._mode = Mode.DEFAULT;

    if (document.contains(this._eventEditComponent.getElement())) {
      replace(this._routePointComponent, this._eventEditComponent);
    }
  }

  _submitButtonClickHandler(evt) {
    evt.preventDefault();
    const formData = this._eventEditComponent.getData();
    const data = this._parseData(formData);

    this._dataChangeHandler(this, this._point, data);
    document.removeEventListener(`keydown`, this._ecsKeyDownClickHandler);

    if (this._eventEditComponent) {
      this._replaceEditFormToPoint();
    } else {
      this.destroy();
    }
  }

  _buttonClickHandler(evt) {
    evt.preventDefault();
    this._replaceEditFormToPoint();
    document.removeEventListener(`keydown`, this._ecsKeyDownClickHandler);
  }

  _rollupButtonClickHandler() {
    this._replacePointToEditForm();
    document.addEventListener(`keydown`, this._ecsKeyDownClickHandler);
  }

  _favoritesButtonClickHandler() {
    const newPoint = PointModel.clone(this._point);
    newPoint.isFavorite = !newPoint.isFavorite;

    this._dataChangeHandler(this, this._point, newPoint);
  }

  _ecsKeyDownClickHandler(evt) {
    if (evt.key === Key.ESCAPE) {
      if (this._mode === Mode.ADDING) {
        this._dataChangeHandler(this, EmptyPoint, null);
      }

      this._replaceEditFormToPoint();
      document.removeEventListener(`keydown`, this._ecsKeyDownClickHandler);
    }
  }

  _parseData(formData) {
    const pointModel = new PointModel(formData);
    const data = pointModel.toRAW(formData);

    return data;
  }
}
