import PointModel from "./models/point-model";

const StatusCode = {
  SUCCESS: 200,
  REDIRECT: 300,
};

const checkStatus = (response) => {
  if (response.status >= StatusCode.SUCCESS && response.status < StatusCode.REDIRECT) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const API = class {
  constructor(authorization) {
    this._authorization = authorization;
  }

  getPoints() {
    return this._loadData({
      url: `https://13.ecmascript.pages.academy/big-trip/points`
    })
      .then((response) => response.json())
      .then(PointModel.parsePoints);
  }

  getDestinations() {
    return this._loadData({
      url: `https://13.ecmascript.pages.academy/big-trip/destinations`
    })
      .then((response) => response.json());
  }

  getOffers() {
    return this._loadData({
      url: `https://13.ecmascript.pages.academy/big-trip/offers`
    })
      .then((response) => response.json());
  }

  getData() {
    return Promise.all([
      this.getPoints(),
      this.getDestinations(),
      this.getOffers(),
    ]).then((responce) => {
      const [events, destinations, offers] = responce;
      return {
        events,
        destinations,
        offers
      };
    });
  }

  updatePoint(id, data) {
    return this._loadData({
      url: `https://13.ecmascript.pages.academy/big-trip/points/${id}`,
      method: `PUT`,
      body: JSON.stringify(data),
    })
    .then(checkStatus)
    .then((response) => response.json())
    .then(PointModel.parsePoint);
  }

  createPoint(point) {
    return this._loadData({
      url: `https://13.ecmascript.pages.academy/big-trip/points`,
      method: `POST`,
      body: JSON.stringify(point),
    })
      .then((response) => response.json())
      .then(PointModel.parsePoint);
  }

  deletePoint(id) {
    return this._loadData({
      url: `https://13.ecmascript.pages.academy/big-trip/points/${id}`,
      method: `DELETE`
    });
  }

  _loadData({url, method = `GET`, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);
    headers.append(`Content-Type`, `application/json`);

    return fetch(url, {method, body, headers})
      .then(checkStatus)
      .catch((error) => {
        throw error;
      });
  }
};

export default API;
