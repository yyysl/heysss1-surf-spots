import React, { useState, useEffect } from 'react';
import SurfSpotMap from '../components/SurfSpotMap';
import SurfSpotCard from '../components/SurfSpotCard';

import { SurfSpot } from '../types/SurfSpot';

const HomePage: React.FC = () => {
  const [surfSpots, setSurfSpots] = useState<SurfSpot[]>([]);
  const [selectedSpot, setSelectedSpot] = useState<SurfSpot | null>(null);

  useEffect(() => {
    // 模拟数据，后续会从 API 获取
    const mockSpots: SurfSpot[] = [
      {
        id: '1',
        name: '金山海滩',
        location: { lat: 37.4419, lng: -122.4194 },
        country: '美国',
        region: '加利福尼亚',
        difficulty: '中级',
        bestSeason: '秋季-冬季',
        waveType: '海滩浪',
        description: '旧金山附近的经典冲浪点，以其一致的海滩浪和相对温和的条件而闻名。',
        images: [
          'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
          'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800',
          'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800'
        ],
        waveHeight: { min: 1, max: 3, unit: 'm' },
        windDirection: ['西北风', '西风'],
        tideConditions: '中低潮最佳，涨潮时浪型更好',
        crowdLevel: '中',
        suitableBoards: ['长板 (9-10英尺)', '中长板 (7-8英尺)', '短板 (6-7英尺)'],
        surferLevel: {
          beginner: true,
          intermediate: true,
          advanced: false,
          expert: false
        },
        waveSeasons: [
          {
            season: '秋季',
            months: '9-11月',
            waveHeight: '1.5-2.5米',
            conditions: '最佳季节，风浪稳定，水温适中'
          },
          {
            season: '冬季',
            months: '12-2月',
            waveHeight: '2-3米',
            conditions: '浪大但水温较低，需要厚潜水衣'
          },
          {
            season: '春季',
            months: '3-5月',
            waveHeight: '1-2米',
            conditions: '浪较小，适合初学者练习'
          }
        ],
        facilities: {
          parking: true,
          showers: true,
          toilets: true,
          rentals: true,
          shops: true,
          restaurants: true
        },
        transportation: {
          accessibility: '便利',
          nearestAirport: '旧金山国际机场 (SFO)',
          drivingTime: '45分钟车程',
          publicTransport: true,
          parkingInfo: '海滩附近有免费停车场，周末较拥挤',
          methods: ['自驾', '公交车', 'Uber/Lyft']
        },
        travelInfo: {
          accommodation: ['旧金山市区酒店', '金山附近民宿', '海滨度假村'],
          localTips: [
            '建议穿着3/2mm潜水衣，水温较低',
            '注意海流变化，不要独自下水',
            '最佳冲浪时间是早上6-9点，人少浪好',
            '附近有很多海鲜餐厅，推荐尝试当地螃蟹'
          ],
          bestTimeToVisit: '9月-11月，天气晴朗，浪况稳定',
          weatherInfo: '地中海气候，夏季干燥，冬季多雨，全年可冲浪'
        }
      },
      {
        id: '2',
        name: '巴厘岛乌鲁瓦图',
        location: { lat: -8.8290, lng: 115.0920 },
        country: '印度尼西亚',
        region: '巴厘岛',
        difficulty: '高级',
        bestSeason: '干季 (4-10月)',
        waveType: '礁石浪',
        description: '世界级的管浪冲浪点，以其完美的左手浪和壮观的悬崖景色而闻名全球。',
        images: [
          'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800',
          'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
          'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=800'
        ],
        waveHeight: { min: 2, max: 6, unit: 'm' },
        windDirection: ['东南风', '东风'],
        tideConditions: '中低潮最佳，高潮时过浅危险',
        crowdLevel: '高',
        suitableBoards: ['短板 (5.8-6.4英尺)', '枪板 (6.6-7.2英尺)', '半枪板 (6.2-6.8英尺)'],
        surferLevel: {
          beginner: false,
          intermediate: false,
          advanced: true,
          expert: true
        },
        waveSeasons: [
          {
            season: '干季',
            months: '4-10月',
            waveHeight: '3-5米',
            conditions: '最佳季节，东南信风稳定，浪型完美'
          },
          {
            season: '雨季',
            months: '11-3月',
            waveHeight: '2-4米',
            conditions: '风向不稳定，但人少，适合有经验的冲浪者'
          }
        ],
        facilities: {
          parking: true,
          showers: false,
          toilets: true,
          rentals: true,
          shops: true,
          restaurants: true
        },
        transportation: {
          accessibility: '一般',
          nearestAirport: '伍拉·赖国际机场 (DPS)',
          drivingTime: '1小时车程',
          publicTransport: false,
          parkingInfo: '悬崖顶部有付费停车场，需要步行下到海滩',
          methods: ['租摩托车', '包车', '出租车']
        },
        travelInfo: {
          accommodation: ['乌鲁瓦图悬崖度假村', '库塔海滩酒店', '金巴兰湾度假村'],
          localTips: [
            '必须穿冲浪靴，礁石锋利容易受伤',
            '注意潮汐时间，高潮时非常危险',
            '建议雇佣当地向导，了解海底地形',
            '日落时分在悬崖上观浪是绝佳体验',
            '附近的乌鲁瓦图寺庙值得参观',
            '当地warung(小餐厅)的印尼菜很正宗'
          ],
          bestTimeToVisit: '5月-9月，干季中期，风浪最稳定',
          weatherInfo: '热带气候，全年温暖，干季少雨，雨季多阵雨'
        }
      }
    ];
    setSurfSpots(mockSpots);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          发现世界最佳冲浪点
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          探索全球顶级冲浪目的地，获取详细的浪季信息和完整的出行规划
        </p>
      </div>



      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">浪点地图</h2>
          <SurfSpotMap 
            spots={surfSpots} 
            onSpotSelect={setSelectedSpot}
            selectedSpot={selectedSpot}
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">热门浪点</h2>
          {surfSpots.map(spot => (
            <SurfSpotCard 
              key={spot.id} 
              spot={spot}
              isSelected={selectedSpot?.id === spot.id}
              onClick={() => setSelectedSpot(spot)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;