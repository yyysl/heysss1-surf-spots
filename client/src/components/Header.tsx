import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold flex items-center">
            🌊 全球冲浪点
          </Link>
          <nav className="flex space-x-6">
            <Link to="/" className="hover:text-blue-200 transition-colors">
              首页
            </Link>
            <Link to="/spots" className="hover:text-blue-200 transition-colors">
              浪点地图
            </Link>
            <Link to="/about" className="hover:text-blue-200 transition-colors">
              关于我们
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;