export interface Location {
  lat: number;
  lng: number;
}

export interface SurfSpot {
  id: string;
  name: string;
  location: Location;
  country: string;
  region: string;
  difficulty: '初级' | '中级' | '高级' | '专业';
  bestSeason: string;
  waveType: '海滩浪' | '礁石浪' | '点浪' | '河口浪';
  description: string;
  images: string[];
  waveHeight: {
    min: number;
    max: number;
    unit: 'm' | 'ft';
  };
  windDirection: string[];
  tideConditions: string;
  crowdLevel: '低' | '中' | '高';
  suitableBoards: string[];
  surferLevel: {
    beginner: boolean;
    intermediate: boolean;
    advanced: boolean;
    expert: boolean;
  };
  waveSeasons: {
    season: string;
    months: string;
    waveHeight: string;
    conditions: string;
  }[];
  facilities: {
    parking: boolean;
    showers: boolean;
    toilets: boolean;
    rentals: boolean;
    shops: boolean;
    restaurants: boolean;
  };
  transportation: {
    accessibility: '便利' | '一般' | '困难';
    nearestAirport: string;
    drivingTime: string;
    publicTransport: boolean;
    parkingInfo: string;
    methods: string[];
  };
  travelInfo: {
    accommodation: string[];
    localTips: string[];
    bestTimeToVisit: string;
    weatherInfo: string;
  };
}