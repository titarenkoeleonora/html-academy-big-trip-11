import RoutePointsComponent from "../components/route-points";
import EventEditComponent from "../components/event-edit";
import {replace, render} from "../utils/render";
import {Key, Mode} from "../constants";

export default class PointController {
  constructor(container, dataChangeHandler, viewChangeHandler) {
    this._container = container;

    this._mode = Mode.DEFAULT;
    this._dataChangeHandler = dataChangeHandler;
    this._viewChangeHandler = viewChangeHandler;
    this._routePointComponent = null;
    this._eventEditComponent = null;

    this._ecsKeyDownClickHandler = this._ecsKeyDownClickHandler.bind(this);
    this._buttonClickHandler = this._buttonClickHandler.bind(this);
    this._favoritesButtonClickHandler = this._favoritesButtonClickHandler.bind(this);
    this._rollupButtonClickHandler = this._rollupButtonClickHandler.bind(this);
  }

  render(point) {
    const oldRoutePointComponent = this._routePointComponent;
    const oldEventEditComponent = this._eventEditComponent;
    this._point = point;

    this._routePointComponent = new RoutePointsComponent(this._point);
    this._eventEditComponent = new EventEditComponent(this._point);

    this._routePointComponent.setClickHandler(this._rollupButtonClickHandler);
    this._eventEditComponent.setSaveButtonHandler(this._buttonClickHandler);
    this._eventEditComponent.setResetButtonHandler(this._buttonClickHandler);
    this._eventEditComponent.setClickHandler(this._buttonClickHandler);
    this._eventEditComponent.setFavoritesButtonClickHandler(this._favoritesButtonClickHandler);

    if (oldEventEditComponent && oldRoutePointComponent) {
      replace(this._routePointComponent, oldRoutePointComponent);
      replace(this._eventEditComponent, oldEventEditComponent);
    } else {
      render(this._container, this._routePointComponent);
    }
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
    replace(this._routePointComponent, this._eventEditComponent);
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
      this._replaceEditFormToPoint();
      document.removeEventListener(`keydown`, this._ecsKeyDownClickHandler);
    }
  }
}
