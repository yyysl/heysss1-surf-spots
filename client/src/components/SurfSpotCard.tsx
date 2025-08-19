import React from 'react';
import { Link } from 'react-router-dom';
import { SurfSpot } from '../types/SurfSpot';

interface SurfSpotCardProps {
  spot: SurfSpot;
  isSelected?: boolean;
  onClick?: () => void;
}

const SurfSpotCard: React.FC<SurfSpotCardProps> = ({ spot, isSelected, onClick }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case '初级': return 'bg-green-100 text-green-800';
      case '中级': return 'bg-yellow-100 text-yellow-800';
      case '高级': return 'bg-orange-100 text-orange-800';
      case '专业': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div 
      className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer border-2 ${
        isSelected ? 'border-blue-500' : 'border-transparent'
      }`}
      onClick={onClick}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold text-gray-800">{spot.name}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(spot.difficulty)}`}>
            {spot.difficulty}
          </span>
        </div>
        
        <div className="space-y-2 text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <span className="mr-2">📍</span>
            <span>{spot.region}, {spot.country}</span>
          </div>
          <div className="flex items-center">
            <span className="mr-2">🌊</span>
            <span>{spot.waveType}</span>
          </div>
          <div className="flex items-center">
            <span className="mr-2">📅</span>
            <span>最佳季节: {spot.bestSeason}</span>
          </div>
        </div>
        
        <p className="text-gray-700 text-sm mb-4 line-clamp-2">
          {spot.description}
        </p>
        
        <div className="flex justify-between items-center">
          <Link 
            to={`/spot/${spot.id}`}
            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
          >
            查看详情 →
          </Link>
          <div className="flex space-x-1">
            <span className="text-xs text-gray-400">🏄‍♂️</span>
            <span className="text-xs text-gray-400">📸</span>
            <span className="text-xs text-gray-400">🗺️</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurfSpotCard;