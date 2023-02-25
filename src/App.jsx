import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Home from './routes/home';
import Navigation from './routes/navigation'
import Shop from './routes/shop';
import Authenticate from './routes/authenticate';
import Checkout from './routes/checkout';

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />}></Route>
        <Route path="shop" element={<Shop />}></Route>
        <Route path="auth" element={<Authenticate />}></Route>
        <Route path="checkout" element={<Checkout />}></Route>

      </Route>

    </Routes>
  )
}
