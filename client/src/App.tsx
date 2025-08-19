import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import SurfSpotDetail from './pages/SurfSpotDetail';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App min-h-screen bg-gray-50">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/spot/:id" element={<SurfSpotDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;