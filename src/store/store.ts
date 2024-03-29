// store state and dispatch actions
import { compose, legacy_createStore as createStore, applyMiddleware, Middleware } from 'redux'
import { createLogger } from 'redux-logger';
import { loggerMiddleware } from './middleware/loggerMiddleware'
import { rootReducer } from './root-reducer';
import { PersistConfig, persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import createSagaMiddleWare from 'redux-saga';
import storage from 'redux-persist/lib/storage';
import { rootSaga } from './root-saga';

export type IRootState = ReturnType<typeof rootReducer>
declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

type ExtentedPersistConfig = PersistConfig<IRootState> & {
    whitelist : (keyof IRootState)[]
}

const persistConfig: ExtentedPersistConfig = {
    key: 'root', //from root level
    storage, //localstorage of any browser
    whitelist: ['cart']
}

const sagaMiddleware = createSagaMiddleWare();

const persistedReducer = persistReducer(persistConfig, rootReducer)

//before the action hits reducer, it hit middleware first
//can be multilple middlewares..logger, middleware1, middleware2...
let logger: Middleware[] = [];

//only log state when in developement
if (process.env.NODE_ENV !== `production`) logger = [createLogger()]

//use devtools not in production
const composedEnhancer = (process.env.NODE_ENV !== 'production' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

//middleware enhances our store, b/c it runs before reducers
const composedEnhancers = composedEnhancer(applyMiddleware(sagaMiddleware, ...logger))

export const store = createStore(persistedReducer, composedEnhancers);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store)
