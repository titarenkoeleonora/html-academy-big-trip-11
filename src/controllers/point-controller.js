import RoutePointsComponent from "../components/route-points";
import EventEditComponent from "../components/event-edit";
import {replace, render} from "../utils/render";
import {Key, Mode} from "../constants";

export default class PointController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;

    this._mode = Mode.DEFAULT;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._routePointComponent = null;
    this._eventEditComponent = null;

    this._onEscKeyDown = this._onEcsKeyDown.bind(this);
  }

  render(point) {
    const oldRoutePointComponent = this._eventItemComponent;
    const oldEventEditComponent = this._eventEditComponent;

    this._routePointComponent = new RoutePointsComponent(point);
    this._eventEditComponent = new EventEditComponent(point);

    this._routePointComponent.setClickHandler(() => {
      this._replacePointToEditForm();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._eventEditComponent.setSaveButtonHandler((evt) => {
      evt.preventDefault();
      this._replaceEditFormToPoint();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    });

    this._eventEditComponent.setResetButtonHandler((evt) => {
      evt.preventDefault();
      this._replaceEditFormToPoint();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    });

    this._eventEditComponent.setFavoritesButtonClickHandler(() => {
      this._onDataChange(this, point, Object.assign({}, point, {
        isFavorite: !point.isFavorite
      }));
    });

    if (oldEventEditComponent && oldRoutePointComponent) {
      replace(this._eventItemComponent, oldRoutePointComponent);
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
    this._onViewChange();
    this._mode = Mode.EDIT;
    replace(this._eventEditComponent, this._routePointComponent);
  }

  _replaceEditFormToPoint() {
    this._mode = Mode.DEFAULT;
    replace(this._routePointComponent, this._eventEditComponent);
  }

  _onEcsKeyDown(evt) {
    if (evt.key === Key.ESCAPE) {
      this._replaceEditFormToPoint();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
