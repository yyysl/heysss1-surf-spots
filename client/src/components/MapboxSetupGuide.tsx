import React, { useState } from 'react';

const OpenStreetMapInfo: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-green-600 text-xl mr-2">🗺️</span>
          <h3 className="text-lg font-semibold text-green-800">
            使用 OpenStreetMap - 完全免费！
          </h3>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-green-600 hover:text-green-800 font-medium"
        >
          {isExpanded ? '收起' : '了解更多'}
        </button>
      </div>
      
      {isExpanded && (
        <div className="mt-4 space-y-4">
          <p className="text-green-700">
            你的冲浪点网站现在使用 OpenStreetMap，这是一个完全免费的开源地图服务：
          </p>
          
          <div className="bg-white rounded-lg p-4 space-y-3">
            <div className="flex items-start">
              <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">✓</span>
              <div>
                <p className="font-medium">完全免费</p>
                <p className="text-sm text-gray-600">
                  无需 API 密钥，无使用限制，无需绑定信用卡
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">✓</span>
              <div>
                <p className="font-medium">开源数据</p>
                <p className="text-sm text-gray-600">
                  由全球志愿者贡献和维护，被称为"地图界的维基百科"
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">✓</span>
              <div>
                <p className="font-medium">全球覆盖</p>
                <p className="text-sm text-gray-600">
                  世界各地的详细地图数据，在很多地区比商业地图更详细
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">✓</span>
              <div>
                <p className="font-medium">隐私友好</p>
                <p className="text-sm text-gray-600">
                  不追踪用户数据，保护用户隐私
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded p-3">
            <p className="text-blue-800 text-sm">
              <strong>🌟 当前功能：</strong> 
              交互式地图、自定义标记、弹出框信息、卫星视图、自动边界调整
            </p>
          </div>
          
          <div className="text-center">
            <a 
              href="https://www.openstreetmap.org/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-green-600 hover:text-green-800 font-medium text-sm"
            >
              了解更多关于 OpenStreetMap →
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default OpenStreetMapInfo;