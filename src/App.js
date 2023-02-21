import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Home from './routes/home';
import Navigation from './routes/navigation'
import Shop from './routes/shop';

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />}></Route>
        <Route path="shop" element={<Shop />}></Route>
      </Route>

    </Routes>
  )
}
