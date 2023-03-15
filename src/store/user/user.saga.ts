// import { takeLatest, all, call, put } from 'redux-saga/effects'
import { takeLatest, all, call, put } from 'typed-redux-saga/macro'
import { User } from 'firebase/auth';

import {
    creatAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth,
    getCurrentUser,
    IAdditionalInfo,
    signingOutUser,
    signInUserWithEmailAndPassword,
    signInWithGooglePopup
} from '../../utils/firebase/firebase.utils';
import { signInFailed, signInSuccess, signOutFailed, signOutSucess, signUpFailed, signUpSuccess } from './user.actions';
import { USER_ACTION_TYPES } from './user.types'
import { AnyAction } from 'redux';


function* getSnapShotFromUserAuth(userAuth: User, additionalInfo?: IAdditionalInfo) {
    try {
        const userSnapShot = yield* call(createUserDocumentFromAuth, userAuth, additionalInfo);
        if (userSnapShot)
            yield* put(signInSuccess({ id: userSnapShot?.id, ...userSnapShot.data() }));
    } catch (error) {
        yield* put(signInFailed(error as string))
    }
}

function* isUserAuthicated() {
    try {
        const userAuth = yield* call(getCurrentUser);
        if (!userAuth) return;
        yield* call(getSnapShotFromUserAuth, userAuth)
    } catch (error) {
        yield* put(signInFailed(error as string))
    }
}

//email,pass signin

function* emailAndPassSignInUser(action: AnyAction) {
    try {
        const { email, password } = action['payload'];
        const userCredential = yield* call(signInUserWithEmailAndPassword, email, password);
        if (userCredential) {
            const { user } = userCredential
            yield* call(getSnapShotFromUserAuth, user)
        }
    } catch (error) {
        yield* put(signInFailed(error as string))
    }
}

//google sign in
function* signInWithGoogle() {
    try {
        const { user } = yield* call(signInWithGooglePopup);
        yield* call(getSnapShotFromUserAuth, user);
    } catch (error) {
        yield* put(signInFailed(error as string))
    }
}
// signup
function* userSignUp({ payload: { email, password, displayName } }: AnyAction) {
    try {
        const userCredential = yield* call(creatAuthUserWithEmailAndPassword, email, password);
        if (userCredential) {
            const { user } = userCredential;
            yield* put(signUpSuccess(user, { displayName }))
        }
    } catch (error) {
        yield* put(signUpFailed(error as Error))
    }
}

function* signinAfterSignup({ payload: { user, additionalInfo } }: AnyAction) {
    yield* call(getSnapShotFromUserAuth, user, additionalInfo);
}

function* userSignOut() {
    try {
        yield* call(signingOutUser);
        yield* put(signOutSucess())

    } catch (error) {
        yield* put(signOutFailed(error as Error))
    }
}

// entry sagas
function* emailAndPasswordSignin() {
    yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, emailAndPassSignInUser)
}

function* onCheckUserSession() {
    yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthicated)
}
function* onGoogleSignInStart() {
    yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle)
}
function* onSignUpStart() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_START, userSignUp)
}
function* onSignUpSuccess() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signinAfterSignup)
}
function* onSignOutStart() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, userSignOut)
}

//aggregator func
export function* userSagas() {
    yield* all([
        call(onCheckUserSession),
        call(emailAndPasswordSignin),
        call(onGoogleSignInStart),
        call(onSignUpStart),
        call(onSignUpSuccess),
        call(onSignOutStart)
    ])
}