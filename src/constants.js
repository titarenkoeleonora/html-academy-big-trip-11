export const Key = {
  ESCAPE: `Escape`,
};

export const CITIES = [`Amsterdam`, `New-York`, `Geneva`, `Moscow`, `Paris`, `Saint Petersburg`, `Frankfurt`, `Mainz`, `Abu-Dhabi`, `Dubai`];

export const Time = {
  MS_IN_DAY: 86400000,
  MS_IN_HOUR: 3600000,
  MS_IN_MINUTE: 60000,
  MINUTES_IN_DAY: 1440,
  HOURS_IN_DAY: 24,
  MINUTES_IN_HOUR: 60,
};

export const MONTHS = [`JAN`, `FEB`, `MAR`, `APR`, `MAY`, `JUN`, `JUL`, `AUG`, `SEP`, `OCT`, `NOV`, `DEC`];

export const MAX_SHOWED_OFFERS_COUNT = 3;

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`,
};

export const TypeRoutePointIndex = {
  MIN_ACTIONS_INDEX: 0,
  MAX_ACTIONS_INDEX: 7,
  MAX_ACTIVITY_INDEX: 10,
};

export const TripDescriptions = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`,
];

export const typeRoutePointMap = {
  'Taxi': `to`,
  'Bus': `to`,
  'Train': `to`,
  'Ship': `to`,
  'Transport': `to`,
  'Drive': `to`,
  'Flight': `to`,
  'Check-in': `in`,
  'Sightseeing': `in`,
  'Restaurant': `in`,
};

export const tripOffers = {
  'bus': [
    {
      title: `Infotainment system`,
      price: 50
    },
    {
      title: `Order meal`,
      price: 100
    },
    {
      title: `Choose seats`,
      price: 190
    }
  ],
  'check-in': [
    {
      title: `Choose the time of check-in`,
      price: 70
    },
    {
      title: `Choose the time of check-out`,
      price: 190
    },
    {
      title: `Add breakfast`,
      price: 110
    },
    {
      title: `Laundry`,
      price: 140
    },
    {
      title: `Order a meal from the restaurant`,
      price: 30
    }
  ],
  'drive': [
    {
      title: `Choose comfort class`,
      price: 110
    },
    {
      title: `Choose business class`,
      price: 180
    }
  ],
  'flight': [
    {
      title: `Choose meal`,
      price: 120
    },
    {
      title: `Choose seats`,
      price: 90
    },
    {
      title: `Upgrade to comfort class`,
      price: 120
    },
    {
      title: `Upgrade to business class`,
      price: 120
    },
    {
      title: `Add luggage`,
      price: 170
    },
    {
      title: `Business lounge`,
      price: 160
    }
  ],
  'restaurant': [
    {
      title: `Choose live music`,
      price: 150
    },
    {
      title: `Choose VIP area`,
      price: 70
    }
  ],
  'ship': [
    {
      title: `Choose meal`,
      price: 130
    },
    {
      title: `Choose seats`,
      price: 160
    },
    {
      title: `Upgrade to comfort class`,
      price: 170
    },
    {
      title: `Upgrade to business class`,
      price: 150
    },
    {
      title: `Add luggage`,
      price: 100
    },
    {
      title: `Business lounge`,
      price: 40
    }
  ],
  'sightseeing': [
    {
      title: `Book a taxi at the arrival point`,
      price: 110
    },
    {
      title: `Order a breakfast`,
      price: 80
    },
    {
      title: `Wake up at a certain time`,
      price: 140
    }
  ],
  'taxi': [
    {
      title: `Upgrade to a business class`,
      price: 190
    },
    {
      title: `Choose the radio station`,
      price: 30
    },
    {
      title: `Choose temperature`,
      price: 170
    },
    {
      title: `Drive quickly, I'm in a hurry`,
      price: 100
    },
    {
      title: `Drive slowly`,
      price: 110
    }
  ],
  'train': [
    {
      title: `Book a taxi at the arrival point`,
      price: 110
    },
    {
      title: `Order a breakfast`,
      price: 80
    },
    {
      title: `Wake up at a certain time`,
      price: 140
    }
  ],
  'transport': [
    {
      title: `Book a taxi at the arrival point`,
      price: 110
    },
    {
      title: `Order a breakfast`,
      price: 80
    },
    {
      title: `Wake up at a certain time`,
      price: 140
    }
  ],
};

export const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
  ADDING: `adding`,
};

export const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`,
};
