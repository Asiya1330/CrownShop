import { IUserData } from "../../utils/firebase/firebase.utils";
import { IUserActionCombine } from "./user.actions";
import { USER_ACTION_TYPES } from "./user.types"

export type IUserInitialState = {
    readonly currentUser: IUserData | null;
    readonly isLoading: boolean;
    readonly error: Error | null | string;
}

export const INITIAL_STATE: IUserInitialState = {
    currentUser: null,
    isLoading: false,
    error: null
}

export const userReducer = (state = INITIAL_STATE, action: IUserActionCombine): IUserInitialState => {
    switch (action.type) {
        case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload
            }
        case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
            return {
                ...state,
                currentUser: null
            }
        case USER_ACTION_TYPES.SIGN_OUT_FAILED:
        case USER_ACTION_TYPES.SIGN_IN_FAILED:
        case USER_ACTION_TYPES.SIGN_UP_FAILED:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state //because call every time whether it is dispatch of someother func
        // throw new Error(`Unhandled type ${type} in useReducer`)
    }
}
