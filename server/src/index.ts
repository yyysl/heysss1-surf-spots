import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import surfSpotRoutes from './routes/surfSpots';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 安全中间件
app.use(helmet());
app.use(cors());

// 限流
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 分钟
  max: 100 // 限制每个 IP 15 分钟内最多 100 个请求
});
app.use(limiter);

// 解析 JSON
app.use(express.json());

// 数据库连接
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/surf-spots';
    await mongoose.connect(mongoURI);
    console.log('MongoDB 连接成功');
  } catch (error) {
    console.error('MongoDB 连接失败:', error);
    process.exit(1);
  }
};

// 路由
app.use('/api/surf-spots', surfSpotRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: '冲浪点 API 服务运行正常' });
});

// 启动服务器
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`服务器运行在端口 ${PORT}`);
  });
};

startServer();