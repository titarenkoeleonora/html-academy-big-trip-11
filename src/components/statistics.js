import AbstractSmartComponent from "./abstract-smart-component";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';

import moment from 'moment';
import {ChartDataIcons} from "../constants";

const ChartConfiguration = {
  BAR_HEIGHT: 55,
  CHART_PADDING_LEFT: 50,
  FONT_SIZE: 13,
  TITLE_FONT_SIZE: 23,
  SCALE_Y_AXES_TICKS_PADDING: 5,
  BAR_THICKNESS: 44,
  MIN_BAR_LENGTH: 50,
};

export const EVENT_TYPES_TO = [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`];

const getUniqueItems = (item, index, array) => array.indexOf(item) === index;

const getUniquePoints = (points) => points.map((point) => point.type).filter(getUniqueItems);

const calculateMoneyByType = (points, type) => {
  return points.reduce((total, point) => (point.type === type) ? total + point.basePrice : total, 0);
};

const calculatePointsByTransport = (points, type) => points.filter((point) => point.type === type).length;

const getTimeDifference = (point) => {
  const startTime = moment(point.dateFrom);
  const endTime = moment(point.dateTo);

  return endTime.diff(startTime, `hours`);
};

const calculateTimeSpent = (points, type) => {
  return points.reduce((total, point) => (point.type === type) ? total + getTimeDifference(point) : total, 0);
};

const getChart = (title, pointTypes, data, formatter, chartCtx) => {
  chartCtx.height = ChartConfiguration.BAR_HEIGHT * pointTypes.length;

  return {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: pointTypes.map((item) => ChartDataIcons[item]),
      datasets: [{
        data,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`,
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: ChartConfiguration.FONT_SIZE,
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter,
        }
      },
      title: {
        display: true,
        text: title,
        fontColor: `#000000`,
        fontSize: ChartConfiguration.TITLE_FONT_SIZE,
        position: `left`,
        padding: ChartConfiguration.CHART_PADDING_LEFT,
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: ChartConfiguration.SCALE_Y_AXES_TICKS_PADDING,
            fontSize: ChartConfiguration.FONT_SIZE,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: ChartConfiguration.BAR_THICKNESS,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          minBarLength: ChartConfiguration.MIN_BAR_LENGTH,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      }
    }
  };
};

const renderMoneyChart = (chartCtx, points) => {
  const pointTypes = getUniquePoints(points);
  const data = pointTypes.map((type) => calculateMoneyByType(points, type));
  const formatter = (val) => `€ ${val}`;

  return new Chart(chartCtx, getChart(`MONEY`, pointTypes, data, formatter, chartCtx));
};

const renderTransportChart = (chartCtx, points) => {
  const pointTypes = getUniquePoints(points).filter((type) => EVENT_TYPES_TO.includes(type));
  const data = pointTypes.map((type) => calculatePointsByTransport(points, type));
  const formatter = (val) => `${val}x`;

  return new Chart(chartCtx, getChart(`TRANSPORT`, pointTypes, data, formatter, chartCtx));
};

const renderTimeSpendChart = (chartCtx, points) => {
  const pointTypes = getUniquePoints(points);
  const data = pointTypes.map((type) => calculateTimeSpent(points, type));
  const formatter = (val) => `${val}H`;


  return new Chart(chartCtx, getChart(`TIME SPEND`, pointTypes, data, formatter, chartCtx));
};

const createStatistics = () => {
  return (
    `<section class="statistics">
      <h2 class="visually-hidden">Trip statistics</h2>
      <div class="statistics__item statistics__item--money">
        <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
      </div>
      <div class="statistics__item statistics__item--transport">
        <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
      </div>
      <div class="statistics__item statistics__item--time-spend">
        <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
      </div>
    </section>`
  );
};

export default class Statistics extends AbstractSmartComponent {
  constructor(pointsModel) {
    super();

    this._points = pointsModel;

    this._moneyChart = null;
    this._transportChart = null;
    this._timeSpendChart = null;

    this._renderCharts();
  }

  getTemplate() {
    return createStatistics();
  }

  show() {
    super.show();

    this.rerender(this._points);
  }

  recoveryListeners() {}

  rerender(points) {
    this._points = points;

    super.rerender();

    this._renderCharts();
  }

  _renderCharts() {
    const element = this.getElement();
    const points = this._points.getPoints();

    const moneyCtx = element.querySelector(`.statistics__chart--money`);
    const transportCtx = element.querySelector(`.statistics__chart--transport`);
    const timeSpendCtx = element.querySelector(`.statistics__chart--time`);

    this._resetCharts();

    this._moneyChart = renderMoneyChart(moneyCtx, points);
    this._transportChart = renderTransportChart(transportCtx, points);
    this._timeSpendChart = renderTimeSpendChart(timeSpendCtx, points);
  }

  _resetCharts() {
    if (this._moneyChart) {
      this._moneyChart.destroy();
      this._moneyChart = null;
    }

    if (this._transportChart) {
      this._transportChart.destroy();
      this._transportChart = null;
    }

    if (this._timeSpendChart) {
      this._timeSpendChart.destroy();
      this._timeSpendChart = null;
    }
  }
}
