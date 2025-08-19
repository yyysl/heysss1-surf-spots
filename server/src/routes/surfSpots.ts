import express from 'express';
import SurfSpot from '../models/SurfSpot';
import Joi from 'joi';

const router = express.Router();

// 验证模式
const surfSpotSchema = Joi.object({
  name: Joi.string().required().trim(),
  location: Joi.object({
    lat: Joi.number().min(-90).max(90).required(),
    lng: Joi.number().min(-180).max(180).required()
  }).required(),
  country: Joi.string().required().trim(),
  region: Joi.string().required().trim(),
  difficulty: Joi.string().valid('初级', '中级', '高级', '专业').required(),
  bestSeason: Joi.string().required(),
  waveType: Joi.string().valid('海滩浪', '礁石浪', '点浪', '河口浪').required(),
  description: Joi.string().required(),
  images: Joi.array().items(Joi.string().uri()),
  waveHeight: Joi.object({
    min: Joi.number().min(0),
    max: Joi.number().min(0),
    unit: Joi.string().valid('m', 'ft').default('m')
  }),
  windDirection: Joi.array().items(Joi.string()),
  tideConditions: Joi.string(),
  crowdLevel: Joi.string().valid('低', '中', '高'),
  facilities: Joi.object({
    parking: Joi.boolean().default(false),
    showers: Joi.boolean().default(false),
    toilets: Joi.boolean().default(false),
    rentals: Joi.boolean().default(false),
    shops: Joi.boolean().default(false)
  }),
  travelInfo: Joi.object({
    nearestAirport: Joi.string(),
    transportation: Joi.array().items(Joi.string()),
    accommodation: Joi.array().items(Joi.string()),
    localTips: Joi.array().items(Joi.string())
  })
});

// 获取所有冲浪点
router.get('/', async (req, res) => {
  try {
    const { country, difficulty, waveType, page = 1, limit = 20 } = req.query;
    
    const filter: any = {};
    if (country) filter.country = country;
    if (difficulty) filter.difficulty = difficulty;
    if (waveType) filter.waveType = waveType;

    const spots = await SurfSpot.find(filter)
      .limit(Number(limit) * 1)
      .skip((Number(page) - 1) * Number(limit))
      .sort({ createdAt: -1 });

    const total = await SurfSpot.countDocuments(filter);

    res.json({
      spots,
      totalPages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
      total
    });
  } catch (error) {
    res.status(500).json({ error: '获取冲浪点失败' });
  }
});

// 根据 ID 获取单个冲浪点
router.get('/:id', async (req, res) => {
  try {
    const spot = await SurfSpot.findById(req.params.id);
    if (!spot) {
      return res.status(404).json({ error: '冲浪点不存在' });
    }
    res.json(spot);
  } catch (error) {
    res.status(500).json({ error: '获取冲浪点详情失败' });
  }
});

// 创建新的冲浪点
router.post('/', async (req, res) => {
  try {
    const { error, value } = surfSpotSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const spot = new SurfSpot(value);
    await spot.save();
    res.status(201).json(spot);
  } catch (error) {
    res.status(500).json({ error: '创建冲浪点失败' });
  }
});

// 更新冲浪点
router.put('/:id', async (req, res) => {
  try {
    const { error, value } = surfSpotSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const spot = await SurfSpot.findByIdAndUpdate(
      req.params.id,
      value,
      { new: true, runValidators: true }
    );

    if (!spot) {
      return res.status(404).json({ error: '冲浪点不存在' });
    }

    res.json(spot);
  } catch (error) {
    res.status(500).json({ error: '更新冲浪点失败' });
  }
});

// 删除冲浪点
router.delete('/:id', async (req, res) => {
  try {
    const spot = await SurfSpot.findByIdAndDelete(req.params.id);
    if (!spot) {
      return res.status(404).json({ error: '冲浪点不存在' });
    }
    res.json({ message: '冲浪点删除成功' });
  } catch (error) {
    res.status(500).json({ error: '删除冲浪点失败' });
  }
});

// 根据地理位置搜索附近的冲浪点
router.get('/nearby/:lat/:lng', async (req, res) => {
  try {
    const { lat, lng } = req.params;
    const { maxDistance = 50000 } = req.query; // 默认 50km

    const spots = await SurfSpot.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [Number(lng), Number(lat)]
          },
          $maxDistance: Number(maxDistance)
        }
      }
    });

    res.json(spots);
  } catch (error) {
    res.status(500).json({ error: '搜索附近冲浪点失败' });
  }
});

export default router;