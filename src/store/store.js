// store state and dispatch actions
import { compose, legacy_createStore as createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import { rootReducer } from './root-reducer';

//root reducer

//before the action hits reducer, it hit middleware first
//can be multilple middlewares..logger, middleware1, middleware2...

//middleware enhances our store, b/c it runs before reducers
const composedEnhancers = compose(applyMiddleware(createLogger()))

export const store = createStore(rootReducer, composedEnhancers)
