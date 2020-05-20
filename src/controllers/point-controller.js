import RoutePointsComponent from "../components/route-points";
import EventEditComponent from "../components/event-edit";
import {replace, render} from "../utils/render";
import {Key, Mode, RenderPosition} from "../constants";
import {remove} from "../../../1120597-taskmanager-11/src/utils/render";

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

export default class PointController {
  constructor(container, dataChangeHandler, viewChangeHandler) {
    this._container = container;

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
    this._eventEditComponent = new EventEditComponent(point, mode);

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
    const data = this._eventEditComponent.getData();
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
    const updatedPoint = Object.assign({}, this._point, {
      isFavorite: !this._point.isFavorite
    });

    this._dataChangeHandler(this, this._point, updatedPoint);
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
}
