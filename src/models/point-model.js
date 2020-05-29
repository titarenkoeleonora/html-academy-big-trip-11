import moment from 'moment';

export default class PointModel {
  constructor(point) {
    this.id = point[`id`];
    this.type = point[`type`];
    this.dateFrom = point[`date_from`] ? new Date(point[`date_from`]) : null;
    this.dateTo = point[`date_to`] ? new Date(point[`date_to`]) : null;
    this.destination = point[`destination`];
    this.basePrice = point[`base_price`];
    this.isFavorite = Boolean(point[`is_favorite`]);
    this.checkedOffers = point[`offers`] || [];
  }

  toRAW(point) {
    return {
      'id': point.id,
      'type': point.type,
      'date_from': moment.parseZone(point.dateFrom).utc().format(),
      'date_to': moment.parseZone(point.dateTo).utc().format(),
      'destination': point.destination,
      'offers': point.checkedOffers,
      'base_price': point.basePrice,
      'is_favorite': point.isFavorite,
    };
  }

  static parsePoint(point) {
    return new PointModel(point);
  }

  static parsePoints(points) {
    return points.map(PointModel.parsePoint);
  }
}
