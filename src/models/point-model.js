import moment from 'moment';

export default class PointModel {
  constructor(data) {
    this.id = data[`id`];
    this.type = data[`type`];
    this.dateFrom = data[`date_from`] ? new Date(data[`date_from`]) : null;
    this.dateTo = data[`date_to`] ? new Date(data[`date_to`]) : null;
    this.destination = data[`destination`];
    this.basePrice = data[`base_price`];
    this.isFavorite = Boolean(data[`is_favorite`]);
    this.offers = data[`offers`] || [];
  }

  toRAW(data) {
    return {
      'id': data.id,
      'type': data.type,
      'date_from': moment.parseZone(data.dateFrom).utc().format(),
      'date_to': moment.parseZone(data.dateTo).utc().format(),
      'destination': data.destination,
      'offers': data.offers,
      'base_price': data.basePrice,
      'is_favorite': data.isFavorite,
    };
  }

  static clone(data) {
    return new PointModel(data.toRAW());
  }

  static parsePoint(data) {
    return new PointModel(data);
  }

  static parsePoints(data) {
    return data.map(PointModel.parsePoint);
  }
}
