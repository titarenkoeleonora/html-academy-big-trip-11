import PointModel from "./models/point-model";

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
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
      url: `https://11.ecmascript.pages.academy/big-trip/points`
    })
      .then((response) => response.json())
      .then(PointModel.parsePoints);
  }

  getDestinations() {
    return this._loadData({
      url: `https://11.ecmascript.pages.academy/big-trip/destinations`
    })
      .then((response) => response.json());
  }

  getOffers() {
    return this._loadData({
      url: `https://11.ecmascript.pages.academy/big-trip/offers`
    })
      .then((response) => response.json());
  }

  updatePoint(id, data) {
    return this._loadData({
      url: `https://11.ecmascript.pages.academy/big-trip/points/${id}`,
      method: `PUT`,
      body: JSON.stringify(data),
    })
    .then(checkStatus)
    .then((response) => response.json())
    .then(PointModel.parsePoint);
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
