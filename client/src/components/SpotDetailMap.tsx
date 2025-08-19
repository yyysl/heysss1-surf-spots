import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { SurfSpot } from '../types/SurfSpot';

// 导入 Leaflet CSS
import 'leaflet/dist/leaflet.css';

interface SpotDetailMapProps {
  spot: SurfSpot;
}

// 创建自定义红色标记图标
const createDetailIcon = () => {
  return L.divIcon({
    html: `
      <div class="flex items-center justify-center w-10 h-10 bg-red-500 rounded-full text-white font-bold text-lg shadow-lg ring-4 ring-red-200">
        🏄
      </div>
    `,
    className: 'custom-detail-marker',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20]
  });
};

const SpotDetailMap: React.FC<SpotDetailMapProps> = ({ spot }) => {
  return (
    <div className="h-32 rounded overflow-hidden shadow-md relative">
      <MapContainer
        center={[spot.location.lat, spot.location.lng]}
        zoom={14}
        className="w-full h-full"
        zoomControl={true}
        scrollWheelZoom={true}
      >
        {/* 使用卫星图层，更适合查看海岸线 */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />
        
        {/* 添加街道标签层 */}
        <TileLayer
          attribution=''
          url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
        />
        
        {/* 冲浪点标记 */}
        <Marker
          position={[spot.location.lat, spot.location.lng]}
          icon={createDetailIcon()}
        >
          <Popup closeButton={false} autoClose={false} closeOnClick={false}>
            <div className="p-3 min-w-[200px]">
              <h3 className="font-bold text-lg text-gray-800 mb-1">{spot.name}</h3>
              <p className="text-sm text-gray-600 mb-2">
                📍 {spot.region}, {spot.country}
              </p>
              <div className="flex flex-wrap gap-1">
                <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                  {spot.difficulty}
                </span>
                <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                  {spot.waveType}
                </span>
              </div>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
      
      {/* 地图信息标签 */}
      <div className="absolute bottom-1 left-1 bg-white bg-opacity-90 px-2 py-1 rounded text-xs text-gray-600 shadow">
        🛰️ 卫星视图
      </div>
    </div>
  );
};

export default SpotDetailMap;