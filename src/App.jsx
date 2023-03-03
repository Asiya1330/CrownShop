import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'
import Home from './routes/home';
import Navigation from './routes/navigation'
import Shop from './routes/shop';
import Authenticate from './routes/authenticate';
import Checkout from './routes/checkout';
import { authStateChangeListner, createUserDocumentFromAuth } from './utils/firebase/firebase.utils';
import { setCurrentUser } from './store/user/user.actions';
import { useDispatch } from 'react-redux';

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = authStateChangeListner(async (user) => {
      if (user) await createUserDocumentFromAuth(user);
      dispatch(setCurrentUser(user))
    })
    //for any memory leak, unsubs, auth Listner
    return unsubscribe
  }, [])

  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />}></Route>
        <Route path="shop/*" element={<Shop />}></Route>
        <Route path="auth" element={<Authenticate />}></Route>
        <Route path="checkout" element={<Checkout />}></Route>

      </Route>

    </Routes>
  )
}
