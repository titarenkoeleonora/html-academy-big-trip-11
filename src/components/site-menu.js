import AbstractComponent from "./abstract-component";

const createSiteMenuTemplate = () => {
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
      <a class="trip-tabs__btn" href="#">Stats</a>
    </nav>`
  );
};

export default class SiteMenuComponent extends AbstractComponent {
  getTemplate() {
    return createSiteMenuTemplate();
  }
}
