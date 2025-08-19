import mongoose, { Document, Schema } from 'mongoose';

export interface ISurfSpot extends Document {
  name: string;
  location: {
    lat: number;
    lng: number;
  };
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
  facilities: {
    parking: boolean;
    showers: boolean;
    toilets: boolean;
    rentals: boolean;
    shops: boolean;
  };
  travelInfo: {
    nearestAirport: string;
    transportation: string[];
    accommodation: string[];
    localTips: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

const SurfSpotSchema: Schema = new Schema({
  name: { type: String, required: true, trim: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  country: { type: String, required: true, trim: true },
  region: { type: String, required: true, trim: true },
  difficulty: { 
    type: String, 
    required: true, 
    enum: ['初级', '中级', '高级', '专业'] 
  },
  bestSeason: { type: String, required: true },
  waveType: { 
    type: String, 
    required: true, 
    enum: ['海滩浪', '礁石浪', '点浪', '河口浪'] 
  },
  description: { type: String, required: true },
  images: [{ type: String }],
  waveHeight: {
    min: { type: Number },
    max: { type: Number },
    unit: { type: String, enum: ['m', 'ft'], default: 'm' }
  },
  windDirection: [{ type: String }],
  tideConditions: { type: String },
  crowdLevel: { type: String, enum: ['低', '中', '高'] },
  facilities: {
    parking: { type: Boolean, default: false },
    showers: { type: Boolean, default: false },
    toilets: { type: Boolean, default: false },
    rentals: { type: Boolean, default: false },
    shops: { type: Boolean, default: false }
  },
  travelInfo: {
    nearestAirport: { type: String },
    transportation: [{ type: String }],
    accommodation: [{ type: String }],
    localTips: [{ type: String }]
  }
}, {
  timestamps: true
});

// 创建地理位置索引
SurfSpotSchema.index({ location: '2dsphere' });

export default mongoose.model<ISurfSpot>('SurfSpot', SurfSpotSchema);