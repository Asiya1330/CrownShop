import { createSelector } from 'reselect'
import { IRootState } from '../store';
import { IUserInitialState } from './user.reducer';

const selectUserSlice = (state: IRootState): IUserInitialState => state.user;

export const selectCurrentUser = createSelector(
    [selectUserSlice],
    (user) => user.currentUser
)