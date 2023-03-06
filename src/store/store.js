// store state and dispatch actions
import { compose, legacy_createStore as createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger';
import { loggerMiddleware } from './middleware/loggerMiddleware'
import { rootReducer } from './root-reducer';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import createSagaMiddleWare from 'redux-saga';
import storage from 'redux-persist/lib/storage';
import { rootSaga } from './root-saga';

const persistConfig = {
    key: 'root', //from root level
    storage, //localstorage of any browser
    whitelist: ['cart']
}

const sagaMiddleware = createSagaMiddleWare();

const persistedReducer = persistReducer(persistConfig, rootReducer)

//before the action hits reducer, it hit middleware first
//can be multilple middlewares..logger, middleware1, middleware2...
let applyMiddlewareFunc;

//only log state when in developement
if (process.env.NODE_ENV !== `production`) applyMiddlewareFunc = applyMiddleware(createLogger(), thunk, sagaMiddleware)

//use devtools not in production
const composedEnhancer = (process.env.NODE_ENV !== 'production' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

//middleware enhances our store, b/c it runs before reducers
const composedEnhancers = composedEnhancer(applyMiddlewareFunc)

export const store = createStore(persistedReducer, composedEnhancers);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store)
