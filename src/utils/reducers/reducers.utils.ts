import { AnyAction } from 'redux';

export type ActionWithPayload<T, P> = {
    type: T,
    payload: P
}

export type Action<T> = {
    type: T
}

//these two are function overloading
// if no payload will be passed it will go to 2nd function
//overloading -> can defined muitple type defination for same name function

export function createAction<T extends string, P>(type: T, payload: P): ActionWithPayload<T, P>
export function createAction<T extends string, P>(type: T, payload: void): Action<T>

export function createAction<T extends string, P>(type: T, payload: P) {
    return ({ type, payload })
}