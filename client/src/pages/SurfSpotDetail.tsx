import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SurfSpot } from '../types/SurfSpot';
import SpotDetailMap from '../components/SpotDetailMap';

const SurfSpotDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [spot, setSpot] = useState<SurfSpot | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    // 模拟 API 调用，使用与首页相同的丰富数据
    const fetchSpot = async () => {
      setLoading(true);
      
      const mockSpots: { [key: string]: SurfSpot } = {
        '1': {
          id: '1',
          name: '金山海滩',
          location: { lat: 37.4419, lng: -122.4194 },
          country: '美国',
          region: '加利福尼亚',
          difficulty: '中级',
          bestSeason: '秋季-冬季',
          waveType: '海滩浪',
          description: '旧金山附近的经典冲浪点，以其一致的海滩浪和相对温和的条件而闻名。这里是学习冲浪的理想场所，也是经验丰富的冲浪者享受长板冲浪的绝佳地点。',
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
        '2': {
          id: '2',
          name: '巴厘岛乌鲁瓦图',
          location: { lat: -8.8290, lng: 115.0920 },
          country: '印度尼西亚',
          region: '巴厘岛',
          difficulty: '高级',
          bestSeason: '干季 (4-10月)',
          waveType: '礁石浪',
          description: '世界级的管浪冲浪点，以其完美的左手浪和壮观的悬崖景色而闻名全球。这里是专业冲浪者的朝圣地，拥有令人惊叹的管浪和挑战性的礁石地形。',
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
      };
      
      const selectedSpot = mockSpots[id || '1'];
      setSpot(selectedSpot);
      setLoading(false);
    };

    fetchSpot();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  if (!spot) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">冲浪点不存在</h1>
          <Link to="/" className="text-blue-600 hover:text-blue-800 mt-4 inline-block">
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  const getSurferLevelText = () => {
    const levels = [];
    if (spot.surferLevel.beginner) levels.push('初学者');
    if (spot.surferLevel.intermediate) levels.push('中级');
    if (spot.surferLevel.advanced) levels.push('高级');
    if (spot.surferLevel.expert) levels.push('专业');
    return levels.join('、');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 返回按钮 */}
      <div className="container mx-auto px-4 py-4">
        <Link 
          to="/" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
        >
          ← 返回首页
        </Link>
      </div>

      {/* 头部图片轮播 */}
      <div className="relative h-96 overflow-hidden">
        <img 
          src={spot.images[activeImageIndex]} 
          alt={spot.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-2">{spot.name}</h1>
            <p className="text-2xl">{spot.region}, {spot.country}</p>
            <div className="flex justify-center mt-4 space-x-2">
              <span className="bg-blue-600 px-3 py-1 rounded-full text-sm">{spot.difficulty}</span>
              <span className="bg-green-600 px-3 py-1 rounded-full text-sm">{spot.waveType}</span>
            </div>
          </div>
        </div>
        
        {/* 图片导航 */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {spot.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveImageIndex(index)}
              className={`w-3 h-3 rounded-full ${
                index === activeImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 主要内容 */}
          <div className="lg:col-span-2 space-y-8">
            {/* 浪点介绍 */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">浪点介绍</h2>
              <p className="text-gray-700 leading-relaxed text-lg">{spot.description}</p>
            </section>

            {/* 浪季信息 */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">浪季信息</h2>
              <div className="grid gap-4">
                {spot.waveSeasons.map((season, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">{season.season}</h3>
                      <span className="text-sm text-gray-600">{season.months}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">浪高: </span>
                        <span className="text-gray-600">{season.waveHeight}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">条件: </span>
                        <span className="text-gray-600">{season.conditions}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 适合的冲浪板 */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">推荐冲浪板</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {spot.suitableBoards.map((board, index) => (
                  <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
                    <span className="text-blue-800 font-medium">{board}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* 交通信息 */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">交通信息</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">基本信息</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">便利程度:</span>
                      <span className={`font-medium ${
                        spot.transportation.accessibility === '便利' ? 'text-green-600' :
                        spot.transportation.accessibility === '一般' ? 'text-yellow-600' : 'text-red-600'
                      }`}>{spot.transportation.accessibility}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">最近机场:</span>
                      <span className="font-medium">{spot.transportation.nearestAirport}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">车程时间:</span>
                      <span className="font-medium">{spot.transportation.drivingTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">公共交通:</span>
                      <span className={`font-medium ${spot.transportation.publicTransport ? 'text-green-600' : 'text-red-600'}`}>
                        {spot.transportation.publicTransport ? '有' : '无'}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">交通方式</h3>
                  <div className="flex flex-wrap gap-2">
                    {spot.transportation.methods.map((method, index) => (
                      <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                        {method}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4">
                    <h4 className="font-medium text-gray-700 mb-1">停车信息</h4>
                    <p className="text-sm text-gray-600">{spot.transportation.parkingInfo}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 当地小贴士 */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">当地小贴士</h2>
              <div className="grid gap-3">
                {spot.travelInfo.localTips.map((tip, index) => (
                  <div key={index} className="flex items-start bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <span className="text-yellow-600 mr-3 mt-0.5">💡</span>
                    <span className="text-gray-700">{tip}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* 侧边栏 */}
          <div className="space-y-6">
            {/* 基本信息 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800">基本信息</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">难度等级:</span>
                  <span className="font-medium">{spot.difficulty}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">浪型:</span>
                  <span className="font-medium">{spot.waveType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">浪高范围:</span>
                  <span className="font-medium">{spot.waveHeight.min}-{spot.waveHeight.max}{spot.waveHeight.unit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">人群密度:</span>
                  <span className="font-medium">{spot.crowdLevel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">适合水平:</span>
                  <span className="font-medium">{getSurferLevelText()}</span>
                </div>
              </div>
            </div>

            {/* 地图位置 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800">地图位置</h3>
              <SpotDetailMap spot={spot} />
              <p className="text-sm text-gray-600 mt-3">
                📍 纬度: {spot.location.lat}<br/>
                📍 经度: {spot.location.lng}
              </p>
            </div>

            {/* 设施服务 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800">设施服务</h3>
              <div className="space-y-2 text-sm">
                {Object.entries(spot.facilities).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-gray-600">
                      {key === 'parking' && '🅿️ 停车场'}
                      {key === 'showers' && '🚿 淋浴'}
                      {key === 'toilets' && '🚻 洗手间'}
                      {key === 'rentals' && '🏄 装备租赁'}
                      {key === 'shops' && '🏪 商店'}
                      {key === 'restaurants' && '🍽️ 餐厅'}
                    </span>
                    <span className={`font-medium ${value ? 'text-green-600' : 'text-red-600'}`}>
                      {value ? '✓' : '✗'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 住宿推荐 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800">住宿推荐</h3>
              <ul className="space-y-2 text-sm">
                {spot.travelInfo.accommodation.map((acc, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-600 mr-2 mt-1">🏨</span>
                    <span className="text-gray-700">{acc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 最佳访问时间 */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-bold text-green-800 mb-2">最佳访问时间</h3>
              <p className="text-sm text-green-700">{spot.travelInfo.bestTimeToVisit}</p>
              <div className="mt-3">
                <h4 className="font-medium text-green-800 mb-1">天气信息</h4>
                <p className="text-sm text-green-700">{spot.travelInfo.weatherInfo}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurfSpotDetail;