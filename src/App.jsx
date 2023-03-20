import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'
import { checkUserSession } from './store/user/user.actions';
import { useDispatch } from 'react-redux';

import Spinner from './components/spinner'
const Home = lazy(() => import('./routes/home'));
const Navigation = lazy(() => import('./routes/navigation'))
const Shop = lazy(() => import('./routes/shop'));
const Authenticate = lazy(() => import('./routes/authenticate'));
const Checkout = lazy(() => import('./routes/checkout'));

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkUserSession())
  }, [])

  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path='/' element={<Navigation />}>
          <Route index element={<Home />}></Route>
          <Route path="shop/*" element={<Shop />}></Route>
          <Route path="auth" element={<Authenticate />}></Route>
          <Route path="checkout" element={<Checkout />}></Route>
        </Route>
      </Routes>
    </Suspense>
  )
}
