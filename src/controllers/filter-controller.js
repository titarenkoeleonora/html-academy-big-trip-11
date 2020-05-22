import {getPointsByFilter} from "../utils/filter";
import FiltersComponent from "../components/filters";
import {replace, render} from "../utils/render";
import {FilterType, RenderPosition} from "../constants";

export default class FilterController {
  constructor(container, pointsModel) {
    this._container = container;
    this._pointsModel = pointsModel;

    this._activeFilterType = FilterType.EVERYTHING;
    this._filterComponent = null;

    this._dataChangeHandler = this._dataChangeHandler.bind(this);
    this._filterChangeHandler = this._filterChangeHandler.bind(this);

    this._pointsModel.setDataChangeHandler(this._dataChangeHandler);
  }

  render() {
    const container = this._container;
    const allPoints = this._pointsModel.getPointsAll();
    const filters = Object.values(FilterType).map((filterType) => {
      return {
        name: filterType,
        count: getPointsByFilter(allPoints, filterType).length,
        checked: filterType === this._activeFilterType,
      };
    });

    const oldComponent = this._filterComponent;

    this._filterComponent = new FiltersComponent(filters);
    this._filterComponent.setFilterChangeHandler(this._filterChangeHandler);

    if (oldComponent) {
      replace(this._filterComponent, oldComponent);
    } else {
      render(container, this._filterComponent, RenderPosition.AFTEREND);
    }
  }

  setDefaultView() {
    this._activeFilterType = FilterType.EVERYTHING;
    this._pointsModel.setFilter(this._activeFilterType);
    this.render();
  }

  _filterChangeHandler(filterType) {
    this._activeFilterType = filterType;
    this._pointsModel.setFilter(this._activeFilterType);
  }

  _dataChangeHandler() {
    this.render();
  }
}
