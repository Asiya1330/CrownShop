import { takeLatest, all, call, put } from 'redux-saga/effects'
import { creatAuthUserWithEmailAndPassword, createUserDocumentFromAuth, getCurrentUser, signingOutUser, signInUserWithEmailAndPassword, signInWithGooglePopup } from '../../utils/firebase/firebase.utils'
import { signInFailed, signInSuccess, signOutFailed, signOutSucess, signUpFailed, signUpSuccess } from './user.actions';
import { USER_ACTION_TYPES } from './user.types'


function* getSnapShotFromUserAuth(userAuth, additionalInfo = {}) {
    try {
        const userSnapShot = yield call(createUserDocumentFromAuth, userAuth, additionalInfo);
        yield put(signInSuccess({ id: userSnapShot.id, ...userSnapShot.data() }));
    } catch (error) {
        yield put(signInFailed(error))
    }
}

function* isUserAuthicated() {
    try {
        const userAuth = yield call(getCurrentUser);
        if (!userAuth) return;
        yield call(getSnapShotFromUserAuth, userAuth)
    } catch (error) {
        yield put(signInFailed(error))
    }
}

//email,pass signin

function* emailAndPassSignInUser(action) {
    try {
        const { email, password } = action['payload'];
        const { user } = yield call(signInUserWithEmailAndPassword, email, password);
        yield call(getSnapShotFromUserAuth, user)
    } catch (error) {
        yield put(signInFailed(error))
    }
}

//google sign in
function* signInWithGoogle() {
    try {
        const { user } = yield call(signInWithGooglePopup);
        yield call(getSnapShotFromUserAuth, user);
    } catch (error) {
        yield put(signInFailed(error))
    }
}
// signup
function* userSignUp({ payload: { email, password, displayName } }) {
    try {
        const { user } = yield call(creatAuthUserWithEmailAndPassword, email, password);
        yield put(signUpSuccess(user, { displayName }))
    } catch (error) {
        yield put(signUpFailed(error))
    }
}

function* signinAfterSignup({ payload: { user, additionalInfo } }) {
    yield call(getSnapShotFromUserAuth, user, additionalInfo);
}

function* userSignOut() {
    try {
        yield call(signingOutUser);
        yield put(signOutSucess())

    } catch (error) {
        yield put(signOutFailed(error))
    }
}

// entry sagas
function* emailAndPasswordSignin() {
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, emailAndPassSignInUser)
}

function* onCheckUserSession() {
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthicated)
}
function* onGoogleSignInStart() {
    yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle)
}
function* onSignUpStart() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, userSignUp)
}
function* onSignUpSuccess() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signinAfterSignup)
}
function* onSignOutStart() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, userSignOut)
}

//aggregator func
export function* userSagas() {
    yield all([
        call(onCheckUserSession),
        call(emailAndPasswordSignin),
        call(onGoogleSignInStart),
        call(onSignUpStart),
        call(onSignUpSuccess),
        call(onSignOutStart)
    ])
}