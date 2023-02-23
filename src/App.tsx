import React from 'react';
import logo from './logo.svg';
import './App.css';
import { NavBar } from './components/NavBar';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { Nav } from 'react-bootstrap';
import { Home } from './pages/HomePage';

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
