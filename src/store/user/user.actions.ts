import { User } from "firebase/auth"
import { IAdditionalInfo, IUserData } from "../../utils/firebase/firebase.utils"
import { createAction } from "../../utils/reducers/reducers.utils"
import { USER_ACTION_TYPES } from "./user.types"

/**********HOVER OUR THESE ACTIONS, THEY ARE INFERING ACTION AND ACTION_WITH_PAYLOAD TYPES***********/

// export const setCurrentUser = (user) => createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user)
export const checkUserSession = () => createAction(USER_ACTION_TYPES.CHECK_USER_SESSION)

export const googleSignInStart = () => createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START)
export const emailSignInStart = (email: string, password: string) => createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { email, password })
export const signInSuccess = (user: IUserData & { id: string }) => createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user);
export const signInFailed = (error: string) => createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, error);

export const signUpStart = (email: string, password: string, displayName: string) => createAction(USER_ACTION_TYPES.SIGN_UP_START, { email, password, displayName });
export const signUpSuccess = (user: User, additionalInfo: IAdditionalInfo) => createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS, { user, additionalInfo });
export const signUpFailed = (error: null | Error) => createAction(USER_ACTION_TYPES.SIGN_UP_FAILED, error);

export const signOutStart = () => createAction(USER_ACTION_TYPES.SIGN_OUT_START);
export const signOutSucess = () => createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS);
export const signOutFailed = (error: Error) => createAction(USER_ACTION_TYPES.SIGN_OUT_FAILED, error);

export type IUserActionCombine = ReturnType<typeof signOutFailed>
    | ReturnType<typeof signOutFailed>
    | ReturnType<typeof signOutSucess>
    | ReturnType<typeof signOutStart>
    | ReturnType<typeof signUpFailed>
    | ReturnType<typeof signUpSuccess>
    | ReturnType<typeof signUpStart>
    | ReturnType<typeof signInFailed>
    | ReturnType<typeof signInSuccess>
    | ReturnType<typeof emailSignInStart>
    | ReturnType<typeof googleSignInStart>
    | ReturnType<typeof checkUserSession>


