import React from 'react';
import './App.css';
import { NavBar } from './components/NavBar';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { Dashboard } from './components/Pages/Dashboard';
import { Home } from './components/Pages/HomePage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header><NavBar /></header>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
