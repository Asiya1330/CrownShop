import { Middleware } from "redux";
import { IRootState } from "../store";

export const loggerMiddleware: Middleware<{}, IRootState> = (store) => (next) => (action) => {
    console.log(store, next, 'lol', action);
    if (!action?.type) return next(action);

    console.log('type: ', action.type);
    console.log('payload: ', action.payload);
    console.log('currentState: ', store.getState());

    next(action); //move to reducer and when done continue below code

    console.log('nextState: ', store.getState());
}