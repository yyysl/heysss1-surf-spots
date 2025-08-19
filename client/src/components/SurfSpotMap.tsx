import React, { useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { SurfSpot } from '../types/SurfSpot';

// 导入 Leaflet CSS
import 'leaflet/dist/leaflet.css';

// 修复 Leaflet 默认图标问题
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

interface SurfSpotMapProps {
  spots: SurfSpot[];
  onSpotSelect: (spot: SurfSpot) => void;
  selectedSpot: SurfSpot | null;
}

// 自定义标记图标
const createCustomIcon = (isSelected: boolean) => {
  return L.divIcon({
    html: `
      <div class="flex items-center justify-center w-8 h-8 rounded-full text-white font-bold text-sm transition-all transform hover:scale-110 ${
        isSelected 
          ? 'bg-red-500 ring-4 ring-red-200 scale-110' 
          : 'bg-blue-500 hover:bg-blue-600'
      }" style="box-shadow: 0 2px 8px rgba(0,0,0,0.3);">
        🏄
      </div>
    `,
    className: 'custom-surf-marker',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  });
};

// 地图边界调整组件
const MapBounds: React.FC<{ spots: SurfSpot[] }> = ({ spots }) => {
  const map = useMap();
  
  React.useEffect(() => {
    if (spots.length > 0) {
      const bounds = L.latLngBounds(
        spots.map(spot => [spot.location.lat, spot.location.lng])
      );
      map.fitBounds(bounds, { padding: [20, 20] });
    }
  }, [spots, map]);
  
  return null;
};

const SurfSpotMap: React.FC<SurfSpotMapProps> = ({ spots, onSpotSelect, selectedSpot }) => {
  // 计算地图中心点
  const center = useMemo(() => {
    if (spots.length === 0) return [20, 0]; // 默认中心点
    
    const avgLat = spots.reduce((sum, spot) => sum + spot.location.lat, 0) / spots.length;
    const avgLng = spots.reduce((sum, spot) => sum + spot.location.lng, 0) / spots.length;
    
    return [avgLat, avgLng];
  }, [spots]);

  return (
    <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg relative">
      <MapContainer
        center={center as [number, number]}
        zoom={2}
        className="w-full h-full"
        zoomControl={true}
        scrollWheelZoom={true}
      >
        {/* OpenStreetMap 瓦片层 */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* 自动调整地图边界 */}
        <MapBounds spots={spots} />
        
        {/* 冲浪点标记 */}
        {spots.map((spot) => (
          <Marker
            key={spot.id}
            position={[spot.location.lat, spot.location.lng]}
            icon={createCustomIcon(selectedSpot?.id === spot.id)}
            eventHandlers={{
              click: () => onSpotSelect(spot)
            }}
          >
            <Popup>
              <div className="p-2 min-w-[200px]">
                <h3 className="font-bold text-lg text-gray-800 mb-1">{spot.name}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  📍 {spot.region}, {spot.country}
                </p>
                <div className="flex flex-wrap gap-1 mb-2">
                  <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                    {spot.difficulty}
                  </span>
                  <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                    {spot.waveType}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-2">
                  🌊 最佳季节: {spot.bestSeason}
                </p>
                <button
                  onClick={() => onSpotSelect(spot)}
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                >
                  查看详情 →
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      {/* 地图信息标签 */}
      <div className="absolute bottom-2 left-2 bg-white bg-opacity-90 px-2 py-1 rounded text-xs text-gray-600 shadow">
        🗺️ OpenStreetMap - 完全免费
      </div>
    </div>
  );
};

export default SurfSpotMap;