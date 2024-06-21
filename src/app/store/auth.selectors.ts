import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './state/user.state';

const getUserState = createFeatureSelector<UserState>('user');

export const selectUser = createSelector(
  getUserState,
  (state: UserState) => state.user
);

export const selectIsAuthenticated = createSelector(
  getUserState,
  (state: UserState) => state.isAuthenticated
);

export const selectAuthError = createSelector(
  getUserState,
  (state: UserState) => state.error
);