const MONTHS = [`JAN`, `FEB`, `MAR`, `APR`, `MAY`, `JUN`, `JUL`, `AUG`, `SEP`, `OCT`, `NOV`, `DEC`];
const MAX_SHOWED_OFFERS_COUNT = 3;

const Key = {
  ESCAPE: `Escape`,
};

const Time = {
  MS_IN_DAY: 86400000,
  MS_IN_HOUR: 3600000,
  MS_IN_MINUTE: 60000,
  MINUTES_IN_DAY: 1440,
  HOURS_IN_DAY: 24,
  MINUTES_IN_HOUR: 60,
};

const descriptionsCount = {
  MIN: 1,
  MAX: 3,
};

const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`,
};

const TypeRoutePointIndex = {
  MIN_ACTIONS_INDEX: 0,
  MAX_ACTIONS_INDEX: 7,
  MAX_ACTIVITY_INDEX: 10,
};

const typeRoutePointMap = {
  'taxi': `Taxi to`,
  'bus': `Bus to`,
  'train': `Train to`,
  'ship': `Ship to`,
  'transport': `Transport to`,
  'drive': `Drive to`,
  'flight': `Flight to`,
  'check-in': `Check-in in`,
  'sightseeing': `Sightseeing in`,
  'restaurant': `Restaurant in`,
};

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
  ADDING: `adding`,
};

const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`,
};

const ChartDataIcons = {
  'taxi': `🚕 TAXI`,
  'bus': `🚌 BUS`,
  'train': `🚂 TRAIN`,
  'ship': `🛳 SHIP`,
  'transport': `🚊 TRANSPORT`,
  'drive': `🚗 DRIVE`,
  'flight': `✈️ FLIGHT`,
  'check-in': `🏨 CHECK-IN`,
  'sightseeing': `🏛 SIGHTSEEING`,
  'restaurant': `🍴 RESTAURANT`,
};

export {Key, Time, MONTHS, MAX_SHOWED_OFFERS_COUNT, descriptionsCount, RenderPosition, TypeRoutePointIndex, typeRoutePointMap, Mode, FilterType, ChartDataIcons};
