import React from 'react';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import User from './components/User';

function App() {
  return (
    <div className="container mt-3">
      <Routes>
        <Route path="/" element={<User />} />
      </Routes>
    </div>
  );
}

export default App;