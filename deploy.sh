#!/bin/bash

# 🚀 一键部署脚本 for heysss1.com
echo "🏄‍♂️ 开始部署冲浪点网站..."

# 检查是否在正确目录
if [ ! -f "package.json" ]; then
    echo "❌ 请在项目根目录运行此脚本"
    exit 1
fi

# 构建项目
echo "📦 构建前端项目..."
cd client
npm install
npm run build

if [ $? -eq 0 ]; then
    echo "✅ 构建成功！"
    echo "📁 构建文件位于: client/build/"
    echo ""
    echo "🎯 下一步："
    echo "1. 访问 https://dash.cloudflare.com/"
    echo "2. Pages → Upload assets"
    echo "3. 拖拽 client/build 文件夹"
    echo "4. 项目名: heysss1-surf-spots"
    echo "5. 绑定域名: heysss1.com"
    echo ""
    echo "🌐 部署后访问: https://heysss1.com"
else
    echo "❌ 构建失败，请检查错误信息"
    exit 1
fi